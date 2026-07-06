# Portfolio Plan — Hithesh

*Draft v2 · plan-first, no build until signed off*

---

## 1. Thesis

> **Most portfolios are highlight reels. This one is a logbook.**

Senior product design portfolios all converge on the same shape: a tidy *problem → research → solution → impact* sequence, set in well-spaced sans, lightly animated, indistinguishable from forty other tabs the recruiter has open. They show that you can *finish*. They don't show whether you can *think* — and at the senior level, that's the only question being asked.

This portfolio refuses that shape. Instead of the highlight reel, it reads as a working designer's logbook: the arguments that shaped the work, the decisions you'd defend, the few you wouldn't. The aesthetic and the writing both make the same wager — that a hiring manager who reads three of these portfolios in an hour will remember the one that sounds like a person making real choices, not the one that sounds like a process diagram.

If we get the writing right, the design's job becomes small: get out of the way.

---

## 2. The reader

There are two readers, and the design has to serve both without compromise.

**The skim reader (30 seconds).** A recruiter, mid-week, on a laptop, in a meeting they're half-listening to. They will read your home page's first paragraph and the case study titles. That's it. If those don't earn a second visit, the portfolio is decoration.

**The deep reader (5–20 minutes).** A hiring manager or staff designer who has decided to take you seriously. They want one signal above all: can this person *think and write*? Numbers don't move them — they've seen hundreds of "reduced support tickets by 47%" lines. What moves them is a designer naming a real tension and walking through how it was resolved. That's the rarest thing in this category, which is why doing it well wins.

The design implication is severe: the home page must pass the skim in 30 seconds *on writing alone*, and each case study must reward a 20-minute read. Imagery is in service of both. There is no third audience to design for.

---

## 3. Information architecture

```
/                  Home — first paragraph, then index of work
/work/diagnostics  Case study 1
/work/[tbd-2]      Case study 2
/work/[tbd-3]      Case study 3 (v1 stretch, v2 default)
/about             Bio, contact, CV
/notes             Writing (v2 only, and only if you'll commit to it)
```

No top-level photography page. Outside interests, if mentioned, sit inside `/about` in a single line — the work owns the nav.

**Phasing.**
- **v1 (2.5 weeks):** Home, two case studies, About. Shippable, interview-ready.
- **v2 (after v1 is live):** third case study, optional /notes.

The trade is honest: v1 sacrifices breadth for shippability. If two case studies land, two is enough.

---

## 4. Content plan

### Case study inventory

| # | Project | Status | Notes |
|---|---|---|---|
| 1 | **Diagnostics** (Whatfix, 0→1, 2024) | Outlined. Needs writing. | Rich raw material — multi-team disagreement, AI-assisted research, service blueprint, shipped Phase 1. The natural lead. |
| 2 | *TBD — biggest open question* | **Missing** | We need a second case study with comparable depth. Options below. |
| 3 | *TBD (stretch)* | Missing | v2 default. |

**Second case study — candidates to consider:**
- Another Whatfix project where you led design through a disagreement (preferred — the resonance with Diagnostics strengthens the thesis).
- A pre-Whatfix project where you owned a 0→1 or a significant pivot.
- A constrained side or freelance project that shows a different muscle (consumer, brand, mobile) and signals range.

The plan doesn't move forward without a candidate. Even a half-formed one unblocks the structure.

### Selected work (home page, below the case studies)
A short list — 4 to 6 items — of smaller projects, each a single line: *Title · context · what shipped*. No thumbnails, no expansions. This signals breadth without forcing a case study on every project.

### About
~180 words. Direct. No "passionate designer." Bio, where you are, what you're best at, one acknowledgment of fallibility. Sample drafted in §6 below.

---

## 5. The case study template — *the dispatch*

The differentiator. This is what hiring managers will read and remember, so it gets its own section.

The template is built like a long-form magazine piece, not a portfolio post. The structural beats:

**a. Dateline + headline.**
Headline is a sentence, not a label. *"Building a troubleshooting tool when nobody agreed on what was actually broken"* — not *"Diagnostics: a self-serve troubleshooting tool."* Dateline names company, year, role, scope.

**b. The lede (250–350 words).**
Open in a scene. Not a brief. Not a problem statement. A moment — a meeting, an interview, a screen, a deadline. Name the *real* question that took weeks to surface. End the lede on a turn that promises the rest of the piece.

**c. The brief — and what was wrong with the brief (150–200 words).**
What was asked, and what needed answering. The gap between the two is where the senior thinking lives.

**d. The arguments (3–5 beats, ~250 words each).**
Not "decisions." Arguments. Each beat names a real disagreement that shaped the outcome:
- Who held which position, and why each was defensible
- What was actually at stake (not just preferences — real downstream costs)
- What you chose, what you gave up, who you lost
- *Anyone* can write about decisions in hindsight. Almost no one writes honestly about the arguments that produced them. This is the signal.

**e. What shipped (short — 150 words + 1–2 visuals).**
Tight, honest. Numbers if you have them and they're real. Qualitative receipts (real quotes from CS, customers, leadership) if you don't.

**f. What I'd unship (100–150 words).**
Not "what I'd do differently" — that's the cliché. *What specifically I'd remove or rebuild, and why.* A named regret beats a vague one. This is where mid-level humility becomes senior judgment.

This template makes generic writing impossible. There is no way to fill these beats with filler — the form forces specificity.

---

## 6. Sample prose

Voice samples for the three highest-stakes surfaces. React to the writing — adjust, push back, change tone. Once we lock voice here, the whole portfolio writes faster.

### Home page — first paragraph (three drafts, pick one)

**Draft A — the logbook.**
> Most portfolios are highlight reels. This is closer to a logbook — the arguments that shaped the work, the decisions I'd defend, and a few I wouldn't. I'm Hithesh. Senior product designer, currently at Whatfix, six and a half years in.

**Draft B — direct address.**
> I'm a senior product designer. Six years in, mostly B2B. I've learned that the interesting part of the job isn't the screens — it's the room before the screens, where four people disagree about what we're actually building. The work below is about that room.

**Draft C — single sentence.**
> Senior product designer, six years in, mostly B2B. The work below is less about what I shipped and more about the arguments inside it — what we disagreed about, what I gave up, what I'd defend if you asked.

*Recommendation: **C**. It's the most disciplined and the most senior. "B" is a near-tie and warmer; pick B if you want the site to feel less austere.*

### About page — one written-out version

> ## About
>
> I'm Hithesh — senior product designer, currently at Whatfix, based in [city]. Six and a half years in: three and a half at Whatfix on the platform side, three before that across earlier startups.
>
> Most of my work is B2B and platform tools — the kind where the user has a job to do and you're either getting out of their way or getting in it. I'm best when the problem is still ambiguous: when no one quite agrees on the frame, when teams are pulling against each other, when a "simple" feature is hiding a wrong question.
>
> I think out loud, write before I draw, and have learned to ask for the disagreement early. I've made my share of bad calls — a couple are in the case studies if you read carefully.
>
> ---
>
> Open to senior and staff roles. Reach me at **hithesh@[domain]** or on **[LinkedIn]**. CV on request.

### Diagnostics — case study opening (a real sample of the dispatch in voice)

*Replaces an earlier draft that narrated a three-team CS/Product/Engineering disagreement. The PRD and discovery don't support that framing — what the artifacts actually show is a failed prior attempt (Content Inspector beta) and a two-audience tension (creators vs internal teams). Opening corrected accordingly.*

