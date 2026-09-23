# John Doe Car Wash — multi-client pitch demo

A complete, deployable car-wash website built to pitch **any** car-wash client.
It ships with a placeholder brand ("John Doe Car Wash"), sample content, and a
single config file that re-brands the whole site in a few minutes.

Thirteen routes, dark mode, a boot splash, route transitions, toasts, an
animated before/after slider, and a five-step booking flow — statically
exported, so it hosts for free on Vercel, GitHub Pages, Netlify or any static
server.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with Turbopack |
| `npm run build` | Static export into `out/` |
| `npm run typecheck` | Regenerate route types, then `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run build:ghpages` | Build with `basePath` set to the package name |

---

## Deploying

### Vercel

Import the repository. Vercel detects Next.js and needs **no configuration** —
leave `NEXT_PUBLIC_BASE_PATH` unset. Every push to `main` deploys.

Optionally set `NEXT_PUBLIC_SITE_URL` (e.g. `https://johndoewash.com`) so
canonical/OG metadata resolves correctly.

### GitHub Pages

The repo includes `.github/workflows/deploy-pages.yml`, which builds with the
correct `basePath` automatically:

1. Push to `main`.
2. **Settings → Pages → Source → GitHub Actions.**
3. The workflow builds, writes `out/.nojekyll`, and publishes.

A project site lives at `https://<user>.github.io/<repo>/`, which is why the
workflow injects `NEXT_PUBLIC_BASE_PATH=/<repo>`. For a user or custom-domain
site served from the root, delete that `env:` block from the workflow.

### Anything else

`npm run build` produces a self-contained `out/` directory. Upload it anywhere
that serves static files.

---

## Re-skinning for a new client

This is the point of the demo. You need to touch **two files**.

### 1. Brand and contact details — `src/content/site.ts`

```ts
brand: {
  isDemo: true,                 // ← set false before launch
  name: "John Doe Car Wash",    // full legal/trading name
  wordmark: "JohnDoe",          // rendered without accent
  wordmarkAccent: "Wash",       // rendered in the accent colour
  tagline: "Clean car. Clear mind.",
  description: "…",             // used for <meta name="description">
  founded: 2009,
},
contact: { phone, email, address, hours, … },
```

Everything downstream reads from here — the header wordmark, the footer, page
metadata, the booking form, and the `AutoWash` JSON-LD block.

### 2. Palette — `tokens.css`

Change the `--accent`, `--accent-vivid`, `--accent-2` and `--accent-soft`
values at the top of `tokens.css` (light) and inside the `.dark` block. The
whole site follows, including the before/after slider, focus rings, gradients
and glows.

> **Keep contrast honest.** `--accent` is used for text on light surfaces and
> is deliberately a shade darker than `--accent-vivid`, which carries white
> text on filled buttons. If you swap in a light accent, check both pairings
> against 4.5:1 before shipping.

### 3. Content

| File | Holds |
| --- | --- |
| `src/content/services.ts` | Six services with detail-page content and their own FAQs |
| `src/content/pricing.ts` | Four packages, add-ons, comparison matrix, memberships |
| `src/content/reviews.ts` | Sample reviews, and the operating-facts strip |
| `src/content/faqs.ts` | 20 FAQs in five categories |
| `src/content/blog.ts` | Six long-form articles with structured bodies |
| `src/content/company.ts` | Locations, team, timeline, values, open roles |

Adding a service or a blog post is additive — new entries appear in the index,
the sitemap-less static routes, and any list that renders them.

---

## About the imagery (please read)

**One image language, no remote stock.** The site draws from a single local,
graded set under `public/gallery/` — the hero arc's portrait frames and the
before/after pairs — plus the hand-built SVG scene art in
`src/components/blocks/photo-frame.tsx` as the only fallback.

This matters for a reason worth writing down: an earlier revision mixed those
shots with a dozen remote Unsplash URLs, and the mismatched grading and subject
matter were the single biggest reason the site read as a generic template
rather than a car wash. **`next.config.ts` deliberately declares no
`remotePatterns`.** If you want stock photography, add it to `design.md`
first and grade it to the palette — don't re-add a remote host and hope.

Swapping in a client's real photography is expected at launch: replace the
`src` values in `src/content/gallery-images.ts` and the files in
`public/gallery/`, and for the SVG-only slots swap `<PhotoFrame scene="car" />`
for a `next/image` (`unoptimized` is already set, so plain `<Image>` works).

