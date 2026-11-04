# M3 L4 case app: Missed Signals, the ops view

The page Bobby screen-shares while running the Bangladesh Bank case in Module 3 Lesson 4. Angular 22,
Ignite UI for Angular 22.2, ApexCharts. The brief is [CLAUDE.md](CLAUDE.md); which MCP tool built what is in
[BUILD-NOTES.md](BUILD-NOTES.md); the check against the brief's "done" list is [VERIFICATION.md](VERIFICATION.md).

## Run it

```bash
npm install
npm run present      # build, then serve on http://localhost:4400/ (Ctrl+C to stop)
npm start            # development server with live reload, http://localhost:4200/
npm run build        # dist/m3l4-case-app/browser/ (relative paths) + dist/m3l4-case-app/single/
```

Emergency only: double-click `dist/m3l4-case-app/single/m3l4-case-app.html` (Bulgarian:
`m3l4-case-app-bg.html`). It runs from `file://` with no network, in system fonts.

## Bulgarian

The same page in Bulgarian is at `/bg/`: http://localhost:4400/bg/, or `bg/` under the published URL. The
**БГ** / **EN** button at the right of the top bar switches language. The saved state is shared, so
switching keeps the tab, the scene, the votes, the reveals and the scene 3 reading.

- `case.en.ts` and `case-facts.en.ts` are the deck's wording and the FACTS.md record, and the source of every
  id, number, day and source string. `case.bg.ts` and `case-facts.bg.ts` hold only the Bulgarian text;
  `case.ts` and `case-facts.ts` pick the language, so components import them as before.
- Interface text for both languages is in `src/app/i18n.ts`. Invented telemetry and chart labels sit as
  `tr('English', 'Български')` pairs in `ops-data.ts`, `charts.ts` and `scene-controls.ts`. Source strings
  stay in English, as published.
- The build writes `bg/index.html`: the same bundle with `<html lang="bg">` and `<base href="../">`. With
  `npm start`, use http://localhost:4200/?lang=bg instead.
- Layout differences for the longer Bulgarian text are scoped to `html[lang='bg']`, so the English screens are
  unchanged. Where Bulgarian would not fit, the label is shorter rather than the layout smaller: step
  titles, the scene 3 toggle and on-call rows, and proposal C's name as the scene 2 and 7 panel title.
- `lang="bg"` makes Montserrat use its Bulgarian letterforms, as in the M3 L5 app (Bobby's choice, 4 Nov 2026).
- `check-text-size.mjs` takes `URL=http://localhost:4400/bg/`. `check-interaction.mjs` asserts English text,
  and `shoot.mjs` opens the overlay by its English button name, so both run against the English page only.
  The Bulgarian page was checked on 4 Nov 2026 with a copy of each pointed at `/bg/`: every scene and the
  overlay fit at 1920x1080 with nothing scrolling, text size passes, and axe reports only what English does.

**Screen.** Share a 1920x1080 screen with the browser full screen (F11). Every scene fits there with nothing
scrolling, and the same layout stays legible for viewers watching the share in a 1280x720 window. A normal
browser window with tabs (about 1920x950) also fits; the page shrinks a little to make room. At 125% display
scaling (1536x864) every scene fits; the case tab and its overlay scroll by a few lines. In a 1280x720 window
the scenes scroll: the 18px text floor does not leave room for the whole layout there.

## Presenting

- **The case** tab: premise, what will play out, the decision and how to read the ops screens.
- **The ops view** tab: seven scenes, one per case slide. **Right** / **Page Down** next, **Left** /
  **Page Up** back, so a presenter clicker works. **R** reveals the next item where a scene has reveals.
  From the case tab, the first Right opens the ops view at the scene you left.
- **Scene 3**: **Read as a device fault / Read as a finding** re-routes the printer alert, INC-4127, and nothing
  else.
- **Scene 4**: **+1** on a proposal as each breakout room names its pick in the chat; **−1** corrects a slip.
  The counts stay until Reset.
- **Scene 5**: **R** (or **Add the next proposal**) adds A, B, D, C in the deck's order; **Remove the last**
  steps back. Nothing from it shows on scene 4.
- **The case** button (top right, on every scene) opens the case over the scene. Esc or a click outside closes
  it, and the scene stays where it was.
- **Reset…** (top right on the case tab, and in the overlay) clears votes, reveals and the scene 3 reading,
  and goes back to scene 1. Use it between the two groups.
- Everything is saved in the browser, so a refresh keeps the place.

## Checks

```bash
node scripts/shoot.mjs               # screenshots: 1920x1080, a 1280x720 window, the 1280x720 share; axe, watermark, network
node scripts/check-interaction.mjs   # keys, stepper, R, overlay from every scene, refresh, reset, toggle, votes, reveals
node scripts/check-keyboard.mjs      # tab order and a visible focus ring on every stop
node scripts/check-text-size.mjs     # no text under 18px, no chart text under 16px, at 1920x1080
node scripts/check-single-file.mjs   # the single-file build from file://, every scene
node scripts/validate-charts.mjs     # every chart config through the ApexCharts MCP validator
```

All but the last need the server on :4400 (`npm run serve:dist`) and use the installed Microsoft Edge
through `playwright-core`; nothing is downloaded. `SIZES=1920x950,1536x864 node scripts/shoot.mjs` adds the
browser-window and 125%-scaling sizes.

## Tuning the invented telemetry

The parameters are at the top of `src/app/ops-data.ts`: the ordinary message rate, its noise, how the 35
instructions spread over the Thursday evening (the total must stay 35), `BAND_WIDTH`, the width of proposal
D's band of normal, which is the number worth arguing about in the room, and `ALERT_AFTER_MINUTES`, the wait
in proposal C's alert rule. Rebuild after changing them, then run `node scripts/validate-charts.mjs`.
