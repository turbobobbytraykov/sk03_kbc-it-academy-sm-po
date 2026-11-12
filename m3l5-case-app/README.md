# M3 L5 case app: payment-outage simulation

The facilitator screen for the incident simulation in Module 3 Lesson 5. Angular 22, Ignite UI for
Angular 22.2 and ApexCharts. The brief is in [CLAUDE.md](CLAUDE.md).

## Run it

```bash
npm install
npm run present      # build, then serve it on http://localhost:4300/ (Ctrl+C to stop)
npm start            # development server with live reload, http://localhost:4200/
npm run build        # dist/m3l5-case-app/browser/ (relative paths, Bulgarian at bg/) + dist/m3l5-case-app/single/
npm run serve:dist   # serve the last build without rebuilding
```

**Ways to open it in the room, best first:**

1. The published URL (GitHub Pages, once enabled).
2. `npm run present` and http://localhost:4300/.
3. Emergency only: double-click `dist/m3l5-case-app/single/m3l5-case-app.html` (Bulgarian:
   `m3l5-case-app-bg.html`). It is one self-contained file that runs from `file://` with no network,
   shown in system fonts.

## Screen sizes

The page is drawn in rem, and the root size follows the window's width and height. It is designed at
1920x1080, where the root is 21px and no text is under 18px, and it keeps the same proportions in any
other 16:9 window. Checked with nothing scrolling or clipped at 1920x1080, 1920x950 (a browser window with
its tabs showing), 1536x864 (a 1080p laptop at 125% display scaling) and 1280x720 (150% scaling).

In a smaller window the text is smaller in CSS pixels: 12px at 1280x720. Projected, that is the same size
on the wall as 18px at 1080p, because the whole window fills the same screen. Until 12 Nov 2026 the root
had a fixed 18px floor, and in a 1280x720 window the case page scrolled and the moment card was cut off.

## Charts and the log grid

Added 12 Nov 2026, after a UI review.

- **ApexCharts** (`apexcharts` 8.7.0, `ng-apexcharts` 3.2.0; no Premium add-on is imported) draws four
  static charts, all configured in `src/app/charts.ts`:
  - the failure rate at each moment so far, in the Failing tile on the action screen. Moments that have
    not arrived stay empty, so nothing is given away;
  - "Who decided, and when" under the log: one lane per role across the 25 minutes, one mark per decision,
    a circle for authorised and a square for not authorised, with each moment's arrival marked;
  - "Decisions per moment" under the log;
  - the tally as a bar in reveal point 2.

  Not authorised is hatched as well as red, so the pair reads without colour. Every config passes the
  ApexCharts MCP server's `apexcharts_validate_config` (`node scripts/validate-charts.mjs`, answers in
  `mcp-log/validate-*.md`).
- **Grid Lite** (`igx-grid-lite`, with the `igniteui-grid-lite` package, both MIT) holds the log, and
  scrolls inside itself when the log is long. Its theme was generated with the theming MCP server
  (`mcp-log/theme-log-grid.md`). Two things about it are worked around here:
  - it hard-codes header and cell text at 0.75rem and 0.8125rem, so the grid is zoomed by 1.2;
  - it declares no grid, row or cell roles, which axe reports as two critical violations.
    `src/app/grid-lite-roles.ts` sets them. Remove it when the library does.

## Checks

```bash
node scripts/shoot.mjs               # every screen and state in Edge: screenshots, layout, text size, axe, watermark, console
node scripts/check-single-file.mjs   # both single-file builds from file://: charts drawn, no errors, no fetches
node scripts/validate-charts.mjs     # every chart config through the ApexCharts MCP validator
```

The first needs the server on :4300 (`npm run serve:dist`); the first two use the installed Microsoft
Edge through `playwright-core`, so nothing is downloaded. `shoot.mjs` takes `URL=http://localhost:4300/bg/`
for Bulgarian, `SIZE=1280x720` for another window, `ONLY=log,overlay` for some screens and `OUT=` for
the folder (default `screenshots/`, which is not committed).

On 12 Nov 2026 all 14 screens and states passed in English and Bulgarian at 1920x1080, and at 1280x720,
1536x864 and 1920x950: nothing scrolls, nothing is clipped, no text under the floor, no axe violation, no
trial watermark, no console error, and the only host contacted is Google Fonts.

## Bulgarian

The same app in Bulgarian is at `/bg/`: http://localhost:4300/bg/, or `bg/` under the published URL.
The **БГ** / **EN** button at the right of the top bar switches language. The session is shared between
the two, so switching mid-simulation keeps the clock position, the log and the screen (the clock comes
back paused, as after any refresh). Decisions typed in either language stay as typed.

