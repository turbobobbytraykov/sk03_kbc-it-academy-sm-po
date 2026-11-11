# Google's SRE Book, Second Edition (2026) - What Changed for Module 3, Lesson 5

A reading note for **Module 3, Lesson 5 - Incident Management & Reliability**.

The lesson used Google's *Site Reliability Engineering: How Google Runs Production
Systems* as its source for incident roles, service level objectives, error budgets and
post-mortems. Every one of those citations points to the first edition, published in
2016. A second edition appeared in autumn 2026, ten years later, and Google describes it
as completely rewritten.

This note compares the two editions on the practices the lesson touched, and says what
each difference could mean in a bank such as UBB. It was researched on 12 Nov 2026.

---

## Read This First: What This Note Is Based On

**The full text of the second edition was not read for this note.** The book is paid
content and is a few weeks old. The comparison is built from what is public:

| Label used below | What it means |
|---|---|
| **Contents** | The heading is in the published table of contents. Chapter titles were read on the publisher's page. Section headings come from a bookseller's copy of the same contents list, and they match the publisher's previews wherever the two overlap. |
| **Preview** | The point is made in the opening paragraphs of a chapter, which the publisher shows without a subscription. |
| **Google** | The point is made in Google's own announcement of 13 Oct 2026. |
| **Not verified** | The answer needs the text of the book. Nothing public settles it. |

A heading tells you a topic is covered. It does not tell you what the book concludes
about it. Where this note says a chapter "no longer exists", it means there is no
chapter with that title. The practice may still be described inside another chapter.

The first edition is still free to read at `sre.google/sre-book`, so every link the
lesson gave you still works. On 12 Nov 2026 Google's books page listed no free online
version of the second edition.

---

## The Short Version

1. **Nothing the lesson taught is contradicted by what is public.** The definitions of
   SLI, SLO and SLA, the error budget, blameless post-mortems and a structured incident
   response are all still in the book.
2. **The book has moved from "how Google does it" towards "how people and organisations
   do it".** The preface says the technology has become standard and can be bought, so
   this edition spends its pages on teams, culture, authority and business value.
3. **Three additions matter most for this course:** a named incident lifecycle, a chapter
   on analysing incidents where no single component failed, and material on how
   reliability targets combine across suppliers.
4. **One addition is new ground for the lesson:** artificial intelligence in incident
   response, including tools that act in production.
5. **The regulatory half of the lesson is untouched.** Nothing in the contents covers
   incident classification or a reporting clock. Those still come from DORA and from
   the bank's own procedures.
6. **Independent reviews are thin so far.** Most coverage repeats Google's announcement.

---

## The Two Editions Side by Side

| | First edition (2016) | Second edition (2026) |
|---|---|---|
| Size | 552 pages, 34 chapters | 796 pages on the publisher's listing, 23 chapters |
| Organised by | Principles, practices, management | Six parts, from *SRE in Context* to *Outlook* |
| Editors | Beyer, Jones, Petoff, Murphy | The same four, plus Christof Leng and David Huska |
| Free online | Yes | Not listed on 12 Nov 2026 |
| Outside case studies | Almost none | Etsy, a multinational bank, a mortgage lender, Waymo |

Retailers disagree on the release date and the page count. The publisher's page says
September 2026 and 796 pages. Google announced the book on 13 Oct 2026.

**The chapter numbers no longer match.** This matters because the lesson cited chapters
by number.

| The lesson cited (first edition) | That number in the second edition is | The topic now lives in |
|---|---|---|
| Chapter 3, *Embracing Risk* - error budgets | *Trends in Production* | Chapter 4 and Chapter 8 |
| Chapter 4, *Service Level Objectives* | *The Cultural Context of SRE* | Chapter 8 |
| Chapter 14, *Managing Incidents* | *Testing* | Chapter 10 |
| Chapter 15, *Postmortem Culture* | *Capacity Planning* | Chapter 11 and Chapter 12 |

If you quote the book at work, say which edition you mean.

---

## Practice by Practice

Each part below follows a section of the lesson: what the lesson said, what the second
edition shows, and what that could mean in a bank.

### 1. The incident lifecycle

**In the lesson.** Detect, declare, respond, mitigate, resolve, learn. The first edition
has no single lifecycle. The lesson assembled one from three chapters.

**In the second edition.**

- Chapter 10 has a section called *The Lifecycle of an Incident* with six stages:
  detection, triage, investigation, mitigation, resolution, learning. *(Contents)*
- Mitigation and resolution are separate stages, which is the lesson's point that you
  stop the harm before you fix the cause. *(Contents)*
