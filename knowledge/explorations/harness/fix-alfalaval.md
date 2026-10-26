# Alfa Laval (→ Large로 전환) — 26:1913 ECDIS, 35:3545 BAMS, 39:5833 CID
A0 [high INP-01] 세 프레임의 Component-size explicit mode를 Medium → Large로 바꾼다(스펙 size: large). 바꾼 뒤 레이아웃 넘침 확인 후 조정.
A1 [high ALM-04] ECDIS: 장비 카드를 상태 우선순위로 정렬 — Target 017(Alarm, C3) 맨 위, 그 다음 Position sensors, Route. Position sensors는 Backup GYRO2 고장 → Tag Warning "BACKUP FAIL"(BAMS와 일치).
A2 [med] ECDIS: 모드 바에 명령 진행 상태 영역(Spinner + "TRACK CONTROL 유지 · 다음 변침 WP3 8 min")과 모드 변경 시 확인 단계 안내 텍스트("모드 변경은 확인 후 실행"). 카드 열 하단을 해도 하단에 맞춤(카드 높이 fill). 해도 모서리에 '1:25,000 · North up' 텍스트.
A3 [high ALM-03] BAMS: GNSS2 '신호 없음'은 Caution Tag 금지 → 출처 카드 Tag Gray "NO SIGNAL" + 설명 "값 표시 중단". Caution 행도 동일 처리하거나 'Caution'은 실제 Caution 경보(예: 'Approach to CRIT PNT · ECDIS1')로 바꿈.
A4 [med] BAMS 목록: Alert message item 폭을 행 폭에 맞춤(C7). Caution/Advice/Message 행을 위 행들과 같은 높이·시작점(체크박스 자리 확보). Checkbox(32px) → Checkbox item(240x48 계열) 또는 Large 모드로 48 이상. 목록 패널을 모드 바까지 fill로 늘리고 '확인됨 12' 그룹 헤더 + 행 2개 추가.
A5 [high spec] CID Steering: Rudder 그림이 PORT 15°(좌측)로 보이게(C9), "Rudder P15°" 값과 "Set HDG 198°"(명령값, Body + 라벨 '명령') 함께 표시.
A6 [high spec] CID Environment: Rel. wind 값을 Value-enhanced(원인 강조), 풍향 078°, 수심 18.0 m · UKC 6.5 m 분리, Tag Caution(아이콘 on)은 실제 Caution 경보와 일치.
A7 [med] CID: 카드마다 1차 값 하나만 Value-enhanced, 나머지 Value-m. 게이지(Gauge-radial-270) 크기를 키우거나(≥220) 제거 후 값만. 3열 폭 동일. 모드 바 HAND/AUTO/TRACK 선택은 'Enhanced Checked', 진행 상태 유지.
A8 [low] RUNNING Tag는 Gray 유지(경보 아님) — 대신 텍스트로 충분.
