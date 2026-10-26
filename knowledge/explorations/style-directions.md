# 스타일 방향 탐색 — Pleos · Kongsberg · Alfa Laval (Day)

조사일 2026-10-26. 목적은 HD-MDS의 시각 방향을 정하기 전에, 성격이 다른 레퍼런스 3개를 **같은 OB 컴포넌트 위에서** 비교하는 것입니다.
참조하는 건 스타일 특성(명도·채도·모서리·밀도·그림자·타이포 위계)이고, 로고·일러스트·브랜드 전용 서체 같은 자산은 가져오지 않습니다.

- Figma: HD-MDS Explore (`figma.config.json` → `files.exploration`), 비교 보드는 Test Board
- 값: `tokens/explorations/*.yaml` (생성 스크립트 `scripts/explore-ramp.mjs`)
- 리서치 원자료: 사전 리서치 파일 (`figma.config.json` → `research`)

## 1. 레퍼런스 특성

| | Pleos Connect | Kongsberg (EGGS 작업) | Alfa Laval (EGGS · Bricks) |
|---|---|---|---|
| 근거 | 공식 디자인 가이드 document.pleos.ai (foundations/colors·typography·shadow, basic-button) | EGGS 케이스 이미지: EcoAdvisor, K-Sim ECDIS | `@alds/bricks` 0.2.1 npm 토큰 + EGGS HMI 케이스 |
| 신뢰도 | **실측** | **추정** (공개 DS 없음) | **실측**(웹) + 추정(HMI) |
| 중립색 | 차가운 슬레이트 Grayscale 11단계 #FFFFFF·#F7F8FA·#EDEEF2·#E0E1E6·#C7C9CE·#A4A8AE·#686A72·#44464E·#313236·#1D1E21·#131417 (H≈275, 낮은 채도) | 청회색 강철 톤. 배경 #121214, 패널 #2D3037, 경계 #4C5058 (화면 샘플) | 순수 무채색 Steal 90/70/55/15/05 = #1A1A1A·#4D4D4D·#737373·#D9D9D9·#F2F2F2 |
| 강조·조작 | **무채색 강조** — filled 버튼 basic_600 #44464E, 눌림 basic_700. 파랑은 링크·내비게이션에만 | 시안-틸·그린 링 지표가 유일한 강조 | 짙은 네이비 Water 100 #10387F (hover #1B4EA9, active #00266A), 보조 강조 Sun #FDCC61 |
| 모서리 | 둥근 사각, 버튼 모서리 ≈ 높이의 1/3 | 직각에 가까움(2~4) | 카드·입력 0, 버튼 pill(120px) |
| 그림자 | 3단계: L1 Y6 B24 8% / L2 Y8 B32 16% + Y2 B2 8% / L3 Y20 B40 24% + Y2 B4 20% | 거의 없음, 면 명도 차로 구분 | 없음. 포커스는 2px 외곽선, 선택은 -2px 상단 inset 선 |
| 타이포 | Asta Sans. Headline 60/80·56/72·48/64 ExtraBold·Bold. 최소 12px, 줄 높이 1.5배 | 작은 라벨 + 큰 링 수치 | Roboto(웹), 0.75~4.5rem 11단계, 행간 1.15~1.5 |
| 밀도 | 낮음(주행 중 1~2초 판독) | 높음(한 화면에 전부, 전문가용) | 중간. 간격 4px 단위 |
| 테마 | Light·Dark 쌍을 토큰 이름으로 연결 | 다크 위주 | HMI Light·Dark를 같은 컴포넌트로 |

## 2. OB 변수 매핑 (원시값만 교체, Palette alias 유지)

Palette Day는 거의 모두 `Color-primitives-day`를 alias로 참조합니다(634건). 그래서 방향은 원시 컬렉션의 **모드**로 넣고, 비교 프레임에서 모드만 바꿉니다.

| 특성 | OB 변수 | 방법 |
|---|---|---|
| 배경·컨테이너 | `Primitives-day/Surface/*` (5) | 레퍼런스 중립색 |
| 텍스트·경계·아이콘 | `Primitives-day/Neutral/*` (18) | 〃 |
| 조작·선택·계기 강조 | `Primitives-day/Blue/*` (15) + `Base/Blue` | 레퍼런스 강조색. Color/Styles 35건, Element 5건, Instrument 4건이 이 램프를 씀 |
| 모서리 | `component-primitives / Border-radius/br-*` | 모드별 값. 이름(br-4 등)은 OB 그대로 두고 값만 바꿈(탐색용) |
| 큰 글씨 | `.typography-primitives / font-family/Display` (추가) | 22px 이상 스타일 17개에 HD현대체 |
| 그림자 | `Palette / Shadow/*` (Day 모드에 raw 값) | **이번 모드에는 넣지 않음** — Palette 모드를 늘려야 해서 제안만 (아래 5절) |

