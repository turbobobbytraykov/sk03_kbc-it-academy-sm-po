# M3 L5 case app: payment-outage simulation

The facilitator screen for the incident simulation in Module 3 Lesson 5. Angular 22 and Ignite UI
for Angular 22.2. The brief is in [CLAUDE.md](CLAUDE.md).

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

## Charts and the log grid (12 Nov 2026)

- **ApexCharts** (`apexcharts` 8.7.0, `ng-apexcharts` 3.2.0, Community licence, no Premium add-on) draws four
  static charts, all configured in `src/app/charts.ts`: the failure-rate trend on the action screen, "Who
  decided, and when" and "Decisions per moment" under the log, and the tally bar in reveal point 2.
- **Grid Lite** (`igx-grid-lite`, MIT, with the `igniteui-grid-lite` package) holds the log. **Correct** opens
  an `igx-dialog`. The grid theme was generated with the theming MCP server (`mcp-log/theme-log-grid.md`).
- On the action screen, picking a role shows what it may and may not do beside the role buttons.
- **1** to **4** switch screens; **Space** still starts and pauses the clock.
- `node scripts/shoot.mjs` screenshots every screen and state in Edge and prints layout checks
  (`URL=http://localhost:4300/bg/` for Bulgarian). Needs `npm run serve:dist`.
- Not done yet: `apexcharts_validate_config` on the four chart configs, and an axe run.
- Known in Bulgarian after these changes (no screen scrolls, but three things are clipped): the severity
  field's label is cut short, the permissions line beside the role buttons ends in an ellipsis, and the
  edit dialog is wider than a 1920px screen. English has none of these.

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

- **Space** pauses and resumes the clock from any screen (not while typing).
- **The case** (top right) opens the premise, goal and roles over whatever is on screen. The clock keeps
  running. Close with Esc, a click outside, or the button.
- **Hold next moment** stops the next moment arriving; the clock keeps running. **Advance now** pulls
  the next moment in immediately, and can be undone for 12 seconds. A newly arrived moment is flagged
  "Just arrived" and its card glows briefly, so the room looks up.
- Log a decision: type, click the role, press **Authorised** or **Not authorised**. The confirmation
  appears inline beside the roles, with **Undo** for 12 seconds; it covers nothing. The Log screen has
  **Correct** and **Delete** for every entry.
- **Reveal**: right arrow / Page Down shows the next point (a presenter clicker works), left goes back.
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
buttons on the action screen.

## Publishing to GitHub Pages

The build uses `--base-href ./`, so `dist/m3l5-case-app/browser/` can be copied to any folder of the
course repo and served as is. Enabling Pages is a repo setting: Bobby's call.

## Licence

`igniteui-angular` is dual-licensed (see `node_modules/igniteui-angular/LICENSE`): MIT for a listed
set of components, the Infragistics commercial licence for the rest, grids among them. Every
component this app uses is on the MIT list: navbar, button group, button, card, chip, circular and
linear progress, dialog, input group, select, switch, icon. Do not add `igx-grid` and its
relatives without a licence; `igx-grid-lite` is MIT.