Sample art is labelled as such in the UI. No generated image is presented as a
real customer's car.

> The design system these choices come from is written down in [`design.md`](./design.md).
> Read it before adding a page, a palette value or a component.

---

## Placeholder content policy

This is a demonstration, and the site says so. The footer carries a
dismissible-by-design notice, and `brand.isDemo` controls it:

- `isDemo: true` — the footer states plainly that the brand, prices, reviews
  and team are illustrative. Use this while pitching.
- `isDemo: false` — remove the notice once a client signs and real content is
  in place.

What is deliberately **not** faked: performance metrics. There is no
"+47% conversion" or "trusted by 50,000 drivers" anywhere. The fact strip uses
operating facts (locations, year founded, wash time, guarantee window), and any
entry without a real value renders as a labelled "to confirm" placeholder
instead of an invented number.

---

## 21st.dev components

`components.json` is configured with the aliases `npx shadcn add` expects, so
21st.dev components install straight in:

```bash
# Public/free registry entries need no key:
npx shadcn@latest add "https://21st.dev/r/<slug>"

# Keyed entries — quote the URL, it contains an ampersand:
npx shadcn@latest add "https://21st.dev/r/<slug>?api_key=$API_KEY_21ST"
```

A free 21st.dev account gives **2 component copies per day**; unlimited needs a
membership.

### Installed so far

| Component | File | Used by |
| --- | --- | --- |
| Scroll-morph hero arc | `src/components/ui/scroll-morph-hero.tsx` | Home hero |
| Path-drawing portfolio hero | `src/components/ui/path-drawing-portfolio-hero.tsx` | *Retained, currently unused* |

> The scroll-morph arc is the home hero. Its scroll progress arrives as a Motion
> value from `home-hero.tsx` — never as React state — so scrolling does not
> re-render the hero. Keep it that way; a `setState` in a scroll handler is what
> made it stutter originally.

The hero is a **port, not a paste**. Three things had to change for it to work
here, and they are documented in the file so a future edit doesn't undo them:

1. **The draw font must stay a system stack** (`Arial, Helvetica, sans-serif`).
   The component measures glyph ink by serialising the SVG to a blob and
   rasterising it in an `<img>` — an isolated document that inherits none of the
   page's `@font-face` rules. Pointing it at `var(--font-display)` would render
   the *visible* text in Outfit while *measuring* a fallback face, so the dash
   length would be wrong and the name would never finish drawing. A system stack
   resolves identically in both contexts, which is what makes it exact.
   Treat it as a wordmark rather than display type.
2. **Colours are tokens.** The original shipped a hardcoded `#f093fb → #f5576c`
   gradient; it now uses `--hero-draw-from` / `--hero-draw-to`. Note the stops
   are set via `style`, not the `stopColor` attribute — CSS custom properties
   are not valid inside SVG presentation attributes.
3. **`--hero-bg` / `--on-hero` do not invert between themes.** The band is
   deliberately dark in both, which is why it can't reuse `bg-ink text-paper`
   (those swap, so the band would turn white in dark mode).

Two additions over the source: the rAF loop pauses while the hero is offscreen,
and it resumes mid-draw instead of restarting.

### Two gotchas before you add a component

**1. `text-[var(--text-sm)]` is a trap.** `tailwind-merge` cannot tell an
arbitrary font size from an arbitrary colour, so in any component run through
`cn()`, `text-[var(--text-sm)]` and `text-accent-contrast` are treated as the
same group and **one is silently dropped** — usually the colour, which is how
every primary button ended up dark-on-blue at 3.04:1.

Always write the type hint:

```tsx
// ✗ the colour or the size gets dropped
cn("text-[var(--text-sm)] text-accent-contrast")

// ✓ both survive, identical CSS
cn("text-[length:var(--text-sm)] text-accent-contrast")
```

The whole codebase uses the hinted form. If you add a component and its text
suddenly renders in the wrong size or colour, this is almost always why.

**2. Normalise the component's own tokens** in the same commit. Components
arrive with their own radius, spacing and colour values; map them onto
`var(--accent)`, `var(--radius-md)`, `var(--space-md)` or they drift.

`src/components/ui/` follows the shadcn conventions (`components.json` aliases,
`cn()` from `@/lib/utils`, CVA variants), so dropped-in components resolve
without edits.

---

## Stack

