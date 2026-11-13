# Native MCP notes: M3 L5 case app, round 2 (13 Nov 2026)

The three servers (`igniteui-cli`, `igniteui-theming`, `apexcharts`) were attached as native tools
(`mcp__igniteui-cli__*`, `mcp__igniteui-theming__*`, `mcp__apexcharts__*`). Round 1 reached them only through
`scripts/mcp-call.mjs`. Nothing in this round went through that script except `scripts/validate-charts.mjs`,
which still does for the four shipped chart configs (and passed).

App: Angular 22, `igniteui-angular` 22.2.6, `igniteui-theming` 29.1.1 installed (the server in `.mcp.json` is
probably 30.x; see the theming rows), `igniteui-grid-lite` 0.11.0, ApexCharts 8.7.0.

**Call count: igniteui-cli 15, igniteui-theming 12, apexcharts 2 (29 in all).** Every row below is one call.

## Calls

| # | Tool | What I asked | Correct and sufficient? | Notes on names, descriptions, arguments, size, errors |
|---|------|--------------|-------------------------|---------------------------------------------------------|
| 1 | theming `get_component_design_tokens` | `progress-circular` | Correct list, **misleading framing**. | Eight tokens, among them `track-color` and `diameter`, but all eight sit under "Available Tokens, DO NOT USE unless the user explicitly requests" and the closing line says "Use ONLY the **primary tokens** above". There were no primary tokens. Read literally, it tells you not to use the one token you came for. A component with no "primary" tier should say so, or list everything as primary. No token for stroke thickness. |
| 2 | cli `search_api` | "circular progress", angular | Right component first, then noise. | `IgxCircularProgressBarComponent` is result 1, then nine unrelated hits (`CachedDataCloneStrategy`, `ErrorValue`, `IgxAvatarComponent`, geographic series...) that match "circular" or "progress" as a substring of prose. The selector is `igx-circular-bar`, and "circular progress" is only the doc's title; I had to know to look for "circular bar". Ranking by name match first and dropping hits that match only in a description would cut the tail. |
| 3 | theming `create_component_theme` | `progress-circular`, material light, selector `.clock-ring`, `track-color`, three fill colours, `diameter` | Correct. | Output is ready to paste, the `$schema` is chosen for me, the `name` argument gives the variable the name I wanted, and `var(--ig-primary-100)` is accepted as a token value. It compiled in this app (theming 29.1.1) with no change. Token values are validated against a colour regex *or* a free CSS string, so `var()` passes. The closing light/dark note is useful. |
| 4 | cli `get_doc` | `circular-progress` | Correct, and the **only place `--stroke-thickness` is documented**. | About 3k tokens. The gradient example shows `--diameter` and `--stroke-thickness` as plain CSS variables on the element. Neither is a theme token, so tool 1 cannot show it. The same doc names the element `igx-circular-bar`. A "CSS variables" list per component in `get_component_design_tokens` would have found it in one call. |
| 5 | theming `get_component_design_tokens` | `navbar` | Correct. | One primary token (`background`) and six more; nothing for height, padding or title alignment, which is what I was asking about. The answer to "is there a token for X" is "no", and the tool can only say that by omission. A line such as "Sizing: fixed by the component (min-height 3.5rem)" would help. |
| 6 | theming `get_component_design_tokens` | `chip` | Correct. | 4 primary and 44 other tokens, none for height or padding. |
| 7 | theming `get_component_design_tokens` | `input-group` | Correct. | 47 tokens, none for label size. The label size comes from the `caption` type style, which only a search of the docs reveals (row 13). |
| 8 | theming `get_component_design_tokens` | `flat-button` | Correct. | `focus-visible-background`, `-foreground` and `-border-color` exist; no outline token. |
| 9 | theming `get_component_design_tokens` | `button-group` | Correct. | 37 tokens, `item-focused-*` exist, none for an outline. The `item-focused-background` colours are the pale tint that is hard to see on a pale page. |
| 10 | theming `get_component_design_tokens` | `outlined-button` | Correct. | Same focus tokens as flat-button. Three calls to settle one question ("is there a focus ring token"); a single answer per family of buttons would do. |
| 11 | theming `get_component_design_tokens` | `grid-lite` | Correct, with a catch. | It returns `grid-theme()` and 93 tokens, the same as the licensed grid (`group-*`, `excel-filtering-*`, `grouparea-*`, `tree-filtered-text-color`...). Grid Lite has none of those features, so the list overstates what the component styles. No font-size token, which is why the app zooms the grid by 1.2. |
| 12 | theming `set_size` | `size: medium`, `component: chip` | Correct, but it could not answer what I needed. | Output: `igx-chip { --ig-size: 2; }`. It says nothing about the range being only 1 to 3, or that a chip can be sized past that with `--ig-chip-size`. The chip doc (row 16) has that. The default CSS output suits an Angular project that has Sass; a `sass` output is offered and I did not need it. |
| 13 | cli `search_docs` | "typography font-size css variable", angular | Useful. | Found the Typography topic (`--ig-<style>-font-size`, e.g. `--ig-h6-font-size`) and the input-group source of `--ig-caption-font-size`. The `>>>` `<<<` highlight markers make the excerpts hard to read; with AND semantics a long query often returns nothing. |
| 14 | cli `get_doc` | `navbar` | Correct. | About 3.5k tokens, mostly import boilerplate. No sizing section. |
| 15 | cli `get_api_reference` | `IgxNavbarComponent`, properties | Correct, short. | Six properties. Good size for the question. |
| 16 | cli `get_doc` | `chip` | Correct and the most useful of all. | About 9k tokens. The "Custom sizing" section documents `--size` and `--ig-chip-size`; the Typography topic (row 13) supplies `--ig-body-2-font-size`; `--ig-spacing` is in the theming resource. Together they replaced all the internal chip overrides. No accessibility section. |
| 17 | theming `set_spacing` | `spacing: 1.2`, `component: chip` | Correct. | `igx-chip { --ig-spacing: 1.2; }`. It worked as described: the chip's item and content padding both scale, so the total inline padding came to the same 1.5rem as before. |
| 18 | theming `read_resource` | `theming://docs/spacing-and-sizing` | Correct, concise. | Under 1k tokens, exactly the model I needed (`--ig-size` 1 to 3 only, `--ig-spacing` fractional). It does not mention the per-component size variables (`--ig-chip-size`) or the typography variables. The `available_resources` list in the tool description is a good index. |
| 19 | cli `get_doc` | `linear-progress` | Correct but silent on accessibility. | About 3k tokens. Nothing on an accessible name. |
| 20 | cli `get_api_reference` | `IgxLinearProgressBarComponent`, properties | **Incomplete.** | Lists `role` ("automatically set to progressbar"), `striped`, `type`, `valueMin` and a few more, but **not `value`, `max`, `animate`, `indeterminate` or `step`**, all of which the doc page uses. They are inherited from a base class that the reference does not merge in. A reader trusting the reference would think the component has no value. |
| 21 | cli `get_api_reference` | `IgxChipComponent`, properties | Correct, thin. | `role` is described as "Returns the role attribute of the chip"; it does not say what the role is (`option`) or why a read-only chip has one. No `ariaLabel` is listed, though the compiled source has one. |
| 22 | cli `search_docs` | "aria progressbar" | One irrelevant hit. | Returned the Grids & Lists page because a sample imports `igniteui-angular/progressbar`. |
| 23 | cli `search_docs` | "chip accessibility" | Mixed. | Nine results, of which the useful one is `interactivity-accessibility-compliance`, found only through the "Accessibility" in the name of other pages. |
| 24 | cli `get_doc` | `interactivity-accessibility-compliance` | **Answers the question honestly.** | The page lists Circular Progress, Linear Progress, Navbar, Button, Button Group, Dialog, Input Group and others as "Not documented yet for keyboard or screen-reader / ARIA", and Chip as keyboard only. That is the documented position: the docs say nothing either way. Its front matter lists `IgxGridComponent` as the component, which is wrong for a library-wide page and hides it from a component-named search. |
| 25 | cli `get_project_setup_guide` | angular | Not applicable to an existing project. | It is about `ig new` and `ng add`; it names `base` and `side-nav` templates. For an existing app it adds nothing, and it does not mention the MIT-versus-commercial split that decides which components an app may use, or that the grids are on the commercial list. It was a quick, small call. |
| 26 | cli `resolve_import` | five symbols in one call | Correct, my favourite. | One call returned the exact entry points, `igniteui-angular/chips`, `/grids/lite`, `/progressbar`, matching the app's imports. "Did you mean" support and the batch of 50 are well judged. It has no entry for the `IGX_*_DIRECTIVES` tokens in its description, though they resolve. |
| 27 | cli `search_docs` | "grid lite styling css variables", angular | **No result.** | Zero hits, with no hint (no "did you mean", no nearest doc). The query has four words and the tool ANDs them; one of them was missing from every page. Returning the best partial match, or saying which term eliminated the results, would help. I did not find a Grid Lite styling topic for Angular this way. |
| 28 | apexcharts `apexcharts_validate_config` | the reveal tally bar config, inline | Correct: `ok: true`, no errors or warnings. | Same answer as through `mcp-call.mjs`. Experience differences: the native call needs the whole config typed into the call (about 1.2k tokens), where the script reads it from disk; the native call shows its result as plain JSON with no wrapper. The structured `issues` list is easy to act on. |
| 29 | apexcharts `apexcharts_list_products` | none | Useful for a version check. | Reports `verifiedAgainst: 8.8.1`; this app is pinned to 8.7.0 on purpose. A validator that states the library version it checks against is exactly what a pinned project needs. |

