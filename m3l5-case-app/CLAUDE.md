# M3 L5 — Incident Simulation case app

Project brief for Claude Code. Copy this file to the project root as `CLAUDE.md`.

Written 1 Nov 2026. The case content below is final and approved — it comes from
`briefs/M3-L5.md` and `M3-L5-SIMULATION-FACILITATOR-PACK.MD` in `D:\BUBI\SkillO_2026`.
**Do not invent case content. Do not change the numbers.** Iterate on the UI, not the material.

---

## 1. What this is

A single-page web app that Bobby projects while running the payment-outage simulation in
**Module 3 Lesson 5, Incident Management & Reliability** — the last lesson of his block of the
KBC IT Academy 2026 programme at UBB (KBC Group), Bulgaria.

**Audience in the room:** ~20–40 Scrum Masters, Product Owners and Product Managers.
Deliberately non-technical. They will never write code. Everything on screen must read cold
to somebody who has been half-listening.

**Bobby drives it.** Trainees watch the projection. There is no trainee-facing mode, no login,
no submissions, no backend.

### The two problems this app exists to solve

Both are real feedback from Bobby's earlier case studies with this group:

1. **"The group did not feel engaged enough and the questions were not presented in a
   human-readable-on-the-fly way."** There was a long period of working out the situation, and
   only then working out what to do. → *The decision required must be visually distinct and in
   the same place on screen every time.*
2. **"Splitting the simulation across slides works for presenting it piece by piece, but
   without a single place to review the premise, goal and questions, it caused a lack of
   engagement."** → *The full premise must be reachable in one click from anywhere, without
   losing the clock.*

Every design decision should be checked against those two sentences.

---

## 2. Hard constraints

- **Ignite UI for Angular only** (`igniteui-angular`). This is deliberate — Bobby works for
  Infragistics and wants the app to be a dogfooding showcase for colleagues and trainees.
  **No Material, no Bootstrap, no Tailwind, no other component library.** Where Ignite UI has
  a control, use it rather than hand-rolling one.
- ⚠️ **Confirm the licence before shipping.** `igniteui-angular@22.2.4` declares
  `"SEE LICENSE IN LICENSE"` on npm, not a plain SPDX identifier, while `igniteui-webcomponents`
  declares MIT. Bobby's original requirement was "free OSS only". He works at Infragistics and
  can settle this — but it must be settled, not assumed.
- **Use the Ignite UI MCP server and the Ignite UI theming MCP server** for component selection
  and for theming. They are available in Claude Code and were not available in the session that
  wrote this brief, so the palette below was matched by hand — re-do it properly through the
  theming server.
- **No backend, no network calls at runtime.** All state lives in the browser for the duration
  of one session. If a refresh loses the decision log that is acceptable, but persisting it to
  `localStorage` is cheap insurance and worth doing.
- **It must read from the back of a room.** Assume a projector, a 16:9 screen, and the furthest
  person eight metres away. Body text no smaller than 18px; the countdown far larger.
- **It may be run online instead**, shared over a Teams screen share. Nothing may depend on being
  in a physical room.

### Palette — match the Skillo deck

The app sits beside a PowerPoint deck and should read as the same artefact.

| Token | Hex | Use |
|---|---|---|
| NAVY | `#003E61` | dark backgrounds, headings on light |
| MID | `#1B7FB8` | mid accent, the timeline fill |
| BLUE | `#26B1E6` | bright accent, highlights, the active moment |
| PALE | `#EAF4FB` | light cards, alternating rows |
| WHITE | `#FFFFFF` | text on dark |
| GREY | `#516674` | secondary and caption text |

Body font Roboto, headings Montserrat — the deck's fonts. Google Fonts is fine.

---

## 3. Screens

Four, in this order. A persistent top bar carries the app title, the screen switcher and the
**"The case"** button described in 3.1.

### 3.1 The case *(the landing screen, and an overlay from everywhere else)*

Everything about the premise on one screen, no scrolling if it can be avoided. Three panels:

- **Premise** — the scenario facts (section 4.1)
- **Goal** — what the room is being asked to do (section 4.2)
- **Who does what** — the five roles with their permissions (section 4.3)

**This same content must open as an overlay from the action screen**, over the top, without
stopping or resetting the clock. That is the fix for problem 2 above and it is the single most
important interaction in the app. An `igx-dialog` or a slide-in panel both work; it must close
in one click or Escape.

### 3.2 The action screen *(the heart of it)*

**One continuous 25:00 countdown, not four separate timers.** The incident runs in real time and
the moments *arrive* on the clock. Bobby does not advance slides; he facilitates while the clock
runs. Three zones that never move:

**Top — the state of the world, always visible**

- A large **circular progress countdown** (`igx-circular-progress`) showing MM:SS. Navy, turning
  amber at 10:00 remaining and red at 3:00. This is the projected clock — make it big.
