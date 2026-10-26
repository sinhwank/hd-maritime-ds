# Hi-INS 탐색 화면 — 하네스 1회차 감사 (2026-10-26)

대상: Test Board › `디자인 · Hi-INS` 9프레임. 스펙: `screens/explorations/nav-0{1,2,3}-*.screen.yaml`.
검사: `ds-audit`(읽기 전용 use_figma) + `critic` 에이전트 3개(방향별).

## ds-audit

검사 노드 3,772개 (라이브러리 인스턴스 내부는 제외 — 라이브러리 소관).

| id | 결과 | 내용 |
|---|---|---|
| A1 하드코딩 fill/stroke | **PASS** (0) | 직접 만든 노드의 색은 전부 Palette 변수 바인딩 |
| A2 하드코딩 간격·반경 | **위반 216** | auto-layout `itemSpacing`·`padding`이 숫자 직접 입력. 반경은 바인딩됨. → OB `Global/Size & spacing/*`(List item/item-spacing 8/8/12/16, padding-horizontal 16/16/24/32, padding-vertical 8/8/12/16, Nav item and menus/margin-*-menu 16/20/24/32)에 바인딩 |
| A3 detach·로컬 복제 | **PASS** (0) | |
| A4 경보 색 오용 | 판정 필요 9 | 경보 색은 모두 Tag(Color=Alarm/Warning/Caution) 인스턴스. 실제 경보와 짝이 맞는 것: A-ECDIS Target WARNING, A-BAMS ECDIS1·RADAR1. **맞지 않는 것**: K-BAMS X-Band 지연·GNSS2 신호 없음, A-BAMS GNSS2·Caution 행, A-CID Environment CAUTION — 통신 단절은 ALM-03에 따라 Low-integrity/Invalid로, 경보 없는 상태는 중립 라벨로 |
| A5 대비 (임시 4.5:1) | **위반 2조합** | 보조 텍스트 `Color/Element/Inactive-color`: Day의 `Section-color` 위 4.33, Dusk의 `Global-color` 위 4.04. 방향 모드와 무관(OB 원본도 동일). `Neutral-enhanced-color`는 4모드 모두 ≥ 6.27 |
| A6 터치 타깃 | **위반 3** | A-BAMS Checkbox 32×32 (Medium 모드) |
| A7·A8 | 해당 없음 | 이번 작업은 라이브러리 컴포넌트를 수정하지 않음 |

## critic

| 방향 | 판정 | high | 주요 high 항목 |
|---|---|---|---|
| Pleos | FAIL ×3 | 11 | 경보 칩 등급·건수 불일치, 해도 방향이 HDG와 반대, 위험 타선 미표시, Caution·확인됨 그룹 누락, 계기(나침반·러더·바람) 지시가 값과 불일치, Driving view 슬롯이 화면마다 다름 |
| Kongsberg | FAIL ×3 | 14 | 위험 타선 미표시, 센서 FAIL이 정상처럼 보임, BAMS 등급 아이콘(Icon Pack 차단), **Cat A를 BAMS에서 ACK 가능(IEC 62923 위반)**, 소리 상태 모순, 통신 단절에 경보 색, 계기 방향 불일치 |
| Alfa Laval | FAIL ×3 | 6 | 크기 모드가 기획·INP-01과 불일치(Medium→Large), 경보 카드 정렬, 위험 타선 미표시, comm-loss를 Caution으로 표시, 러더 방향, 수심/UKC 혼동 |

### 스펙 수준 결정 (critic 지적 → 스펙 수정)
- 타선 017 CPA/TCPA 등급을 화면마다 다르게 쓴 것을 **Alarm · Category A**로 통일. Cat A는 BAMS에서 ACK 불가(ECDIS에서 확인).
- 시각 22:38 통일, 미확인 = Alarm 1 + Warning 2(Caution은 ACK 대상 아님), CID에 Caution(횡풍) 추가, 수심 18.0 m · UKC 6.5 m 분리.
- Alfa Laval `display.size` medium → **large** (기획 문서·INP-01과 일치시킴, 작성 실수 정정).

### 수정 지시 (builder 1회차)
공통 C1~C10, 방향별 P1~P8 / K1~K10 / A0~A8 — 원문은 세션 작업 파일. 차단: Icon Pack 미연결(IEC 등급 아이콘·마름모 아이콘), 상태 파생 프레임은 다음 단계.
