# Design — John Doe Car Wash

A locked design system for this app. Every page reads this file before it emits
code. Do not regenerate per page — extend or amend this file when the system
needs to grow.

Written by `hallmark redesign` (multi-page flow). The project is
**designed-as-app**: pages must share the system, not differ from each other.

## Genre

**playful** — consumer, family, drive-in. Warmth comes from the water/foam motif
and the copy's honesty, not from cartoon decoration. The voice stays
editorial-honest; the *surface* is fresh and wet.

## Macrostructure family

- **Marketing pages** (home · services · pricing · gallery · about · locations ·
  careers): **Marquee Hero** base, or **Split Studio** where a page is naturally
  a diptych. Variation lives in component archetypes, not in theme.
- **Content pages** (blog index, blog article): **Long Document**.
  FAQ route: **Conversational FAQ**.
- **Booking flow**: **Narrative Workflow** (the five numbered steps are the page).

Home hero is a **Scroll-Morph Hero Arc** variant of Marquee Hero: the fold is a
sticky, scroll-driven card arc. This is a deliberate, approved deviation from
the base Marquee shape — do not "correct" it back to a static marquee. The arc
must stay reduced-motion safe and must never run a cursor-parallax.

## Theme

Custom, `fresh aqua express-wash`. Single cool anchor hue ~230–240. No page may
introduce a second accent family.

- `--paper`        oklch(0.977 0.013 236.62)   light / oklch(0.129 0.042 264.695) dark
- `--paper-2`      oklch(0.951 0.023 232)      light / oklch(0.168 0.038 262)     dark
- `--surface`      oklch(0.995 0.004 236)      light / oklch(0.192 0.038 263)     dark
- `--ink`          oklch(0.208 0.042 256)      light / oklch(0.984 0.003 248)     dark
- `--ink-2`        oklch(0.372 0.044 253)      light / oklch(0.869 0.022 253)     dark
- `--ink-3`        oklch(0.446 0.043 252)      light / oklch(0.704 0.04 257)      dark
- `--border`       oklch(0.929 0.026 232)      light / oklch(0.279 0.041 260)     dark
- `--accent`       oklch(0.5 0.134 242.749)    light / oklch(0.746 0.16 232.661)  dark
- `--accent-vivid` oklch(0.588 0.158 241.966)  light / oklch(0.789 0.154 211.53)  dark
- `--accent-soft`  oklch(0.951 0.026 236.824)  light / oklch(0.279 0.05 250)      dark

**No pure white, no pure black.** `--surface` and `--accent-contrast` are tinted
toward the anchor hue. The old `oklch(1 0 0)` values are retired — the untinted
surface read as a second, colder white against the tinted paper.

### Statement band (non-inverting)

The dark statement band must stay dark in **both** themes. Pages must never
build it out of `bg-ink text-paper` — those tokens swap, so the band flips to a
light surface in dark mode. Use the band tokens:

- `--band-bg`, `--band-bg-2` — band surface
- `--band-ink`, `--band-ink-muted`, `--band-ink-faint` — text on the band
- `--band-border` — hairlines on the band
- `--band-glow-1`, `--band-glow-2` — decorative radial washes

Used by: the announcement bar, the closing CTA band, `Badge tone="ink"`, the
before/after "Before" pill, and the hero flip-card scrim. Note the home hero's
*fold background* is the pale wash family, not the band — only its card scrim
takes the band colour.

## Typography

- Display: Outfit, weight 600, style normal
- Body: Work Sans, weight 400 (500/600 for emphasis)
- Mono: system stack (never italic)
- Display tracking: -0.03em
- Type scale anchor: `--text-base` = 1rem; hero uses `clamp()` steps, never raw px

Headings are always roman (no italic display). Long words wrap inside display
headers via `overflow-wrap: anywhere`.

## Spacing

4-point named scale in `tokens.css` (`--space-3xs` … `--space-4xl`, `--gutter`,
`--shell`, `--shell-narrow`). Pages use the named tokens, never raw values.

## Motion

- Easings (canon): `--ease-out` cubic-bezier(0.16, 1, 0.3, 1) ·
  `--ease-in` cubic-bezier(0.7, 0, 0.84, 0) ·
  `--ease-in-out` cubic-bezier(0.65, 0, 0.35, 1)
