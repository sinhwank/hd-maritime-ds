# HD-MDS 프로젝트 규칙 (모든 세션에 적용)

HD현대 선박 통합 솔루션(SDV 플랫폼)의 디자인 시스템과 대표 화면 20본을 만드는 프로젝트입니다.
고객: HD현대중공업 / 수행: pxd. 4대 도메인: 항해 · 기관 자동화 · 최적운영 · 관리.

## 기준 데이터 우선순위
1. 이 레포의 스펙(`tokens/`, `components/`, `screens/`, `domain/`)이 기준이고, Figma는 결과물입니다.
2. Figma에서 발견한 차이는 Figma를 고치거나, 스펙 변경을 **제안**합니다. 스펙을 몰래 Figma에 맞추지 않습니다.
3. 파일 키는 `figma.config.json`에서 읽습니다. 하드코딩 금지.
4. **OpenBridge 원본(`figma.config.json` → `openbridge.files`)은 읽기 전용입니다.** `use_figma`로 쓰기 금지. 구조 요약은 `knowledge/openbridge/README.md`.

## Figma 폴더 (`99. 클로드테스트`)
- `Source_Open Bridge`: OpenBridge 원본 12개. 수정 금지.
- `Design System`: HD-MDS Library, HD-MDS Icon Pack — OpenBridge 6.1 복제본을 HD에 맞게 수정해 가는 라이브러리.
- `Key Screen`: Test Board — 디자인 시스템으로 주요 화면을 테스트하는 곳.
- `figma.config.json`의 `legacy` 파일(HD-MDS · 00~04)은 사용하지 않습니다.

## 절대 규칙
- 색·간격·반경·타이포는 **반드시 Variable/토큰 바인딩**. 하드코딩 hex 금지.
- 테마는 OB `Palette` 컬렉션의 모드(Day·Dusk BETA·Night BETA·Bright BETA), 크기는 `Component-size` 모드(Regular~XL)로 처리하고 variant로 만들지 않습니다.
- 변수·컬렉션·모드 이름은 **OpenBridge 이름을 그대로** 씁니다. 새 토큰 체계를 만들지 않습니다. HD 변경은 `tokens/overrides`, 신규는 `tokens/additions`에 기록합니다.
- 조작 상태(`interaction`)와 장비·경보 상태(`status`, `alarm`)는 **별도 variant 축**입니다.
- 경보 색(OB `Color/Alert/*`, `Color/Styles/Alarm|Warning|Caution/*`)은 경보 의미로만 씁니다. 장식·브랜드 강조에 쓰지 않습니다.
- 상태는 **색만으로 구분하지 않습니다** (아이콘, 형태, 텍스트를 함께).
- Test Board에서는 Library·Icon Pack 인스턴스만 사용하고 detach 금지.
- OB 컴포넌트를 수정할 때 기존 variant 이름·기본값을 유지합니다 (기존 인스턴스가 깨지지 않게).
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
