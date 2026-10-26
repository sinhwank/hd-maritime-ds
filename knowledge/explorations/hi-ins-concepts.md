# Hi-INS 3종 × 디자인 시스템 3종 — 화면 기획

대상: Hi-INS의 **ECDIS**(항로 계획·감시), **BAMS**(브리지 경보 통합 관리), **CID**(항해 정보 통합 디스플레이). 1920×1080, Day 테마.
방향: Pleos · Kongsberg · Alfa Laval. 토큰만 바꾸는 게 아니라 **각 시스템의 철학으로 정보 구조부터 다시 짠다.**
Figma: Test Board › `기획 · Hi-INS`(와이어프레임) → `디자인 · Hi-INS`(Explore 라이브러리 인스턴스 + `Explore-*` 모드).

## 0. 공통 전제 (세 방향 모두 지킴)

- 제품 기능은 HD현대마린솔루션 Hi-INS 소개 기준(리서치 파일 122:105~132):
  - ECDIS — IMO 전자해도 규정 준수, 안전 항로 계획, 항로 감시(항로 제어), 충돌 방지를 위한 위험 구역 탐지·경보, 타선 실시간 표시
  - BAMS — IEC 61162-450 네트워크 송수신, 경보 데이터 이중화, 경보 상태 통합 관리·실시간 기록
  - CID — 항해 정보를 한 화면에 통합, 항해 장비·센서 실시간 표현, 사용자별 경보 레벨, 경보 가시성·오디오 제어
- 경보는 IEC 62923 BAM 우선순위(Alarm·Warning·Caution) + 카테고리(A·B·C). 경보 색은 경보에만, 상태는 색 + 아이콘 + 텍스트.
- 깜빡임은 미확인 경보에만(Hi-INS 모션 원칙 M1). ACK는 2단계: 소리 소거(Silence) → 확인(ACK).
- 현행 Hi-INS 화면의 공통 문제: 정보가 같은 무게로 나열됨, 경보가 화면마다 다른 문법, 테두리선으로만 구획.

## 1. 세 철학 요약 → 화면 문법

| | Pleos | Kongsberg | Alfa Laval |
|---|---|---|---|
| 철학 | Usability & Safety, Consistency, **Glanceability**(1~2초 판독). 운전 정보 고정 영역 + 앱 창 1~2개 + GNB | EcoAdvisor 원칙: 한눈에 보는 정보, **모든 콘텐츠를 한 뷰에**, 전문가 밀도, 같은 문법 반복 | Bricks: Foundation 하나 + HMI 계층. **장비 카드 + 상태 라벨**, 경로(breadcrumb), 하단 **모드 버튼**, "명령 진행 중" 표준화 |
| 화면 골격 | 상단 Status bar / 좌측 **고정 항해 영역** / 앱 창 / 하단 **GNB** | 얇은 Topbar / 좌측 **도구 레일** / 중앙 **히어로** / 우측 **패널 스택** / 하단 상태 띠 | Topbar + **Breadcrumb** / **카드 그리드** / 하단 **모드 바** |
| 위계 | 큰 숫자 1~3개만 크게, 나머지는 숨기거나 카드로 | 같은 크기의 촘촘한 패널, 히어로 1개만 크게 | 카드 단위로 동등, 카드 안에서 상태 라벨 → 값 순 |
| 조작 | 큰 터치 타깃, 무채색 primary | 툴바·탭·표 정렬·필터 | Start/Stop·모드 명령 + 진행 상태 |
| 경보 노출 | 상태 바의 경보 칩 + 최상위 1건 플로팅 카드 | 상시 경보 띠 + 표 | 알림 목록(경보 + 권고·메시지 유형) + 카드 상태 라벨 |

## 2. ECDIS — 항로 감시 장면

시나리오: 항로 감시 중, 다음 변침점 3.2 NM 전, 타선 1척 CPA 0.42 NM 접근(Warning).

### P-ECDIS (Pleos)
- **고정 항해 영역(좌 360px):** SOG 큰 숫자, HDG/COG, XTD 막대, 다음 WP까지 거리·시간. 앱을 바꿔도 이 영역은 그대로.
- **앱 창(나머지 전체):** 해도 1개 — 장식 없는 해도 위에 자선·항로·타선만.
- **플로팅 카드 2개:** 우상단 "다음 변침 WP3 · 3.2 NM · 14분"(정보), 타선 위 "CPA 0.42 NM / TCPA 8분"(Warning 카드, 확인 버튼 1개).
- **GNB(하단 88px):** 해도 · 항로 · 타선 · 레이어 · 경보 — 아이콘 + 라벨, 큰 터치 타깃.
- 숨기는 것: 센서 원값 목록, 해도 축척 세부 → 레이어 패널 안으로.

