---
name: screen-compose
description: screens/<id>.screen.yaml을 읽어 Key Screen 폴더의 Test Board에 HD-MDS Library 인스턴스만으로 화면을 조립하고, 테마·상태 파생 화면까지 만든다. 대표 화면을 생성·갱신하거나 디자인 시스템을 화면에 적용해 테스트할 때 사용.
---

# screen-compose

## 전제
- `figma-use`, `figma-generate-design`, `maritime-rules` 로드.
- 대상: `files.testBoard.key`. 컴포넌트는 `files.library`, 아이콘은 `files.icons`에서만 가져온다.
- Library가 Test Board에 라이브러리로 활성화되어 있어야 `search_design_system`·import가 된다. 안 되면 사용자에게 Library를 publish하고 Test Board에서 활성화해 달라고 요청한다.
- 참조 컴포넌트가 없으면 **임의로 그리지 않는다** → 누락 목록과 스펙 초안을 제안하고 멈춘다.

## 절차
1. 레이아웃: `patterns/`에 정의가 있으면 따르고, 없으면 Library `Templates` 페이지의 OB 템플릿 중 `display.target`에 가장 맞는 것을 고른다.
2. `search_design_system`으로 modules의 컴포넌트를 찾아 import한다.
3. Test Board에 domain별 페이지를 사용한다 (`통합 대시보드·공통 | 항해 | 기관 자동화 | 최적운영 | 관리·포털`, 없으면 생성).
4. 프레임 이름 = screen id. region별 auto-layout 섹션을 placeholder로 먼저 만들고 순서대로 채운다.
5. 프레임에 explicit variable mode를 지정한다: Palette → `themes[display.themes[0]]`, Component-size → `sizes[display.size]`.
6. `data`가 domain/ 호선 구성을 가리키면 그 데이터로 값·라벨·장비 수를 채운다. 샘플 값이면 프레임 이름 끝에 `(sample)`.
7. 기본 화면 → 스크린샷 → `critic` → `/ds-audit`.
8. 통과하면 파생: 나머지 테마는 프레임 복제 + mode 전환만, `states`는 해당 컴포넌트 variant 전환. 이름 `<id>/<theme>/<state>`.
