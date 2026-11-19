# 런치랩 — 실전 창업 워크숍

AI 입문자를 위한 9주·18강 서비스 창업 교육과정입니다. 한 개의 실제 서비스를 기획하고 만들고 배포하며, 검색·광고·사업 운영 실무까지 이어서 학습합니다.

## 프로젝트 구조

- `dist/index.html` — 강의 사이트의 시작점
- `dist/app.js` — 18개 강의 본문, 화면 전환, 학습 완료 체크
- `dist/styles.css`, `dist/overrides.css`, `dist/theme.css` — 반응형 스타일
- `dist/_headers` — Cloudflare Pages 기본 보안 헤더

빌드 도구나 별도 API 서버가 필요하지 않은 정적 웹사이트입니다. 학습 완료 표시는 방문자 브라우저의 localStorage에 저장됩니다. 가입이나 중앙 진도 관리 기능은 현재 없습니다.

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

커스텀 도메인은 Pages 프로젝트의 **Custom domains**에서 별도로 연결합니다. 루트 도메인은 Cloudflare 네임서버 설정이 필요할 수 있습니다.

## 수정 및 운영 시 참고

- 로컬 미리보기는 정적 HTTP 서버에서 `dist/`를 제공하면 됩니다.
- 새 강의·교안은 `dist/app.js`의 `chapters` 데이터를 수정합니다.
- 이 웹사이트는 해시 기반 경로(`#/chapter/01`)를 사용합니다. 강의별 검색엔진 색인이 필요한 공개 마케팅 사이트로 발전시킬 경우, 별도 정적 URL과 sitemap 생성 작업을 먼저 진행하는 것이 좋습니다.
- 법령·광고·결제 정책은 강의 당일 공식기관 가이드를 재확인합니다.
- 조코딩 강의는 선택 복습 자료이며, 이 사이트는 별도의 독립 교육과정입니다.
