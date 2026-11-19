# 가온누리 강의 콘텐츠 검토

검토일: 2026-11-20 (한국 시간)

사이트명은 제공받은 소스의 런치랩에서 가온누리로 변경했습니다. 운영 DB 이름과 인증 쿠키 등 기존 기술 식별자는 유지했습니다. 18강의 번호와 각 4개 체크 항목을 보존하여 기존 진도 데이터의 연결을 유지합니다.

가격·모델 이름·심사 기한 등 변동 값을 단정하지 않고 공식 문서와 실측을 확인하도록 수정했습니다. 법무·세무 항목은 실제 거래 구조별 확인 절차를 안내하며 운영자의 정책 확정이나 법률 검토를 대신하지 않습니다.

| 강의 | 제목 | 주요 수정 | 공식 참고자료 |
| --- | --- | --- | --- |
| 01 | 생성형 AI·에이전트와 서비스의 구조 | 멀티모달·에이전트·도구 실행 경계 | [OpenAI API 도구 사용](https://developers.openai.com/api/docs/guides/tools), [Anthropic 도구 호출](https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works), [MCP 아키텍처](https://modelcontextprotocol.io/docs/learn/architecture) |
| 02 | 돈이 되는 문제 검증 | 실제 고객 증거와 AI 가상 인터뷰 구분 | [Google SEO 시작 가이드](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=ko) |
| 03 | MVP 설계와 AI 코딩 에이전트 활용 | PRD·코딩 에이전트·MCP·diff 검토 | [MCP 아키텍처](https://modelcontextprotocol.io/docs/learn/architecture), [Anthropic 도구 호출](https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works), [GitHub Actions](https://docs.github.com/en/actions) |
| 04 | 웹 화면 만들기와 바이브 코딩 | 지원 환경·lockfile·접근성·안전한 출력 | [Vite 시작 가이드](https://vite.dev/guide/), [Next.js 설치 가이드](https://nextjs.org/docs/app/getting-started/installation), [W3C 접근성 기초](https://www.w3.org/WAI/fundamentals/accessibility-intro/) |
| 05 | AI API·구조화 출력·검색과 비용 통제 | 구조화 출력·검색/RAG·도구 원가 | [OpenAI API 도구 사용](https://developers.openai.com/api/docs/guides/tools), [구조화 출력](https://developers.openai.com/api/docs/guides/structured-outputs), [Anthropic 도구 호출](https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works), [검색과 Retrieval](https://developers.openai.com/api/docs/guides/retrieval) |
| 06 | DB·Google 로그인·사용자별 접근 권한 | Google 토큰 검증·Supabase RLS·D1 소유권 | [Supabase 행 수준 보안](https://supabase.com/docs/guides/database/postgres/row-level-security), [Google ID 토큰 검증](https://developers.google.com/identity/gsi/web/guides/verify-google-id-token), [Cloudflare D1](https://developers.cloudflare.com/d1/) |
| 07 | AI 품질 평가·보안·자동 테스트 | 고정 평가 입력·프롬프트 인젝션·CI | [GitHub Actions](https://docs.github.com/en/actions), [OpenAI API 도구 사용](https://developers.openai.com/api/docs/guides/tools), [Cloudflare D1](https://developers.cloudflare.com/d1/) |
| 08 | 서비스 포팅·호스팅·도메인·배포 | 의존성 설치·API 응답 형식·환경 분리 | [Cloudflare Pages](https://developers.cloudflare.com/pages/), [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/), [Cloudflare D1](https://developers.cloudflare.com/d1/), [GitHub Actions](https://docs.github.com/en/actions) |
| 09 | 수익모델·가격·결제·구독 | 서버 주문·승인·중복 웹훅·정산 | [토스페이먼츠 결제 연동](https://docs.tosspayments.com/guides/v2/payment-widget/integration), [전자상거래법 제17조](https://www.law.go.kr/법령/전자상거래법/제17조) |
| 10 | SEO 기술 실습 — 검색에 발견되기 | 공개 URL·회원 본문 보호·크롤링 제어 | [Google SEO 시작 가이드](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=ko), [Google 크롤링·색인 제어](https://developers.google.com/search/docs/crawling-indexing/robots/intro?hl=ko), [네이버 소유 확인 가이드](https://searchadvisor.naver.com/guide/faq-start-register) |
| 11 | AI 검색·GEO와 근거 중심 콘텐츠 | Google AI 검색과 다른 검색의 조건 구분 | [Google AI 검색 최적화 가이드](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [Google AI 기능과 웹사이트](https://developers.google.com/search/docs/appearance/ai-features?hl=ko), [Google SEO 시작 가이드](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=ko) |
| 12 | 국내외 검색 포털 실제 등록 | Bing 추가·포털 및 지도 등록 구분 | [Google SEO 시작 가이드](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=ko), [Bing Webmaster Tools](https://www.bing.com/webmasters/about), [네이버 서치어드바이저](https://searchadvisor.naver.com/start), [Daum 검색등록](https://register.search.daum.net/), [카카오비즈니스 매장관리](https://business.kakao.com/info/mystore) |
| 13 | Google Ads·네이버 광고 실습 | GA4 주요 이벤트·Ads 전환·평균 일일 예산 | [Google Ads 계정 만들기](https://support.google.com/google-ads/answer/6366720?hl=ko), [Google 광고주 인증](https://support.google.com/adspolicy/answer/15577076), [Google Ads 평균 일일 예산](https://support.google.com/google-ads/answer/1704443?hl=ko), [GA4 주요 이벤트와 전환](https://support.google.com/analytics/answer/13965727?hl=ko), [네이버 광고주센터](https://searchad.naver.com/) |
| 14 | AdSense·콘텐츠·무료 유입 | 원본 콘텐츠·정책·유입 제작 비용 | [AdSense 사이트 추가](https://support.google.com/adsense/answer/12169212?hl=ko), [Google SEO 시작 가이드](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=ko), [GA4 웹사이트 설치](https://support.google.com/analytics/answer/9304153?hl=ko) |
| 15 | GA4 주요 이벤트·퍼널·개선 실험 | 권장 이벤트·중복 구매·개인정보 제외 | [GA4 웹사이트 설치](https://support.google.com/analytics/answer/9304153?hl=ko), [GA4 주요 이벤트와 전환](https://support.google.com/analytics/answer/13965727?hl=ko), [GA4 권장 이벤트](https://developers.google.com/analytics/devguides/collection/ga4/reference/events) |
| 16 | 사업자등록·통신판매업·행정 실무 | 국세청 신청 경로·거래별 행정 확인 | [국세청 사업자등록 신청](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7776&mi=2444), [정부24 통신판매업 신고](https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=11300000006&HighCtgCD=A09006&Mcode=10020), [국세청 홈택스](https://www.hometax.go.kr/) |
| 17 | 개인정보·약관·환불·세무 체크 | 실제 데이터 흐름·2026 지침·철회 요건 | [2026 개인정보 처리방침 작성지침](https://www.privacy.go.kr/front/bbs/bbsView.do?bbsNo=BBSMSTR_000000000049&bbscttNo=20885), [전자상거래법 제17조](https://www.law.go.kr/법령/전자상거래법/제17조), [국세청 홈택스](https://www.hometax.go.kr/), [Google ID 토큰 검증](https://developers.google.com/identity/gsi/web/guides/verify-google-id-token) |
| 18 | 운영·고객지원·최종 공개 런칭 | 모델·프롬프트 변경 회귀·장애·30일 운영 | [GitHub Actions](https://docs.github.com/en/actions), [Cloudflare D1](https://developers.cloudflare.com/d1/), [OpenAI API 도구 사용](https://developers.openai.com/api/docs/guides/tools) |

검증: 공개 목차와 본문 메타데이터 일치, 18개 강의·72개 체크 항목 유지, 공개 JavaScript에 강의 이론 미포함, 이전 한글 사이트명 제거를 확인했습니다. 회원·Google 인증 테스트와 Cloudflare Functions 빌드는 별도로 실행합니다.
