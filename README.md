# HD-MDS — HD현대 선박 통합 솔루션 디자인 시스템

AI(Claude Code + Figma MCP)가 디자인 시스템과 대표 화면을 **스펙에서 생성**하는 구조의 레포입니다.
디자인 시스템은 **OpenBridge 6.1을 복제해 HD에 맞게 수정**하는 방식이고, 이 레포는 원본 대비 변경분과 그 근거를 관리합니다.

## Figma (`99. 클로드테스트`)

| 폴더 | 파일 | 역할 |
|---|---|---|
| Source_Open Bridge | OpenBridge 원본 12개 | 읽기 전용 기준선 |
| Design System | [HD-MDS Library](https://www.figma.com/design/Lzn4HaD45rVmbtvm2a5lrP), [HD-MDS Icon Pack](https://www.figma.com/design/v6Jgh6gLpEcpNPk1UsjXQA) | OB 6.1 복제본을 HD에 맞게 수정 |
| Design System | [HD-MDS Explore](https://www.figma.com/design/XXaTjmBNYWuugrWt3l8GRq) | 스타일 방향 탐색 전용 (`Explore-*` 모드, `tokens/explorations/`) |
| Key Screen | [Test Board](https://www.figma.com/design/tRJnqDtLtS8zg1bTPUeVfZ) | 디자인 시스템으로 주요 화면 테스트 |

```
[1] 이 레포 (스펙·토큰·지식)  ──스킬──▶  [2] Claude Code 하네스  ──Figma MCP──▶  [3] Figma 라이브러리 / 프로덕트
        기준 데이터                    생성 → 스크린샷 → 비평 → 감사               결과물, 디자이너 검수
```

## 폴더

| 경로 | 내용 | 누가 쓰나 |
|---|---|---|
| `knowledge/` | OpenBridge, IEC 표준, HiCONiS 필로소피, 제품 인벤토리, 리서치 인사이트 | 사람이 정리, AI가 참조 |
| `mapping/openbridge-hd.yaml` | OpenBridge 컴포넌트 → Adopt / Adapt / Extend / Exclude | `ob-mapper` 초안 → 사람 확정 |
| `tokens/` | OpenBridge 원본 대비 **HD 변경분만** (overrides·additions) | 사람 확정 → `hd-tokens-apply` |
| `components/` | 컴포넌트 스펙 (`*.spec.yaml`) | Planner 초안 → 사람 확정 → `ds-component-build` |
| `domain/` | 장비 온톨로지, 호선별 구성 | 사람 + `research-synth` |
| `patterns/` | 역할·운항 모드·디스플레이별 레이아웃 규칙 | 사람 |
| `screens/` | 대표 화면 스펙 (`*.screen.yaml`) | Planner → `screen-compose` |
| `golden/` | 디자이너가 확정한 정답 화면 (예시용) | 사람 |
| `schemas/` | 스펙 JSON Schema | — |
| `.claude/skills/` | HD 전용 스킬 | — |
| `.claude/agents/` | Builder / Critic 서브에이전트 | — |
| `figma.config.json` | 피그마 파일 키 | — |

## 시작하기

```bash
npm install
npm run validate        # 모든 spec/screen YAML을 스키마로 검증
claude                  # Claude Code 실행 → CLAUDE.md, 스킬 자동 로드
```

전제: Claude Code에 Figma MCP(공식 remote server) 연결, pxd 조직 Full seat.

## 작업 흐름 (예: 컴포넌트 1개)

1. `components/maritime/<id>.spec.yaml` 작성 (Planner 또는 사람) → `npm run validate`
2. 디자이너 리뷰 후 `status: approved`
3. `/ds-component-build <id>` → HD-MDS Library의 해당 OB 컴포넌트를 수정·확장 (draft는 `🚧` 섹션에서)
4. Critic + `/ds-audit` 루프 → 위반 0
5. PR로 스펙 변경 이력 남김