- The chapter opens by defining an incident and separating it from an outage and from a
  bug. *(Preview)*
- "Declare" is not one of the six headings. The word appears once, in the Etsy case
  study, as *Detection and declaration*. *(Contents)*

**For UBB.** The lesson treated declaring as its own step because under DORA the
four-hour deadline runs from the moment an incident is classified as major. The book is
written for engineering organisations in general and has no reason to single that step
out. Keep it as a step of your own. The book's definition of an incident is worth
comparing with the one your own incident procedure uses, because the two were written
for different purposes and may not match.

### 2. Roles, and who is allowed to do what

**In the lesson.** Three permissions: who may INFORM, who may DECIDE, who may ACT. The
first edition's four role names (incident command, operations, communication, planning)
were the source of the idea but were not used as vocabulary.

**In the second edition.**

- *Managing Incidents* and *Being On-Call* are merged into one chapter, *Incident
  Management and On-Call*. *Emergency Response* and *Effective Troubleshooting* no
  longer exist as chapters. *(Contents)*
- A new section covers **incident response teams**: how a large organisation spreads
  incident response across units, how a small one starts its first team, and the
  drawbacks. It lists two alternatives by name: consensus-driven response, and
  executives as incident commanders. *(Contents)*
- Chapter 22 has a section on organisations that cannot copy Google's model. Two of its
  headings are *Access and authority during incidents* and *Autonomy and authority to
  prevent incidents*. Others are *Closed systems*, *Heterogeneity and silos* and *Humans
  in the loop*. *(Contents)*
- The same chapter has a case study titled *Large Multinational Investment and Consumer
  Bank*, and another on a large mortgage lender. The bank is not named in the contents.
  *(Contents)*
- The headings *A Recognized Command Post*, *Live Incident State Document* and *Clear,
  Live Handoff* are gone, and so is the appendix with an example incident document.
  There is a section called *Collaboration and Communication*. *(Contents)*
- Whether the four role names survive in the text is **not verified**. Google's public
  incident management guide names three main roles: incident commander, communications
  lead and operations lead.

**For UBB.** This is the closest match between the new edition and the way the lesson
was built. The first edition says little about organisations where the person who can
act is not the person who may decide. The lesson said that in a bank those are usually
different people, and the book now has headings on exactly that separation. What it recommends is not public, so read that
section before quoting it.

The "executives as incident commanders" heading is worth a look for the same reason. In
the simulation the head of the business line could decide anything but did not run the
call. The book lists the executive-led model as an alternative, next to a section on
drawbacks. Which way it argues is not verified.

### 3. Practising before the night it matters

**In the lesson.** A forty-minute simulation with five roles and a written log.

**In the second edition.**

- Chapter 10 has a training section on the human skills of incident response:
  developing judgement, staying calm, adapting leadership, thinking in systems.
  *(Contents)*
- Chapter 17 has a section called *Emergency Mode*, with separate guidance for system
  developers, incident responders and leadership, and a part on training and practising.
  *(Contents)*
- The preview of Chapter 10 calls these specific, learnable skills. *(Preview)*

**For UBB.** The book now gives leadership its own guidance for an emergency. That
supports the lesson's argument that a product owner or a business head needs to have
rehearsed their part, even though they never touch the system.

### 4. Severity and the regulatory clock

**In the lesson.** DORA Articles 17 to 19, the classification thresholds in Delegated
Regulation (EU) 2024/1772, and the reporting deadlines in Delegated Regulation (EU)
2025/301, Article 5.

**In the second edition.** Nothing in the contents covers a severity scale, incident
classification or regulatory reporting. The nearest headings are *Penalties*, as one
cost of unreliable systems in Chapter 2, and *Compliance with Regulatory Requirements*
in Chapter 9, which is about monitoring data and not about incidents. *(Contents)*

**For UBB.** No change. The book was not the source for this part of the lesson and the
new edition does not become one. The regulation says what must be classified and
reported. How your organisation applies it is for the people who run that process to
tell you.

One caution about a word. Chapter 4 has a section on *DORA's findings on culture and
performance*. That is the DevOps Research and Assessment programme, a research group. It is not the
Digital Operational Resilience Act. Both will come up in the same conversations at a
bank, and they have nothing to do with each other.

### 5. SLI, SLO, SLA and the error budget

**In the lesson.** The three definitions, the test of asking what happens when the
objective is missed, an internal target tighter than the promise, what the nines buy in
minutes, and the error budget as the thing that releases spend.

**In the second edition.**

