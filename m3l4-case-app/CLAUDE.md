# M3 L4 — "Missed Signals" case app: the ops view

Project brief for Claude Code. Create `D:\BUBI\SkillO_2026\m3l4-case-app\` and copy this file into it as `CLAUDE.md`.

Written 1 Nov 2026, after the M3 L5 case app (`m3l5-case-app/`) was built and accepted. The case content below comes from the deck's case slides (`_deck-generator/content_m3l4.py`, the `THE CASE` block) and from `reference/FACTS.md`. **Do not invent case facts. Do not change any number.** All ops telemetry is invented, and it must be labelled that way on every screen it appears on (section 3).

---

## 1. What this is

A companion page Bobby screen-shares while he runs the case in **Module 3 Lesson 4, Observability & Monitoring**: the Bangladesh Bank theft of 4–5 February 2016, told as a detection story. The lesson is **online** (Teams, cameras mostly off), so the page will be seen through a compressed screen share, not on a projector.

It has two tabs:

1. **The case** — the premise, what will play out, and the decision the room has to make, all on one screen.
2. **The ops view** — the same case seen the way an IT operations team sees an incident: on dashboards and on an on-call/paging screen. One "scene" per case slide in the deck, so Bobby can switch between the slide and the matching screen.

**Audience:** about 20 per group, Scrum Masters, Product Owners and Product Managers. Deliberately non-technical. They will meet dashboards and paging tools in incident bridges, so the screens should look like that category of tool. They will never configure one.

**Bobby drives it.** There is no trainee mode, no login, no backend.

### The two problems this page exists to solve

Same feedback as the M3 L5 app. It comes from Bobby's earlier case studies with this group:

1. The group spent a long time working out the situation before it could start on what to do, and the questions were not readable on the fly. → **The decision and its three questions must always be one click away, and must look the same every time.**
2. Splitting a case across slides presents it well piece by piece, but there was no single place to review the premise, goal and questions together. → **Tab 1 holds all of it, and it opens as an overlay from any scene without losing the current scene.**

### The third thing it adds

The deck tells this case from the outside. The page tells it from the inside: what the screens would have shown, scene by scene, while every infrastructure panel stayed green. The lesson's spine is that *in an incident you can only ask the questions somebody decided, months earlier, to make answerable*. The ops view makes that visible: the panel that would have answered the question is the one that was never built.

---

## 2. Hard constraints

### Stack — reuse the M3 L5 app's setup

- **Angular 22 and `igniteui-angular` 22.2**, the same versions as `m3l5-case-app/package.json`. Copy its `scripts/` (`serve.mjs`, `single-file.mjs`), its `angular.json` build options and the token block of `src/styles.scss` as a starting point. **Do not edit `m3l5-case-app/`.** Copy from it.
- **ApexCharts** (`apexcharts` + `ng-apexcharts`) for every chart. Ignite UI's own charts are not free (see the licence table).
- **No other UI or chart library.** No Material, Bootstrap, Tailwind, Chart.js or ECharts. Where an MIT Ignite UI control exists, use it rather than hand-rolling one.
- **No backend, and no network calls at runtime.** All data is bundled. State goes to `localStorage`, wrapped in try/catch.

### Licences — checked on 1 Nov 2026, settle before shipping

| Package | What npm and the package say (checked 1 Nov 2026) | What this means here |
|---|---|---|
| `igniteui-angular` 22.2.x | Dual licence (`node_modules/igniteui-angular/LICENSE`): MIT for a listed set of components, Infragistics commercial for the rest | Use only the MIT list (section 7). `igx-grid` and its relatives are commercial; `igx-grid-lite` is MIT |
| `igniteui-webcomponents` 7.4.1 | MIT | Allowed. This is the source of `igc-tile-manager` (the Grafana-like panel grid) |
| `igniteui-angular-charts`, `-gauges`, `-dashboards` 22.0.1 | "Infragistics(R) Ultimate license" | **Not allowed.** That includes the Dashboard Tile, which looks tempting for this |
| `igniteui-dockmanager` 2.2.1 | "SEE LICENSE IN LICENSE"; the Ignite skill calls it premium | **Not allowed** |
| `apexcharts` 8.7.0, `ng-apexcharts` 3.2.0 | Dual licence (`LICENSE.md`). The free Community licence covers organisations whose "annual revenue, operating budget, funding, or equivalent financial resources are less than $2 million USD", counting parent companies and affiliates. Above that, a paid per-developer licence applies. Every chart type is free at Community level except the Premium add-ons (Unit/Waffle, Raincloud, Trellis, Storyboard, Linked Views, Ink, Measure Ruler, Context Menu, Perspectives, Rewind), which are opt-in imports | ⚠️ **Bobby's decision, not assumed.** The page is built for a commercial training delivered to a bank, and the licensee is whoever builds and publishes it. Which entity that is decides whether Community applies. **Never import a Premium add-on**, whatever the answer |
| `apexcharts-mcp` 0.11.1, `igniteui-cli` 15.8.2 | MIT | The tooling is free either way |

**If the ApexCharts answer is no**, there are three fallbacks, each with a cost. Report the choice before building on it:

- Pin `apexcharts@4.7.0`. npm lists it as MIT. Its Angular wrapper `ng-apexcharts@1.16.0` is also MIT but declares a peer dependency on `@angular/core ^20`, so it needs an override on Angular 22. That combination is **untested**. The MCP server's guidance targets the current major, so it may suggest options 4.7 lacks.
- Use Ignite UI charts under Bobby's Infragistics licence. That works, but it is no longer the free showcase.
- Switch to another MIT library. That works, but it drops the ApexCharts showcase.

### MCP servers — this is part of the showcase

Configure all three in the project's `.mcp.json` and use them. Do not write component or chart code from memory.

```json
{
  "mcpServers": {
    "igniteui-cli":     { "command": "npx", "args": ["-y", "igniteui-cli", "mcp"] },
    "igniteui-theming": { "command": "npx", "args": ["-y", "igniteui-theming", "igniteui-theming-mcp"] },
    "apexcharts":       { "command": "npx", "args": ["-y", "apexcharts-mcp"], "env": { "APEXCHARTS_MCP_PRODUCTS": "charts" } }
  }
}
```

`npx -y igniteui-cli ai-config` sets up the first two and copies the Ignite UI agent skills. Then add the third entry by hand. The ApexCharts server also has a hosted endpoint (`https://mcp.apexcharts.com/mcp`); prefer the local one.

