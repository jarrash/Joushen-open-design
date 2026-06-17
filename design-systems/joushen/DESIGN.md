# Design System Inspired by Joushen

> Category: Security & Identity
> Saudi cybersecurity and digital-trust brand. Calm navy structure, one electric lime signal, executive flat geometry.

## 1. Visual Theme & Atmosphere

Joushen (جوشن) is a Saudi cybersecurity and digital-trust company, formalizing around a **Digital Trust & Digital Identity** positioning aligned with Vision 2030. The system feels like a senior advisor briefing a board: minimalist, executive, premium, and flat. The whole identity rides on a single high-contrast move — a calm structural **Deep Navy** (`#345060`) carrying chrome and text, against a single electric **Joushen Lime** (`#cde812`) used as the one signal accent. Lime is precious: it lands on CTAs, active states, data emphasis, and the occasional featured-card rule, never as a flood behind body text.

There are exactly **two background modes**. A **light** mode (cool gray `#f5f7f8` page, white cards) carries content and the product console. A **dark** mode (Dark Charcoal `#171c22`) is reserved for covers, heroes, and "cyber" contexts, where lime highlights and a thin geometric **network/grid motif** — connected nodes, dotted grids, hairline line-networks rendered in CSS at low opacity — express "data networks / identity." No heavy multi-stop gradients; at most a subtle navy→charcoal vertical wash on dark heroes. Rainbow and purple gradients are off-brand.

Geometry is the through-line: hairline borders, restrained navy-tinted shadows, modest radii (6/10/16px), and generous whitespace with strong left-alignment. The brand deliberately avoids the clichés of its category — no shield icons, no padlocks, no hooded-hacker imagery, no fear-mongering. Trust is communicated through calm, structure, and evidence, not through alarm.

**Key Characteristics:**
- Deep Navy (`#345060`) structure against a single Joushen Lime (`#cde812`) signal accent, capped at ~5–10% of any surface
- Two modes only — light cool-gray content surfaces and a Dark Charcoal cover/hero mode with a thin CSS network/grid motif
- IBM Plex Sans for UI and headings, IBM Plex Mono for eyebrows, IDs, and data; IBM Plex Sans Arabic for RTL
- Geometric, flat shapes — 6px controls, 10px cards, 16px panels; pills only for badges and avatars
- Lime used as a 3px top/left rule on featured cards — a restrained motif, not on every card
- Cool, navy-tinted, low-spread shadows; one reserved lime glow for primary CTAs and hero focal points
- High-visibility 3px lime focus ring with a 2px offset — brand-colored, never a faint gray
- Real Saudi-professional / control-room / modern-architecture photography, cool-toned and premium — never warm stock, shields, or padlocks

## 2. Color Palette & Roles

### Primary
- **Joushen Lime** (`#cde812`): The single signal accent. Token `--accent`. Primary CTAs, active-tab indicator, key data emphasis, featured-card rule. The highest-visibility color on any surface — and the most rationed.
- **Deep Navy** (`#345060`): The structural primary. Carries chrome, headings, and UI text; the ink ramp deepens to `#131d24` (`--fg`) for strong text. Never paired with true black.

### Secondary & Accent
- **Sage Green** (`#699583`): A supporting accent for data viz and "on/positive" states. Kept inline at the components that use it, not a shared accent slot.
- **Digital Blue** (`#5ab4d2`): A second supporting accent for data and informational emphasis. Also inline.
- **Charcoal on Lime** (`#171c22`): The only legible foreground on a lime fill. Token `--accent-on`. The "navy on lime" wordmark lockup encodes this exact pairing — never white text on lime.

### Surface & Background
- **Cool Gray** (`#f5f7f8`): The default content/app page background. Token `--bg`.
- **Canvas White** (`#ffffff`): The card surface that steps forward from the page. Token `--surface`.
- **Sunken Gray** (`#edf0f2`): Inset wells, table zebra, sunken panels. Token `--surface-warm`.
- **Dark Charcoal** (`#171c22`): The cover/hero/cyber mode surface, layered inline — not the page default.

### Borders & Status
- **Hairline Gray** (`#dde3e6`): The workhorse 1px border — card edges, table rules, dividers. Token `--border`. On dark surfaces this becomes `rgba(255,255,255,0.10)`, kept inline.
- **Status**: `--success` (`#5ba66e`), `--warn` (`#e0b23b`), `--danger` (`#d9534f`) — desaturated, navy-compatible, kept well under 5% of any view.

## 3. Typography Rules

- **Families**: `IBM Plex Sans` for UI and headings; `IBM Plex Mono` for eyebrows, kickers, IDs, code, and tabular data; `IBM Plex Sans Arabic` as the bidi-paired family for Arabic. Display and body share Plex Sans — identity comes from weight and tracking, never typeface mixing.
- **Display** is bold (700) with tight tracking (`--tracking-display`, −0.03em) and tight leading (1.20). **Headings** are semibold (600) at −0.015em. **Body** is 16px / 1.65 — an open, executive reading rhythm.
- **Eyebrows / kickers** are mono, UPPERCASE, with wide tracking (0.12–0.18em): `DIGITAL IDENTITY`, `GRC`. This is the only place uppercase is allowed at scale — never all-caps full sentences except the wordmark.
- **Casing**: sentence case for body and most headings. **Numbers and IDs** render in mono for a precise, data-literate feel.
- **Minimums**: never below 14px body in UI; never below 24px on 1920-wide slides.
- **Type scale** (`--text-*`): 12 · 14 · 16 · 18 · 22 · 28 · 36 · 48px.

