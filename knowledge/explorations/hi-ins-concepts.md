# Hi-INS 3종 × 디자인 시스템 3종 — 화면 기획

대상: Hi-INS의 **ECDIS**(항로 계획·감시), **BAMS**(브리지 경보 통합 관리), **CID**(항해 정보 통합 디스플레이). 1920×1080, Day 테마.
방향: Pleos · Kongsberg · Alfa Laval. 토큰만 바꾸는 게 아니라 **각 시스템의 철학으로 정보 구조부터 다시 짠다.** 모든 배치 결정에는 "왜"를 붙인다.
Figma: Test Board › `기획 · Hi-INS`(와이어프레임 + 기획 의도) → `디자인 · Hi-INS`(Explore 라이브러리 인스턴스 + `Explore-*` 모드).

## 0. 공통 전제

### 제품 기능 (HD현대마린솔루션 Hi-INS 소개, 리서치 파일 122:105~132)
- ECDIS — IMO 전자해도 규정 준수, 안전 항로 계획, 항로 감시(항로 제어), 충돌 방지를 위한 위험 구역 탐지·경보, 타선 실시간 표시
- BAMS — IEC 61162-450 네트워크 송수신, 경보 데이터 이중화, 경보 상태 통합 관리·실시간 기록
- CID — 항해 정보를 한 화면에 통합, 장비·센서 실시간 표현, 사용자별 경보 레벨, 경보 가시성·오디오 제어

### 현행 Hi-INS 화면에서 고칠 문제 (리서치 파일 168:93 캡처 관찰)
1. **위계 없음** — CID는 20여 개 값이 같은 글자 크기·같은 테두리 박스에 나열된다. 지금 봐야 할 값이 안 보인다.
2. **경보 문법이 화면마다 다름** — ECDIS는 우측 패널 아이콘, BAMS는 표, CID는 우상단 카드. 같은 경보를 세 방식으로 읽어야 한다.
3. **구획을 선으로만 함** — 모든 영역이 1px 테두리로 나뉘어 화면이 "격자"로 읽힌다.
4. **조작과 표시가 섞임** — ACK 버튼, 모드 버튼이 표시 값 사이에 흩어져 있다.

### 바꾸지 않는 것 (안전 규칙)
- 경보는 IEC 62923 BAM 우선순위(Alarm·Warning·Caution) + 카테고리(A·B·C). 경보 색은 경보에만, 상태는 색 + 아이콘 + 텍스트.
- 깜빡임은 미확인 경보에만(Hi-INS 모션 원칙 M1). ACK는 2단계: 소리 소거(Silence) → 확인(ACK).
- 경보 색·매질 색은 세 방향 모두 OB 원본.

## 1. 세 철학 → 화면 문법

| | Pleos | Kongsberg | Alfa Laval |
|---|---|---|---|
| 철학 | Usability & Safety, Consistency, **Glanceability**(1~2초 판독) | EcoAdvisor 원칙: 한눈에 보는 정보, **모든 콘텐츠를 한 뷰에**, 전문가 밀도 | Bricks: Foundation + HMI 계층, **장비 카드 + 상태 라벨**, 하단 **모드 버튼** |
| 근거 자료 | Pleos Connect design assets·display guide (Figma 공식 파일), document.pleos.ai | EGGS 케이스 (EcoAdvisor, K-Sim) | @alds/bricks 토큰, EGGS Alfa Laval HMI 케이스 |
| 골격 | 상단 Status bar / 좌측 **Driving view : 앱 = 1:2** / 하단 GNB | 얇은 Topbar / 좌 도구 레일 / 중앙 히어로 / 우 패널 스택 / 하단 상태 띠 | Topbar + Breadcrumb / 카드 그리드 / 하단 모드 바 |
| 크기 | OB Component-size **XL** (Pleos 버튼 64~108px, 본문 26~30px, 속도 숫자 112px) | **Regular** (조밀) | **Large** (현장 장비 앞, 장갑 터치) |
| 강조 | 큰 숫자 1~3개만 | 히어로 1개만, 나머지 같은 무게 | 카드마다 상태 라벨 |

