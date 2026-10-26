# 공통 수정 (해당 방향 3화면 모두)
C1 [high ALM-04/ALM-01] 상단 경보 표시(Pleos: Status bar Alert button / Kongsberg·Alfa: Topbar의 경보 버튼)를 시나리오와 맞춘다: 미확인 3(Alarm 1 + Warning 2), 최고 등급 Alarm. Alert button 'Active alert'=true, 카운트 텍스트 "3". Topbar는 has Alert button / 관련 boolean 속성을 켜고 카운트를 맞춘다.
C2 [med spec] 시각을 22:38로 통일(Topbar 시계 텍스트 포함, 경보 발생 시각 22:38:12 기준).
C3 [high spec] 타선 017 CPA/TCPA는 Alarm · Cat A로 통일. Alert message item은 Alert status=Alarm. TCPA는 "8.2 min"으로 표기(시각 형식 금지).
C4 [A5 대비] 보조 텍스트 색 Color/Element/Inactive-color(60694b…) → Color/Element/Neutral-enhanced-color(8e38de…)로 교체(위계는 텍스트 스타일 크기로).
C5 [A2] 직접 만든 auto-layout 프레임의 itemSpacing·padding을 Global/Size & spacing 변수에 바인딩(브리프 표 참고). 0인 값은 그대로.
C6 [med visual] 띠(Status bar/GNB/모드 바) 밖으로 넘치는 빈 spacer Frame(h=100 등) 삭제 또는 layoutGrow spacer(높이 1)로 교체. 인스턴스가 띠 높이를 넘으면 띠 높이를 맞춘다.
C7 [med] Alert message item이 부모 폭을 넘거나 못 채우면 layoutSizingHorizontal='FIXED' 후 부모 내부 폭으로 resize.
C8 [high visual] 해도: 자선·항로를 HDG 241°(남서 방향)로 맞춘다. Track-lines는 기본이 위쪽(000°)으로 뻗으므로 rotation으로 진행 방향을 241°에 맞추고 자선을 항로 시작점에, 진행 방향으로 회전. 타선 017은 Chart-object-vessel Type=Selected(또는 위험 표시 가능한 variant)로, 근처에 "017" 라벨(UI/Label-active). 인스턴스가 비정상적으로 크면 정상 크기로.
C9 [high visual] CID 계기: 나침반 선수 241°, 러더 PORT 15°(좌측), ROT −12(좌), 상대풍 078°가 그림과 맞게. 계기 속성이 없으면 내부 레이어(needle/arrow/vessel 등) rotation 오버라이드로 맞추고, 불가하면 보고. Wind는 해칭 없는 variant(Type 중 해칭 없는 것)로.
C10 [high spec] CID: 수심 18.0 m와 UKC 6.5 m를 별도 값으로. Caution(횡풍 20 kn) 표시를 바람 값 옆에 Tag Caution + 텍스트로.
