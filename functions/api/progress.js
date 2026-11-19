import { chapters } from '../../lib/course-data.js';
import {
  requireDatabase, respond, error, validOrigin, readBody, currentMember, snapshot, accessible,
} from '../../lib/server-utils.js';

export async function onRequestPost(context) {
  const db = requireDatabase(context);
  if (!db) return error('회원 데이터베이스 설정이 필요합니다.', 503);
  if (!validOrigin(context.request)) return error('요청한 페이지를 확인할 수 없습니다.', 403);
  const member = await currentMember(db, context.request);
  if (!member) return error('로그인이 필요합니다.', 401);
  const body = await readBody(context.request);
  const chapter = chapters.find(item => item.id === body?.chapterId);
  if (!chapter || !Number.isInteger(body?.checkIndex) || body.checkIndex < 0 || body.checkIndex >= chapter.checks.length
    || typeof body.completed !== 'boolean') return error('완료 항목을 확인해 주세요.');
  const previous = await snapshot(db, member);
  if (!accessible(chapter, previous)) return error('선행 강의를 먼저 완료해 주세요.', 403);
  if (body.completed) {
    await db.prepare('INSERT OR IGNORE INTO course_progress (member_id, chapter_id, check_index, completed_at) VALUES (?, ?, ?, ?)')
      .bind(member.id, chapter.id, body.checkIndex, Math.floor(Date.now() / 1000)).run();
  } else {
    await db.prepare('DELETE FROM course_progress WHERE member_id = ? AND chapter_id = ? AND check_index = ?')
      .bind(member.id, chapter.id, body.checkIndex).run();
  }
  return respond(await snapshot(db, member));
}
