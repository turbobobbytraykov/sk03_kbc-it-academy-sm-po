# ☁️ Cloud Fundamentals — Homework Assignment

Welcome to your hands-on homework for **Module 2, Lesson 2 — Cloud Fundamentals**.

In Lesson 1 your pipeline ended at the word **"deploy"** — deploy to *what*?
This time you'll go and look at the *what*. You'll open the console of a real
public cloud, create and then delete a real resource, and price a small service
the way a business case is priced.

You will do all of this **without ever entering a credit card**. If any screen
asks you for card details, you have wandered onto a paid path — stop, back out,
and use the route described here instead.

No coding experience is required and you don't need to install anything. A
browser and one or two free accounts are enough. Budget **up to 90 minutes**;
most people finish faster.

---

## Can you really use a cloud for free, with no card?

Short answer: **yes, but not the way the adverts show it.**

The famous free offers — Google Cloud's $300 trial, AWS Free Tier, the Azure
free account, Oracle's Always Free — *all* require a credit or debit card to
activate a billing account, even though most of them won't charge you. "Card for
identity verification" and "card for billing" look the same at the sign-up desk.

What is genuinely free with **no card at all** is the set of *guided lab* and
*sandbox* environments the providers run for training:

| Route | What you get | Card? | Good for |
|---|---|---|---|
| **Microsoft Learn sandbox** | A temporary real Azure subscription inside a lesson. Real portal, real Cloud Shell. Expires after a few hours. | **No** | Creating and deleting a real resource, guided step by step |
| **Google Cloud Skills Boost** (labs) | A temporary, Google-owned Google Cloud project with real console access for the length of the lab | **No** | Clicking around a real Google Cloud console |
| **Google Cloud Console + Cloud Shell** with only a Google account | Full read access to the real console, a free Linux machine in Cloud Shell, a free project. You *can't* start a paid VM without adding a card — and seeing that wall is part of the point. | **No** | Feeling where "free to look" ends and "rent capacity" begins |
| **Provider pricing calculators** | The real per-hour, per-GB, per-request price lists, with no login of any kind | **No** | Turning architecture choices into a monthly number |
| **Cloudflare Workers / Pages** | A real serverless function running in 300+ cities, deployed from the browser | **No** | Seeing a "deploy" finish in 30 seconds (bonus task) |

This homework uses the first four. Oracle and a full AWS account are deliberately
avoided because they ask for a card.

---

## What You Will Do

1. **Task 1 — Price it.** Use the Azure and AWS pricing calculators (no login) to
   cost a small customer-facing banking API, then watch the number move when you
   change *region* and *outbound traffic*.
2. **Task 2 — Go inside a real cloud.** Activate the free Microsoft Learn sandbox,
   follow a beginner module to create one real resource, look at it in the portal,
   then delete it.
3. **Task 3 — Touch a second cloud.** Open the real Google Cloud console with just
   a Google account, use Cloud Shell, and find the exact point where the cloud
   asks you to start paying.
4. **Reflection.** Half a page linking what you saw to the six lesson takeaways.
   This is the part you hand in.

Tasks 1 and 3 can also be done in reverse order or on different days. Task 2 is
the one to do when you have an uninterrupted 30 minutes, because the sandbox
times out.

---

## How This Connects to the Lecture

| Lecture point | Where you will feel it in this exercise |
|---|---|
| **Cloud is a commercial model before it is a technology** | Task 1: you build a *bill*, not a server. Task 3: the console is free; capacity is not |
| **IaaS / PaaS / SaaS = how much of the stack you stop operating** | Task 2: you pick a resource type and see how much Azure runs for you |
| **In cloud, cost is an architecture decision** | Task 1: moving one slider (traffic, region) changes the monthly figure |
| **Egress is the line item that surprises people** | Task 1: raise outbound traffic from 500 GB to 5 TB and watch what happens |
| **Data residency is a binding constraint for a bank** | Tasks 1 and 3: every resource forces a *region* choice before anything else |
| **Migration is decided system by system** | Reflection: you'll have seen why a bank rents some things and keeps others |

