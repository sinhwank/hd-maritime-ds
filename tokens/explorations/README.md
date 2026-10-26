# tokens/explorations — 스타일 방향 탐색값

`overrides`·`additions`와 같은 형식이지만 **HD-MDS Explore 파일 전용**입니다. `hd-tokens-apply`(`tokens-plan`)는 이 폴더를 읽지 않습니다.

| 파일 | Figma 모드 | 근거 |
|---|---|---|
| `pleos.yaml` | `Explore-Pleos` | Pleos Connect 공식 디자인 가이드 (document.pleos.ai) |
| `kongsberg.yaml` | `Explore-Kongsberg` | EGGS 케이스 이미지 (EcoAdvisor·K-Sim) — 추정 |
| `alfalaval.yaml` | `Explore-AlfaLaval` | Alfa Laval Bricks npm 토큰 실측 |
| `typography.yaml` | (모드 아님, 전 방향 공통) | 사용자 지시: 22px 이상은 HD현대체 |

- 모드는 `Color-primitives-day`(Surface·Neutral·Blue 램프 + Base/Blue)와 `component-primitives`(Border-radius)에만 둡니다. Palette의 alias는 그대로라 Test Board 프레임에서 두 컬렉션의 모드만 바꾸면 방향이 바뀝니다.
- 색 값은 `node scripts/explore-ramp.mjs`가 만듭니다. OB 램프의 단계별 명도(OKLCH L)는 그대로 두고 색상·채도만 바꾸므로 OB가 맞춘 대비 관계가 유지됩니다.
- 경보(Alarm·Warning·Caution·Running·Critical-alarm·Notification)와 매질에 쓰이는 색상 램프는 모든 방향에서 OB 원본(WCAG 모드 값) 그대로입니다.
- 방향이 정해지면 해당 값을 기본 모드 기준으로 `tokens/overrides`에 `proposed`로 옮기고, 승인 후 HD-MDS Library에 적용합니다. 탐색이 끝나면 Explore 파일의 `Explore-*` 모드는 지웁니다.

분석과 비교 기준: `knowledge/explorations/style-directions.md`
