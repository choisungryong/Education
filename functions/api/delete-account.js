import {
  requireDatabase, respond, error, validOrigin, readBody, currentMember, checkPassword, expiredCookie, rateLimit,
} from '../../lib/server-utils.js';
import { verifyGoogleCredential, nonceFromRequest } from '../../lib/google-auth.js';

export async function onRequestPost(context) {
  const db = requireDatabase(context);
  if (!db) return error('회원 데이터베이스 설정이 필요합니다.', 503);
  if (!validOrigin(context.request)) return error('요청한 페이지를 확인할 수 없습니다.', 403);
  const member = await currentMember(db, context.request);
  if (!member) return error('로그인이 필요합니다.', 401);
  if (!(await rateLimit(db, context.request, 'delete-account', 5, 600))) return error('비밀번호 확인 시도가 많습니다. 10분 후 다시 시도해 주세요.', 429);
  const body = await readBody(context.request, 12288);
  const record = await db.prepare('SELECT password_salt, password_hash FROM members WHERE id = ?').bind(member.id).first();
  if (record?.password_hash === '') {
    let identity;
    try { identity = await verifyGoogleCredential(body?.credential, context.env.GOOGLE_CLIENT_ID, nonceFromRequest(context.request)); }
    catch { return error('탈퇴하려면 Google 계정을 다시 인증해 주세요.', 401); }
    const linked = await db.prepare('SELECT member_id FROM google_identities WHERE subject = ?').bind(identity.sub).first();
    if (linked?.member_id !== member.id) return error('가입한 Google 계정으로 인증해 주세요.', 401);
  } else if (!record || !(await checkPassword(body?.password, record))) return error('비밀번호를 다시 확인해 주세요.', 401);
  await db.batch([
    db.prepare('DELETE FROM course_progress WHERE member_id = ?').bind(member.id),
    db.prepare('DELETE FROM sessions WHERE member_id = ?').bind(member.id),
    db.prepare('DELETE FROM google_identities WHERE member_id = ?').bind(member.id),
    db.prepare('DELETE FROM members WHERE id = ?').bind(member.id),
  ]);
  return respond({ deleted: true }, 200, { 'Set-Cookie': expiredCookie });
}