- Beside it, the **story clock**: the fictional time, starting at **02:40** and advancing to
  **07:50** across the 25 minutes. The room sees both the real timer and the in-fiction time.
- **Status chips** that update as moments land, so nobody has to remember state:
  failure rate (3% → 22% → 40% → 0%), current severity, and classified yes/no.

**Middle — the only thing that changes**

The current moment in a card: the situation in three or four lines, then **the decision
required** in a visually distinct block — different background, larger, unmissable. Same
position every time. This is the fix for problem 1 and it is not optional styling.

**Bottom — the timeline and the capture**

- An **`igx-linear-progress`** spanning the full 25 minutes with four markers showing where the
  moments land, so the room can see what is coming.
- A one-row decision capture: a text field for what was decided, an `igx-select` for which role
  decided it, and two buttons — **authorised** and **not authorised**. Logging a decision should
  take about five seconds. Bobby is talking while he does this.

**Controls Bobby must have — do not omit these:**

- **Pause / resume** the whole clock. A good discussion is worth more than the schedule.
- **Hold**, which stops the *next moment arriving* without stopping the clock.
- **Advance now**, to pull the next moment forward.
- A way to correct or delete a logged decision.

**Moment timings:** Moment 1 at 00:00, Moment 2 at 06:00, Moment 3 at 13:00, Moment 4 at 20:00.
The clock ends at 25:00 and the app offers the reveal.

### 3.3 The log

Every decision with its elapsed time, its story time, what was decided, the role that decided
it, and the authorised / not-authorised verdict. Plus a running tally of each.

Reachable at any time without disturbing the clock. This is the artefact Bobby reads from during
the debrief, and it is the in-fiction "live incident document" the lesson teaches — say so on the
screen in one line.

### 3.4 The reveal

The seven debrief points (section 4.5), revealed one at a time so Bobby can pace them, **with
the live tally from the log embedded in point 2** — "you made N decisions, M of them by somebody
who was not authorised to make them."

---

## 4. The case content — final, do not alter

### 4.1 Premise

> You are the incident team for a retail bank's card authorisation platform. It is 02:40 on a
> Wednesday.

| | |
|---|---|
| **The product** | Card authorisations for a retail bank. Roughly 400 000 transactions on a normal day. |
| **The dependency** | Every authorisation calls an external fraud-scoring service, provided by a supplier. |
| **The promise** | 99.95% availability, written into the agreement with the card schemes. |
| **The people** | One engineer on call. Everyone else is asleep and can be woken. |

All figures are illustrative and were chosen to make the decisions real. Say so on screen.

### 4.2 Goal

> Nobody here fixes anything technical. Every decision you make is one that belongs to people
> who do your jobs. Four moments, four decisions, and a record of who made them.

### 4.3 The five roles and their permissions

The lesson's core idea is that roles are defined by **what you are permitted to do** — inform,
decide, act — not by job title. Show the permissions, not just the names.

| Role | May | May not |
|---|---|---|
| **Duty engineer** | Change the system. Report what is true. | Decide, or speak outside the call |
| **IT operations manager** | Direct the engineer. Inform inside the bank. | Accept a business risk or a loss |
| **Product owner** | Decide product and customer risk. Inform. | Touch the system |
| **Head of Retail Banking** | Decide anything, a loss included. Speak outside the bank. | Touch the system, or run the call |
| **Incident recorder** | Write every decision and its time into the log | Decide, act, or inform anybody |

Caption, which matters and should be on screen: *The one person with no authority is the one
whose output outlives the incident.*

### 4.4 The four moments

**Moment 1 — story time 02:40 — clock 00:00**

> The counter fires: authorisations accepted minus authorisations completed has diverged, and
> about **3%** of card authorisations are failing. Every dashboard is green. The platform's own
> health checks all pass. The duty engineer has looked for ten minutes and has no explanation.

**Decision:** Is this an incident? Who is woken, and who is allowed to make that call?

**Moment 2 — story time 03:20 — clock 06:00**

> Failures are at **22%**. The fraud-scoring service is timing out — it is a supplier's system,
> not the bank's. Fraud scoring can be switched off; payments would then go through unscored.

**Decision:** What severity, do you classify it, and who is permitted to switch scoring off?
*(Classifying starts a four-hour regulatory reporting clock.)*

**Moment 3 — story time 05:15 — clock 13:00**

> Failures at **40%**. The contact centre opens at 08:00 and there are already 900 complaints
> queued. A journalist has telephoned the press office. Operations still has no restoration
> time. **The Head of Retail Banking is on a flight and cannot be reached for two hours.**

**Decision:** What is said publicly, who is allowed to say it, and how do you hand over?

**Moment 4 — story time 07:50 — clock 20:00**

> The supplier restores service without explanation. Failures drop to **zero** within two
> minutes. Operations wants to close the incident. 41 000 transactions were declined overnight.
> An unknown number of customers were debited without being credited. Reconciliation has not
> run. The contact centre opens in ten minutes.

