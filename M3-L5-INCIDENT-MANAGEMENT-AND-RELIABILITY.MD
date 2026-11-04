# 🚨 Incident Management & Reliability — Homework Assignment

Welcome to your hands-on homework for **Module 3, Lesson 5 — Incident Management &
Reliability**. This is the last one from me.

In the lesson you ran an incident. You decided when to declare it, what to call it,
what to tell customers, and when it was over. Nobody fixed anything technical, and
that was the point. This homework takes the three decisions that were hardest under
time pressure and lets you make them slowly, with the actual rules in front of you.

One task uses the GitHub fork you have had since Lesson 1. The other two need only a
browser and a quiet twenty minutes.

Budget **about 60 minutes**, plus ten for the closing question.

---

## What You Will Do

1. **Task 1 — Classify three incidents.** Three incident summaries and the real
   thresholds. Which of them are *major*, and when would the first report have been
   due? One of the three is not major, and it is not the one most people pick.
2. **Task 2 — Take apart a published post-mortem.** A real one, from an outage you
   already know. Find the contributing causes, then judge which of the action items
   are commitments and which are wishes.
3. **Task 3 — Price the promise.** Run a workflow that turns an availability target
   into the downtime it actually buys. Do it three times, then decide which number
   you would be willing to sign.

You are not expected to write any YAML, or to understand every line of it.
Copy-paste is provided.

---

## How This Connects to the Lecture

| Lecture point | Where you will see it in this exercise |
|---|---|
| **Severity is a judgement, not a measurement** | Task 1: three incidents, and the rules do not decide any of them for you |
| **The clock starts when you classify** | Task 1: working out the deadline from the classification time, not the failure time |
| **"Major" is defined by numbers, and they are smaller than people expect** | Task 1: the €100 000 threshold, and the incident with no downtime at all |
| **Root causes are plural** | Task 2: the published account has more than one, and they are not all technical |
| **An action item without an owner is a sentence, not a commitment** | Task 2: marking which items could actually be done by someone |
| **An SLO is where reliability becomes a number** | Task 3: four targets, and what each one costs in minutes |
| **The budget is spent by releases as well as by outages** | Task 3: how many deployments-gone-wrong each target affords you |
| **A promise you cannot keep is worse than a lower one you can** | Task 3: the closing question of that task |

---

## Before You Start

**What you already have:** a fork of this repository at
`github.com/YOUR-USERNAME/sk03_kbc-it-academy-sm-po`, with Actions enabled.

Nothing else is needed. No environments, no secrets, no variables, no sign-up, no
credit card, and nothing to merge. Task 3 does not touch the application code, so
this homework does not depend on any earlier one.

**Keep your fork public.** Actions minutes are free on public repositories.

