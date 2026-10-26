// 탐색 방향(tokens/explorations)의 원시 램프를 만든다.
// OB Color-primitives-day 램프의 단계별 명도(OKLCH L)는 그대로 두고 색상(H)·채도(C)만 바꾼다
// → OB가 맞춰 둔 대비 관계를 유지한 채 색감만 비교할 수 있다.
// 사용: node scripts/explore-ramp.mjs > (결과를 tokens/explorations/*.yaml의 modes 값으로 옮김)

// OB 6.1 Color-primitives-day / WCAG 모드 현재 값 (HD-MDS Explore에서 읽음, 2026-10-26)
export const OB = {
  Surface: { "000": "#ffffff", "100": "#fcfcfc", "200": "#f7f7f7", "300": "#f0f0f0", "400": "#e0e0e0" },
  Neutral: {
    "000": "#ffffff", "010": "#fcfcfc", "030": "#f7f7f7", "050": "#f0f0f0", "100": "#dddddd", "150": "#cdcdcd",
    "200": "#bebebe", "250": "#a7a7a7", "300": "#8e8e8e", "350": "#7e7e7e", "400": "#707070", "450": "#606060",
    "500": "#535353", "550": "#474747", "600": "#3d3d3d", "650": "#303030", "700": "#1f1f1f", "1000": "#1a1a1a",
  },
  Blue: {
    "050": "#e4eefd", "100": "#cadefc", "150": "#b2cff9", "200": "#9cc1f5", "250": "#7ca9e9", "300": "#5d8fd5",
    "350": "#4e7fc5", "400": "#4271b3", "450": "#35609c", "500": "#2d548b", "550": "#25487a", "600": "#1d3c67",
    "650": "#152f53", "700": "#0c203a",
  },
};

const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const gam = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

export function hexToOklch(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => lin(parseInt(hex.slice(i, i + 2), 16) / 255));
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return { L, C: Math.hypot(A, B), H: ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360 };
}

export function oklchToHex({ L, C, H }) {
  // sRGB 밖이면 채도를 줄여 맞춘다
  for (let c = C; c >= 0; c -= 0.002) {
    const a = c * Math.cos((H * Math.PI) / 180), b = c * Math.sin((H * Math.PI) / 180);
    const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
    const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
    const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
    const rgb = [
      4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
      -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
      -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ].map(gam);
    if (rgb.every((v) => v >= -0.0005 && v <= 1.0005))
      return "#" + rgb.map((v) => Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, "0")).join("");
  }
}

// ramp: OB 램프, hue: 목표 색상각, chroma: 고정 채도(숫자) 또는 OB 채도 배율({ scale })
export const reramp = (ramp, hue, chroma) =>
  Object.fromEntries(
    Object.entries(ramp).map(([k, hex]) => {
      const o = hexToOklch(hex);
      // 고정 채도는 밝은 단계(L>0.85)에서 줄여, 넓은 배경면이 색을 띠지 않게 한다
      const C = typeof chroma === "number" ? chroma * Math.min(1, Math.max(0, (1 - o.L) / 0.15)) : o.C * chroma.scale;
      return [k, oklchToHex({ L: o.L, C, H: hue })];
    }),
  );

// 참조 램프를 따라가는 경우: OB 단계의 명도에서 참조 램프의 색상·채도를 보간해 쓴다.
export const fromRef = (ramp, ref) => {
  const pts = ref.map(hexToOklch).sort((a, b) => a.L - b.L);
  return Object.fromEntries(
    Object.entries(ramp).map(([k, hex]) => {
      const { L } = hexToOklch(hex);
      const i = Math.max(1, Math.min(pts.length - 1, pts.findIndex((p) => p.L >= L)));
      const [a, b] = [pts[i - 1], pts[i]];
      const t = Math.max(0, Math.min(1, (L - a.L) / (b.L - a.L || 1)));
      const C = a.C + (b.C - a.C) * t;
      const H = a.C < 0.002 ? b.H : b.C < 0.002 ? a.H : a.H + (b.H - a.H) * t;
      return [k, L > 0.995 ? "#ffffff" : oklchToHex({ L, C, H })];
    }),
  );
};