### K-ECDIS (Kongsberg)
- **좌측 도구 레일(64px):** 이동·측정·항로 편집·레이어·표적.
- **히어로(중앙):** 해도 + 자선 벡터 + 항로 + 타선 + 위험 구역.
- **우측 패널 스택(440px):** ① Route monitoring(To WP, BTW, DTG, XTD, ETA) ② Target(CPA/TCPA 표, 3척) ③ Sensors(HDG·SOG·POSN 출처와 상태).
- **하단 상태 띠:** 축척·투영·모드(North up)·커서 위치.
- 모든 항목이 한 화면에 동시에 보이고, 패널 문법은 BAMS·CID와 같다.

### A-ECDIS (Alfa Laval)
- **Breadcrumb:** INS / ECDIS / Route monitoring.
- **좌측(2/3):** 해도.
- **우측 카드 열:** 장비 카드 3장 — Route(상태 라벨 NORMAL), Target(상태 라벨 WARNING, CPA 값), Position sensors(NORMAL). 카드 = 상태 라벨 → 핵심 값 → 세부.
- **하단 모드 바:** PLAN · MONITOR · TRACK CONTROL — 현재 모드 강조, 모드 전환 시 "전환 중" 상태 표시.

## 3. BAMS — 다중 경보 장면

시나리오: 미확인 Alarm 1(CPA/TCPA, ECDIS), Warning 2(백업 GYRO·SOG 센서 실패, RADAR), Caution 3, 확인된 경보 다수.

### P-BAMS (Pleos)
- 표가 아니라 **카드 흐름**. 맨 위 큰 카드 1장 = 지금 대응할 경보(미확인 최상위). 큰 Silence / ACK 버튼 2개.
- 그 아래 미확인 → 확인됨 순 카드 목록(한 카드 = 아이콘·제목·출처·경과 시간).
- 고정 항해 영역은 유지(경보 대응 중에도 HDG·SOG를 놓치지 않게).
- GNB의 "경보" 탭이 활성.

### K-BAMS (Kongsberg)
- **상단 요약 띠:** Alarm·Warning·Caution 수, 미확인 수, 소리 상태, 서버 이중화 상태(Primary/Secondary).
- **히어로:** 경보 표(전체 폭 2/3) — 상태 아이콘·ID·제목·출처·시각·카테고리·ACK. 정렬·필터 툴바.
- **우측 패널:** 선택 경보 상세 — 원인 장비, 발생 이력, 권장 조치, ACK/Silence.
- **하단:** 출처별 연결 상태(INS·ECDIS·X-Band·S-Band·Conning) — 통신 단절도 한 화면에.

### A-BAMS (Alfa Laval)
- **알림 목록을 경보 밖으로 확장:** 유형 필터 칩 Alarm · Warning · Caution · Advice · Message.
- **좌측:** 장비(출처) 카드 그리드 — ECDIS1, RADAR1, RADAR2, Conning, GNSS 등 각 카드에 상태 라벨과 미확인 수.
- **우측:** 선택형 알림 목록(체크박스) + 하단 "선택 항목 확인(Acknowledge selected)".
- **하단 모드 바:** Sound: NORMAL / SILENCED · Grouping ON/OFF.

## 4. CID — 협수로 조선 장면

시나리오: 트랙 제어 중 변침, ROT −12°/min, 러더 PORT 15°, 횡풍 20 kn, 수심 18 m.

### P-CID (Pleos)
- **고정 항해 영역:** HDG 큰 숫자 + 선회율.
- **앱 창 2개(1:1):** 좌 "조타·추진"(러더 2, 프로펠러 피치·RPM), 우 "환경"(바람, 수심, 조류).
- 각 창의 수치는 큰 숫자 2~3개만, 나머지는 펼치기.
- GNB: 오토파일럿 모드 칩 + 경보 칩.

### K-CID (Kongsberg)
- **4×3 계기 그리드, 한 뷰에 전부:** HDG(히어로, 중앙 2칸) · ROT · 러더 PORT/STBD · 피치·롤 · 바람 · 수심 · 속도(SOG/STW) · 추진 PORT/STBD · 스러스터 · 위치 · 항로 정보 · 경보 요약.
- 같은 계기 문법, 촘촘한 간격, 장식 없음.

### A-CID (Alfa Laval)
- **장비 카드 그리드:** Steering(상태 라벨 AUTO · TRACK), Propulsion PORT / STBD(RUNNING), Bow thruster(STANDBY), Environment, Position.
- 카드마다 상태 라벨 → 대표 값 → 소형 계기.
- **하단 모드 바:** HAND · AUTO · TRACK (오토파일럿), 명령 진행 상태.

## 5. 평가 포인트 (비교 보드에서 볼 것)

- 경보가 1~2초 안에 눈에 들어오는가 (세 제품 공통)
- 같은 방향 안에서 ECDIS·BAMS·CID가 한 제품군으로 보이는가 (골격 일관성)
- 실제 브리지 사용(장갑, 진동, 거리 1m)에서 터치 타깃·글자 크기가 충분한가
- Pleos 무채색 강조가 계기·데이터 판독을 해치지 않는가