**If you have lost the fork, or skipped the earlier homework:** fork
[the repository](https://github.com/turbobobbytraykov/sk03_kbc-it-academy-sm-po)
again, then open the **Actions** tab in your fork and click the green *"I understand
my workflows, go ahead and enable them"* button. That is the whole of the catch-up
and it takes two minutes.

---

## Task 1 — Classify Three Incidents *(~20 minutes)*

No tools. A browser to read this page, and somewhere to write three answers.

In the lesson we said that no system reports its own severity: a person looks at
partial information and decides. In a European bank that decision is now made
against published criteria, and this is that decision, three times.

### The rule card

This is a **simplified** working version of Commission Delegated Regulation (EU)
2024/1772. The real text has more detail than fits on a card, and if you ever have
to do this for real you use the text and not this. It is accurate enough to make the
judgement.

An incident is **major** when **both** of these are true:

1. It affected **critical or important functions** — services the bank could not
   stop providing without a serious problem, and
2. **either** the **data** limb is met — the availability, authenticity, integrity
   or confidentiality of data was affected — **or** **two or more** of the
   thresholds below are met.

| Threshold | The figure |
|---|---|
| Clients affected | more than 10% of clients using the affected service, or more than 100 000 clients |
| Financial counterparts | more than 30% of them |
| Transactions | more than 10% of the daily average number or value |
| Duration | longer than 24 hours |
| Service downtime | more than 2 hours, for services supporting critical or important functions |
| Geographical spread | two or more Member States |
| Economic impact | more than 100 000 euro |

### The clock

From Commission Delegated Regulation (EU) 2025/301, Article 5. Note which event
each deadline is measured from — it is not the same one twice.

| Report | Due |
|---|---|
| Initial notification | within **4 hours of classifying it as major**, and in any case no later than **24 hours after becoming aware of it** |
| Intermediate report | within **72 hours of the initial notification** |
| Final report | no later than **one month** after the intermediate report |

### Incident A — card authorisations time out

> A supplier's fraud-scoring service began timing out at **04:05**. Card
> authorisations degraded, then failed. The bank became aware at 04:05 from an
> automated alert and **classified the incident as major at 07:15**. Service was
> restored at 07:15, a total of **3 hours 10 minutes** of degraded and failed
> authorisations.
>
> - Card authorisation is on the bank's list of critical or important functions.
> - **48 000** of the bank's 1 200 000 retail customers attempted a card payment
>   during the window and were affected.
> - **14%** of the daily average number of card transactions failed.
> - Bulgaria only.
> - No data was lost or corrupted.
> - Direct costs and refunds came to about **€62 000**.

**Answer:** is it major? Which thresholds are met? By what time was the initial
notification due?

### Incident B — the staff expenses portal

> The internal HR and expenses portal was unavailable from Friday 18:20 until
> Sunday 01:40 — **31 hours 20 minutes**. The cause was a failed storage migration.
> The bank became aware at 18:25 on Friday.
>
> - The portal is used by staff to submit expenses and book leave. No customer
>   touches it, and no payment depends on it. It is not on the bank's list of
>   critical or important functions.
> - About **4 100** employees were affected, which is most of them.
> - No client data was involved.
> - Economic impact: negligible.

**Answer:** is it major? Which thresholds are met? What does that tell you about the
shape of the rule?

### Incident C — the statements that were wrong

> An overnight batch wrote incorrect balances into the monthly statements of
> **137 000** customers. The statements were visible in the mobile app from 06:00
> and were withdrawn at 12:00 — **6 hours**. The bank became aware at 09:40 when a
> customer complained, and **classified it as major at 14:30**.
>
> - Account information in the app is on the bank's list of critical or important
>   functions.
> - Nothing was ever unavailable. The app worked perfectly for the whole period.
> - The **integrity** of customer account data was affected.
> - Bulgaria only.
> - Direct costs, mostly the contact centre, came to about **€18 000**.

**Answer:** is it major? Which thresholds are met? By what time was the initial
notification due?

<details>
<summary><b>The answers — open this only after you have written yours</b></summary>

**Incident A — major.** Critical function, yes. Two thresholds are met: service
downtime of 3 hours 10 minutes (over 2 hours), and 14% of daily average transactions
(over 10%). Clients affected is 4%, which does not meet either client threshold; the
economic impact of €62 000 does not meet the €100 000 threshold. Two thresholds is
enough. Classified 07:15, so the **initial notification was due by 11:15**. The
24-hour limit from becoming aware would have been 04:05 the following day, so the
four-hour clock is the binding one.

**Incident B — not major.** The duration threshold is comfortably met — 31 hours is
well past 24 — and that is exactly why this one is here. The first condition is not
met: the portal does not support a critical or important function, so the incident
never reaches the threshold test at all. The rule is an *and*, not a list. This is
the most common mistake people make when they first do this: they scan the
thresholds, find one that is met, and stop.

**Incident C — major.** Nothing was down for a second, which is why this is the one
people miss. Critical function, yes. The data limb is met on its own — the integrity
of customer account data was affected — so no second threshold is needed. On the
other thresholds it would have failed: 137 000 clients does clear the 100 000 line,
but duration, downtime, spread and economic impact all fall short. Classified 14:30,
so the **initial notification was due by 18:30**.

**The thing worth taking away:** in A the customers noticed and the system knew. In C
the system was healthy and the customers were being told something false. Both are
major. Only one of them would have shown up on any dashboard you saw last lesson.

</details>

---

## Task 2 — Take Apart a Published Post-Mortem *(~20 minutes)*

Open the post-event summary for the AWS outage of 20 October 2025, which was the
cold open of Lesson 4:

**https://aws.amazon.com/message/101925/**

It is long. You do not need to understand the technical detail, and skimming the
middle is the correct way to read it. Read the beginning, then look for the part
near the end where they say what they are going to change.

Fill this in. Nothing is collected — this is for you.

| Question | Your answer |
|---|---|
| What was the impact, in one sentence a customer would understand? | |
| How long between the start of impact and the cause being identified? | |
| How long between the cause being identified and full recovery? | |
| How many contributing causes can you find? List them. | |
| How many action items does the document commit to? | |
| How many of those action items have something you could put a name against? | |
| How many are written so that nobody could tell whether they had been done? | |

Then the two questions that matter:

1. **The document names a race condition as the trigger.** Find at least one *other*
   contributing cause — something about how the system was designed, monitored or
   recovered that made the outage longer than the trigger alone required. There is
   more than one. This is what "root causes are plural" means in practice.
2. **Is this a blameless document?** Look for what it does *not* say. No person is
   named, no team is blamed, and no decision is described as a mistake. Does that
   make it more useful to you as a reader, or less?

If the page will not load from your network, any published post-mortem works. Two
alternatives that are consistently good: the Cloudflare blog's outage write-ups, and
GitHub's availability reports. Use the same table.

---

## Task 3 — Price the Promise *(~20 minutes)*

Now the number from Section 4. This one runs in your fork.

### 3a. Add the workflow

In your fork, click **Add file → Create new file** and name it exactly:

```
.github/workflows/reliability-budget.yml
```

Typing the slashes creates the folders as you go. Paste this in:

```yaml
name: Reliability Budget

on:
  workflow_dispatch:
    inputs:
      availability:
        description: "The availability target you would be willing to sign"
        required: true
        default: "99.9"
        type: choice
        options:
          - "99.5"
          - "99.9"
          - "99.95"
          - "99.99"

jobs:
  budget:
    runs-on: ubuntu-latest
    steps:
      - name: Work out what that promise costs
        env:
          AVAIL: ${{ github.event.inputs.availability }}
        run: |
          python3 - << 'PY'
          import os
          a = float(os.environ["AVAIL"])
          YEAR, MONTH = 365 * 24 * 60, 30 * 24 * 60

          def hm(m):
              m = round(m)
              h, mm = divmod(m, 60)
              return f"{h}h {mm}m" if h else f"{mm}m"

          bad = (100.0 - a) / 100.0
          year, month = YEAR * bad, MONTH * bad
          out = "\n".join([
              f"## Availability target: {a}%",
              "",
              "| Question | Answer |",
              "|---|---|",
              f"| Unavailability allowed | {bad * 100:.2f}% of the time |",
              f"| Downtime budget per year | **{hm(year)}** |",
              f"| Downtime budget per month | **{hm(month)}** |",
              f"| Bad deployments per month, at 15 minutes each | **{month / 15:.1f}** |",
              f"| A single 4-hour outage would use | **{240 / month * 100:.0f}%** of a month |",
              "",
              "> The budget is spent by outages and by releases alike. Nothing",
              "> distinguishes downtime you caused from downtime you suffered.",
              "",
          ])
          print(out)
          with open(os.environ["GITHUB_STEP_SUMMARY"], "a") as f:
              f.write(out + "\n")
          PY
```

Commit it to the **main** branch of your fork. A workflow committed to any other
branch will not appear in the Actions tab.

### 3b. Run it three times

Go to the **Actions** tab, choose **Reliability Budget** in the left-hand list, and
click **Run workflow**. Pick a value from the dropdown and run it.

Do this three times: **99.5**, **99.9**, and **99.99**.

Open each run and read the **Summary** page, not the job log — the table is rendered
there.

### What you should see

| Target | Per year | Per month |
|---|---|---|
| 99.5% | 43h 48m | 3h 36m |
| 99.9% | 8h 46m | 43m |
| 99.95% | 4h 23m | 22m |
| 99.99% | 53m | 4m |

Look at the last row. Four minutes a month is less time than it takes to notice a
problem, decide it is real, and find the person who can fix it. Four nines is a
statement about automation, not about effort.

### Then answer

1. Which of these four would you be willing to write into a document for your own
   product, knowing you would be measured against it?
2. What should happen when it is missed? Name something specific. "We would discuss
   it" is an honest answer and worth writing down as one.
3. Your product almost certainly has an implied promise already, even if nobody
   wrote it. What do your customers currently believe it is?

---

## Bonus *(optional)*

Open the public status page of any service your team depends on — most have one at
`status.<theirname>.com` — and read the incident history for the last few months.

Count two things:

- How many incidents were marked **resolved** with no update between "investigating"
  and "resolved"?
- How many gave a **time for the next update**, rather than only a status?

Then ask yourself which of those two your own status updates look like.

---

## The Closing Question

*File only. Nothing is collected, and nobody will ask you what you wrote.*

In the lesson we ran an incident and kept a log of every decision as it was taken —
and then stopped, without writing it up. This is that missing step, on an incident of
your own.

Think of a real one your product had in the last year: a proper one, with a call and
an audience.

Write the five-line post-mortem for it under these headings: **what happened**,
**impact**, **what we did**, **contributing causes**, and **one action with a role
against it and a date**. Keep the rule we used in the room: no names of people, only
roles and systems.

Then the honest part:

> Is there anything in what you just wrote that you would not want your manager to
> read? And what would have to be true about your organisation for that to be fine?

That second question is the whole of blameless post-mortems, and it is not a
question about documents.

**Keep what you write.** The Final Simulation in January and the closing assignment
both ask you to reason about a real system under pressure, and a post-mortem you have
already written in your own words is the best material you can walk in with.

---

## If Something Does Not Work

| What you see | What is happening | What to do |
|---|---|---|
| **Reliability Budget** does not appear in the Actions tab | The file was committed to a branch other than `main`. A workflow on any other branch is invisible there. | Open the file, use **Edit**, and commit again choosing "Commit directly to the main branch". |
| There is no **Run workflow** button | The workflow has no `workflow_dispatch` trigger, which usually means the `on:` block lost its indentation when pasting. | Compare against the block above. YAML is indentation-sensitive and two spaces matter. |
| The Actions tab shows a "workflows are disabled" message | A fresh fork has Actions off until a person turns them on. | Click the green **"I understand my workflows, go ahead and enable them"** button. |
| The run succeeds but the table is not there | You are looking at the job log rather than the run **Summary**. | Click the run name at the top, then read the Summary page. |
| The dropdown only offers 99.9 | The `type: choice` and `options:` lines did not paste cleanly. | Re-paste the `inputs:` block; the options list is indented under `options:`. |
| `aws.amazon.com` will not load | Some corporate networks block it. | Use any published post-mortem instead — the Cloudflare blog and GitHub's availability reports both work with the same table. |

---

## For the Lecturer

- **Depends on nothing.** No merge, no environments, no secrets, no variables. A
  public fork with Actions enabled is the only prerequisite, and Task 1 and Task 2
  need no fork at all. Someone who has never opened GitHub can do two thirds of this.
- ⚠️ **The Task 3 workflow has not been run inside GitHub Actions.** The Python was
  run and its output verified outside Actions on 7 Sep 2026, and the four rows in
  *What you should see* are that output. The YAML has been parsed and is valid.
  **Run it once in a fork before sending**, and check that the `choice` dropdown
  renders and that the Summary table appears.
- **The rule card in Task 1 is explicitly simplified**, and says so on the page. The
  determination rule and the seven thresholds are from CDR (EU) 2024/1772 and the
  deadlines from CDR (EU) 2025/301 Art. 5, both verified 7 Sep 2026. The data limb is
  stated in general terms rather than quoted, because its precise text was not read
  from the instrument. Do not tighten the wording without reading it first.
- **The three incidents are invented**, built to make one point each: A is major on
  two thresholds and nothing else, B meets a headline threshold and is still not
  major because the critical-function gate is not passed, and C is major with no
  downtime at all. B is the one people get wrong; C is the one that changes how they
  think.
- **Facts to re-check about a week before sending.** That `aws.amazon.com/message/101925/`
  still resolves — it was verified 6 Sep 2026 for the Lesson 4 deck. Actions minutes
  are free on public repositories.
- **Expected reaction per task:** T1 — surprise at how small €100 000 is, and
  argument about B. T2 — that the action items are vaguer than expected. T3 — the
  99.99 row.
- **Support burden:** Task 3a, where people commit to a branch instead of main. That
  is the same snag as last time and it is in the troubleshooting table.
- **Nothing is collected**, and the closing question is never asked of the room.
- **Ties back to:** M3 L4 (the accepted-minus-completed counter is Incident A; the
  AWS outage was that lesson's cold open and is now a document to work on), M3 L2
  (the error budget and releases), M2 L2 (what an availability promise is worth).
- **Ties forward to:** the Final Simulation on 7 Jan 2027 and the closing assignment
  on 14 Jan. The closing question is written to produce reusable material for both,
  and the file says so — that is the sentence that gets it done.
- **The deck's homework slide prints** `M3-L5-INCIDENT-MANAGEMENT-AND-RELIABILITY.MD`,
  exactly.

---

*Incident Management & Reliability Homework · Module 3, Lesson 5 · KBC IT Academy*
