# Kongsberg (Regular) — 25:1282 ECDIS, 29:2397 BAMS, 38:4544 CID
K1 [high] ECDIS 센서 패널: 값과 상태를 분리(행 = 라벨 | 값 | 상태 Tag). Backup GYRO2는 Tag Warning "FAIL" + 값 "—". 정상은 Tag Gray "OK". POSN 행에도 상태.
K2 [med] ECDIS Target 표: 본문을 UI/Body로 키우고 열 머리에 단위(CPA NM, TCPA min), TCPA는 8.2 / 21.7 / — 형식. 017 행은 Body-active + 앞에 Tag Alarm "017".
K3 [med] ECDIS 상태 띠: 'Safety contour 10 m', 'Display: Standard' 추가. 패널 제목에 'Track control' 모드 명시.
K4 [high] BAMS: Cat A(CPA/TCPA) 행·상세 패널에서 ACK 제거 — 상세 버튼은 [Silence](Raised) + [ECDIS에서 확인](Normal). 'ACK all visible'과 Silence 순서: Silence를 앞으로(툴바 내부 순서 변경이 불가하면 보고). Cat. 열 아이콘이 A로 바뀌지 않으면 보고.
K5 [high] BAMS 요약 띠: 미확인 3으로, 소리 상태 텍스트와 Topbar 소리 아이콘 일치(소리 ON). 서버: "Primary · Active" Tag Gray, "Secondary · Standby" Tag Gray 텍스트로. Alert counter 또는 텍스트 카운트 중 하나만 남김(카운터 컴포넌트 유지, 숫자 1/2/3).
K6 [high] BAMS 출처 연결: X-Band 지연·GNSS2 신호 없음은 경보 색 Tag 금지(ALM-03) → Tag Gray + 텍스트 "지연 1.8 s"/"신호 없음" + 해당 행 값 숨김. 띠 높이 64로 줄이고 표 영역을 늘림.
K7 [low] BAMS 표 Tag ID 고유화(3015 중복), 발생 횟수 93 → 1. 4번째 행 'Approach to CRIT PNT'는 Caution(ACK 없음) → Acked 계열 variant 또는 ACK 버튼 숨김.
K8 [high] CID: HDG 히어로 — 나침반을 칸 높이(약 300)로 키우고 HDG만 Value-enhanced, ROT·Depth 등은 Value-m. Alert 칸에 Caution "횡풍 20 kn" 추가, Warning 2건 모두 표시(높이 넘치면 Regular size).
K9 [med] CID Propulsion: 축별 2개 계기(PORT/STBD) 또는 Azimuth 제거 후 값만. Depth 칸: 수심 18.0 m, UKC 6.5 m. Attitude 칸에 Pitch 0.4°, Roll 1.2° 값.
K10 [med] CID 12칸 1px 테두리 격자 → 테두리 제거하고 칸 사이 간격(item-spacing 8)과 Global-color 면으로 구획(셀을 그리드 auto-layout로 재배치하거나 x/y 간격 8 부여).