색 램프는 OB의 단계별 명도(OKLCH L)를 그대로 두고 색상·채도만 바꿨습니다. 그래서 OB가 맞춰 둔 대비 관계(텍스트 4.5:1 등)는 크게 달라지지 않습니다.

| 방향 | Surface·Neutral | Blue 램프 | 모서리 br-2/4/6/8/12/16/24 |
|---|---|---|---|
| Explore-Pleos | Pleos Grayscale을 OB 명도에 보간 | 채도 0.3배 슬레이트(H 272) — 거의 무채색 | 4 / 8 / 16 / 16 / 24 / 24 / 32 |
| Explore-Kongsberg | H 250, 채도 0.012 청회색 | 시안-틸 H 215 | 2 / 2 / 4 / 4 / 6 / 8 / 12 |
| Explore-AlfaLaval | 순수 무채색(OB와 사실상 동일) | 네이비 H 262, 채도 1.35배 | 전부 0 |

## 3. 지킨 것 — 안전 의미 색

- `Primitives-day/Alarm·Warning·Caution·Running·Critical-alarm·Notification` 및 매질에 쓰이는 Cyan·Mint·Orange·Yellow·Red·Pink·Purple·Indigo·Green·Teal·Brown 램프는 세 모드 모두 **WCAG 모드 원본 값**입니다(적용 후 검증: 차이 0건).
- 참고 — 레퍼런스의 경보 체계 관찰 (변경 제안 아님): Bricks는 Negative = 브랜드 Heat 레드 #D30D0D, Warning = Rise 오렌지 #EA7119로 브랜드 색이 곧 상태 색입니다. 경보 색을 장식에 쓰지 않는 HD 규칙과 맞지 않아 그대로 가져오면 안 됩니다. Alfa Laval HMI의 알림 목록이 Alarm·Warning 외에 권고·메시지·디버그를 한 목록에서 다루는 점은 BAM 확장 검토 때 참고할 만합니다.

## 4. Dusk·Night 조정안 (THM-02, 이번에는 적용하지 않음)

세 레퍼런스의 "다크"는 실내·주행용 다크 테마이고, 브리지 야간 시인(암순응)용이 아닙니다. 다크 값을 Night에 그대로 쓰면 THM-02(넓은 밝은 면 금지, 경보 외 고채도 금지)를 어깁니다.

| 방향 | Dusk BETA 제안 | Night BETA 제안 |
|---|---|---|
| Pleos | Pleos Dark Grayscale(#131417·#1D1E21·#313236·#44464E)을 `Color-primitives-dusk` 중립 램프에 명도 보간 | OB Night 구조 유지. 중립 램프 색상각만 H≈275로 맞추고, 최대 휘도는 OB Night 상한 이하 |
| Kongsberg | EcoAdvisor 톤(#121214·#2D3037)과 가장 잘 맞음. 시안-틸 강조는 채도 0.6배 | 강조 채도 0.3배 이하(고채도 금지). 링 지표의 밝은 그린 사용 금지 |
| Alfa Laval | 순수 무채색 다크 + 네이비는 Dusk에서 명도를 올려야 보임(Water 90 수준) | 네이비 강조는 야간에 거의 안 보임 → 강조를 중립 명도 차로 대체 |

## 5. 비교 보드에 못 넣은 것 (제안)

- **그림자:** Pleos 3단계 값을 `Palette / Shadow/Elevation·Raised·Floating`의 Day 값으로 넣으려면 Palette에 `Day · Explore-*` 모드가 필요합니다. 방향이 Pleos 쪽으로 기울면 그때 추가를 제안합니다.
- **Alfa Laval pill 버튼:** 버튼 모서리 변수(`Global/Border-radius/border-radius-base`)는 카드·아코디언과 공유돼서 모드로 pill을 만들 수 없습니다. 컴포넌트 수준 변경이 필요합니다.
- **Pleos 무채색 강조의 부작용:** Blue 램프는 계기 바늘·데이터 계열(Color/Instrument, Color/Data)에도 쓰여서, Pleos 모드에서는 이들도 회색이 됩니다. 계기 판독성은 비교 보드에서 따로 확인이 필요합니다.

## 6. 평가 기준 (팀 점수표 초안, 1~5점)

| 기준 | 설명 | OB | Pleos | Kongsberg | Alfa Laval |
|---|---|---|---|---|---|
| 경보 돌출 | 경보 표시가 주변 UI에 묻히지 않는가 | | | | |
| 한눈 판독 | 1~2초 안에 상태·수치를 읽을 수 있는가 | | | | |
| 밀도 적합 | Large 크기에서 기관·항해 정보량을 담는가 | | | | |
| 야간 전환 | 4절 조정만으로 THM-02를 지킬 수 있는가 | | | | |
| 도메인 통합감 | 항해·기관·최적운영·관리를 한 제품으로 보이게 하는가 | | | | |
| HD 적합성 | HD현대 브랜드·HD현대체와 어울리는가 | | | | |
