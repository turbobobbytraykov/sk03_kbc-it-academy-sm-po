# Ignite UI controls and MCP servers as used by Claude: notes from two demo apps

Feedback for the Infragistics team on how Claude models got on with the `igniteui-*` packages, the
Ignite UI MCP servers and the Ignite UI agent skills while building two small Angular apps for this
course.

**Version 2, 13 Nov 2026.** Version 1 was written the same day from the build transcripts by one
model. This version re-tests every finding on the latest packages, matches it against the public
issue trackers, corrects what version 1 got wrong, and adds a second round of work on both apps
with the MCP servers attached as native tools. Section 0 lists what changed; read it first if you
saw version 1.

| App | Branch | What it is |
|---|---|---|
| `m3l5-case-app` | [`m3l5-case-app`](https://github.com/turbobobbytraykov/sk03_kbc-it-academy-sm-po/tree/m3l5-case-app/m3l5-case-app) | Facilitator screen for an incident simulation: a 25-minute clock, four "moments", a decision log, a reveal. 4 screens, about 3,800 lines of source |
| `m3l4-case-app` | [`btraykov/add-m3l4-case-app`](https://github.com/turbobobbytraykov/sk03_kbc-it-academy-sm-po/tree/btraykov/add-m3l4-case-app/m3l4-case-app) | A light "case" tab and a dark "ops view" of seven scenes modelled on dashboard and on-call tools. About 5,700 lines of source |

Both apps are presenter-driven single pages with no backend, an English and a Bulgarian version, and
a single-file build that runs from `file://`.

---

## 0. What changed since version 1

### The headline finding was wrong

Version 1 put "Grid Lite sets no ARIA roles" (GL-1) at the top. **Grid Lite does set them.** Since
[igniteui-grid-lite PR 79](https://github.com/IgniteUI/igniteui-grid-lite/pull/79) (merged 25 Aug
2026) the grid, its rows, column headers and cells get their roles, counts and indices through
`ElementInternals` (`internal/a11y.js`). The browser's accessibility tree for the M3 L4 Pager
scene shows one named grid, 6 rows, 6 column headers and 30 grid cells. axe-core cannot read
`ElementInternals`, so it sees only the one role that is still a plain attribute, `rowgroup` on
`igc-virtual-scroll`, and reports it as an orphan. Two models (Opus 5.5 and Fable 5.2) took the axe
output at face value, and the "verification" in version 1 searched the source for `role=` and so
missed the internals. The corrected item is GL-1 below.

### Priorities, re-rated

| ID | v1 | v2 | Why it moved |
|---|---|---|---|
| GL-1 | High | Low, cheap fix | Wrong as stated. What remains is an axe and Lighthouse false positive |
| TM-1 | High | High | Confirmed in 7.4.1 and 7.5.0-rc.0, not tracked. The trigger is narrower than v1 said; the effect is worse (the manager stops slotting later tiles) |
| BTN-1 | Low | Medium | Understated. A static `aria-label` on an `igxButton` is removed without a warning |
| CH-2 | Medium | Medium | Confirmed: axe critical on every stand-alone chip, and this one is real |
| GL-2 | Medium | Medium | Confirmed, still in 0.12.0-rc.0, not tracked |
| GL-3 | Medium | Medium | Confirmed in 22.2.6 and 22.3.0-rc.0, not tracked |
| CH-1 | Medium | Low | Narrower: only the whole-value `[class]="..."` binding is lost |
| MCP-1 | Medium | Low | The tool documents this behaviour; it costs one extra parameter |
| MCP-2 | Medium | Low | Wrong in part: premium docs are already marked |
| TH-1 | Medium | Withdrawn | Could not be reproduced |
| TM-2 | Low | Closed | Fixed upstream, in 7.5.0-rc.0 |
| WC-1 | Low | Withdrawn | A scoped theme provider exists; the remaining gap is already an open request |
| IC-1 | Low | Withdrawn | The internal icon names are documented |
| TH-2 | Low | Low | Narrowed: most of the "missing" tokens have a supported token or variable |
| CFG-1 | Low | Low | Narrowed: one part was our own usage, one part is fixed in 15.9.0 |
| TY-1, FX-1, ST-1 | Low | Low | Details corrected |
| ST-2, MCP-4, MCP-5, MCP-6, TH-4 | — | Medium | New: found by the fact-check, the re-test and the native-tool round |
| MCP-3, MCP-7, MCP-8, DOC-1, PB-1, GL-5 | — | Low | New, same sources |

### Other statements corrected

- **"The briefs asked for free components only."** Only the M3 L4 brief had an MIT allow-list. The
  M3 L5 brief asked for the licence to be confirmed; "use the free controls" came from the lecturer
  on 11 Nov. The M3 L4 brief also chose ApexCharts as a showcase, so licence was not the only
  reason for it.
- **"Controls that needed no workaround at all."** Card, input group, list, banner and both
  progress bars each needed an override or an added label. The list is corrected in section 3.
- **"From memory and the typings."** For the first M3 L5 build the model also read the skill
  reference files that ship inside `node_modules/igniteui-angular/skills`.
- **"Each wrote `scripts/mcp-call.mjs`."** The first M3 L5 session used a throw-away client; the
  script in its repo was copied from M3 L4 on 12 Nov. "Saved every call" was also too strong: 64
  MCP answers are logged, and a few listing and search calls were not.
- **"`ai-config` wrote the skills twice."** The M3 L4 project ran it with no flags, and writing to
  both `.claude/skills` and `.agents/skills` is the default for that.
- **"Both apps added a focus outline."** Only M3 L4 did.
- **"More than 30 component themes"** cannot be shown from the logs: 13 theme calls are logged, and
  the two stylesheets hold 23 generated theme blocks each, with the light block shared.
- **ApexCharts licence.** Using the Community licence is the lecturer's own assessment, not a
  settled fact, and the M3 L5 README still lists it as open.

---

## 1. Context: how the apps were generated

### Stack

| Package | Round 1 | Round 2 | Licence field on npm | Role |
|---|---|---|---|---|
| `@angular/*` | 22.2 | 22.2 | MIT | Standalone components and signals |
| `igniteui-angular` | 22.2.4 | 22.2.6 | "SEE LICENSE IN LICENSE" (dual) | Every control except the charts |
| `igniteui-grid-lite` | 0.11.0 | 0.11.0 | MIT | Behind `igx-grid-lite` (optional peer of `igniteui-angular`) |
| `igniteui-webcomponents` | 7.4.1 | 7.4.1 | MIT | `igc-tile-manager`, M3 L4 only |
| `igniteui-theming` | 29.1.1 | 29.1.1 | MIT | Sass theming (comes with `igniteui-angular`) |
| `igniteui-cli` MCP server | 15.8.2 | 15.9.0 | MIT | Component docs, API reference, import lookup |
| `igniteui-theming` MCP server | 29.1.1 | 30.2.0 | MIT | Palette, typography and component themes |
| `apexcharts` / `ng-apexcharts` | 8.7.0 / 3.2.0 | same | "SEE LICENSE IN LICENSE.md" | Every chart |

On 13 Nov 2026 `igniteui-grid-lite` 0.11.0 and `igniteui-webcomponents` 7.4.1 were still the latest
stable releases, so round 2 could only move `igniteui-angular` forward. The release candidates
(`igniteui-angular` 22.3.0-rc.0, `igniteui-grid-lite` 0.12.0-rc.0, `igniteui-webcomponents`
7.5.0-rc.0) were tested in a scratch copy and not adopted.

**Licence.** Both apps use only the components on the MIT list in
`node_modules/igniteui-angular/LICENSE`, plus Grid Lite and the MIT web components. `igx-grid` and
its relatives, `igniteui-angular-charts`, `-gauges`, `-dashboards` and the Dock Manager were not
used.

### Models and sessions

All work was done in Claude Code (the desktop app's Code tab) on Windows 11. Each app was written
from a brief prepared beforehand (`CLAUDE.md` in the app folder).

| When | App | Model | What it did |
|---|---|---|---|
| 1 Nov 2026 | M3 L5 | Claude Opus 5.5 | First version with no MCP access. Then set up the MCP servers, regenerated the theme through the theming server, did a UX pass and added Bulgarian |
| 1–2 Nov 2026 | M3 L4 | Claude Opus 5.5, extra-high effort | The whole app in four phases, MCP-first, with a check-in after each phase |
| 4 Nov 2026 | M3 L4 | Claude Opus 5.5 | Bulgarian version, commit and push |
| 12 Nov 2026 | M3 L5 | Claude Fable 5.2 | UI/UX review: moved the log to Grid Lite, added four charts, first axe run, window-size scaling, commit and push |
| 13 Nov 2026 | both | Claude Fable 5.2 as supervisor; Sonnet 5.5 and Haiku 5.5 as workers | Round 2, described in sections 2 and 5 |

Round 2 was split by cost. Fable 5.2 planned, judged the evidence, re-rated the findings and wrote
this document. Sonnet 5.5 re-tested the findings on newer packages, fact-checked version 1 and
reworked the two apps. Haiku 5.5 searched the issue trackers, and every match it reported was
opened and confirmed before it went into this document.

### MCP servers and skills

Both apps carry the same `.mcp.json`, and for round 2 a copy sits at the project root:

```json
{
  "mcpServers": {
    "igniteui-cli":     { "command": "npx", "args": ["-y", "igniteui-cli", "mcp"] },
    "igniteui-theming": { "command": "npx", "args": ["-y", "igniteui-theming", "igniteui-theming-mcp"] },
    "apexcharts":       { "command": "npx", "args": ["-y", "apexcharts-mcp"], "env": { "APEXCHARTS_MCP_PRODUCTS": "charts" } }
  }
}
```

In the M3 L5 project, `npx -y igniteui-cli ai-config --agents claude --assistants generic -f angular`
wrote the first two entries, copied five agent skills into `.claude/skills/` (components, grids,
theming, figma-to-app, generate-from-image-design) and wrote a generic Angular `.claude/CLAUDE.md`.
The M3 L4 project ran `ai-config` with no flags, which also writes `.agents/skills/` and
`AGENTS.md`. The ApexCharts entry was added by hand in both.

**Round 1 never had the servers as native tools.** In both projects `.mcp.json` was created in the
session that then needed it, and a running Claude Code session did not pick the servers up. The
installed skill says so and tells the agent to ask for a session reload and stop. The M3 L5 model
did ask; the lecturer answered in the same session, and from then on both models called the servers
through a small stdio JSON-RPC client instead. Round 1's tool use was therefore `tools/list` and
`tools/call` from a script: the same answers, but no experience of the tools in an agent's tool
picker. Section 2 covers the native round.

**Tools called in round 1**

| Server | Tools | Used for |
|---|---|---|
| `igniteui-cli` | `list_components`, `get_doc`, `get_api_reference`, `search_docs`, `resolve_import` | Picking a control, reading its doc before writing it, checking an event or input, confirming every import path |
| `igniteui-theming` | `detect_platform`, `create_custom_palette`, `create_typography`, `get_component_design_tokens`, `create_component_theme` | The light deck theme, a dark theme scoped to one view, and a theme per component variant |
| `apexcharts` | `apexcharts_list_types`, `apexcharts_get_reference`, `apexcharts_generate_config`, `apexcharts_validate_config` | A starting config per chart type, and validation of every config that ships |

Never called in round 1: `search_api`, `get_project_setup_guide`, `create_theme`, `create_palette`,
`set_size`, `set_spacing`, `set_roundness`, `get_color`, `read_resource`.

The M3 L4 app saved 64 MCP answers in
[`mcp-log/`](https://github.com/turbobobbytraykov/sk03_kbc-it-academy-sm-po/tree/btraykov/add-m3l4-case-app/m3l4-case-app/mcp-log),
and `BUILD-NOTES.md` maps each screen to the tool behind it. The M3 L5 app logged only the calls of
12 Nov.

### Checks the models built for themselves

Scripts on `playwright-core` driving the installed Edge: screenshots of every screen and state at
several window sizes, an axe scan of each, a search for the trial-watermark element, a text-size
check that reads through shadow roots, an interaction script that fails on any console error, and a
`file://` check of the single-file build. Most of the problems in section 4 were found by these
scripts, not by reading code. Round 2 adds a check of the browser's own accessibility tree, because
axe alone misled both models on Grid Lite.

### Controls used

| App | From `igniteui-angular` | Other |
|---|---|---|
| M3 L5 | navbar, button, button group, card, chip, circular and linear progress, dialog, input group, switch, icon, Grid Lite | — |
| M3 L4 | navbar, button, tooltip, button group, card, chip and chips area, badge, avatar, list, stepper, banner, dialog, input group, icon, Grid Lite | `igc-tile-manager` |

The first M3 L5 version also used `igx-select` and `igx-snackbar`. The snackbar was removed after
the lecturer said it covered the bottom row of the screen. The select was replaced by five
always-visible role buttons in the model's own UX review. Neither was removed for a defect.

---

## 2. The MCP servers as native tools (round 2)

**Do the servers attach as native tools? Yes, to a session that starts after `.mcp.json` exists.**
Round 2 put a `.mcp.json` at the project root. The session that was already running did not pick
it up. Every session started afterwards did, with no approval prompt, and so did the supervising
session once it had restarted. The tools appear as `mcp__igniteui-cli__*`,
`mcp__igniteui-theming__*` and `mcp__apexcharts__*`. For a short while the client listed the two
Ignite UI servers as "pending" although their tools already answered.

**Calls made natively**, counted from the session transcripts:

| Session | Model | `igniteui-cli` | `igniteui-theming` | `apexcharts` | Total |
|---|---|---|---|---|---|
| M3 L4 rework | Sonnet 5.5 | 23 | 14 | 5 | 42 |
| M3 L5 rework | Sonnet 5.5 | 15 | 12 | 2 | 29 |

By tool: `get_component_design_tokens` 14, `get_doc` 12, `search_docs` 9, `get_api_reference` 8,
`search_api` 4, `create_component_theme` 3, two each of `detect_platform`, `set_size`,
`set_spacing`, `read_resource`, `resolve_import` and `get_project_setup_guide`, and one each of
`list_components` and `create_palette`. Each session kept a call-by-call log with a verdict per
call; they are the most detailed feedback in this repository:
[M3 L4 notes](https://github.com/turbobobbytraykov/sk03_kbc-it-academy-sm-po/blob/btraykov/add-m3l4-case-app/m3l4-case-app/mcp-log/NATIVE-MCP-NOTES.md),
[M3 L5 notes](https://github.com/turbobobbytraykov/sk03_kbc-it-academy-sm-po/blob/m3l5-case-app/m3l5-case-app/mcp-log/NATIVE-MCP-NOTES.md).

**What worked well**

- **`resolve_import`.** Both sessions, independently, called it the best tool of the three servers:
  small, exact, platform-aware, several symbols in one call.
- **`get_api_reference` with `section` or `member`.** Answers of a few hundred tokens that settle
  one question.
- **`create_component_theme`.** Paste-ready, picks the schema, accepts `var(--ig-…)` as a token
  value, and reminds the agent to scope a dark variant. Sass from the 30.2.0 server compiled
  unchanged against the installed 29.1.1.
- **`read_resource`.** The spacing-and-sizing resource explains `--ig-size` and `--ig-spacing` in
  under 1,000 tokens.
- **Clear negative answers.** `list_components` saying "no components found" and `get_doc`
  pointing to `list_components` saved guessing.

**What got in the way** (each is a finding in section 4)

- The theming server's tool definitions are very large (MCP-4).
- The token tool tells the agent not to use the tokens it came for, and does not list the
  documented CSS variables (MCP-5). The two sessions reached opposite conclusions about the same
  input label because of it.
- The API reference leaves out inherited members (MCP-6).
- Multi-word searches return noise or nothing (MCP-7).
- `set_size` and `set_spacing` answer the same way for components that ignore them (MCP-8).
- Doc pages are 8,000 to 12,000 tokens each with no way to ask for a section, and several have
  defects (DOC-1).
- `detect_platform` looks for `package.json` in the folder the server started in (MCP-1).

**Native against scripted.** The answers are the same. In practice: natively the agent reads every
description and schema, which is where MCP-4 costs; a scripted call can take its arguments from a
file and log the answer automatically, where a native `apexcharts_validate_config` needs the whole
config typed into the call and leaves a record only in the transcript.

---

## 3. What the models found easy

**Writing components without the MCP servers worked.** Opus 5.5 wrote the first M3 L5 version with
no MCP access, from what it knew, the typings and the skill reference files that ship in
`node_modules/igniteui-angular/skills`. The first `ng build` was clean. The per-component entry
points (`igniteui-angular/card`, `igniteui-angular/dialog`, …), the `IGX_*_DIRECTIVES` constants
and the standalone components are regular enough to get right. The brief had both progress
selectors wrong (`igx-circular-progress` and `igx-linear-progress` for `igx-circular-bar` and
`igx-linear-bar`); the model corrected them without a failed build.

**The skills ship inside the npm package.** A session with no MCP server can still read them. That
is what made the first build work, and it is worth saying in the docs.

**`ai-config` is one command.** It produced a working `.mcp.json`, the skills and the agent rules,
and both servers answered at once.

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
  GL-3).

**The theming server's output is paste-ready.** `create_component_theme` with `selector`, `variant`
and a few primary tokens returns a `*-theme()` call plus `@include tokens(...)` under that selector.
That made named variants cheap: `.btn-accent`, `.card-dark`, `.chip-nodata`, `.scene-stepper`,
`.log-grid`. `get_component_design_tokens` splits tokens into "primary, use these" and "available,
do not use unless asked", which kept the models from over-specifying themes.

**A light theme and a dark theme on one page.** `create_custom_palette` with `variant: dark` gave a
dark palette with no validation warnings, and scoping it to `.ops` worked.

**`create_custom_palette` with explicit shades.** The brand primary is a very dark navy (`#003E61`).
With the 29.x server the model pinned shades 50, 400 and 500 to the three brand colours and still
got a valid Ignite palette. The 30.x server now says to prefer `create_palette`, which derives
every shade from a seed of any lightness, so this step may no longer be needed.

**Web components pick up the Angular theme's palette.** Grid Lite and the tile manager read the
`--ig-*` palette variables, so the scoped dark theme reached them with no extra work. `--ig-size`
set their density.

**Icons without the icon font.** `IgxIconService.addSvgIconFromText` and `setIconRef` let the apps
register inline SVG and re-point the components' own icon references, so nothing loads from a font
CDN.

**Grid Lite through the Angular wrapper.** Declarative `igx-grid-lite-column` elements and
`igxGridLiteCell` templates took Angular content (chips, icons, buttons with click handlers), and
the grid scrolls inside itself. It also exposes a complete ARIA grid with no work from the app.

**Licence compliance can be tested.** `igniteui-trial-watermark` gives a concrete element to look
for. The screenshot script fails if it appears, so "no commercial component slipped in" became an
automated check. `list_components` marks premium docs with a star and `get_doc` carries
`premium: true` in its front matter, which is the same information at the point of choice.

**Controls that needed nothing beyond their documented inputs:** dialog (`isOpen`,
`closeOnEscape`, close on outside click), button group (`selectionMode`, `[selected]`), avatar,
badge, switch, and the chip's `variant="success|warning|danger"`.

---

## 4. Findings

Each item has an ID so it can become a work item. Status columns: **latest** is `igniteui-angular`
22.2.6 with `igniteui-grid-lite` 0.11.0 and `igniteui-webcomponents` 7.4.1; **next** is 22.3.0-rc.0,
0.12.0-rc.0 and 7.5.0-rc.0, tested in a scratch copy of the M3 L4 app on 13 Nov 2026. **Tracker**
is the closest issue or pull request found in the public `IgniteUI` repositories; "none found"
means a search of a few queries per item, not proof of absence.

### Summary

| ID | Area | Problem | Kind | Priority | Latest / next | Tracker |
|---|---|---|---|---|---|---|
| TM-1 | Tile manager | Throws when a tile is added to a connected manager that has not rendered, and then stops slotting tiles | Bug | High | present / present | none found |
| BTN-1 | Button | A static `aria-label` on `igxButton` is removed | Bug | Medium | present / present | none found |
| CH-2 | Chip | A stand-alone chip is an `option` with no listbox; axe critical | Accessibility | Medium | present / present | closed 2021, [8935](https://github.com/IgniteUI/igniteui-angular/issues/8935) |
| GL-2 | Grid Lite | Header and cell font sizes fixed inside shadow roots | Feature gap | Medium | present / present | none found |
| GL-3 | Grid Lite | README and JSDoc show a cell-template context that does not exist | Docs bug | Medium | present / present | none found |
| MCP-4 | Theming MCP | Tool definitions total about 128,000 characters | Cost | Medium | server 30.2.0 | none found |
| TH-4 | Theming | Palette code from the 29.x MCP server does not compile on theming 30 | Upgrade break | Medium | n/a / present | none found |
| ST-2 | Stepper | Steps created in an `@for` show "NaN" as their number on first draw | Bug | Medium | present on 22.2.6 / not tested | none found |
| MCP-5 | Theming MCP | The token tool says "do not use" for a component's only tokens, and omits documented CSS variables | Tool design | Medium | server 30.2.0 | none found |
| MCP-6 | CLI MCP | The API reference omits inherited members (`value`, `max` on the progress bar) | Data bug | Medium | cli 15.9.0 | none found |
| GL-1 | Grid Lite | One role is an attribute and the rest are internals, so axe reports two false criticals | Tooling | Low, cheap fix | present / present | [PR 79](https://github.com/IgniteUI/igniteui-grid-lite/pull/79) added the roles |
| CH-1 | Chip | `[class]="expr"` on `igx-chip` is swallowed by an unused input | Bug | Low | present / present | closed 2018, [2683](https://github.com/IgniteUI/igniteui-angular/issues/2683) |
| MCP-1 | Theming MCP | `detect_platform` is "ambiguous" for Angular plus web components | Design | Low | servers 29.1.1 and 30.2.0 | none found |
| MCP-2 | CLI MCP, skills | No positive "MIT" marker; no tier in `resolve_import` or the API reference | Feature | Low | cli 15.9.0 | none found |
| MCP-3 | Theming MCP | Tokens for `grid-lite` are the full grid's token list | Docs | Low | servers 29.1.1 and 30.2.0 | none found |
| TH-2 | Theming | A few sizes have neither a token nor a variable | Feature gap | Low | present / present | open, [2417](https://github.com/IgniteUI/igniteui-webcomponents/issues/2417) |
| TY-1 | Typography | Small defaults for projected screens; card content does not inherit size | Feature / docs | Low | present / present | open, [373](https://github.com/IgniteUI/igniteui-theming/issues/373) |
| ST-1 | Stepper | No way to use it as navigation only | Feature | Low | present / present | none found |
| FX-1 | Focus | Focus on flat buttons and steps is faint | Accessibility | Low | present / present | none found |
| PB-1 | Progress | Progress bars have no accessible name unless the app adds one | Docs | Low | present | none found |
| CFG-1 | `ai-config` | No restart hint in the console output; generated rule conflicts with axe on Grid Lite | Docs | Low | partly changed in 15.9.0 | closed, [1864](https://github.com/IgniteUI/igniteui-cli/issues/1864) |
| GL-5 | Grid Lite | How page styles reach cell templates (`adopt-root-styles`) is undocumented | Docs | Low | present | none found |
| MCP-7 | CLI MCP | Multi-word `search_api` and `search_docs` queries return noise or nothing | Tool quality | Low | cli 15.9.0 | none found |
| MCP-8 | Theming MCP | `set_size` and `set_spacing` do not say when a component ignores them | Tool design | Low | server 30.2.0 | related, [2417](https://github.com/IgniteUI/igniteui-webcomponents/issues/2417) |
| DOC-1 | Docs via MCP | Large pages, web-component leftovers in Angular pages, dead links, a truncated table | Docs | Low | cli 15.9.0 | none found |
| GL-4 | Grid Lite | Needs a second package | Information | — | present / present | none found |
| CH-3 | Chip | Content capped at 32ch, no token | By design | — | present / present | closed 2019, [5776](https://github.com/IgniteUI/igniteui-angular/issues/5776) |
| TM-2 | Tile manager | Tile content does not fill the tile | Fixed | Closed | present / fixed | [PR 2496](https://github.com/IgniteUI/igniteui-webcomponents/pull/2496) |
| WC-1 | Web components | "One global theme" | Withdrawn | — | — | open, [2537](https://github.com/IgniteUI/igniteui-webcomponents/issues/2537) |
| TH-1 | Theming | "Derived chip text at 1.9:1" | Withdrawn | — | not reproduced | — |
| IC-1 | Icons | "Internal icon names undocumented" | Withdrawn | — | — | — |

### Tile manager (`igniteui-webcomponents`)

**TM-1. A tile added before the first render throws, and the manager then stops working.**
`components/tile-manager/position.js` calls
`this._manager.renderRoot.querySelector('slot').assign(...this._tiles)` with no guard. The callers
are `firstUpdated` and the manager's `MutationObserver` callback.

```
TypeError: Cannot read properties of null (reading 'assign')
    at assignTiles
    at _observerCallback
    at MutationObserver.<anonymous>
```

Version 1 said this happens whenever tiles are created in the same pass as the manager. That was
too broad. In a plain page, twelve orderings were tried and do not throw: tiles in the initial
markup, tiles added before the manager is connected, a synchronous append right after connecting,
appends in a microtask, a timeout, an animation frame or after `updateComplete`, and remove and
re-add. It throws when **another `MutationObserver` already has a pending record earlier in the
same task**, the manager is then connected, and a tile is appended synchronously. All observers
share one notification microtask, so it runs before Lit's first-update microtask: the render root
exists, the template is not rendered, and the slot is `null`.

A framework makes that combination ordinary. In the M3 L4 app with the workaround removed, the
error reproduces every time the scene with the tile manager is entered at run time, and not when
the page loads directly on that scene. Angular appends the manager into a detached element,
connects it, and inserts the tiles while the manager is connected but not yet updated.

The effect is worse than the console error. The observer helper disconnects, runs the callback and
then observes again; when the callback throws, it never observes again. A tile added later is not
slotted (two tiles in the DOM, one assigned).

Behaviour is identical in 7.4.1 and 7.5.0-rc.0. The app's workaround is to await the manager's
`updateComplete` in `afterNextRender` and only then render the tiles.

*Suggested:* guard the missing slot and re-run the assignment in `firstUpdated`; observe again in
a `finally`.

**TM-2. Tile content does not fill the tile. Fixed upstream.** In 7.4.1 the tile's `base` part is a
block and the content area is only as tall as its content, so both apps' charts needed
`::part(base)` and `::part(content-container)` rules. PR 2496 (merged 22 Oct 2026) makes the base
a flex column and lets the content container take the remaining height; the change is in
7.5.0-rc.0. It was read in the source, not rendered.

**WC-1. Withdrawn.** Version 1 said web components have one global theme because
`configureTheme()` is global. `igc-theme-provider` has scoped a theme and variant to part of a page
since 6.5.0 (20 Jan 2026). None of the round-1 models found it. What a provider does not scope is
the palette, typography and elevation variables, which the theme files write to `:root`; that is
open feature request 2537.

Round 2 adopts the provider around the M3 L4 ops view in place of the global call. The tile manager
follows it: the result is pixel-identical to the global call, and a control test with a
Bootstrap light provider visibly changed the tiles. Grid Lite does not follow it and takes its
colours from the `--ig-*` variables. Two things for the docs: the provider has an API entry but no
doc page (`search_docs` and `get_doc` find nothing), and the themes overview mentions only
`configureTheme`.

### Chip, button and stepper (`igniteui-angular`)

**BTN-1. `igxButton` removes a static `aria-label`.** The directive has the host binding
`[attr.aria-label]: _label()`, fed by the `igxLabel` input. With no `igxLabel`, the binding
resolves to null and removes whatever the template set. Tested on 22.2.6 and 22.3.0-rc.0:

| Template | `aria-label` on the element |
|---|---|
| `<button igxButton aria-label="x">` | none (removed) |
| `<button igxButton [attr.aria-label]="'x'">` | none |
| `<button igxButton igxLabel="x">` | `x` |

Version 1 called this a documentation point. It is more than that: `aria-label` is the attribute
every developer and every code generator reaches for, it fails without an error, and on an
icon-only button the result is a control with no accessible name. The model found `igxLabel` only
by reading the typings.

*Suggested:* leave an author's `aria-label` in place when `igxLabel` is not set.

**CH-2. A chip used as a label fails axe, correctly.** `IgxChipComponent` sets `role="option"` as a
real attribute and `tabindex="0"` unless disabled. Outside an `igx-chips-area` there is no listbox,
so axe reports `aria-required-parent` (critical) on every stand-alone chip; a test page with eleven
of them failed on all eleven. Unlike GL-1 this is not a tooling artefact. Chips as read-only status
labels are common, and for those a one-option listbox is the wrong semantics and the tab stop is
unwanted. The package README mentions neither. The accessibility design dates from issue 8935
(closed 2021), which covers chips inside a chips area only. The chip doc that `get_doc` returns has
no accessibility section, and the library-wide accessibility page lists the chip for keyboard
behaviour only. `igx-badge` is documented as a non-interactive status control with `role="status"`,
but it is a count or a dot, not a label with text.

*Suggested:* a static mode with no option role and no tab stop, or documentation of the wrapper
requirement.

**CH-1. `[class]="expr"` on `igx-chip` is lost.** The component declares an input named `class`,
marked `@hidden @internal`, initialised to an empty string and never read. Angular routes a
whole-value `[class]` binding to that input, so it never reaches the element, with no error.

| Template | Classes on the host |
|---|---|
| `class="a"` | `a igx-chip` |
| `[class]="'b'"` | `igx-chip` (lost) |
| `class="a" [class]="'b'"` | `a igx-chip` (bound part lost) |
| `[class.c]="true"` | `c igx-chip` |
| `[ngClass]="'d'"` | `d igx-chip` |

Version 1 said only a static class works. `[class.name]` and `[ngClass]` work too, so the M3 L4
status chip did not need its two duplicated template branches; round 2 removes them.

*Suggested:* delete the unused input.

**CH-3. Chip text is capped at 32ch. By design.** The cap is in the component styles, has been
specified since issue 5776 (2019), and comes with an ellipsis and the native tooltip. The only
feedback left is that there is no token for it; a longer Bulgarian label needed
`::ng-deep .igx-chip__content { max-width: none }`.

**ST-2. Steps created in a loop show "NaN".** Reproduced on 22.2.6 in the M3 L4 app, in an
`OnPush` component:

```html
<igx-stepper orientation="horizontal" titlePosition="end" [linear]="false">
  @for (s of scenes; track s.n) {
    <igx-step [active]="scene() === $index">
      <span igxStepTitle>{{ s.title }}</span>
    </igx-step>
  }
</igx-stepper>
```

All seven indicators read "NaN" on load and turn into 1 to 7 after the first key press. The default
indicator renders `index + 1`, and the stepper appears to write each step's index after the steps
have been drawn once, with nothing marking them for another check; that cause was read from the
source, not proved. Round 1 hit this and worked around it with an explicit
`<span igxStepIndicator>`, and version 1 of this document left it out. The stepper doc does not
mention it; its own loop examples all pass an explicit indicator. Not tested on 22.3.0-rc.0 or
outside `OnPush`.

*Suggested:* mark the steps for check when their index is assigned.

**ST-1. Stepper used as navigation only.** M3 L4 uses a horizontal stepper as a scene switcher,
with the content drawn elsewhere. No input hides the content area (`contentTop` only moves it), so
the app uses `::ng-deep .igx-stepper__body { display: none }`.

**FX-1. Faint focus indication.** On keyboard focus a step gets a 1px inset ring and a flat button
a background change; the library draws no outline, and the button theme has focus colour tokens but
no outline token (confirmed through `get_component_design_tokens` for the flat, outlined and
button-group themes). Over a compressed screen share, or on a pale page, neither is easy to see.
M3 L4 added one outline rule in round 1 and M3 L5 added one in round 2.

**PB-1. Progress bars need a name from the app.** axe flagged `igx-linear-bar` and
`igx-circular-bar` as unnamed until the app added `[attr.aria-label]`. That is normal for a
progress bar, but the docs should say it. The two progress docs have no accessibility section, and
the library-wide accessibility page lists both as not documented yet for screen readers.

### Grid Lite (`igniteui-grid-lite`, `igx-grid-lite`)

**GL-1. axe reports two false criticals.** The grid's roles are set through `ElementInternals`
(`addA11y(host, role)` in `internal/a11y.js`: grid, row, columnheader, gridcell, with row and
column counts and indices). The one exception is `role="rowgroup"`, written as an attribute on
`igc-virtual-scroll` (`components/grid.js`). A checker that reads the DOM, such as axe-core 4.14
and therefore Lighthouse, sees a row group with no grid above it and no rows below it and reports
`aria-required-parent` and `aria-required-children`, both critical. The browser's accessibility
tree is complete.

The cost is not accessibility; it is that every project with an axe gate fails on a page with a
Grid Lite, and that the output sends people the wrong way. Opus 5.5 reported it as a library defect
it could not fix. Fable 5.2 wrote a 50-line directive that copies the roles onto the elements as
attributes. Version 1 of this document then "verified" the defect by searching for `role=`. The
`.claude/CLAUDE.md` that `ai-config` generates requires every page to pass all axe checks, which is
what pushed both models to act on it. Round 2 removes the directive, scopes the two rules out of
the axe run for that one element, and adds a check of the accessibility tree instead.

*Suggested:* set `rowgroup` through internals like the other roles, or drop the attribute. A line
in the Grid Lite docs saying that roles come from `ElementInternals`, and that axe cannot see them,
would have saved three wrong conclusions here.

**GL-2. Text size cannot be themed.** `styles/header-cell/header-cell.css.js` sets
`font-size: 0.75rem` and `styles/body-cell/body-cell.css.js` sets `.8125rem`, inside shadow roots.
The styles read only `--ig-size` and the scrollbar variables. The row exports only its `cell` part;
whether the header can be reached another way was not tested. Both apps needed 18px text for a
projector or a screen share and use `zoom: 1.15` or `zoom: 1.2` on the grid. That works, but
`getComputedStyle` then reports the size before zoom, and sizes inside cell templates have to be
divided by the factor. Unchanged in 0.12.0-rc.0.

*Suggested:* CSS custom properties for header and cell font size, or follow the Ignite type scale.

**GL-3. The package's own docs show a cell context that does not exist.**
`igniteui-angular/grids/lite/README.md` lists `rowIndex` and `data` as template context and gives
`<ng-template igxGridLiteCell let-value let-data="data">`. The JSDoc example on
`IgxGridLiteCellTemplateDirective` in the typings repeats it, with `let-rowIndex` too. The actual
context (`IgxGridLiteCellTemplateContext`) has `value`, `column`, `row` and `parent`. The doc that
`get_doc` returns is correct. Opus 5.5 had fetched that correct doc five minutes earlier and still
wrote `let-data="data"` from the typings comment, because the typings were what it was reading
while it wrote the template. The app's own build notes then blamed "the doc". Unchanged in 22.2.6
and 22.3.0-rc.0.

*Suggested:* fix the README and the JSDoc example. A `data` shortcut in the Angular context would
also be reasonable, since reading the row's record is the usual reason to open the context.

**GL-4. A second package is needed.** `igx-grid-lite` needs `igniteui-grid-lite`, an optional peer.
Without it the build says `Could not resolve "igniteui-grid-lite"`, which is clear enough.

**GL-5. How page styles reach a cell template is undocumented.** A cell with a template is a custom
element with its own shadow root, and the Angular content of the template lives inside it. Page CSS
should not reach it, yet themed chips in cells look right. The reason, read from the source and
confirmed in the running page: the Angular wrapper sets the host attribute `adopt-root-styles`,
and each templated cell then copies every style sheet of the document into its shadow root and
keeps the copies in step with `<head>`. A cell in the M3 L4 app holds 21 adopted sheets, the whole
global style sheet among them. Nothing the MCP tools return mentions `adopt-root-styles`
(`search_docs` and `search_api` find nothing for it). It decides whether a template can be styled
from an ordinary style sheet, so it belongs in the Grid Lite cell-template doc. Round 1 met
contrast failures on chips in cells and never found out why; that cause is still unknown.

### Theming and the theming MCP server

**TH-4. Palette code generated a month ago does not compile on theming 30.** `igniteui-angular`
22.3.0-rc.0 brings `igniteui-theming` 30.2.0. The apps' palette, written by `create_custom_palette`
on the 29.x server, builds its surface family with numeric shades (`shades('surface', …, ('50' …
'A700'))`). On 30.2.0 that is an error: a surface family is now built from roles (`base`, `sunken`,
`raised`, `overlay`, `container`, `seed`). Adding `'base'` to the list makes the scratch copy
build; three new colour-contrast findings then appear, which were not diagnosed. This may be an
intended change with a migration, but as it stands a minor upgrade of `igniteui-angular` breaks
Sass that the product's own MCP server produced.

*Suggested:* a migration for generated palettes, or a deprecation period in which numeric surface
shades still compile.

**TH-2. A few sizes have neither a token nor a variable.** Version 1 listed five missing tokens.
Most of them turned out to have a supported route that round 1 did not find:

| Round 1 override | Supported route, used in round 2 | Where it is documented |
|---|---|---|
| Ring track colour, on `.igx-circular-svg__inner` | theme token `track-color` | token tool, component `progress-circular` |
| Ring thickness, `stroke-width` on the SVG | CSS variable `--stroke-thickness` | one example in the circular progress doc |
| Chip height and padding, on `.igx-chip__item` | `--ig-chip-size`, `--ig-spacing` | chip doc, "Custom sizing" |
| Chip text size, on `.igx-chip__content` | `--ig-body-2-font-size` | typography topic |
| Input label size, on `.igx-input-group__label` | `--ig-caption-font-size` | typography topic |

The ring override was also a real defect: it thickened the stroke without moving the radius, so the
M3 L5 clock ring had been clipped flat at its four edges since the first build.

Confirmed to have no supported route, and still overridden in M3 L4: the stepper's indicator size,
the banner's block padding and its empty actions container, the list's row gap, the navbar's title
alignment. `--ig-size` and `--ig-spacing` were tried on the stepper, banner and navbar in the
browser and change nothing there. Sizing guidance is the subject of open issue 2417.

**TH-1. Withdrawn.** Version 1 said a chip theme given only `background: var(--ig-gray-700)`
derived text at 1.9:1. The same call on servers 29.1.1 and 30.2.0 returns the same Sass as the
round-1 log. The derived text colour is `adaptive-contrast()`, a black-or-white pick; in the dark
scope it resolves to black on `#9DAFBD`, about 8:1, and the app with the extra `text-color` removed
has no contrast finding. The 1.9:1 figure appears only in a code comment the model wrote. The
contrast failures of that evening were on chips inside Grid Lite cells and were still failing after
the "fix", which points at GL-5 and not at the theme.

**TY-1. Typography defaults.** The Material preset's button text is 14px. `igx-card-content`
applies the body-2 size to its children, so a font size set on the card is not inherited. Material
`h1` is 96px with a 112px line height and 28px and 56px margins, which costs about a tenth of a
1080px screen when a page uses a plain `h1`. None of this is wrong; apps that need 18px text
everywhere have to know all three. A fluid type scale is open request 373.

### MCP servers, `ai-config` and the skills

**MCP-4. The theming server's tool definitions are very large.** Measured on 13 Nov 2026 with
`tools/list`:

| Server | Version | Tools | Descriptions plus schemas |
|---|---|---|---|
| `igniteui-cli` | 15.9.0 | 7 | 14,400 characters |
| `igniteui-theming` | 30.2.0 | 15 | 128,500 characters |
| `apexcharts-mcp` | 0.14.1 | 5 | 4,400 characters |

`create_custom_palette` alone is 52,400 characters, of which 45,300 are its input schema: the same
colour pattern is repeated for every shade of every colour family. An agent that loads all tool
definitions at session start pays roughly 30,000 tokens for this server before doing anything. A
client that loads tools on demand still pays it the first time it searches for a theming tool. The
descriptions themselves are good (use cases, workflow, related tools), which is why they are worth
keeping short enough to afford.

*Suggested:* define the colour pattern once and reference it; move long guidance out of the
descriptions into the resources the server already has.

**MCP-1. `detect_platform` answers "ambiguous" for Angular plus web components.** With
`igniteui-angular`, `angular.json` and `igniteui-webcomponents` in `package.json`, the server
reports two platforms at full confidence and asks for the platform on every later call. Same on
29.1.1 and 30.2.0. The tool's description documents this rule, so it is working as designed. It is
still the wrong answer for this case: `igniteui-webcomponents` is a declared optional peer of
`igniteui-angular` and is how an Angular app gets the tile manager.

A second point from the native round: with no argument the tool reads `package.json` in the folder
the server was started in. With `.mcp.json` one level above the app it fails with a file-not-found
error that does not say how to fix it. `packageJsonPath` works, though its description does not say
which folder a relative path is resolved from.

*Suggested:* treat `igniteui-angular` plus `angular.json` as Angular, and say in the error which
folder was searched.

**MCP-2. Licence tier.** Version 1 said nothing marks which components are commercial. That was
wrong. `list_components` says in its description and its output that a star marks premium docs (18
entries, including the full grids, the Dock Manager, the Dashboard Tile and every chart and gauge),
`get_doc` carries `premium: true` in the front matter of those docs, a doc named
`general-open-source-vs-premium` exists, the components skill calls the Dock Manager premium, and
the grids skill calls Grid Lite MIT. The round-1 models cross-checked the `LICENSE` file by hand
without using any of it. What remains: there is no positive "MIT" marker, only the absence of
"premium"; `resolve_import` and `get_api_reference` show no tier; and the skills do not mark
`igx-grid` or the charts at the point where they describe them.

**MCP-3. Tokens for Grid Lite.** `get_component_design_tokens` for `grid-lite` returns three
primary tokens and then the full grid's list of 93 others (grouping, Excel-style filtering,
summaries), none of which Grid Lite has.

**CFG-1. `ai-config`.**

- The console output (41 lines) does not mention that the agent session must be reloaded. The
  skills it installs do say so, and tell the agent to stop. A line in the console output would
  reach the person who runs the command.
- The generated `.claude/CLAUDE.md` requires all axe checks to pass. With Grid Lite that cannot be
  met without an exclusion (GL-1). Its rule to lazy-load feature routes also conflicted with a
  single-file build.
- 15.8.2 writes the entry `npx -y igniteui-cli mcp`; 15.9.0 writes `npx -y @igniteui/mcp-server`,
  after issue 1864 reported 18 to 19 second cold starts for the first form. The `.mcp.json` files
  in this repository still use the old entry.
- A one-shot mode, for example `npx igniteui-cli mcp call <tool> '<json>'`, would let scripts and
  CI reuse the tools without a hand-written client. Both round-1 models wrote one.

- The theming MCP server does not say which `igniteui-theming` version it runs. Started with `npx`
  from the project root it was 30.2.0 while the apps have 29.1.1 installed; started inside an app
  folder it is the installed 29.1.1. The component themes and a palette generated by 30.2.0 did
  compile against 29.1.1, so nothing broke here, but TH-4 shows the two can diverge.

**MCP-5. The token tool hides what it has.** Two separate problems, both seen in round 2 and
confirmed by calling the tool again.

- For a component with no "primary" tokens, the answer lists every token under "Available Tokens,
  DO NOT USE unless the user explicitly requests", and then closes with an instruction to use only
  the primary tokens above. `progress-circular` is such a component: its eight tokens include
  `track-color` and `diameter`. Read literally, the tool tells the agent not to use the token it
  came for.
- The tool lists theme tokens only. The documented CSS variables that do the sizing
  (`--stroke-thickness`, `--ig-chip-size`, the type-style variables) are not there, and a missing
  size token looks the same as a size that cannot be changed. Given the same question about the
  input label, one round-2 session concluded "no supported way" from the token list, and the other
  found `--ig-caption-font-size` through a doc search.

*Suggested:* when a component has no primary tier, say so and list the tokens plainly; add a "CSS
variables" section per component; say "not themeable" where that is the answer.

**MCP-6. The API reference omits inherited members.** `get_api_reference` for
`IgxLinearProgressBarComponent`, section `properties`, lists `cssClass`, `id`, `role`, `striped`,
`textAlign`, `textTop`, `textVisibility`, `type` and `valueMin`. It does not list `value`, `max`,
`animate`, `indeterminate` or `step`, which the component has through its base class and which the
doc page uses. An agent that trusts the reference would conclude the progress bar has no value.

*Suggested:* merge inherited members into each entry.

**MCP-7. Search.** `search_docs` requires every word of a query, so a concept query finds whatever
page happens to contain all the words: "status label read-only" returned the Excel workbook and the
time picker, and "grid lite styling css variables" returned nothing, with no hint about which word
removed the results. `search_api` with `platform: angular` and "chip read-only status label"
returned chart and Excel classes and not `IgxChipComponent`. A single identifier works well
(`configureTheme`, `IgcThemeProvider`). `search_api` also does not show a component's selector, so
"circular progress" does not lead to `igx-circular-bar`.

**MCP-8. `set_size` and `set_spacing` answer the same way for every component.** Asked to shrink
the stepper or tighten the banner, they return a confident CSS block (`igx-stepper { --ig-size: 1; }`).
In the browser neither component changes at any value. The sizing resource says that styles must
use `sizable()` or `pad()` to respond, but not which components do.

*Suggested:* a note in the answer when the component does not respond, or a table of which do.

**DOC-1. Doc content as the tools return it.**

- `get_doc` for chip, badge and stepper is 8,000 to 12,000 tokens each, much of it repeated sample
  code. A `section` argument, as `get_api_reference` has, would cut most calls to a tenth.
- The Angular badge page contains web-component material (`igc-badge`, `::part(base)`, a "Style
  Parts" table) and an empty Do/Don't table.
- The stepper page's `mcp:get_api_reference?…component=IgxStep` links do not resolve; the names
  are `IgxStepComponent` and `IgxStepperComponent`.
- The chip and stepper pages still teach `*ngFor` and `[ngClass]`, while the generated agent rules
  tell the model to use `@for` and class bindings.
- The library-wide accessibility page names `IgxGridComponent` in its front matter, which hides it
  from a search by component.
- `get_project_setup_guide` covers only new projects.

**IC-1. Withdrawn.** Version 1 said the internal icon reference names are undocumented. The
`icon-service` doc has an "Internal Usage" section with a table of alias, target icon and family
and a list per component. The models read the library source instead of asking for that doc. The
npm README does not carry it. Round 2 used the doc and found two gaps in it: the table ends in a
placeholder comment, so it cannot be trusted to be complete, and it omits the chip's `remove`
icon, which the chip template asks for. One snippet on that page also imports `IgxIconService`
from `igniteui-angular/core`, where `resolve_import` says `igniteui-angular/icon`.

### What the models missed

These are not defects. Each is something that exists and that two or three capable models did not
find, which says something about where it is surfaced.

| Exists | Where | What the models did instead |
|---|---|---|
| ARIA roles on Grid Lite | `ElementInternals` | Trusted axe; one wrote a directive to add roles |
| `igc-theme-provider` | web components since 6.5.0 | Used the global `configureTheme()` |
| `track-color`, `diameter` for the progress ring | theming, component `progress-circular` | Overrode an internal class |
| `--stroke-thickness`, `--ig-chip-size`, the type-style variables | component docs and the typography topic | Overrode internal classes; one round-2 session still missed the last |
| Premium markers | `list_components` star, `get_doc` front matter | Read the `LICENSE` file by hand |
| Internal icon reference names | `icon-service` doc | Read the library source |
| `[class.name]` on `igx-chip` | works | Duplicated a template |
| The correct cell-template context | `get_doc grid-lite-cell-template` | Copied the wrong example from the typings |
| "Reload the session, then stop" | the installed skill | One of two sessions carried on with a script |

---

## 5. What round 2 changed in the apps

Both apps moved to `igniteui-angular` 22.2.6 and were reworked by Sonnet 5.5 sessions with the
servers native, then reviewed and re-checked by the supervisor on fresh builds. The case content
and every number are unchanged.

**M3 L4** ([commit](https://github.com/turbobobbytraykov/sk03_kbc-it-academy-sm-po/commit/5886206))

- The accessibility check is corrected: the two axe false positives on Grid Lite are scoped out,
  and a new script asserts the grid, rows, column headers and cells in the browser's accessibility
  tree. The app's notes no longer call it a library defect.
- The status chip is one `igx-chip` with `[class.chip-nodata]` in place of two duplicated branches.
- `igc-theme-provider` scopes the web components' dark theme to the ops view.
- Every reach into an internal class was checked against the token tool and the docs. Two rules
  turned out to be dead code that had never matched (a stepper header class that does not exist,
  and a navbar rule written for a descendant when the class is on the host). The input label uses
  the typography variable. The rest stay, each with a comment naming what is missing.
- Icon references for the chip's `selected` and `remove` icons are re-pointed for offline use.
- Three layout defects are fixed; they are the only visible changes.

**M3 L5** ([commit](https://github.com/turbobobbytraykov/sk03_kbc-it-academy-sm-po/commit/b829ba3))

- The Grid Lite roles directive is removed, with the same corrected check as M3 L4.
- The clock ring uses the `track-color` token and `--stroke-thickness`. It is now a whole circle,
  slightly thinner; before, it was clipped flat at four edges.
- Chips and the input label are sized with documented variables. No override of an internal class
  is left; only the `zoom` on Grid Lite remains (GL-2).
- Buttons and links get a visible keyboard focus outline.

**Checks on the final builds.** M3 L4: all 15 screens clean at 1920×1080 and at the share size in
English and Bulgarian (no axe finding, no trial watermark, no console error), 40 of 40 interaction
checks, the accessibility-tree check in both languages, text sizes, the single-file build and 10 of
10 chart configs. M3 L5: all 14 screens clean in both languages at four window sizes, the
accessibility-tree check, both single-file builds and the chart configs. Not done: a screen-reader
test, and a check by a person clicking through.

---

## 6. ApexCharts, briefly

ApexCharts is not the subject of this document, but it was the other half of the same builds.

- **Use.** Fourteen static charts across the two apps: line, column, horizontal and stacked bar,
  range area with a line, heatmap, sparklines and a scatter chart. Configs live in one plain
  `charts.ts` per app with no Angular in it.
- **What helped most.** `apexcharts_validate_config`. Because the configs are plain objects, a script
  re-sends every shipped config to the validator. All fourteen pass with no errors or warnings. The
  Ignite UI servers have no equivalent that checks a finished template or theme, and that would be
  worth considering.
- **Problems.** `apexcharts_generate_config` returned placeholder categories ("Cat 1", "Cat 2") for
  timestamped series. `ng-apexcharts` loads the library with `import()`, which broke the single-file
  `file://` build until the bundle was re-built without code splitting. Charts and legend items were
  keyboard tab stops by default. Colours must be literals. A chart inside a flexible tile needed a
  `ResizeObserver` to get its height.
- **Licence.** The apps use the Community licence on the lecturer's assessment that the licensee is
  under the revenue threshold. No Premium add-on is imported, and every chart is static.

---

## 7. How far to trust this document

- **Method.** Version 1 was written by one model from the transcripts and logs. For version 2,
  three agents worked independently: one re-ran every finding against the latest and the
  release-candidate packages in scratch copies, with runtime tests where a claim could be tested;
  one searched the issue trackers; one fact-checked version 1 claim by claim against the
  transcripts, logs and package source. The supervisor confirmed the tracker matches by opening
  them and checked the accessibility tree directly.
- **Proved at run time on 13 Nov 2026:** GL-1 (accessibility tree and axe output), TM-1 (plain-page
  matrix on 7.4.1 and 7.5.0-rc.0, and the Angular app on 22.2.6), CH-1, CH-2 and BTN-1 (test
  components on 22.2.6 and 22.3.0-rc.0), MCP-1 and MCP-4 (the servers themselves), TH-1 (not
  reproduced), TH-4 (build of the scratch copy), ST-2 (one session, with a screenshot), GL-5 (adopted
  style sheets counted in the running page), MCP-5 and MCP-6 (the supervisor repeated the calls).
- **Reported by one or two worker sessions and not re-checked:** MCP-7, MCP-8, DOC-1, and the
  token-pass table behind TH-2 apart from the rows the supervisor probed (the input label and the
  dead navbar rule).
- **Confirmed in package source only:** GL-2, GL-3, GL-4, CH-3, TM-2 (the fix was read, not
  rendered), FX-1, TY-1, ST-1, MCP-2, MCP-3, CFG-1.
- **Still thin.** The tracker search used two or three queries per item and read only part of some
  long result lists, so "none found" is weak. The three new contrast findings on the release
  candidates were not diagnosed. Nothing was tested with a screen reader.
- **The lesson from GL-1.** A checker's output, a search of the source and two models agreeing were
  not enough. What settled it was asking the browser what it exposes. Findings in this document
  that rest on a tool's report alone are marked as such above.