| Piece | Choice |
| --- | --- |
| Framework | Next.js 16.3 (App Router), `output: "export"` |
| Language | TypeScript, strict |
| Styling | Tailwind v4 with a token contract in `tokens.css` |
| Motion | [Motion](https://motion.dev) (Framer Motion) — `motion/react` |
| Smooth scroll | [Lenis](https://lenis.darkroom.engineering), auto-disabled for `prefers-reduced-motion` |
| Dark mode | `next-themes`, class strategy, system default |
| Toasts | `sonner` |
| Primitives | Radix UI |
| Icons | `lucide-react` |
| Type | Outfit (display) + Work Sans (body) via `next/font` |

### Why static export

It hosts anywhere for free, has no cold starts, and cannot leak a database
because there isn't one. The trade-off is that `next.config.ts` disables server
actions, request-dependent route handlers and the default image optimizer — see
`01-app/02-guides/static-exports.md` in `node_modules/next/dist/docs/` for the
full list.

---

## Making the forms real

Three forms are wired to `setTimeout` and a toast:

| Form | File | Wire it to |
| --- | --- | --- |
| Booking flow | `src/components/booking/booking-flow.tsx` → `submit()` | A booking API, or a form endpoint (Formspree, Basin, Resend) |
| Contact form | `src/components/blocks/contact-form.tsx` → `onSubmit()` | Same |
| Newsletter/etc. | — | Not present |

Because the site is statically exported, the endpoint must be an external HTTP
call rather than a Next.js route handler. Search for `Demo build: no backend`
to find every place that needs replacing.

---

## Project structure

```
design.md                   the locked design system — read before adding a page
tokens.css                  portable design tokens (colours, type, space, motion)
components.json             shadcn/21st.dev CLI aliases
src/
  app/
    layout.tsx              fonts, providers, chrome, JSON-LD, boot script
    page.tsx                home
    services/[slug]/        service detail (generateStaticParams)
    blog/[slug]/            article detail (generateStaticParams)
    booking/ pricing/ gallery/ about/ locations/ faq/ careers/ not-found
  components/
    site/                   header (N12), footer (Ft5), loader, toaster, theme
    motion/                 Reveal, Stagger, Marquee, CountUp, ReadProgress
    blocks/                 hero, quick-book, cards, sections, before/after,
                            photo frames, contact form, FAQ explorer
    booking/                the multi-step flow
    ui/                     shadcn-style primitives (+ the 21st.dev hero)
  content/                  all copy and data
  hooks/use-is-client.ts    hydration-safe client detection
  lib/utils.ts              cn()
```

### How the home page is composed

1. `HomeHero` — a sticky scroll-morph arc of wash photography orbiting the
   wordmark, over a drawn wash-bay backdrop, finishing on the primary booking
   CTAs.
2. `QuickBook` — the service + site picker, which prefills the booking flow.
3. Service-name marquee, facts, services, before/after, packages, reviews as a
   grid, blog, CTA.

The hero is brand theatre; the booking path sits directly beneath it so a full
viewport of animation never stands between a visitor and a slot.

---

## Accessibility notes

- Every interactive element has default, hover, `:focus-visible`, active,
  disabled, loading, error and success states.
- The before/after slider is a real `role="slider"` — arrow keys, Home and End
  all work. So does the booking flow's date and time picker.
- Step changes in the booking flow move focus to the new heading and announce
  progress via `aria-current="step"`.
- Form errors are attached with `aria-describedby` and `role="alert"`, and
  inputs carry `aria-invalid`.
- The drawn wordmark exposes the brand as `aria-label` plus an `sr-only` `<h1>`,
  so the animation is fully legible to screen readers.
- `prefers-reduced-motion` collapses the marquee to a wrapped list, skips the
  boot splash, parks the hero arc at its settled state instead of scrubbing it,
  disables Lenis entirely (scroll tracks the input device 1:1), and zeroes
  transition durations.
- Accordions animate `grid-template-rows`, not `height`, so opening one never
  triggers a layout-thrash sweep of the page.
- The boot splash dismisses on the first key press, pointer press or wheel tick —
  a loader you cannot skip is a tax.
- The wordmark's rAF loop stops while it is offscreen and resumes mid-draw, so
  it never burns frames on a part of the page you have scrolled past.
- Every animation is `transform`/`opacity` only.
- A skip-to-content link is the first focusable element.

---

## Licence

The code in this repository is yours to use. Content, brand names, prices,
reviews and team members are placeholder material written for demonstration and
carry no factual claim.
