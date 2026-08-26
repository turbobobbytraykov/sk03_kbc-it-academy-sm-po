# 🔁 CI/CD Pipelines — Homework Assignment

Welcome to your hands-on homework for **Module 2, Lesson 1 — CI/CD Pipelines**.

In Module 1 you edited files on your own machine and opened them in a browser.
This time you'll do something new: put a change through **GitHub itself**, and
watch two automated pipelines react to it — exactly the way a real engineering
team's changes get checked and shipped every day.

No coding experience is required, and you don't need to install anything. A
browser and a free GitHub account are enough. Budget **up to 2 hours**; most
people finish faster.

---

## What You Will Do

1. **Fork** this repository to your own GitHub account and switch on Actions.
2. **Task 1 — CI:** make a small change on a branch, open a pull request, and
   watch a pipeline automatically build and check it.
3. **Task 2 — Publish:** create a GitHub Release, and watch a second pipeline
   automatically package the apps and attach them to it.

---

## How This Connects to the Lecture

| Lecture Topic | Where You Will See It in This Exercise |
|---|---|
| **Pipeline trigger** | Task 1's pipeline fires automatically the moment you open a pull request |
| **Build stage** | The pipeline compiles the backend and checks the frontend — the same "does it still work" question every pipeline asks first |
| **Pipeline as a PR check** | You'll watch a pass/fail check appear directly on your pull request |
| **Artifact** | Task 2's pipeline produces the same kind of packaged, versioned output discussed in the lecture |
| **Environment** | Task 2's pipeline runs against a `production` environment you create yourself |
| **Release vs. deploy** | Publishing the release is the trigger; the pipeline does the packaging — you never touch a server |

---

## Before You Start

