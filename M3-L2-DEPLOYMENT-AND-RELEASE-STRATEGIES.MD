# 🚦 Deployment & Release Strategies — Homework Assignment

Welcome to your hands-on homework for **Module 3, Lesson 2 — Deployment &
Release Strategies**.

In Lesson 4 of Module 2 you made a pipeline **stop and wait for a human**. Somebody
approved it, the deployment ran, and the job went green. This homework is about
everything that happens *after* the green tick: whether a customer can actually see
the change, how fast it spreads, and what you would do if it turned out to be wrong.

Two of the three tasks happen in the same GitHub fork you have been using since
Lesson 1 — nothing new to sign up for, nothing to install. The middle task needs no
computer at all, only your own product and fifteen quiet minutes.

Budget **about 60 minutes**.

---

## What You Will Do

1. **Task 1 — Ship a feature nobody can see.** Deploy a "new checkout screen" that
   is switched off, then release it to customers by changing **one setting**,
   without deploying anything. This is `deploy ≠ release` in two clicks.
2. **Task 2 — Write the rollback plan.** No tools. One page for your own product:
   what goes back, what does not, who decides, how long it takes. The "what does
   not" column is the whole point.
3. **Task 3 — Watch a canary stop itself.** A rollout in three rings where ring 2
   breaches its threshold — and ring 3 never runs.

Copy-paste is provided for every step. You are not expected to write any YAML from
memory, or to understand every line of it.

---

## How This Connects to the Lecture

| Lecture point | Where you will see it in this exercise |
|---|---|
| **Deploy is not release** — two events, not one | Task 1: one deployment, then a separate decision, minutes apart |
| A **feature flag** hands the release decision to the product owner | Task 1: you release a feature by editing a setting, not by deploying |
| **Both paths ship** — old and new code live in production together | Task 1: the same run contains both screens; only the flag chooses |
| An **unset flag is off** | Task 1: the flag does not exist at first, and the old screen is what appears |
| **The rollback plan matters more than the release plan** | Task 2: you write the one your product does not currently have |
| **What does not roll back** — data, messages, money, apps on phones | Task 2: the second column, which is the uncomfortable one |
| A **canary needs a threshold agreed in advance** | Task 3: `1%` is written into the workflow before the run starts |
| **Exposure only grows when something says it may** | Task 3: ring 3 is never released, because ring 2 said no |

---

## Before You Start

**What you already have:** a fork of this repository at
`github.com/YOUR-USERNAME/sk03_kbc-it-academy-sm-po`, with Actions enabled, and the
`test` and `production` environments you created for the Lesson 4 homework.

**⚠️ Your fork must be public.** Environments, required reviewers and Actions
minutes are free on **public** repositories only. If your fork is private, open
**Settings → General → Danger Zone → Change repository visibility** and make it
public. There is nothing sensitive in it.

