# Blog Styles Reference

Reusable design language for portfolio blog posts. Each style is self-contained in a `<style scoped>` block on its own `BlogPost*.vue` component — so styles never leak between posts, and the rest of the site (homepage, project cards, default blog look) is unaffected.

Two styles exist today. They share the same dark site background and the same `max-w-3xl mx-auto px-6 py-12` container shell, but differ on every other axis: typography, accent colour, callout shape, drop-cap, heading prefix, list markers, divider, metadata layout.

Pick the style that matches the project's vibe, or fork a third one when a new post deserves its own identity.

---

## How blog posts are wired (recap)

A new blog post needs three updates (already enforced by `CLAUDE.md`):

1. **`src/data/projects.js`** — card metadata (`id`, `title`, `shortTitle`, `image`, `description`, `showcase`).
2. **`src/data/projectBlogs.js`** — `id` → component map.
3. **`src/main.js`** — global component registration.

The component itself lives at `src/components/BlogPost<Name>.vue` and owns its own `<template>` + `<script setup>` + `<style scoped>`.

Card thumbnails go in `public/`. Blog inline images either go in `public/blog/<slug>/` (preferred for asset-heavy posts) or `src/assets/` and get ES-imported. When using `public/`, bind via `:src` (dynamic), not `src` (static) — otherwise Vite's SFC compiler tries to resolve the path at build time.

---

## Style 1 — Skedy (Purple · Long-Read Essay)

**Component:** `src/components/BlogPostSkedy.vue`
**Class prefix:** `.skedy-`
**Visual intent:** magazine essay, soft and reflective. Suits narrative / lessons-learned / personal-story posts.

### Palette

| Token | Value | Use |
|---|---|---|
| `--accent` | `#c084fc` (purple-400) | Primary accent — borders, list markers, code, eyebrow dot |
| `--accent-pink` | `#f0abfc` (fuchsia-300) | Gradient secondary stop |
| `--accent-soft` | `rgba(192, 132, 252, 0.14)` | Backgrounds, blockquote bg, code bg |
| `--accent-line` | `rgba(192, 132, 252, 0.38)` | Hairlines, dotted underlines, pill borders |
| `--accent-gradient` | `linear-gradient(135deg, #f0abfc 0%, #c084fc 100%)` | Title highlight band, drop cap, CTA button |

### Typography

- **Body:** serif. Stack: `'Charter', 'Bitstream Charter', 'Sitka Text', Cambria, Georgia, serif`. Establishes the long-read feel against the rest of the site's sans defaults.
- **Headings (`h2`, `h3`):** sans (`system-ui` stack). Creates magazine-style contrast.
- **Mono:** `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`. Used in eyebrow, stack tags, section numbers, inline code.

### Distinctive elements

- **Eyebrow line** — uppercase mono label with a small filled-circle dot, e.g. `· CASE STUDY · 13 MIN READ · MAY 2026`.
- **Title** — `clamp(2rem, 4vw + 1rem, 3.25rem)`, weight 800, negative tracking. Includes a `<span class="skedy-title-accent">` that draws a soft purple highlighter band on the bottom 35% of the text (via `linear-gradient(transparent 65%, var(--accent-soft) 65%)`).
- **Subtitle** — italic serif, gray, max 60ch.
- **Metadata pills** — small rounded chips on a near-transparent background, label in uppercase mono purple, value in slate.
- **Stack tags** — squared mono chips with `var(--accent-line)` borders and a faint purple tint.
- **Archive note** — left-bordered hairline note for "this is past tense" framing.
- **CTA button** — gradient bg (`--accent-gradient`), white text, soft lift on hover.
- **Drop cap** — first letter of `.skedy-lede` is 3.75rem, gradient-clipped text using `background-clip: text` + transparent fill.
- **Section headings** — auto-numbered via CSS counter (`counter-reset: skedy-section` on the article, `counter-increment` on each `h2`). Format: small mono `01`, `02`, … sitting just outside the column to the left, plus a 3px solid purple vertical bar attached to the heading.
- **Blockquotes** — italic serif, larger size, 4px solid purple left border + 90deg fading purple-to-transparent gradient background.
- **Inline code** — pill: light-fuchsia text, soft purple bg, purple border, 4px radius.
- **Lists** — purple `::marker` colour, otherwise default disc/decimal.
- **Closing divider** — 60px hairline with two purple dots flanking it.
- **Figure placeholder pattern** — dashed-border card with corner tag, hint text, and target file path. Used while images are missing. Replace whole block with `<figure class="skedy-figure"><img :src="..." /><figcaption>…</figcaption></figure>` once assets are dropped.

