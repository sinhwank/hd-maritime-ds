// components/**/*.spec.yaml, screens/*.screen.yaml, tokens/{overrides,additions}/*.yaml을 JSON Schema로 검증한다.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import Ajv from "ajv/dist/2020.js";
import YAML from "yaml";

const ajv = new Ajv({ allErrors: true, strict: false });
const schemas = {
  component: ajv.compile(JSON.parse(readFileSync("schemas/component.schema.json", "utf8"))),
  screen: ajv.compile(JSON.parse(readFileSync("schemas/screen.schema.json", "utf8"))),
  tokens: ajv.compile(JSON.parse(readFileSync("schemas/tokens.schema.json", "utf8"))),
};

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const only = process.argv.slice(2);
const targets = [
  ...walk("components").filter((f) => f.endsWith(".spec.yaml")).map((f) => [f, "component"]),
  ...walk("screens").filter((f) => f.endsWith(".screen.yaml")).map((f) => [f, "screen"]),
  ...walk("tokens").filter((f) => f.endsWith(".yaml")).map((f) => [f, "tokens"]),
].filter(([f]) => only.length === 0 || only.includes(f));

let failed = 0;
for (const [file, kind] of targets) {
  const doc = YAML.parse(readFileSync(file, "utf8")) ?? [];
  const validate = schemas[kind];
  if (validate(doc)) {
    console.log(`✓ ${file}`);
  } else {
    failed++;
    console.log(`✗ ${file}`);
    for (const e of validate.errors) console.log(`    ${e.instancePath || "/"} ${e.message}`);
  }
}
console.log(`\n${targets.length - failed}/${targets.length} passed`);
process.exit(failed ? 1 : 0);