**Decision:** Is this incident over, and who gets to say so?

### 4.5 The reveal — seven points

1. **Nobody fixed anything.** Every decision that mattered was made on incomplete information,
   at speed, by people who were not engineers.
2. **The tally.** Read the log: how many decisions were taken by somebody not authorised to take
   them. Usually two of four.
3. **Twice it needed somebody who was not there** — once to accept a risk at 03:20, once to speak
   outside the bank at 05:15. The fix is not a faster approval. It is a second name, written
   down in advance.
4. **Most teams classify late**, so the four-hour reporting clock starts late. The signal worked
   at 02:40; the decision about what to do when it fired did not exist.
5. **The supplier caused it** — where almost a third of major incidents reported in the EU in
   2025 began. You cannot fix a supplier's system.
6. **It was not over when the system came back.** The money had not moved and nobody had been
   told.
7. **The log is the first draft of a post-mortem**, and it was written by the one person with no
   authority.

---

## 5. State model

Small enough for a single service with signals.

```
clock:     { running, held, elapsedSeconds, durationSeconds: 1500 }
moments:   [{ id, clockAt, storyTime, situation, decisionPrompt, state: locked|active|past }]
world:     { failureRate, severity, classified }        // derived from the active moment
log:       [{ elapsedSeconds, storyTime, momentId, text, role, authorised: bool }]
tally:     { authorised, notAuthorised }                // derived from log
```

---

## 6. How it gets published

Bobby chose **a published URL** — trainees open it, and the deck prints the link.

Build it so the `dist/` is **self-contained and uses relative paths** (`ng build --base-href ./`).
That keeps two routes open:

- **GitHub Pages** from the course repo, `turbobobbytraykov/sk03_kbc-it-academy-sm-po`. Needs
  Pages enabled, which is a repo setting change — **ask Bobby before touching repo settings.**
- **A Claude artifact.** Hand the built `dist/` back to a Claude session with artifact publishing
  and it can be published as a multi-file artifact with its own URL. For that route the build
  must obey the artifact CSP: scripts may load from `cdn.jsdelivr.net/npm/` or the artifact's own
  files, stylesheets must be inline or the artifact's own files or `fonts.googleapis.com`, images
  must be data: URIs, and no runtime `fetch` to other hosts. A standard self-contained Angular
  build satisfies all of that.

⚠️ **The room's network may block things.** We established that `github.com` may be blocked on
UBB's network. Whatever route is chosen, test it on the room's network before the session, and
keep the app working when opened from a local file as a fallback.

---

## 7. Scope guards

**Do not build:** trainee-facing submission, user accounts, a backend, multi-device sync,
analytics, a results export to PDF, an admin screen, or a second scenario. All were considered
and ruled out.

**Do not change:** any number, name, time or quotation in section 4. They are checked against the
lesson's source material and some are load-bearing for the regulatory content.

**Do not restyle away from the deck palette** without asking — the app and the PowerPoint are
presented in the same hour.

---

## 8. Done looks like

- [ ] Opens on The case; all three panels readable without scrolling at 1920×1080
- [ ] "The case" overlay opens and closes from the action screen without disturbing the clock
- [ ] 25:00 countdown runs, pauses, resumes, and holds the next moment
- [ ] Four moments arrive on time; each can be pulled forward
- [ ] Decision required is visually distinct and in the same position for all four moments
- [ ] A decision logs in about five seconds and can be corrected
- [ ] Log shows every decision with time, role and verdict, plus the tally
- [ ] Reveal shows the seven points with the live tally in point 2
- [ ] Legible on a projector from eight metres
- [ ] Every control is an Ignite UI for Angular control
- [ ] Licence question in section 2 settled

---

## 9. Context you may want

In `D:\BUBI\SkillO_2026`:

- `briefs/M3-L5.md` — the full lesson brief, including why the simulation is shaped this way
- `M3-L5-SIMULATION-FACILITATOR-PACK.MD` — the facilitator script, role cards, and the GitHub
  issues board this app **replaces**. ⚠️ **When the app works, update that pack**: sections 2
  and 3 (the board and the four issue bodies) become obsolete, and section 5's script should
  point at the app instead.
- `[M3 L5] Incident Management & Reliability - draft v2.pptx` — the deck. Its simulation opener
  needs the app's URL added once there is one.
- `CLAUDE.md` and `claude/STATUS.md` — the programme's house style and current state.

**Bobby's working preferences that apply here:** be concise; implement rather than only suggest;
pressure-test an approach and offer an alternative rather than presenting the first idea; never
run git or GitHub write operations without his explicit go-ahead in the current session; prefer
reproducing and verifying a build locally over assuming it works; default to the smallest change
that satisfies the ask and check in before expanding beyond it.
