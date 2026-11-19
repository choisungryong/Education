import { requireDatabase, respond, currentMember, snapshot } from '../../lib/server-utils.js';

export async function onRequestGet(context) {
  const db = requireDatabase(context);
  if (!db) return respond({ authenticated: false, unavailable: true, error: '회원 데이터베이스 설정이 필요합니다.' }, 503);
  const member = await currentMember(db, context.request);
  if (!member) return respond({ authenticated: false, unlocked: 0, completed: [] });
  return respond(await snapshot(db, member));
}
