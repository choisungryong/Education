import assert from 'node:assert/strict';
import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { generateKeyPair, exportJWK, SignJWT } from 'jose';
import { onRequestPost as google } from '../functions/api/google.js';
import { onRequestPost as remove } from '../functions/api/delete-account.js';
import { onRequestPost as login } from '../functions/api/login.js';

const sql = new DatabaseSync(':memory:');
for (const file of ['001_membership.sql', '002_google_auth.sql']) sql.exec(fs.readFileSync(new URL('../migrations/' + file, import.meta.url), 'utf8'));
const DB = {
  prepare(query) { return { bind(...args) { return {
    async first() { return sql.prepare(query).get(...args) || null; },
    async all() { return { results: sql.prepare(query).all(...args) }; },
    async run() { return sql.prepare(query).run(...args); },
  }; } }; },
  async batch(statements) {
    sql.exec('BEGIN');
    try { for (const statement of statements) await statement.run(); sql.exec('COMMIT'); }
    catch (err) { sql.exec('ROLLBACK'); throw err; }
  },
};
const { privateKey, publicKey } = await generateKeyPair('RS256');
const jwk = { ...await exportJWK(publicKey), kid: 'google-fixture', alg: 'RS256', use: 'sig' };
const originalFetch = globalThis.fetch;
globalThis.fetch = async url => {
  assert.equal(String(url), 'https://www.googleapis.com/oauth2/v3/certs');
  return Response.json({ keys: [jwk] }, { headers: { 'Cache-Control': 'max-age=3600' } });
};
const nonce = 'b'.repeat(64);
const origin = 'https://education-epc.pages.dev';
const env = { DB, REGISTRATION_OPEN: 'true', GOOGLE_CLIENT_ID: 'fixture.apps.googleusercontent.com' };
const token = (sub, email) => new SignJWT({ sub, email, email_verified: true, nonce })
  .setProtectedHeader({ alg: 'RS256', kid: jwk.kid }).setIssuer('https://accounts.google.com')
  .setAudience(env.GOOGLE_CLIENT_ID).setIssuedAt().setExpirationTime('5m').sign(privateKey);
const call = (handler, body, cookie = '', overrides = {}) => handler({ env: { ...env, ...overrides }, request: new Request(origin + '/api/google', {
  method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin, Cookie: `ll_google_nonce=${nonce}; ${cookie}` }, body: JSON.stringify(body),
}) });
try {
  const credential = await token('subject-1', 'student@gmail.com');
  assert.equal((await call(google, { credential, acceptedTerms: false })).status, 400);
  assert.equal((await call(google, { credential, acceptedTerms: true }, '', { REGISTRATION_OPEN: 'false' })).status, 503);
  let result = await call(google, { credential, acceptedTerms: true });
  assert.equal(result.status, 200);
  const member = await result.json();
  assert.equal(member.authMethod, 'google');
  assert.equal(member.unlocked, 1);
  const cookie = result.headers.getSetCookie().find(v => v.startsWith('ll_session=')).split(';')[0];
  assert.equal(sql.prepare('SELECT COUNT(*) n FROM members').get().n, 1);
  result = await call(google, { credential }, '', { REGISTRATION_OPEN: 'false' });
  assert.equal(result.status, 200, 'existing Google user can log in while registration is closed');
  assert.equal((await call(login, { email: 'student@gmail.com', password: 'some-password-123' })).status, 401, 'Google account cannot use a password');
  assert.equal((await call(google, { credential: await token('subject-2', 'student@gmail.com'), acceptedTerms: true })).status, 409, 'same email cannot auto-link another identity');
  assert.equal((await call(remove, { credential: await token('subject-2', 'other@gmail.com') }, cookie)).status, 401, 'another Google identity cannot delete this account');
  assert.equal((await call(remove, { credential }, cookie)).status, 200);
  for (const table of ['members', 'sessions', 'google_identities']) assert.equal(sql.prepare(`SELECT COUNT(*) n FROM ${table}`).get().n, 0);
  console.log('Google signup, login, consent, identity isolation, and reauthenticated deletion passed.');
} finally { globalThis.fetch = originalFetch; sql.close(); }
