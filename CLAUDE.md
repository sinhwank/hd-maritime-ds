# HD-MDS 프로젝트 규칙 (모든 세션에 적용)

HD현대 선박 통합 솔루션(SDV 플랫폼)의 디자인 시스템과 대표 화면 20본을 만드는 프로젝트입니다.
고객: HD현대중공업 / 수행: pxd. 4대 도메인: 항해 · 기관 자동화 · 최적운영 · 관리.

## 기준 데이터 우선순위
1. 이 레포의 스펙(`tokens/`, `components/`, `screens/`, `domain/`)이 기준이고, Figma는 결과물입니다.
2. Figma에서 발견한 차이는 Figma를 고치거나, 스펙 변경을 **제안**합니다. 스펙을 몰래 Figma에 맞추지 않습니다.
3. 파일 키는 `figma.config.json`에서 읽습니다. 하드코딩 금지.

## 절대 규칙
- 색·간격·반경·타이포는 **반드시 Variable/토큰 바인딩**. 하드코딩 hex 금지.
- 테마(bright·day·dusk·night)는 **Variable mode**로 처리하고 variant로 만들지 않습니다.
- 조작 상태(`interaction`)와 장비·경보 상태(`status`, `alarm`)는 **별도 variant 축**입니다.
- 경보 색(`status.alarm|warning|caution`)은 경보 의미로만 씁니다. 장식·브랜드 강조에 쓰지 않습니다.
- 상태는 **색만으로 구분하지 않습니다** (아이콘, 형태, 텍스트를 함께).
- Products 파일에서는 라이브러리 인스턴스만 사용하고 detach 금지.
- OpenBridge에서 온 요소는 컴포넌트 description에 `origin:`을 남깁니다 (라이선스·출처 추적).
- `status: approved`가 아닌 스펙은 Figma 라이브러리에 publish하지 않습니다 (draft 페이지에만).

## 작업 루프
생성(Builder) → `get_screenshot` → 비평(Critic: `maritime-rules` + `golden/`) → `ds-audit` → 위반 0까지 반복 (최대 3회, 이후 사람에게 질문).

## 사람 승인이 필요한 것
브랜드·아이덴티티, primitive 팔레트, 경보/상태 색 체계, 핵심 컴포넌트 첫 버전, 대표 화면 첫 1~2본.
AI는 승인된 것을 바탕으로 **양**(variant, 테마, 해상도, 나머지 화면, 공정도)을 맡습니다.

## 용어
- 항해사 / 기관사 / 육상 관제·운영자, ECR(엔진 컨트롤룸), MFD, PUI(물리 조작부), 미믹(공정도)
- HiCONiS(기관·화물 통합 자동화), ISS(모니터링·최적운항), SDB(SW 중심 선박 플랫폼), DT 포털
- 적용 형태: 오버헤드 디스플레이 / DT 포털 / 2인 콕핏

## 보안
고객 원본 자료(필로소피 문서, 호선 데이터, 인터뷰 원문)는 `knowledge/`에 요약만 두고 원문은 커밋하지 않습니다 (.gitignore의 `**/_private/`).
