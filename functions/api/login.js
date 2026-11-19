import {
  requireDatabase, respond, error, validOrigin, readBody, emailValue, passwordValid,
  checkPassword, rateLimit, createSession, snapshot,
} from '../../lib/server-utils.js';

export async function onRequestPost(context) {
  const db = requireDatabase(context);
  if (!db) return error('회원 데이터베이스 설정이 필요합니다.', 503);
  if (!validOrigin(context.request)) return error('요청한 페이지를 확인할 수 없습니다.', 403);
  if (!(await rateLimit(db, context.request, 'login', 12, 600))) return error('로그인 시도가 많습니다. 10분 후 다시 시도해 주세요.', 429);
  const body = await readBody(context.request);
  const email = emailValue(body?.email);
  if (!email || !passwordValid(body?.password)) return error('이메일 또는 비밀번호를 확인해 주세요.', 401);
  const member = await db.prepare('SELECT id, email, password_salt, password_hash FROM members WHERE email = ?')
    .bind(email).first();
  // Verify even when the member is absent to avoid immediate account existence timing leaks.
  const dummy = { password_salt: '00000000000000000000000000000000', password_hash: '0000000000000000000000000000000000000000000000000000000000000000' };
  if (!(await checkPassword(body.password, member || dummy)) || !member)
    return error('이메일 또는 비밀번호가 맞지 않습니다.', 401);
  const cookie = await createSession(db, member.id);
  return respond(await snapshot(db, member), 200, { 'Set-Cookie': cookie });
}
