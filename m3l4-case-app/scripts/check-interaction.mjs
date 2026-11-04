// Drives the page the way Bobby will: clicker keys, stepper clicks, the case overlay, a refresh and
// the reset. Prints one line per check and exits 1 if any fails. Needs the server on :4400.
import { chromium } from 'playwright-core';

const base = process.env.URL ?? 'http://localhost:4400/';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await (await browser.newContext({ viewport: { width: 1920, height: 1080 } })).newPage();
const pageErrors = [];
page.on('pageerror', (e) => pageErrors.push(e.message));
// Printed as they happen, so an error sits next to the check that caused it.
page.on('console', (m) => {
  if (m.type() !== 'error') return;
  pageErrors.push(m.text());
  console.log(`  !! console error: ${m.text().split('\n')[0].slice(0, 100)}`);
});
let failed = 0;
const check = (name, ok, detail = '') => {
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`);
};
// The page renders zoneless, a frame after the event: give it a moment before reading.
const settle = () => page.waitForTimeout(150);
const scene = async () => (await settle(), page.locator('.kicker-n').textContent());
const saved = () => page.evaluate(() => JSON.parse(localStorage.getItem('m3l4-case-app/v1') ?? '{}'));

await page.goto(base, { waitUntil: 'networkidle' });
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: 'networkidle' });
check('opens on the case tab', (await page.locator('main').getAttribute('class')).includes('page--case'));

await page.keyboard.press('ArrowRight');
await settle();
check('Right on the case tab opens the ops view', (await scene())?.includes('Scene 1 of 7'), await scene());

await page.keyboard.press('ArrowRight');
await settle();
await page.keyboard.press('PageDown');
await settle();
check('Right and Page Down move forward', (await scene())?.includes('Scene 3 of 7'), await scene());

await page.keyboard.press('PageUp');
await settle();
check('Page Up moves back', (await scene())?.includes('Scene 2 of 7'), await scene());

for (let i = 0; i < 9; i++) await page.keyboard.press('ArrowRight');
await settle();
check('stops at scene 7', (await scene())?.includes('Scene 7 of 7'), await scene());

await page.locator('igx-step').nth(4).locator('.igx-step__header').click();
check('clicking a step goes to it', (await scene())?.includes('Scene 5 of 7'), await scene());

await page.keyboard.press('ArrowRight');
await settle();
check('clicker still works after a step click', (await scene())?.includes('Scene 6 of 7'), await scene());

await page.keyboard.press('ArrowLeft');
await settle();
await page.keyboard.press('r');
await settle();
await page.keyboard.press('r');
await settle();
check('R reveals on scene 5', (await saved()).revealIndex === 2, `revealIndex ${(await saved()).revealIndex}`);

await page.keyboard.press('ArrowLeft');
await settle();
await page.keyboard.press('r');
await settle();
check('R does nothing on scene 4', (await saved()).revealIndex === 2);

await page.getByRole('button', { name: 'The case, over this scene' }).click();
await page.waitForTimeout(300);
check('overlay opens', await page.locator('.case-dialog-body app-case-view').isVisible());
await page.keyboard.press('ArrowRight');
await settle();
check('keys do nothing while the overlay is open', (await saved()).scene === 3);
await page.keyboard.press('Escape');
await settle();
await page.waitForTimeout(400);
check('Escape closes the overlay', !(await page.locator('.case-dialog-body app-case-view').isVisible()));
check('overlay keeps the scene', (await scene())?.includes('Scene 4 of 7'), await scene());

await page.reload({ waitUntil: 'networkidle' });
check('a refresh keeps the tab and scene', (await scene())?.includes('Scene 4 of 7'), await scene());

await page.getByRole('button', { name: 'The case, over this scene' }).click();
await page.waitForTimeout(300);
await page.locator('.case-dialog').getByRole('button', { name: 'Reset…' }).click();
await page.waitForTimeout(300);
await page.getByRole('button', { name: 'Reset', exact: true }).click();
await page.waitForTimeout(400);
const after = await saved();
check(
  'Reset clears and returns to the case tab',
  after.tab === 'case' && after.scene === 0 && after.revealIndex === 0,
  JSON.stringify(after),
);

// ---------------------------------------------------------------- scene 3: one alert, two readings
const gridRows = () =>
  page.evaluate(() => {
    const grid = document.querySelector('app-scene-pager igx-grid-lite');
    return JSON.parse(JSON.stringify(grid?.data ?? grid?.['_data'] ?? []));
  });
await page.keyboard.press('ArrowRight');
await settle();
await page.keyboard.press('ArrowRight');
await page.keyboard.press('ArrowRight');
await settle();
check('scene 3 shows the Pager', await page.locator('app-scene-pager').isVisible(), await scene());
const before = await gridRows();
const printerBefore = before.find((r) => r.id === 'INC-4127');
check('the printer alert starts low, to desktop support', printerBefore?.urgency === 'low' && printerBefore?.routedTo === 'Desktop support queue', JSON.stringify(printerBefore));
await page.getByRole('button', { name: 'Read as a finding' }).click();
await settle();
const after2 = await gridRows();
const printerAfter = after2.find((r) => r.id === 'INC-4127');
check('read as a finding: high, to payments on-call, paging', printerAfter?.urgency === 'high' && printerAfter?.routedTo === 'Payments on-call' && printerAfter?.status === 'Paging', JSON.stringify(printerAfter));
const others = (rows) => JSON.stringify(rows.filter((r) => r.id !== 'INC-4127'));
check('no other alert changes', others(before) === others(after2));
check('the page card appears', await page.getByText('Page sent: Payments on-call').isVisible());
await page.getByRole('button', { name: 'Read as a device fault' }).click();
await settle();
check('back to the device reading', (await gridRows()).find((r) => r.id === 'INC-4127')?.urgency === 'low');

// ---------------------------------------------------------------- scene 4: nothing from the reveal
await page.keyboard.press('ArrowRight');
await settle();
await page.keyboard.press('r');
await settle();
check(
  'scene 4 has no reveal content, and R does nothing there',
  (await page.locator('app-scene-reveals').count()) === 0 && (await saved()).revealIndex === 0,
);

// ---------------------------------------------------------------- scene 4: votes
await page.getByRole('button', { name: '+1 vote for C' }).click();
await page.getByRole('button', { name: '+1 vote for C' }).click();
await page.getByRole('button', { name: '+1 vote for A' }).click();
await page.getByRole('button', { name: '−1 vote for C' }).click();
await settle();
check('+1 and −1 count votes', JSON.stringify((await saved()).votes) === JSON.stringify({ A: 1, B: 0, C: 1, D: 0 }), JSON.stringify((await saved()).votes));
await page.reload({ waitUntil: 'networkidle' });
await settle();
check('votes survive a refresh', (await page.getByText('1 vote').count()) === 2 && (await scene())?.includes('Scene 4 of 7'));

// ---------------------------------------------------------------- scene 5: A, B, D, C one at a time
await page.keyboard.press('ArrowRight');
await settle();
const visible = () =>
  page.evaluate(() => [
    ...[...document.querySelectorAll('app-scene-reveals igc-tile [slot="title"]')].map((t) => t.textContent.trim()[0]),
    ...(document.querySelector('app-scene-reveals igx-banner') ? ['B'] : []),
  ].sort().join(''));
check('scene 5 starts empty', (await visible()) === '');
const expected = ['A', 'AB', 'ABD', 'ABCD'];
for (const want of expected) {
  await page.keyboard.press('r');
  await page.waitForTimeout(400);
  const got = await visible();
  check(`R adds the next proposal (${want})`, got === want, got);
}
await page.keyboard.press('r');
await page.waitForTimeout(300);
check('a fifth R does nothing', (await visible()) === 'ABCD');
const charts = await page.locator('app-scene-reveals apx-chart svg').count();
check('both charts drew', charts >= 2, `${charts} svg`);

// ---------------------------------------------------------------- every scene draws its screen
const expectedScreens = ['app-scene-overview', 'app-scene-controls', 'app-scene-pager', 'app-scene-decision', 'app-scene-reveals', 'app-scene-afterwards', 'app-scene-lesson'];
for (let i = 0; i < 7; i++) await page.keyboard.press('ArrowLeft');
await settle();
for (const [i, sel] of expectedScreens.entries()) {
  const drawn = await page.locator(sel).count();
  const svgs = await page.locator(`${sel} apx-chart svg`).count();
  check(`scene ${i + 1} shows ${sel}`, drawn === 1, `${svgs} chart svg`);
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(400);
}
// ---------------------------------------------------------------- the overlay from every scene
for (let i = 0; i < 7; i++) await page.keyboard.press('ArrowLeft');
await settle();
const overlayOk = [];
for (let n = 1; n <= 7; n++) {
  await page.getByRole('button', { name: 'The case, over this scene' }).click();
  await page.waitForTimeout(300);
  const opened = await page.locator('.case-dialog-body app-decision-block').isVisible();
  await page.keyboard.press('Escape');
  await page.waitForTimeout(350);
  const closed = !(await page.locator('.case-dialog-body app-case-view').isVisible());
  const kept = (await scene())?.includes(`Scene ${n} of 7`);
  if (opened && closed && kept) overlayOk.push(n);
  await page.keyboard.press('ArrowRight');
  await settle();
}
check('the overlay opens, closes on Esc and keeps the scene, from all seven scenes', overlayOk.length === 7, `ok on ${overlayOk.join(', ')}`);

check('no console errors', pageErrors.length === 0, pageErrors.join(' | '));

await browser.close();
process.exit(failed ? 1 : 0);
