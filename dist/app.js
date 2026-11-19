const sources={
  cloudflare:{label:'Cloudflare Pages 공식 문서',url:'https://developers.cloudflare.com/pages/',note:'정적 웹 배포 및 도메인 연결'},
  github:{label:'GitHub Pages 공식 문서',url:'https://docs.github.com/en/pages',note:'정적 페이지 무료 호스팅'},
  googleSEO:{label:'Google SEO 시작 가이드',url:'https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=ko',note:'검색 친화성 공식 안내'},
  googleAI:{label:'Google AI 검색 최적화 공식 가이드',url:'https://developers.google.com/search/docs/fundamentals/ai-optimization-guide',note:'GEO 과장 정보 구별을 위한 2026 안내'},
  aiFeatures:{label:'Google AI 기능 및 웹사이트',url:'https://developers.google.com/search/docs/appearance/ai-features?hl=ko',note:'AI 개요·AI 모드와 색인 요건'},
  naver:{label:'네이버 서치어드바이저',url:'https://searchadvisor.naver.com/start',note:'사이트 등록·소유 확인·검색 현황'},
  naverGuide:{label:'네이버 소유 확인 가이드',url:'https://searchadvisor.naver.com/guide/faq-start-register',note:'HTML 파일·메타태그 방식'},
  daum:{label:'Daum 검색등록',url:'https://register.search.daum.net/',note:'무료 신규 등록·검토 신청'},
  kakao:{label:'카카오비즈니스 매장관리',url:'https://business.kakao.com/info/mystore',note:'오프라인 매장이 있는 경우'},
  googleAds:{label:'Google Ads 계정 만들기',url:'https://support.google.com/google-ads/answer/6366720?hl=ko',note:'광고주 계정·예산·결제·전환'},
  adsVerify:{label:'Google 광고주 인증 안내',url:'https://support.google.com/adspolicy/answer/15577076',note:'요청 시 사업·신원 확인'},
  naverAds:{label:'네이버 광고주센터',url:'https://searchad.naver.com/',note:'국내 검색광고'},
  adsense:{label:'Google AdSense 사이트 추가',url:'https://support.google.com/adsense/answer/12169212?hl=ko',note:'광고를 게시해 수익을 얻는 별도 제품'},
  ga4:{label:'GA4 웹사이트 설치 공식 가이드',url:'https://support.google.com/analytics/answer/9304153?hl=ko',note:'계정·속성·웹 데이터 스트림'},
  biz:{label:'국세청 사업자등록 신청',url:'https://ems.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7777&mi=2444',note:'개시 전 또는 개시 후 20일 이내 신청'},
  ecommerce:{label:'정부24 통신판매업 신고',url:'https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=11300000006&HighCtgCD=A09006&Mcode=10020',note:'해당 시 온라인 신고 및 제출서류'},
  privacy:{label:'개인정보위 2026 안내서 목록',url:'https://pipc.go.kr/np/cop/bbs/selectBoardList.do?bbsId=BS217&mCode=G010030020',note:'2026.4 개인정보 처리방침 지침 확인'},
  ecommerceLaw:{label:'전자상거래법 제17조',url:'https://www.law.go.kr/법령/전자상거래법/제17조',note:'청약철회와 디지털콘텐츠 예외'},
  tax:{label:'국세청 홈택스',url:'https://www.hometax.go.kr/',note:'사업자등록·증빙·신고'},
};
const phases=[
  {id:'plan',number:'01',name:'생각을 상품으로',description:'AI 이해, 고객 문제 발굴, 판매 가능한 MVP 설계',range:'CH 01–03'},
  {id:'build',number:'02',name:'서비스 실제 구현',description:'화면부터 API·DB·보안·테스트·운영 배포까지',range:'CH 04–08'},
  {id:'launch',number:'03',name:'돈 받는 서비스',description:'가격·결제와 검색노출 SEO·GEO·포털 등록',range:'CH 09–12'},
  {id:'grow',number:'04',name:'유입과 성장',description:'구글 광고·애드센스·지표 분석과 개선',range:'CH 13–15'},
  {id:'business',number:'05',name:'진짜 사업 운영',description:'사업자 행정, 법무·세무, 장애대응, 최종 출시',range:'CH 16–18'},
];
const chapters=[
  {id:'01',week:1,phase:'plan',title:'AI, 제품, 1인 창업의 지도',sub:'AI를 모르는 사람도 서비스 비즈니스가 돌아가는 전체 흐름을 이해한다.',result:'서비스 구조도 1장',checkCount:4},
  {id:'02',week:1,phase:'plan',title:'돈이 되는 문제 검증',sub:'코딩 전에 고객이 정말 필요로 하는 서비스인지 증거를 수집한다.',result:'고객 인터뷰 5건 + 검증표',checkCount:4},
  {id:'03',week:2,phase:'plan',title:'MVP 설계와 AI 개발 지시서',sub:'비개발자도 AI 코딩 도구에 전달할 수 있는 설계 문서를 완성한다.',result:'PRD·화면 흐름·검수 기준',checkCount:4},
  {id:'04',week:2,phase:'build',title:'웹 화면 만들기와 바이브 코딩',sub:'프롬프트로 실제 작동하는 반응형 화면을 만들고 직접 고친다.',result:'작동하는 프론트엔드',checkCount:4},
  {id:'05',week:3,phase:'build',title:'AI API 연결과 비용 통제',sub:'프론트엔드를 실제 AI 결과를 내는 서비스로 바꾼다.',result:'AI 기능이 돌아가는 MVP',checkCount:4},
  {id:'06',week:3,phase:'build',title:'DB·로그인·개인정보 최소 수집',sub:'사용자 데이터를 안전하게 저장하고 권한을 통제한다.',result:'DB·인증·기본 권한 테스트',checkCount:4},
  {id:'07',week:4,phase:'build',title:'테스트·보안·운영 준비',sub:'“내 컴퓨터에서 됨”을 넘어 고객이 써도 괜찮은 품질로 만든다.',result:'출시 전 QA 리포트',checkCount:4},
  {id:'08',week:4,phase:'build',title:'서비스 포팅·호스팅·도메인·배포',sub:'로컬 시제품을 실제 인터넷에 운영 가능한 서비스로 배포한다.',result:'HTTPS 공개 URL + 릴리스 기록',checkCount:4},
  {id:'09',week:5,phase:'launch',title:'수익모델·가격·결제·구독',sub:'무료 사용자가 유료 고객이 되는 구조를 만들고 한 건의 거래를 안전하게 처리한다.',result:'가격표 + 테스트 결제 흐름',checkCount:4},
  {id:'10',week:5,phase:'launch',title:'SEO 기술 실습 — 검색에 발견되기',sub:'검색엔진이 읽고 이해할 수 있는 페이지를 만든다.',result:'SEO 점검표 + 검색 콘솔',checkCount:4},
  {id:'11',week:6,phase:'launch',title:'GEO — AI 검색에서 인용될 정보 만들기',sub:'ChatGPT·Google AI 검색 시대에 신뢰 가능한 출처 페이지를 설계한다.',result:'질문형 지식 페이지 3개',checkCount:4},
  {id:'12',week:6,phase:'launch',title:'국내외 검색 포털 실제 등록',sub:'Google, 네이버, Daum과 매장형 서비스의 카카오 등록을 구분해 완료한다.',result:'검색엔진별 등록·검증 기록',checkCount:4},
  {id:'13',week:7,phase:'grow',title:'Google Ads·네이버 광고 실습',sub:'적은 예산으로 첫 유료 고객을 찾되 반드시 전환을 측정한다.',result:'캠페인 기획안 + 측정 가능한 광고',checkCount:4},
  {id:'14',week:7,phase:'grow',title:'AdSense·콘텐츠·무료 유입',sub:'광고비를 쓰는 방법과 광고수익을 받는 방법을 확실히 분리한다.',result:'유입 채널별 콘텐츠 달력',checkCount:4},
  {id:'15',week:8,phase:'grow',title:'GA4·퍼널·지표 기반 개선',sub:'감이 아니라 실제 고객 행동 데이터로 다음 기능과 마케팅을 결정한다.',result:'실사용 퍼널 대시보드',checkCount:4},
  {id:'16',week:8,phase:'business',title:'사업자등록·통신판매업·행정 실무',sub:'한국에서 서비스를 실제 판매하는 주체로서 기본 신고와 준비를 이해한다.',result:'내 사업 행정 절차표',checkCount:4},
  {id:'17',week:9,phase:'business',title:'개인정보·약관·환불·세무 체크',sub:'고객의 돈과 데이터를 다루는 사업자가 지켜야 할 기본 원칙을 점검한다.',result:'법무·정산 준비 체크 패키지',checkCount:4},
  {id:'18',week:9,phase:'business',title:'운영·고객지원·최종 공개 런칭',sub:'첫 30일을 운영하고 다음 개선을 결정하는 창업자 루틴을 만든다.',result:'실서비스 + 30일 운영 계획',checkCount:4}
];

