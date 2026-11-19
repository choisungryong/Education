import { verifyGoogleCredential, nonceFromRequest, clearNonce } from '../../lib/google-auth.js';
import { requireDatabase, respond, error, validOrigin, readBody, emailValue, rateLimit, createSession, snapshot } from '../../lib/server-utils.js';

export async function onRequestPost(context) {
  const { request, env } = context;
  const db = requireDatabase(context);
  if (!db) return error('회원 데이터베이스 설정이 필요합니다.', 503);
  if (!env.GOOGLE_CLIENT_ID) return error('Google 로그인 연결 준비 중입니다. 이메일로 가입하거나 로그인해 주세요.', 503);
  if (!request.headers.get('origin') || !validOrigin(request)) return error('허용되지 않은 요청입니다.', 403);
  if (!(await rateLimit(db, request, 'google', 15, 600))) return error('로그인 시도가 많습니다. 잠시 후 다시 시도해 주세요.', 429);
  const body = await readBody(request, 12288);
  let identity;
  try { identity = await verifyGoogleCredential(body?.credential, env.GOOGLE_CLIENT_ID, nonceFromRequest(request)); }
  catch { return error('Google 인증을 확인할 수 없습니다. 로그인 창을 다시 열어 주세요.', 401); }
  const email = emailValue(identity.email);
  if (!email) return error('Google 이메일 정보를 확인할 수 없습니다.', 401);
  let member = await db.prepare('SELECT members.id, members.email, members.password_hash FROM google_identities JOIN members ON members.id = google_identities.member_id WHERE subject = ?').bind(identity.sub).first();
  if (!member) {
    if (env.REGISTRATION_OPEN !== 'true') return error('현재 신규 회원가입이 닫혀 있습니다.', 503);
    if (body.acceptedTerms !== true) return error('신규 가입은 이용약관과 개인정보 처리방침 동의가 필요합니다.', 400);
    if (await db.prepare('SELECT id FROM members WHERE email = ?').bind(email).first())
      return error('이 이메일로 가입된 계정이 있습니다. 기존 이메일과 비밀번호로 로그인해 주세요.', 409);
    member = { id: crypto.randomUUID(), email, password_hash: '' };
    try {
      await db.batch([
        db.prepare('INSERT INTO members (id, email, password_salt, password_hash, created_at) VALUES (?, ?, ?, ?, ?)').bind(member.id, email, '', '', Math.floor(Date.now() / 1000)),
        db.prepare('INSERT INTO google_identities (subject, member_id) VALUES (?, ?)').bind(identity.sub, member.id),
      ]);
    } catch (err) {
      if (String(err).includes('UNIQUE')) return error('계정이 이미 존재합니다. 다시 로그인해 주세요.', 409);
      throw err;
    }
  }
  const headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  headers.append('Set-Cookie', await createSession(db, member.id));
  headers.append('Set-Cookie', clearNonce);
  return new Response(JSON.stringify(await snapshot(db, member)), { headers });
}
