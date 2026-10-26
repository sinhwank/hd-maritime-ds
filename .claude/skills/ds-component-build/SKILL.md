---
name: ds-component-build
description: components/<layer>/<id>.spec.yaml을 읽어 Figma Core UI 또는 Maritime UI 파일에 컴포넌트 세트(variant, 컴포넌트 속성, 변수 바인딩, description)를 생성·갱신한다. "/ds-component-build valve"처럼 컴포넌트 id와 함께 호출.
---

# ds-component-build

## 전제
- `figma-use`, `figma-generate-library`, `maritime-rules`를 로드한다.
- 스펙이 `npm run validate`를 통과해야 한다. `status: draft`면 대상 페이지의 `🚧 Draft` 섹션에 만든다.
- Foundation Variables가 동기화되어 있어야 한다 (없으면 ds-tokens-sync 먼저).

## 절차
1. 스펙을 읽고 variant 행렬을 계산한다: `props` 중 배열 축의 데카르트 곱 − `excludeCombinations`. **64개를 넘으면 멈추고** 축 분리(별도 컴포넌트, boolean 속성화)를 제안한다.
2. 파일: `figma.config.json` → `componentFileByLayer[layer]`. 페이지는 README에 정의된 카테고리 중 가장 맞는 곳.
3. 기존 동일 이름 컴포넌트 세트가 있으면 갱신(변경 variant만), 없으면 생성.
4. 기본 variant 하나를 auto-layout으로 정확히 만든 뒤 복제해서 축별 차이만 적용한다.
5. 모든 색·간격·반경은 `tokens` 매핑대로 Variable 바인딩. 바인딩할 토큰이 없으면 만들지 말고 누락 목록을 보고한다.
6. boolean/text/instance-swap 속성은 컴포넌트 속성으로 추가.
7. 컴포넌트 세트 description:
   ```
   spec: <id> | origin: <source> (<decision>) | status: <status>
   <description>
   Rules: <rules 요약>
   ```
8. 스크린샷을 찍고 Critic 서브에이전트에 넘긴다 → `/ds-audit` → 위반 0까지 수정 (최대 3회).
9. 보고: 생성/갱신된 variant 수, node id, 미해결 이슈.
