# Joushen Usage

Design System package guide for Open Design agents and reviewers.

## Read Order

1. Read this file first to understand the package contract.
2. Read `DESIGN.md` for visual intent, brand voice, constraints, and anti-patterns.
3. Paste `tokens.css` into the first artifact `<style>` block before writing component CSS.
4. Use `components.manifest.json` for the compact component inventory; open `components.html` when exact selectors or states matter.
5. Inspect `preview/` pages (`colors`, `typography`, `spacing`) when a visual sanity check is useful.
6. Pull brand marks from `assets/logo/` — lime/white wordmark on dark, navy on light.

## Design Highlights

- Deep Navy (`#345060`) structure against a single Joushen Lime (`#cde812`) signal accent, rationed to ~5–10% of any surface.
- Two modes only — light cool-gray content surfaces and a Dark Charcoal cover/hero mode with a thin CSS network/grid motif.
- IBM Plex Sans for UI and headings, IBM Plex Mono for eyebrows, IDs, and data; IBM Plex Sans Arabic for RTL.
- Geometric, flat shapes — 6px controls, 10px cards, 16px panels; pills only for badges and avatars.
- High-visibility 3px lime focus ring; charcoal text on lime fills, never white.

## Do

- Preserve the schema token names exactly so cross-brand switching stays reliable.
- Use `--accent` for the one primary action, active state, or focal element per view.
- Put `--accent-on` (charcoal) text on lime fills; keep navy and grayscale for everything else.
- Reuse component groups from `components.manifest.json` before inventing new controls.
- Use Lucide line icons (thin, rounded, ~2px stroke) and reference real Saudi frameworks in mono caps.

## Avoid

- Avoid raw hex values outside the copied `:root` token block.
- Avoid flooding lime behind body text, or introducing a second rival accent.
- Avoid shield/padlock/hooded-hacker clichés, heavy or purple gradients, and warm stock photography.
- Avoid emoji or unicode-glyph icons; use real SVG line icons only.
- Avoid claiming original upstream product source; this package is built from the Claude Design brand handoff bundle.
