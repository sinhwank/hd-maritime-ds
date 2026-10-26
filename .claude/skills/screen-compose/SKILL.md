---
name: screen-compose
description: screens/<id>.screen.yaml을 읽어 Figma 04 Products 파일에 라이브러리 인스턴스만으로 화면을 조립하고, 지정된 테마·상태 파생 화면까지 만든다. 대표 화면 생성·갱신 시 사용.
---

# screen-compose

## 전제
- `figma-use`, `figma-generate-design`, `maritime-rules` 로드.
- `screen.status`가 draft여도 생성은 가능, 프레임 이름에 `[draft]` 접두.
- 참조 컴포넌트가 라이브러리에 없으면 **임의로 그리지 않는다** → 누락 컴포넌트 목록과 스펙 초안을 제안하고 멈춘다.

## 절차
1. `display.target`+`resolution`으로 `patterns/`의 레이아웃 정의를 찾는다. 없으면 사용자에게 묻는다.
2. `search_design_system`으로 modules의 컴포넌트를 찾아 import한다.
3. 페이지: domain → `통합 대시보드·공통 | 항해 | 기관 자동화 | 최적운영 | 관리·포털`.
4. 프레임 이름 = screen id. 영역(region)별 auto-layout 섹션을 placeholder로 먼저 만들고 순서대로 채운다.
5. `data`가 domain/ 호선 구성을 가리키면 그 데이터로 값·라벨·장비 수를 채운다 (가짜 숫자는 그럴듯한 범위로, 프레임 설명에 "샘플 데이터" 표기).
6. 기본 화면 완성 → 스크린샷 → Critic → ds-audit.
7. 통과하면 파생: `display.themes`의 각 테마(Variable mode 전환) × `states`. 파생 프레임 이름 `<id>/<theme>/<state>`.
8. `20 Screens · Overview` 페이지의 목록 표를 갱신한다.
