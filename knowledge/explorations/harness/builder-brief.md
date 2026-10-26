# Builder 공통 기술 브리프 (Hi-INS 탐색 화면 수정)

Figma: Test Board fileKey tRJnqDtLtS8zg1bTPUeVfZ, 페이지 "디자인 · Hi-INS". 반드시 먼저 figma-use 스킬(skill://figma/figma-use/SKILL.md)을 읽고, create_session을 호출한 뒤 use_figma를 쓴다.
규칙: /home/user/hd-maritime-ds/CLAUDE.md, .claude/skills/maritime-rules/SKILL.md. 라이브러리(HD-MDS Explore) 인스턴스만 사용, detach 금지, 색·반경·간격은 변수 바인딩.
라이브러리 import: figma.importComponentSetByKeyAsync / importStyleByKeyAsync / variables.importVariableByKeyAsync.

## 매 use_figma 호출 처음에 (모드 전환·텍스트 수정 시 폰트 오류 방지)
for (const fam of ['Noto Sans Symbols2','Noto Sans','HDHyundai OTF']) for (const st of ['Regular','Bold','SemiBold','Medium','Light']) { try { await figma.loadFontAsync({family:fam,style:st}); } catch(e){} }
한 호출은 60초 제한. 시간 초과 시 변경이 늦게 반영될 수 있으니 재시도 전에 상태를 먼저 읽는다.

## Palette 색 변수 키
bg Color/Container/Background-color 95a9925d297491ce0e01bcfb2bcb4679404366a3
glob Color/Container/Global-color 2a5f006f60b3a2a89e58547b84da57d7f439fc12
sec Color/Container/Section-color ad3740f172308fdfcf50bc20e2a2c2c8a793fcd1
txt Color/Element/Neutral-color aacf25d7bb1c1a1952fc8b632f776c26d2e3c70b
txt2(보조, 대비 미달) Color/Element/Inactive-color 60694bcb0071ce90ffc174aea15cd33d357041cf
txt2 대체(4모드 모두 ≥6.27:1) Color/Element/Neutral-enhanced-color 8e38decb3ee051a1287f8d241e5f7f9f63035dd4
divider Color/Border/Divider-color 42dd6ec36edd0ae4f4cb61130743afc04b47ae4d
## 반경 (Component-size)
Global/Border-radius/border-radius-floating fcf552036892723a1e3d10df49a1f07ac89f50d7 · border-radius-base 7abefc72ec4d69f1c378a4f5e62591f10c6fe32e
## 간격 (Component-size › Global/Size & spacing, 값 Regular/Medium/Large/XL)
List item/item-spacing 8/8/12/16 0b85cbf6438261d2e3df0beae959a7c9ad6cdbf3
List item/padding-horizontal 16/16/24/32 264fdcbd5758afe3ea5afaacd9ba2be1f8fc9f6b
List item/padding-vertical 8/8/12/16 0fae9ee403348d176f6aed8965a83bf528d56c0b
Nav item and menus/margin-horizontal-menu 16/20/24/32 8434ddb9ee47c8a4ea85d94160ddcca92f04e651
Nav item and menus/margin-vertical-menu 16/20/24/32 148d767bbddea145a357b2b279414bda25eb6091
Nav item and menus/padding-horizonal-list-item 12/12/16/24 9c2f7df675dca0d7ff2b0e96e2d71ad1a3bf0280
touch-target-min 48/56/72/96 85eb3f3a5631b5773ceaa42106e041b72662f402
→ auto-layout 프레임의 itemSpacing·padding*을 node.setBoundVariable('itemSpacing'|'paddingLeft'…, var)로 바인딩 (ds-audit A2). 큰 여백은 margin-*-menu, 행 간격은 item-spacing, 카드 안쪽은 padding-horizontal/vertical.
## 텍스트 스타일 (크기 모드에서 안전한 것만)
Instrument/Value-enhanced-active 6eeb658d2a1f4cdbab77b2c9020e76d99d1a8f4d (1차 값 하나만)
Instrument/Value-m-active 7fb9178020bb12c0f04722ceb8926adc08ceaf5d
UI/Body b5009edc3a13e42e3751365811355388a85d8b49 · UI/Body-active 33260193a945e02db7c2bc3778a6dabed0e2fc32 · UI/Label 788337fcb790b7dc029c6e87f9db3ae8169510f7
금지: Generic-BETA/* (Medium 이상에서 크기 0), UI/Title (XL에서 0)
## 컴포넌트 세트 키
Alert message item e47fbd45270bb9c15c751acab2a8084b73736504 (Alert status Alarm|Warning|None, is Ackable, Size Regular size|Tall size)
Alert button 8fbbc9f39a8fdec6be567289e693504ddca40178 · Tag 6be3de640382bd273f309759afb8edd6f3ee745d (Color … Caution|Warning|Alarm|Gray|Blue, 라벨은 Label#·Label-active# 둘 다 설정)
Toggle button item 629d2408371efc6cc6bad0e625fb76e023bdcb81 ('Type & Status' Unchecked|Normal Checked|Enhanced Checked) · Button 3fca1861e94de18074be1c59fbae37b3c303653a (Type Normal|Flat|Raised)
Chart-object-vessel 3bd519a08e25d1e0be3f8f75102479ba2304495d (Type Selected|Own ship|Target) · Track-lines 360d7b1e89ffb57c9fd597e188bf3c033b3bb1c0
Checkbox item 270604dd1743555abe87d18f3123d5865e02f950 (240x48) · Sequence loading spinner b16a9001caee75658b354b21704d260c89d05320
Rudder 34286b73980df469413fd240cdb39c9de0734b45 · Compass-radial 8b145a10a1ff8fb544a226d81eccc77555da7138 · Wind 26e57c14af62e400430464826c7c35a496b427aa
## 알려진 차단 (고치지 말고 보고만)
- IEC Warning/Caution 아이콘, GNB·버튼의 마름모 아이콘: HD-MDS Icon Pack 미연결.
- 계기(러더·나침반·바람)에 각도 속성이 없으면 내부 회전 오버라이드를 시도하고, 안 되면 보고.
## 상태 파생 프레임(silenced, comm-loss 등)은 이번 범위가 아니다.
## 끝나면: 수정한 node id 목록, 고친 항목/못 고친 항목(이유), 화면별 get_screenshot 확인 결과를 보고한다.
