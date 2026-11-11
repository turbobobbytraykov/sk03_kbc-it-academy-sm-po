// Calls one tool on one of the MCP servers in .mcp.json over stdio, and prints the result.
// The same servers an MCP-aware editor would load; this lets a build step or a person use them
// from the command line, and keeps a copy of every answer in mcp-log/ for BUILD-NOTES.md.
//
//   node scripts/mcp-call.mjs apexcharts list
//   node scripts/mcp-call.mjs apexcharts apexcharts_validate_config @configs/scene5-c.json
//   node scripts/mcp-call.mjs igniteui-cli get_doc '{"name":"tile-manager"}' --log scene1-tile-doc
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const [serverName, tool, rawArgs = '{}', ...rest] = process.argv.slice(2);
const logIdx = rest.indexOf('--log');
const logName = logIdx >= 0 ? rest[logIdx + 1] : null;

const servers = JSON.parse(readFileSync(join(root, '.mcp.json'), 'utf8')).mcpServers;
const server = servers[serverName];
if (!server || !tool) {
  console.error(`Usage: mcp-call.mjs <${Object.keys(servers).join('|')}> <list|tool> [json|@file] [--log name]`);
  process.exit(2);
}
const args = rawArgs.startsWith('@') ? JSON.parse(readFileSync(join(root, rawArgs.slice(1)), 'utf8')) : JSON.parse(rawArgs);

const child = spawn(process.platform === 'win32' ? [server.command, ...server.args].join(' ') : server.command, process.platform === 'win32' ? [] : server.args, {
  cwd: root,
  env: { ...process.env, ...(server.env ?? {}) },
  shell: process.platform === 'win32',
  stdio: ['pipe', 'pipe', 'inherit'],
});

let buffer = '';
const pending = new Map();
child.stdout.on('data', (chunk) => {
  buffer += chunk;
  let nl;
  while ((nl = buffer.indexOf('\n')) >= 0) {
    const line = buffer.slice(0, nl).trim();
    buffer = buffer.slice(nl + 1);
    if (!line) continue;
    let msg;
    try {
      msg = JSON.parse(line);
    } catch {
      continue; // a server that logs to stdout
    }
    if (msg.id != null && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  }
});

let nextId = 1;
const request = (method, params) =>
  new Promise((resolve) => {
    const id = nextId++;
    pending.set(id, resolve);
    child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n');
  });
const notify = (method, params) => child.stdin.write(JSON.stringify({ jsonrpc: '2.0', method, params }) + '\n');

const timer = setTimeout(() => {
  console.error('MCP call timed out after 180 s');
  child.kill();
  process.exit(1);
}, 180_000);

const init = await request('initialize', {
  protocolVersion: '2025-06-18',
  capabilities: {},
  clientInfo: { name: 'm3l4-case-app-build', version: '1.0.0' },
});
if (init.error) throw new Error(JSON.stringify(init.error));
notify('notifications/initialized', {});

const reply = tool === 'list' ? await request('tools/list', {}) : await request('tools/call', { name: tool, arguments: args });
clearTimeout(timer);
child.stdin.end();
child.kill();

let out;
if (reply.error) {
  out = `ERROR ${JSON.stringify(reply.error, null, 2)}`;
} else if (tool === 'list') {
  out = reply.result.tools
    .map((t) => `## ${t.name}\n${t.description ?? ''}\nargs: ${JSON.stringify(t.inputSchema?.properties ?? {})}`)
    .join('\n\n');
} else {
  out = (reply.result.content ?? []).map((c) => (c.type === 'text' ? c.text : JSON.stringify(c))).join('\n');
  if (reply.result.isError) out = `TOOL ERROR\n${out}`;
}
console.log(out);
if (logName) {
  mkdirSync(join(root, 'mcp-log'), { recursive: true });
  writeFileSync(
    join(root, 'mcp-log', `${logName}.md`),
    `# ${serverName} / ${tool}\n\nCalled ${new Date().toISOString()}\n\n## Arguments\n\n\`\`\`json\n${JSON.stringify(args, null, 2)}\n\`\`\`\n\n## Result\n\n${out}\n`,
  );
}
process.exit(reply.error || reply.result?.isError ? 1 : 0);