**왜 크기 모드까지 바꾸나:** 철학 차이는 색보다 **밀도**에서 더 크게 드러난다. Pleos 공식 컴포넌트는 버튼 높이 64~108px, 본문 26px 이상이라 OB Regular(48px, 16px)로는 Pleos다움이 재현되지 않는다. OB가 이미 `Component-size` 모드(Regular~XL)를 갖고 있으므로 새 변수 없이 모드 전환만으로 맞춘다.

## 2. ECDIS — 항로 감시 장면

시나리오: 트랙 제어로 항로 감시 중, 다음 변침점 3.2 NM 전, 타선 1척 CPA 0.42 NM 접근(Warning).

### P-ECDIS (Pleos)
| 영역 | 배치 | 왜 |
|---|---|---|
| Status bar (상단 56) | 시각·모드·경보 칩 | Pleos는 시스템 정보를 앱과 분리된 상단 띠에 고정한다(display guide "Status bar"). 경보 칩이 어느 화면에서나 같은 자리에 있어야 문제 2가 해결된다. |
| Driving view (좌 1/3, 640) | SOG 큰 숫자, HDG·COG, XTD, 다음 WP | Pleos 가로 화면 규칙 "운전자 보조 영역 : 앱 = 1:2". 차의 속도·내비 안내처럼, 항해사가 해도를 어떻게 조작하든 **절대 가려지면 안 되는 값**만 둔다. 숫자는 Pleos Driving View 속도 스타일(112px)처럼 가장 크게 — 1~2초 판독. |
| 앱 창 (우 2/3) | 해도 — 자선·항로·타선만 | 앱 영역은 "지금 하는 일" 하나. 센서 원값 표는 해도 판독을 방해하므로 레이어 패널로 숨긴다(Glanceability). |
| 플로팅 카드 (해도 위) | ETA 카드, 타선 Warning 카드 | Pleos 내비는 경로·ETA를 플로팅 카드로 띄운다. 경고 카드는 **타선 바로 옆**에 붙여, 표에서 타선을 찾는 단계를 없앤다. |
| GNB (하단 88) | 해도·항로·타선·레이어·경보 | Pleos GNB는 하단 고정, 큰 터치 타깃. 브리지에서도 앉은 자세·장갑 손으로 누르기 쉬운 위치. |

### K-ECDIS (Kongsberg)
| 영역 | 배치 | 왜 |
|---|---|---|
| 도구 레일 (좌 64) | 이동·측정·항로 편집·레이어·표적 | 전문가는 도구를 자주 바꾼다. 아이콘 레일은 화면을 가장 적게 차지하면서 항상 보인다. |
| 히어로 (중앙) | 해도 + 자선 벡터 + 항로 + 타선 + 위험 구역 | EcoAdvisor처럼 화면 중심에 핵심 1개. ECDIS의 핵심은 해도. |
| 패널 스택 (우 440) | ① Route monitoring ② Target CPA/TCPA 표 ③ Sensors | "모든 콘텐츠를 한 뷰에" — 탭으로 숨기지 않는다. 숙련 항해사는 시선 이동으로 비교하는 게 탭 전환보다 빠르다. 패널 문법(제목·표·값)은 BAMS·CID와 같게 해서 문제 2를 해결. |
| 상태 띠 (하단 48) | 축척·투영·North up·커서 위치 | IMO ECDIS 성능표준이 상시 표시를 요구하는 값. 작고 일정한 위치. |

### A-ECDIS (Alfa Laval)
| 영역 | 배치 | 왜 |
|---|---|---|
| Breadcrumb | INS / ECDIS / Route monitoring | Alfa Laval HMI 상단 경로 문법. 여러 장비 화면을 오가는 통합 시스템에서 "지금 어디"를 알려 준다. |
| 해도 (좌 2/3) | 해도 | — |
| 장비 카드 열 (우) | Route · Target · Position sensors, 카드마다 상태 라벨 | Alfa Laval은 장비를 카드 + NORMAL/WARNING 라벨로 요약한다. 항해사는 값을 읽기 전에 **라벨만 훑어** 이상 카드를 찾는다(문제 1). |
| 모드 바 (하단) | PLAN · MONITOR · TRACK CONTROL, 전환 중 상태 | Alfa Laval 하단 모드 버튼(MODE·MANEUVER·BYPASS)과 "명령 진행 중" 표준. 모드 전환은 표시가 아니라 **조작**이므로 표시 영역과 분리(문제 4). |

