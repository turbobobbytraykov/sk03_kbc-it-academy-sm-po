// Screenshots of every screen and state in the installed Microsoft Edge (playwright-core, no browser
// download), each from a saved state, with checks printed per screen: scrolling, clipped text, text
// under 18px, axe violations, the Ignite trial watermark (a commercial component slipped in), console
// errors, and at the end every host the page contacted. Needs the server on :4300 (npm run serve:dist).
//
//   node scripts/shoot.mjs                       # English, 1920x1080, into screenshots/
//   URL=http://localhost:4300/bg/ OUT=screenshots/bg node scripts/shoot.mjs
//   SIZE=1280x720 ONLY=action-m3,log node scripts/shoot.mjs
import { chromium } from 'playwright-core';
import { mkdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
const axeSource = readFileSync(createRequire(import.meta.url).resolve('axe-core/axe.min.js'), 'utf8');
const external = new Set();
const out = process.env.OUT ?? join(import.meta.dirname, '..', 'screenshots');
const base = process.env.URL ?? 'http://localhost:4300/';
const [w, h] = (process.env.SIZE ?? '1920x1080').split('x').map(Number);
mkdirSync(out, { recursive: true });
const KEY = 'm3l5-case-app/v1';
const log = [
  { id: 1, elapsedSeconds: 95, storyTime: '02:50', momentId: 1, text: 'Declare an incident and wake the operations manager', role: 'engineer', authorised: false },
  { id: 2, elapsedSeconds: 430, storyTime: '03:32', momentId: 2, text: 'Severity 1, classify as major', role: 'opsmgr', authorised: true },
  { id: 3, elapsedSeconds: 520, storyTime: '03:57', momentId: 2, text: 'Switch fraud scoring off', role: 'opsmgr', authorised: false },
  { id: 4, elapsedSeconds: 900, storyTime: '05:45', momentId: 3, text: 'Holding statement to the press office', role: 'po', authorised: false },
  { id: 5, elapsedSeconds: 1290, storyTime: '07:50', momentId: 4, text: 'Keep the incident open until reconciliation has run', role: 'head', authorised: true },
];
// Each screen is a saved state plus an optional action once the page is up.
const st = (o) => ({ elapsed: 0, held: false, activeIndex: 0, activatedAt: [0], log: [], nextId: 1, severity: '', classifiedAt: null, screen: 'case', revealCount: 0, ...o });
const full = { elapsed: 1500, activeIndex: 3, activatedAt: [0, 360, 780, 1200], severity: 'Sev 1', classifiedAt: '03:32', log, nextId: 6 };
const screens = {
  'case': st({}),
  'overlay': { ...st({ screen: 'action', ...full, elapsed: 1000, activeIndex: 2, activatedAt: [0, 360, 780] }), after: (page) => page.locator('igx-navbar .case-btn').click() },
  'action-role': { ...st({ screen: 'action', elapsed: 430, activeIndex: 1, activatedAt: [0, 360], log: log.slice(0, 1), nextId: 2 }), after: async (page) => { await page.locator('#decision').fill('Switch fraud scoring off'); await page.locator('.role-picker button').nth(1).click(); } },
  'action-logged': { ...st({ screen: 'action', elapsed: 430, activeIndex: 1, activatedAt: [0, 360], log: log.slice(0, 1), nextId: 2 }), after: async (page) => { await page.locator('#decision').fill('Switch fraud scoring off'); await page.locator('.role-picker button').nth(1).click(); await page.locator('.btn-unauth').click(); } },
  'log-edit': { ...st({ screen: 'log', ...full }), after: (page) => page.locator('.row-actions button').first().click() },
  'reveal-3': st({ screen: 'reveal', ...full, revealCount: 3 }),
  'action-m1': st({ screen: 'action' }),
  'action-m2': st({ screen: 'action', elapsed: 430, activeIndex: 1, activatedAt: [0, 360], severity: 'Sev 1', classifiedAt: '03:32', log: log.slice(0, 2), nextId: 3 }),
  'action-m3': st({ screen: 'action', elapsed: 1000, activeIndex: 2, activatedAt: [0, 360, 780], severity: 'Sev 1', classifiedAt: '03:32', log: log.slice(0, 4), nextId: 5 }),
  'action-m4-end': st({ screen: 'action', elapsed: 1500, activeIndex: 3, activatedAt: [0, 360, 780, 1200], severity: 'Sev 1', classifiedAt: '03:32', log, nextId: 6 }),
  'log-empty': st({ screen: 'log' }),
  'log': st({ screen: 'log', elapsed: 1500, activeIndex: 3, activatedAt: [0, 360, 780, 1200], log, nextId: 6 }),
  'reveal-0': st({ screen: 'reveal', elapsed: 1500, activeIndex: 3, activatedAt: [0, 360, 780, 1200], log, nextId: 6 }),
  'reveal-7': st({ screen: 'reveal', elapsed: 1500, activeIndex: 3, activatedAt: [0, 360, 780, 1200], log, nextId: 6, revealCount: 7 }),
};
const only = process.env.ONLY?.split(',');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
for (const [name, { after, ...state }] of Object.entries(screens)) {
  if (only && !only.includes(name)) continue;
  const context = await browser.newContext({ viewport: { width: w, height: h } });
  await context.addInitScript(([k, v]) => localStorage.setItem(k, v), [KEY, JSON.stringify(state)]);
  const page = await context.newPage();
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('request', (r) => {
    const host = new URL(r.url()).hostname;
    if (host !== 'localhost' && !r.url().startsWith('data:')) external.add(host);
  });
  await page.goto(base);
  await page.waitForTimeout(1500);
  if (after) {
    await after(page);
    await page.waitForTimeout(900);
  }
  const info = await page.evaluate(() => {
    const main = document.querySelector('main');
    // 18px at 1920x1080, where the root is 21px; in proportion on any other window.
    const floor = (17.9 * parseFloat(getComputedStyle(document.documentElement).fontSize)) / 21.1;
    const small = [...document.querySelectorAll('body *')].filter((e) => e.offsetParent && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && parseFloat(getComputedStyle(e).fontSize) * (e.currentCSSZoom ?? 1) < floor)
      .map((e) => Math.round(parseFloat(getComputedStyle(e).fontSize) * (e.currentCSSZoom ?? 1) * 10) / 10 + 'px "' + e.textContent.trim().slice(0, 24) + '"');
    const clipped = [...document.querySelectorAll('body *')].filter((e) => e.offsetParent && !e.classList.contains('sr-only') && ((e.scrollWidth > e.clientWidth + 2 && getComputedStyle(e).overflowX === 'hidden') || (e.scrollHeight > e.clientHeight + 2 && getComputedStyle(e).overflowY === 'hidden')))
      .map((e) => String(e.className).slice(0, 30) + ' ' + (e.scrollWidth - e.clientWidth) + '/' + (e.scrollHeight - e.clientHeight));
    // An open dialog that scrolls hides part of what it was opened to show.
    const dialog = [...document.querySelectorAll('.case-dialog-body, .edit-form')].find((e) => e.offsetParent);
    return { dialog: dialog ? dialog.scrollHeight - dialog.clientHeight : 0, scroll: main.scrollHeight - main.clientHeight, page: document.documentElement.scrollHeight - innerHeight, small: [...new Set(small)], clipped };
  });
  await page.screenshot({ path: join(out, `${name}.png`) });
  await page.addScriptTag({ content: axeSource });
  const axe = await page.evaluate(async () => {
    const r = await window.axe.run(document, { resultTypes: ['violations'] });
    // Two known false positives, and only these two. Grid Lite 0.11 gives its roles (grid, row,
    // columnheader, gridcell) through ElementInternals, which the browser's accessibility tree honours
    // (scripts/check-a11y-tree.mjs proves it) but axe-core cannot read. Its one explicit role attribute,
    // rowgroup on <igc-virtual-scroll>, therefore looks parentless and childless to axe. Every other
    // finding, and these two rules on any other element, still fails the check.
    const falsePositive = (v, n) =>
      (v.id === 'aria-required-parent' || v.id === 'aria-required-children') &&
      n.target.length === 1 && Array.isArray(n.target[0]) && n.target[0].join(' ') === 'igx-grid-lite igc-virtual-scroll';
    return r.violations
      .map((v) => ({ ...v, nodes: v.nodes.filter((n) => !falsePositive(v, n)) }))
      .filter((v) => v.nodes.length)
      .map((v) => `${v.impact} ${v.id} (${v.nodes.length}: ${v.nodes.slice(0, 2).map((n) => n.target.flat().join(' ')).join(' / ')})`);
  });
  const watermark = await page.evaluate(() => !!document.querySelector('igc-trial-watermark, igx-trial-watermark'));
  console.log(name.padEnd(14), `scroll ${info.scroll}/${info.page}`, info.dialog > 1 ? `DIALOG SCROLLS ${info.dialog}px` : '', info.small.length ? 'small: ' + info.small.join(', ') : '', info.clipped.length ? 'clipped: ' + info.clipped.join(', ') : '', axe.length ? 'axe: ' + axe.join('; ') : '', watermark ? 'TRIAL WATERMARK' : '', errors.length ? 'ERRORS ' + errors.join(' | ') : '');
  await context.close();
}
await browser.close();
console.log('Requests leaving localhost:', [...external].join(', ') || 'none');