- **`igniteui-cli`**: `list_components`, `get_doc`, `search_api` for every Ignite control before using it.
- **`igniteui-theming`**: the dark ops theme (section 6), through `create_custom_palette`, `create_typography` and `create_component_theme`, the same way M3 L5's `styles.scss` was made.
- **`apexcharts`**: `apexcharts_generate_config` for every chart, then **`apexcharts_validate_config` on every config before it ships**. Use `apexcharts_list_types` to confirm a type is in the default bundle.

Keep **`BUILD-NOTES.md`**: one line per screen saying which MCP tool produced or validated what. That file is what Bobby shows colleagues, so it is a deliverable, not a log.

### Legibility over a Teams screen share

- Design at 1920×1080, and check it at 1280×720, because many viewers watch the share in a smaller window.
- Body text at least 18px, chart axis labels at least 16px, chart lines at least 3px. No hairline gridlines; compression erases them.
- **At most six panels per dashboard.** The lesson's own Section 4 argues that thirty panels are not ten times more useful than three, so the page should follow that.
- Status is never shown by colour alone. Pair every green, amber or red with an icon and a word (OK / WARN / ALERT / NO DATA).
- No animation that matters. Teams drops frames.

---

## 3. The honesty rule — the most important section

Bangladesh Bank did not run these tools in 2016, and nobody knows what its screens showed. The ops view is a **reconstruction for teaching**. That matters, because the people in the room will repeat what they saw.

1. **A persistent banner on every ops scene**, not dismissible: *"Illustrative reconstruction. These are not the bank's systems or data. Real facts are marked with a source."*
2. **Two kinds of data, kept apart in code and on screen.** Real facts live in `src/app/case-facts.ts`, every entry carrying its source string from `FACTS.md`. Invented telemetry lives in `src/app/ops-data.ts`. Anything drawn from `case-facts.ts` shows a small "Source:" line. Anything else is captioned "Illustrative".
3. **Real events are placed at day level only.** `FACTS.md` says it outright: reporting gives the day the printer was found, not the hour. The deck says "Friday morning" and nothing more. Invented telemetry may have minute-level timestamps; real events may not.
4. **No causal claims.** `FACTS.md`: thirty of the thirty-five instructions were stopped in New York for reasons of their own. The page may say the stopped printer removed the bank's own chance to see the payments. It may not say a counter would have saved the money.
5. **No real product branding.** The screens are *modelled on* dashboard tools (the Grafana kind) and on-call/paging tools (the PagerDuty kind), but they carry neutral names, **"Panels"** and **"Pager"**, and no logos, wordmarks or copied UI artwork. Tab 1 may say in one line which categories of tool they represent and name examples in text.
6. **Hedge people.** CLAUDE.md §2 applies: anything about what staff, auditors or supervisors did, thought or would do is written as possibility, or left out. The deck's own line holds: nobody in this story was careless.
7. **The intrusion gets one line**, worded as the deck words it: reporting at the time described malware that suppressed the printed confirmations. No more.

