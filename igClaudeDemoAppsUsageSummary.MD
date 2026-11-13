# Ignite UI controls and MCP servers as used by Claude: notes from two demo apps

Feedback for the Infragistics team on how Claude models got on with the `igniteui-*` packages, the
Ignite UI MCP servers and the Ignite UI agent skills while building two small Angular apps for this
course.

Written 13 Nov 2026 by Claude (Fable 5.2) from the build sessions' transcripts, the MCP answers saved
in each app's `mcp-log/` folder, the code comments, and the installed packages in `node_modules`.
Section 5 says how far each finding was checked.

| App | Branch | What it is |
|---|---|---|
| `m3l5-case-app` | [`m3l5-case-app`](https://github.com/turbobobbytraykov/sk03_kbc-it-academy-sm-po/tree/m3l5-case-app/m3l5-case-app) | Facilitator screen for an incident simulation: a 25-minute clock, four "moments", a decision log, a reveal. 4 screens, about 3,800 lines of source |
| `m3l4-case-app` | [`btraykov/add-m3l4-case-app`](https://github.com/turbobobbytraykov/sk03_kbc-it-academy-sm-po/tree/btraykov/add-m3l4-case-app/m3l4-case-app) | A light "case" tab and a dark "ops view" of seven scenes modelled on dashboard and on-call tools. About 5,700 lines of source |

Both apps are presenter-driven single pages with no backend, an English and a Bulgarian version, and
a single-file build that runs from `file://`.

---

## 1. Context: how the apps were generated

### Stack

| Package | Version | Licence field on npm | Role |
|---|---|---|---|
| `@angular/*` | 22.2 | MIT | Standalone components and signals |
| `igniteui-angular` | 22.2.4 | "SEE LICENSE IN LICENSE" (dual) | Every control except the charts |
| `igniteui-grid-lite` | 0.11.0 | MIT | Behind `igx-grid-lite` (optional peer of `igniteui-angular`) |
| `igniteui-webcomponents` | 7.4.1 | MIT | `igc-tile-manager`, M3 L4 only |
| `igniteui-theming` | 29.1.1 | MIT | Sass theming, and the theming MCP server |
| `igniteui-cli` | 15.8.2 | MIT | `ai-config`, and the component/docs MCP server |
| `apexcharts` / `ng-apexcharts` | 8.7.0 / 3.2.0 | dual (Community licence used) | Every chart |

**The licence rule shaped everything.** The briefs asked for free components only. So the models used
only the components on the MIT list in `node_modules/igniteui-angular/LICENSE`, plus Grid Lite and the
MIT web components. `igx-grid` and its relatives, `igniteui-angular-charts`, `-gauges`, `-dashboards`
(including the Dashboard Tile) and the Dock Manager were ruled out. That is the only reason the charts
are ApexCharts.

### Models and sessions

All work was done in Claude Code (the desktop app's Code tab) on Windows 11. Each app was written
from a brief prepared beforehand (`CLAUDE.md` in the app folder), which fixed the content, the stack
and the licence rule.

| When | App | Model | What it did |
|---|---|---|---|
| 1 Nov 2026 | M3 L5 | Claude Opus 5.5 | First version from memory and the package typings (no MCP). Then set up the MCP servers, regenerated the theme through the theming server, did a UX pass and added Bulgarian |
| 1–2 Nov 2026 | M3 L4 | Claude Opus 5.5, extra-high effort | The whole app in four phases, MCP-first, with a check-in after each phase |
| 4 Nov 2026 | M3 L4 | Claude Opus 5.5 | Bulgarian version, commit and push |
| 12 Nov 2026 | M3 L5 | Claude Fable 5.2 | UI/UX review: moved the log to Grid Lite, added four charts, first axe run, window-size scaling, commit and push |

### MCP servers and skills

Both apps carry the same `.mcp.json`:

```json
{
  "mcpServers": {
    "igniteui-cli":     { "command": "npx", "args": ["-y", "igniteui-cli", "mcp"] },
    "igniteui-theming": { "command": "npx", "args": ["-y", "igniteui-theming", "igniteui-theming-mcp"] },
    "apexcharts":       { "command": "npx", "args": ["-y", "apexcharts-mcp"], "env": { "APEXCHARTS_MCP_PRODUCTS": "charts" } }
  }
}
```

`npx -y igniteui-cli ai-config --agents claude --assistants generic -f angular` wrote the first two
entries, copied five agent skills into `.claude/skills/` (components, grids, theming, figma-to-app,
generate-from-image-design) and wrote a generic Angular `.claude/CLAUDE.md`. The ApexCharts entry
was added by hand.

**Tools the models called**

| Server | Tools | Used for |
|---|---|---|
| `igniteui-cli` | `list_components`, `get_doc`, `get_api_reference`, `search_docs`, `resolve_import` | Picking a control, reading its doc before writing it, checking an event or input, confirming every import path |
| `igniteui-theming` | `detect_platform`, `create_custom_palette`, `create_typography`, `get_component_design_tokens`, `create_component_theme` | The light deck theme, a dark theme scoped to one view, and a theme per component variant |
| `apexcharts` | `apexcharts_list_types`, `apexcharts_get_reference`, `apexcharts_generate_config`, `apexcharts_validate_config` | A starting config per chart type, and validation of every config that ships |

**One thing to know about how they were called.** In both projects `.mcp.json` was created in the
same session that then needed it, and Claude Code attaches MCP servers only when a session starts. So
neither model ever had the servers as native tools. Each wrote a small stdio JSON-RPC client
(`scripts/mcp-call.mjs`, about 100 lines: `initialize`, `tools/list`, `tools/call`) and called the
servers from the shell. The protocol and the answers are the same, but the models read tool
descriptions and argument schemas through `tools/list`, not through the agent's tool picker.

The M3 L4 app saved every call: more than 60 answers are in
[`mcp-log/`](https://github.com/turbobobbytraykov/sk03_kbc-it-academy-sm-po/tree/btraykov/add-m3l4-case-app/m3l4-case-app/mcp-log),
and `BUILD-NOTES.md` maps each screen to the tool behind it. The M3 L5 app logged only the calls of
12 Nov.

### Checks the models built for themselves

Scripts on `playwright-core` driving the installed Edge: screenshots of every screen and state at
several window sizes, an axe scan of each, a search for the trial-watermark element, a text-size
check that reads through shadow roots, an interaction script that fails on any console error, and a
`file://` check of the single-file build. Most of the problems in section 3 were found by these
scripts, not by reading code.

### Controls used

| App | From `igniteui-angular` | Other |
|---|---|---|
| M3 L5 | navbar, button, button group, card, chip, circular and linear progress, dialog, input group, switch, icon, Grid Lite | — |
| M3 L4 | navbar, button, tooltip, button group, card, chip and chips area, badge, avatar, list, stepper, banner, dialog, input group, icon, Grid Lite | `igc-tile-manager` |

The first M3 L5 version also used `igx-select` and `igx-snackbar`. Both were removed after the
lecturer's review, for UX reasons and not because of defects: five always-visible role buttons were
faster than a dropdown, and the snackbar covered the bottom row of a screen where nothing may be
hidden.

---

## 2. What the models found easy

**Writing components from memory worked.** Opus 5.5 wrote the first M3 L5 version with no MCP access
and it compiled on the first build. The per-component entry points (`igniteui-angular/card`,
`igniteui-angular/dialog`, …), the `IGX_*_DIRECTIVES` constants and the standalone components are
regular enough to guess correctly, and the typings settled the rest. The brief had the selectors
wrong (`igx-circular-progress` for `igx-circular-bar`); the model corrected that from the typings
without a failed build.

**`ai-config` is one command.** It produced a working `.mcp.json`, the skills and the agent rules, and
both servers answered at once.

**`resolve_import`.** It takes up to 50 symbols in one call, returns paste-ready import lines grouped
by entry point, and suggests the right name for a wrong one. Both models ran it before writing each
batch of components, and import paths were not a source of build errors.

**`get_doc` and `get_api_reference` answered the questions that would otherwise cost a failed build.**
Examples from the logs:

- The banner doc showed that `igx-banner-actions` replaces the default Dismiss button, and the API
  reference showed `expanded` and a cancelable `closing`. Together they gave a banner that cannot be
  closed, in a few lines.
- The stepper API reference listed both `activeStepChanged` and `activeStepChanging`. The model chose
  `activeStepChanging` because the other waits for the step animation.
- The Grid Lite cell-template doc from `get_doc` was correct where the package README was not (see
  GL-3 below).

**The theming server's output is paste-ready.** `create_component_theme` with `selector`, `variant`
and a few primary tokens returns a `*-theme()` call plus `@include tokens(...)` under that selector.
That made named variants cheap: `.btn-accent`, `.card-dark`, `.chip-nodata`, `.scene-stepper`,
`.log-grid`. More than 30 component themes were generated this way across the two apps.
`get_component_design_tokens` splits tokens into "primary, use these" and "available, do not use
unless asked", which kept the models from over-specifying themes.

**A light theme and a dark theme on one page.** `create_custom_palette` with `variant: dark` gave a
dark palette with no validation warnings, and scoping it to `.ops` worked. Dialogs render outside
that scope and stayed light, which was the wanted result.

**`create_custom_palette` with explicit shades.** The brand primary is a very dark navy (`#003E61`),
too dark for automatic shade generation to give usable light tints. The explicit-shades mode let the
model pin 50, 400 and 500 to the three brand colours and still get a valid Ignite palette.

**Web components pick up the Angular theme's palette.** Grid Lite and the tile manager read the
`--ig-*` palette variables, so the scoped dark theme reached them with no extra work. `--ig-size`
set their density.

**Icons without the icon font.** `IgxIconService.addSvgIconFromText` and `setIconRef` let the apps
register inline SVG and re-point the components' own icon references, so nothing loads from a font
CDN (see IC-1 for the part that was harder).

**Grid Lite through the Angular wrapper.** Declarative `igx-grid-lite-column` elements and
`igxGridLiteCell` templates took Angular content (chips, icons, buttons with click handlers) with no
glue code, and the grid scrolls inside itself.

**Licence compliance can be tested.** `igniteui-trial-watermark` gives a concrete element to look
for. The screenshot script fails if it appears, so "no commercial component slipped in" became an
automated check. The component list in the package's `LICENSE` file was clear enough for a model to
settle the dual-licence question without asking.

**Controls that needed no workaround at all:** card, dialog (`isOpen`, `closeOnEscape`, close on
outside click), button group (`selectionMode`, `[selected]`), list, avatar, badge, banner, switch,
input group, linear progress, and the chip's `variant="success|warning|danger"`.

---

## 3. Problems and challenges with the Ignite UI packages and tooling

Each item has an ID so it can be turned into a work item. "Verified" means the cause was confirmed
in the installed package source on 13 Nov 2026. "Observed" means it was seen in the running app
during the build and worked around, but the library source was not read. None of this was checked
against existing issues or against releases newer than the versions in section 1.

### Summary

| ID | Area | Problem | Kind | Suggested priority |
|---|---|---|---|---|
| GL-1 | Grid Lite | No grid, row, column-header or cell roles; axe reports two critical violations | Bug (accessibility) | High |
| TM-1 | Tile manager | Throws if a tile is added before the manager's first render | Bug | High |
| GL-2 | Grid Lite | Header and cell font sizes are fixed inside shadow roots and cannot be themed | Feature gap | Medium |
| GL-3 | Grid Lite | Package README and JSDoc show a cell-template context that does not exist | Docs bug | Medium |
| CH-1 | Chip | `igx-chip` has its own `class` input, so a bound `[class]` never reaches the element | Bug / API design | Medium |
| TH-1 | Theming | A chip theme given only a background derived text at 1.9:1 contrast | Bug / missing warning | Medium |
| MCP-1 | Theming MCP | `detect_platform` calls Angular plus `igniteui-webcomponents` "ambiguous" | Bug | Medium |
| MCP-2 | CLI MCP, skills | Nothing at the point of use says which components are MIT and which are commercial | Feature | Medium |
| CH-2 | Chip | A stand-alone chip fails axe unless wrapped in `igx-chips-area`; no static mode | Accessibility / docs | Medium |
| TM-2 | Tile manager | Tile content does not fill the tile's height | Feature / docs | Low |
| TH-2 | Theming | Sizes and stroke widths are not tokens, so apps reach into internal class names | Feature gap | Low |
| TY-1 | Typography | Defaults are small for projected screens and override inheritance in places | Feature / docs | Low |
| BTN-1 | Button | `aria-label` on an `igxButton` is owned by the `igxLabel` input | Docs / API | Low |
| IC-1 | Icons | Components depend on the Material Icons web font; internal icon names are undocumented | Docs / feature | Low |
| FX-1 | Focus | Focus on flat buttons and stepper steps is a background shift only | Accessibility | Low |
| CFG-1 | `ai-config` | Says nothing about restarting the agent session; generated rules conflict with the library | Docs / feature | Low |
| WC-1 | Web components | `configureTheme()` is global, so one page cannot mix light and dark web components | Feature gap | Low |

### Grid Lite (`igniteui-grid-lite` 0.11.0, `igx-grid-lite` in `igniteui-angular` 22.2.4)

**GL-1. No ARIA grid structure.** *Verified.* The only structural role the grid sets is
`role="rowgroup"` on its `igc-virtual-scroll` (`components/grid.js`, line 253). The host has no
`role="grid"`, and `igc-grid-lite-header-row`, `igc-grid-lite-header`, `igc-grid-lite-row` and
`igc-grid-lite-cell` have no roles. Only the filter row sets `gridcell`. Axe reports
`aria-required-parent` and `aria-required-children`, both critical, on every screen that has a grid,
and a screen reader has no table to announce.

The two models handled it differently, which may itself be useful feedback. Opus 5.5 concluded that
the app could not reach the elements, documented the finding and shipped the M3 L4 app with it open.
Fable 5.2 wrote a directive
([`grid-lite-roles.ts`](https://github.com/turbobobbytraykov/sk03_kbc-it-academy-sm-po/blob/m3l5-case-app/m3l5-case-app/src/app/grid-lite-roles.ts),
50 lines) that walks the nested shadow roots, sets the five roles and re-applies them through a
`MutationObserver` as virtual rows are created. With it axe reports nothing. One detail worth noting: the `.claude/CLAUDE.md` that `ai-config` generates requires every page to
pass all axe checks, and the library's own free grid is what failed them.

*Suggested:* set the roles in the library, with `aria-rowcount`, `aria-colcount` and `aria-rowindex`
since the rows are virtualised.

**GL-2. Text size cannot be themed.** *Verified.* `styles/header-cell/header-cell.css.js` sets
`font-size: 0.75rem` and `styles/body-cell/body-cell.css.js` sets `.8125rem`, inside shadow roots.
The row exports only its `cell` part (`exportparts="cell"`); the header is not reachable with
`::part`. `get_component_design_tokens` for `grid-lite` lists 96 tokens of `grid-theme()`, for colours and
borders, and none for font size. Both apps needed 18px text for a projector or a screen share,
and both ended up with `zoom: 1.15` or `zoom: 1.2` on the grid element. That works, but
`getComputedStyle` then reports the size before zoom, and every size inside a cell template has to
be divided by the factor.

*Suggested:* CSS custom properties for header and cell font size (or follow the Ignite type scale),
and export the header parts.

**GL-3. The package's own docs show a cell context that does not exist.** *Verified.* The README in
`igniteui-angular/grids/lite/README.md` lists `rowIndex` and `data` as template context and gives
`<ng-template igxGridLiteCell let-value let-data="data">`. The JSDoc example on
`IgxGridLiteCellTemplateDirective` in the typings repeats it with `let-rowIndex` as well. The actual
context type (`IgxGridLiteCellTemplateContext` = `IgcCellContext` plus `$implicit`) has `value`,
`column`, `row` and `parent`. Opus 5.5 first wrote `let-data="data"`, as the typings
comment shows it; the working form is `let-row="row"` and `row.data`. The doc the MCP
server returns (`grid-lite-cell-template`) is correct, so the three sources disagree.

*Suggested:* fix the README and the JSDoc example. A `data` shortcut in the Angular context would
also be reasonable, since reading the row's record is the most common reason to open the context.

**GL-4. A second package is needed, and it is easy to miss.** *Observed.* `igx-grid-lite` imports
from `igniteui-angular/grids/lite` but needs `igniteui-grid-lite` installed, as an optional peer.
The models learned it from the doc. A model working from memory would meet a build error first.

### Tile manager (`igniteui-webcomponents` 7.4.1)

**TM-1. Tiles added before the first render throw.** *Verified.* `components/tile-manager/position.js`,
line 29: `this._manager.renderRoot.querySelector('slot').assign(...this._tiles)`. The manager's
`MutationObserver` callback calls it when a tile is added, and if the manager has not rendered yet
the slot is `null`:

```
TypeError: Cannot read properties of null (reading 'assign')
    at assignTiles
    at _observerCallback
    at MutationObserver.<anonymous>
```

In Angular this happens whenever `igc-tile` children are created in the same change-detection pass
as the `igc-tile-manager`, for example a view that opens with tiles already in an `@for` or `@if`.
It was caught only because the interaction script fails on console errors; the page looked fine.
The workaround is to await the manager's `updateComplete` in `afterNextRender` and only then render
the tiles.

*Suggested:* guard the null slot, or queue tiles added before `firstUpdated`.

**TM-2. Content does not fill the tile.** *Observed.* The tile's `base` part is a block, so the
content area is only as tall as its content, and a chart inside a tile did not stretch to the tile's
height. The fix was `::part(base) { display: flex; flex-direction: column }` and
`::part(content-container) { flex: 1 1 auto; min-height: 0 }`. The parts made the fix possible, which
is good, but a dashboard panel that fills its tile is probably the common case.

*Suggested:* make the content container fill by default, or show this in the doc.

**WC-1. One global theme for web components.** *Observed.* `configureTheme('material', 'dark')` is a
global call. The M3 L4 page has a light tab and a dark tab. It worked only because the tile manager
and the grids appear on the dark one alone. Colours follow the scoped `--ig-*` variables, but the
theme and variant do not.

### Chip, button and stepper (`igniteui-angular` 22.2.4)

**CH-1. `[class]` on `igx-chip` does nothing.** *Verified.* `IgxChipComponent` declares an input
named `class`. A bound `[class]="..."` is therefore taken by the input and never reaches the host
element, while a static `class="..."` attribute does. The status chip in M3 L4 had to repeat its
whole template in two `@if` branches, one per static class, to choose between two themes. Angular
developers bind `[class]` on everything, and it fails here without an error.

*Suggested:* apply the input's value to the host, or rename the input.

**CH-2. A chip used as a label fails axe.** *Observed.* A stand-alone `igx-chip` is exposed as an
option, so axe reports `aria-required-parent` (critical) until it is wrapped in an `igx-chips-area`,
which supplies the listbox. For a read-only status label ("OK", "Closed") a listbox with one option
is the wrong semantics, and the chip is also a tab stop until `tabIndex` is set to -1.

*Suggested:* a static or non-interactive mode with no option role and no tab stop, or a doc note.

**CH-3. Chip text is capped at 32ch.** *Verified* (the value is in the chip's component styles). A
longer Bulgarian label was cut off. The only way out was `::ng-deep .igx-chip__content
{ max-width: none }`.

**BTN-1. `aria-label` on a button.** *Verified in the typings.* `igxButton` has an `igxLabel` input
that sets `aria-label`. A button needed an accessible name different from its text. The model
found only by reading the typings that the directive manages `aria-label` itself, through
`igxLabel`, and that the name has to be given there.

**ST-1. Stepper used as navigation only.** *Observed.* M3 L4 uses a horizontal stepper as a scene
switcher, with the content drawn elsewhere. That needed `::ng-deep .igx-stepper__body { display: none }`
and more `::ng-deep` rules for the indicator size and header padding. A "navigation only" mode or
tokens for those sizes would remove the reach into internal classes.

**FX-1. Weak focus indication.** *Observed.* Keyboard focus on flat buttons and on stepper steps
showed as a slight background change, which a compressed screen share loses. Both apps added one
global `:focus-visible` outline.

### Theming and the theming MCP server

**TH-1. Derived text colour with poor contrast.** *Observed, with the calls logged.*
`create_component_theme` for `chip`, dark variant, with the single token
`background: var(--ig-gray-700)` produced a theme whose derived text measured 1.9:1 against that
background. Axe caught it. The second call added `text-color: var(--ig-surface-900)` and reached
8.1:1 (`mcp-log/theme-04-chip-nodata.md` and `theme-07-chip-nodata-text.md` in the M3 L4 app). The
server's own guidance says to pass only the primary tokens and let the framework derive the rest,
so a model that follows it ships the low-contrast result.

*Suggested:* when a primary token is a CSS variable the server cannot evaluate, say that contrast
could not be checked. Where the palette is known, resolve it and warn.

**TH-2. Sizes are not tokens.** *Observed.* The colour tokens covered almost every colour need.
Sizing did not have an equivalent, and the apps reached into internal BEM classes for it:
`.igx-circular-svg__inner` and `__outer` (the default 2px progress ring on a white track is invisible
on a pale page from the back of a room), `.igx-step__indicator`, `.igx-chip__content`,
`.igx-input-group__label`, and the navbar title, which centres projected children where a brand
belongs at the left. Each of these is a rule that can break on a minor release.

*Suggested:* tokens for the progress ring's stroke width and track colour, the step indicator size,
and the chip's maximum width.

**TY-1. Typography defaults.** *Observed.* Three things cost time in apps that need 18px or more
everywhere. Button text measured about 13px and had to be raised through the type scale.
`igx-card-content` applies its body style to its children, so a font size set on the card is not
inherited. Global typography gives `h1` margins and a line height that took about 100px from a
1080px screen. None of these is wrong, but a "large" or "presentation" type-scale preset in
`create_typography` would have replaced a dozen overrides.

**TH-3. Smaller notes.** Two scoped themes produced about 900 kB of CSS before compression. Each
`create_component_theme` answer repeats its own `@use` line, which has to be removed when several
answers go into one file; a call that takes several components at once would avoid that.

### MCP servers, `ai-config` and the skills

**MCP-1. `detect_platform` reports "Ambiguous - Multiple platforms detected".** *Logged.* With
`igniteui-angular`, `angular.json` and `igniteui-webcomponents` in the project, the server reported
Angular and Web Components at 100% confidence each and suggested a monorepo or a migration, so
every later call had to name the platform. But `igniteui-webcomponents` is a declared optional peer of
`igniteui-angular` and is required for Grid Lite and the tile manager, so this combination is a
normal Angular project.

*Suggested:* treat `igniteui-angular` plus `angular.json` as Angular, whatever web-component
packages sit beside it.

**MCP-2. Licence tier is not visible where the choice is made.** *Observed.* The models were told
"free components only" and had to cross-check each candidate against the `LICENSE` file by hand.
The skills that `ai-config` installs describe commercial components beside free ones with no marker:
the components skill covers the Dock Manager and charts, and the grids skill covers `igx-grid`, the
tree, hierarchical and pivot grids together with Grid Lite. The npm licence field ("SEE LICENSE IN
LICENSE") does not help either. Opus 5.5 flagged the grids skill as a risk the moment it was
installed. The Grid Lite doc is the good example: it says plainly that the component is MIT.

*Suggested:* a licence field (MIT or commercial) on every entry of `list_components` and at the top
of every `get_doc` answer, and the same marker in the skills. For an agent that has been told to stay
free, this is the single most useful addition.

**CFG-1. `ai-config` output.** *Observed.* Three points:

- It does not say that the agent session has to be restarted before the servers appear. Both models
  lost the native tools for the whole build for this reason and wrote their own client. A one-shot
  mode, for example `npx igniteui-cli mcp call <tool> '<json>'`, would also remove the need for that
  client in scripts and CI.
- The generated `.claude/CLAUDE.md` is generic Angular advice with one line about Ignite UI. Its
  rule to lazy-load feature routes conflicted with a single-file build, and its rule that everything
  must pass axe cannot be met with Grid Lite (GL-1).
- In the M3 L4 project the same five skills were written twice, to `.claude/skills/` and
  `.agents/skills/`.

**IC-1. Icons and the Material Icons font.** *Observed.* The components draw their own icons
(select arrow, input clear) from the Material Icons web font. Both apps had to run with no network,
so the models registered inline SVG and re-pointed the references `input_expand`, `input_collapse`
and `input_clear`. The service made that easy. Finding which reference names each component uses
meant reading the library source.

*Suggested:* document the internal icon references per component, or offer an offline icon set.

---

## 4. ApexCharts, briefly

ApexCharts is not the subject of this document, but it was the other half of the same builds, and
the comparison may be useful.

- **Use.** Fourteen static charts across the two apps: line, column, horizontal and stacked bar,
  range area with a line, heatmap, sparklines, and a scatter chart of who decided and when.
  Configs live in one plain `charts.ts` per app with no Angular in it.
- **What helped most.** `apexcharts_validate_config`. Because the configs are plain objects, a script
  re-sends every shipped config to the validator, so "what is validated is what is drawn". All
  fourteen pass with no errors or warnings. The Ignite UI servers have no equivalent that checks a
  finished template or theme, and that would be worth considering.
- **Problems.** `apexcharts_generate_config` returned placeholder categories ("Cat 1", "Cat 2") for
  timestamped series, so the shipped charts were rewritten to a datetime axis. `ng-apexcharts` loads
  the library with `import()`, which broke the single-file `file://` build until the bundle was
  re-built without code splitting. Charts and legend items were keyboard tab stops by default.
  Colours must be literals, so palette tokens are copied into the chart file. A chart inside a
  flexible tile needed a `ResizeObserver` to get its height.
- **Licence.** The Community licence applied (the licensee is under the revenue threshold), no
  Premium add-on is imported, and every chart is static.

---

## 5. How far to trust this document

- **Sources.** The two build sessions' transcripts, `BUILD-NOTES.md` and `VERIFICATION.md` in the
  M3 L4 app, the README of the M3 L5 app, the saved MCP answers, the code comments beside each
  workaround, and the package sources named above.
- **Verified in package source on 13 Nov 2026:** GL-1, GL-2, GL-3, TM-1, CH-1, CH-3, BTN-1, and the
  peer-dependency fact behind MCP-1.
- **Observed during the builds and not traced into the library:** GL-4, TM-2, WC-1, CH-2, ST-1,
  FX-1, TH-1, TH-2, TY-1, TH-3, MCP-2, CFG-1, IC-1. Some of these may be intended behaviour, or
  already covered by an option the models did not find. Where a model missed an existing option,
  that is still a signal about what the docs and the MCP answers surface.
- **Not done.** No search of the Infragistics issue trackers, no test against versions newer than
  those in section 1, and no minimal reproduction projects. The apps on the two branches reproduce
  GL-1 (M3 L4, scenes 3 and 5) and show the workaround for each item.
- **Native MCP use is untested.** Neither model had the servers attached as native tools, so nothing
  here says how well the tool names and descriptions work in an agent's tool picker.
