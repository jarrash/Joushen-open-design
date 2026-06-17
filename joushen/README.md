# Joushen — implemented designs

Production-grade implementation of the **Joushen Design System** handoff bundle
(exported from Claude Design). It recreates the two product surfaces the bundle
shipped as HTML/CSS/JS prototypes:

- **Corporate website** — hero, services, platform, stats band, CTA, footer, and
  a "Request a briefing" modal.
- **Trust Console** — a GRC + identity dashboard with login → dashboard →
  identities (with a detail drawer) → governance.

Both are built on a faithful port of the design system: the CSS token files
(colors, type, spacing, elevation, fonts, base) and all 12 React components
(`Button`, `IconButton`, `Input`, `Select`, `Checkbox`, `Switch`, `Card`,
`Badge`, `Stat`, `Avatar`, `Alert`, `Tabs`).

## Why this lives at the repo root and not under `apps/`

This is unrelated to the Open Design platform product. It is deliberately kept
out of the pnpm workspace (`apps/*`, `packages/*`, `tools/*`, `e2e`) as a
self-contained Vite project so it does not affect the monorepo's build, lint, or
boundary rules.

## Stack

- Vite + React 18 + TypeScript
- [`lucide-react`](https://lucide.dev) for the thin line icon set the brand spec
  requires (the prototype loaded Lucide from CDN; here it is a real dependency)
- Google Fonts CDN for IBM Plex Sans / Mono / Sans Arabic (matching the bundle)

## Run

```bash
cd joushen
pnpm install   # or npm install
pnpm dev       # http://localhost:4310
pnpm build     # type-check + production build to dist/
```

Use the floating switcher at the bottom of the screen (or the `#website` /
`#console` URL hash) to move between the two surfaces.

## Fidelity notes / known substitutions (carried over from the bundle)

- **Fonts:** IBM Plex family via Google Fonts CDN — no self-hosted binaries.
- **Icons:** Lucide as the stand-in line set; no proprietary Joushen icon font
  was provided.
- **Imagery:** heroes use the on-brand dark network/dot motif rendered in CSS
  rather than stock photography.
- The original `jarrash/joushen` GitHub repo was empty at design time, so the
  surfaces are brand-faithful originals built from the written brief, not
  recreations of an existing Joushen product.

Logo assets live in `public/assets/logo/`.