- The SLO chapter keeps a short basics section, including *External Versus Internal*
  and *Why Not 100%?*. The authors say introductions are well served elsewhere, so the
  chapter spends most of its length on what the first edition left out. *(Preview)*
- SLOs were the most searched topic in the online first edition. *(Preview)*
- New topics: pitfalls in SLO adoption, critical user journeys, per-customer SLOs,
  implicit SLOs, client-side SLOs, measuring where failures concentrate, and a section
  titled *Weaknesses of the SLO Model*. *(Contents)*
- *Embracing Risk*, the chapter that introduced the error budget, no longer exists. The
  error budget now appears in the culture chapter under *Error Budgets: SLO-Driven
  Operations*, beside a heading on moving from scheduled deployments to SLO-gated
  deployments. *(Contents)*
- Google's announcement describes the change as moving from manual error budget
  policies to burn-rate alerting and automated enforcement. *(Google)*
- The appendix with the availability table is gone. A new appendix, *The Mathematics of
  Composing SLOs*, takes its place. *(Contents)*
- The culture chapter lists *Setting arbitrary reliability targets* and *Expecting
  perfection* among the common mistakes. *(Contents)*

**For UBB, four points.**

**Suppliers set a ceiling.** The new appendix shows that when a request needs every
service in a chain to work, the availabilities multiply. *(Preview)* Apply that to the
simulation. Card authorisation was promised at 99.95% and depended on a supplier's
fraud-scoring service. Suppose the supplier offers 99.9% and the rest of the chain is
perfect:

| | Availability | Downtime in a 30-day month |
|---|---|---|
| The promise to customers | 99.95% | about 22 minutes |
| The supplier's service | 99.9% | about 43 minutes |
| The best the chain can do | 99.95% x 99.9% = 99.85% | about 65 minutes |

*Illustrative figures, not measured at UBB. The arithmetic assumes the two fail
independently, which the book itself flags as a caveat.*

On these figures the promise was not achievable on the day it was signed. Nobody did
anything wrong for that to be true. It is the same supplier dependency the lesson described from the
European supervisors' incident data, shown as arithmetic.

**An average hides the people it failed.** Per-customer SLOs and failure concentration
are both new. In homework Incident A only 4% of the bank's customers were affected, and
for each of them the failure was total. A service can meet its target for the month
while one group of customers had no service at all.

**The promise nobody wrote down.** *Implicit SLOs* is now a named topic. The homework
asked what your customers already believe your product promises. The book appears to
treat that as a real objective, whether or not it was written.

**Automatic enforcement is a governance decision.** A rule that stops releases when the
budget is spent is easy to describe. In many banks the decision to release sits with a
change approval process, so a pipeline that blocks or allows a release on its own may
need to be agreed with whoever owns that process. The book describes Google's
direction. It does not settle who holds that authority in your organisation.

Whether the first edition's definitions of SLI, SLO and SLA are reworded is **not
verified**. The lesson quoted the 2016 wording, which remains correct for that edition.

### 6. Post-mortems, blame and root cause

**In the lesson.** What a post-mortem is, what blameless costs, a published list of
triggers for writing one, and the European data showing that human error is a minority
cause of major incidents.

**In the second edition.**

- The chapter is renamed from *Postmortem Culture: Learning from Failure* to *Learning
  from Incidents*. *(Contents)*
- Its opening names blameless post-mortems, psychological safety, collaboration and
  executive support as lasting principles, and says the practice has changed over ten
  years. *(Preview)*
- A new section reviews safety science from outside software: the Swiss cheese model,
  two views of safety, how complex systems fail, and resilience. *(Contents)*
- The worked example is a data centre outage in Paris on 25 and 26 April 2023. Its
  headings are timeline, interviews, analysis, action items and outcome. *(Contents)*
- The culture chapter pairs *Blamelessness* with *blame awareness*, and lists
  introducing blameless post-mortems as one step in bringing the practice into an
  existing organisation. *(Contents)*
- **A whole new chapter**, *Safety Engineering for SRE with STPA and CAST*, starts from
  the limits of traditional causality models. It asks what you do when a major outage
  happens and no component failed. One method, STPA, looks forward for hazards. The
  other, CAST, looks back and is presented as a new method for post-mortems.
  *(Contents, Preview)*
- Its example is a 2019 incident in which Google Maps could not find places in Japan.
  The existing post-mortem was thorough and blameless, and people still doubted it had
  explained enough. *(Preview)*
- The term has not been dropped. *Root cause analysis* is still a heading under the
  investigation stage of the lifecycle. *(Contents)*
- *Tracking Outages* and the appendix with an example post-mortem no longer exist as
  separate items. Whether the first edition's list of post-mortem triggers survives is
  **not verified**.