### When to use it

- Personal essays, narrative case studies, "lessons learned" posts.
- Anything where the **tone is reflective**, the reader is meant to settle in for ~10+ minutes.
- Posts that benefit from visual softness: gradients, serif, drop caps, blockquotes.

### Where to look (in the file)

- Hero header markup: top of `<template>`.
- Scoped CSS: `<style scoped>` block, organised top→bottom as: vars → hero → figures → article body → headings → lists → code → blockquotes → divider → responsive.

---

## Style 2 — ParkSense (Green · Data Field Notes)

**Component:** `src/components/BlogPostParkLenseDDSC.vue`
**Class prefix:** `.ps-`
**Visual intent:** technical / data-journalism. Sharp, rectangular, mono accents. Suits engineering write-ups, ML experiment logs, post-mortems.

### Palette

| Token | Value | Use |
|---|---|---|
| `--accent` | `#25d366` (WhatsApp / "sensor" green) | Primary accent — list markers, eyebrow tick, callout border, drop-cap bg |
| `--accent-deep` | `#16a34a` (green-600) | Reserved for hover / pressed states |
| `--accent-soft` | `rgba(37, 211, 102, 0.10)` | Subtle backgrounds (premise box, callouts) |
| `--accent-line` | `rgba(37, 211, 102, 0.35)` | Borders, dashed heading underline |

> Failure state (✕ list items, "not predictable") uses `#ef4444` (red-500) on a soft red wash — intentional asymmetry to signal "this didn't work" without softening it.

### Typography

- **Body:** **sans** throughout (`system-ui` stack). Deliberately different from Skedy's serif — feels like a lab notebook or technical report.
- **Mono:** used heavily for eyebrows, stat-grid labels, callout labels, inline code, list numerals. The mono "lab" treatment is one of the strongest differentiators from Skedy.

### Distinctive elements