## Token pass: every override that reaches an internal class

| Override (where) | What I asked | Result | Decision |
|------------------|--------------|--------|----------|
| `.clock-ring ::ng-deep .igx-circular-svg__inner { stroke }` (action-screen.scss) | Tokens for `progress-circular` (1), `create_component_theme` (3) | `track-color` is a token; `.igx-circular-svg__inner` reads `var(--track-color)` | **Replaced** by `$track-color: var(--ig-primary-100)` in the existing generated theme in `styles.scss`. |
| `.clock-ring ::ng-deep .igx-circular-svg__inner/__outer { stroke-width: 0.5rem }` | Same, plus `get_doc circular-progress` (4) | No token. The doc names `--stroke-thickness` as a CSS variable | **Replaced** by `--stroke-thickness: 0.4rem` on `.clock-ring`. The old rule also hid a defect: the ring's radius is computed from the variable, so a bigger stroke spilled outside the SVG and was cut flat at its four edges (see "Ring" below). |
| `.chip ::ng-deep .igx-chip__content { font-size }` | Tokens for `chip` (6), `search_docs` typography (13) | No token. The chip text is the `body-2` type style | **Replaced** by `--ig-body-2-font-size: 1.25rem`. |
| `.chip ::ng-deep .igx-chip__item { height: auto; padding }` | `chip` tokens (6), `set_size` (12), `set_spacing` (17), `get_doc chip` (16) | No token; `--ig-size` stops at 3 (2rem). `--ig-chip-size` (documented) sets the height; `--ig-spacing` scales the padding | **Replaced** by `--ig-chip-size: 2.3437rem` and `--ig-spacing: 1.2`. Chip box measured 236.3 x 49.5 px before and after at 1920x1080. |
| `.topbar ::ng-deep .igx-navbar { height; min-height; padding-inline }` (app.scss) | `navbar` tokens (5), `get_doc navbar` (14), `get_api_reference` (15) | No token for size or padding. And the rule **never matched**: in v22 the class `igx-navbar` is on the host itself (`igx-navbar.topbar.igx-navbar`), so `.topbar .igx-navbar` found nothing. The real `<nav>` keeps its own `min-height: 3.5rem; padding-inline: 1rem` | **Removed** (dead code). The bar is 90.1 px before and after. |
| `.igx-input-group--filled/--focused .igx-input-group__label { font-size }` (styles.scss) | `input-group` tokens (7), `search_docs` (13) | No token. The label uses the `caption` type style | **Replaced** by `igx-input-group { --ig-caption-font-size: 0.875rem }`. Idle label 21.1 px, floated label 18.5 px, as before. |
| `.log-grid { zoom: 1.2 }` (log-screen.scss) | `grid-lite` tokens (11) | No font-size token; Grid Lite hard-codes 0.75rem and 0.8125rem in its shadow roots (checked in `node_modules`) | **Kept**, comment already explains. |
| `.igx-button--contained/--outlined/--flat { @include tokens(...) }` (styles.scss) | | These are generated themes that use Ignite's own class as the selector, not overrides | Kept. |
| `igx-card-content`, `igx-icon` element selectors (case-view, log-screen) | | Component elements, not internal classes | Kept. |
| `--ig-icon-size`, `--ig-button-font-size`, `--ig-size` on the app | | Documented variables | Kept. |