---

## Before You Start

**Accounts you may need (all free, all no-card):**

- A **Microsoft account** for Task 2 — a personal `outlook.com`/`hotmail.com`/Gmail
  address works. Create one at [signup.live.com](https://signup.live.com) if you
  don't have one.
- A **Google account** for Task 3 — your personal Gmail is fine.
- **Nothing** for Task 1 — the pricing calculators need no login.

**Ground rules — please read:**

- **Never enter a credit or debit card.** Nothing in this homework needs one. A
  card prompt means you've left the free path.
- **Use a personal email address, not your UBB account**, for these consumer
  sign-ups.
- **Don't put real personal or bank data anywhere.** Names of resources can be
  anything — `hw-test-rg`, `demo01`.
- **Delete what you create.** Task 2 tells you how; the sandbox also wipes itself.
- **Time-box yourself to 90 minutes.** The goal is a felt sense of the inside of a
  cloud, not completeness.

---

## Task 1 — Price a Small Banking Service *(~25 minutes, no login)*

You're going to cost the kind of service a Product Owner actually sponsors: a
small customer-facing API — a couple of always-on servers, some storage, and
traffic going out to customers' phones.

### 1a. Build the estimate

1. Open the **Azure Pricing Calculator**:
   [azure.microsoft.com/pricing/calculator](https://azure.microsoft.com/pricing/calculator/).
2. From the product list add **Virtual Machines**. Set:
   - Region: **West Europe**
   - Operating system: **Linux**
   - Tier: **Standard**, Instance: a small one (e.g. **B2s**, 2 vCPU / 4 GB)
   - Count: **2**, Hours: **730** (i.e. always on for a month)
3. Add **Managed Disks** (or accept the disks the VM added): 2 × **128 GB**, SSD.
4. Add **Bandwidth** (this is *outbound* / egress traffic): set **500 GB** per
   month for now.
5. Note the **monthly total** at the bottom. Take a screenshot.

### 1b. Change one architecture decision at a time

1. **Move the region.** Change the VM region from **West Europe** to
   **Germany West Central**, then to **East US**. Watch the total. Write down the
   three numbers.
2. **Turn up success.** Change **Bandwidth** from **500 GB** to **5,000 GB**
   (5 TB) — your product went viral. Note the new total and how much of it is now
   *just traffic*.
3. **Optional cross-check.** Open the
   [AWS Pricing Calculator](https://calculator.aws/) and rough out the same shape
   (2 × `t3.small`, 256 GB EBS, 5 TB data transfer out). You're not matching
   cents — you're checking that the *shape* of the bill is the same everywhere.

### 1c. Deliverable

A screenshot of your first estimate, plus **three sentences**:

- Which single line item was larger than you expected?
- By how much did moving *region* alone change the monthly total?
- What happened to the bill when traffic went 10×, and which takeaway does that
  match?

---

## Task 2 — Go Inside a Real Cloud (Microsoft Learn Sandbox) *(~35 minutes)*

The Microsoft Learn sandbox hands you a **real, temporary Azure subscription** —
real portal, real resources — for a few hours, with no account beyond a free
Microsoft login and **no card**. You'll use it to create one resource, see it,
and delete it.

### 2a. Open a sandbox module

1. Go to [learn.microsoft.com](https://learn.microsoft.com) and sign in with your
   personal **Microsoft account**.
2. Open this module:
   **"Create a Linux virtual machine in Azure"**
   ([aka.ms/learn](https://learn.microsoft.com/training/modules/create-linux-virtual-machine-in-azure/)
   — or search that exact title).
   *Gentler alternative, no command line:* the module
   **"Create an Azure Storage account"** — same sandbox, all done by clicking in
   the portal.
3. On the first unit that shows a green **"This module requires a sandbox"**
   banner, click **Activate sandbox** and accept the permissions prompt. Wait
   ~1 minute while Azure builds you a throwaway subscription.

### 2b. Follow the module

Work through the units in order. Along the way you will:

- open the **Azure Cloud Shell** (a terminal in the browser — just paste the
  commands the lesson gives you), **or** the **Azure portal** for the storage
  alternative;
- create a **resource group** — the folder every cloud resource lives in;
- create **one resource** — a small virtual machine, or a storage account;
- **see it appear**: in the portal, go to **Resource groups → [the one the lesson
  named] → ** and click your resource. Look at its **Location** (a real data
  centre region) and its **Overview** page.

Take a screenshot of your resource's Overview page in the portal.

### 2c. Clean up

1. In the portal, open the **resource group** the lesson created.
2. Click **Delete resource group**, type its name to confirm, and delete it.
3. Don't worry if you run out of time — the sandbox subscription is destroyed
   automatically when the module session ends, and everything in it with it. That
   self-destruct is itself a cloud idea: environments that only exist while
   they're needed.

### 2d. Deliverable

The portal screenshot from 2b, and **two sentences**: what did Azure set up and
run *for you* that you'd otherwise have had to do yourself, and what was the very
first thing every resource made you choose?

---

## Task 3 — Touch a Second Cloud (Google Cloud, No Card) *(~20 minutes)*

Different console, same rules underneath. You'll get in with just a Google
account and find the wall where "free to explore" stops.

### Route A — Console + Cloud Shell (recommended, nothing to sign up for)

1. Go to [console.cloud.google.com](https://console.cloud.google.com) and sign in
   with your personal **Google account**. Accept the terms. **Do not** click any
   "Activate" / "Start free trial" / "Add billing" button — you don't need it.
2. At the top, create a **project**: **Select a project → New project**, name it
   `hw-cloud-look`, **Create**. Projects are free and need no billing.
3. Click the **Cloud Shell** icon (a `>_` terminal, top-right). A real Linux
   machine starts — free, 50 hours a week. When it's ready, run:
   ```
   gcloud --version
   gcloud config list
   ```
   You are now driving Google Cloud from a command line, at no cost.
4. Now find the wall. In the search bar type **Compute Engine**, open it, and
   click **Create instance**. Fill in nothing — just read the screen. Google will
   tell you a **billing account** is required before you can start a VM. **Screenshot
   that message.** This is the exact line between the free "showroom" and renting
   real capacity.
5. *(Optional)* Open **BigQuery** from the menu. Its **sandbox** lets you run real
   SQL over public datasets — 1 TB of queries a month, still no card. Try:
   `SELECT name, number FROM \`bigquery-public-data.usa_names.usa_1910_2013\` WHERE state = 'NY' ORDER BY number DESC LIMIT 10;`

### Route B — Google Cloud Skills Boost (if Route A won't let you in)

1. Go to
   [cloudskillsboost.google](https://www.cloudskillsboost.google/) and create a
   free account.
2. Open the free lab **"A Tour of Google Cloud Hands-on Labs"** (search it; it is
   marked **Introductory** and costs **0 credits**).
3. Click **Start Lab**. It gives you temporary sign-in details for a real,
   Google-owned Google Cloud console. Follow the lab to open the console, find
   your way around, and open Cloud Shell. Click **End Lab** when done.

### Deliverable

Your screenshot of the "billing account required" message (Route A) *or* the lab
completion screen (Route B), and **one sentence**: name one thing that was
identical between the Azure console in Task 2 and the Google console here.

---

## Reflection — the part you hand in *(~10 minutes)*

Half a page, in your own words. Don't summarise the tasks — answer these:

1. Which of the six lesson takeaways did you **feel** during this homework rather
   than just hear in the room? Point to the exact moment.
2. Every resource you touched made you pick a **region** first. Why does that
   matter more for UBB than for most companies?
3. Where did you watch a **cost** turn into an **architecture choice** — a
   decision someone in your role would actually sponsor or challenge?
4. From what you now know: name one system at UBB that clearly *should* run in a
   cloud like this, and one that clearly *should not* — and say why in one line
   each.

Bring this to the next session; we open the case study with a few of these read
out.

---

## Bonus Challenge 🌟 — Deploy something real, for free

Finished early and want to see a "deploy" actually finish?

1. Create a free **Cloudflare** account at
   [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up) — no card
   for Workers.
2. Go to **Workers & Pages → Create → Create Worker**. Accept the default
   "Hello World" code, click **Deploy**.
3. In ~20 seconds you get a live URL like
   `https://hw-worker.<your-name>.workers.dev`. Open it. That code is now running
   in hundreds of cities. You provisioned no server, patched no OS, and picked no
   region — that's the far end of the PaaS/SaaS spectrum from Lesson 2.
4. *(Optional)* In **Quick edit**, change the response text to
   `Hello from <your name> in the cloud`, redeploy, refresh.

Deliverable: paste your `workers.dev` URL into the reflection.

---

## Troubleshooting

| Symptom | Most likely cause / fix |
|---|---|
| A page is asking for a credit card | You clicked "start free trial" or "activate account". Back out. Task 1 needs no login; Task 2 uses **Activate sandbox**; Task 3 uses the plain console, not "Activate". |
| "Activate sandbox" is greyed out or says limit reached | Learn allows a limited number of sandbox activations per day. Wait a few hours, or switch to the storage-account module which uses a shorter session. |
| Sandbox expired mid-module | Expected. Re-activate and restart that unit — nothing you build there is meant to last. |
| Google Cloud keeps pushing me to add billing | Don't. You can create a project, use Cloud Shell, and use BigQuery sandbox without it. If it fully blocks you, use Route B (Skills Boost). |
| Cloud Shell won't start | Close the tab, reopen the console, try again — it occasionally needs a second attempt to provision. |
| Pricing calculator totals look wildly different between Azure and AWS | Fine. You're comparing the *shape* of the bill (compute + storage + traffic), not the exact price. |

---

## The Bigger Picture

- The cloud you rent and the cloud in the training sandbox are the **same
  infrastructure**. The only thing the sandbox removes is the bill and the
  paperwork — which, for a bank, is most of the actual decision.
- Every resource starts with a **region** because *where the bytes physically sit*
  is a regulated question before it is a technical one.
- The bill is not sent to you at the end — it is **designed in** at the start, in
  choices about instance size, storage tier, redundancy, and traffic. That's why
  a PO should see it.
- Whether a given system moves to a cloud like the ones you just touched is
  decided **system by system**. The next lesson (Containers & Deployment
  Platforms) and the Module 2 case study are about making exactly that call.

---

## Notes for the lecturer

*Not part of the participant handout — delete before sending, or keep on a
separate page.*

- **Verify the sign-up flows yourself ~1 week before sending.** Free-tier and
  sandbox terms change often. Click through: Learn sandbox activation, a fresh
  Google account into the console, and both pricing calculators. Confirm the named
  Learn modules still carry the sandbox badge; swap in any current
  "Azure fundamentals" sandbox module if not.
- **Support burden:** Task 1 ≈ zero. Task 3 Route A ≈ low. Task 2 is where
  questions cluster — sandbox activation limits and the CLI copy-paste. Point
  nervous participants at the storage-account (portal-only) alternative up front.
- **What to demo live in the session** (so homework is recognition, not
  discovery): 3–4 minutes on the Azure pricing calculator with the region and
  egress sliders, and 60 seconds showing the Google Cloud "billing required" wall.
  Leave the sandbox for them to do at home.
- **Expected "aha" per task:** T1 — egress and region are line items, not
  footnotes. T2 — how much the provider operates for you. T3 — the console is a
  free showroom; capacity is the product.
- **Marking:** the reflection is the only graded artefact. Look for a specific
  moment tied to a specific takeaway, not a recap. Screenshots are a
  completion check only.
- **Ties back to:** M2 L1 (the pipeline's "deploy to what?"). **Ties forward to:**
  M2 L3 case (scaling backend services) and the M2 L2 migration case study.

---

*Cloud Fundamentals Homework · Module 2, Lesson 2 · KBC IT Academy*