- You need a free [GitHub account](https://github.com/join) — the same one from Module 1, if you already made one.
- Nothing to install. Every step below happens in your browser, on github.com.

---

## Step 0 — Fork the Repository *(~5 minutes)*

A "fork" is your own personal copy of this repository. You'll make all your
changes there — the original repository stays untouched.

1. Open the repository: [github.com/turbobobbytraykov/sk03_kbc-it-academy-sm-po](https://github.com/turbobobbytraykov/sk03_kbc-it-academy-sm-po)
2. Click **Fork** in the top-right corner.
3. Leave the settings as they are and click **Create fork**.
4. Wait a few seconds — GitHub will take you to your own copy, at
   `github.com/YOUR-USERNAME/sk03_kbc-it-academy-sm-po`.

From here on, always work in **your fork**, not the original repository.

---

## Step 1 — Enable GitHub Actions on Your Fork *(~2 minutes)*

GitHub turns pipelines off by default on forks, as a safety measure. You only
need to switch this on once.

1. In your fork, click the **Actions** tab.
2. You'll see a message saying workflows aren't running yet, with a green
   button: **"I understand my workflows, go ahead and enable them"**.
3. Click it.

That's it — both pipelines in this repository are now live on your fork.

---

## Task 1 — CI Pipeline: Make a Change, Watch It Get Checked *(~30 minutes)*

You're going to edit one line of text, and watch a pipeline automatically
build the frontend and backend to make sure nothing broke — the same check a
real pull request would get before anyone reviews it.

1. In **your fork**, open the file `frontend/index.html`.
2. Click the **pencil icon** ("Edit this file") near the top-right of the file view.
3. Find the `<footer>` section near the bottom of the file. It contains this line:
   ```html
   <p>Data powered by <a href="https://api-ninjas.com" target="_blank" rel="noopener">API Ninjas</a>
     &nbsp;·&nbsp; SYSTEMS & ARCHITECTURE UBB Course</p>
   ```
4. Add your name to it, so it reads something like:
   ```html
   <p>Data powered by <a href="https://api-ninjas.com" target="_blank" rel="noopener">API Ninjas</a>
     &nbsp;·&nbsp; SYSTEMS & ARCHITECTURE UBB Course · Homework by Your Name</p>
   ```
5. Scroll down to **"Commit changes"**. Choose **"Create a new branch and start a pull request"**, and give the branch a short name, e.g. `your-name-ci-homework`.
6. Click **Propose changes**.
7. On the next screen, double-check the base repository is **your own fork** (not `turbobobbytraykov/...`) — then click **Create pull request**.
8. Wait about a minute, then refresh the page. You should see one or two checks appear near the bottom of the pull request, each showing a spinner, then a green ✔ or a red ✘.
9. Click **Details** next to a check to open its log. Skim it — this is the pipeline compiling the backend and validating the frontend, step by step, exactly as described in the lecture.
10. Once everything is green, click **Merge pull request**, then **Confirm merge**.

**If a check turns red:** open its log the same way — the error message will point at what failed. This is normal and part of the point: the pipeline catches a broken change before it reaches anyone else.

---

## Task 2 — Publish Pipeline: Cut a Release, Watch It Get Packaged *(~35 minutes)*

Now you'll trigger the second pipeline — the one that packages the finished
apps and attaches them to a release, the same way a team ships a versioned
build.

### 2a. Create the `production` environment

1. In your fork, go to **Settings → Environments**.
2. Click **New environment**, name it exactly `production`, then click **Configure environment**.
3. You don't need to add any protection rules — click through with the defaults. (There's an optional way to try this in the Bonus section below.)

### 2b. Publish a release

1. On your fork's main page, click **Releases** in the right-hand sidebar (or go to the **Tags/Releases** section).
2. Click **Create a new release** (or **Draft a new release**).
3. Click **Choose a tag**, type `v1.0.0`, and select **Create new tag on publish**.
4. Give it a release title, e.g. `v1.0.0 - My First Release`.
5. Click **Publish release**.

### 2c. Watch the pipeline run

1. Go to the **Actions** tab. You should see a **Publish Release** run start within a few seconds.
2. Open it and watch the steps: it rebuilds the frontend, compiles and packages the backend into a `.jar`, and attaches both to your release.
3. Once it finishes, go back to your release page and refresh. Under **Assets**, you should now see `frontend.zip` and `backend.jar` — files the pipeline built and attached for you, with no manual upload.

---

## Bonus Challenges 🌟

Finished early? Try one of these optional extras:

1. **Experience an approval gate.** On the `production` environment (Settings → Environments → production), add yourself as a **required reviewer**. Publish a new release and watch the pipeline pause, waiting for your approval, before it packages anything — this is the "release approval process" mentioned in the lecture, in miniature.
2. **Ship a second version.** After your Task 1 pull request is merged, cut a new release, `v1.1.0`. Download the new `frontend.zip` and confirm your footer change is inside it.
3. **Read the backend build log closely.** Find the line where the pipeline runs `monolith.BankingApp` versus `microservices.App` — it's the same monolith-vs-microservices comparison from Module 1, now running automatically inside a pipeline.

---

## Troubleshooting

| Symptom | Most Likely Cause |
|---|---|
| Actions tab shows nothing running | You skipped Step 1 — go enable workflows on your fork |
| Pull request shows no checks at all | The pull request's base repository isn't your own fork — recreate it |
| A check is red | Open **Details** on the check and read the log — the failing step is highlighted |
| No `production` option when creating a release workflow | You're looking at the original repository instead of your fork |
| Release published but no assets appear | Give it a minute, then refresh — check the Actions tab to see if the pipeline is still running |

---

## The Bigger Picture

In real delivery teams:

- Every pull request gets checked by a pipeline like this one, automatically, before a human ever reviews the code.
- A **release** is a deliberate, versioned, human decision — the pipeline reacts to it, it doesn't decide it.
- A `production` **environment** is where approvals, secrets, and audit trails live — the exact mechanism a bank relies on before anything reaches customers.
- The gap between "the pipeline passed" and "this is safe to release" is exactly what Module 3 (Deployment & Release Strategies, Testing & Quality Gates) digs into next.

---

*CI/CD Pipelines Homework · Module 2, Lesson 1 · KBC IT Academy*
