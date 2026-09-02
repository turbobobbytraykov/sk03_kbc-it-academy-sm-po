# 📦 Containers & Deployment Platforms — Homework Assignment

Welcome to your hands-on homework for **Module 2, Lesson 3 — Containers &
Deployment Platforms**.

In Lesson 1 your pipeline produced an **artifact**. In Lesson 2 you went inside a
cloud **console**. This time you meet the thing in the middle: you'll start a
real **container** in your browser, look at what's inside it, then hand a few
containers to a small **Kubernetes** cluster and watch it keep them running
without being asked.

Everything runs on a **free website in your browser**. You install nothing. This
matters: containers normally want a Linux machine with a few GB of RAM to spare,
and a training laptop is the wrong place to find that. The playgrounds below give
you throwaway Linux machines for as long as you need them, which is all this
exercise takes.

No coding experience is required. **One free login** and a browser are enough.
Budget **about 55 minutes** — most people finish faster. There is **less to do
than last time**, on purpose.

---

## What You Will Do

1. **Task 1 — Run a container.** Start a small container in a browser terminal,
   look at it with `docker ps` / `logs` / `exec`, write a file inside it, throw
   it away, start a fresh one, and see that your file is gone.
2. **Task 2 — Look inside a Pod.** Hand one container to a small Kubernetes
   cluster, read what `kubectl describe pod` tells you, then delete the pod and
   watch the cluster quietly replace it.
3. **Bonus — Scale it, then poke it.** Ask for four copies instead of one, delete
   one at random, and see what the platform does.

Copy-paste commands are given for every step. You are not expected to remember
any of them.

---

## How This Connects to the Lecture

| Lecture point | Where you will see it in this exercise |
|---|---|
| A container is **an ordinary process with restrictions**, not a small VM | Task 1: `docker top` lists it as a normal process on the host machine |
| An **image is read-only**; the container's writable layer dies with it | Task 1: the file you created inside vanishes when the container is replaced |
| You **never patch a container, you rebuild it** | Task 1: "fixing" a running container by hand doesn't survive a restart |
| A **Pod** is a group that shares one IP address and one lifecycle | Task 2: `describe pod` shows the IP, the container, and the node it sits on |
| **Restart Count** is a signal nobody was watching | Task 2: you'll find it in the describe output and know what it means |
| **Self-healing**: the platform restarts things without waking anyone | Task 2: delete a pod, a new one appears in seconds |
| **Horizontal scaling** = more instances, not bigger ones | Bonus: one command takes you from 1 copy to 4 |

---

## Before You Start

