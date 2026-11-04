// Screenshots every screen at the sizes the brief asks for, with the installed Microsoft Edge
// driven by playwright-core (no browser download). Also records every request that leaves
// localhost, so the "no runtime network calls" check has evidence, and runs axe on each screen.
//
//   npm run present            (in another terminal, or the preview server on :4400)
//   node scripts/shoot.mjs                     every screen, 1920x1080 and 1280x720
//   node scripts/shoot.mjs case ops-3 overlay  only these screens
import { chromium } from 'playwright-core';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const outDir = join(root, 'screenshots');
const base = process.env.URL ?? 'http://localhost:4400/';
const axeSource = readFileSync(createRequire(import.meta.url).resolve('axe-core/axe.min.js'), 'utf8');
const KEY = 'm3l4-case-app/v1';

// The page at its design size; the page in a 1280x720 window; and Bobby's 1920x1080 screen as a viewer
// sees it in a 1280x720 Teams window, which is the same layout drawn at two thirds of the size.
const sizes = [
  { w: 1920, h: 1080, dsf: 1, label: '1920x1080' },
  { w: 1280, h: 720, dsf: 1, label: '1280x720' },
  { w: 1920, h: 1080, dsf: 2 / 3, label: 'share-1280x720' },
  // Not run by default (SIZES=...): a browser window with tabs on a 1920x1080 screen, and 125% scaling.
  { w: 1920, h: 950, dsf: 1, label: '1920x950', extra: true },
  { w: 1536, h: 864, dsf: 1, label: '1536x864', extra: true },
  { w: 1536, h: 730, dsf: 1, label: '1536x730', extra: true },
];
const only = process.env.SIZES?.split(',');

// Each screen is a saved state plus an optional action once the page is up.
const state = (tab, scene, extra = {}) => ({
  tab,
  scene,
  revealIndex: 0,
  votes: { A: 0, B: 0, C: 0, D: 0 },
  faultReading: 'device',
  ...extra,
});
const screens = {
  case: { state: state('case', 0) },
  overlay: { state: state('ops', 2), after: async (page) => page.getByRole('button', { name: 'The case, over this scene' }).click() },
};
for (let i = 1; i <= 7; i++) screens[`ops-${i}`] = { state: state('ops', i - 1) };
screens['ops-3-finding'] = { state: state('ops', 2, { faultReading: 'finding' }) };
for (let r = 1; r <= 4; r++) screens[`ops-5-r${r}`] = { state: state('ops', 4, { revealIndex: r }) };
screens['ops-4-votes'] = { state: state('ops', 3, { votes: { A: 2, B: 3, C: 1, D: 0 } }) };

const wanted = process.argv.slice(2);
const names = wanted.length ? wanted : Object.keys(screens);

mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const external = new Set();
const report = [];

for (const { w, h, dsf, label } of sizes.filter((s) => (only ? only.includes(s.label) : !s.extra))) {
  for (const name of names) {
    const screen = screens[name];
    if (!screen) throw new Error(`Unknown screen ${name}`);
    const context = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dsf });
    await context.addInitScript(
      ([key, value]) => {
        if (!sessionStorage.getItem('shoot-seeded')) {
          localStorage.setItem(key, value);
          sessionStorage.setItem('shoot-seeded', '1');
        }
      },
      [KEY, JSON.stringify(screen.state)],
    );
    const page = await context.newPage();
    page.on('request', (r) => {
      const host = new URL(r.url()).hostname;
      if (host !== 'localhost' && !r.url().startsWith('data:')) external.add(host);
    });
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

    await page.goto(base, { waitUntil: 'networkidle' });
    if (screen.after) await screen.after(page);
    await page.waitForTimeout(600);
    const file = join(outDir, `${name}-${label}.png`);
    await page.screenshot({ path: file });

    // Anything that scrolls inside a fixed-height screen is content the room cannot see.
    const overflow = await page.evaluate(() =>
      [...document.querySelectorAll('.panel igx-card-content, .page, .scene, .case-dialog-body')]
        .filter((el) => el.scrollHeight > el.clientHeight + 2)
        .map((el) => `${el.className || el.tagName} ${el.scrollHeight}/${el.clientHeight}`),
    );
    await page.addScriptTag({ content: axeSource });
    const axe = await page.evaluate(async () => {
      const r = await window.axe.run(document, { resultTypes: ['violations'] });
      return r.violations.map(
        (v) => `${v.impact} ${v.id} (${v.nodes.length}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' / ')})`,
      );
    });
    const watermark = await page.evaluate(() => !!document.querySelector('igc-trial-watermark, igx-trial-watermark'));

    report.push({ screen: name, size: label, overflow, axe, watermark, errors });
    await context.close();
  }
}
await browser.close();

writeFileSync(join(outDir, 'report.json'), JSON.stringify({ external: [...external], report }, null, 2));
for (const r of report) {
  const flags = [
    r.overflow.length && `overflow ${r.overflow.join('; ')}`,
    r.axe.length && `axe ${r.axe.join(', ')}`,
    r.watermark && 'WATERMARK',
    r.errors.length && `errors ${r.errors.join(' | ')}`,
  ].filter(Boolean);
  console.log(`${r.screen.padEnd(13)} ${r.size.padEnd(15)} ${flags.length ? flags.join(' · ') : 'ok'}`);
}
console.log(`Requests leaving localhost: ${[...external].join(', ') || 'none'}`);
