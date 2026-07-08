# Product

## Register

brand

## Users

Senior and staff-level recruiters and hiring managers at product companies, screening Hithesh for senior product design roles. They are time-constrained, have seen hundreds of templated PD portfolios, and are evaluating two questions above all: *can this person think, and can this person write?*

Reading pattern is bimodal:
- **The skim reader (≤30 seconds).** Recruiter, mid-week, in a half-attended meeting. Reads the home page's first paragraph and the case study titles. If those don't earn a second visit, the portfolio is decoration.
- **The deep reader (5–20 minutes).** A hiring manager or staff designer who decided to take the candidate seriously. They want one signal: a designer naming real tensions and walking through how they were resolved.

A secondary audience is design leaders who may be brought in after initial screening, depth-readers who want process, tradeoffs, judgment.

## Product Purpose

A senior product designer's portfolio that succeeds when a hiring manager closes the tab and sends the link to a colleague. The portfolio is a proof-of-thinking artifact, not a deliverable showcase, not a process diagram, not a stats reel.

Success looks like: hiring managers who finish reading one case study and schedule a conversation.

## Brand Personality

**Patient, restrained, honest.**

Like a senior practitioner's archival logbook. Measured prose. No preening. Willing to name what didn't work alongside what did. Warmth, where it appears, comes from specificity, real names, real artifacts, real disagreements, never from voice affectations.

The writing voice is quiet and declarative. Few adverbs. One observation at a time. Never "passionate," never "leveraging," never "compelling." It reads like someone who has been doing this work long enough to stop performing it.

## Anti-references

This portfolio explicitly should NOT look like:

- **Stripe-adjacent editorial-typographic portfolios.** Italic display serif + small mono kicker labels + ruled separators + monochromatic restraint. The senior PD reflex of 2024–2026.
- **Awwwards motion-heavy portfolios.** Scroll-jacked, kinetic type for its own sake, parallax for ambience. Cinema-energy without substance.
- **Hero-metric SaaS templates.** Big number + small label + supporting stats + gradient accent. The PM-portfolio aesthetic.
- **The cream + serif + terracotta AI default.** Warm-paper background (#F4F1EA) + high-contrast serif display + single terracotta accent. The most-saturated AI-generated look of the moment.

## Design Principles

1. **The work is the work.** Imagery, prose, and structure all point at the case studies. Decorative chrome is the enemy.
2. **Voice over volume.** Three case studies done in voice beat ten case studies set in template grammar. The site has fewer pages than competitors and reads denser.
3. **Working artifact, not gallery.** Case studies look like annotated working documents, not framed paintings. A marginal column carries a second voice, the designer commenting on his own decisions.
4. **One bold move, everything else quiet.** The marginalia signature is the single risk. Around it: calm typography, generous space, no second risk competing for attention.
5. **Specificity beats polish.** Real interview quotes, real disagreement language, real artifact references. A specific sentence beats ten polished ones.

## Accessibility & Inclusion

- WCAG 2.2 AA throughout. Body text ≥4.5:1 contrast on the paper background; large text and UI elements ≥3:1. Contrast verified, not assumed.
- Visible keyboard focus states using the brand's blueprint-blue accent (2px outline + 2px offset), not the browser default.
- The marginal column collapses to inline expandable footnotes on screens narrower than 768px. The two-column reading experience is desktop-only; nothing important lives in the margin that isn't reachable from a mobile reader.
- `prefers-reduced-motion: reduce` respected: the home-page paragraph fade-in and any marginalia entrances become instant.
- Artifact images carry alt text written in the case study's voice. Alt text is part of the writing, not afterthought metadata.
- Type scale uses `clamp()` so the page survives at 200% zoom and respects user font-size preferences.
