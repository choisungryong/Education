import assert from 'node:assert/strict';
import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { onRequestPost as signup } from '../functions/api/signup.js';
import { onRequestPost as login } from '../functions/api/login.js';
import { onRequestPost as progress } from '../functions/api/progress.js';
import { onRequestPost as logout } from '../functions/api/logout.js';
import { onRequestGet as session } from '../functions/api/session.js';
import { onRequestGet as chapter } from '../functions/api/chapter/[id].js';
import { onRequestPost as deleteAccount } from '../functions/api/delete-account.js';

const sql = new DatabaseSync(':memory:');
sql.exec(fs.readFileSync(new URL('../migrations/001_membership.sql', import.meta.url), 'utf8'));
sql.exec(fs.readFileSync(new URL('../migrations/002_google_auth.sql', import.meta.url), 'utf8'));

const DB = {
  prepare(query) {
    return {
      bind(...params) {
        return {
          async first() { return sql.prepare(query).get(...params) || null; },
          async all() { return { results: sql.prepare(query).all(...params) }; },
          async run() { return sql.prepare(query).run(...params); },
        };
      },
    };
  },
  async batch(statements) { for (const statement of statements) await statement.run(); },
};

const origin = 'https://education-epc.pages.dev';
const env = { DB, REGISTRATION_OPEN: 'true' };
const exposedJs = fs.readFileSync(new URL('../dist/app.js', import.meta.url), 'utf8');
assert.ok(!exposedJs.includes('생성형 AI·LLM·프롬프트·토큰'), 'private lesson theory must not be in the public JS');
const makeRequest = (path, body, cookie, method = 'POST') => new Request(origin + path, {
  method,
  headers: {
    'Content-Type': 'application/json',
    'Origin': origin,
    'CF-Connecting-IP': '127.0.0.1',
    ...(cookie ? { Cookie: cookie } : {}),
  },
  ...(method === 'POST' ? { body: JSON.stringify(body || {}) } : {}),
});
const call = (func, path, body = {}, cookie, method = 'POST', params = {}) =>
  func({ env, request: makeRequest(path, body, cookie, method), params });

let blocked = await signup({ env: { DB, REGISTRATION_OPEN: 'false' }, request: makeRequest('/api/signup', { email: 'x@example.com', password: 'safe-password-123', acceptedTerms: true }) });
assert.equal(blocked.status, 503, 'registration stays closed until operator activates it');

let result = await call(signup, '/api/signup', { email: 'student@example.com', password: 'safe-password-123', acceptedTerms: true });
assert.equal(result.status, 201, 'new account can be created');
assert.equal((await result.clone().json()).unlocked, 1);
const cookie = result.headers.get('Set-Cookie').split(';')[0];
assert.ok(cookie.startsWith('ll_session='));
assert.ok(result.headers.get('Set-Cookie').includes('HttpOnly'));
assert.ok(result.headers.get('Set-Cookie').includes('Secure'));

result = await login({ env, request: new Request(origin + '/api/login', {
  method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://other.example' },
  body: JSON.stringify({ email: 'student@example.com', password: 'safe-password-123' }),
}) });
assert.equal(result.status, 403, 'cross-origin login is denied');
result = await call(login, '/api/login', { email: 'student@example.com', password: 'wrong-password-123' });
assert.equal(result.status, 401, 'wrong password cannot create a session');
result = await call(progress, '/api/progress', { chapterId: '01', checkIndex: -1, completed: true }, cookie);
assert.equal(result.status, 400, 'invalid progress index is denied');

result = await call(chapter, '/api/chapter/01', {}, null, 'GET', { id: '01' });
assert.equal(result.status, 401, 'guest is denied chapter content');
result = await call(chapter, '/api/chapter/01', {}, cookie, 'GET', { id: '01' });
assert.equal(result.status, 200, 'signed-in member can read first chapter');
assert.equal((await result.json()).chapter.id, '01');
result = await call(chapter, '/api/chapter/02', {}, cookie, 'GET', { id: '02' });
assert.equal(result.status, 403, 'later chapter locked by server');

for (let checkIndex = 0; checkIndex < 4; checkIndex += 1) {
  result = await call(progress, '/api/progress', { chapterId: '01', checkIndex, completed: true }, cookie);
  assert.equal(result.status, 200);
}
assert.equal((await result.json()).unlocked, 2, 'all first chapter checks unlock second chapter');
result = await call(chapter, '/api/chapter/02', {}, cookie, 'GET', { id: '02' });
assert.equal(result.status, 200);
result = await call(progress, '/api/progress', { chapterId: '18', checkIndex: 0, completed: true }, cookie);
assert.equal(result.status, 403, 'cannot mark a locked chapter completed');

result = await call(logout, '/api/logout', {}, cookie);
assert.equal(result.status, 200);
result = await call(session, '/api/session', {}, cookie, 'GET');
assert.equal((await result.json()).authenticated, false, 'logout invalidates server session');
result = await call(login, '/api/login', { email: 'student@example.com', password: 'safe-password-123' });
assert.equal(result.status, 200, 'account can log in again');
const relogCookie = result.headers.get('Set-Cookie').split(';')[0];
assert.equal((await result.json()).unlocked, 2, 'progress persists on server');

result = await call(deleteAccount, '/api/delete-account', { password: 'safe-password-123' }, relogCookie);
assert.equal(result.status, 200, 'user can delete account and progress');
assert.equal(sql.prepare('SELECT COUNT(*) AS total FROM members').get().total, 0);
assert.equal(sql.prepare('SELECT COUNT(*) AS total FROM course_progress').get().total, 0);
assert.equal(sql.prepare('SELECT COUNT(*) AS total FROM sessions').get().total, 0);
result = await call(session, '/api/session', {}, relogCookie, 'GET');
assert.equal((await result.json()).authenticated, false, 'deleted account sessions are revoked');
console.log('Membership tests passed: signup, login, server lock, sequential unlock, persistence, logout, delete.');
