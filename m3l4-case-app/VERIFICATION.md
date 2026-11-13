# Verification against CLAUDE.md section 11

Checked 2 Nov 2026 and again on 13 Nov 2026 (after Round 2, with `igniteui-angular` 22.2.6) against the production
build (`npm run build`), served on :4400, in Microsoft Edge driven by `playwright-core`. Item 10 and "What is not
perfect" below carry the 13 Nov wording. Every line below names the script that checks it, so it can be re-run before the
lesson. Screenshots are in `screenshots/`; the MCP calls behind each screen are in `mcp-log/` and
[BUILD-NOTES.md](BUILD-NOTES.md).

| # | Done looks like | Result | Evidence |
|---|---|---|---|
| 1 | Tab 1 readable without scrolling at 1920×1080; overlay opens and closes from every scene and keeps the scene | **Yes** | `shoot.mjs`: case 1920×1080, no overflow. `check-interaction.mjs`: overlay opened, closed on Esc and kept the scene on all seven scenes |
| 2 | Seven scenes, each showing its deck kicker; clicker keys work | **Yes** | The stepper and the tool bar show the kicker. Right, Left, Page Down, Page Up, a click on a step, and the clicker after a click: all pass |
| 3 | Scene 4 cannot reach reveal content; scene 5 reveals A, B, D, C one at a time | **Yes** | Scene 4 renders no reveal component and ignores R. On scene 5 four presses of R gave A, AB, ABD, ABCD; a fifth did nothing |
| 4 | Fault/finding toggle re-routes the same alert in scene 3 | **Yes** | INC-4127 goes from low / Desktop support queue / Queued to high / Payments on-call / Paging, a page card appears, and no other row changes |
| 5 | Honesty banner on every ops scene; every real figure shows its source; every invented one says "Illustrative" | **Yes** | The banner is part of the ops view itself, above every scene, and cannot be closed. Real facts come only from `case-facts.ts` and show a Source line or a numbered source key. Invented panels, rows, cards and charts carry an Illustrative tag |
| 6 | No real event placed below day level; no causal claim; no product names or logos in the UI chrome | **Yes** | The printer row reads "Fri 5 Feb, morning"; the timeline is by day, and the Sri Lankan halt says "Not dated in the sources". Chart hours are invented and say so; the 35 is real and sourced. No wording links the printer to the loss. The tools are "Panels" and "Pager"; Grafana and PagerDuty appear once, in text, on Tab 1 |
| 7 | Every chart config passed `apexcharts_validate_config`; no Premium ApexCharts import | **Yes** | `validate-charts.mjs`: 10 of 10 ok, no errors, no warnings. The source imports nothing from `apexcharts` itself; ng-apexcharts loads the default (Tier 1) bundle, and line, column, bar, rangeArea and heatmap are all Tier 1 |
| 8 | Only allow-listed Ignite UI components; no trial watermark in any screenshot | **Yes** | Entry points used: avatar, badge, banner, button-group, card, chips, dialog, directives (button, tooltip), grids/lite, icon, input-group, list, navbar, stepper; `igc-tile-manager` from igniteui-webcomponents. `shoot.mjs` found no watermark element on any of 45 screens |
| 9 | No runtime network calls other than Google Fonts | **Yes** | `shoot.mjs` and `check-single-file.mjs`: the only host contacted is `fonts.gstatic.com`. The Google Fonts stylesheet itself is inlined by the build |
| 10 | Legible at 1280×720; nothing relies on colour alone; axe passes | **Yes** (corrected 13 Nov 2026; first written "Mostly") | The 1920×1080 screen seen in a 1280×720 share window: all 15 screens fit, nothing scrolls. `check-text-size.mjs`: no text under 18px, no chart text under 16px. Status is always icon plus word; the calendar cells are labelled; "confirmed" is dashed; the band is shaded. Axe: nothing, once the two known false positives are excluded (`shoot.mjs`, only rules aria-required-parent and aria-required-children, only on `igc-virtual-scroll` inside `igx-grid-lite`). Those two come from axe-core being unable to read the `ElementInternals` Grid Lite builds its ARIA grid with. `check-a11y-tree.mjs` reads the browser's accessibility tree: one named grid with rows, column headers and grid cells on scene 3 and on scene 5 after a reveal |
| 11 | `BUILD-NOTES.md` lists the MCP tool behind each screen | **Yes** | One table per phase |
| 12 | ApexCharts licence question settled by Bobby | **Yes** | 1 Nov 2026: Skillo Academy is the licensee, under the USD 2m Community threshold. The charts are also static, which `LICENSE.md` says needs no OEM licence |

## What is not perfect

- **Axe and Grid Lite.** axe-core reports two rules (`aria-required-children`, `aria-required-parent`) on the
  `igc-virtual-scroll` inside `igniteui-grid-lite` 0.11.0, on scene 3 and scene 5's approvals queue. They are false
  positives, not a library defect: Grid Lite exposes its grid, rows, column headers and cells through
  `ElementInternals`, which axe cannot read, and the browser's accessibility tree shows them
  (`check-a11y-tree.mjs`). Round 1 wrongly recorded this as a defect of the library. The shoot script ignores exactly
  these two findings on exactly that element and fails on anything else.
- **A 1280×720 browser window**, as opposed to a 1280×720 view of the share, scrolls on most scenes: with an
  18px text floor the 1920 layout cannot fit there. It stays legible and nothing is clipped. A browser
  window with tabs on a 1920×1080 screen (about 1920×950) fits on every screen. At 125% scaling
  (1536×864), every scene fits and the case tab and its overlay scroll by a few lines.
- **Grid Lite text** reaches the 18px floor only through `zoom: 1.15`, because the library hard-codes its sizes
  where the page cannot style them.

## Decisions taken on Bobby's behalf, all reversible

- **Clocks show days, not times**, so no real event is placed by the hour.
- **Manila's Saturday and Sunday read "Not in sources"**: `FACTS.md` names only Monday 8 February.
- **The day each scene's clocks show**: Thu 4 Feb for scenes 1–2; Fri 5 Feb for scenes 3, 4, 5 and 7; Mon 8 Feb
  for scene 6.
- **Invented roles**: Desktop support, Infrastructure on-call, Payments on-call; owner "Head of payment
  operations"; approvers "Supervisor" and "Treasury head".
- **The deck's fourth "afterwards" bullet**, the payments network's security programme, is left off: it is not
  in `FACTS.md` (section 12, item 4 default).
- **English and Bulgarian** (`/bg/`, added 4 Nov 2026); every interface string is in `src/app/i18n.ts`.
- **Not done, by the brief's rules**: no hosting set up and no git operations. `npm run present` is the default.
