# Ignite UI controls and MCP servers as used by Claude: findings from two demo apps

How Claude models worked with the `igniteui-*` packages, the Ignite UI MCP servers and the Ignite UI
agent skills while building two Angular apps. Section 3 lists the findings, each with an ID, a
priority, its status on the latest and release-candidate packages, and the closest public tracker
item. Everything was tested on 13 Nov 2026.

| App | Branch | What it is |
|---|---|---|
| `m3l5-case-app` | [`m3l5-case-app`](https://github.com/turbobobbytraykov/sk03_kbc-it-academy-sm-po/tree/m3l5-case-app/m3l5-case-app) | Facilitator screen for an incident simulation: a 25-minute clock, a decision log in Grid Lite, charts. About 3,800 lines |
| `m3l4-case-app` | [`btraykov/add-m3l4-case-app`](https://github.com/turbobobbytraykov/sk03_kbc-it-academy-sm-po/tree/btraykov/add-m3l4-case-app/m3l4-case-app) | A light "case" tab and a dark "ops view" of seven dashboard and on-call scenes, with Grid Lite and the tile manager. About 5,700 lines |

Both are single-page apps with no backend, an English and a Bulgarian version, and a single-file
build that runs from `file://`. Workarounds still in the code carry a comment naming what is
missing.

---

## 1. Setup

**Packages**

| Package | Used | Also tested |
|---|---|---|
| `igniteui-angular` | 22.2.6 | 22.3.0-rc.0 |
| `igniteui-grid-lite` | 0.11.0 | 0.12.0-rc.0 |
| `igniteui-webcomponents` | 7.4.1 (tile manager, M3 L4 only) | 7.5.0-rc.0 |
| `igniteui-theming` | 29.1.1 (via `igniteui-angular`) | 30.2.0 |
| `igniteui-cli` MCP server | 15.9.0 | 15.8.2 |
| `igniteui-theming` MCP server | 30.2.0 | 29.1.1 |
| `apexcharts` / `ng-apexcharts` | 8.7.0 / 3.2.0 | — |
| Angular | 22.2, standalone components, signals | — |

**Licence constraint.** Only the components on the MIT list in `igniteui-angular/LICENSE`, plus Grid
Lite and the MIT web components. No `igx-grid` family, no `igniteui-angular-charts`, `-gauges` or
`-dashboards`, no Dock Manager. That is why the charts are ApexCharts.

**Controls used**

| App | `igniteui-angular` | Other |
|---|---|---|
| M3 L5 | navbar, button, button group, card, chip, circular and linear progress, dialog, input group, switch, icon, Grid Lite | — |
| M3 L4 | navbar, button, tooltip, button group, card, chip and chips area, badge, avatar, list, stepper, banner, dialog, input group, icon, Grid Lite | `igc-tile-manager`, `igc-theme-provider` |

**Agent and MCP setup.** Claude Code (desktop app) on Windows 11. The apps were built by Claude
Opus 5.5 and Claude Fable 5.2, and reworked with the MCP servers as native tools by Claude Sonnet
5.5. `npx -y igniteui-cli ai-config` wrote the two Ignite UI server entries, five agent skills
(components, grids, theming, figma-to-app, generate-from-image-design) and an agent rules file; the
ApexCharts entry was added by hand:

```json
{
  "mcpServers": {
    "igniteui-cli":     { "command": "npx", "args": ["-y", "igniteui-cli", "mcp"] },
    "igniteui-theming": { "command": "npx", "args": ["-y", "igniteui-theming", "igniteui-theming-mcp"] },
    "apexcharts":       { "command": "npx", "args": ["-y", "apexcharts-mcp"], "env": { "APEXCHARTS_MCP_PRODUCTS": "charts" } }
  }
}
```

**How the servers were called.** Claude Code attaches MCP servers when a session starts. The first
builds created `.mcp.json` mid-session, so the agents called the servers through a small stdio
JSON-RPC script instead: the same answers, without the tool-picker experience. 64 of those answers
are saved in [`m3l4-case-app/mcp-log/`](https://github.com/turbobobbytraykov/sk03_kbc-it-academy-sm-po/tree/btraykov/add-m3l4-case-app/m3l4-case-app/mcp-log).
The rework sessions started after `.mcp.json` existed and used the servers natively: 71 calls,
each logged with a verdict on whether the answer was right and sufficient
([M3 L4 log](https://github.com/turbobobbytraykov/sk03_kbc-it-academy-sm-po/blob/btraykov/add-m3l4-case-app/m3l4-case-app/mcp-log/NATIVE-MCP-NOTES.md),
[M3 L5 log](https://github.com/turbobobbytraykov/sk03_kbc-it-academy-sm-po/blob/m3l5-case-app/m3l5-case-app/mcp-log/NATIVE-MCP-NOTES.md)).

| Native calls by tool | |
|---|---|
| `get_component_design_tokens` | 14 |
| `get_doc` | 12 |
| `search_docs` | 9 |
| `get_api_reference` | 8 |
| `search_api` | 4 |
| `create_component_theme` | 3 |
| `detect_platform`, `set_size`, `set_spacing`, `read_resource`, `resolve_import`, `get_project_setup_guide` | 2 each |
| `list_components`, `create_palette` | 1 each |
| `apexcharts` tools | 7 |

Native and scripted calls return the same answers. In practice, natively the agent pays for every
tool description and schema (MCP-4), and a tool that takes a large payload, such as
`apexcharts_validate_config`, needs it typed into the call where a script reads it from a file.

**Checks.** The agents built Playwright scripts on the installed Edge: screenshots of every screen
at several sizes, axe on each, a search for the trial-watermark element, text sizes measured through
shadow roots, interaction checks that fail on any console error, a `file://` check of the single
file, and a check of the browser's accessibility tree. Most findings below came from these scripts.

---

## 2. What worked well

- **The API is predictable enough to write without the servers.** The first M3 L5 build had no MCP
  access, only the typings and the skill files that ship in `node_modules/igniteui-angular/skills`,
  and its first `ng build` was clean. Per-component entry points, `IGX_*_DIRECTIVES` and standalone
  components are easy to get right. Shipping the skills in the npm package is worth saying in the
  docs.
- **`resolve_import`.** Both rework sessions independently named it the best tool of the three
  servers: up to 50 symbols per call, paste-ready imports grouped by entry point, "did you mean"
  for wrong names, platform-aware. Imports caused no build errors.
- **`get_api_reference` with `section` or `member`.** A few hundred tokens that settle one question.
- **`get_doc` answered questions that would otherwise cost a failed build**: `igx-banner-actions`
  replacing the default Dismiss button plus the cancelable `closing` event gave a banner that
  cannot be closed; `activeStepChanging` was chosen over `activeStepChanged` because the latter waits
  for the animation; the Grid Lite cell-template doc was correct where the README is not (GL-3).
- **`create_component_theme`.** Paste-ready Sass under any selector, the right schema chosen,
  `var(--ig-…)` accepted as a value, a reminder to scope the dark variant. Named variants
  (`.btn-accent`, `.card-dark`, `.chip-nodata`) became cheap. Sass from the 30.2.0 server compiled
  against 29.1.1. The "primary tokens only" guidance kept themes small.
- **A light and a dark theme on one page.** A dark `create_custom_palette` scoped to one view worked,
  and Grid Lite and the tile manager picked up the scoped `--ig-*` variables with no extra work.
- **`read_resource`.** The spacing-and-sizing resource explains `--ig-size` and `--ig-spacing` in
  under 1,000 tokens.
- **Clear negative answers.** "No components found" from `list_components`, and `get_doc` pointing
  to `list_components` on an unknown name.
- **Offline icons.** `addSvgIconFromText` and `setIconRef` let the apps replace the Material Icons
  font with inline SVG.
- **Grid Lite through the Angular wrapper.** Declarative columns and `igxGridLiteCell` templates took
  Angular content (chips, icons, buttons with handlers), and the grid exposes a complete ARIA grid
  with no work from the app.
- **Licence compliance is testable.** The screenshot script fails if `igniteui-trial-watermark`
  appears, so "no commercial component slipped in" is automated.
- **No workaround needed** for dialog, button group, avatar, badge, switch, or the chip's `variant`.

---

## 3. Findings

**Status:** *latest* is `igniteui-angular` 22.2.6, `igniteui-grid-lite` 0.11.0,
`igniteui-webcomponents` 7.4.1; *next* is 22.3.0-rc.0, 0.12.0-rc.0, 7.5.0-rc.0.
**Tracker:** the closest item in the public `IgniteUI` repositories; "none found" means a few
queries per item, not proof of absence.
**Evidence:** *Run* = reproduced at run time; *Source* = read in the package source or in the
tool's own output; *Reported* = observed by one agent session and not repeated independently.

| ID | Area | Problem | Kind | Priority | Latest / next | Tracker | Evidence |
|---|---|---|---|---|---|---|---|
| TM-1 | Tile manager | Throws when a tile is added to a connected manager that has not rendered, then stops slotting tiles | Bug | High | present / present | none found | Run |
| BTN-1 | Button | A static `aria-label` on `igxButton` is removed | Bug | Medium | present / present | none found | Run |
| CH-2 | Chip | A stand-alone chip is an `option` with no listbox: axe critical | Accessibility | Medium | present / present | related, closed 2021: [8935](https://github.com/IgniteUI/igniteui-angular/issues/8935) | Run |
| ST-2 | Stepper | Steps created in an `@for` show "NaN" as their number | Bug | Medium | present / not tested | none found | Run |
| GL-2 | Grid Lite | Header and cell font sizes fixed inside shadow roots | Feature gap | Medium | present / present | none found | Source |
| GL-3 | Grid Lite | README and JSDoc show a cell-template context that does not exist | Docs bug | Medium | present / present | none found | Source |
| TH-1 | Theming | Palette Sass from the 29.x MCP server does not compile on theming 30 | Upgrade break | Medium | n/a / present | none found | Run |
| MCP-4 | Theming MCP | Tool definitions total about 128,000 characters | Cost | Medium | server 30.2.0 | none found | Run |
| MCP-5 | Theming MCP | Token tool says "do not use" for a component's only tokens, and omits documented CSS variables | Tool design | Medium | server 30.2.0 | none found | Run |
| MCP-6 | CLI MCP | API reference omits inherited members (`value`, `max` on the progress bar) | Data bug | Medium | cli 15.9.0 | none found | Run |
| GL-1 | Grid Lite | One role is an attribute and the rest are `ElementInternals`, so axe reports two false criticals | Tooling | Low | present / present | roles added in [PR 79](https://github.com/IgniteUI/igniteui-grid-lite/pull/79) | Run |
| GL-5 | Grid Lite | How page styles reach cell templates (`adopt-root-styles`) is undocumented | Docs | Low | present | none found | Run |
| CH-1 | Chip | `[class]="expr"` on `igx-chip` is swallowed by an unused input | Bug | Low | present / present | related, closed 2018: [2683](https://github.com/IgniteUI/igniteui-angular/issues/2683) | Run |
| WC-1 | Web components | `igc-theme-provider` has no doc page; Grid Lite does not follow it | Docs | Low | present | related, open: [2537](https://github.com/IgniteUI/igniteui-webcomponents/issues/2537) | Run |
| TH-2 | Theming | A few sizes have neither a token nor a variable | Feature gap | Low | present / present | open: [2417](https://github.com/IgniteUI/igniteui-webcomponents/issues/2417) | Run |
| TY-1 | Typography | Small defaults for projected screens; card content does not inherit size | Feature / docs | Low | present / present | open: [373](https://github.com/IgniteUI/igniteui-theming/issues/373) | Source |
| ST-1 | Stepper | No way to use it as navigation only | Feature | Low | present / present | none found | Source |
| FX-1 | Focus | Focus on flat buttons and steps is faint; no outline token | Accessibility | Low | present / present | none found | Source |
| PB-1 | Progress | Progress bars need an accessible name from the app; undocumented | Docs | Low | present | none found | Run |
| MCP-1 | Theming MCP | `detect_platform` is "ambiguous" for Angular plus web components | Design | Low | servers 29.1.1, 30.2.0 | none found | Run |
| MCP-2 | CLI MCP, skills | No positive "MIT" marker; no tier in `resolve_import` or the API reference | Feature | Low | cli 15.9.0 | none found | Source |
| MCP-3 | Theming MCP | Tokens for `grid-lite` are the full grid's list | Data bug | Low | servers 29.1.1, 30.2.0 | none found | Source |
| MCP-7 | CLI MCP | Multi-word `search_api` and `search_docs` queries return noise or nothing | Tool quality | Low | cli 15.9.0 | none found | Reported |
| MCP-8 | Theming MCP | `set_size` and `set_spacing` do not say when a component ignores them | Tool design | Low | server 30.2.0 | related: [2417](https://github.com/IgniteUI/igniteui-webcomponents/issues/2417) | Reported |
| CFG-1 | `ai-config`, servers | No restart hint; generated axe rule unmet with Grid Lite; server version not reported | Docs | Low | partly changed in 15.9.0 | related, closed: [1864](https://github.com/IgniteUI/igniteui-cli/issues/1864) | Run |
| DOC-1 | Docs via MCP | Large pages, web-component leftovers in Angular pages, dead links, an incomplete table | Docs | Low | cli 15.9.0 | none found | Reported |

Already fixed or by design, listed so they are not filed again:

- **Tile content does not fill the tile.** In 7.4.1 the tile's `base` part is a block, so charts
  needed `::part(base)` and `::part(content-container)` rules. Fixed by
  [PR 2496](https://github.com/IgniteUI/igniteui-webcomponents/pull/2496), in 7.5.0-rc.0 (read in
  the source, not rendered).
- **Chip text capped at 32ch.** By design since
  [issue 5776](https://github.com/IgniteUI/igniteui-angular/issues/5776). The only gap is that no
  token changes it; a long Bulgarian label needed `::ng-deep .igx-chip__content { max-width: none }`.
- **`igx-grid-lite` needs `igniteui-grid-lite`,** an optional peer. The build error
  (`Could not resolve "igniteui-grid-lite"`) is clear.

### Tile manager (`igniteui-webcomponents`)

**TM-1. A tile added before the first render throws, and the manager then stops working.**
`components/tile-manager/position.js` calls
`this._manager.renderRoot.querySelector('slot').assign(...this._tiles)` with no guard, from
`firstUpdated` and from the manager's `MutationObserver` callback.

```
TypeError: Cannot read properties of null (reading 'assign')
    at assignTiles
    at _observerCallback
    at MutationObserver.<anonymous>
```

The trigger is narrow in plain DOM and common in a framework. In a plain page none of these throw:
tiles in the initial markup, tiles added before the manager is connected, a synchronous append right
after connecting, appends in a microtask, timeout, animation frame or after `updateComplete`, remove
and re-add. It throws when **another `MutationObserver` already has a pending record earlier in the
same task**, the manager is then connected, and a tile is appended synchronously: all observers
share one notification microtask, which runs before Lit's first-update microtask, so the render
root exists but the slot is `null`. Angular produces exactly this: in the M3 L4 app without the
workaround, the error occurs every time the scene with the tile manager is entered at run time (not
when the page loads on that scene), because Angular appends the manager into a detached element,
connects it and inserts the tiles before it has updated.

The observer helper disconnects, runs the callback and then observes again. When the callback
throws, it never observes again, so a tile added later is not slotted (two tiles in the DOM, one
assigned). Identical in 7.4.1 and 7.5.0-rc.0. Workaround: await the manager's `updateComplete` in
`afterNextRender`, then render the tiles.

*Suggested:* guard the missing slot and re-run the assignment in `firstUpdated`; re-observe in a
`finally`.

**WC-1. `igc-theme-provider` is undocumented, and Grid Lite ignores it.** The provider has scoped a
theme and variant to part of a page since 6.5.0, but it has only an API entry: `search_docs` and
`get_doc` find no page, and the themes overview mentions only the global `configureTheme()`. The
agents found it only when told it existed. Around the M3 L4 dark view it works for the tile manager
(pixel-identical to the global call; a Bootstrap light provider visibly changes the tiles). Grid
Lite does not follow it and takes its colours from the `--ig-*` variables. Scoping the palette,
typography and elevation variables, which theme files write to `:root`, is open request 2537.

### Chip, button, stepper, progress (`igniteui-angular`)

**BTN-1. `igxButton` removes a static `aria-label`.** The directive has the host binding
`[attr.aria-label]: _label()`, fed by the `igxLabel` input. Without `igxLabel` the binding resolves
to null and removes what the template set. Same on 22.2.6 and 22.3.0-rc.0:

| Template | `aria-label` on the element |
|---|---|
| `<button igxButton aria-label="x">` | none (removed) |
| `<button igxButton [attr.aria-label]="'x'">` | none |
| `<button igxButton igxLabel="x">` | `x` |

`aria-label` is what every developer and code generator writes; it fails silently, and on an
icon-only button leaves a control with no accessible name. The agent found `igxLabel` only by
reading the typings; the button doc did not lead there.

*Suggested:* keep an author's `aria-label` when `igxLabel` is not set.

**CH-2. A chip used as a label fails axe, correctly.** `IgxChipComponent` sets `role="option"` as an
attribute and `tabindex="0"` unless disabled. Outside `igx-chips-area` there is no listbox, so axe
reports `aria-required-parent` (critical) on every stand-alone chip (eleven of eleven on a test
page). For read-only status labels a one-option listbox is the wrong semantics and the tab stop is
unwanted. Issue 8935 designed the roles for chips inside a chips area only. Neither the chip doc
nor the README covers this; the library-wide accessibility page lists the chip for keyboard
behaviour only. `igx-badge` (`role="status"`) is a count or dot, not a text label.

*Suggested:* a static mode with no option role and no tab stop, or document the wrapper.

**ST-2. Steps created in a loop show "NaN".** On 22.2.6, in an `OnPush` component:

```html
<igx-stepper orientation="horizontal" titlePosition="end" [linear]="false">
  @for (s of scenes; track s.n) {
    <igx-step [active]="scene() === $index">
      <span igxStepTitle>{{ s.title }}</span>
    </igx-step>
  }
</igx-stepper>
```

All seven indicators read "NaN" on load and become 1 to 7 after the first key press. The default
indicator renders `index + 1`; the stepper appears to assign each step's index after the steps are
first drawn, without marking them for check (read from the source, not proved). The stepper doc
does not mention it, though its own loop examples all pass an explicit `igxStepIndicator`, which is
the workaround. Not tested on 22.3.0-rc.0 or outside `OnPush`.

*Suggested:* mark the steps for check when their index is assigned.

**CH-1. `[class]="expr"` on `igx-chip` is lost.** The component declares an input named `class`
(`@hidden @internal`, initialised to `''`, never read). Angular routes a whole-value `[class]`
binding to it, silently:

| Template | Classes on the host |
|---|---|
| `class="a"` | `a igx-chip` |
| `[class]="'b'"` | `igx-chip` (lost) |
| `class="a" [class]="'b'"` | `a igx-chip` (bound part lost) |
| `[class.c]="true"` | `c igx-chip` |
| `[ngClass]="'d'"` | `d igx-chip` |

An agent that hit this duplicated the chip's whole template per class instead.

*Suggested:* remove the unused input.

**ST-1. Stepper as navigation only.** M3 L4 uses a horizontal stepper as a scene switcher with the
content drawn elsewhere. No input hides the content area (`contentTop` only moves it), so the app
uses `::ng-deep .igx-stepper__body { display: none }`.

**FX-1. Faint focus indication.** On keyboard focus a step gets a 1px inset ring and a flat button a
background tint; the library draws no outline. The flat, outlined and button-group themes have focus
colour tokens but no outline token. On a pale page or a compressed screen share neither is visible,
so both apps add a global `:focus-visible` outline.

**PB-1. Progress bars need a name from the app.** axe flags `igx-linear-bar` and `igx-circular-bar`
as unnamed until the app adds `[attr.aria-label]`. Normal for a progress bar, but neither progress
doc has an accessibility section, and the library-wide page lists both as not yet documented.

### Grid Lite (`igniteui-grid-lite`, `igx-grid-lite`)

**GL-1. axe reports two false criticals.** Grid Lite sets grid, row, columnheader and gridcell roles,
with row and column counts and indices, through `ElementInternals` (`addA11y(host, role)` in
`internal/a11y.js`). The exception is `role="rowgroup"`, written as an attribute on
`igc-virtual-scroll` (`components/grid.js`). DOM-based checkers such as axe-core 4.14, and therefore
Lighthouse, see a row group with no grid above and no rows below and report `aria-required-parent`
and `aria-required-children`, both critical. The browser's accessibility tree is complete (one named
grid, 6 rows, 6 column headers, 30 cells on the M3 L4 Pager scene).

The cost is that every project with an axe gate fails on a page with Grid Lite, and the output
points the wrong way. Two AI agents in this project concluded it was a library defect; one wrote a
directive copying the roles onto the elements as attributes. The agent rules file that `ai-config`
generates requires all axe checks to pass, which pushed them to act. The apps now exclude these two
rules for that one element and assert the accessibility tree instead.

*Suggested:* set `rowgroup` through internals like the other roles, or drop the attribute; say in
the Grid Lite docs that roles come from `ElementInternals` and DOM-based checkers cannot see them.

**GL-2. Text size cannot be themed.** `styles/header-cell/header-cell.css.js` sets
`font-size: 0.75rem` and `styles/body-cell/body-cell.css.js` sets `.8125rem`, inside shadow roots;
the styles read only `--ig-size` and scrollbar variables, and the row exports only its `cell` part.
Both apps needed 18px text and use `zoom: 1.15` or `1.2` on the grid, after which
`getComputedStyle` reports pre-zoom sizes and template sizes must be divided by the factor.
Unchanged in 0.12.0-rc.0.

*Suggested:* CSS custom properties for header and cell font size, or follow the Ignite type scale.

**GL-3. The package docs show a cell context that does not exist.**
`igniteui-angular/grids/lite/README.md` lists `rowIndex` and `data` and shows
`<ng-template igxGridLiteCell let-value let-data="data">`; the JSDoc example on
`IgxGridLiteCellTemplateDirective` repeats it, with `let-rowIndex` too. The real context
(`IgxGridLiteCellTemplateContext`) has `value`, `column`, `row` and `parent`. The `get_doc` page is
correct, but an agent writing the template reads the typings next to it: one fetched the correct doc
and still wrote `let-data` from the JSDoc five minutes later. Unchanged in 22.2.6 and 22.3.0-rc.0.

*Suggested:* fix the README and JSDoc; consider a `data` shortcut in the Angular context, since the
row's record is the usual reason to open it.

**GL-5. How page styles reach a cell template is undocumented.** A templated cell is a custom element
with its own shadow root, and the template's Angular content lives inside it, yet page CSS styles it.
The reason: the Angular wrapper sets `adopt-root-styles`, and each templated cell copies every
document style sheet into its shadow root and keeps them in step with `<head>` (21 adopted sheets in
one M3 L4 cell). Nothing the MCP tools return mentions it (`search_docs` and `search_api` find
nothing). It decides whether a template can be styled from an ordinary style sheet, so it belongs in
the cell-template doc.

### Theming

**TH-1. Palette Sass generated by the 29.x server does not compile on theming 30.**
`igniteui-angular` 22.3.0-rc.0 brings `igniteui-theming` 30.2.0. The apps' palette, written by
`create_custom_palette` on 29.x, builds the surface family from numeric shades
(`shades('surface', …, ('50' … 'A700'))`). On 30.2.0 that is an error: surfaces are now built from
roles (`base`, `sunken`, `raised`, `overlay`, `container`, `seed`). Adding `'base'` makes it build,
after which three new colour-contrast findings appear (not diagnosed). A minor upgrade of
`igniteui-angular` breaks Sass that the product's own MCP server produced.

*Suggested:* a migration for generated palettes, or a deprecation period for numeric surface shades.

**TH-2. A few sizes have neither a token nor a variable.** Most size overrides did have a supported
route, which the agents found late (see section 4):

| Override of an internal class | Supported route | Documented in |
|---|---|---|
| Ring track colour, `.igx-circular-svg__inner` | token `track-color` | token tool, `progress-circular` |
| Ring thickness, `stroke-width` on the SVG | variable `--stroke-thickness` | one example in the circular progress doc |
| Chip height and padding, `.igx-chip__item` | `--ig-chip-size`, `--ig-spacing` | chip doc, "Custom sizing" |
| Chip text size, `.igx-chip__content` | `--ig-body-2-font-size` | typography topic |
| Input label size, `.igx-input-group__label` | `--ig-caption-font-size` | typography topic |

The ring override also caused a visible defect: it thickened the stroke without moving the radius,
so the ring was clipped flat at four edges. With no supported route, and still overridden: stepper
indicator size, banner block padding and its empty actions container, list row gap, navbar title
alignment. `--ig-size` and `--ig-spacing` change nothing on the stepper, banner or navbar.

**TY-1. Typography defaults.** Material button text is 14px; `igx-card-content` applies the body-2
size to its children, so a size set on the card is not inherited; Material `h1` is 96px with a
112px line height and 28px/56px margins. Apps that need 18px text everywhere must know all three.
A fluid type scale is open request 373.

### MCP servers, skills and `ai-config`

**MCP-4. The theming server's tool definitions are very large.** From `tools/list`:

| Server | Version | Tools | Descriptions plus schemas |
|---|---|---|---|
| `igniteui-cli` | 15.9.0 | 7 | 14,400 characters |
| `igniteui-theming` | 30.2.0 | 15 | 128,500 characters |
| `apexcharts-mcp` | 0.14.1 | 5 | 4,400 characters |

`create_custom_palette` alone is 52,400 characters, 45,300 of them its input schema, which repeats
the same colour pattern for every shade of every family. That is roughly 30,000 tokens per session
before any work, or on the first search for a theming tool in clients that load tools on demand.
The descriptions are good; they need to be affordable.

*Suggested:* define the colour pattern once and reference it; move long guidance into the server's
existing resources.

**MCP-5. The token tool hides what it has.**

- For a component with no primary tokens, every token is listed under "Available Tokens, DO NOT USE
  unless the user explicitly requests", followed by "use only the primary tokens above". For
  `progress-circular`, whose eight tokens include `track-color` and `diameter`, the tool tells the
  agent not to use the token it came for.
- Only theme tokens are listed. Documented CSS variables (`--stroke-thickness`, `--ig-chip-size`,
  the type-style variables) are not, so a missing token looks the same as a size that cannot be
  changed. Asked the same question about the input label, one agent concluded "no supported way"
  from the token list; another found `--ig-caption-font-size` in a doc search.

*Suggested:* when there is no primary tier, say so and list tokens plainly; add a "CSS variables"
section per component; answer "not themeable" where that is the case.

**MCP-6. The API reference omits inherited members.** `get_api_reference` for
`IgxLinearProgressBarComponent`, `properties`, lists `cssClass`, `id`, `role`, `striped`,
`textAlign`, `textTop`, `textVisibility`, `type`, `valueMin`, but not `value`, `max`, `animate`,
`indeterminate` or `step`, which come from the base class. An agent trusting it would conclude the
bar has no value.

*Suggested:* merge inherited members.

**MCP-1. `detect_platform`.**

- With `igniteui-angular`, `angular.json` and `igniteui-webcomponents`, it reports two platforms at
  full confidence and every later call must name the platform (29.1.1 and 30.2.0). Documented, but
  wrong for this case: `igniteui-webcomponents` is an optional peer of `igniteui-angular` and the
  way an Angular app gets the tile manager.
- With no argument it reads `package.json` from the folder the server started in. With `.mcp.json`
  one level above the app it fails with a file-not-found error that does not say how to fix it, and
  the `packageJsonPath` description does not say what a relative path is relative to.

*Suggested:* treat `igniteui-angular` plus `angular.json` as Angular; name the searched folder in the
error.

**MCP-2. Licence tier.** Premium is already marked (a star in `list_components`, `premium: true` in
`get_doc` front matter, the `general-open-source-vs-premium` doc, the skills on the Dock Manager and
Grid Lite), yet the agents checked `LICENSE` by hand. Gaps: no positive "MIT" marker, only the
absence of "premium"; no tier in `resolve_import` or `get_api_reference`; the skills do not mark
`igx-grid` or the charts where they describe them.

**MCP-3. Tokens for Grid Lite.** `get_component_design_tokens` for `grid-lite` returns three primary
tokens and then the full grid's other 93 (grouping, Excel-style filtering, summaries), none of which
apply.

**MCP-7. Search.** `search_docs` requires every word, so concept queries match by accident
("status label read-only" returned the Excel workbook and the time picker) or return nothing with no
hint ("grid lite styling css variables"). `search_api` with `platform: angular` and "chip read-only
status label" returned chart and Excel classes, not `IgxChipComponent`. Single identifiers work well.
`search_api` results do not show the selector, so "circular progress" does not lead to
`igx-circular-bar`.

**MCP-8. `set_size` and `set_spacing` answer the same way for every component.** For the stepper or
banner they return `igx-stepper { --ig-size: 1; }` and the like, but neither component changes at
any value. The sizing resource says styles must use `sizable()` or `pad()` to respond, not which
components do.

*Suggested:* note in the answer when a component does not respond, or publish which do.

**CFG-1. `ai-config` and server setup.**

- The console output does not say the agent session must be reloaded. The installed skills do, but a
  line in the output would reach the person running the command.
- The generated agent rules require all axe checks to pass, which cannot be met with Grid Lite
  without an exclusion (GL-1). The rule to lazy-load feature routes conflicts with a single-file
  build.
- 15.8.2 writes `npx -y igniteui-cli mcp` (18 to 19 s cold start, issue 1864); 15.9.0 writes
  `npx -y @igniteui/mcp-server`. Existing projects keep the slow entry.
- The theming server does not report which `igniteui-theming` it runs. Started from the project root
  through `npx` it was 30.2.0 against 29.1.1 installed; TH-1 shows the two can diverge.
- A one-shot mode (`npx igniteui-cli mcp call <tool> '<json>'`) would let scripts and CI use the
  tools without a hand-written client.

**DOC-1. Doc content as the tools return it.**

- `get_doc` for chip, badge or stepper is 8,000 to 12,000 tokens, mostly repeated sample code. A
  `section` argument, as `get_api_reference` has, would cut most calls to a tenth.
- The Angular badge page contains web-component material (`igc-badge`, `::part(base)`, a "Style
  Parts" table) and an empty Do/Don't table.
- The stepper page links to `get_api_reference?…component=IgxStep`, which does not resolve; the names
  are `IgxStepComponent` and `IgxStepperComponent`.
- The chip and stepper pages teach `*ngFor` and `[ngClass]`, while the generated agent rules require
  `@for` and class bindings.
- The `icon-service` "Internal Usage" table ends in a placeholder comment, omits the chip's `remove`
  icon (which the chip template requests), and one snippet imports `IgxIconService` from
  `igniteui-angular/core` where `resolve_import` says `igniteui-angular/icon`.
- The library-wide accessibility page names `IgxGridComponent` in its front matter, which hides it
  from component searches.
- `get_project_setup_guide` covers only new projects.

---

## 4. Existing features the agents did not find

Not defects: each exists, and capable agents missed it, which says something about where it is
surfaced.

| Exists | Where | What the agents did instead |
|---|---|---|
| ARIA roles on Grid Lite | `ElementInternals` | Trusted axe; one wrote a directive to add roles |
| `igc-theme-provider` | web components since 6.5.0 | Used the global `configureTheme()` |
| `track-color`, `diameter` | token tool, component `progress-circular` | Overrode an internal class |
| `--stroke-thickness`, `--ig-chip-size`, type-style variables | component docs, typography topic | Overrode internal classes |
| Premium markers | `list_components`, `get_doc` front matter | Read `LICENSE` by hand |
| Internal icon names | `icon-service` doc | Read the library source |
| `[class.name]` on `igx-chip` | works | Duplicated a template |
| The correct cell-template context | `get_doc grid-lite-cell-template` | Copied the wrong JSDoc example |

---

## 5. ApexCharts, briefly

- Fourteen static charts (line, column, bar, range area, heatmap, sparkline, scatter), configured in
  plain TypeScript with no Angular.
- `apexcharts_validate_config` helped most: a script re-validates every shipped config, and all pass.
  The Ignite UI servers have no equivalent for a finished template or theme.
- Problems: `apexcharts_generate_config` returned placeholder categories ("Cat 1") for timestamped
  data; `ng-apexcharts` loads the library with `import()`, which broke the single-file build until
  re-bundled; charts and legend items were tab stops by default.

---

## 6. Limits

- The tracker search used a few queries per finding, so "none found" is weak.
- The three new contrast findings on the release candidates (TH-1) were not diagnosed.
- Nothing was tested with a screen reader.
- The lesson of GL-1: an axe result, a source search and two agents agreeing were all wrong. What
  settled it was the browser's accessibility tree. Findings marked *Reported* rest on one agent's
  observation.