const $=(sel,root=document)=>root.querySelector(sel);
const $$=(sel,root=document)=>Array.from(root.querySelectorAll(sel));
const state={filter:'all',completed:new Set(),session:{authenticated:false,unlocked:0},authLoading:true,authUnavailable:false};
const phaseById=id=>phases.find(p=>p.id===id);
const getChapter=id=>chapters.find(c=>c.id===id);
const refLink=key=>{const r=sources[key];return r?`<a class="resource-link" href="${r.url}" target="_blank" rel="noopener noreferrer"><strong>${r.label}</strong><span>${r.note}</span></a>`:''};
const doneCount=()=>state.completed.size;
const maxChecks=()=>chapters.reduce((sum,c)=>sum+c.checkCount,0);
const chDone=c=>Array.from({length:c.checkCount},(_,i)=>state.completed.has(c.id+'-'+i)).every(Boolean);
const isLocked=c=>!state.session.authenticated || chapters.indexOf(c)>=state.session.unlocked;
const safeText=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
async function api(path,method='GET',body){
  const response=await fetch(path,{method,credentials:'same-origin',headers:body?{'Content-Type':'application/json'}:{},body:body?JSON.stringify(body):undefined});
  let payload;
  try{payload=await response.json();}catch(_){payload={error:'서버 응답을 확인할 수 없습니다.'};}
  if(!response.ok)throw Object.assign(new Error(payload.error||'요청에 실패했습니다.'),{status:response.status});
  if(!response.headers.get('content-type')?.includes('application/json') || payload.error)
    throw Object.assign(new Error(payload.error||'회원 서버 연결 준비 중입니다.'),{status:503});
  return payload;
}
function progress(){
  const percent=state.session.authenticated?Math.round(doneCount()/maxChecks()*100):0;
  $('#side-progress-num').textContent=percent+'%';
  $('#side-progress-bar').style.width=percent+'%';
}
function setSession(data){
  state.session=data||{authenticated:false,unlocked:0};
  state.completed=new Set(data?.completed||[]);
  state.authUnavailable=Boolean(data?.unavailable);
  progress();updateAuthStatus();
}
function updateAuthStatus(){
  const target=$('#auth-status');
  if(!target)return;
  if(state.session.authenticated){
    target.innerHTML=`<span class="member-label" title="회원 계정">${safeText(state.session.email)}</span><button class="logout-btn" id="account-btn" type="button">계정 관리</button><button class="logout-btn" id="logout-btn" type="button">로그아웃</button>`;
    $('#account-btn').addEventListener('click',showAccount);
    $('#logout-btn').addEventListener('click',logout);
  } else {
    target.innerHTML=`<button class="auth-trigger primary" data-auth-open="signup" type="button">무료 회원가입</button><button class="auth-trigger" data-auth-open="login" type="button">로그인</button>`;
  }
}
async function refreshSession(){
  try{setSession(await api('/api/session'));}
  catch(err){setSession({authenticated:false,unlocked:0,completed:[],unavailable:true});}
  state.authLoading=false;route();
}
async function logout(){
  try{await api('/api/logout','POST',{});}catch(err){window.alert('로그아웃하지 못했습니다. '+err.message);return;}
  setSession({authenticated:false,unlocked:0,completed:[]});route();
}
function sideNav(current){
  let html=`<a href="#/" class="nav-link ${current==='home'?'active':''}" ${current==='home'?'aria-current="page"':''}><span class="nav-number">00</span><span>전체 과정 안내</span></a>`;
  for(const p of phases){
    html+=`<div class="phase-nav-title">${p.number} / ${p.name}</div>`;
    for(const c of chapters.filter(ch=>ch.phase===p.id)){
      const active=current===c.id;
      const done=chDone(c)&&state.session.authenticated;
      html+=`<a href="#/chapter/${c.id}" class="nav-link ${active?'active':''}" ${active?'aria-current="page"':''}><span class="nav-number">${c.id}</span><span>${c.title}</span>${done?'<span class="nav-check" title="완료">✓</span>':''}</a>`;
    }
  }
  $('#side-nav').innerHTML=html;
}
function chapterCard(c){
  const p=phaseById(c.phase),locked=isLocked(c);
  const label=locked?(state.session.authenticated?'선행 수업 후 공개':'회원 전용'):'강의 열기';
  return `<a class="chapter-card ${locked?'is-locked':''}" href="#/chapter/${c.id}"><div class="card-top"><span class="chapter-badge">LESSON ${c.id} <span>· ${p.name}</span></span><span class="card-week">${c.week}주차 ${chDone(c)&&state.session.authenticated?'· 완료':''}</span></div><h3>${c.title}</h3><p>${c.sub}</p><div class="card-bottom"><span class="card-result">실습 결과물 · ${c.result}</span><span class="card-go">${label}</span></div></a>`;
}
function renderOverview(){
  $('#breadcrumb').innerHTML='커리큘럼 <span>/</span> 전체 보기';document.title='전체 커리큘럼 | 런치랩';
  const displayed=state.filter==='all'?chapters:chapters.filter(c=>c.phase===state.filter);
  $('#page').innerHTML=`
  <section class="hero"><div><div class="eyebrow">실제로 만드는 사람들을 위한 실전 클래스</div><h1>아이디어를<br>실제 서비스로.<br><em>9주, 끝까지.</em></h1><p class="intro">AI를 처음 접해도 괜찮습니다. 기획에서 개발, 배포, 검색 노출, 고객 확보와 운영까지. <strong>하나의 서비스를 완성하는 과정</strong>을 차근차근 함께 진행합니다.</p><div class="btn-row"><a class="btn" href="#/chapter/01">첫 강의 살펴보기</a><a class="btn secondary" href="#roadmap">9주 커리큘럼</a></div></div><div class="hero-art"><div class="art-head"><span>THE LAUNCH PROCESS</span><span class="art-spark">✳</span></div><div class="art-stages"><div class="art-stage"><span class="art-num">01</span><div><strong>Discover</strong><small>시작할 문제를 찾고 검증합니다</small></div></div><div class="art-stage"><span class="art-num">02</span><div><strong>Build</strong><small>AI를 활용해 제품을 만듭니다</small></div></div><div class="art-stage"><span class="art-num">03</span><div><strong>Launch</strong><small>도메인과 결제를 연결합니다</small></div></div><div class="art-stage"><span class="art-num">04</span><div><strong>Grow</strong><small>고객을 만나고 서비스를 운영합니다</small></div></div></div><div class="art-foot"><div class="art-bar"></div><small>ONE SERVICE. REAL LAUNCH.</small></div></div></section>
  <div class="metric-grid"><div class="metric"><strong>09<span style="font-size:18px">주</span></strong><small>권장 교육 기간</small></div><div class="metric"><strong>18</strong><small>챕터별 상세 페이지</small></div><div class="metric"><strong>54<span style="font-size:18px">h</span></strong><small>주 2회 × 회당 3시간</small></div><div class="metric"><strong>01<span style="font-size:18px">개</span></strong><small>직접 출시할 서비스</small></div></div>
  ${state.session.authenticated
    ?`<div class="member-banner"><div><strong>이어서 학습할 시간입니다.</strong><p>현재 ${String(state.session.unlocked).padStart(2,'0')}강까지 열려 있습니다. 앞선 강의의 체크리스트를 완료하면 다음 강의가 열립니다.</p></div><a class="btn" href="#/chapter/${String(Math.min(18,state.session.unlocked)).padStart(2,'0')}">학습 이어가기</a></div>`
    :`<div class="member-banner"><div><strong>미리 살펴보고, 회원으로 학습하세요.</strong><p>전체 커리큘럼과 강의 소개는 누구나 볼 수 있습니다. 상세 내용은 무료 가입 후 1강부터 순서대로 열립니다.</p></div><button class="btn" type="button" data-auth-open="signup">무료로 학습 시작</button></div>`}
  <section><div class="section-head"><div><div class="eyebrow">수업은 이렇게 진행됩니다</div><h2>하나의 서비스를 끝까지</h2></div><p>이론 약 20% · 실습 및 피드백 약 80% 권장</p></div><div class="phase-strip">${phases.map(p=>`<div class="phase-tile"><div class="phase-tag">${p.number}단계</div><h3>${p.name}</h3><p>${p.description}</p><div class="phase-range">${p.range}</div></div>`).join('')}</div></section>
  <section id="chapters"><div class="section-head"><div><div class="eyebrow">전체 강의 목차</div><h2>18개 강의, 18개의 실습 결과물</h2></div><p>각 강의: 필수 개념 · 작업 순서 · 과제 · 완료 조건 · 주의점 · 참고자료</p></div><div class="chapter-controls" role="group" aria-label="교육 단계 필터"><button class="chip" data-filter="all" aria-pressed="${state.filter==='all'}">전체 18강</button>${phases.map(p=>`<button class="chip" data-filter="${p.id}" aria-pressed="${state.filter===p.id}">${p.name}</button>`).join('')}</div><div class="chapter-grid" id="cards">${displayed.map(chapterCard).join('')}</div></section>
  <section id="roadmap"><div class="section-head"><div><div class="eyebrow">주차별 일정표</div><h2>9주 실습 로드맵</h2></div><p>강사가 수강생의 서비스 개별 멘토링을 병행하는 구성</p></div><div class="week-table">${Array.from({length:9},(_,i)=>{const a=chapters[i*2],b=chapters[i*2+1];return `<div class="week-row"><div>${i+1}주차</div><div>${a.title}<br>${b.title}</div><div>제출물: ${a.result} / ${b.result}</div></div>`}).join('')}</div></section>
  <section><div class="section-head"><div><div class="eyebrow">수업에서 강조할 다섯 가지</div><h2>배우는 것보다, 해보는 것에 집중합니다</h2></div><p>강사가 직접 시연하고 각자의 서비스로 반복하는 원칙</p></div>
  <div class="week-table">
  <div class="week-row"><div>01</div><div>작게 만들고 바로 검증</div><div>시장 조사에만 머물지 않고, 고객에게 보여 줄 최소 제품을 만든다.</div></div>
  <div class="week-row"><div>02</div><div>빠른 개발보다 검증 가능한 개발</div><div>AI로 코드를 생성하되 테스트·비용·권한·오류 처리까지 책임진다.</div></div>
  <div class="week-row"><div>03</div><div>내 컴퓨터가 아닌 실제 인터넷</div><div>도메인·HTTPS·운영 설정·롤백을 포함해 외부에서 작동하게 한다.</div></div>
  <div class="week-row"><div>04</div><div>방문자보다 고객 행동</div><div>SEO·GEO·광고·GA4를 연결해 유입부터 결제까지 측정한다.</div></div>
  <div class="week-row"><div>05</div><div>개발자에서 사업 운영자로</div><div>사업자·환불·개인정보·세무·고객지원·손익을 직접 챙긴다.</div></div>
  </div></section>
  <section class="closing-panel"><div><div class="eyebrow">최종 수료 기준</div><h2>수료는 ‘강의 시청’이 아니라 ‘실서비스 출시’</h2><p>운영 URL, 핵심 기능 시연, 도메인·검색 등록, 전환 측정, 정책·사업 준비표, 30일 운영 계획을 6분 발표로 확인합니다. 결제·신고·광고 집행은 개인 상황에 맞춰 실제 집행 또는 안전한 모의 실습으로 선택합니다.</p></div><a class="btn" href="#/chapter/18">최종 과제 보기</a></section>
  <p class="footnote">2026년 11월 기준 실습형 강의계획서입니다. 법령·결제·검색·광고 서비스는 정책이 바뀔 수 있으므로 실습 당일 공식 문서를 다시 확인합니다.</p>`;
  $$('.chip').forEach(btn=>btn.addEventListener('click',()=>{state.filter=btn.dataset.filter;$$('.chip').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));$('#cards').innerHTML=(state.filter==='all'?chapters:chapters.filter(c=>c.phase===state.filter)).map(chapterCard).join('');}));
}
function renderChapterFull(c){
  const idx=chapters.findIndex(item=>item.id===c.id),p=phaseById(c.phase),prev=chapters[idx-1],next=chapters[idx+1];
  $('#breadcrumb').innerHTML=`커리큘럼 <span>/</span> ${c.id}강`;document.title=`${c.title} | 런치랩`;
  const count=c.checks.filter((_,i)=>state.completed.has(`${c.id}-${i}`)).length;
  const taskChecklist=c.checks.map((label,i)=>`<label class="check-item"><input type="checkbox" data-check="${c.id}-${i}" ${state.completed.has(`${c.id}-${i}`)?'checked':''}><span>${label}</span></label>`).join('');
  $('#page').innerHTML=`
  <section class="detail-hero"><div class="detail-kicker">${p.name}<span>·</span> ${c.id}강 <span>·</span> ${c.week}주차</div><h1>${c.title}</h1><p class="detail-sub">${c.sub}</p><div class="detail-meta"><span class="mini-tag">3시간 실습</span><span class="mini-tag">결과물: ${c.result}</span><span class="mini-tag">입문자 과정</span></div></section>
  <div class="learning-goal"><div class="goal-black"><div class="mini-label">이번 수업의 목표</div><h2>오늘은 이것까지<br>직접 해봅니다</h2><p>강사가 실제 작업 과정을 시연하고, 각자의 서비스에 똑같이 적용해 봅니다.</p></div><div class="goal-white"><div class="icon-tile">✓</div><div><small>완료 결과물</small><strong>${c.result}</strong><p>끝날 때 실제 작동 화면 또는 문서로 확인합니다. 서비스 형태에 따라 모의 실습으로 대체할 수 있습니다.</p></div></div></div>
  <div class="detail-cols"><div class="detail-main">
  <section class="detail-section"><h2><span class="counter">01</span> 꼭 알아야 할 개념 <small style="font-size:12px;color:#8996a9;font-weight:500">· 약 25분</small></h2><div class="theory-box"><ul>${c.theory.map(x=>`<li>${x}</li>`).join('')}</ul></div></section>
  <section class="detail-section"><h2><span class="counter">02</span> 직접 따라 하는 작업 <small style="font-size:12px;color:#8996a9;font-weight:500">· 약 120분</small></h2><div class="step-list">${c.steps.map((s,i)=>`<div class="step"><div class="step-number">${String(i+1).padStart(2,'0')}</div><div><h3>${s[0]}</h3><p>${s[1]}</p></div></div>`).join('')}</div></section>
  <section class="detail-section"><h2><span class="counter">03</span> 수업 종료 실습 미션 <small style="font-size:12px;color:#8996a9;font-weight:500">· 약 35분</small></h2><div class="exercise"><h3>오늘의 실전 미션</h3><p>${c.mission}</p><span class="deliverable">제출물 → ${c.result}</span></div></section>
  <p class="safe-disclaimer">* 수업시간은 권장 예시입니다. 외부 사업자 심사·서치엔진 색인·광고 승인·세무 신고 등은 수업 중 완료를 보장하지 않으며, 이 경우 신청/검증 단계의 증빙과 후속 확인 계획을 제출합니다.</p>
  </div><aside class="detail-side">
  <div class="side-card"><div class="overline">수업 체크리스트</div><h3>오늘의 완료 조건</h3>${taskChecklist}<div class="count-text" id="chapter-count">${count} / ${c.checks.length} 완료</div><p class="count-text">모든 항목을 완료하면 다음 강의가 열립니다. 수강생이 직접 확인하는 자기점검 방식입니다.</p><p class="count-text" id="unlock-notice" role="status"></p></div>
  <div class="notice-card"><h3>실무에서 자주 하는 실수</h3><ul>${c.pitfalls.map(x=>`<li>${x}</li>`).join('')}</ul></div>
  ${c.refs.length?`<div class="side-card"><div class="overline">공식 참고자료</div><h3>실습할 때 참고하기</h3>${c.refs.map(refLink).join('')}</div>`:''}
  </aside></div>
  <nav class="detail-bottom-nav" aria-label="앞뒤 챕터">${prev?`<a href="#/chapter/${prev.id}">← CH ${prev.id} 이전</a>`:`<a href="#/">← 전체 요약</a>`}<a href="#/chapter/${next?next.id:'01'}">${next?`다음 CH ${next.id} →`:'처음부터 다시 →'}</a></nav>`;
  $$('input[data-check]').forEach(el=>el.addEventListener('change',async()=>{
    el.disabled=true;
    const before=state.session.unlocked;
    const checkIndex=Number(el.dataset.check.split('-')[1]);
    try{
      const update=await api('/api/progress','POST',{chapterId:c.id,checkIndex,completed:el.checked});
      setSession(update);
      $('#chapter-count').textContent=c.checks.filter((_,i)=>state.completed.has(c.id+'-'+i)).length+' / '+c.checks.length+' 완료';
      if(update.unlocked>before)$('#unlock-notice').textContent='다음 강의가 열렸습니다! 목차에서 바로 이동할 수 있어요.';
      sideNav(c.id);
    }catch(err){
      el.checked=!el.checked;
      $('#unlock-notice').textContent=err.message;
    }finally{el.disabled=false;}
  }));
}
function renderChapterTeaser(c){
  const index=chapters.findIndex(item=>item.id===c.id);
  const p=phaseById(c.phase);
  const member=state.session.authenticated;
  const previous=String(Math.max(1,state.session.unlocked||1)).padStart(2,'0');
  $('#breadcrumb').innerHTML=`커리큘럼 <span>/</span> ${c.id}강 미리보기`;
  document.title=c.title+' | 런치랩 미리보기';
  $('#page').innerHTML=`
    <section class="detail-hero"><div class="detail-kicker">LESSON ${c.id} <span>·</span> ${p.name} <span>·</span> ${c.week}주차</div>
      <h1>${c.title}</h1><p class="detail-sub">${c.sub}</p>
      <div class="detail-meta"><span class="mini-tag">3시간 실습</span><span class="mini-tag">결과물: ${c.result}</span><span class="mini-tag">회원 전용 본문</span></div>
    </section>
    <div class="preview-note"><span class="preview-dot">!</span><span><strong>여기까지는 누구나 볼 수 있습니다.</strong> 수업 이론·실습 단계·과제·참고자료는 회원에게 순서대로 공개됩니다.</span></div>
    <div class="teaser-layout"><div class="teaser-card"><div class="eyebrow">COURSE PREVIEW</div>
      <h2>읽고 끝나는 강의가 아니라,<br>직접 해보는 시간입니다.</h2>
      <p>이번 수업에서는 ${c.sub} 강의 내용을 실제 서비스에 적용하고, 결과물인 <strong>‘${c.result}’</strong>을 완성하는 것이 목표입니다.</p>
      <ul><li>핵심 개념을 짧고 쉽게 정리합니다.</li><li>강사의 실제 작업을 함께 따라 합니다.</li><li>과제와 완료 조건을 확인합니다.</li><li>실무에 필요한 공식 참고자료를 확인합니다.</li></ul>
      <a class="btn secondary" style="color:#142137;border-color:#d7deea;margin-top:29px" href="#/">전체 커리큘럼 보기</a>
    </div><aside class="lock-panel"><span class="lock-symbol">${member?'◷':'✳'}</span><small>${member?'PREREQUISITE REQUIRED':'MEMBERS ONLY'}</small>
      <h3>${member?'이전 강의를 먼저 완료해 주세요.':'회원가입하면 1강부터 열립니다.'}</h3>
      <p>${member
        ?'현재 '+previous+'강까지 학습할 수 있습니다. 앞선 수업의 체크리스트를 모두 완료하면 다음 강의가 자동으로 열립니다.'
        :'무료로 가입하면 1강 본문이 열립니다. 회원별 진도는 계정에 저장되고 다음 강의가 순차적으로 공개됩니다.'}</p>
      ${member
        ?`<a class="btn" href="#/chapter/${previous}">${previous}강 학습하기</a>`
        :`<button class="btn" type="button" data-auth-open="signup">무료 회원가입</button><button class="btn secondary" style="margin-top:10px;width:100%" type="button" data-auth-open="login">기존 회원 로그인</button>`}
    </aside></div>`;
}
async function openChapter(c){
  if(isLocked(c)){renderChapterTeaser(c);return;}
  $('#page').innerHTML='<div class="lesson-loading" role="status">강의 내용을 불러오고 있습니다…</div>';
  try{
    const payload=await api('/api/chapter/'+c.id);
    if(location.hash!=='#/chapter/'+c.id)return;
    renderChapterFull({...c,...payload.chapter});
  }catch(err){
    if(location.hash!=='#/chapter/'+c.id)return;
    if(err.status===401){setSession({authenticated:false,unlocked:0,completed:[]});renderChapterTeaser(c);}
    else if(err.status===403){await refreshSession();renderChapterTeaser(c);}
    else $('#page').innerHTML=`<div class="lesson-loading">${safeText(err.message)}<p><a class="btn secondary" href="#/">커리큘럼 돌아가기</a></p></div>`;
  }
}
function route(){
  const path=location.hash.replace(/^#\/?/,'').split('/').filter(Boolean);
  const c=path[0]==='chapter'?getChapter(path[1]):null;
  if(c){openChapter(c);sideNav(c.id);}else{renderOverview();sideNav('home');}
  progress();
  if(path[0]==='roadmap')requestAnimationFrame(()=>$('#roadmap')?.scrollIntoView({behavior:'smooth'}));
  else window.scrollTo({top:0,behavior:'instant'});
  $('#sidebar').classList.remove('open');$('#menu-btn').setAttribute('aria-expanded','false');
  const overlay=$('.mobile-overlay');if(overlay)overlay.hidden=true;
}
const overlay=document.createElement('div');overlay.className='mobile-overlay';overlay.hidden=true;document.body.append(overlay);
function closeMenu(){$('#sidebar').classList.remove('open');$('#menu-btn').setAttribute('aria-expanded','false');overlay.hidden=true;}
$('#menu-btn').addEventListener('click',()=>{const isOpen=$('#sidebar').classList.toggle('open');$('#menu-btn').setAttribute('aria-expanded',String(isOpen));overlay.hidden=!isOpen;});overlay.addEventListener('click',closeMenu);
const authRoot=document.createElement('div');authRoot.id='auth-root';document.body.append(authRoot);
function closeAuth(){
  authRoot.replaceChildren();
  document.body.classList.remove('modal-open');
}
function showAuth(mode='signup'){
  if(state.session.authenticated)return;
  const signup=mode==='signup';
  authRoot.innerHTML=`<div class="auth-modal"><div class="auth-backdrop" data-auth-close></div>
    <section class="auth-dialog" role="dialog" aria-modal="true" aria-labelledby="auth-heading">
    <button class="auth-close" type="button" data-auth-close aria-label="닫기">×</button>
    <span class="auth-logo">L.</span>
    <h2 id="auth-heading">${signup?'배움을 시작해 볼까요?':'다시 만나 반갑습니다.'}</h2>
    <p class="auth-intro">${signup?'무료 회원가입 후 1강부터 시작하고, 수업을 완료할 때마다 다음 강의를 열어보세요.':'가입한 이메일과 비밀번호로 로그인하면 내 학습 진도를 이어갈 수 있습니다.'}</p>
    <div class="auth-tabs"><button type="button" class="${signup?'active':''}" data-auth-mode="signup">회원가입</button><button type="button" class="${!signup?'active':''}" data-auth-mode="login">로그인</button></div>
    <form class="auth-form" id="auth-form">
      <div class="auth-field"><label for="auth-email">이메일</label><input id="auth-email" type="email" name="email" placeholder="name@example.com" autocomplete="email" maxlength="254" required></div>
      <div class="auth-field"><label for="auth-password">비밀번호</label><input id="auth-password" type="password" name="password" placeholder="${signup?'10자 이상 입력':'비밀번호 입력'}" autocomplete="${signup?'new-password':'current-password'}" minlength="10" maxlength="128" required></div>
      ${signup?`<div class="auth-field"><label for="auth-confirm">비밀번호 확인</label><input id="auth-confirm" type="password" name="confirm" autocomplete="new-password" minlength="10" maxlength="128" required></div>
      <label class="consent-row"><input type="checkbox" name="terms" required><span><a href="terms.html" target="_blank" rel="noopener">이용약관</a>과 <a href="privacy.html" target="_blank" rel="noopener">개인정보 처리방침</a>에 동의합니다.</span></label>`:''}
      <p class="auth-feedback" id="auth-feedback" role="alert"></p>
      <button type="submit" class="auth-submit">${signup?'무료로 가입하고 시작하기':'로그인하고 이어서 학습'}</button>
    </form>
    <p class="auth-note">${signup?'이메일 인증 및 비밀번호 재설정은 운영 전 추가될 예정입니다.':'비밀번호를 잊었다면 twinspa0713@gmail.com으로 문의해 주세요.'}</p>
    </section></div>`;
  document.body.classList.add('modal-open');
  $$('[data-auth-close]',authRoot).forEach(el=>el.addEventListener('click',closeAuth));
  $$('[data-auth-mode]',authRoot).forEach(el=>el.addEventListener('click',()=>showAuth(el.dataset.authMode)));
  $('#auth-email',authRoot)?.focus();
  $('#auth-form',authRoot).addEventListener('submit',async event=>{
    event.preventDefault();
    const form=event.currentTarget;
    const feedback=$('#auth-feedback',authRoot);
    const submit=form.querySelector('[type=submit]');
    const fd=new FormData(form);
    if(signup && fd.get('password')!==fd.get('confirm')){feedback.textContent='비밀번호가 서로 다릅니다.';return;}
    if(signup && fd.get('terms')!=='on'){feedback.textContent='필수 약관에 동의해 주세요.';return;}
    submit.disabled=true;submit.textContent='처리 중입니다…';feedback.textContent='';
    try{
      const member=await api(signup?'/api/signup':'/api/login','POST',{
        email:fd.get('email'),password:fd.get('password'),acceptedTerms:signup,
      });
      setSession(member);closeAuth();route();
    }catch(err){
      feedback.textContent=state.authUnavailable?'회원 서버 연결 준비 중입니다. Cloudflare 데이터베이스 설정 후 이용할 수 있습니다.':err.message;
    }finally{
      if(submit.isConnected){submit.disabled=false;submit.textContent=signup?'무료로 가입하고 시작하기':'로그인하고 이어서 학습';}
    }
  });
}
function showAccount(){
  if(!state.session.authenticated)return;
  authRoot.innerHTML=`<div class="auth-modal"><div class="auth-backdrop" data-auth-close></div>
  <section class="auth-dialog" role="dialog" aria-modal="true" aria-labelledby="account-title">
  <button class="auth-close" type="button" data-auth-close aria-label="닫기">×</button>
  <span class="auth-logo">L.</span><h2 id="account-title">내 계정 관리</h2>
  <p class="auth-intro">현재 계정: ${safeText(state.session.email)}</p>
  <form id="delete-form" class="auth-form">
    <div class="auth-field"><label for="delete-password">회원 탈퇴를 위한 비밀번호 확인</label><input id="delete-password" type="password" name="password" autocomplete="current-password" required></div>
    <p class="auth-note">탈퇴하면 계정 및 학습 체크 기록이 삭제되며 복원할 수 없습니다.</p>
    <p class="auth-feedback" id="delete-feedback" role="alert"></p>
    <button class="auth-submit" type="submit">계정과 진도 기록 삭제</button>
  </form></section></div>`;
  document.body.classList.add('modal-open');
  $$('[data-auth-close]',authRoot).forEach(el=>el.addEventListener('click',closeAuth));
  $('#delete-form',authRoot).addEventListener('submit',async event=>{
    event.preventDefault();
    if(!window.confirm('계정과 진도 기록을 영구 삭제하시겠습니까?'))return;
    const submit=event.currentTarget.querySelector('[type=submit]');submit.disabled=true;
    try{
      await api('/api/delete-account','POST',{password:new FormData(event.currentTarget).get('password')});
      closeAuth();setSession({authenticated:false,unlocked:0,completed:[]});route();
    }catch(err){$('#delete-feedback',authRoot).textContent=err.message;submit.disabled=false;}
  });
}
document.addEventListener('click',event=>{
  const open=event.target.closest('[data-auth-open]');
  if(open){event.preventDefault();showAuth(open.dataset.authOpen||'signup');}
});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&authRoot.children.length)closeAuth();});
window.addEventListener('hashchange',route);
route();
refreshSession();
