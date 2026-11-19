import assert from 'node:assert/strict';
import { generateKeyPair, exportJWK, createLocalJWKSet, SignJWT } from 'jose';
import { verifyGoogleCredential, nonceFromRequest } from '../lib/google-auth.js';
import { onRequestGet as config } from '../functions/api/auth-config.js';

const { privateKey, publicKey } = await generateKeyPair('RS256');
const jwk = await exportJWK(publicKey);
const keys = createLocalJWKSet({ keys: [{ ...jwk, kid: 'test', alg: 'RS256', use: 'sig' }] });
const nonce = 'a'.repeat(64);
const clientId = 'test.apps.googleusercontent.com';
const sign = async (changes = {}, signingKey = privateKey) => new SignJWT({
  sub: 'google-user-123', email: 'learner@gmail.com', email_verified: true, nonce,
  aud: clientId, iss: 'https://accounts.google.com',
  iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 300,
  ...changes,
}).setProtectedHeader({ alg: 'RS256', kid: 'test' }).sign(signingKey);

assert.equal((await verifyGoogleCredential(await sign(), clientId, nonce, keys)).sub, 'google-user-123');
for (const changes of [{ aud: 'attacker' }, { iss: 'https://attacker.example' }, { exp: 1 }, { email_verified: false }, { nonce: 'b'.repeat(64) }, { sub: '' }]) {
  await assert.rejects(() => sign(changes).then(token => verifyGoogleCredential(token, clientId, nonce, keys)));
}
const attacker = await generateKeyPair('RS256');
await assert.rejects(() => sign({}, attacker.privateKey).then(token => verifyGoogleCredential(token, clientId, nonce, keys)));
const validToken = await sign();
await assert.rejects(() => verifyGoogleCredential(validToken, clientId, '', keys));
const request = new Request('https://education-epc.pages.dev/api/auth-config');
const response = config({ env: { GOOGLE_CLIENT_ID: clientId, REGISTRATION_OPEN: 'true' }, request });
const payload = await response.json();
assert.equal(payload.googleClientId, clientId);
assert.equal(payload.registrationOpen, true);
assert.match(payload.nonce, /^[a-f0-9]{64}$/);
assert.match(response.headers.get('set-cookie'), /HttpOnly; Secure; SameSite=Strict/);
assert.equal(nonceFromRequest(new Request(request.url, { headers: { cookie: `ll_google_nonce=${nonce}` } })), nonce);
console.log('Google identity verification checks passed.');
