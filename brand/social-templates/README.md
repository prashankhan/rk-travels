# Social media templates

Five templates in three sizes, sharing the website's tokens: white or warm-white grounds, the approved full-colour logo, Instrument Serif headlines, a yellow WhatsApp CTA and the verified phone number.

| Template (`t=`) | Purpose |
| --- | --- |
| `general` | Brand / general travel promotion ("Your Journey, Our Priority.") |
| `airport` | Airport transfers |
| `rental` | Vehicle rentals |
| `tours` | Tours and destinations |
| `announcement` | Type-led information post (no photo) |

Sizes (`s=`): `square` 1080 × 1080, `portrait` 1080 × 1350, `story` 1080 × 1920 (story layouts keep the top 250px and bottom 260px clear of Instagram UI).

## Editing
- Copy lives in the `TEMPLATES` object at the bottom of `template.html`. Keep sentence case; no offers, discounts or prices unless confirmed.
- Add a photograph: `template.html?t=tours&s=portrait&photo=../photos/sigiriya.jpg`, or export all with one photo: `node brand/social-templates/render.mjs ../photos/sigiriya.jpg`. Without a photo the slot is labelled with the intended shot.
- Exports in `exports/` show the empty photo slots — they are layout references, not ready-to-post images. Add real photography before posting.

Re-export all 15: `npm i -D playwright && npx playwright install chromium`, then `node brand/social-templates/render.mjs`.

The social profile picture (`public/brand/marks/rk-travels-social-profile.png`) is a separate approved asset and is not part of this kit.