Internal-class overrides left in the app: **none that reach an `igx-*__` internal**. What remains is `zoom` on the grid, plus the documented custom properties.

## Ring (work item 3)

Before this round the ring was a `stroke-width` override. Ignite computes the circle's radius from
`--stroke-thickness` (1.3px in Material), so a 0.5rem stroke centred on that radius spilled 0.25rem outside the SVG
box; the box clipped it, and the ring in the screenshots had flat sides. The documented variable moves the radius
as well, so the ring is whole. Track colour, fill colours and diameter are unchanged. 0.5rem made the digits touch
the ring, so it is 0.4rem. This is the only visible difference in the action screens (ring box 32,117 to 284,370).

## Keyboard focus (work item 5)

Ask: does the theming server have a focus token for buttons? `flat-button`, `outlined-button` and `button-group`
have `focus-visible-background`, `-foreground` and `-border-color` (button-group: `item-focused-*`). None gives an
outline width, style or offset. In Edge, every Ignite button had `outline: none` and showed focus only as a tint of
its background (16 per cent alpha for flat buttons), which is hard to see on the pale page.
Added to `styles.scss`: `button:focus-visible, a:focus-visible` get a 3px outline, 2px offset, in MID (3.9:1 on
PALE, 4.7:1 on white); on the navy top bar, BLUE (2.2:1 on PALE, so not used there). Button-group items draw it
inside (`outline-offset: -5px`), because they sit edge to edge and clip an outside ring. Inputs keep Ignite's own
focus border, because an outline around the bare `<input>` floated inside the group.
Deviation: the task said "the app's blue token". BLUE fails 3:1 on the pale page, so MID is used there.

