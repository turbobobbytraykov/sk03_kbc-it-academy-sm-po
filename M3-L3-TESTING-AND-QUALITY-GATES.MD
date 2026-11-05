# 🧪 Testing & Quality Gates — Homework

Welcome to the hands-on homework for **Module 3, Lesson 3 — Testing & Quality
Gates**.

Last time you decided *whether* a customer sees a change, and how quickly. Nothing in
that homework asked whether the change was any good. This one is about the checks that
answer that question. It is also about the three ways those checks can show green while
the product is still wrong.

Everything happens in the same GitHub fork you have used since Lesson 1. There is
nothing to install and nothing to sign up for. You will not run anything on your own
laptop: the tests run on GitHub's computers and send the results back to your browser.

Plan for **about 70 minutes**.

**Nothing here is collected and nothing is scored.** These are exercises, not a test of
you. Do as much as your week allows. One task done properly is worth more than three
rushed ones.

---

## What You Will Do

1. **Task 1 — Make the number lie to you.** Run the tests twice. The second run adds
   one file that tests nothing at all, and the coverage percentage goes *up*. About four
   clicks, and you will have created the bad habit yourself.
2. **Task 2 — Make a gate block you.** Set the coverage bar high enough that the build
   fails. Open a pull request and watch a check turn red. Then turn that red check into
   something that really stops a merge, and see how easily you can step around it.
3. **Task 3 — Read a green test suite that is lying.** No tools for this one. A test in
   this repository passes *because* there is a bug. Find it, then write the Definition
   of Done for a story of your own.

Every step gives you text to copy and paste. You are not expected to write any code from
memory, or to understand every line you paste. If something looks unfamiliar, that is
fine — paste it and watch what it does.

---

## How This Connects to the Lecture

| Lecture point | Where you will see it in this exercise |
|---|---|
| Coverage measures **what ran**, not what was checked | Task 1: four classes turn green with no assertion anywhere |
| The **denominator** is a choice somebody made | Task 1: the same suite, two numbers, one profile |
| A gate is the **Definition of Done written where a machine can apply it** | Task 2: a number in `pom.xml` decides whether a build passes |
| **Reporting** and **blocking** are the same check with one setting between them | Task 2: the check goes red, and the merge button still works until you say otherwise |
| Somebody can always **bypass a gate** — the question is whether it leaves a record | Task 2: you are an administrator of your own fork, and you will feel it |
| A **green pipeline** is a statement about what somebody chose to check | Task 3: a passing test that pins a live defect |
| **UAT answers a different question** from automation | Task 3: the same defect, written up for a human in `UAT.MD` |
| The **test pyramid** is about the cost of a failure, not the cost of a run | Task 3: which tier would have caught this, and which one did not try |

---

## Before You Start

**What you already have:** a fork of this repository at
`github.com/YOUR-USERNAME/sk03_kbc-it-academy-sm-po`, with Actions enabled.

**⚠️ First, bring your fork up to date.** The tests, the manual test cases and the
coverage gate were all added after Lesson 1, so your copy does not have them yet.

1. Open your fork.
2. Click **Sync fork** (just under the green *Code* button) → **Update branch**.
3. Confirm you now have a `tests/` folder, a `pom.xml` and a `UAT.MD` at the top
   level. If you do, you are ready.

**⚠️ Your fork has to be public.** Task 2 needs branch protection, and GitHub only
gives that away for free on public repositories. If yours is private, open **Settings →
General → Danger Zone → Change repository visibility** and switch it over. Nothing in
the repository is sensitive, so this is safe to do.

