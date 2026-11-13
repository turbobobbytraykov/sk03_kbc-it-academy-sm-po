# Build notes: which MCP tool is behind each screen

The three MCP servers in [.mcp.json](.mcp.json) built this page: `igniteui-cli` for every Ignite UI control,
`igniteui-theming` for the theme, and `apexcharts` for every chart. Each call's arguments and full answer are
saved in [mcp-log/](mcp-log/), so any line below can be checked against what the server actually said.

**How the servers were called.** Round 1 (1-4 Nov 2026): An editor loads `.mcp.json` when a session starts. This
project was set up in the same session that built it, so the servers were called over stdio with
[scripts/mcp-call.mjs](scripts/mcp-call.mjs), which reads the same `.mcp.json`. It is the same protocol and
the same answers. Round 2 (13 Nov 2026) called all three servers as native tools of the session; see
[Round 2](#round-2-13-nov-2026) below and [mcp-log/NATIVE-MCP-NOTES.md](mcp-log/NATIVE-MCP-NOTES.md):

```bash
node scripts/mcp-call.mjs apexcharts list
node scripts/mcp-call.mjs igniteui-theming create_custom_palette @mcp-log/args/theme-ops-dark-palette.json --log theme-02-ops-dark-palette
```

## Phase 1: the shell (1 Nov 2026)

| Screen or part | MCP tool | What it produced or checked |
|---|---|---|
| Whole page, theme | `igniteui-theming` `detect_platform` | Reported Angular and Web Components both present (igniteui-webcomponents is there for the tile manager), so every later call names `platform: angular` |
| Whole page, light theme (Tab 1, overlay) | `igniteui-theming` `create_custom_palette`, `create_component_theme` | Copied from the M3 L5 app's `styles.scss`, which the server generated: NAVY primary with explicit shades, buttons, cards, button group |
| Ops view, dark theme | `igniteui-theming` `create_custom_palette` (variant dark) | `$ops-dark-palette`: NAVY surfaces (500 = #002033, 900 = #001724), BLUE primary, MID secondary, inverted gray. No validation warnings. Scoped to `.ops` |
| Typography | `igniteui-theming` `create_typography` | Roboto on the Material type scale |
| Tab 1, timeline and scene lists | `igniteui-cli` `get_doc` list; `igniteui-theming` `create_component_theme` list | `igx-list` with thumbnail, title and subtitle lines; `.list-on-pale` so the lists sit on the PALE card |
| Ops view, scene stepper | `igniteui-cli` `get_doc` stepper, `get_api_reference` IgxStepperComponent; `igniteui-theming` `get_component_design_tokens`, `create_component_theme` stepper (dark) | Non-linear horizontal stepper, titles beside the numbers. The API reference showed `activeStepChanging`, used because `activeStepChanged` waits for the step animation |
| Ops view, honesty banner | `igniteui-cli` `get_doc` banner, `get_api_reference` IgxBannerComponent; `igniteui-theming` `create_component_theme` banner (dark) | The doc showed that `igx-banner-actions` replaces the default Dismiss button; the API showed `expanded` and a cancelable `closing`. Both are used, so the banner cannot be closed |
| Ops view, panels | `igniteui-theming` `create_component_theme` card (dark) | `.ops-panel` card theme, ready for Phase 2 |
| Ops view, world clocks | `igniteui-theming` `get_component_design_tokens` chip, `create_component_theme` chip (dark) ×2; `igniteui-cli` `get_api_reference` IgxChipComponent | `variant="success"` for Open, `.chip-closed` and `.chip-nodata` themes for Closed and Not in sources. Each chip sits in an `igx-chips-area`, the listbox an option chip needs (axe flagged it without one) |
| Every Ignite import | `igniteui-cli` `resolve_import` | The entry points for stepper, banner, chips, card, dialog, button group, navbar, list, icon, button and tooltip |

Status colours were checked for contrast on the dark surface #002033 before they went into the palette:
success #4EB862 6.7:1, warn #E8A317 7.7:1, error #F0656B 5.4:1, gray-700 #9DAFBD 7.4:1.

## Phase 2: scenes 3 and 5 (1 Nov 2026)

| Screen or part | MCP tool | What it produced or checked |
|---|---|---|
| Scene 3, incident list; scene 5, approvals queue (A) | `igniteui-cli` `list_components`, `get_doc` grid-lite-overview and grid-lite-cell-template; `resolve_import`; `igniteui-theming` `get_component_design_tokens`, `create_component_theme` grid-lite (dark) | `igx-grid-lite` (MIT; needs the `igniteui-grid-lite` package, also MIT), cell templates for the urgency chips. The doc's `let-data` context does not exist in 22.2; the type said `row`, so the template uses `row.data` |
| Scene 3, "Read as a device fault / Read as a finding" | `igniteui-cli` `get_doc` button-group; `igniteui-theming` `create_component_theme` button-group (dark) | `.reading-toggle`. Flipping it changes urgency, routing and status of INC-4127 and nothing else (checked by `scripts/check-interaction.mjs`) |
| Scene 3, on-call roles | `igniteui-cli` `get_doc` avatar; `igniteui-theming` `create_component_theme` avatar (dark) | `igx-avatar` with initials, roles only |
| Scenes 3 and 5, status chips (OK / WARN / ALERT / NO DATA, Low / High) | `igniteui-theming` `create_component_theme` chip, second pass with `text-color` | Axe found the derived light text on the gray NO DATA chip at 1.9:1. The regenerated theme sets dark text: 8.1:1 |
| Scene 5, the Panels grid | `igniteui-cli` `get_doc` tile-manager (webcomponents); `resolve_import` | `igc-tile-manager` from `igniteui-webcomponents` (MIT), static: no resize, drag, maximize or fullscreen |
| Scene 5, proposal C chart (sent against confirmed) | `apexcharts` `apexcharts_list_types`, `apexcharts_get_reference` cartesian-charts.md, `apexcharts_generate_config` line, **`apexcharts_validate_config`: ok, no errors, no warnings** | Two lines and a gap column on one axis, running totals, Dhaka-weekend band, alert marker. The generator returned placeholder categories ("Cat 1"…) for timestamped data; the shipped config uses a datetime axis instead |
| Scene 5, proposal D chart (balance against its band) | `apexcharts` `apexcharts_generate_config` rangeArea, **`apexcharts_validate_config`: ok, no errors, no warnings** | rangeArea band of "normal" plus the balance line, same weekend band and alert marker |
| Chart colours | dataviz skill, `validate_palette.js --mode dark --surface #002033` (not an MCP tool) | Sent #2A9FD6 (solid) and confirmed #D55181 (dashed): every check passes, CVD ΔE 13.2, normal-vision ΔE 27.1. The deck's own BLUE #26B1E6 failed the dark lightness band, so the blue is one step darker. Output in `mcp-log/dataviz-validate-series.md` |

`node scripts/validate-charts.mjs` re-sends every config the page ships to `apexcharts_validate_config`. It
bundles `src/app/charts.ts`, which has no Angular in it, so what is validated is what is drawn.

## Phase 3: scenes 1, 2, 4, 6 and 7 (1 Nov 2026)

| Screen or part | MCP tool | What it produced or checked |
|---|---|---|
| Scene 1, stat tiles | `igniteui-theming` card theme (Phase 1); `apexcharts_generate_config` line, **`apexcharts_validate_config`: ok ×2** | Four `igx-card` stat tiles, all OK, two with `sparkline.enabled` lines (throughput, queue depth, Thursday) |
| Scene 1, business calendars | `apexcharts_get_reference` grid-charts.md, `apexcharts_generate_config` heatmap, **`apexcharts_validate_config`: ok** | Dhaka / New York / Manila × Thu 4 – Mon 8. Three colour ranges, and every cell says Open, Closed: reason, or Not in sources, so colour is never the only cue. White labels on the cells: 5.3:1 to 16.3:1 |
| Scene 1, the week | `apexcharts_generate_config` line, **`apexcharts_validate_config`: ok** | Messages per hour with three x-axis annotation bands: "Dhaka weekend", "New York weekend", "Manila: Chinese New Year". Each band is that city's own day from `case-facts.ts`, converted to Dhaka time |
| Scene 2, device list | `igniteui-cli` `get_doc` badge; `resolve_import` | `igx-list` with an `igx-badge` per device (the app's own SVG icon set) and the word OK beside it |
| Scene 2, confirmations printed | `apexcharts_generate_config` column, **`apexcharts_validate_config`: ok** | Per hour on the Thursday. The empty panel beside it reads "No data — no query defined: messages sent vs confirmations received" with a NO DATA chip |
| Scenes 4 and Tab 1, the decision | `igniteui-theming` `create_component_theme` card (`.proposal-card`) and chip (`.vote-chip`) | One shared component, so the decision looks the same on Tab 1, in the overlay and in scene 4. Scene 4 adds `+1` / `−1` and a vote chip per proposal; votes persist until Reset |
| Scene 6, the 35 instructions | `apexcharts_get_reference` bar-charts.md, `apexcharts_generate_config` bar (horizontal, stacked), **`apexcharts_validate_config`: ok** | Stopped (30) against completed (5), in USD million; the completed bar splits Manila and Sri Lanka. Only figures from `case-facts.ts`, nothing summed |
| Scene 6, recovery | `apexcharts_generate_config` bar (horizontal), **`apexcharts_validate_config`: ok** | Sent and recovered per destination |
| Scene 6, incident timeline | `igniteui-cli` `get_doc` list | `igx-list`, day-level entries, numbered sources with one key. The Sri Lankan halt has no date in the sources and says so |
| Scene 7, the built panel | **`apexcharts_validate_config`: ok** | The scene 2 empty panel, now built: sent and confirmed, with an owner chip |
| Scene 7, the alert rule | `igniteui-cli` `get_doc` input-group; `resolve_import` | Read-only `igx-input-group`s: "No confirmation received for 30 minutes while messages are being sent" (30 is `ALERT_AFTER_MINUTES` in `ops-data.ts`), routed to Payments on-call |

All ten chart configs pass `apexcharts_validate_config` with no errors and no warnings
(`mcp-log/validate-*.md`).

## Phase 4: legibility and finish (2 Nov 2026)

| Part | Tool | What it produced or checked |
|---|---|---|
| Chart keyboard behaviour | ApexCharts typings (`chart.accessibility`) | `keyboard.enabled: false` on every chart. With it on, every chart and legend item was a tab stop that toggled series on Enter: interaction the static-chart licence exemption rules out. Screen-reader descriptions stay on. All ten configs re-validated: ok |
| Grid Lite text size | — | The library hard-codes 0.75rem headers and 0.8125rem cells in nested shadow roots (15.8px and 17.2px here). `zoom: 1.15` on both grids lifts them to 18.2px and 19.7px |
| Legends, stepper numbers, input labels | — | Raised to the 18px floor; chart axes stay at the brief's 16px |
| Root size | — | Scales with the smaller of width and height, floor 18px, so a browser window with tabs (1920x950) fits instead of scrolling |
| Focus | — | One 3px `:focus-visible` ring for buttons, steps and scroll regions; Ignite's flat buttons only shifted a background |

## Checks that are not MCP tools

- [scripts/shoot.mjs](scripts/shoot.mjs) screenshots every screen at 1920×1080, in a 1280×720 window, and as
  a viewer sees the 1920×1080 share in a 1280×720 window, in the installed Microsoft Edge (`playwright-core`,
  no browser download). It runs axe on each, looks for the Ignite trial watermark, and lists every host the
  page contacts. Output in `screenshots/`, with `report.json`.
- [scripts/check-interaction.mjs](scripts/check-interaction.mjs) drives the clicker keys, the stepper, R, the
  case overlay from every scene, a refresh, Reset, the scene 3 toggle, the votes and the scene 5 reveals, and
  fails on any console error.
- [scripts/check-keyboard.mjs](scripts/check-keyboard.mjs), [scripts/check-text-size.mjs](scripts/check-text-size.mjs)
  and [scripts/check-single-file.mjs](scripts/check-single-file.mjs): tab order and focus rings, text-size
  floors through shadow DOM, and the single file from `file://`.

## Licences

- **ApexCharts** (`apexcharts` 8.7.0, `ng-apexcharts` 3.2.0): Community licence. Bobby, 1 Nov 2026: the
  licensee is Skillo Academy, whose annual revenue is under the USD 2 million threshold in `LICENSE.md`. No
  Premium add-on is imported; every chart type used (line, column, rangeArea) is Tier 1, in the default
  bundle. `LICENSE.md` also requires an OEM licence for "embedding ApexCharts into a product or platform used
  by other people" and says it is "not required if your app simply renders static charts and users cannot
  configure or interact with them". The charts here are static: no toolbar, zoom, selection, tooltip or legend
  toggling.

## Known issues

- **axe reports two false positives on Grid Lite** (`aria-required-children`, `aria-required-parent`, on its
  `igc-virtual-scroll`). This is not an accessibility defect in the library. Grid Lite builds its ARIA grid
  through `ElementInternals` (`igniteui-grid-lite/internal/a11y.js`), which axe-core cannot read, and the one part
  with an explicit `role="rowgroup"` attribute therefore looks to axe like a rowgroup outside a grid. The
  browser's accessibility tree shows a `grid` with an accessible name, `row`, `columnheader` and `gridcell`
  nodes: `scripts/check-a11y-tree.mjs` checks that on every screen with a Grid Lite. `scripts/shoot.mjs` ignores
  exactly these two rules on exactly that element and fails on every other axe finding. (Corrected 13 Nov 2026;
  Round 1 wrongly called it a library defect.)
- **The tile manager throws when a tile is added to it before it has rendered**: `Cannot read properties of null
  (reading 'assign')` is thrown by `igc-tile-manager` when a tile is added to a manager that is connected but
  has not rendered yet, while an earlier DOM mutation is still pending in the same task. Entering scene 5 at run
  time does exactly that, and after the throw the manager stops observing its tiles. Still present in
  igniteui-webcomponents 7.5.0-rc.0. So the manager is always in the template and its tiles are added after its
  first render (`ready()` in `scene-reveals.ts`); `scripts/check-interaction.mjs` fails on any console error.
- **ng-apexcharts loads ApexCharts with `import()`**, so the normal build has lazy chunks. The single-file
  build re-bundles with esbuild and code splitting off, which pulls them in; it was checked from `file://`.
- **igniteui-angular**: only components on its MIT list. **igniteui-webcomponents** (`igc-tile-manager`): MIT.

## Round 2 (13 Nov 2026)

Aim: use the Ignite UI controls in a cleaner, supported way, and call the three MCP servers as native tools of the
session, with notes for the Infragistics developers in
[mcp-log/NATIVE-MCP-NOTES.md](mcp-log/NATIVE-MCP-NOTES.md) (one row per call, and the token table). The look, the
case content and every number are unchanged; before and after screenshots were compared pixel by pixel, and the
only differences are the three layout fixes below.

| Change | Native MCP tool behind it | Result |
|---|---|---|
| `igniteui-angular` 22.2.4 to **22.2.6** (nothing else changes version; `igniteui-grid-lite` 0.11.0, `igniteui-webcomponents` 7.4.1, `apexcharts` 8.7.0 stay) | `igniteui-cli` `resolve_import` (entry points still resolve) | Build clean, no new warnings |
| Accessibility check corrected: `shoot.mjs` stops counting the two false positives (only those rules, only on `igc-virtual-scroll` inside `igx-grid-lite`); new `check-a11y-tree.mjs` reads the browser's accessibility tree through CDP | `igniteui-cli` `search_docs`, `get_doc` grid-lite (nothing in the docs on how Grid Lite exposes ARIA; source read instead) | axe: nothing left; tree: grid, rows, column headers, cells on scene 3 and on scene 5 after a reveal |
| `status-chip.ts`: two duplicated `@if` branches replaced by one `igx-chip` with `[class.chip-nodata]`; comment now states the real behaviour (a whole-value `[class]` is swallowed by the chip's unused `class` input; `[class.x]` is not) | `igniteui-cli` `get_doc` chip and badge, `get_api_reference` IgxChipComponent, `search_docs` | The docs give no non-interactive chip. `igx-badge` is the documented non-interactive status control (role status) but is a compact count/dot/icon indicator, so it would change the screens; not adopted. The `igx-chips-area` wrapper stays |
| Token pass over every `::ng-deep` rule and every selector that reaches an internal `.igx-*` class | `igniteui-theming` `get_component_design_tokens` (navbar, stepper, banner, list, chip, input-group), `set_size`, `set_spacing`, `read_resource`; `igniteui-cli` `get_doc` | No supported token replaces any of them. One rule was dead and was removed. Every kept rule now carries a comment naming what is missing; the table is in the notes file |
| Stepper "NaN": removed the explicit `igxStepIndicator` on 22.2.6, screenshotted, restored | `igniteui-cli` `get_doc` stepper, `get_api_reference` IgxStepComponent / IgxStepperComponent | Still reproduces on 22.2.6: seven NaN indicators on load, correct after the first key press. Not documented. The explicit indicator stays, with an accurate comment |
| `main.ts`: `configureTheme('material', 'dark')` replaced by `<igc-theme-provider>` around the ops view in `app.html` | `igniteui-cli` `get_api_reference` IgcThemeProviderComponent, `resolve_import`, `get_doc` themes-overview (there is no doc for the provider) | Pixel-identical on scenes 1, 2, 3, 5 and 7 and the overlay. The tile manager follows the provider; Grid Lite does not (it takes its colours from the `--ig-*` variables) |
| Tile manager comment rewritten to state the exact condition | `igniteui-cli` `get_doc` tile-manager | `ready()` guard kept |
| `icons.ts`: icon references re-pointed for every internal icon a component used here can ask for, adding chip `selected` and `remove` | `igniteui-cli` `get_doc` icon-service | The doc's table omits the chip's `remove`; the chip template asks for it |
| Three layout defects fixed (English, and checked in Bulgarian), no wording changed: scene 2 device list clipped under the Illustrative tag; scene 3 side column scrolled 27px with the alert read as a finding; "The ops view" tab 12px too narrow | `igniteui-theming` `set_spacing`, `set_size` (tried first; neither reaches the list rows or the card gaps) | Measured before and after at 1920x1080 |
| How the chips inside Grid Lite cells get their styles | `igniteui-cli` `search_docs`, `search_api` (nothing documented; source read) | See the notes file, item 10 |
| Two corrections by the supervising session after the token pass | `igniteui-cli` `search_docs` (typography variables, found by the M3 L5 session); a probe of the built page in Edge | The input label's size now comes from the documented typography variable `--ig-caption-font-size`, not from an override of `.igx-input-group__label`. The rule `.topbar ::ng-deep .igx-navbar` (height and side padding) was removed: it never matched, because in `igniteui-angular` 22 the `igx-navbar` class is on the host element, the same one that carries `topbar`. Screenshots are byte-identical before and after removing it |