**The one account you need:** a free **LabEx** login at
[labex.io](https://labex.io) — sign up with a personal Google or GitHub account,
or an email address. That is the only sign-up in this homework, and the same
account covers both tasks.

The free plan gives you **three virtual machines per day** and asks for **no
credit card**. Task 1 uses one, Task 2 uses one, and the third is your spare if
something goes wrong. Reading the pages costs nothing — only starting an
environment uses one up.

*(A note on why this page names specific websites: Docker's own "Play with
Docker" playground, which this kind of exercise used for years, was shut down on
1 March 2026. Everything below was re-checked in September 2026.)*

**Ground rules:**

- **Nothing to install.** Every command runs in a terminal *on the web page*.
- **No credit card, ever.** None of these sites ask for one.
- **Use a personal Google/GitHub account or a personal email**, not your UBB
  account.
- **Don't paste real personal or bank data anywhere.** Resource names can be
  anything — `web`, `demo`, `hw`.
- **Sessions are disposable** and wipe themselves when they end. That is fine —
  and it is the same "environments that exist only while needed" idea from
  Lesson 2. If a session ends mid-task, start a fresh one and carry on.

**If a playground won't start for you**, each task below has its own *Plan B*
box. They are all free and all work in a browser.

---

## Task 1 — Run a Container in Your Browser *(~20 minutes)*

### 1a. Open a Docker playground

1. Go to the LabEx **Online Docker Playground**:
   [labex.io/tutorials/docker-online-docker-playground-372912](https://labex.io/tutorials/docker-online-docker-playground-372912)
2. Sign in, then click **Launch Docker Playground (Free)**.
3. Wait a few seconds for the environment to build. Choose the **Web Terminal**
   view — you now have a real Linux machine with Docker already installed.
   Everything below is typed (or pasted) into that terminal.

> **Plan B — iximiuz Labs.** [labs.iximiuz.com/playgrounds](https://labs.iximiuz.com/playgrounds)
> → sign up (two clicks, GitHub / GitLab / Google) → start the **Docker**
> playground, *"a Linux server with Docker engine pre-installed"*. Every command
> in this task works there unchanged. Its free plan allows one playground at a
> time and one hour of running time a day, so press **Stop** when you finish.
>
> **Plan C — Google Cloud Shell.** You already have this from the Lesson 2
> homework and it needs **no new account at all**. Open
> [console.cloud.google.com](https://console.cloud.google.com), sign in with the
> same personal Google account, click the **Cloud Shell** icon (`>_`, top right),
> and wait for the terminal. Docker is pre-installed there. Use this one if your
> work laptop blocks the other two.

### 1b. Start something and look at it

Run these one at a time:

```
docker run hello-world
```

That pulled a tiny image and ran it once. Now start one that keeps running:

```
docker run -d --name web nginx
docker ps
docker logs web
```

`docker ps` shows your container is up. `docker logs web` shows what it printed —
this is the same "logs go to stdout" point from the lecture.

Now step inside it:

```
docker exec -it web sh
```

Your prompt changes — you are now *in* the container. Look around:

```
ls /
cat /etc/os-release
```

Notice how little is there: no second operating system, just enough files to run
one web server. Leave a mark and exit:

```
echo "homework by <your name>" > /tmp/note.txt
cat /tmp/note.txt
exit
```

You're back on the host machine. Now ask the *host* what that container really is:

```
docker top web
```

There it is — an ordinary Linux process, with an ordinary process ID, running on
the machine you were already logged into. That is the whole trick. A container
isn't a small computer; it's a process the kernel has been told to keep in its
own corner.

### 1c. Throw it away and start again

```
docker rm -f web
docker run -d --name web nginx
docker exec web cat /tmp/note.txt
```

The last command fails: **`No such file or directory`**. Same image, brand-new
container, and your file is gone. Anything written inside a running container
lives only in its throwaway writable layer. This is why "just SSH in and fix it"
is not a thing with containers.

**Close the environment when you're done** — Task 2 uses a different one.

### 1d. Deliverable

A screenshot of the failed `cat /tmp/note.txt`, plus **three sentences**:

- What surprised you about what was (or wasn't) inside the container?
- Where did your `note.txt` file go, and why?
- Which lesson takeaway does that match?

---

## Task 2 — Look Inside a Pod *(~25 minutes)*

### 2a. Open a Kubernetes playground

1. Go to the LabEx **Online Kubernetes Playground**:
   [labex.io/tutorials/kubernetes-online-kubernetes-playground-593609](https://labex.io/tutorials/kubernetes-online-kubernetes-playground-593609)
2. Click **Launch Kubernetes Playground (Free)** — same account as Task 1.
3. Open the **Web Terminal** and check the cluster is there:

```
kubectl get nodes
kubectl version
```

One node, and a Kubernetes version number. It is a small cluster — a single
machine doing both jobs — but it is a real one, running a real Kubernetes API.
Every command below is the same command you would type against the cluster
running a bank's production services.

> **Plan B — iximiuz Labs.** Start the **Kubernetes Cluster (K3s)** playground:
> four machines, a control plane and two workers, with `kubectl` ready. Same
> account you'd have made for Task 1's Plan B.
>
> **Plan C — Killercoda.** [killercoda.com/playgrounds/scenario/kubernetes](https://killercoda.com/playgrounds/scenario/kubernetes)
> gives a real two-node cluster after a free sign-in. **Be patient with it:** on a
> free account the environment can take several minutes to appear. That is normal,
> it is not broken — wait, and do not reload the page, which sends you to the back
> of the queue.
>
> Both fallbacks give you more than one machine, so the `NODE` column in step 2b
> actually varies. Worth seeing if you're curious; not required.

### 2b. Hand it a container

```
kubectl create deployment web --image=nginx --replicas=1
kubectl get pods
```

Run `kubectl get pods` a couple of times until the pod shows `Running`. You asked
for one copy of `nginx`; the cluster created a **pod** to hold it and is now
responsible for keeping it alive.

```
kubectl get pods -o wide
```

This adds two columns: the pod's own **IP address** and the **node** it landed
on. You didn't choose either — the scheduler placed the pod and the network gave
it an address. On a cluster with more than one machine, that `NODE` column is
where you find out which server your service is actually running on.

### 2c. Read the pod's description

Copy the pod name from the list (it looks like `web-xxxxxxxxxx-yyyyy`) and run:

```
kubectl describe pod <paste-the-pod-name-here>
```

Find these five lines in the output — this is the whole point of the task:

| Look for | What it tells you |
|---|---|
| `Node:` | which machine the pod is running on |
| `IP:` | the pod's single shared address (lecture: one IP per pod) |
| `Image:` | exactly which image is running — never guess this in an incident |
| `Restart Count:` | how many times this container has crashed and come back |
| `Events:` (at the bottom) | the play-by-play: Scheduled → Pulling → Pulled → Created → Started |

### 2d. Delete the pod and watch

```
kubectl delete pod <the-same-pod-name>
kubectl get pods
```

Within a few seconds a **new pod appears with a new name**. You told the cluster
"I want one copy of this running" once, and it holds that true — you don't have
to ask again. Nobody was paged. That is self-healing, and the lecture's warning
is that it treats a healthy pod exactly the same way when a probe is wrong.

### 2e. Deliverable

A screenshot of your `kubectl describe pod` output, plus **two sentences**:

- What was the `Restart Count` on your pod, and what would a high number there
  tell you about a service?
- What did the cluster do after you deleted the pod, and who asked it to?

---

## Reflection — the part you hand in *(~10 minutes)*

Half a page, in your own words. Don't recap the steps — answer these:

1. Which lesson takeaway did you actually **feel** during this homework, rather
   than just hear in the room? Point to the exact moment.
2. In Task 1 you couldn't keep a file inside a container. In Task 2 you couldn't
   keep a pod from being replaced. What do both of those tell you about where a
   service is allowed to store anything important?
3. **Bring to next session:** pick one service you work with or hear about in
   stand-ups, and give a one-line answer to: *is it stateless, stateful, or
   secretly stateful?* Be ready to say why.

We open the next session by reading a few of these out.

---

## Bonus Challenge 🌟 — Scale it, then poke it

Still in the Task 2 Kubernetes playground, and finished early:

```
kubectl scale deployment web --replicas=4
kubectl get pods
```

Four pods now, from one command — that's horizontal scaling. Nothing was made
bigger; there are simply more copies. Delete one at random:

```
kubectl delete pod <any-one-of-the-four>
kubectl get pods
```

You're back to four within seconds: the cluster noticed it was one short of what
you asked for and fixed it. Scale back down when you're done:

```
kubectl scale deployment web --replicas=1
```

**Deliverable:** one sentence in your reflection — what did the platform do
without you telling it to, step by step, and which slide does that match?

---

## Troubleshooting

| Symptom | Most likely cause / fix |
|---|---|
| "Log In to Continue" | Expected. Reading the page is free; starting an environment needs the free account. Sign in with Google, GitHub or email. |
| You've run out of environments for today | The free plan is **three virtual machines per day**. It resets tomorrow — do the other task then. Doing Task 1 one evening and Task 2 the next is completely fine. |
| The terminal is blank, frozen, or the session ended | Reload the page and start the environment again; nothing you did was meant to last. If that burns your third VM of the day, use a Plan B. |
| `docker: command not found` | You launched a different environment. Go back to the Docker playground page and use its own launch button. |
| `permission denied while trying to connect to the Docker daemon` | You're logged in as a non-root user. Put `sudo` in front of the command: `sudo docker ps`. |
| `docker run` hangs or can't reach Docker Hub | Free environments sometimes restrict outbound network access. Try again; if it keeps failing, switch to the Cloud Shell Plan C for Task 1. |
| `kubectl get pods` says `No resources found` | The `create deployment` command didn't run. Re-run step 2b. |
| Pod is stuck in `ContainerCreating` for a minute | Normal on first run — it's pulling the image. Run `kubectl get pods` again. |
| `describe pod` says `NotFound` | The pod name changed after a delete/restart. Run `kubectl get pods` and copy the current name. |
| Killercoda takes forever to open | Expected on a free account. Wait it out; reloading puts you back in the queue. |
| A page asks for a credit card | You've wandered off the free path. Nothing in this homework needs a card — go back to the playground page. |

---

## The Bigger Picture

- A container is not a shrunken server. It's one process, a slice of a filesystem,
  and a set of limits — which is why it starts in a second, why `docker top` shows
  it as an ordinary process, and why it can't keep anything.
- "Fix it in production by hand" doesn't survive the next restart. The only way
  to change what runs is to build a new image and deploy it — a delivery task,
  not a sysadmin one.
- A Pod is the smallest unit a platform will manage for you: one IP, one
  lifecycle, one place to look. `describe pod` is the first thing anyone opens
  when a service misbehaves.
- Self-healing and scaling are the platform doing work for you — and doing it
  whether or not the thing it's reacting to is actually broken. Module 3 is about
  making those reactions deliberate.
- Next: **[M2 L4] Platform & Environment Design** — how these building blocks get
  arranged into dev, test, staging and production, and who is allowed to touch
  each one.

---

## Notes for the lecturer

*Not part of the participant handout — delete before sending, or keep on a
separate page.*

### Playground landscape — rewritten 2 Sep 2026

The original version of this homework used Killercoda for both tasks with Play
with Docker / Play with Kubernetes as fallbacks. **All three of those premises
were wrong or dead.** What was checked, and what came back:

| Site | Status on 2 Sep 2026 |
|---|---|
| **LabEx** | **Now the primary for both tasks.** Free tier: **3 virtual machines per day, no card**. Has an Online Docker Playground and an Online Kubernetes Playground, so one account covers the whole homework. **It is not login-free** — the tutorial text reads without an account, then "Log In to Continue" → Google / GitHub / email. Do not describe it to the room as instant. |
| **Play with Docker** | **Shut down 1 March 2026.** Docker's own announcement points people at iximiuz Labs and Google Cloud Shell as replacements. |
| **Play with Kubernetes** (`labs.play-with-k8s.com`) | Long unreliable and effectively abandoned; multiple open issues on the Kubernetes website repo. Do not send anyone there. |
| **iximiuz Labs** | Plan B for both tasks. Free tier needs a two-click sign-up (GitHub / GitLab / Google). Has a Docker playground *and* a four-VM K3s cluster (dev machine + control-plane + two workers, real Firecracker VMs rather than Docker-in-Docker). Free plan: 1 concurrent playground, **1 hour total runtime per day**. |
| **Killercoda** | Plan C for Task 2 only. Its Kubernetes playground is a real two-node kubeadm cluster, but it has **no Docker playground** — the catalogue is Ubuntu, Kubernetes, CKS, CKA, CKAD, CNPE, Theia. Free-tier start-up is slow enough to need the explicit warning that is in the handout. |
| **Google Cloud Shell** | Plan C for Task 1. Docker is pre-installed; free with a plain Google account, **no billing account required**. They already opened it in the Lesson 2 homework, so it is the only option that costs them **zero new sign-ups** — and being a Google domain, it is the most likely to survive a bank proxy. |

**The conclusion worth knowing: there is no longer a credible browser playground
that needs no login at all.** Every option gates the environment behind a free
account. So the design principle is "**one sign-up, one site, both tasks**", with
fallbacks that either reuse an account they already have (Cloud Shell) or cost one
more.

### Two details worth knowing before you teach it

- **LabEx's Kubernetes playground is a single-node Minikube**, not a multi-node
  cluster. Every teaching point in Task 2 survives — pod, IP, image, restart count,
  events, self-healing, scaling — but the `NODE` column doesn't vary, so the
  "the scheduler put it somewhere you didn't choose" line lands softer. The Plan B
  box points anyone curious at the multi-node fallbacks. If you want a live demo
  where the node column actually moves, use iximiuz K3s on the projector.
- **The playground's Kubernetes version is behind the current release** — it was
  1.35.x in September 2026, against 1.37 as the current version. That is a free
  gift for the "what it costs to run" slide: even a teaching platform is two
  versions back, because upgrading a cluster is real work on somebody else's
  schedule. Worth thirty seconds if the room is engaged.

### Before you send

- ⚠️ **Run both tasks yourself on a fresh free LabEx account, ~1 week before
  sending.** Confirm the two launch buttons still say "(Free)", that `docker pull`
  reaches Docker Hub from the free environment, and how many of the three daily
  VMs a single restart costs. If anything has moved, both fallbacks are already
  written into the handout, so it is a five-minute edit.
- **Corporate laptops.** All of these are websocket terminals, which some
  corporate proxies dislike. Cloud Shell is a Google domain and is the most likely
  to survive a bank proxy — another reason it stays in the handout.
- ⚠️ **Filename mismatch, still open.** The deck's homework slide prints
  `M2-L3-CONTAINERS.MD`; this file is `M2-L3-CONTAINERS-AND-DEPLOYMENT-PLATFORMS.MD`,
  matching the M2 L4 and M3 L2 convention. Fix the deck string in
  `content_m2l3.py` and rebuild, or rename this file — but do it before sending.

### Delivery

- **Deliberately lighter than the L2 homework.** One login, copy-paste commands,
  ~55 minutes. If the room found L2 daunting, say so up front so they don't
  over-prepare.
- **Support burden:** Task 1 ≈ low. Task 2 is where questions cluster — copying
  the pod name correctly, and the `ContainerCreating` wait. Tell them the pod name
  changes every time a pod is recreated.
- **`docker top` replaced `ps aux`** (2 Sep 2026). The official `nginx` image does
  not ship `ps`, so the original instruction failed for everyone who tried it.
  `docker top` runs on the host, always works, and makes the better point anyway:
  the container is an ordinary process on a machine they are already logged into.
- **What to demo live** (so the homework is recognition, not discovery): 3 minutes
  running a container and `exec`-ing in, 60 seconds deleting a pod and watching it
  come back. Leave the rest for home.
- **Expected "aha" per task:** T1 — a container keeps nothing, and it was never a
  small computer. T2 — you declare a desired state once and the platform maintains
  it.
- **Marking:** the reflection is the only graded artefact. Look for a specific
  moment tied to a specific takeaway. Screenshots are a completion check only.
- **Ties back to:** M2 L1 (the artifact), M2 L2 ("deploy to what?", disposable
  environments, and the Cloud Shell they already opened). **Ties forward to:** the
  M2 L3 case (scaling backend services under load) and M2 L4 (environments).

---

*Containers & Deployment Platforms Homework · Module 2, Lesson 3 · KBC IT Academy*
