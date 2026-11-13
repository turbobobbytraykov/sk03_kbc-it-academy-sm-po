// Reads the browser's own accessibility tree (Chrome DevTools Protocol, Accessibility.getFullAXTree) for the
// Log screen and fails unless it holds one named grid with rows, column headers and grid cells.
//
// Why this exists: Grid Lite 0.11 sets its ARIA roles through ElementInternals, not attributes. A DOM
// inspector and axe-core do not see them (axe reports two false positives, which shoot.mjs excludes by name),
// but the browser does, and so does a screen reader. This script is the check that the grid is really exposed.
//
//   node scripts/check-a11y-tree.mjs                       # English, http://localhost:4300/
//   URL=http://localhost:4300/bg/ node scripts/check-a11y-tree.mjs
//
// Needs the server on :4300 (npm run serve:dist) and the installed Microsoft Edge; nothing is downloaded.
import { chromium } from 'playwright-core';

const base = process.env.URL ?? 'http://localhost:4300/';
const KEY = 'm3l5-case-app/v1';
const log = [
  { id: 1, elapsedSeconds: 95, storyTime: '02:50', momentId: 1, text: 'Declare an incident and wake the operations manager', role: 'engineer', authorised: false },
  { id: 2, elapsedSeconds: 430, storyTime: '03:32', momentId: 2, text: 'Severity 1, classify as major', role: 'opsmgr', authorised: true },
  { id: 3, elapsedSeconds: 900, storyTime: '05:45', momentId: 3, text: 'Holding statement to the press office', role: 'po', authorised: false },
];
const state = { elapsed: 1500, held: false, activeIndex: 3, activatedAt: [0, 360, 780, 1200], log, nextId: 4, severity: 'Sev 1', classifiedAt: '03:32', screen: 'log', revealCount: 0 };

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
await context.addInitScript(([k, v]) => localStorage.setItem(k, v), [KEY, JSON.stringify(state)]);
const page = await context.newPage();
await page.goto(base);
await page.waitForSelector('igx-grid-lite', { timeout: 8000 });
await page.waitForTimeout(1000);

const cdp = await context.newCDPSession(page);
await cdp.send('Accessibility.enable');
const { nodes } = await cdp.send('Accessibility.getFullAXTree');
const live = nodes.filter((n) => !n.ignored);
const roles = {};
for (const n of live) roles[n.role?.value] = (roles[n.role?.value] ?? 0) + 1;
const grids = live.filter((n) => n.role?.value === 'grid');
const gridName = grids[0]?.name?.value?.trim();

const checks = [
  ['exactly one grid', grids.length === 1, `${grids.length}`],
  ['the grid has an accessible name', !!gridName, JSON.stringify(gridName ?? '')],
  ['row nodes (header row + at least the 3 logged decisions)', (roles.row ?? 0) >= 4, `${roles.row ?? 0}`],
  ['columnheader nodes (at least 6)', (roles.columnheader ?? 0) >= 6, `${roles.columnheader ?? 0}`],
  ['gridcell nodes (at least 18)', (roles.gridcell ?? 0) >= 18, `${roles.gridcell ?? 0}`],
];
let failed = 0;
for (const [label, ok, detail] of checks) {
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}: ${detail}`);
}
await browser.close();
if (failed) {
  console.error(`${failed} check(s) failed: the log grid is not exposed to assistive technology as a grid.`);
  process.exit(1);
}
console.log('The log grid is exposed as a named grid with rows, column headers and cells.');