> # The second time we tried to build it
> *Whatfix · 2024 · Senior PD · 0→1 (re-attempted) · Phase 1 shipped*
>
> ---
>
> The screen share was already an hour long. A Support engineer in Bangalore was typing `_wfx_debug_panel()` into the customer's browser console while the content creator — a learning designer in Seattle who had built the flow three weeks earlier — watched the developer-tools pane fill with output she couldn't read. *"It's the role tag,"* the engineer said, eventually. *"I'll send a doc."*
>
> This was not a one-off. It was the support model.
>
> It was also the second time Whatfix had tried to solve it. The first attempt was Content Inspector, a beta tool launched the year before. The Looker dashboard told the story in a single chart: adoption never crossed the threshold where any feature feels like a feature. Content creators didn't open it. Internal teams kept reaching for the console. The brief I was handed in early 2024 — *build an inspector panel in Studio* — read like a respec of that beta. The first real question wasn't *what does it look like.* It was *why did the last one fail, and would we just be repeating the failure with a new name?*
>
> Three answers stacked. The tool was too generic — it served content creators and internal Support with the same surface and pleased neither. It lived inside the Studio editor, where creators went to *build*, not where they noticed something they'd already built was broken. And it spoke in the console's voice — selectors, role tags, segment IDs — to people who had asked for the opposite.
>
> *What follows is how the second attempt got framed, the four arguments that shaped it, and the one I lost that I'd lose the same way again.*

That's ~325 words. It does six things at once: sets a scene, names the real tension (a failed prior attempt + audience mismatch + voice mismatch), demonstrates senior framing (*"would we be repeating the failure with a new name?"* is the question a junior PD doesn't ask), signals the four-beat structure to come, promises specificity, and admits fallibility. Every case study opens like this. If you can write at this level for two projects, the portfolio is in the top 1%.

