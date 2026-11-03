# Business card — Shri, Founder

Double-sided, 90 × 50 mm.

| | |
| --- | --- |
| Trim | 90 × 50 mm |
| Bleed | 3 mm each side → artboard 96 × 56 mm |
| Safe area | 4 mm inside trim (82 × 42 mm) — all text and the logo sit inside it |
| Front | Approved full-colour logo on white, service line, navy base band (3 mm visible) with a yellow mark |
| Back | Shri · Founder · R.K Travels; +94 74 363 8418 (phone & WhatsApp); Negombo, Sri Lanka; RK mark |
| Type | Montserrat Bold (name), Inter (contact details), Instrument Serif italic (company line) |

## Files
- `card.html` — **editable source** (HTML/CSS; open `card.html?side=front&guides=1` in Chrome to see trim and safe guides).
- `exports/rk-travels-card-front-bleed.pdf`, `…-back-bleed.pdf` — one side per PDF, with bleed, vector text.
- `exports/rk-travels-card-front-back-bleed.pdf` — both sides in one file (page 1 front, page 2 back).
- `exports/*-bleed-600dpi.png` — full artboard at 600 dpi.
- `exports/*-preview.png` — trimmed previews; `*-guides.png` — proofs with trim (magenta) and safe (blue dashed) lines.

Re-export: `npm i -D playwright && npx playwright install chromium`, then `node brand/business-card/render.mjs`.

## Remaining prepress step
The PDFs are RGB with no crop marks, because the build environment cannot produce a reliable CMYK conversion. Before printing, the printer (or a designer in Acrobat / Illustrator) should convert to their CMYK profile (e.g. FOGRA39 or the printer's own), add crop marks, and proof the navy (#06274D) and yellow (#FFC107), which shift in CMYK. The logo is a raster PNG; at this size it prints at well above 300 ppi.