**If you have lost the fork, or skipped the earlier homework:** fork
[the repository](https://github.com/turbobobbytraykov/sk03_kbc-it-academy-sm-po)
again, then open the **Actions** tab in your fork and click the green
*"I understand my workflows, go ahead and enable them"* button. That is the whole of
the catch-up — Task 1 and Task 3 do not need the environments from Lesson 4.

---

## Task 1 — Ship a Feature Nobody Can See *(~25 minutes)*

The story: your team has finished a new one-click checkout screen. It is tested and
it is ready. Your marketing colleagues want it live on Thursday, not today.

Traditionally that means the code waits in a branch until Thursday. Here it does
not. You are going to put the finished code into production **now**, switched off,
and release it on Thursday by changing a setting.

### 1a. Add the workflow

In your fork, click **Add file → Create new file** and name it exactly:

```
.github/workflows/feature-flag.yml
```

Paste this in:

```yaml
name: Feature flag demo

on:
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy the application
        run: echo "Deploying build 1.4.0 - the same code, whatever the flag says."

      - name: What the customer actually sees
        run: |
          if [ "${{ vars.FEATURE_NEW_CHECKOUT }}" = "on" ]; then
            echo ">>> NEW checkout screen - one-click payment"
          else
            echo ">>> OLD checkout screen - the four-step form"
          fi

      - name: The flag, right now
        run: echo "FEATURE_NEW_CHECKOUT is currently '${{ vars.FEATURE_NEW_CHECKOUT }}'"
```

Commit it **directly to `main`**. (If you commit to a new branch instead, the
workflow will not appear in the Actions tab. This is the single most common
stumble.)

### 1b. Deploy it with the feature off

Go to **Actions → Feature flag demo → Run workflow → Run workflow**.

Open the run and expand the steps. You should see:

```
>>> OLD checkout screen - the four-step form
FEATURE_NEW_CHECKOUT is currently ''
```

Read that second line carefully. The flag **does not exist yet**, and the feature is
off. An unset flag being off is not an accident — it is the property that makes this
safe. The new code is in production and no customer can reach it.

### 1c. Release it, without deploying anything

Now go to **Settings → Secrets and variables → Actions**, choose the **Variables**
tab, and click **New repository variable**.

| Field | Value |
|---|---|
| Name | `FEATURE_NEW_CHECKOUT` |
| Value | `on` |

Click **Add variable**. Then go back to **Actions → Feature flag demo → Run
workflow** and run it again.

```
>>> NEW checkout screen - one-click payment
FEATURE_NEW_CHECKOUT is currently 'on'
```

**Stop and notice what you did not do.** You did not change a single line of code.
You did not open a pull request. Nobody deployed anything. You changed a setting and
the product behaved differently — and you could set it back to `off` just as fast.

That is the entire argument for feature flags, and it took you four clicks.

### 1d. Deliverable

A screenshot of the *second* run's log, showing the NEW checkout line.

---

## Task 2 — Write the Rollback Plan *(~15 minutes, no tools)*

This is the task with real work in it, and it is the one your colleagues will
recognise on Monday.

Take **one real release** your product made recently, or is about to make. Fill in
this table for it. Copy it into a document, an email to yourself, wherever you keep
things.

| Question | Your answer |
|---|---|
| What was released? | |
| **How would we undo the code?** | |
| How long would that take, realistically? | |
| **What could NOT be undone?** (data, messages sent, payments made, an app already on phones) | |
| Who decides to roll back? | |
| Who do they need to ask first? | |
| Do we have a kill switch for this, and when was it last tested? | |

Two rules for filling it in:

- **"I don't know" is a valid and useful answer.** Write it. An empty cell in this
  table is a finding, not a failure — exactly as it was in the Lesson 4 grid.
- **Be honest about the fourth row.** In a bank, the answer is often "a payment
  instruction that has already left". If that is true for your product, then you do
  not have a rollback — you have a kill switch, or you have nothing. Better to know
  that on a Tuesday afternoon than at two in the morning.

> If you are not currently attached to a product, use one you hear discussed in
> stand-ups, and mark it as an outside view.

### 2a. Deliverable

The completed table. This is the one worth keeping.

---

## Task 3 — Watch a Canary Stop Itself *(~15 minutes)*

A canary release is only worth having if something is actually watching it, and if
somebody agreed **in advance** what would make it stop. Here you get to see that
happen.

### 3a. Add the workflow

**Add file → Create new file**, named exactly:

```
.github/workflows/canary.yml
```

Paste this in:

```yaml
name: Canary rollout

on:
  workflow_dispatch:

jobs:
  rollout:
    runs-on: ubuntu-latest
    strategy:
      max-parallel: 1   # one ring at a time - not all three at once
      fail-fast: true   # if a ring fails, do not start the next one
      matrix:
        ring: [1, 2, 3]
    steps:
      - name: Release to ring ${{ matrix.ring }}
        run: echo "Rolling out to ring ${{ matrix.ring }}..."

      - name: Check the error rate against the threshold
        run: |
          THRESHOLD="1%"
          if [ "${{ matrix.ring }}" = "2" ]; then
            echo "Ring 2 error rate: 4.1% - above the $THRESHOLD threshold."
            echo "STOPPING THE ROLLOUT."
            exit 1
          fi
          echo "Ring ${{ matrix.ring }} error rate: 0.2% - below the $THRESHOLD threshold. Continue."
```

Commit it directly to `main`.

### 3b. Run it and watch what does not happen

**Actions → Canary rollout → Run workflow.**

Watch the three rings on the left-hand side of the run:

- **ring 1** goes green. Error rate below the threshold, so the rollout continues.
- **ring 2** goes red. The error rate breached the number that was written down
  before the release started.
- **ring 3** is **cancelled — it never runs at all.**

That third line is the point of the whole exercise. Nobody watched a dashboard and
nobody made a judgement call under pressure. A threshold was agreed in advance, a
ring breached it, and the customers in ring 3 never saw the change.

Two lines of configuration did that: `max-parallel: 1` made the rings go one at a
time instead of all at once, and `fail-fast: true` stopped the queue when one
failed. Take either of them away and you do not have a canary — you have a big bang
in three pieces.

### 3c. Deliverable

A screenshot of the run showing ring 1 green, ring 2 red, and ring 3 cancelled.

---

## Reflection — the part you hand in *(~10 minutes)*

Write a short paragraph for each. There are no right answers, and the honest ones
are the useful ones.

1. **Which of the five strategies** — big bang, rolling, blue/green, canary, feature
   flag — could your product realistically adopt in the next quarter? What would have
   to be true first?
2. In Task 1 you released a feature by changing a setting. **Who, in your
   organisation, would be allowed to do that** for a real product? Is that the right
   person?
3. Task 2 asked what could not be undone. **What did you write?** And if the answer
   was uncomfortable, what is the smallest thing that would improve it?
4. Task 3 stopped a rollout automatically. **What number would you be willing to have
   written down** as the thing that stops a release of yours — and who would have to
   agree to it?

Question 4 is the opening question of the next lesson, so bring your answer.

---

## Bonus Challenge 🌟 — One flag, two environments

Repository variables apply everywhere. **Environment** variables do not, and that is
usually what you actually want: the feature on in `test`, off in `production`.

1. Go to **Settings → Environments → test → Environment variables → Add variable**.
   Name `FEATURE_NEW_CHECKOUT`, value `on`.
2. Do the same for `production`, with the value `off`.
3. Change the repository variable `FEATURE_NEW_CHECKOUT` to `off`, so it is no longer
   doing the work.
4. Add `environment: test` (and a second job with `environment: production`) to the
   Task 1 workflow, and run it.

The same job definition, the same code, two different customer experiences —
decided entirely by which environment the job is running in. If you also kept the
required reviewer on `production` from Lesson 4, you now have a feature that is live
for testers and requires a named human's approval before it reaches anybody else.

That is roughly what a real release process looks like.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| The workflow does not appear in the Actions tab | It was committed to a branch rather than `main` | Commit the file directly to `main` |
| "Workflows aren't being run on this forked repository" | Actions not enabled on the fork | Actions tab → click the green *I understand my workflows* button |
| No **Environments** option in Settings | The fork is private | Settings → General → Danger Zone → change visibility to public |
| `FEATURE_NEW_CHECKOUT is currently ''` after you added the variable | You added a **secret** instead of a **variable**, or you did not re-run | Check you are on the *Variables* tab, then run the workflow again |
| All three rings run even though ring 2 failed | `max-parallel: 1` or `fail-fast: true` was dropped when pasting | Re-paste the `strategy:` block exactly |
| The variable value shows as `***` | It was created as a secret | Delete it and re-create it under *Variables* — flags are not secrets |

---

## The Bigger Picture

Everything you did today was free, ran in a browser, and took an hour. In a bank the
same three ideas cost real money and real argument:

- **The flag in Task 1** becomes a flag management system, someone to own it, and a
  quarterly job of deleting the flags nobody removed. The four clicks are real; the
  discipline behind them is the expensive part.
- **The table in Task 2** is the conversation nobody schedules. It costs nothing to
  fill in and it is the single most useful thing in this homework.
- **The rings in Task 3** need a signal worth watching and enough traffic for the
  number to mean anything. A product with forty transactions an hour cannot learn
  much from one per cent of them.

And one thing this homework deliberately does not show you: **blue/green**. It needs
two running copies of production, which cannot be demonstrated for free in a browser,
and faking it would undercut the section that says the second copy is what you are
actually paying for.

---

## Notes for the lecturer

- **Facts to re-check about a week before sending.** GitHub repository and
  environment **variables** (as distinct from secrets) are free and available on
  public repositories; `strategy.fail-fast: true` cancels queued matrix jobs when one
  fails, and `max-parallel: 1` serialises them. These were written on 31 Aug 2026
  from current behaviour but were **not** part of the deck's formal fact-check pass —
  run Task 1 and Task 3 yourself once before sending.
- **The public-fork constraint is the same one as Lesson 4** and it is called out
  twice above. Task 1 and Task 3 do not actually need environments, so somebody with
  a private fork can still complete the core homework and only loses the bonus.
- **Support burden:** Task 1 is where questions cluster — committing to a branch
  instead of `main`, and creating a *secret* instead of a *variable*. The second is a
  productive mistake and it is worth letting them make it: a flag that prints as
  `***` is a flag nobody can audit. Task 3 usually runs clean.
- **What to demo live** (so the homework is recognition, not discovery): ninety
  seconds of Task 1 — run with the flag absent, add the variable, run again. Do not
  show Task 3; the moment ring 3 goes grey is worth having for themselves.
- **Expected "aha" per task:** T1 — the second run, with no code change. T2 — the
  fourth row. T3 — ring 3 cancelled.
- **Marking:** the reflection is the only graded artefact; screenshots are a
  completion check. Question 3 is the one worth reading properly — it tells you which
  products in the room have no rollback at all.
- **Ties back to:** M2 L1 (the fork and the pipeline), M2 L4 (the `test` and
  `production` environments, the required reviewer). **Ties forward to:** M3 L3
  (quality gates — question 4 of the reflection is that lesson's opening question)
  and M3 L5 (the kill switch reappears as an incident response tool).
- **Review lands in Section 0 of M3 L3**, which is in person — so you can put two or
  three of the Task 2 tables on the screen and walk through them, which works far
  better in a room than it did online.

---

*Deployment & Release Strategies Homework · Module 3, Lesson 2 · KBC IT Academy*
