# Content pending client confirmation

The site is built only from confirmed information. Each item below needs R.K Travels to confirm or supply it. Where it goes in the code is noted so it can be added without design changes.

## Business details
| Item | Status | Where it goes |
| --- | --- | --- |
| Official website domain | Pending | `NEXT_PUBLIC_SITE_URL` (Vercel env) |
| Business enquiry email (receives form submissions) | Pending | `ENQUIRY_TO_EMAIL` |
| Verified sending domain in Resend | Pending | `ENQUIRY_FROM_EMAIL`, Resend dashboard |
| Full registered business address | Pending — only "Negombo, Sri Lanka" is shown | `src/lib/site.ts`, `organizationJsonLd()` in `src/lib/seo.tsx` |
| Map location | Not shown until a verified address exists | Contact page |
| Business / operating hours | Not shown | `src/lib/site.ts` + contact page |
| GA4 measurement ID | Pending | `NEXT_PUBLIC_GA_MEASUREMENT_ID` |

## Services
| Item | Status | Where it goes |
| --- | --- | --- |
| Actual fleet (vehicles, seats, transmission, photos) | Pending — category cards only | `listings` in `src/data/vehicles.ts` |
| Vehicle rental rates | Not shown | — |
| Driver availability and rental policies (licence, deposit, insurance) | Not stated — "confirmed when we reply" | `src/data/faqs.ts`, vehicle rentals page |
| Insurance conditions | Not stated | — |
| Tour itineraries, durations and prices | Not shown — destinations are inspiration only | `tours` in `src/data/destinations.ts` |
| Airport transfer fares, hours of service | Not shown — no 24/7 or fixed-fare claims | airport transfers page |

## People and proof
| Item | Status |
| --- | --- |
| Founder biography (Shri) | Not written — name and title only |
| Founder / team photographs | Not shown — initial monogram used |
| Customer testimonials and reviews | None shown; no review structured data |
| Company history, statistics, awards | None shown |

## Photography
No client photography has been supplied. Every image on the site is an honest "Photo pending" slot listing the intended shot. Supply photos and set `src` for each entry in `src/data/images.ts` (files go in `public/images/`). Priority shots: home hero (coastal road with a vehicle), airport arrivals, the vans and cars actually used, and Negombo.

## Legal
The privacy policy and terms pages are plain-language drafts based on how the site works. Have them reviewed before launch, and add the business's legal name and contact email once confirmed.
