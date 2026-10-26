---
name: ds-tokens-sync
description: tokens/의 DTCG JSON을 Figma 00 Foundation 파일의 Variables로 동기화한다(primitive, semantic 4개 테마 모드, status/medium). 토큰을 추가·변경했거나 Figma Variables가 레포와 다를 때 사용.
---

# ds-tokens-sync

## 전제
- Figma 스킬 `figma-use`, `figma-generate-library`를 함께 로드한다.
- 대상 파일: `figma.config.json` → `files.foundation.key`.

## 절차
1. `npm run tokens:plan`으로 토큰 평탄화 결과(이름, 타입, 값/alias, 모드)를 얻는다. `$value`가 `TBD`인 항목은 건너뛰고 보고한다.
2. Figma에서 기존 컬렉션·변수 목록을 읽는다 (이름·id·모드만).
3. 차이를 계산해 **변경 계획**을 사용자에게 보여준다: 추가 / 값 변경 / 삭제 후보. 삭제는 사용자 승인 후에만.
4. 컬렉션 구조:
   - `primitive` (모드 1개) — 원시값
   - `semantic` (모드: bright, day, dusk, night) — primitive alias만
   - `status` (모드: bright, day, dusk, night) — 경보·매질
5. 이름 변환: `color.neutral.500` → `color/neutral/500`.
6. scopes를 명시한다: bg/* → FRAME_FILL, SHAPE_FILL / fg/* → TEXT_FILL, SHAPE_FILL / border/* → STROKE_COLOR / space/* → GAP, padding / radius/* → CORNER_RADIUS.
7. 각 변수 description에 원본 JSON 경로를 남긴다.
8. 결과 보고: 컬렉션별 변수 수, 모드 이름, 건너뛴 항목.

## 하지 말 것
- Figma에서 값을 바꿔 레포를 맞추지 않는다. 레포가 기준.
- semantic에 원시 hex를 직접 넣지 않는다.
