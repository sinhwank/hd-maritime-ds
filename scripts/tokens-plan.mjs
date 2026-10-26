// tokens/의 DTCG JSON을 평탄화해 Figma Variables 계획(JSON)을 출력한다. ds-tokens-sync 스킬이 사용.
import { readFileSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";

const read = (p) => JSON.parse(readFileSync(p, "utf8"));

function flatten(node, path = [], type, out = []) {
  const t = node.$type ?? type;
  if ("$value" in node) {
    out.push({ name: path.join("/"), type: t, value: node.$value, description: node.$description });
    return out;
  }
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith("$") || typeof v !== "object") continue;
    flatten(v, [...path, k], t, out);
  }
  return out;
}

const toRef = (v) => (typeof v === "string" && /^\{.+\}$/.test(v) ? { alias: v.slice(1, -1).replaceAll(".", "/") } : { value: v });

const primitive = readdirSync("tokens/primitive").flatMap((f) => flatten(read(join("tokens/primitive", f))));
const themeDir = "tokens/semantic/themes";
const themes = readdirSync(themeDir).map((f) => basename(f, ".json"));
const semantic = {};
for (const th of themes) {
  for (const t of flatten(read(join(themeDir, `${th}.json`)))) {
    (semantic[t.name] ??= { name: t.name, type: t.type, modes: {} }).modes[th] = toRef(t.value);
  }
}
const status = readdirSync("tokens/status").flatMap((f) => flatten(read(join("tokens/status", f))));

const skipped = [...primitive, ...status].filter((t) => t.value === "TBD").map((t) => t.name);
const plan = {
  collections: [
    { name: "primitive", modes: ["value"], variables: primitive.filter((t) => t.value !== "TBD").map((t) => ({ ...t, value: toRef(t.value) })) },
    { name: "semantic", modes: themes, variables: Object.values(semantic) },
    { name: "status", modes: themes, variables: status.filter((t) => t.value !== "TBD").map((t) => ({ name: t.name, type: t.type, modes: Object.fromEntries(themes.map((th) => [th, toRef(t.value)])) })) },
  ],
  skipped,
};
console.log(JSON.stringify(plan, null, 2));
