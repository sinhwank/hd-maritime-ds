---
name: ds-audit
description: Figma 파일이나 노드를 HD-MDS 규칙으로 감사한다 — 하드코딩 색·크기, 변수 바인딩 누락, detach된 인스턴스, 경보 색 오용, 테마별 대비, 터치 크기, OpenBridge 원본 대비 미기록 변경. 생성 작업 직후와 리뷰 요청 시 사용.
---

# ds-audit

`figma-use`, `maritime-rules`를 로드하고 읽기 전용 `use_figma`로 검사합니다. 수정하지 않고 **보고만** 합니다.

## 검사 항목
| id | 검사 | 방법 |
|---|---|---|
| A1 | 하드코딩 fill/stroke | `boundVariables`가 없는 SOLID paint |
| A2 | 하드코딩 크기·간격·반경 | padding/gap/cornerRadius에 Component-size·component-primitives 변수 없음 |
| A3 | detach / 로컬 복제 | Test Board에서 FRAME인데 Library 컴포넌트와 이름이 같은 것 |
| A4 | 경보 색 오용 | `Color/Alert/*`, `Color/Styles/Alarm|Warning|Caution/*` 변수가 경보 의미 없는 노드에 바인딩 |
| A5 | 대비 | Palette 모드(Day, Dusk BETA, Night BETA, Bright BETA)별 텍스트/배경 해석값 대비 (THM-01) |
| A6 | 터치 타깃 | interactive 인스턴스 48px 미만 (INP-01) |
| A7 | spec 라인 누락 | HD가 수정한 컴포넌트 세트 description에 `spec:` 없음 |
| A8 | 미기록 변경 | Library 컴포넌트 속성이 OB 원본과 다른데 해당 spec이 없거나 `changes`에 없음 |

## 출력
```
ds-audit <file>/<node>  — 위반 N건
[A1] 3건  node 12:34 "Valve two-way/State=Open" fill #E5322D → Color/Alert/Alarm-color 바인딩 필요
```
위반 0이면 "PASS"와 검사한 노드 수를 보고합니다. 반환이 크면 페이지 단위로 나눠 병렬 호출합니다.
