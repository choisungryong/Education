import { chapters } from './course-data.js';

const encoder = new TextEncoder();
const SESSION_COOKIE = 'll_session';
const SESSION_AGE_SECONDS = 14 * 24 * 60 * 60;
const HASH_ITERATIONS = 150000;

const toHex = bytes => Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
const fromHex = hex => new Uint8Array(hex.match(/../g).map(v => parseInt(v, 16)));
const now = () => Math.floor(Date.now() / 1000);

export const respond = (data, status = 200, extraHeaders = {}) => new Response(JSON.stringify(data), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extraHeaders },
});

export const error = (message, status = 400) => respond({ error: message }, status);

export function requireDatabase(context) {
  if (!context.env?.DB) return null;
  return context.env.DB;
}

export async function readBody(request, maxSize = 4096) {
  if (!(request.headers.get('content-type') || '').toLowerCase().startsWith('application/json')) return null;
  const size = Number(request.headers.get('content-length') || 0);
  if (size > maxSize) return null;
  try {
    const txt = await request.text();
    if (encoder.encode(txt).length > maxSize) return null;
    const value = JSON.parse(txt);
    return value && typeof value === 'object' && !Array.isArray(value) ? value : null;
  } catch (_) {
    return null;
  }
}

export function validOrigin(request) {
  const origin = request.headers.get('origin');
  const fetchSite = request.headers.get('sec-fetch-site');
  return (!origin || origin === new URL(request.url).origin) && fetchSite !== 'cross-site';
}

export function emailValue(value) {
  if (typeof value !== 'string') return null;
  const email = value.trim().toLowerCase();
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

export function passwordValid(value) {
  return typeof value === 'string' && value.length >= 10 && value.length <= 128;
}

async function sha256(value) {
  return toHex(new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(value))));
}

export async function hashPassword(password, salt = toHex(crypto.getRandomValues(new Uint8Array(16)))) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({
    name: 'PBKDF2', salt: fromHex(salt), iterations: HASH_ITERATIONS, hash: 'SHA-256',
  }, key, 256);
  return { salt, hash: toHex(new Uint8Array(bits)) };
}

export async function checkPassword(password, member) {
  if (!member.password_salt || !member.password_hash) return false;
  if (!passwordValid(password)) return false;
  const result = await hashPassword(password, member.password_salt);
  const a = fromHex(result.hash);
  const b = fromHex(member.password_hash);
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) mismatch |= a[i] ^ b[i];
  return mismatch === 0;
}

export async function rateLimit(db, request, action, limit, seconds) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const slot = Math.floor(now() / seconds);
  const bucket = await sha256(action + ':' + ip + ':' + slot);
  const row = await db.prepare('INSERT INTO rate_limits (bucket, hits, expires_at) VALUES (?, 1, ?) ' +
    'ON CONFLICT(bucket) DO UPDATE SET hits = hits + 1 RETURNING hits')
    .bind(bucket, (slot + 1) * seconds).first();
  return Number(row?.hits || 0) <= limit;
}

function sessionToken(request) {
  const header = request.headers.get('cookie') || '';
  const value = header.split(';').map(v => v.trim()).find(v => v.startsWith(SESSION_COOKIE + '='));
  const token = value?.slice(SESSION_COOKIE.length + 1);
  return token && /^[A-Za-z0-9_-]{43}$/.test(token) ? token : null;
}

export async function currentMember(db, request) {
  const token = sessionToken(request);
  if (!token) return null;
  const tokenHash = await sha256(token);
  return db.prepare('SELECT members.id, members.email, members.password_hash FROM sessions ' +
    'JOIN members ON members.id = sessions.member_id ' +
    'WHERE sessions.token_hash = ? AND sessions.expires_at > ?')
    .bind(tokenHash, now()).first();
}

export async function createSession(db, memberId) {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const token = btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const hash = await sha256(token);
  await db.prepare('INSERT INTO sessions (token_hash, member_id, expires_at, created_at) VALUES (?, ?, ?, ?)')
    .bind(hash, memberId, now() + SESSION_AGE_SECONDS, now()).run();
  return SESSION_COOKIE + '=' + token + '; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=' + SESSION_AGE_SECONDS;
}

export async function removeSession(db, request) {
  const token = sessionToken(request);
  if (token) await db.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(await sha256(token)).run();
}

export const expiredCookie = SESSION_COOKIE + '=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0';

export async function snapshot(db, member) {
  const result = await db.prepare('SELECT chapter_id, check_index FROM course_progress WHERE member_id = ?')
    .bind(member.id).all();
  const completed = (result.results || []).map(item => item.chapter_id + '-' + item.check_index);
  const set = new Set(completed);
  let unlocked = 1;
  for (let i = 0; i < chapters.length - 1; i += 1) {
    const c = chapters[i];
    if (c.checks.every((_, j) => set.has(c.id + '-' + j))) unlocked += 1;
    else break;
  }
  return { authenticated: true, email: member.email, authMethod: member.password_hash === '' ? 'google' : 'password', completed, unlocked, total: chapters.length };
}

export function accessible(chapter, state) {
  return chapters.indexOf(chapter) >= 0 && chapters.indexOf(chapter) < state.unlocked;
}
