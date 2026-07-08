# Design

## Theme

**Field Notes.** A senior product designer's annotated working notebook. The home page opens on a real margin note, set very large; case studies are typeset like critical editions, main column for the prose, a marginal column on the left for dated commentary, artifact references, and pull-quotes. The signature is the marginalia system. Around it: silence, generous space, restrained type. The site reads like a working document with a point of view, not a portfolio.

The visual direction explicitly rejects four saturated lanes: Stripe-adjacent editorial-typographic, Awwwards motion-heavy, hero-metric SaaS, and the cream-serif-terracotta AI default.

## Color

OKLCH. Cool drafting-paper, ink, and a single blueprint-blue accent borrowed from the world of his work (service blueprints, system diagrams).

```
--paper        oklch(0.92 0.014 90)    cool drafting paper. Greener and cooler than the AI cream default.
--paper-deep   oklch(0.89 0.014 90)    image fallback / soft surface tint
--ink          oklch(0.20 0 0)         primary text. Soft black, never pure #000.
--ink-soft     oklch(0.42 0.005 90)    secondary text. Hits 4.5:1 on --paper.
--blueprint    oklch(0.40 0.075 245)   the one accent. Links, focus rings, marginalia, the section mark.
--blueprint-q  oklch(0.40 0.075 245 / 0.65)   the accent at lower presence (caption-weight blueprint).
--hairline     oklch(0.78 0.012 90)    only used for the comp-internal nav and footer rule.
```

Contrast pairs verified at WCAG AA:
- `--ink` on `--paper` ≈ 14:1 (body text)
- `--ink-soft` on `--paper` ≈ 5.3:1 (secondary text)
- `--blueprint` on `--paper` ≈ 6.1:1 (links, marginalia)

Strategy: **Restrained, one accent.** Paper carries the body; ink carries the type; blueprint blue earns its appearance by always meaning *the same thing* (a link, a focus, a marginal note, the section mark). It never decorates.

No dark mode in v1. Reason: tuning the marginalia color relationships in dark mode triples the visual-system work and risks losing the paper-document metaphor. Revisit in v2.

## Typography

Two free, non-reflex faces:

- **Vollkorn** (German workhorse serif, Google Fonts). Used for display, body, and pull-quotes. Has warmth without the magazine reflex of Fraunces / Cormorant / Newsreader.
- **Public Sans** (USWDS, Google Fonts). Used for navigation, captions, marginalia headings, footer. Quiet workhorse grotesque; not on the reflex-reject list.

Scale (fluid via clamp):
```
--fs-mega       clamp(40px, 7vw, 84px)     home typographic hero, case study title
--fs-display    clamp(28px, 3.5vw, 44px)   case study section openers (used sparingly)
--fs-lead       clamp(22px, 2.4vw, 28px)   home lead paragraph, case study intro
--fs-body       19px                       reading body
--fs-meta       14px                       dateline, byline, nav
--fs-margin     13px                       marginalia
--fs-ui         12-13px                    smallest UI labels, focus targets
```

Body line-length capped at 65–72ch (~640–680px). Body line-height 1.55. Display line-height 1.05 with letter-spacing −0.025em. `text-wrap: balance` on h1/h2; `text-wrap: pretty` on long prose.

Numerals: `font-variant-numeric: oldstyle-nums` on body for natural rhythm. Tabular figures (`tabular-nums`) reserved for dates and metadata.

Font-pair upgrade path for paid licenses: Vollkorn → JJannon (Production Type) or Untitled Serif (Klim). Public Sans → National 2 Narrow Book (Klim). Visual system is designed to swap cleanly without re-tuning the scale.

## Spacing

Modular, not strictly geometric. Uses a 4px base unit but breaks for rhythm:

```
--sp-1   4px      hairline gap
--sp-2   8px      inline gap
--sp-3   12px     tight stack
--sp-4  16px      stack
--sp-5  24px      paragraph rhythm
--sp-6  32px      section rhythm
--sp-7  48px      page section break (small)
--sp-8  72px      page section break (large)
--sp-9 112px      top-of-page breathing room
```

Varied, not uniform. Paragraph→paragraph uses `--sp-5`. Paragraph→artifact uses `--sp-7`. Section→section uses `--sp-8`. The vertical rhythm signals where the reader is in the document.

## Layout

**Single-column for marketing pages, two-column with a marginal column for case studies.**

Container max-width: 1240px on home and about. Reading column: 640–680px (the "main column" on case study pages).

Case study grid (desktop):
```
[ margin · 180px ] [ gap · 48px ] [ main column · 640px ] [ optional right padding ]
```

Margin column collapses on screens narrower than 880px. Below that breakpoint each marginal note becomes an inline block stacked above its target paragraph, set in `--blueprint` at `--fs-margin`. The two-column reading is a desktop affordance; nothing essential lives there that mobile readers can't get to.

No card grids. Work index is a list, not a gallery. Selected work is a list, not thumbnails. The home page has exactly one moment of visual emphasis (the typographic hero); everything else is text-rhythm.

## Components