## 3. BAMS — 다중 경보 장면

시나리오: 미확인 Alarm 1(CPA/TCPA, ECDIS), Warning 2(백업 GYRO·SOG 센서 실패, RADAR), Caution 3, 확인된 경보 다수.

### P-BAMS (Pleos)
| 영역 | 배치 | 왜 |
|---|---|---|
| Driving view (좌 1/3) | HDG·SOG·ROT 유지 | 경보 대응 중에도 배를 놓치면 안 된다. Pleos가 앱 전환 중에도 운전 정보를 고정하는 것과 같은 원리. |
| 히어로 카드 | 지금 대응할 경보 1건 + 큰 Silence / ACK | 표는 "모두 같은 무게"라 1~2초 판독이 안 된다. Pleos 시스템 알림처럼 **한 번에 하나**를 크게. 버튼은 Pleos Large(100px)급. |
| 카드 목록 | 미확인 → 확인됨 | 카드 한 장 = 한 경보. 행 대신 카드라 터치 오조작이 줄어든다. |
| GNB | 경보 탭 활성 | ECDIS·CID와 같은 GNB에서 진입 — 제품 간 일관성. |

### K-BAMS (Kongsberg)
| 영역 | 배치 | 왜 |
|---|---|---|
| 요약 띠 | Alarm·Warning·Caution 수, 미확인 수, 소리, 서버 이중화 | 전체 상황을 한 줄로. 이중화(Primary/Secondary)는 Hi-INS BAMS의 핵심 기능인데 현행 화면엔 작은 점 하나뿐이다. |
| 경보 표 (2/3) | 아이콘·ID·제목·출처·시각·Cat·ACK + 정렬·필터 | 전문가는 수십 건을 비교·정렬한다. 표는 밀도가 가장 높은 형식. OB Alert table 컴포넌트 그대로. |
| 상세 패널 (우) | 원인 장비·이력·권장 조치·ACK | 표에서 선택 → 옆에서 판단 → 같은 자리에서 조치. 화면 전환 없음("한 뷰"). |
| 출처 연결 상태 (하단) | INS·ECDIS·X-Band·S-Band·Conning | 통신 단절은 경보보다 먼저 알아야 한다(센서가 죽으면 경보도 안 온다). |

### A-BAMS (Alfa Laval)
| 영역 | 배치 | 왜 |
|---|---|---|
| 유형 필터 칩 | Alarm·Warning·Caution·Advice·Message | Alfa Laval HMI 알림 목록은 경보 외에 권고·메시지·디버그를 한 목록에서 다룬다. 경보 피로를 줄이려면 "경보가 아닌 알림"을 분리해야 한다. |
| 출처 장비 카드 (좌) | 장비별 상태 라벨 + 미확인 수 | "어느 장비가 문제인가"를 먼저 보여 준다. 문제 장비 카드를 누르면 목록이 그 장비로 필터된다. |
| 선택형 목록 (우) | 체크박스 + Acknowledge selected | Alfa Laval의 다중 선택 확인 패턴. 같은 원인의 경보 여러 건을 한 번에 처리. |
| 모드 바 | Sound NORMAL/SILENCED · Grouping | 소리·그룹핑은 **모드**이므로 하단 모드 바(조작 영역)로. |

## 4. CID — 협수로 조선 장면

시나리오: 트랙 제어 중 변침, ROT −12°/min, 러더 PORT 15°, 횡풍 20 kn, 수심 18 m.

### P-CID (Pleos)
| 영역 | 배치 | 왜 |
|---|---|---|
| Driving view (좌 1/3) | HDG 큰 숫자 + ROT | 조선 중 가장 자주 보는 두 값. 위치를 ECDIS·BAMS와 같게 해서 화면을 바꿔도 시선이 같은 곳에 간다. |
| 앱 창 2개 (우 2/3을 1:1) | 조타·추진 / 환경 | Pleos display guide의 2앱 분할. 현행 CID의 20여 칸을 **두 가지 질문**("배를 어떻게 움직이고 있나", "바깥 조건은 어떤가")으로 묶는다. 각 창의 큰 숫자 2~3개만. |
| GNB | 오토파일럿 모드 칩 + 경보 칩 | 모드는 항상 보이되 조작은 하단에서. |

