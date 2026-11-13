// Reads the browser's own accessibility tree (Chrome DevTools Protocol, Accessibility.getFullAXTree) on
// every screen that shows a Grid Lite, and fails unless each grid is exposed as a grid with an accessible
// name, with rows, column headers and grid cells inside it.
//
// Why this exists: Grid Lite builds its ARIA grid through ElementInternals (internal/a11y.js in
// igniteui-grid-lite), not through role attributes in the DOM. axe-core reads attributes and cannot see
// ElementInternals, so axe reports two false positives on the one part that does carry a role attribute
// (see shoot.mjs). The browser's tree is what a screen reader is given, so this is the real check.
//
//   node scripts/check-a11y-tree.mjs            (server on :4400; URL=http://localhost:4400/bg/ for Bulgarian)
import { chromium } from 'playwright-core';

const base = process.env.URL ?? 'http://localhost:4400/';
const KEY = 'm3l4-case-app/v1';
const state = (scene, extra = {}) => ({
  tab: 'ops',
  scene,
  revealIndex: 0,
  votes: { A: 0, B: 0, C: 0, D: 0 },
  faultReading: 'device',
  ...extra,
});

// Scene 3 shows the incident grid. Scene 5 shows the approvals grid once proposal A is revealed, and the
// reveal is pressed at run time (R) so the tile manager's late-add path is the one that is checked.
const screens = [
  { name: 'ops scene 3 (incident grid)', saved: state(2) },
  { name: 'ops scene 5 after one reveal (approvals grid)', saved: state(4), reveal: 1 },
];

const browser = await chromium.launch({ channel: 'msedge', headless: true });
let failures = 0;

for (const { name, saved, reveal } of screens) {
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  await context.addInitScript(([key, value]) => localStorage.setItem(key, value), [KEY, JSON.stringify(saved)]);
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'networkidle', timeout: 60000 }).catch(async () => {
    await page.waitForLoadState('load');
    await page.waitForTimeout(4000);
  });
  for (let i = 0; i < (reveal ?? 0); i++) {
    await page.keyboard.press('r');
    await page.waitForTimeout(400);
  }
  await page.waitForSelector('igx-grid-lite', { timeout: 10000 });
  await page.waitForTimeout(800);

  const gridHosts = await page.locator('igx-grid-lite').count();
  const cdp = await context.newCDPSession(page);
  await cdp.send('Accessibility.enable');
  const { nodes } = await cdp.send('Accessibility.getFullAXTree');
  const live = nodes.filter((n) => !n.ignored);
  const count = (role) => live.filter((n) => n.role?.value === role).length;
  const grids = live.filter((n) => n.role?.value === 'grid');
  const counts = { grid: grids.length, row: count('row'), columnheader: count('columnheader'), gridcell: count('gridcell') };

  const problems = [];
  if (grids.length !== gridHosts) problems.push(`${gridHosts} igx-grid-lite on the page but ${grids.length} grid nodes in the tree`);
  for (const g of grids) {
    if (!g.name?.value?.trim()) problems.push('a grid node has no accessible name');
  }
  for (const role of ['row', 'columnheader', 'gridcell']) {
    if (!counts[role]) problems.push(`no ${role} nodes in the tree`);
  }

  const named = grids.map((g) => `"${g.name?.value ?? ''}"`).join(', ');
  console.log(
    `${problems.length ? 'FAIL' : 'ok  '} ${name}: grid ${counts.grid} [${named}], row ${counts.row}, columnheader ${counts.columnheader}, gridcell ${counts.gridcell}`,
  );
  for (const p of problems) console.log(`       ${p}`);
  failures += problems.length;
  await context.close();
}

await browser.close();
if (failures) process.exit(1);
console.log('The accessibility tree exposes every Grid Lite as a named grid with rows, column headers and cells.');
