# tokens/ — OpenBridge 원본 + HD 변경분

토큰을 처음부터 정의하지 않습니다. **HD-MDS Library는 OpenBridge 6.1 복제본**이고, 이 폴더에는 원본 대비 **HD가 바꾸거나 추가한 것만** 기록합니다.

```
OpenBridge 6.1 원본 (Figma, 읽기 전용)      ← 기준선. 스냅샷을 레포에 복사하지 않음
        +  tokens/overrides/*.yaml          ← 기존 OB 변수의 값 변경
        +  tokens/additions/*.yaml          ← HD에서 새로 만드는 변수
        =  HD-MDS Library 의 Variables      ← hd-tokens-apply 스킬이 적용
```

- 변수 이름은 OpenBridge 이름 그대로 씁니다 (예: `Palette` 컬렉션의 `Color/Alert/Alarm-color`).
- 모드 이름도 OpenBridge 그대로: `Day`, `Dusk BETA`, `Night BETA`, `Bright BETA` (논리 이름 매핑은 `figma.config.json` → `themes`).
- 값은 hex(`"#RRGGBB"`) 또는 같은 파일의 다른 변수 alias(`"{Primitives-day/Alarm/400}"`)로 씁니다. 원시값은 가능하면 primitive 컬렉션을 바꾸고, Palette는 alias를 바꿉니다.
- `status: approved`인 항목만 Figma에 적용됩니다. `proposed`는 계획에만 표시.
- Library에서 손으로 바꾼 값은 `hd-tokens-apply`의 drift 검사에서 "기록되지 않은 변경"으로 잡힙니다 → 여기에 기록하거나 되돌립니다.

```bash
npm run validate        # 스키마 검증 (overrides·additions 포함)
npm run tokens:plan     # 적용 계획 JSON 출력 (스킬이 사용)
```
