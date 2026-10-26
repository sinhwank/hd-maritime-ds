# Pleos (Large) — 24:1408 ECDIS, 27:2221 BAMS, 37:3831 CID
P1 [high] ECDIS: Driving view 값 순서를 세 화면 공통 슬롯으로 고정: SOG(유일한 Value-enhanced) → HDG·COG → ROT → XTD, 화면별 카드(WP 등)는 그 아래. "14 min"은 Value-m으로 낮춤. "0.06 NM S" → "0.06 NM STBD". 하단 빈 여백 정리.
P2 [med] ECDIS 경고 카드: Alert message item과 값 영역을 한 카드(같은 배경, 폭 600)로 묶고, 상태 Alarm(C3). 카드는 타선 017 옆에.
P3 [high] BAMS: 미확인 카운트 세 곳(상태바 텍스트, 칩, 목록 헤더)을 "미확인 3"으로 통일. 목록: Warning 2 아래 Caution 3건(Tag Caution + 텍스트 행, 같은 행 높이), 그 아래 "확인됨 12" 그룹 헤더 + 확인된 행 2개.
P4 [med] BAMS 히어로: Cat A → 히어로 item은 is Ackable=false, 버튼은 [소리 끄기]=Raised(primary), [ECDIS에서 확인]=Normal. 버튼 높이는 Button 인스턴스 그대로 두되 가능하면 큰 variant. 히어로 카드 내 Alarm 강조는 경보 컴포넌트 범위에서만(장식 색 금지).
P5 [high] CID: Driving view를 ECDIS·BAMS와 같은 슬롯 순서로(SOG→HDG·COG→ROT→XTD, 그 아래 나침반). HDG 대신 SOG가 1순위라는 공통 규칙 유지.
P6 [med] CID: 앱 창 2개 폭을 같게(각 616, 간격 16), 제목은 UI/Body-active 이상, 창마다 Value-m 이상 큰 값 2~3개만. 피치 STBD 추가 또는 PORT/STBD 한 행.
P7 [med] CID GNB를 ECDIS·BAMS와 같은 5항목+계기(해도·항로·타선·계기·경보)로 통일하고, 오토파일럿 선택 상태는 'Enhanced Checked'로.
P8 [med] GNB 라벨이 작으면 Navigation Item이 Large 모드에서 제공하는 크기 그대로 두되, 넘치면 GNB 높이를 맞춘다.