// Pleos Connect 공식 Grayscale (document.pleos.ai › foundations/colors, Light basic_00~900)
export const PLEOS_GRAY = ["#ffffff", "#f7f8fa", "#edeef2", "#e0e1e6", "#c7c9ce", "#a4a8ae", "#686a72", "#44464e", "#313236", "#1d1e21", "#131417"];

export const DIRECTIONS = {
  // Pleos: 중립은 공식 Grayscale을 따르고, 강조(Blue 램프)도 거의 무채색 슬레이트로 둔다
  // — Pleos는 filled 버튼이 파랑이 아니라 basic_600(#44464e)이다.
  pleos: { Surface: ["ref", PLEOS_GRAY], Neutral: ["ref", PLEOS_GRAY], Blue: [272, { scale: 0.3 }] },
  // Kongsberg EcoAdvisor: 청회색 강철 톤(패널 #2d3037 실측 H≈265), 강조는 청록(시안-틸)
  kongsberg: { Surface: [250, 0.003], Neutral: [250, 0.012], Blue: [215, { scale: 1.0 }] },
  // Alfa Laval Bricks: 완전 무채색 Steal 램프, 강조는 짙은 네이비 Water 100 #10387f (H≈262, 채도 높음)
  alfalaval: { Surface: [0, 0], Neutral: [0, 0], Blue: [262, { scale: 1.35 }] },
};

// component-primitives Border-radius (OB: br-N = N). br-0·br-round는 모든 방향에서 그대로 둔다.
export const RADIUS = {
  // Pleos Basic button: 모서리 ≈ 높이의 1/3 (basic_size 도해 실측)
  pleos: { "br-2": 4, "br-4": 8, "br-6": 16, "br-8": 16, "br-12": 24, "br-16": 24, "br-24": 32 },
  kongsberg: { "br-2": 2, "br-4": 2, "br-6": 4, "br-8": 4, "br-12": 6, "br-16": 8, "br-24": 12 },
  alfalaval: { "br-2": 0, "br-4": 0, "br-6": 0, "br-8": 0, "br-12": 0, "br-16": 0, "br-24": 0 },
};

export const MODE = { pleos: "Explore-Pleos", kongsberg: "Explore-Kongsberg", alfalaval: "Explore-AlfaLaval" };

// 방향 하나의 전체 값 (Figma에 넣는 단위). 키는 Color-primitives-day 변수 이름에서 "Primitives-day/"를 뺀 것.
export function directionValues(dir) {
  const [h, c] = DIRECTIONS[dir].Blue;
  const colors = {};
  for (const [g, [hue, chroma]] of Object.entries(DIRECTIONS[dir]))
    for (const [k, v] of Object.entries(hue === "ref" ? fromRef(OB[g], chroma) : reramp(OB[g], hue, chroma))) colors[`${g}/${k}`] = v;
  colors["Base/Blue"] = reramp({ x: "#5486cc" }, h, c).x;
  colors["Blue/050-tint"] = reramp({ x: "#0a64ed" }, h, c).x + "1c"; // #RRGGBBAA, OB 원본도 알파 0.11
  return { colors, radius: RADIUS[dir] };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const yaml = process.argv.includes("--yaml");
  const out = Object.fromEntries(Object.keys(DIRECTIONS).map((d) => [d, directionValues(d)]));
  if (!yaml) console.log(JSON.stringify(out, null, 2));
  else
    for (const [d, { colors, radius }] of Object.entries(out)) {
      console.log(`# --- ${d} (${MODE[d]})`);
      for (const [k, v] of Object.entries(colors))
        console.log(`- collection: Color-primitives-day\n  variable: Primitives-day/${k}\n  modes: { ${MODE[d]}: "${v}" }`);
      for (const [k, v] of Object.entries(radius))
        console.log(`- collection: component-primitives\n  variable: Border-radius/${k}\n  modes: { ${MODE[d]}: ${v} }`);
    }
}
