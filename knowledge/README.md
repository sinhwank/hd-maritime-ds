# knowledge/

AI가 근거로 참조하는 자료. **원문이 아니라 요약**을 둡니다 (원문은 `_private/`, 커밋 안 함).

| 폴더/파일 | 채울 내용 |
|---|---|
| `openbridge/` | 6.1 구조 요약 (Foundation·Component·Instrument·Automation), 라이선스 메모 |
| `standards/` | IEC 62288·62923 등. **검사 가능한 규칙 문장**으로 (id 부여: `IEC62288-xx`) |
| `hiconis-philosophy.md` | HMI 필로소피 요약: 매질별 컬러, 장비 상태 표현 규칙 |
| `products/` | 기존 화면 인벤토리 (HiNAS, PMS, GMS, ISS 2.0 …) + 문제점 |
| `research/` | 인터뷰·현장 조사 인사이트. 각 항목에 출처 태그 `[src: 2026-10-23 ISS 미팅]` |

규칙 작성 예:
- ❌ "알람은 눈에 띄어야 한다"
- ✅ `ALM-01`: alarm 상태 색은 `status.alarm.*` 토큰만 사용한다. 다른 요소에 동일 hue 사용 금지.