The four arguments that follow are: (1) **Kill or revive Content Inspector** — replaced, not revived, and why. (2) **Content creator or internal team** — Phase 1 optimised for creators with internal teams as covered-not-prioritised. (3) **One surface or three** — Preview Mode only; Studio and Dashboard deferred to Phase 2/3 (a decision I'd lose the same way again, and would also try harder to put a phasing date around). (4) **How technical is the language** — question-framed answers as default view, raw state one click into the accordion.

A working draft of this case study with the full structure, marginalia, and shipped-screen placement is at `work/diagnostics.html`. The argument beats and shipped-screens grid are wired up; what's outstanding is dropping the five real screen exports into `/images/diagnostics/` and the redaction of the `J&J_Salesforce_demo` project name.

---

## 7. Three visual directions

Each direction picks an under-represented reference and resists the current AI-portfolio default (display sans + mono kickers + hairline separators + soft beige). Each is named, specified, and shown with a worked detail so we can argue about something concrete.

### Direction A — **Monograph**

> *Silence around the work makes the work matter.*

Reference: designer/architect monographs — Vignelli's *Vignelli Canon* (free PDF), Lars Müller's *Helmut Schmid: Design is Attitude*, Phaidon design monographs. The page treats the work the way a museum catalog treats a painting.

- **Type:** one sans family, used with discipline. *Söhne* if licensable, *Inter* as fallback. Body 18px, headings 28–48px. No second display face.
- **Color:** page white, ink near-black, no accent — links signaled by weight or underline, not color.
- **Layout:** alternating full-bleed image moments and constrained text columns (640px max). Big page numbers like a book. Captions set small below images.
- **Worked detail — home page:** one full-bleed image (a key screen, a service blueprint, a system diagram), nothing else above the fold. Scroll: a table of contents.

**Trade-off:** demands strong visual material. If the project imagery is flat, this format will expose it. Slower to ship than B.

### Direction B — **Liner-notes** *(recommended)*

> *The design recedes; the writing makes the case.*

Reference: Criterion Collection essays, *n+1* online, *The Drift* magazine, old Blue Note album liner notes. The site reads like a respected long-form publication that happens to be one person's body of work.

- **Type:** *Source Serif 4* body at 19px, *Inter* at 14–15px for nav and small UI. Italic and small caps used as punctuation. No third typeface. No mono.
- **Color:** paper white (#FAF8F4), ink (#1A1816), one accent for links — an oxblood or quiet teal. Used sparingly.
- **Layout:** 640–720px text column, generous gutters. Marginal images aligned to the body baseline. Section rhythm comes from white space, *not* from horizontal rules.
- **Worked detail — home page:** no hero image. The page opens with the first paragraph (§6, draft C) set well. Below: a clean list of case studies, each one line — *title · year · one-sentence positioning*. The page is a table of contents, the way a book of essays opens.

**Trade-off:** demands strong writing. Carries the lowest production cost but the highest editorial cost. Given your content brief (collaboration, arguments, negotiations — inherently narrative), it's the strongest fit.

### Direction C — **Title sequence**

> *Pacing is craft. The site demonstrates pacing.*

Reference: Saul Bass on *Anatomy of a Murder*, Kyle Cooper's *Se7en* titles, Tom Etherington's Penguin covers, the current *Are.na* and *It's Nice That* sites at their disciplined moments.

- **Type:** one expressive display face used *only* at moments of entry (intro card, case study openers). Body returns to a calm serif/sans pair. Candidates: *PP Editorial Old* or *NaN Tresor* for display, *Söhne* or *Source Serif* for body.
- **Color:** high contrast — paper white on near-black, or vice versa. One saturated ink.
- **Layout:** each case study opens with a title card — a single composed frame of typography and image. The body then returns to calm reading.
- **Worked detail — home page:** the home *is* the title card. Almost no nav. A single name and one word that names what you do this week (or this month). Scroll to enter.

**Trade-off:** highest production cost, easiest to get wrong, slowest to ship. Wins biggest if executed.

### Recommendation

**B (Liner-notes).** Three reasons:
1. Your content brief is inherently narrative. The visual format should serve the writing, not compete with it.
2. It's the most under-represented direction at senior PD level — A is well-trodden, C is the awwwards default at its most ambitious.
3. It's the fastest to ship to a high bar, which respects the urgent timeline.

A is a strong alternative if you have unusually strong visual artifacts. C is right only if you're willing to extend the timeline by ~2 weeks.

---

## 8. Stack

Locked after direction is picked.

- **A or B → Astro + Tailwind + MDX.** Content-led, static, deploys in a click to Vercel. Case studies as MDX files in the repo. No CMS.
- **C → Next.js + Tailwind + Motion (Framer Motion).** Need the runtime for sequencing and choreography.

No CMS for v1 regardless. Editing in the repo is faster than fighting a CMS for two case studies.

---

## 9. Phased scope and timeline

**v1 — 2.5 weeks.**
- **Week 1.** Lock direction. Write Diagnostics end-to-end (you draft, I edit hard). Design the case study template and home in the chosen direction.
- **Week 2.** Write the second case study. Build home, two case studies, About. Real content end-to-end.
- **Week 3 (half).** Editorial pass, micro-typography, accessibility, deploy. Share.

**v2 — after v1 is live.**
- Third case study.
- /notes — only if you'll commit to 4+ posts a year. Empty blogs read worse than no blog.
- Photography link in /about, if at all.

---

## 10. Open questions

1. **What's the second case study?** Most urgent. The plan can't move without a candidate, even a half-formed one.
2. **Whatfix NDA — can you show screens publicly?** Determines whether the case study is visual or written-with-redacted-mocks.
3. **Visual direction — A, B, or C?** Recommendation is B. React even if just gut-level.
4. **Voice — Home Draft A, B, or C?** Recommendation is C. Or rewrite in your own words and we adjust from there.
5. **Bio details to fill in:** city, domain you want to use (or want help picking), contact email preference.

---

## Sign-off checklist (before any build)

- [ ] Thesis approved (or rewritten)
- [ ] Case study template ("the dispatch") approved
- [ ] Second case study identified
- [ ] Visual direction picked
- [ ] Home-page voice draft picked
- [ ] Phased scope approved
- [ ] Open questions resolved

Once these are checked: I move to full visual mockups of the chosen direction (still in writing/static images, no build yet), draft case study scaffolds for both projects, and a complete typography spec. Build starts only after that second sign-off.
