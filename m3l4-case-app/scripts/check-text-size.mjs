// Finds visible text drawn below the brief's floors at 1920x1080 (CLAUDE.md section 2): body text
// 18px, chart text 16px. Walks shadow roots too, since Grid Lite, the tiles and the stepper draw
// inside them. Prints each offending element once per screen, and exits 1 if there are any.
//
//   node scripts/check-text-size.mjs
import { chromium } from 'playwright-core';

const base = process.env.URL ?? 'http://localhost:4400/';
const KEY = 'm3l4-case-app/v1';
const state = (tab, scene, extra = {}) => ({
  tab,
  scene,
  revealIndex: 0,
  votes: { A: 0, B: 0, C: 0, D: 0 },
  faultReading: 'device',
  ...extra,
});
const screens = {
  case: state('case', 0),
  'ops-1': state('ops', 0),
  'ops-2': state('ops', 1),
  'ops-3': state('ops', 2),
  'ops-3-finding': state('ops', 2, { faultReading: 'finding' }),
  'ops-4': state('ops', 3),
  'ops-5-r4': state('ops', 4, { revealIndex: 4 }),
  'ops-6': state('ops', 5),
  'ops-7': state('ops', 6),
};

const browser = await chromium.launch({ channel: 'msedge', headless: true });
let total = 0;
for (const [name, saved] of Object.entries(screens)) {
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  await context.addInitScript(([key, value]) => localStorage.setItem(key, value), [KEY, JSON.stringify(saved)]);
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);
  const small = await page.evaluate(() => {
    const found = new Map();
    const visit = (root) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        const text = n.textContent.trim();
        if (!text) continue;
        const el = n.parentElement;
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        if (!r.width || !r.height || cs.visibility === 'hidden' || cs.display === 'none') continue;
        if (r.bottom < 0 || r.top > innerHeight) continue;
        if (el.closest('.visually-hidden')) continue;
        // Rendered size: CSS zoom (used on Grid Lite) is not part of the computed font-size.
        const size = Math.round(parseFloat(cs.fontSize) * (el.currentCSSZoom ?? 1) * 10) / 10;
        const inChart = !!el.closest('svg');
        const floor = inChart ? 16 : 18;
        if (size < floor - 0.1) {
          const host = root instanceof ShadowRoot ? root.host.tagName.toLowerCase() + ' › ' : '';
          const key = `${host}${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 2).join('.')} ${size}px`;
          if (!found.has(key)) found.set(key, text.slice(0, 40));
        }
      }
      for (const host of root.querySelectorAll('*')) if (host.shadowRoot) visit(host.shadowRoot);
    };
    visit(document);
    return [...found].map(([k, v]) => `${k}  "${v}"`);
  });
  total += small.length;
  console.log(`${name}: ${small.length ? '' : 'ok'}`);
  for (const s of small) console.log(`   ${s}`);
  await context.close();
}
await browser.close();
process.exit(total ? 1 : 0);
