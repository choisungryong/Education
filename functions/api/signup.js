import {
  requireDatabase, respond, error, validOrigin, readBody, emailValue, passwordValid,
  hashPassword, rateLimit, createSession, snapshot,
} from '../../lib/server-utils.js';

export async function onRequestPost(context) {
  const db = requireDatabase(context);
  if (!db) return error('회원 데이터베이스 설정이 필요합니다.', 503);
  if (context.env.REGISTRATION_OPEN !== 'true') return error('회원가입 준비 중입니다. 운영자 정보와 개인정보 안내를 확정한 후 열립니다.', 503);
  if (!validOrigin(context.request)) return error('요청한 페이지를 확인할 수 없습니다.', 403);
  if (!(await rateLimit(db, context.request, 'signup', 5, 3600))) return error('가입 요청이 많습니다. 잠시 후 다시 시도해 주세요.', 429);
  const body = await readBody(context.request);
  if (!body) return error('요청 형식이 올바르지 않습니다.');
  const email = emailValue(body.email);
  if (!email || !passwordValid(body.password) || body.acceptedTerms !== true)
    return error('이메일, 10자 이상의 비밀번호, 필수 약관 동의를 확인해 주세요.');
  const existing = await db.prepare('SELECT id FROM members WHERE email = ?').bind(email).first();
  if (existing) return error('이미 가입된 이메일입니다. 로그인해 주세요.', 409);
  const id = crypto.randomUUID();
  const password = await hashPassword(body.password);
  try {
    await db.prepare('INSERT INTO members (id, email, password_salt, password_hash, created_at) VALUES (?, ?, ?, ?, ?)')
      .bind(id, email, password.salt, password.hash, Math.floor(Date.now() / 1000)).run();
  } catch (err) {
    if (String(err).includes('UNIQUE')) return error('이미 가입된 이메일입니다.', 409);
    throw err;
  }
  const cookie = await createSession(db, id);
  return respond(await snapshot(db, { id, email }), 201, { 'Set-Cookie': cookie });
}