## Progress bars and chips (work item 6)

What the docs say: nothing. The chip, linear-progress and circular-progress pages have no accessibility section.
The library-wide page (`interactivity-accessibility-compliance`) lists Circular Progress and Linear Progress as
"Not documented yet" for screen-reader and ARIA behaviour, and Chip as keyboard only. It adds that names for
icon-only controls must be provided in markup. The Linear Progress API reference says `role` defaults to
`progressbar`. The chip API says `role` "Returns the role attribute" (read only), and the chip source sets
`aria-selected`. So there is no documented supported alternative to `[attr.aria-label]` on the bars or to
wrapping the chips in `igx-chips-area`. Nothing changed.

## What would have saved me time

1. A "CSS variables" section next to the tokens in `get_component_design_tokens` (`--stroke-thickness`,
   `--diameter`, `--ig-chip-size`, the type-style variables). I found each one by searching the docs, and one of
   them (`--stroke-thickness`) by luck in an unrelated gradient example.
2. For a component with no "primary" tokens, do not print "Use ONLY the primary tokens above". For
   `progress-circular` it tells you not to use `track-color`.
3. A one-line answer when a property has no token: "Not themeable: size is fixed (min-height 3.5rem)". Absence from
   a list of 47 tokens is a slow way to learn it.
4. `get_api_reference` that merges inherited members. `IgxLinearProgressBarComponent` lacks `value`, `max` and
   `animate`.
5. `search_api` that returns the selector (`igx-circular-bar`) and ranks by name before prose.
6. A focus-ring note in the theming guidance: buttons have focus colour tokens but no outline token, and the
   default focus tint is weak on a pale surface.
7. `get_component_design_tokens grid-lite` that lists only what Grid Lite styles, not the 93 tokens of the
   commercial grid; and a note that Grid Lite takes its type sizes from fixed values.
8. Fix the front matter of the accessibility-compliance doc (it names `IgxGridComponent`), and add the ARIA facts
   for the progress bars and chip, since the docs are the only source.
9. `apexcharts_validate_config` accepting a path or a named saved config would save re-typing a 1 to 3k config;
   and `list_products` already says which library version the checks are for, which was a good touch.
10. The theming server here is probably 30.x while the app has 29.1.1. The tool output did compile unchanged, but
    nothing says which version of `igniteui-theming` the server runs, so I could not tell whether to expect that.
