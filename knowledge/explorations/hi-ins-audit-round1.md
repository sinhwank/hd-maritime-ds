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

방향별 결과는 아래에 이어서 기록한다.
