// Sends every chart config the page ships to the ApexCharts MCP server's apexcharts_validate_config.
// Bundles src/app/charts.ts with esbuild (it has no Angular in it), builds each config, and saves the
// validator's answer to mcp-log/validate-<name>.md. Exits 1 if any config has errors.
//
//   node scripts/validate-charts.mjs
import { build } from 'esbuild';
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = join(import.meta.dirname, '..');
const out = join(tmpdir(), `m3l4-charts-${process.pid}.mjs`);
await build({
  entryPoints: [join(root, 'src/app/charts.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: out,
  logLevel: 'warning',
});
const { CHARTS } = await import(pathToFileURL(out).href);

mkdirSync(join(root, 'mcp-log/args'), { recursive: true });
let failed = 0;
for (const [name, make] of Object.entries(CHARTS)) {
  const argsFile = `mcp-log/args/validate-${name}.json`;
  writeFileSync(join(root, argsFile), JSON.stringify({ config: make() }));
  let answer;
  try {
    answer = execFileSync(
      process.execPath,
      [join(root, 'scripts/mcp-call.mjs'), 'apexcharts', 'apexcharts_validate_config', `@${argsFile}`, '--log', `validate-${name}`],
      { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
    );
  } catch (e) {
    answer = e.stdout ?? String(e);
  }
  let result;
  try {
    result = JSON.parse(answer);
  } catch {
    result = { ok: false, raw: answer.trim() };
  }
  if (!result.ok) failed++;
  const issues = (result.issues ?? []).map((i) => `    ${i.severity ?? ''} ${i.path ?? ''} ${i.message ?? JSON.stringify(i)}`);
  console.log(`${result.ok ? 'PASS' : 'FAIL'}  ${name}`);
  if (issues.length) console.log(issues.join('\n'));
  if (result.raw) console.log(`    ${result.raw.slice(0, 600)}`);
}
process.exit(failed ? 1 : 0);
