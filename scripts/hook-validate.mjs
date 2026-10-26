// PostToolUse 훅: 방금 수정한 파일이 spec/screen YAML이면 검증하고, 실패 시 Claude에게 피드백(exit 2).
import { execFileSync } from "node:child_process";

let input = "";
for await (const chunk of process.stdin) input += chunk;
const file = JSON.parse(input || "{}")?.tool_input?.file_path ?? "";
const rel = file.replace(process.cwd() + "/", "");
if (!/\.(spec|screen)\.yaml$/.test(rel)) process.exit(0);

try {
  execFileSync("node", ["scripts/validate.mjs", rel], { stdio: "pipe" });
} catch (e) {
  process.stderr.write(e.stdout.toString());
  process.exit(2);
}