## 4. Component Stylings

- **Buttons**: Primary is a Joushen Lime fill with charcoal text (`--accent` / `--accent-on`), 6px radius, optional lime glow on hover; secondary is a navy/outline button; ghost is text-only. Press steps the lime down its ramp (`--accent-active`) — no scale-down. All buttons carry the lime focus ring.
- **Cards**: White surface, 1px `--border`, `--elev-raised` lift on hover (`translateY(-2px)`), 10px radius (`--radius-md`). **Featured cards** add a single 3px lime top rule — a deliberate, restrained motif, not on every card. Dark cards drop the shadow and use the translucent border.
- **Inputs / selects**: White field, 1px `--border`, 6px radius; focus swaps to the 3px lime ring. Labels are sentence case; helper/meta text uses `--muted`.
- **Badges / tags**: Pill geometry, small mono UPPERCASE label, used for framework chips (`NCA`, `SAMA`, `PDPL`) and status. Status badges pair a colored dot with a label.
- **Eyebrow**: mono, uppercase, wide tracking, often in `--accent` or `--muted`, sitting above a heading.
- **Network/grid motif**: thin CSS line-networks and radial-dot grids at low opacity on dark heroes — never literal clip-art or imported SVG illustration.

## 5. Layout Principles

- Containers cap at **1320px** (`--container-max`). Gutters tighten across breakpoints: 32 / 24 / 16px.
- Generous whitespace, strong **left-alignment**, a clear grid. One key message per section.
- **Executive density** on marketing (let it breathe); tighter, information-rich on the console.
- Section vertical rhythm is generous (`--section-y-desktop` 96px), tightening to 64px / 48px on smaller viewports.
- RTL is first-class for Arabic — mirror layout, keep the network motif and lime accent identical.

## 6. Depth & Elevation

- Shadows are **cool, navy-tinted, low-spread** (`rgba(19,29,36,…)`) — nothing warm, heavy, or blurry. Cards sit on a hairline ring (`--elev-ring`) or a faint `--elev-raised` lift.
- One reserved **lime glow** (`0 8px 28px rgba(205,232,18,0.30)`) for primary CTAs and hero focal points only — kept inline, never a default.
- **States**: hover darkens buttons one step (or the lime CTA gains its glow); cards lift `translateY(-2px)` + a larger shadow; links underline. Press is `translateY(1px)`, never a scale-down. **Focus** is a 3px solid lime ring at 2px offset. **Selection** is a lime background with navy text.
- **Motion**: durations 120–360ms; standard easing `cubic-bezier(0.2,0,0.1,1)`, entrances `cubic-bezier(0.16,1,0.3,1)`. Fades plus small `translateY(2–8px)` rises. No bounces, no infinite decorative loops. Respect `prefers-reduced-motion`.

## 7. Do's and Don'ts

**Do**
- Ration lime to ~5–10% of a surface; let navy carry structure and lime carry attention.
- Put charcoal/navy text on lime fills, never white.
- Use the thin CSS network/grid motif for "data networks / identity" on dark heroes.
- Reference real Saudi frameworks by acronym in mono caps — NCA, SAMA CSF, PDPL, Vision 2030.
- Keep copy executive and plain — lead with the outcome, speak to the client's "you."

**Don't**
- Don't use shield icons, padlocks, hooded-hacker imagery, or fear-mongering copy.
- Don't flood lime behind body text or use it as a large background fill.
- Don't reach for heavy, rainbow, or purple gradients, or warm/cheesy stock photography.
- Don't use emoji or unicode-glyph icons anywhere — real SVG line icons (Lucide) only.
- Don't introduce a second accent; Sage and Digital Blue stay inline for data, not as rival signals.

## 8. Responsive Behavior

- Three working breakpoints: desktop (≥1024px), tablet (640–1024px), phone (<640px), driven by the gutter and section-rhythm tokens.
- The marketing hero collapses its two-column split to a single stacked column on phone; the network motif scales but stays low-opacity.
- The console sidebar collapses to an icon rail, then to a bottom tab bar on phone; tables become stacked cards.
- Touch targets stay ≥44px; the lime focus ring and ≥14px body minimum hold at every breakpoint.
- Arabic RTL mirrors the grid and navigation while preserving the accent and motif.

## 9. Agent Prompt Guide

- Paste the `:root` block from `tokens.css` into the first `<style>` of any artifact, then resolve every value via `var(--*)` — never hardcode hex.
- Reach for `--accent` for the one primary action / focal point per view; everything else is navy and grayscale. If a second lime element appears, neutralize one.
- Default to the **light** mode for product and content; switch to the **dark charcoal** mode only for covers, heroes, and cyber contexts, and bring the CSS network/grid motif with it.
- Icons: use **Lucide** (thin line, rounded, ~2px stroke) from CDN; never hand-draw inconsistent SVGs, never emoji.
- Logos live in `assets/logo/` — `joushen-horizontal-{navy,white,lime}.png` and `joushen-mark-{navy,white,lime}.png`. Use the lime or white wordmark on dark, navy on light.
- Voice: executive, confident, plain. Signature lines — "Identity is the new security perimeter." · "Security embedded from strategy to execution." · "Built for Saudi regulations, hosted in Saudi Arabia, aligned with Vision 2030."
