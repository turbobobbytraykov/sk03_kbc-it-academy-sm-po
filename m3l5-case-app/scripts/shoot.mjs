// Screenshots of every screen and state in the installed Microsoft Edge (playwright-core, no browser
// download), each from a saved state, with a few layout checks printed per screen: scrolling, clipped
// text, text under 18px, console errors. Needs the server on :4300 (npm run serve:dist).
//
//   node scripts/shoot.mjs                       # English, 1920x1080, into screenshots/
//   URL=http://localhost:4300/bg/ OUT=screenshots/bg node scripts/shoot.mjs
//   SIZE=1280x720 ONLY=action-m3,log node scripts/shoot.mjs
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
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
  await page.goto(base);
  await page.waitForTimeout(1500);
  if (after) {
    await after(page);
    await page.waitForTimeout(900);
  }
  const info = await page.evaluate(() => {
    const main = document.querySelector('main');
    const small = [...document.querySelectorAll('body *')].filter((e) => e.offsetParent && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && parseFloat(getComputedStyle(e).fontSize) < 17.5)
      .map((e) => Math.round(parseFloat(getComputedStyle(e).fontSize) * 10) / 10 + 'px "' + e.textContent.trim().slice(0, 24) + '"');
    const clipped = [...document.querySelectorAll('body *')].filter((e) => e.offsetParent && ((e.scrollWidth > e.clientWidth + 2 && getComputedStyle(e).overflowX === 'hidden') || (e.scrollHeight > e.clientHeight + 2 && getComputedStyle(e).overflowY === 'hidden')))
      .map((e) => String(e.className).slice(0, 30) + ' ' + (e.scrollWidth - e.clientWidth) + '/' + (e.scrollHeight - e.clientHeight));
    return { scroll: main.scrollHeight - main.clientHeight, page: document.documentElement.scrollHeight - innerHeight, small: [...new Set(small)], clipped };
  });
  await page.screenshot({ path: join(out, `${name}.png`) });
  console.log(name.padEnd(14), `scroll ${info.scroll}/${info.page}`, info.small.length ? 'small: ' + info.small.join(', ') : '', info.clipped.length ? 'clipped: ' + info.clipped.join(', ') : '', errors.length ? 'ERRORS ' + errors.join(' | ') : '');
  await context.close();
}
await browser.close();