---

## 4. Tab 1 — The case

One screen at 1920×1080, no scrolling. It is also an `igx-dialog` overlay, opened from a **"The case"** button in the top bar on every scene. It closes on Escape or a click outside, and keeps the current scene.

Four panels:

- **Premise** — the deck opener in its own words: a central bank, a Thursday evening, about USD 951 million of payment instructions nobody at the bank had made; the control that would have shown them printed onto paper, and the paper stopped coming. Below it, the four-day timeline from the deck (Thu 4 Feb → Mon 8 Feb) as an `igx-list` or a compact ApexCharts heatmap (section 5, scene 1).
- **What will play out** — the seven scenes, each with its deck kicker, so the room knows where it is going. Scene titles only; nothing that gives away the reveal.
- **Your decision** — the four proposals and the three questions, **verbatim from the deck's "Your decision" slide**, in a visually distinct block. This block is the fix for problem 1 and is not optional styling.
- **How to read the ops screens** — the honesty rule from section 3 in two sentences, and the line about which categories of tool the screens are modelled on.

---

## 5. Tab 2 — The ops view: seven scenes

A scene stepper (`igx-stepper`, horizontal, or an `igx-tabs` strip) across the top. Each scene shows its **deck kicker** so Bobby can match it to the slide. **Right / Left / Page Down / Page Up** move between scenes, so a presenter clicker works. **R** reveals the next item where a scene has reveals.

Two neutral "tools" appear in the scenes. **Panels** is a dashboard: a dark panel grid built on `igc-tile-manager`, with a time-range chip, stat tiles and time-series panels. **Pager** is an on-call screen: an incident list, urgency, routing, and who is on call.

A **world-clock strip** sits in the top bar of every ops scene: Dhaka (UTC+6), New York (UTC−5 in February), Manila (UTC+8), each with an open/closed chip for the scene's day. The point of the whole case is that the gap was made of calendars.

