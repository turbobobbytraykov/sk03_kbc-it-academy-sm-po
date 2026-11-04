// Tabs through each screen and lists what takes focus, in order, flagging any stop with no visible
// focus indicator (no outline, no box-shadow, no change of background). Exits 1 if any are flagged.
//
//   node scripts/check-keyboard.mjs
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
  'ops-3': state('ops', 2),
  'ops-4': state('ops', 3),
  'ops-5-r4': state('ops', 4, { revealIndex: 4 }),
  'ops-6': state('ops', 5),
};

const browser = await chromium.launch({ channel: 'msedge', headless: true });
let flagged = 0;
for (const [name, saved] of Object.entries(screens)) {
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  await context.addInitScript(([key, value]) => localStorage.setItem(key, value), [KEY, JSON.stringify(saved)]);
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  const stops = [];
  for (let i = 0; i < 45; i++) {
    await page.keyboard.press('Tab');
    const info = await page.evaluate(() => {
      let el = document.activeElement;
      while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
      if (!el || el === document.body) return null;
      const label = (el.getAttribute('aria-label') || el.textContent || el.tagName).trim().replace(/\s+/g, ' ').slice(0, 38);
      // The indicator can sit on the element or on a near ancestor (Ignite draws some on a wrapper).
      const visible = (() => {
        for (let e = el, depth = 0; e && depth < 3; e = e.parentElement ?? e.getRootNode().host, depth++) {
          const cs = getComputedStyle(e);
          if ((cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) || (cs.boxShadow && cs.boxShadow !== 'none')) return true;
        }
        return false;
      })();
      return { id: `${el.tagName.toLowerCase()}|${label}`, label: `${el.tagName.toLowerCase()} "${label}"`, visible };
    });
    if (!info) continue;
    if (stops.length && stops[0].id === info.id) break; // wrapped round
    stops.push(info);
  }
  const bad = stops.filter((s) => !s.visible);
  flagged += bad.length;
  console.log(`${name}: ${stops.length} stops${bad.length ? `, ${bad.length} without a visible indicator` : ''}`);
  for (const s of stops) console.log(`   ${s.visible ? '  ' : '!!'} ${s.label}`);
  await context.close();
}
await browser.close();
process.exit(flagged ? 1 : 0);
