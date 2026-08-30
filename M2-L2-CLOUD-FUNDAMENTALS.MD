# ☁️ Cloud Fundamentals — Homework

Module 2, Lesson 2. Three short tasks, all in a browser.

In Lesson 1 your pipeline ended at the word **"deploy"** — deploy to *what*?
Here you go and look at the *what*: you price a small service the way a business
case is priced, put something live on the internet, and look inside a real cloud
console.

**About 55 minutes in total.** Do them in any order, on any day. Task 2 is the
quickest and the most satisfying, so start there if you only have twenty minutes.

**You will never need a credit card.** If a screen asks for card details, you have
wandered onto a paid path — back out. Nothing here needs one.

---

## Before You Start

**What you need:**

- Task 1 — nothing at all. The pricing calculators need no login.
- Task 2 — a free **Cloudflare** account (email + password).
- Task 3 — a **Google account**. Your personal Gmail is fine.

**Three ground rules:**

- Use a **personal email address**, not your UBB account, for these sign-ups.
- Don't put real personal or bank data anywhere. Call things `demo01`, `hw-test`.
- Never enter a card. Never click "Start free trial", "Activate account" or
  "Add billing".

---

## Task 1 — Put a price on a small service *(~20 minutes, no login)*

You're going to cost the kind of service a Product Owner actually sponsors: a
small customer-facing API. Two always-on servers, some storage, and traffic going
out to customers' phones.

### Build the estimate