### Site header
Two elements only: `Hithesh` (left, Vollkorn, 18px medium) and nav links `Work · About` (right, Public Sans, 14px). Generous vertical padding above and below. No logo image, no underlines, no border-bottom.

### Lead paragraph
The home page's first paragraph. Vollkorn 22–28px (fluid), regular weight, line-height 1.4, max-width 640px. `text-wrap: pretty`. This is the load-bearing element on the home, it has to earn the scroll.

### Typographic hero (home)
A single phrase from a real margin note, set in Vollkorn at `--fs-mega`, line-height 1.05, letter-spacing −0.025em, max-width 14ch (~280px lines). Below, a small attribution in Public Sans / blueprint blue: *,  margin note, Diagnostics, week six*. Sits in the page's top breathing room (`--sp-9` of padding above).

### Work index
A clean list of case studies, each occupying a single horizontal line on desktop, stacking on mobile. Format:

```
[Project name (Vollkorn, medium)]    [year (Public Sans, ink-soft)]    [↗]
[one-line context · role · scope (Public Sans, ink-soft)]
[one-sentence positioning (Vollkorn, regular, blueprint blue on hover)]
```

Vertical rhythm between items: `--sp-7`. Hover state: the project name shifts to blueprint blue with a 200ms ease-out color transition.

### Selected work (smaller list, home)
Plain bullet list below the case studies. Public Sans, 14px, ink-soft. One line per item. No links unless a target exists.

### Marginalia
Lives in the case study's left column (desktop) or above each paragraph (mobile). Each note has:
- A **date** (Public Sans, 12px, blueprint blue, tabular nums), when the field note was made, e.g. `2024-02-14`.
- A **label** in the same line as date or below it (Public Sans, 12px, ink-soft), type of note: `field note`, `artifact`, `pull-quote`.
- A **body** (Public Sans, 13px, ink), the actual content, max ~120 characters. Pull-quotes use italic Vollkorn instead.

Marginalia never decorates. Each note must reference something concrete in the body: a moment, an artifact, a person's words.

### Section mark
A 10×10px blueprint-blue square (the only graphic mark in the system). Used to break sections within a case study and at the foot of the home page. Replaces hairline rules entirely.

### Artifact image
On case study pages, real photographs of working artifacts (service blueprints, decision matrices, interview pages). Aspect ratio constrained but variable. Sit inset from the body column with a `--sp-7` vertical break above and below. Caption below in Public Sans / blueprint blue: short, factual, names what the artifact is and when it was made.

### Focus state
2px solid `--blueprint` outline + 2px offset. Applied to all links and interactive elements. Never `outline: none`.

## Motion

Strict minimalism. Three places only:

1. **Page-load fade-in.** On the home page, the typographic hero phrase fades in over 300ms with `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) easing, starting at opacity 0 and a 6px translate-Y offset. Other elements appear instantly.
2. **Link hover.** Color transitions on links (200ms ease-out).
3. **Mobile marginalia expand.** When marginalia collapses to inline below 880px, tapping a `+` reveals the note body with a 220ms height transition. *(Implemented in v2 if needed, v1 ships with marginalia always-expanded inline.)*

`prefers-reduced-motion: reduce` neutralizes all transitions and animations to ~instant (1ms). No exceptions.

No scroll-triggered reveals. No parallax. No kinetic typography. The brand personality is "patient, restrained, honest", motion that says "look at me" contradicts the voice.

## Iconography

None. The blueprint square is the only graphic mark. Navigation is text. Links use a small `↗` (Unicode arrow) for external-pointing case study links, set in Public Sans at the body baseline. No SVG icon set. No mark library.

## Imagery direction (for case studies)

When case study artifacts are photographed, the treatment is:
- Natural light, paper-on-wood / paper-on-desk
- Hands in frame (working, not posed)
- Slight desaturation (`filter: saturate(0.85)`) and a touch of contrast (`contrast(1.02)`) for consistency
- Never flatlay-Pinterest. Always a working moment, not a styled composition

For v1 placeholder imagery, Unsplash photos from Kelly Sikkema and similar working-document photographers are used. For production, Hithesh photographs his own artifacts in this treatment.

## Accessibility checklist (per page)

- [ ] All text contrast ≥4.5:1 verified against `--paper`
- [ ] All interactive elements have visible focus state (`--blueprint` 2px outline, 2px offset)
- [ ] Tab order matches visual order
- [ ] Marginalia stacks correctly below 880px
- [ ] `prefers-reduced-motion` neutralizes all transitions
- [ ] Heading hierarchy semantic (h1 once per page, h2 for sections, h3 only inside case study beats)
- [ ] Alt text on all imagery, written in the case study's voice
- [ ] Page survives 200% zoom (clamp-based type scale)
- [ ] No `outline: none` anywhere

## Performance

- Two Google Fonts loaded with `display=swap` and a single preconnect pair. ~80KB total font weight after subsetting.
- Images served from Unsplash CDN at 1600w max, `auto=format`, `q=80`. ~150–250KB per hero image.
- No JavaScript required for v1. The site works with JS disabled.
- Total page weight target: <500KB per page including images.