### K-CID (Kongsberg)
| 영역 | 배치 | 왜 |
|---|---|---|
| 4×3 계기 그리드 | HDG(히어로 2칸) · ROT · 경보 요약 · 러더 ×2 · 추진 · 스러스터 · 바람 · 수심 · 속도·피치·롤 · 위치·항로 | 현행 CID와 정보량은 같게 두고 **질서만** 준다. 같은 크기 칸, 같은 계기 문법, 히어로 하나. 도선사·선장이 익숙한 "모든 계기가 한 판에" 형식을 지킨다. |

### A-CID (Alfa Laval)
| 영역 | 배치 | 왜 |
|---|---|---|
| 장비 카드 그리드 | Steering · Propulsion PORT/STBD · Bow thruster · Environment · Position | 계기를 **장비 단위**로 묶는다. 고장 시 "어느 장비"가 먼저고 값은 그다음 — 기관 자동화(HiCONiS)와 같은 사고방식이라 4대 도메인 통합에 유리. |
| 카드 상태 라벨 | AUTO·TRACK / RUNNING / STANDBY | 값을 읽지 않고도 상태를 안다. 색 + 텍스트 라벨이라 색만으로 구분하지 않는다. |
| 모드 바 | HAND · AUTO · TRACK, 명령 진행 상태 | 오토파일럿 모드 전환은 결과가 즉시 오지 않는다 — Alfa Laval의 "명령 진행 중" 표준을 그대로. |

## 5. 평가 포인트

- 경보가 1~2초 안에 눈에 들어오는가 (세 제품 공통)
- 같은 방향 안에서 ECDIS·BAMS·CID가 한 제품군으로 보이는가 (골격 일관성)
- 실제 브리지 사용(장갑, 진동, 거리 1m)에서 터치 타깃·글자 크기가 충분한가
- Pleos 무채색 강조가 계기·데이터 판독을 해치지 않는가
- Kongsberg 밀도가 Day 테마 대형 화면(오버헤드 디스플레이)에서도 읽히는가

## 6. 제작 결과와 발견 사항 (2026-10-26)

Figma Test Board › `디자인 · Hi-INS` — 행 ECDIS·BAMS·CID × 열 Pleos·Kongsberg·Alfa Laval, 전부 HD-MDS Explore 인스턴스. 프레임마다 `Color-primitives-day`·`component-primitives`는 해당 `Explore-*` 모드, `Component-size`는 Pleos=Large · Kongsberg=Regular · Alfa Laval=Medium.
미리보기: `hi-ins-designs-overview.png`

### OB 원본 결함 (HD-MDS Library에도 그대로 있음 → 수정 제안)
- `Generic-BETA/*` 텍스트 스타일 전체: Component-size **Medium·Large·XL에서 글자 크기가 0**으로 풀림 (Regular에서만 정상).
- `UI/Title`: **XL에서 0**.
- 크기 모드를 바꿔도 안전한 스타일: `Instrument/Value-enhanced`(32→40→64→80), `Instrument/Value-m`(24→32→48→56), `UI/Body`·`UI/Label`.
- 제안: tokens/overrides로 해당 font-size 변수의 빈 모드 값을 채운다(값은 Regular 비율로 산출) — 승인 필요.

### 남은 일
- 경보 표(K-BAMS) 2~9행의 등급 아이콘이 Alarm 아이콘으로 남아 있음 → HD-MDS Icon Pack publish·연결 후 Warning·Caution IEC 아이콘으로 교체.
- GNB·도구 레일 아이콘이 자리표시자 → 같은 이유.
- 매우 큰 숫자(Pleos 속도 112px급) 스타일이 OB에 없음 → `Instrument/Value-display` 같은 추가 스타일 제안(tokens/additions).
