---
name: hd-tokens-apply
description: tokens/overrides·additions에 기록된 HD 변경분을 HD-MDS Library(OpenBridge 6.1 복제본)의 Variables에 적용하고, 기록되지 않은 수동 변경(drift)을 찾아낸다. 토큰 변경을 반영하거나 Library 변수가 레포와 맞는지 확인할 때 사용.
---

# hd-tokens-apply

## 전제
- Figma 스킬 `figma-use`, `figma-generate-library`를 함께 로드한다.
- 대상: `figma.config.json` → `files.library.key`. 비교 기준: `openbridge.files.core-6.1.key` (**읽기 전용**, 쓰기 금지).
- 변수 이름·컬렉션·모드 이름은 OpenBridge 그대로다. 새 이름 체계를 만들지 않는다.

## 절차
1. `npm run validate` → `node scripts/tokens-plan.mjs`로 계획을 얻는다. `errors`가 있으면 멈춘다.
2. `apply`의 각 항목에 대해 Library에서 현재 값, OB 원본에서 원래 값을 읽는다 (항목의 변수만 — 컬렉션 전체 `valuesByMode`를 읽지 말 것).
3. 표로 보여준다: `변수 | 모드 | OB 원본 | Library 현재 | 적용할 값 | 사유`. `pending`(proposed)은 따로 "승인 대기"로 나열.
4. 사용자 확인 후 적용:
   - override: 기존 변수의 해당 모드 값만 바꾼다. alias면 같은 파일에서 대상 변수를 이름으로 찾아 `createVariableAlias`.
   - addition: 컬렉션에 변수를 만들고 scopes를 명시한다 (색: 용도에 맞게 FRAME_FILL/SHAPE_FILL/STROKE_COLOR/TEXT_FILL).
   - 변수 description 끝에 `HD: <reason>` 한 줄을 남긴다 (기존 설명 유지).
5. 적용 후 같은 변수들을 다시 읽어 값이 맞는지 확인하고 결과를 보고한다.

## Drift 검사 (요청 시 또는 적용 전후)
- 컬렉션 하나씩(호출 분리) Library와 OB 원본의 값을 비교해, 다르지만 overrides/additions에 없는 변수를 "기록되지 않은 변경"으로 보고한다.
- 반환 크기가 크므로 컬렉션별·모드별로 나눠 병렬 호출하고, 다른 것만 반환한다.
- 처리 방법은 사용자에게 묻는다: 레포에 기록(proposed로 추가) / Library를 원본 값으로 되돌림.

## 하지 말 것
- OpenBridge 원본 파일 수정.
- `approved`가 아닌 항목 적용.
- 컬렉션·모드 이름 변경, 변수 삭제 (삭제가 필요하면 제안만).