- Durations: micro 120ms · minor 200–300ms · major 420ms. Exits ≈75% of enter.
- Reveal pattern: fade + 8px lift, once per element, total stagger capped 500ms.
- Accordions animate `grid-template-rows: 0fr → 1fr`, never `height`.
- No parallax. No bounce/overshoot on UI. No `ease`/`linear` defaults.
- At most **one** infinite marquee per page; it pauses on hover.
- Reduced-motion fallback: opacity-only, ≤150ms; spatial motion collapses.

## Microinteractions stance

- Silent success. Toasts only for the booking submit result.
- Hover delay 0ms on controls; focus ring instant, never animated.
- Optimistic feel: no confirmation dialogs on reversible actions.
- Every interactive element ships default · hover · focus-visible · active ·
  disabled · loading · error · success.

## CTA voice

- Primary: pill, `--accent` fill, tinted `--accent-contrast` label, lift on hover.
- Secondary: outline, `--border-strong`, accent border/text on hover.
- Copy pattern: verb + object ("Book a wash", "See packages") — never "Submit".

## Imagery

Purely one language. In priority order:

1. The local brand image set (`/public/gallery/**`) — treated as a single graded
   family. Never mix in remote stock photography; the mixed grading is what made
   the site read as generic.
2. The hand-built SVG scene art in `photo-frame.tsx` as the only fallback.

Every generated image is labelled as sample art. No invented stock is presented
as a real customer's car.

## Per-page allowances

- Marketing pages MAY use Tier-A CSS art and Tier-B SVG art as enrichment.
- Content pages: typography only.
- Booking MUST NOT use decorative enrichment — function carries the page.

## What pages MUST share

- The wordmark, the aqua accent and its placement (≤5% of any viewport).
- Display + body fonts, the CTA voice, the band token set, section rhythm.

## What pages MAY differ on

- Macrostructure within the page-type family, and hero archetype within the
  family's allowance.

## Exports

### tokens.css

```css
:root {
  --paper:          oklch(0.977 0.013 236.62);
  --paper-2:        oklch(0.951 0.023 232);
  --surface:        oklch(0.995 0.004 236);
  --ink:            oklch(0.208 0.042 256);
  --ink-2:          oklch(0.372 0.044 253);
  --ink-3:          oklch(0.446 0.043 252);
  --border:         oklch(0.929 0.026 232);
  --accent:         oklch(0.5 0.134 242.749);
  --accent-vivid:   oklch(0.588 0.158 241.966);
  --accent-contrast: oklch(0.99 0.004 236);
  --band-bg:        oklch(0.16 0.045 259);
  --band-ink:       oklch(0.99 0.004 240);
  --focus:          oklch(0.5 0.134 242.749);

  --font-display: var(--font-outfit), ui-sans-serif, system-ui, sans-serif;
  --font-body:    var(--font-work-sans), ui-sans-serif, system-ui, sans-serif;

  --space-3xs: 0.25rem; --space-2xs: 0.5rem; --space-xs: 0.75rem;
  --space-sm:  1rem;    --space-md:  1.5rem; --space-lg: 2rem;
  --space-xl:  3rem;    --space-2xl: 4rem;   --space-3xl: 6rem;

  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in:     cubic-bezier(0.7, 0, 0.84, 0);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

  --dur-micro: 120ms; --dur-short: 220ms; --dur-long: 420ms;
  --radius-card: 20px; --radius-pill: 999px; --radius-input: 14px;
}
```

### Tailwind v4 `@theme`

```css
@theme inline {
  --color-paper:        var(--paper);
  --color-surface:      var(--surface);
  --color-ink:          var(--ink);
  --color-accent:       var(--accent);
  --color-accent-soft:  var(--accent-soft);
  --color-band:         var(--band-bg);
  --color-band-ink:     var(--band-ink);
  --font-display:       var(--font-display);
  --font-body:          var(--font-body);
  --ease-out:           var(--ease-out);
}
```

### DTCG `tokens.json`

```json
{
  "color": {
    "paper":  { "$value": "oklch(0.977 0.013 236.62)", "$type": "color" },
    "ink":    { "$value": "oklch(0.208 0.042 256)", "$type": "color" },
    "accent": { "$value": "oklch(0.5 0.134 242.749)", "$type": "color" },
    "band":   { "$value": "oklch(0.16 0.045 259)", "$type": "color" }
  },
  "font": {
    "display": { "$value": "Outfit", "$type": "fontFamily" },
    "body":    { "$value": "Work Sans", "$type": "fontFamily" }
  },
  "space": {
    "md": { "$value": "1.5rem", "$type": "dimension" }
  }
}
```