**For UBB.**

The lesson said root causes are plural, and the homework asked you to find more than
one in a published account. The new edition goes further. It suggests that in a complex
system the search for a cause can itself mislead, because every part can behave as
designed while the whole does the wrong thing. Homework Incident C was that case:
nothing was unavailable, and 137 000 customers were shown wrong balances.

DORA still uses the older vocabulary. Article 17 requires that root causes are
identified, documented and addressed, and the final report is due once the root cause
analysis is complete. A bank can do both. The report answers the question in the form
the regulation asks it. The internal analysis can go wider and look at how approvals,
handovers and tooling let the event through. How much of the wider analysis belongs in
a regulatory report is a question for the people who file those reports.

Interviews are now a named step in the worked example. That fits the lesson's point
about blame: the account you need comes from people, and they give it only where it has
been safe to give it before.

### 7. Artificial intelligence in incident response

**In the lesson.** Not covered.

**In the second edition.**

- Chapter 10 has a section on AI in incident response: detection and triage, outage
  communication, investigation, hypothesis generation, on-call handoff, autonomy in
  production, and a heading on agent safety. *(Contents)*
- Google's announcement mentions generative AI for incident triage and for producing
  post-mortems, and plain-language questions put to monitoring data. *(Google)*
- A full chapter, *How AI Supports SRE*, includes the role of humans, mitigation versus
  root cause analysis, and a path to autonomy. Its opening says the tools change so fast
  that any how-to guide written today is out of date within months. *(Contents, Preview)*

**For UBB.** The lesson's three permissions apply to a tool exactly as they apply to a
person. A tool that drafts the customer message is informing. A tool that restarts a
service or switches off a supplier's check is acting. Neither question is technical.
Someone has to hold the decision, and the organisation has to have agreed who before
the tool is switched on.

A generated post-mortem also deserves a second look. It can produce a document that is
complete in form. The lesson argued that the value is in the honest account behind the
document, which a tool cannot supply. Treat the book's own warning about how fast this
area moves as a reason to hold any claim here loosely, including a vendor's.

### 8. The business case for reliability

**In the lesson.** Why a bank cares: 803 hours of unplanned outage across nine UK banks
in the Treasury Committee's evidence, and Barclays' own figures.

**In the second edition.** A new second chapter, *The Value of Reliability*, treats SRE
as a business investment. It sets out the value to customers, to the CFO and to business
growth, and lists the costs of unreliable systems: direct costs, opportunity costs,
reduced velocity, retrofitting, penalties and slow decay over time. *(Contents, Preview)*

**For UBB.** This is the chapter a Product Owner or Product Manager is most likely to
use. The first edition assumed the reader already agreed reliability was worth paying
for. The second gives you the argument in the terms a budget holder uses.

---

## What Was Added, Changed and Removed

| | Item | Evidence |
|---|---|---|
| **Added** | A named six-stage incident lifecycle | Contents |
| **Added** | Incident response teams, with two named alternatives | Contents |
| **Added** | Authority and access during incidents in constrained organisations | Contents |
| **Added** | Case studies from Etsy, a multinational bank, a mortgage lender, Waymo | Contents |
| **Added** | Per-customer, implicit and client-side SLOs; weaknesses of the SLO model | Contents |
| **Added** | The mathematics of combining SLOs across dependencies | Contents, Preview |
| **Added** | Safety science, and the STPA and CAST methods | Contents, Preview |
| **Added** | AI in incident response, and two chapters on AI and SRE | Contents, Google |
| **Added** | The business value of reliability | Contents, Preview |
| **Changed** | Incident management and on-call are one chapter | Contents |
| **Changed** | *Postmortem Culture* is now *Learning from Incidents* | Contents |
| **Changed** | Error budgets moved from a risk chapter to a culture chapter | Contents |
| **Changed** | Error budget policy: from manual towards automated enforcement | Google |
| **Changed** | SLO basics shortened on purpose | Preview |
| **Removed as a chapter** | *Embracing Risk*, *Eliminating Toil*, *Emergency Response*, *Effective Troubleshooting*, *Tracking Outages* | Contents |
| **Removed as an appendix** | The availability table, the example incident document, the example post-mortem | Contents |
| **Removed as a heading** | *A Recognized Command Post*, *Live Incident State Document*, *Clear, Live Handoff* | Contents |
| **Unchanged** | Blameless post-mortems, psychological safety, SLOs as the core model, culture as the base | Preview, Google |

"Removed" here means the title is gone. Toil, for example, still appears as a section
inside three other chapters.

---

## What Readers Have Said So Far