| # | Deck slide (kicker) | Screen | Ignite UI | ApexCharts | What the room should notice |
|---|---|---|---|---|---|
| 1 | *The case* + *Bangladesh Bank, February 2016* | **Panels — Payments overview**, Thursday | `igc-tile-manager`, `igx-card` stat tiles, `igx-chip` status | `line` sparklines for message throughput and queue depth; `heatmap` of Dhaka / New York / Manila × Thu 4–Mon 8, open or closed | Every infrastructure panel is green. The heatmap shows the closed days line up: Fri–Sat in Dhaka, Sat–Sun in New York, Mon 8 Feb (Chinese New Year) in Manila |
| 2 | *What was watched* | **Panels — Controls** | `igx-list` device inventory with the confirmation printer, `igx-badge` | `bar` of confirmations printed per hour (illustrative) | The design was sound: confirmations were the thing to watch. One panel is empty and says **"No data — no query defined: messages sent vs confirmations received"**. That empty panel is the slide's third bullet |
| 3 | *What a stopped printer looks like* | **Pager — Incidents**, Friday morning | `igx-grid-lite` incident list, `igx-chip` urgency, `igx-avatar` for on-call roles, `igx-button-group` toggle | none | One low-urgency alert: *device offline: confirmation printer*, routed to desktop support, among a handful of ordinary ones. A toggle, **Read as a device fault / Read as a finding**, re-routes the **same alert**: low urgency to desktop support, or high urgency to the payments on-call with a page. These are the slide's two blocks. The on-call panel shows who covers Fri–Sat. Use roles, never names |
| 4 | *Your decision* | **The four proposals** | `igx-card` ×4 (A–D), `igx-chip` vote counters | none | The proposals and three questions verbatim. Bobby clicks **+1** on a card as each breakout room posts its pick in chat, and the counts persist. **No reveal content is reachable from this scene** (the deck notes: do not give an answer while they are working) |
| 5 | *What each one really is* | **Panels**, with each proposal added in turn | `igx-grid-lite` approvals queue for A, `igx-banner` for B | `rangeArea` + `line` for D (balance against a band of "normal"); `line` ×2 + `column` gap for C (sent against confirmed, hourly) | **R** reveals A, B, D, C, in the deck's order. **A**: the approvals queue, every row signed, captioned with the deck's line about Lesson 3's three approvers. **B**: the scene 3 alert fires again; it says a device is down and nothing about money. **D**: the balance line leaves the band, and the caption says the band *is* the definition of normal, which someone has to write. **C**: the two counts part at the first suppressed confirmation and stay apart; an alert fires. ⚠️ Caption C with the scenario's assumption: *"Assumes both counts are read from places the attacker did not control."* |
| 6 | *What happened afterwards* | **Pager — Incident timeline** (resolved), and an outcome panel | `igx-list` timeline entries, `igx-card` | `bar` (horizontal) of the 35 instructions: 30 stopped in New York (~USD 850m) against 5 completed (USD 81m to Manila, USD 20m to Sri Lanka); a second `bar` for recovery: Sri Lanka's USD 20m all returned, about USD 15m of the 81m by 2025 | Every figure from `case-facts.ts` with its source. The "Fandation" typo, and the BSP fine of PHP 1 billion (~USD 53m) on 5 Aug 2016. ⚠️ The deck's fourth bullet (the network's security programme) is **not in `FACTS.md`**: verify it or leave it off the page |
| 7 | *The lesson* | **Panels — the dashboard after the decision** | `igc-tile-manager`, `igx-input-group` (read-only) for an alert-rule card, `igx-chip` for owner | `line` ×2 for sent vs confirmed, now a built panel | The panel from scene 2 now exists, **with an owner field filled in**. Next to it is an alert rule that fires because nothing happened: *no confirmation received for N minutes while messages are being sent*. The caption is the deck line: *"An absence needs an owner in the same way a number does."* Optional second caption from the deck notes: the same measurement as the 61 and 60 in the homework |

---

## 6. Look and feel

- **A dark ops theme derived from the deck palette.** NAVY family for surfaces (the 700–900 shades the M3 L5 theme already defines), MID and BLUE for series and accents, WHITE text. Make it with the `igniteui-theming` server as a dark variant. **Tab 1 stays light**, on PALE cards, so it reads as the deck and the ops view reads as a tool.
- **Status colours** (OK / WARN / ALERT / NO DATA) come from the theming server's semantic palette, checked for contrast on the dark surface, and always paired with an icon and a word.
- **Chart colours**: use the `dataviz` skill's validator on the series palette against the dark surface before shipping. Two-series charts (C, D) need the pair distinguishable without colour, so use a dashed line for "confirmed" and a shaded band for "normal".
- **Fonts**: Roboto body, Montserrat headings, a monospace for timestamps and alert rules. Google Fonts as in M3 L5. The single-file build falls back to system fonts.

---

## 7. Component allow-list

**Allowed, from the `igniteui-angular` MIT list:** navbar, tabs, stepper, card, chip, badge, avatar, list, `igx-grid-lite`, button, button-group, icon, dialog, banner, snackbar/toast, tooltip, input-group, select, switch, expansion-panel, splitter, divider, circular and linear progress. **From `igniteui-webcomponents` (MIT):** `igc-tile-manager`, wired the way the Ignite skill's `layout-manager.md` shows (`CUSTOM_ELEMENTS_SCHEMA`).

**Not allowed:** `igx-grid`, tree, hierarchical and pivot grids, everything in `igniteui-angular-charts`, `-gauges` and `-dashboards`, and the dock manager.

**Check for it:** `igniteui-angular` pulls in `igniteui-trial-watermark`, which marks commercial components. If a watermark appears in any screenshot, a commercial component has slipped in.

---

## 8. Data design

- **`case-facts.ts`**: every real fact from the Bangladesh Bank lines of `FACTS.md` (lines 159–162 on 1 Nov 2026) as `{ id, text, value?, unit?, date?, source }`. Read them from `FACTS.md`; do not retype them from this brief.
- **`ops-data.ts`**: invented telemetry generated by a **seeded** pseudo-random function, so every run draws the same lines. Keep the parameters (baseline throughput, noise, band width) at the top of the file so Bobby can tune them without touching chart code.
- **Time.** Store every timestamp in UTC and display it per zone. Invented times sit inside the right real *days* only. Scenes 1–2 are Thursday; scene 3 is Friday morning. Draw the closed periods as ApexCharts x-axis annotation bands, labelled "Dhaka weekend", "New York weekend" and "Manila: Chinese New Year".
- **The C counter.** "Sent" climbs by the fraudulent instructions on top of an invented ordinary baseline. "Confirmed" follows it until the first suppressed confirmation, then stops. The gap is the alert. **Use the real count of 35 for the fraudulent instructions**; everything else about the traffic is illustrative.
- **The D balance.** Invented. The band is the stored definition of "normal", and its width is the parameter Bobby may want to argue about in the room.
- **State**: `{ tab, scene, revealIndex, votes: {A,B,C,D}, faultReading: 'device'|'finding' }` in one signals service, persisted to `localStorage`. A **Reset** button sits in the case overlay, for use between the two groups.

---

## 9. How to work — phases with a check-in after each

Bobby's preferences apply: checkpoint about every 25 tool calls; this is well over 50, so it is pre-split into phases. **Stop after each phase**, show screenshots, and wait for a go-ahead.

1. **Shell.** Scaffold, `.mcp.json`, `ai-config`, the theme through the theming server, both tabs, the scene stepper with empty scenes, the case overlay, the banner, the world-clock strip. Screenshots of Tab 1 and one empty scene.
2. **The core: scenes 3 and 5.** The fault/finding toggle and the four reveals. These carry the lesson; if time runs out, these are the ones the session needs.
3. **Scenes 1, 2, 4, 6, 7.**
4. **Finish.** Legibility pass at 1920×1080 and 1280×720, keyboard navigation, the single-file build, `BUILD-NOTES.md`, and the verification report (section 11).

Prefer reproducing over assuming: build, serve and screenshot each scene with Playwright at both sizes, and look at the screenshots before calling a scene done. **No git or GitHub write operations** without Bobby's go-ahead in the same session.

---

## 10. Publishing

Same route as M3 L5: `ng build --base-href ./`, self-contained `dist/` with relative paths, plus the single-file fallback for `file://`. Hosting the build (GitHub Pages from the course repo, or a Claude artifact) is **Bobby's call**; ask before touching repo settings. `github.com` may be blocked on UBB's network, but this lesson is online and Bobby shares his own screen, so running locally with `npm run present` is the default.

---

## 11. Done looks like

- [ ] Tab 1 readable without scrolling at 1920×1080; overlay opens and closes from every scene and keeps the scene
- [ ] Seven scenes, each showing its deck kicker; clicker keys work
- [ ] Scene 4 cannot reach reveal content; scene 5 reveals A, B, D, C one at a time
- [ ] Fault/finding toggle re-routes the same alert in scene 3
- [ ] Honesty banner on every ops scene; every real figure shows its source; every invented one says "Illustrative"
- [ ] No real event placed below day level; no causal claim; no product names or logos in the UI chrome
- [ ] Every chart config passed `apexcharts_validate_config`; no Premium ApexCharts import
- [ ] Only allow-listed Ignite UI components; no trial watermark in any screenshot
- [ ] No runtime network calls other than Google Fonts (confirmed from Playwright's request log)
- [ ] Legible at 1280×720; nothing relies on colour alone; axe passes
- [ ] `BUILD-NOTES.md` lists the MCP tool behind each screen
- [ ] ApexCharts licence question settled by Bobby

---

## 12. Open for Bobby (default in brackets, used if there's no answer)

1. **ApexCharts licence**: which entity is the licensee? [Stop and ask before Phase 2, because Phase 1 needs no charts.]
2. **Bulgarian**: the M3 L5 app gained `/bg/`. [English only; keep UI strings in one `i18n.ts`, so it can be added later.]
3. **Votes on scene 4**: useful online, or noise? [Build it; it is one chip per card.]
4. **Scene 6's fourth item** (the network's security programme): verify it into `FACTS.md`, or leave it off? [Leave it off.]

---

## 13. Context

In `D:\BUBI\SkillO_2026`:

- `briefs/M3-L4.md` — the lesson brief: the spine, the case and why it is told as a detection story
- `_deck-generator/content_m3l4.py` — the case slides and their speaker notes, which are the source for every scene's wording
- `reference/FACTS.md` — the verified facts, and its "do not claim" list, which section 3 depends on
- `m3l5-case-app/` — the sibling app: theme, scripts, licence notes in `README.md`. Copy from it; do not edit it
- `CLAUDE.md` (root) — house style, including the plain-English voice and the hedging rule, both of which apply to page text

⚠️ The deck date is 5 Nov 2026 (provisional). If time is short, Phases 1 and 2 are a usable page on their own.