- `src/app/case-data.ts` stays the approved English source. `case-data.bg.ts` holds the translation only;
  moment timings, story times and failure rates always come from the English.
- Interface text for both languages is in `src/app/i18n.ts`.
- The build writes `bg/index.html`: the same bundle with `<html lang="bg">` and `<base href="../">`.
  With `npm start`, use http://localhost:4200/?lang=bg instead.
- Layout differences for the longer Bulgarian text are scoped to `html[lang='bg']`, so the English
  screens are unchanged.
- `lang="bg"` makes Montserrat use its Bulgarian letterforms (в, к, т and others). That is intended:
  Bobby chose to keep them (4 Nov 2026). Do not turn off the font's `locl` feature.

## Facilitating

- **Space** pauses and resumes the clock from any screen, and **1** to **4** switch screens (not while
  typing or with a dialog open). The Start button shows the key.
- **The case** (top right, with the layers icon) opens the premise, goal and roles over whatever is on screen. The clock keeps
  running. Close with Esc, a click outside, or the button.
- **Hold next moment** stops the next moment arriving; the clock keeps running. **Advance now** pulls
  the next moment in immediately, and can be undone for 12 seconds. A newly arrived moment is flagged
  "Just arrived" and its card glows briefly, so the room looks up.
- Log a decision: type, click the role, press **Authorised** or **Not authorised**. While a role is
  picked, what it may and may not do shows beside the role buttons, so the verdict can be judged without
  opening the case. The confirmation appears in the same place, with **Undo** for 12 seconds; it covers
  nothing. Clicking a role first moves the cursor to the text field.
- The Log screen has **Correct** (a dialog with the text, the role and the verdict) and **Delete** for
  every entry. The clock and story time of an entry are never edited.
- **Reveal**: right arrow / Page Down shows the next point (a presenter clicker works), left goes back.
  Points still to come show as numbered outlines, so the room sees how many there are.
- Everything is saved in the browser. A refresh restores the session paused.
- **Reset clock…** (under the story time) and **Reset…** (on The case screen) open the same choice:
  **Reset the clock** goes back to 25:00 and Moment 1 and keeps the log; **Reset everything** also
  deletes the log, for use between groups.

Story time runs between the moments' story times as the clock moves (02:40 → 03:20 → 05:15 → 07:50)
and stays at 07:50 after Moment 4. Severity and classification are what the room decides, so the
facilitator sets them; classifying shows when the four-hour reporting clock runs out.

## Theme

`src/styles.scss` was generated with the `igniteui-theming` MCP server (configured in `.mcp.json`):
`create_custom_palette` for the deck palette, `create_typography`, and `create_component_theme` for every
component override. Primary is NAVY with explicit shades (50 = PALE, 400 = MID, 500 = NAVY), because
NAVY is too dark for Ignite to derive light tints from. Component styles use palette tokens only, through
the `--app-*` aliases. Theme variants are classes: `btn-accent`, `btn-danger`, `btn-held`,
`btn-on-dark`, `btn-quiet`, `card-light`, `card-pale`, `card-dark`, plus `role-picker` for the role
buttons and `log-grid` for the log. MID on white or PALE is under AA contrast for small text, so small
headings use `--app-mid-text` (one step darker) and running text uses NAVY.

## Publishing to GitHub Pages

The build uses `--base-href ./`, so `dist/m3l5-case-app/browser/` can be copied to any folder of the
course repo and served as is. Enabling Pages is a repo setting: Bobby's call.

## Licence

`igniteui-angular` is dual-licensed (see `node_modules/igniteui-angular/LICENSE`): MIT for a listed
set of components, the Infragistics commercial licence for the rest, grids among them. Every
component this app uses is on the MIT list: navbar, button group, button, card, chip, circular and
linear progress, dialog, input group, switch, icon, and `igx-grid-lite`. Do not add `igx-grid` and its
relatives without a licence. `shoot.mjs` looks for the trial watermark that marks a commercial component.

`apexcharts` and `ng-apexcharts` are dual-licensed (`node_modules/apexcharts/LICENSE.md`): the free
Community licence covers organisations under USD 2 million a year, counting parents and affiliates, and
above that a paid per-developer licence applies. Which entity is the licensee is Bobby's call, the same
open question as in the M3 L4 app. The charts here are static (no toolbar, zoom, tooltip or legend
toggling), and no Premium add-on is imported.
