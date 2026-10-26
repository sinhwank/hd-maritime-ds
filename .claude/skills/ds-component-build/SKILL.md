---
name: ds-component-build
description: components/<layer>/<id>.spec.yaml을 읽어 HD-MDS Library(OpenBridge 6.1 복제본)의 컴포넌트를 수정·확장하거나 HD 신규 컴포넌트를 만든다. "/ds-component-build valve"처럼 컴포넌트 id와 함께 호출.
---

# ds-component-build

## 전제
- `figma-use`, `figma-generate-library`, `maritime-rules`를 로드한다.
- 스펙이 `npm run validate`를 통과해야 한다.
- 대상: `files.library.key`. OpenBridge 원본(`openbridge.files.*`)은 **절대 쓰지 않는다**.

## decision별 작업
| decision | 위치 | 작업 |
|---|---|---|
| adopt | 원래 자리 | 아무것도 바꾸지 않음. description에 `spec:` 라인만 추가 |
| adapt | 원래 자리 (`origin.page` / `origin.set`) | 기존 variant 구조 유지, 스펙의 `changes`만 반영 (주로 토큰 바인딩·형태) |
| extend | 원래 자리 | 기존 variant는 그대로 두고 **축·속성을 추가**. 기존 인스턴스가 깨지지 않게 기존 variant 이름·기본값 유지 |
| hd-new | `hdExtensionsPage`(없으면 생성) | OB building blocks(10·11 페이지)와 OB 변수로 새로 구성 |

## 절차
1. 스펙을 읽고, Library에서 `origin.set`의 현재 `componentPropertyDefinitions`를 읽어 스펙 `baseline`과 비교한다. 다르면 멈추고 보고한다 (누가 이미 바꿨을 수 있음).
2. 목표 variant 행렬 = `props` 배열 축의 곱 − `excludeCombinations`. **64개 초과면 멈추고** 축 분리(boolean·instance-swap·별도 컴포넌트)를 제안한다.
3. `status: draft`면 원본을 바로 고치지 말고 같은 페이지에 `🚧 <set> (HD draft)` 섹션을 만들어 복제본에서 작업한다. `approved`가 되면 원래 세트에 반영한다.
4. 새 variant는 가장 가까운 기존 variant를 복제해서 차이만 적용한다.
5. 모든 색·크기는 스펙 `tokens`의 OB 변수에 바인딩한다. 변수가 없으면 만들지 말고 `tokens/additions` 제안으로 보고한다.
6. 컴포넌트 세트 description 맨 앞에 추가 (기존 OB 설명 유지):
   ```
   spec: <id> | origin: OB <page>/<set> (<decision>) | status: <status>
   HD changes: <changes 요약>
   ```
7. 스크린샷 → `critic` 서브에이전트 → `/ds-audit` → 위반 0까지 수정 (최대 3회).
8. 보고: 추가/수정된 variant 수, node id, 미해결 이슈, 필요한 토큰 추가 제안.
