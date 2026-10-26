# OpenBridge 원본 인벤토리

Figma 폴더 `99. 클로드테스트 / Source_Open Bridge`에 있는 원본 12개. **읽기 전용** — 수정은 HD 디자인 시스템 쪽에서만 합니다.
파일 키는 `figma.config.json` → `openbridge.files`. (조사일: 2026-10-26)

| 키 | 파일 | 페이지 | 용도 |
|---|---|---|---|
| core-6.1 | 1. OpenBridge 6.1 | Templates, 01 Application components, 02 UI components, 03 Bars & graphs, 04 Instruments, 05 Map & navigation, 06 AR & video overlays, 07 Automation, 08 Integration system (BETA), 09 Palette, 10 Building blocks, 11 UI building blocks | **메인 라이브러리. HD 디자인 시스템의 기반** |
| icons | 1. OpenBridge Icon Pack | UI, Alert, Application, Maritime, Devices & sensors, Weather, Automation, Cursors, IEC, All icons for export | 아이콘 |
| install-guide | 1. OpenBridge 6.1 Installation Guide & Toolkit | OpenBridge Install | 라이브러리 설치·모드 전환 방법 |
| alerts | OpenBridge Alerts | Alert pattern update review, Sketching | 경보 패턴 (IEC 62923 BAM) |
| automation | OpenBridge Automation | Case | 기관·자동화 미믹 사례 (HiCONiS 비교 대상) |
| instruments | OpenBridge Instruments | Documentation | 계기 |
| advice-system | OpenBridge Advice System | Documentation, Presentation, Components | AI 에이전트 제안 UI 참고 |
| integration-6.0 | OpenBridge 6.0 Integration System | Integration system, Integration sketching, Seminar, Screen Control Sketching | 통합 화면 (SDV 통합 참고) |
| small-screens | OpenBridge Small Screens | Small screen case | 소형 화면 |
| ar-framework | OpenBridge 6.1 AR framework | Documentation, Prototypes, Config | 오버헤드·AR |
| video-camera | OpenBridge 6.1 Video and Camera | Documentation, Config | 영상 |
| wind-propulsion | OpenBridge 6.1 Wind-Assisted Propulsion | Case | 사례 |

## 1. OpenBridge 6.1 변수 구조 (요약)

변수 4,519개(18개 컬렉션), 텍스트 스타일 48개(Noto Sans), 이펙트 스타일 11개. 컴포넌트 세트: 02 UI components 103개, 07 Automation 75개.

| 컬렉션 | 모드 | 변수 수 | 메모 |
|---|---|---|---|
| Palette | Day, Dusk BETA, Night BETA, Bright BETA, Dusk High Contrast BETA, Day 6.2 BETA, Dusk 6.2 BETA | 809 | **시맨틱 색·그림자·타이포. 테마 전환의 핵심** |
| Color-primitives-day / dusk / night | WCAG·APCA 등 변형 | 350 / 346 / 296 | 원시 팔레트 (테마별 분리) |
| Palette-day-configuration, Palette-night-config | Regular·Update 08 / Default·Beta·Concept | 495 / 314 | 테마별 세부 설정 |
| Color-style | Normal, Flat, Indent, Raised, Selected, Amplified, Running, Caution, Warning, Alarm | 10 | 컴포넌트 상태 스타일 (경보 상태 포함) |
| Color-categorical | Neutral … Indigo (10) | 12 | 범주형 색 |
| Component-size | Regular, Medium, Large, XL | 1,650 | 크기 스케일 (UI·App·Instrument·Automation 등) |
| .typography-primitives / Typography-primitives-6.2 | Regular·Medium·Large / 1 | 24 / 48 | 타이포 |
| Set-component-corners, Set-scale-type, Set-X/Y-Amount, Set Items count, Set-instrument-digits | 구성용 | — | 컴포넌트 내부 구성 스위치 |

### HD 디자인 시스템에 주는 함의
- 테마 4종(bright·day·dusk·night)과 경보 상태(Running·Caution·Warning·Alarm)가 **이미 Variable mode로 설계**되어 있다 → 처음부터 만들지 말고, 이 구조를 유지한 채 **값(primitive·palette)을 HD 아이덴티티로 교체**하는 방식이 맞다.
- Dusk·Night·Bright는 아직 BETA → HD에서 확정 필요.
- Component-size의 4단계 크기 모드는 디스플레이 환경(MFD·오버헤드·콕핏) 대응에 그대로 쓸 수 있다.
- 경보: `Color/Alert/*`에 Alarm·Warning·Caution·Running과 함께 Low-integrity·Invalid(저신뢰·무효 데이터), inactive, container, tint 변형이 이미 있다.
- 배관 매질: `Color/Automation/Medium/*` 14종 (Fresh-water, Sea-water, Fuel, Oil, Steam, Flammable-gas, Non-flammable-gas, Fire-fighting, Acid-alkalis, Waste, Air-ventilation, Hot, Cold, Masses) → HiCONiS 매질 색과 대조 대상.
- 밸브(`Valve two-way`) 상태는 Open·Static·Closed·Opening·Closing만 있고 고장·통신 단절·현장 수동 표현은 없다 → HD 확장 대상.
