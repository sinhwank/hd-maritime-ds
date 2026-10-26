// tokens/overrides, tokens/additions를 모아 Figma 적용 계획(JSON)을 출력한다. hd-tokens-apply 스킬이 사용.
// 기본은 approved만 "apply"에 넣고, proposed는 "pending"으로 보여준다.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import YAML from "yaml";

const load = (dir) =>
  readdirSync(dir)
    .filter((f) => f.endsWith(".yaml"))
    .flatMap((f) => (YAML.parse(readFileSync(join(dir, f), "utf8")) ?? []).map((e) => ({ ...e, file: join(dir, f) })));

const toValue = (v) => (typeof v === "string" && /^\{.+\}$/.test(v) ? { alias: v.slice(1, -1) } : { value: v });

const entries = [
  ...load("tokens/overrides").map((e) => ({ ...e, kind: "override" })),
  ...load("tokens/additions").map((e) => ({ ...e, kind: "addition" })),
].map((e) => ({ ...e, modes: Object.fromEntries(Object.entries(e.modes).map(([m, v]) => [m, toValue(v)])) }));

const key = (e) => `${e.collection}::${e.variable}`;
const dupes = Object.entries(Object.groupBy(entries, key)).filter(([, v]) => v.length > 1).map(([k]) => k);
const config = JSON.parse(readFileSync("figma.config.json", "utf8"));

console.log(
  JSON.stringify(
    {
      target: config.files.library,
      apply: entries.filter((e) => e.status === "approved"),
      pending: entries.filter((e) => e.status === "proposed").map(({ collection, variable, kind, reason }) => ({ collection, variable, kind, reason })),
      errors: dupes.map((k) => `duplicate entry: ${k}`),
    },
    null,
    2,
  ),
);
