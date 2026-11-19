import { requireDatabase, respond, validOrigin, error, removeSession, expiredCookie } from '../../lib/server-utils.js';

export async function onRequestPost(context) {
  if (!validOrigin(context.request)) return error('요청한 페이지를 확인할 수 없습니다.', 403);
  const db = requireDatabase(context);
  if (db) await removeSession(db, context.request);
  return respond({ authenticated: false }, 200, { 'Set-Cookie': expiredCookie });
}