There is little independent comment yet. No detailed review by a named practitioner was
found on 12 Nov 2026, and no discussion of the book was found on Reddit's SRE forum.

- **Hacker News**, October 2026: a short thread of six comments. One reader quoted the
  blameless culture passage as the most important part of the book. Another said the
  first edition lacked financial justification, cost control for monitoring, and
  security, and doubted the new one would fill those gaps. The contents list suggests
  the first two are now covered at least in part, in the chapter on the value of
  reliability and in a section on the value and cost of monitoring data. A section on
  security and privacy exists too. How deep any of them goes is not verified.
- **Trade press**: IT Brief, 26 Oct 2026, summarised Google's announcement and added no
  assessment of its own.
- **A book round-up** updated in August 2026 advised reading the free first edition
  online and then deciding whether the second is worth buying.
- **An older criticism of the first edition** was that it describes Google's scale and
  Google's internal systems, and that little of it transfers. The new preface answers
  that directly: it says the technology is now standard, and the edition concentrates
  on people and organisations and brings in case studies from other companies. Whether
  readers find that convincing is too early to say.

One line from the new culture chapter is likely to be quoted a great deal. It is
attributed to a Google SRE manager, Trisha Weir: "The fifth nine is people."

---

## Questions Worth Asking Your Team

1. When someone quotes "the Google SRE book" in a meeting, which edition do they mean?
2. Which of our suppliers sits in a chain where every link has to work, and is our
   promise to customers higher than that chain can deliver?
3. Do we know which customers had the worst month, or only the average?
4. If a tool proposed switching something off during an incident, who would be allowed
   to say yes?
5. Has our last post-incident review explained an event where nothing was broken?
6. Would our release process accept an automatic stop when a reliability target is
   missed, and who would need to agree to that?

---

## For the Lecturer

- **The deck's source lines need the edition.** The M3 L5 slides cite "Site Reliability
  Engineering, chapter 4 / chapter 14 / chapter 15, Google". Those numbers are correct
  for the first edition only. In the second edition they are the culture, testing and
  capacity planning chapters. Adding "first edition, 2016" to each source line is enough.
  The same applies to the two M3 L4 citations, chapter 6 and chapter 11.
- **No fact in the lesson needs correcting on the evidence available.** The first
  edition quotations are accurate for that edition and it remains online.
- **Three first-edition items the lesson relies on have lost their headings**: the living
  incident document, the recognised command post and the post-mortem trigger list. Check
  the text before telling a room that the second edition says the same.
- **Best candidates if the lesson is revised**: the dependency arithmetic in section 5,
  which fits the simulation's supplier without new material; the bank case study in
  Chapter 22; and AI in incident response as a permission question.
- **This note should be redone once the book has been read in full**, and again when
  practitioner reviews appear. Everything marked *Not verified* is a specific thing to
  look up.
- **Nothing here is a claim about how UBB or KBC works.** Statements about change
  approval, regulatory reporting and incident procedures are written as possibilities
  for the room to correct.

---

## Sources

All read on 12 Nov 2026.

- Google Cloud blog, "10 Years of the SRE book: Announcing the second edition", Betsy
  Beyer and David Huska, 13 Oct 2026 -
  https://cloud.google.com/blog/products/devops-sre/sre-book-second-edition
- O'Reilly, *Site Reliability Engineering, 2nd Edition*: chapter list and chapter
  previews - https://www.oreilly.com/library/view/site-reliability-engineering/9798341607675/
- Helion, bookseller listing with the section-level contents -
  https://helion.pl/ksiazki/site-reliability-engineering-how-google-runs-production-systems-2nd-edition-betsy-beyer-chris-jones-christof-leng,e_53xh.htm
- Google SRE, books page - https://sre.google/books/
- Google SRE, first edition, free online - https://sre.google/sre-book/table-of-contents/
- Google SRE, STAMP, STPA and CAST at Google -
  https://sre.google/resources/practices-and-processes/stpa/
- Google SRE, incident management guide -
  https://sre.google/resources/practices-and-processes/incident-management-guide/
- Hacker News discussion of the announcement -
  https://news.ycombinator.com/item?id=50068099
- IT Brief, "Google revises Site Reliability Engineering book for AI era", 26 Oct 2026 -
  https://itbrief.ca/story/google-revises-site-reliability-engineering-book-for-ai-era
- ComputingForGeeks, "Best SRE Books to Read in 2026", updated 25 Aug 2026 -
  https://computingforgeeks.com/best-sre-books/

---

*Google SRE Second Edition Summary · Module 3, Lesson 5 · KBC IT Academy*
