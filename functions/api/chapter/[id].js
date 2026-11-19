import { chapters } from '../../../lib/course-data.js';
import { requireDatabase, respond, error, currentMember, snapshot, accessible } from '../../../lib/server-utils.js';

export async function onRequestGet(context) {
  const db = requireDatabase(context);
  if (!db) return error('회원 데이터베이스 설정이 필요합니다.', 503);
  const member = await currentMember(db, context.request);
  if (!member) return error('강의 본문은 로그인 후 볼 수 있습니다.', 401);
  const chapter = chapters.find(item => item.id === context.params.id);
  if (!chapter) return error('존재하지 않는 강의입니다.', 404);
  const state = await snapshot(db, member);
  if (!accessible(chapter, state)) return error('앞선 강의를 완료하면 열립니다.', 403);
  return respond({ chapter });
}