- **Eyebrow** — uppercase mono with a small rotated-square tick (instead of Skedy's filled circle). Gives a more technical, less editorial feel.
- **Title** — `clamp(2.2rem, 4vw + 1rem, 3.5rem)`, weight 800, no gradient highlight band. Plain white.
- **Premise box** — high-impact callout right under the title with a `▸ PREMISE` mono label and the project's driving question in white. Distinct from Skedy's italic serif subtitle.
- **Stat grid** — 4-cell metadata grid (`Role`, `Team`, `Stack`, `Data source`) with hairline dividers between cells. Replaces Skedy's pill chips. Mono uppercase labels in green, values in slate. Falls back to a 2-cell grid on mobile.
- **Drop cap** — first letter of `.ps-lede` is a 3rem **solid green square** with the letter in dark green inside it. Hard, geometric, opposite of Skedy's gradient text drop cap.
- **Section headings (`h2`)** — `›` arrow prefix in green, 1px dashed green underline. No auto-numbering. Smaller and tighter than Skedy's h2.
- **Sub-headings (`h3`)** — plain bold white, slightly smaller than body h2.
- **Callouts** — `<aside class="ps-callout">` with a mono `▸ INSIGHT` / `▸ INTERPRETATION` / `▸ IMPORTANT RESULT` label and a 3px **right**-side green border (Skedy uses a left border for its blockquotes — the side-swap is intentional differentiation).
- **Lists** — green `›` markers via `::before`, custom layout (no default disc). Ordered lists get a mono green number prefix instead of the default decimal.
- **Tech-stack 4-cell grid** — hairline-divided cells with mono uppercase section titles in green. Used for the in-body "Tech Stack" section. Stacks to 1 column on mobile.
- **Recommended-architecture cards** — 2-card grid with a mono "tag chip" (e.g. `NO ML` / `ML`) on the same line as the card heading. Lets the reader scan the recommendation taxonomy at a glance.
- **Verdict list** — `.ps-verdict` with `.ps-yes` (green bg wash, green left bar, `✓` icon) and `.ps-no` (red bg wash, red left bar, `✕` icon). Designed for the "what these data can / cannot predict" summary.
- **Inline code** — squared corners, 2px solid green left border (no all-around border like Skedy). Sharper, more "log-line" feel.
- **Divider** — three centred dots `· · ·` in green. Distinct from Skedy's hairline-with-dots divider.

### When to use it

- Engineering write-ups, ML experiment logs, post-mortems, data-science reports.
- Posts where **the reader scans for findings** before reading prose.
- Anything that benefits from callouts, stat boxes, and verdict lists rather than long flowing paragraphs.

### Where to look (in the file)

- Hero header (eyebrow, title, premise box, stat grid): top of `<template>`.
- In-body grids (`.ps-stack-grid`, `.ps-recs`, `.ps-verdict`): scattered through the article body.
- Scoped CSS: `<style scoped>` block, organised top→bottom as: vars → hero → article body → headings → lists → code → callouts → grids → verdict → divider → responsive.

---

## Side-by-side: how the two styles differ

| Aspect | Skedy (purple) | ParkSense (green) |
|---|---|---|
| Body font | Serif | Sans |
| Accent direction | Gradient (pink → purple) | Solid green |
| Eyebrow marker | Filled circle | Rotated square (▰) |
| Drop cap | Gradient-clipped text, 3.75rem | Solid green square + dark letter |
| `h2` prefix | Auto-numbered `01`, `02`, … (mono) | Green `›` arrow |
| `h2` accent | 3px solid left bar | Dashed bottom underline |
| List marker | `::marker` colour only | Green `›` via `::before` |
| Callout | Blockquote, italic, 4px **left** bar, gradient bg | `<aside>`, mono label, 3px **right** bar, soft tint |
| Metadata | Pill chips + mono tag chips | 4-cell stat grid |
| Inline code | Pill, full border, 4px radius | Squared, 2px left border only |
| Divider | Hairline + 2 flanking dots | `· · ·` centred row |
| CTA button | Gradient bg + white text | (No CTA in this style) |
| Image figures | `.skedy-figure` w/ italic centred caption | (Not added yet — borrow `.skedy-figure` or add a `.ps-figure` variant when needed) |
| Mood | Reflective, magazine | Technical, field-notebook |

---

## How to add a third style

1. **Copy** the closest existing component (Skedy if narrative, ParkSense if technical) into a new `BlogPost<Name>.vue`.
2. **Rename** the class prefix (`.skedy-` → `.<name>-`) so its scoped styles can't collide with existing posts even if Vue's scoping ever changes.
3. **Pick a single accent colour** + one or two derived tokens (`--accent`, `--accent-soft`, `--accent-line`, optionally `--accent-gradient`). Keep this in `<style scoped>` at the top — every other style should reference the tokens, never the hex directly. That makes future re-skinning a one-line change.
4. **Diverge on at least three of these axes** so the post visibly stands apart from the existing two:
   - Body font (serif / sans / mono)
   - Heading prefix style (numbered / bracket / underline / icon)
   - Callout shape (blockquote / aside / banner / pull-quote)
   - Drop-cap treatment (gradient text / filled square / outlined letter / none)
   - Metadata layout (pills / stat grid / inline kv / table)
5. **Wire it up** in the three coupling points (`projects.js`, `projectBlogs.js`, `main.js`).
6. **Document it here** — add a new section above with the same shape: palette table, typography, distinctive elements, when-to-use, file pointers.

---

## Guardrails

- **Always scope styles** (`<style scoped>`). Never write blog-post-specific CSS into `src/assets/main.css`.
- **Always namespace class names** (`.skedy-…`, `.ps-…`). Even with `scoped`, prefixing keeps DevTools readable and prevents accidental collisions if `scoped` is ever removed.
- **Don't hardcode the accent hex inside rules** — use the CSS variables defined at the top of the style block, so a recolour is a single-line change (Skedy already did this swap once: WhatsApp green → Skedy purple).
- **Reuse the `max-w-3xl mx-auto px-6 py-12` shell** on the root `<div>`. This is the only page-shape promise the rest of the site depends on.
- **Keep the breadcrumb** (`Home » Projects » <Title>`). It's the navigation contract every blog post fulfils.
- **Mobile**: every style block has a `@media (max-width: 640px)` section at the bottom. Don't skip it — long-form posts get read on phones.
