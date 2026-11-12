// Opens both single-file builds straight from disk (file://), walks the four screens, and checks that
// the charts drew, nothing errored, and nothing was fetched other than Google Fonts. Run after a build.
import { chromium } from 'playwright-core';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const dir = join(import.meta.dirname, '..', 'dist', 'm3l5-case-app', 'single');
const state = {
  elapsed: 1500, held: false, activeIndex: 3, activatedAt: [0, 360, 780, 1200], nextId: 3, severity: 'Sev 1', classifiedAt: '03:32',
  screen: 'case', revealCount: 2,
  log: [
    { id: 1, elapsedSeconds: 95, storyTime: '02:50', momentId: 1, text: 'Declare an incident', role: 'engineer', authorised: false },
    { id: 2, elapsedSeconds: 430, storyTime: '03:32', momentId: 2, text: 'Severity 1', role: 'opsmgr', authorised: true },
  ],
};
// Charts expected on: the case, action, log and reveal screens.
const expected = [0, 1, 2, 1];
const browser = await chromium.launch({ channel: 'msedge', headless: true });
let failed = false;
for (const file of ['m3l5-case-app.html', 'm3l5-case-app-bg.html']) {
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  await context.addInitScript((s) => localStorage.setItem('m3l5-case-app/v1', s), JSON.stringify(state));
  const page = await context.newPage();
  const errors = [];
  const requests = new Set();
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && !/fonts\.g/.test(m.text()) && errors.push(m.text()));
  page.on('request', (r) => !r.url().startsWith('file:') && !r.url().startsWith('data:') && requests.add(new URL(r.url()).hostname));
  await page.goto(pathToFileURL(join(dir, file)).href);
  await page.waitForTimeout(1200);
  const charts = [];
  for (let screen = 1; screen <= 4; screen++) {
    await page.keyboard.press(String(screen));
    await page.waitForTimeout(1200);
    charts.push(await page.locator('app-chart svg.apexcharts-svg').count());
  }
  const lang = await page.evaluate(() => document.documentElement.lang);
  const ok = charts.every((n, i) => n >= expected[i]) && !errors.length && [...requests].every((h) => /fonts\.(googleapis|gstatic)\.com$/.test(h));
  failed ||= !ok;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${file} (lang ${lang}): charts per screen ${charts.join(' ')} (expected at least ${expected.join(' ')}); errors: ${errors.join(' | ') || 'none'}; other hosts: ${[...requests].join(', ') || 'none'}`);
  await context.close();
}
await browser.close();
process.exit(failed ? 1 : 0);
