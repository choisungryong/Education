# 런치랩 — 실전 창업 워크숍 · 회원 전용 강의 플랫폼

AI 입문자를 위한 9주·18강 서비스 창업 교육과정입니다. 한 개의 실제 서비스를 기획하고 만들고 배포하며, 검색·광고·사업 운영 실무까지 이어서 학습합니다.

## 프로젝트 구조

- `dist/index.html` — 강의 사이트의 시작점
- `dist/app.js` — 비회원용 공개 목차·미리보기, 화면 전환, 로그인·회원가입 화면
- `dist/styles.css`, `dist/overrides.css`, `dist/theme.css` — Pretendard 기반의 반응형 디자인
- `dist/_headers` — Cloudflare Pages 기본 보안 헤더
- `dist/privacy.html`, `dist/terms.html` — 개인정보·약관 **검토 초안** (운영자: 넥서스웍스, 문의: `twinspa0713@gmail.com`; 최종 법적 검토 전 가입 개방 금지)
- `lib/course-data.js` — 18강 본문 원본. **공개 `dist` 폴더에 복사하지 않음**
- `lib/server-utils.js` — 서버 인증·세션·진도 검증
- `functions/api/` — Cloudflare Pages Functions 회원 및 강의 API
- `migrations/001_membership.sql` — D1 회원 데이터베이스 스키마
- `tests/membership.test.mjs` — 접근권한·순차 잠금·회원관리 테스트

공개 화면은 빌드 없는 정적 웹사이트입니다. **회원 인증·강의 본문 제공·진도 저장은 Cloudflare Pages Functions + D1**이 처리합니다. 비회원에게는 공개 소개·목차·강의 미리보기만 전달되고, 서버는 로그인과 선행강의 완료 여부를 검사한 뒤 강의 본문을 제공합니다. 가입 즉시 1강이 열리며, 각 강의의 체크 항목을 모두 완료하면 다음 강의가 해제됩니다. 체크 방식은 **수강생 자기점검**이며 교사의 제출물 검수를 대신하지 않습니다.

## Cloudflare Pages에 Git 저장소 연결

Cloudflare 대시보드에서 **Workers & Pages → Create application → Pages → Connect to Git** 흐름으로 GitHub 저장소를 연결합니다.

| 설정 | 값 |
| --- | --- |
| 저장소 | `choisungryong/Education` |
| 프로덕션 브랜치 | `main` |
| 프레임워크 프리셋 | `None` |
| 빌드 명령 | 없음 (비워 두기) |
| 빌드 출력 디렉터리 | `dist` |
| 루트 디렉터리 | `/` (기본값) |

연결 후 `main` 브랜치에 커밋을 푸시하면 Pages가 새 버전을 배포하도록 구성할 수 있습니다.

### 회원 시스템 활성화 — 추가 Cloudflare 설정 필수

**현재 회원가입은 기본적으로 잠겨 있습니다.** 실제 수강생 정보를 받기 전에 다음 단계를 완료하세요.

1. Cloudflare 대시보드에서 **D1 데이터베이스**를 새로 만들고 이름을 `launchlab-members`로 지정합니다.
2. D1 Console에서 `migrations/001_membership.sql`을 실행합니다. CLI를 사용하는 경우:

   `npx wrangler d1 execute launchlab-members --remote --file=migrations/001_membership.sql`

3. **Workers & Pages → education → Settings → Bindings**에서 D1 binding을 추가합니다. 프로젝트 이름은 `education`, 공개 주소는 `education-epc.pages.dev`입니다.
   - Variable name: `DB` (**정확히 대문자**)
   - D1 database: `launchlab-members`
   - Production·Preview 환경을 모두 사용하는 경우 각각 구성합니다.
4. **Environment variables**에 `REGISTRATION_OPEN` 변수를 추가합니다. 기본값은 `false` 또는 미설정으로 둡니다.
5. `dist/privacy.html`과 `dist/terms.html`에 반영된 **넥서스웍스 / twinspa0713@gmail.com** 외에 보유기간·개인정보 보호책임자·처리 절차 등을 실제 운영 정보로 최종 확정합니다. 이메일 인증·비밀번호 재설정·운영 문의 체계와 스팸 방지 방안을 추가 검토합니다.
6. 운영 준비가 완료되면 `REGISTRATION_OPEN=true`로 변경하고 재배포합니다. **그전에는 회원가입을 열지 마세요.**

> 이 버전은 자체 회원 시스템의 작동하는 첫 구현입니다. 이메일 인증과 비밀번호 분실 시 재설정은 아직 제공되지 않습니다. 개인정보를 실제로 수집하는 공개 서비스로 전환할 때는 이 부분을 마무리하는 것이 좋습니다.

**GitHub 업로드 주의:** 기존 `dist`만 올렸던 방식과 달리 이번에는 `dist/`, `functions/`, `lib/`, `migrations/` 폴더가 모두 저장소 **최상위**에 있어야 합니다. `lib/`를 `dist/` 아래에 넣으면 강의 본문이 공개되므로 안 됩니다. Cloudflare 빌드 출력 디렉터리는 계속 `dist`입니다.

Cloudflare 공식 가이드:

- [Pages Functions 시작](https://developers.cloudflare.com/pages/functions/get-started/)
- [Pages Functions D1 bindings](https://developers.cloudflare.com/pages/functions/bindings/)

커스텀 도메인은 Pages 프로젝트의 **Custom domains**에서 별도로 연결합니다. 루트 도메인은 Cloudflare 네임서버 설정이 필요할 수 있습니다.

## 수정 및 운영 시 참고

- 로컬 미리보기는 정적 HTTP 서버에서 `dist/`를 제공하면 됩니다.
- 강의 본문은 `lib/course-data.js`, 공개 목차 정보는 `dist/app.js`의 `chapters` 데이터에서 관리합니다.
- 회원 잠금 정책은 `lib/server-utils.js`의 `snapshot`에서 관리합니다.
- 테스트: `node --test tests/membership.test.mjs`
- 이 웹사이트는 해시 기반 경로(`#/chapter/01`)를 사용합니다. 공개 소개 콘텐츠의 검색 노출을 개선하려면 정적 마케팅 URL과 sitemap을 추가하세요. 보호된 강의 본문은 검색엔진에 공개하지 않습니다.
- 법령·광고·결제 정책은 강의 당일 공식기관 가이드를 재확인합니다.
- 모든 강의와 실습은 넥서스웍스의 자체 교육과정이며, 학습 자료는 해당 기술·행정기관의 공식 문서를 기준으로 합니다.