**Lost your fork, or skipped the earlier homework?** No problem. Fork
[the repository](https://github.com/turbobobbytraykov/sk03_kbc-it-academy-sm-po)
again, open the **Actions** tab in your new copy, and click the green *"I understand my
workflows, go ahead and enable them"* button. That is the whole catch-up.

**What is in your fork now,** so the words below mean something:

| Tier | Where | How many | What a green run proves |
|---|---|---|---|
| Unit | `tests/java/monolith`, `tests/java/api` | 7 | One method, called directly, returns the right answer |
| Integration | `tests/java/api/BankingApiIT.java` | 5 | The API's parts fit together over real HTTP |
| End-to-end | `tests/e2e/dashboard.spec.js` | 5 | A person opening the page gets what they came for |
| Manual (UAT) | `UAT.MD` | 13 cases | Somebody who wanted the feature agrees this is the feature |

---

## Task 1 — Make the Number Lie to You *(~25 minutes)*

Coverage is the number everybody reaches for when they talk about quality. It is free
to produce and it looks objective, which is most of its appeal. In this task you are
going to move it without testing a single thing.

### 1a. Add the workflow

In your fork, click **Add file → Create new file** and name it exactly:

```
.github/workflows/coverage-theatre.yml
```

Paste this in:

```yaml
name: Coverage, twice

on:
  workflow_dispatch:

jobs:
  compare:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '21'
          cache: 'maven'

      # Run 1 - the suite as it honestly is.
      - name: Run the tests
        run: mvn -B --no-transfer-progress clean verify

      - name: Remember the honest number
        run: |
          echo "HONEST=$(awk -F, 'NR>1 { m += $8; c += $9 } END { printf "%.1f", 100*c/(c+m) }' \
                target/site/jacoco/jacoco.csv)" >> "$GITHUB_ENV"

      # Run 2 - identical, except that one extra test file is included.
      - name: Run them again, with the theatre file
        run: mvn -B --no-transfer-progress clean verify -Pcoverage-theatre

      - name: Remember the second number
        run: |
          echo "THEATRE=$(awk -F, 'NR>1 { m += $8; c += $9 } END { printf "%.1f", 100*c/(c+m) }' \
                target/site/jacoco/jacoco.csv)" >> "$GITHUB_ENV"

      - name: Put the two numbers next to each other
        run: |
          {
            echo "## Coverage, twice"
            echo ""
            echo "| Run | Line coverage |"
            echo "|---|---|"
            echo "| the suite as it is | **${HONEST}%** |"
            echo "| the same suite, plus one file that asserts nothing | **${THEATRE}%** |"
            echo ""
            echo "Both runs passed. Nothing was verified between them that was not verified before."
          } >> "$GITHUB_STEP_SUMMARY"
```

Commit it **directly to `main`**. If you want to start a workflow by hand, it has to
sit on the main branch, or GitHub never shows you the *Run workflow* button. This is the
most common place to get stuck, and it caught people last time too.

### 1b. Run it

Go to **Actions → Coverage, twice → Run workflow → Run workflow**. It takes three or
four minutes, and most of that is GitHub downloading Java libraries. Go and get a
coffee.

### 1c. Read the summary

Open the finished run. Above the list of jobs there is a **summary** with your two
numbers in a small table.

**Now look at the file that moved the number.** Open
`tests/java/theatre/CoverageTheatreTest.java` in your fork. It is nine lines long. It
runs four classes and then asks them nothing at all:

```java
microservices.App.main(new String[0]);
microservices.CardService.main(new String[0]);
microservices.LoanService.main(new String[0]);
microservices.NotificationService.main(new String[0]);
// No assertion of any kind. Four classes just turned green.
```

Every line those four classes ran now counts as *covered*. Change what `CardService`
charges a customer, or make `LoanService` divide by the wrong number, and this file
still passes. Writing one of these for a whole codebase is an afternoon's work, and any
team under pressure to hit a coverage target can do it.

There is a second, quieter trick in the same repository. Open `pom.xml` and search for
`database/**`. Those two files from Module 1 are left out of the measurement. That is a
fair call — they are printed demonstrations, not real product code. It also pushes the
percentage up, because those untested lines are no longer counted at all. Choosing what
gets counted is the quietest way to improve a coverage number without writing a test.

### 1d. What you should have

The summary table on screen, showing both numbers.

---

## Task 2 — Make a Gate Block You *(~25 minutes)*

A quality gate is your Definition of Done, written down somewhere a machine can apply
it at three in the morning when nobody is around. In this task you build one, break it
on purpose, and then ask the question that really matters: can you get past it anyway?

### 2a. Break the build on a branch

In your fork, open `pom.xml`. Click the pencil ✏️ to edit it, and find this line:

```xml
<coverage.minimum.line>0.35</coverage.minimum.line>
```

Change `0.35` to `0.95`. You have just demanded that the tests run 95% of the lines in
the code. Then, at the bottom of the edit screen, choose **Create a new branch for this
commit and start a pull request**. Name the branch `raise-the-gate`, click **Propose
changes**, then **Create pull request**.

### 2b. Watch four gates run, and one of them refuse

At the bottom of the pull request, four CI jobs appear. Three turn green. **Backend
tests & coverage** turns red, and not because a test broke: every test still passes.
Open it and scroll to the end:

```
Rule violated for bundle banking-demo: lines covered ratio is 0.4x, but expected minimum is 0.95
```

That is a quality gate doing its job. Nobody's code is wrong here. A *standard* was
not met, and the build stopped instead of arguing about it.

**Now look at the merge button.** It is green. The check is red, and you can merge
anyway. Right now, that gate is only a report.

### 2c. Turn the report into a block

Go to **Settings → Branches** and click **Add branch ruleset**. (The same screen is
under **Settings → Rules → Rulesets → New ruleset → New branch ruleset**.) Fill it in
from top to bottom:

1. **Ruleset name**: `protect-main`.
2. **Enforcement status**: change it from *Disabled* to **Active**. A new ruleset starts
   disabled, and a disabled ruleset blocks nothing.
3. **Bypass list**: click **Add bypass**, tick **Repository admin**, and add it. Many
   real teams set it up this way, and it is what step 2d is about.
4. **Target branches**: click **Add target → Include default branch**. That is `main`.
5. **Branch rules**: *Restrict deletions* and *Block force pushes* are already ticked.
   Leave them. Tick **Require status checks to pass**. Under it, click **Add checks**,
   type `Backend tests & coverage`, and select it. Leave every other box unticked.

Click **Create**, then go back to your pull request. The merge box has changed. It now
says that merging is blocked, because a required status check has failed.

### 2d. Now try to walk past it

Look a bit closer. Under the blocked merge button there is a tick box, *Merge without
waiting for requirements to be met (bypass rules)*. You see it because you are a
repository admin, and you put that role on the bypass list. Tick it and the merge
button turns green again. Do not click it.

**That is the finding, and it is the whole point of the task.** A gate is only as strong
as the answer to two questions: who is allowed past it, and does going past it leave a
trace? Go back to **Settings → Rules → Rulesets → protect-main**. In the **Bypass list**,
remove **Repository admin** (the **⋯** menu next to it), so the list is empty. Click
**Save changes**. Then return to the pull request and reload it. The tick box is gone,
for you as well.

One tick box is the difference between a control and a suggestion. Somebody has already
made that choice for the pipelines your own product releases through. It is worth
knowing which way they went.

### 2e. Put it back

Close the pull request without merging and delete the branch. Then open the
`protect-main` ruleset and either delete it (**⋯ → Delete ruleset**, top right) or set
its **Enforcement status** back to *Disabled* and save. If you leave it in place, the
next homework will be more exciting than intended.

### 2f. What you should have

Two states you have now seen: the red **Backend tests & coverage** check with a green
merge button, and the same pull request after the rule, with merging blocked.

---

## Task 3 — Read a Green Suite That Is Lying *(~20 minutes, no tools)*

This is the task with real work in it, and the one your colleagues will recognise on
Monday morning. No workflow and no clicking: five minutes of reading, then fifteen
minutes of your own judgement.

### 3a. Find the test that passes because the software is broken

Open `tests/java/api/BankingApiJsonTest.java` in your fork. The last test is called
**KNOWN DEFECT**. Read what it checks.

A customer entered the way a bank enters customers, surname first — `Dupont, Marie` —
is saved as `Dupont`. The first name is thrown away. There is no error, no warning and
nothing in the log. The account is created, and the balance is filed correctly against
the wrong name.

The test does not fix any of that. It simply **describes** it, and passes. A test
written on purpose to lock in wrong behaviour is called a characterisation test, and
there are good reasons to write one. It is also the best possible answer to "the
pipeline is green, so we are fine". The pipeline is green because it is checking exactly
what somebody wrote down, and what somebody wrote down was the bug.

Now open `UAT.MD` and find **UAT-09**. Same bug, written for a person to read, with the
question a machine will never think to ask: *which is worse, a payment that fails
loudly, or one that goes through against a name nobody can match to a customer?*

### 3b. Write the Definition of Done for one of your own stories

Take **one real story** from your own backlog, something small and recent. Fill this
table in and keep it: a document, an email to yourself, wherever you keep things.

| Question | Your answer |
|---|---|
| The story, in one line | |
| What does **Done** mean for it, in words a tester could check? | |
| Which tier checks each part — unit, integration, end-to-end, or a person? | |
| **Which of those does your team actually have?** | |
| What would block a merge if it were not met? | |
| Who signs the acceptance, and are they the person who asked for the story? | |
| What would you knowingly release without? | |

Two rules for filling it in:

- **"I don't know" is a good answer.** Write it down. An empty cell tells you
  something, exactly as it did in the rollback table last time.
- **The fourth row is the uncomfortable one.** Most teams can name the four tiers. Far
  fewer can say which ones actually run on every change, or who would notice if one of
  them quietly stopped.

> If you are not currently attached to a product, use a story you hear discussed in
> refinement, and mark it as an outside view.

### 3c. What you should have

The completed table. This is the one worth keeping.

---

## Bonus Challenge 🌟 — The test that fails for no reason

`tests/e2e/dashboard.spec.js` ends with a test marked *flaky by design*, switched off.
It waits exactly 200 milliseconds and then assumes the answer has arrived. The fake API
it is talking to takes anywhere between 0 and 600 milliseconds to reply.

In your fork, edit that file and change `test.skip(` to `test(` on the last test.
Commit it to `main`, then go to **Actions**, open **CI**, and re-run the end-to-end
job three or four times.

The application never changes in between. The result does. This was run twenty times,
then twenty times again: the first batch failed nine times, the second thirteen. Not the
same tests, not the same number, and nothing wrong anywhere in the product.

One more thing worth noticing: `playwright.config.js` sets `retries: 0` on purpose.
Automatic retries would hide all of this from the report. That does not make a test suite
reliable. It makes an unreliable one invisible.

Put the `.skip` back when you have seen it.

---

## Reflection *(~10 minutes)*

A short paragraph each. These are for you, and nobody else reads them. There are no
right answers, and the honest ones are the ones worth writing.

1. **Of the four tiers** — unit, integration, end-to-end and a person — which ones
   actually run on every change in your team? Who in your organisation would know the
   answer without having to ask?
2. In Task 2 you could walk past a red check simply because of who you were. **Who can
   do that in your delivery process**, and would anyone find out afterwards?
3. Task 3 asked what you would knowingly release without. **What did you write?** And
   who, apart from you, would have to agree to it?
4. Every test in this homework passed while something was still wrong. **Think of a time
   that happened to you in production, with all the tests green. What told you?** How
   long did it take, and who noticed first: a monitoring tool, a colleague, or a
   customer?

Question 4 opens the next lesson, so bring your answer with you.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| No **Run workflow** button in the Actions tab | The workflow was committed to a branch rather than `main` | A `workflow_dispatch` workflow has to be on the default branch. Commit it directly to `main` |
| "Workflows aren't being run on this forked repository" | Actions not enabled on the fork | Actions tab → the green *I understand my workflows* button |
| No `tests/` folder, no `pom.xml` | The fork has not been synced | **Sync fork → Update branch** on your fork's front page |
| No **Branches** option under Settings, or the rule will not save | The fork is private | Settings → General → Danger Zone → change visibility to public |
| `Backend tests & coverage` cannot be found when adding the required check | The check has not run on this repository yet | Open the pull request first, let the jobs run, then add the rule |
| The merge button is still green with a red check | The ruleset is still *Disabled*, does not target `main`, or has no required check | In the ruleset: **Enforcement status → Active**, **Include default branch**, and *Backend tests & coverage* added under *Require status checks to pass* |
| No bypass tick box under the blocked merge button in 2d | The bypass list is empty, so nobody may bypass | Expected if you skipped step 3 of 2c. Add **Repository admin** to see it, then remove it again |
| The Task 1 run takes four minutes | Two full Maven builds, each downloading libraries | Expected. The `cache: 'maven'` line makes the second run of the day faster |

---

## The Bigger Picture

Everything here was free, ran in a browser, and took about an hour. The same three
ideas inside a bank cost real money and real argument:

- **The number in Task 1** ends up as a target in a quarterly report, and the moment it
  is a target, somebody starts optimising it. Marilyn Strathern wrote the well-known
  version of Goodhart's law about university audits in 1997 — *when a measure becomes a
  target, it stops being a good measure* — and it describes coverage dashboards
  perfectly.
- **The tick box in Task 2** is the whole of governance on one screen. Who is allowed to
  bypass a control, and whether that bypass is recorded, is a question your auditors are
  far more likely to ask than what your coverage percentage is.
- **The table in Task 3** is the conversation nobody ever schedules. It costs nothing,
  and it is the most useful thing in this homework.

There is one thing this homework deliberately does not teach you: **how to tell whether
a test is any good.** Reviewing tests properly needs the code in front of you and the
person who wrote it sitting beside you. What you *can* do without either — and what
Tasks 1 and 3 are training you to do — is spot when a green result is being offered as
the answer to a question it was never asked.

---

## Notes for the lecturer

- **⚠️ This homework requires the merge.** `btraykov/add-automated-tests` must be on
  `main` before the file is sent, or *Sync fork* brings down nothing and every task
  fails at step one.
- **Facts to re-check about a week before sending.** Branch protection with required
  status checks is free on **public** repositories (GitHub docs, checked 5 Sep 2026);
  a `workflow_dispatch` workflow must sit on the default branch (same); GitHub's
  Settings → Branches screen offers rulesets alongside classic rules and the
  wording moves — walk Task 2 once and correct the labels if they have changed.
  Task 2 was rewritten for rulesets on 4 Nov 2026: the ruleset screen has no *Do not
  allow bypassing* box, bypass is controlled by the **Bypass list** instead, and a new
  ruleset starts with *Enforcement status: Disabled*.
- **What has and has not been run.** The five end-to-end tests were run on 5 Sep 2026
  and pass; the flaky test was un-skipped and run twice in batches of twenty, failing
  nine times and then thirteen, which is where the bonus's numbers come from. The
  Maven side — Task 1's two coverage numbers and Task 2's gate failure — was **not**
  executed, because Maven Central was unreachable from the machine used to draft
  this. Java compiles and all four `main` methods the theatre test calls exit
  cleanly, so the risk is small, but **run Task 1 once in your own fork before
  sending** and note the two percentages: they are also what you will want on the
  screen during the Section 3 demonstration.
- **Support burden:** Task 2 is where the questions will cluster, because GitHub's
  branch-settings UI has three routes to the same rule. Task 1 is a paste-and-wait.
  Task 3 needs nothing but attention.
- **What to demo live** (so the homework is recognition, not discovery): the coverage
  pair from Section 3, which is the same thing Task 1 does. Do **not** demo Task 2 —
  the moment the merge button loses its bypass link is worth having for themselves.
- **Expected "aha" per task:** T1 — the second percentage. T2 — realising they could
  merge anyway. T3 — that the test is green *because* the bug is there.
- **Nothing is collected or scored.** If someone does bring a reflection to you,
  question 2 is the one worth reading properly — it tells you which delivery
  processes in the room have controls and which have suggestions.
- **Ties back to:** M2 L1 (the fork and the pipeline), M2 L4 (the required reviewer —
  the same bypass question, from the other side), M3 L2 (the flag and the canary
  threshold agreed in advance). **Ties forward to:** M3 L4 Observability — question 4
  of the reflection is that lesson's opening question — and M3 L5, where "what did we
  knowingly release without" is the first thing an incident review asks for.
- **Review lands in Section 0 of M3 L4**, which is online, so the *Known snags* slide
  should carry the branch-protection UI variants rather than inviting people to
  describe their own screens.

---

*Testing & Quality Gates Homework · Module 3, Lesson 3 · KBC IT Academy*
