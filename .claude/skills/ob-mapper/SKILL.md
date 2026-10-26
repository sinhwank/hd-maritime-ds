---
name: ob-mapper
description: 기존 HD 제품 화면(스크린샷·PDF)을 분석해 쓰인 UI 요소를 OpenBridge 컴포넌트에 매핑하고 mapping/openbridge-hd.yaml과 인벤토리를 갱신한다. As-is 화면 인벤토리·UI 패턴 감사 작업에 사용.
---

# ob-mapper

1. 입력 화면마다 `knowledge/products/<product>/<screen-id>.md`를 만든다: 화면 목적, 사용자, 영역 구성, 쓰인 UI 요소 목록, 문제점.
2. UI 요소마다 OpenBridge 대응 컴포넌트 세트를 찾는다. Library에서 `search_design_system` 또는 페이지별 COMPONENT_SET 이름 조회 (`knowledge/openbridge/README.md`의 페이지 목록). 대응이 없으면 `ob: null`.
3. `mapping/openbridge-hd.yaml`에 항목 추가/갱신, `seen_in`에 화면 id 누적. decision은 **제안값**으로만 쓰고 `proposed: true` 표시 — 확정은 사람.
4. 제품 간 같은 의미를 다르게 표현한 사례는 "불일치" 목록으로 보고 (통합 기준 수립의 핵심 근거).
5. 요청 시 xlsx로 내보낸다 (산출물: OpenBridge–HD 적용성 분석 및 매핑표).