1. Open the **Azure Pricing Calculator**:
   [azure.microsoft.com/pricing/calculator](https://azure.microsoft.com/pricing/calculator/)
2. Find **Virtual Machines** in the product list and add it. Set:
   - Region: **West Europe**
   - Operating system: **Linux**
   - Instance: a small one, e.g. **B2s** (2 vCPU / 4 GB)
   - Count: **2**
   - Hours: **730** — that's "always on for a month"
3. Add **Managed Disks**: 2 × **128 GB**, SSD. (The calculator may have added
   disks for you already — fine either way.)
4. Add **Bandwidth**. This is *outbound* traffic, the data leaving the cloud.
   Set it to **500 GB** per month.
5. Look at the **monthly total** at the bottom.

### Now change one thing at a time

1. **Move it.** Change the VM region from **West Europe** to
   **Germany West Central**, then to **East US**. Write down the three totals.
2. **Make it succeed.** Change **Bandwidth** from **500 GB** to **5,000 GB** —
   your product went viral. Look at the new total, and at how much of it is now
   just traffic.

### What to notice

- Which line was bigger than you expected?
- How much did moving *region alone* change the monthly total?
- When traffic went up 10×, what happened to the bill?

---

## Task 2 — Put something live on the internet *(~15 minutes)*

The fastest way to feel what "deploy" means when there is no server to log into.

1. Create a free account at
   [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up) — email and
   password, no card.
2. In the left-hand menu go to **Workers & Pages**.
3. Click **Create**, then **Create Worker**. Give it a name like `hw-demo`.
4. Leave the default "Hello World" code exactly as it is. Click **Deploy**.
5. Wait about twenty seconds. You get a live address like
   `https://hw-demo.<your-name>.workers.dev`. **Open it in a new tab.**

That code is now running in hundreds of cities. You picked no server size, no
operating system, no region, and no disk.

6. *(Optional, 2 minutes)* Click **Edit code**, change the text it returns to
   something of your own, and deploy again. Refresh your tab.
7. **Tidy up:** go to your Worker's **Settings** and delete it. It costs nothing
   to leave, but deleting what you create is a good habit.

### What to notice

- How long the whole thing took, compared with getting a test environment at work.
- How many decisions you were *not* asked to make.
- Look back at the IaaS / PaaS / SaaS slide. Which end of that scale is this?

---

## Task 3 — Look inside a real cloud *(~20 minutes)*

Different console, same rules underneath. You get in with just a Google account,
and you find the wall where "free to look around" stops.

1. Go to [console.cloud.google.com](https://console.cloud.google.com) and sign in
   with your personal **Google account**. Accept the terms.
   **Do not** click "Activate", "Start free trial" or "Add billing" — you don't
   need any of them.
2. At the top, create a project: **Select a project → New project**. Name it
   `hw-cloud-look` and click **Create**. Projects are free and need no billing.
3. Click the **Cloud Shell** icon — the `>_` symbol, top right. A real Linux
   machine starts up for you, free, up to 50 hours a week. When the prompt
   appears, type:

   ```
   gcloud --version
   ```

   You are now driving Google Cloud from a command line, at no cost. That is the
   whole of step 3 — you don't need to understand the output.

4. **Now find the wall.** In the search bar at the top type **Compute Engine**,
   open it, and click **Create instance**. Fill in nothing. Just read the screen:
   Google tells you a **billing account** is required before you can start a
   virtual machine.

That message is the exact line between the free showroom and renting real
capacity.

### What to notice

- Name one thing that looked the same here as in the Azure pricing calculator.
- Before Google would let you create anything, what did it make you choose first?

---

## How this connects to the lesson

| Lesson point | Where you feel it |
|---|---|
| Cloud is a commercial model before it is a technology | Task 1: you build a *bill*, not a server. Task 3: the console is free, capacity is not |
| IaaS / PaaS / SaaS is about how much you stop operating | Task 2: you deployed working code and operated nothing |
| Cost is an architecture decision | Task 1: one slider moves the monthly figure |
| Egress is the line item that surprises people | Task 1: 500 GB → 5 TB |
| Data residency is a binding constraint for a bank | Tasks 1 and 3: everything makes you pick a *region* first |

---

## If something goes wrong

| What you see | What to do |
|---|---|
| A page asks for a credit card | You've clicked "start free trial" or "activate". Back out. None of these tasks need it. |
| Google keeps pushing you to add billing | Ignore it. You can create a project and use Cloud Shell without it. Being blocked from creating a VM is the point of Task 3. |
| Cloud Shell won't start | Close the tab, reopen the console, try again. It sometimes needs a second go. |
| Cloudflare asks you to add a domain | Skip it. Workers gives you a free `workers.dev` address; you don't need a domain. |
| Azure and AWS calculator totals look very different | That's fine. You're comparing the *shape* of the bill, not the exact price. |

---

## The bigger picture

- Every resource starts with a **region**, because where the bytes physically sit
  is a regulated question before it is a technical one.
- The bill isn't sent to you at the end. It is **designed in** at the start, in
  choices about size, storage and traffic. That is why a PO should see it.
- Whether a given system moves to a cloud like these is decided **system by
  system** — which is exactly what the case study in the session was about.

---

## Notes for the lecturer

*Not part of the participant handout — delete before sending, or keep on a
separate page.*

- **The Microsoft Learn sandbox is gone.** Microsoft retired it (confirmed by
  October 2025); modules now say "Sandboxes are no longer available" and point at
  a 30-day trial or pay-as-you-go, both of which need a card. There is currently
  **no** no-card route to creating a resource in Azure, and these are bank
  employees, not students, so Azure for Students does not apply. The old Task 2
  was removed for that reason and the Cloudflare deploy promoted in its place — it
  keeps the "make something real, then delete it" moment, needs no card, and takes
  a third of the time.
- **Re-check the sign-up flows about a week before sending.** Free tiers move.
  Click through Cloudflare sign-up, a fresh Google account into the console, and
  both pricing calculators.
- **Support burden:** Task 1 ≈ zero. Task 2 ≈ zero. Task 3 is where the questions
  come from, and they are all "it wants billing details" — which is the lesson.
- **Demo in the session** so the homework is recognition rather than discovery:
  3–4 minutes on the Azure calculator moving the region and egress sliders, and
  60 seconds on the Google "billing required" wall.
- **Nothing is handed in.** Most participants skip homework; this version is
  written so that doing only Task 2 is still worth something. Open the next
  session by asking who got a `workers.dev` URL working.
- **Ties back to:** M2 L1, the pipeline's "deploy to what?".
  **Ties forward to:** M2 L3, containers and deployment platforms.

---

*Cloud Fundamentals Homework · Module 2, Lesson 2 · KBC IT Academy*
