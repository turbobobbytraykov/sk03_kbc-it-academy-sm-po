// Opens dist/m3l4-case-app/single/m3l4-case-app.html straight from disk (file://), walks all seven
// scenes with every proposal revealed on scene 5, and reports charts drawn, console errors and any
// request that is not to the file itself. Run after `npm run build`.
import { chromium } from 'playwright-core';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const file = join(import.meta.dirname, '..', 'dist', 'm3l4-case-app', 'single', 'm3l4-case-app.html');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await (await browser.newContext({ viewport: { width: 1920, height: 1080 } })).newPage();
const errors = [];
const requests = new Set();
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => m.type() === 'error' && errors.push(m.text().slice(0, 140)));
page.on('request', (r) => !/^(file|data):/.test(r.url()) && requests.add(new URL(r.url()).hostname));

await page.goto(pathToFileURL(file).href);
await page.waitForTimeout(1000);
await page.keyboard.press('ArrowRight');
const charts = [];
for (let n = 1; n <= 7; n++) {
  await page.waitForTimeout(600);
  if (n === 5) {
    for (let r = 0; r < 4; r++) await page.keyboard.press('r');
    await page.waitForTimeout(700);
  }
  charts.push(await page.locator('section.scene apx-chart svg.apexcharts-svg').count());
  await page.keyboard.press('ArrowRight');
}
await browser.close();

const expected = [4, 1, 0, 0, 2, 2, 1];
const ok = errors.length === 0 && expected.every((e, i) => charts[i] >= e);
console.log(`charts per scene: ${charts.join(' ')} (expected at least ${expected.join(' ')})`);
console.log(`console errors: ${errors.length ? errors.join(' | ') : 'none'}`);
console.log(`requests other than the file: ${[...requests].join(', ') || 'none'} (Google Fonts only; offline they fail and system fonts are used)`);
process.exit(ok ? 0 : 1);
