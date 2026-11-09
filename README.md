# R.K Travels website

Website and brand applications for **R.K Travels**, a travel and transport company in Negombo, Sri Lanka: airport transfers, vehicle rentals, and tours and experiences.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui-style components on Radix · React Hook Form + Zod · Resend + React Email · Lucide · GA4 · Vercel.

## Quick start
```bash
npm install
cp .env.example .env.local
npm run dev
```
Scripts: `dev`, `build`, `start`, `lint`, `typecheck`, `test`.

## What's here
| Path | Contents |
| --- | --- |
| `src/app` | The seven pages (`/`, `/about`, `/services`, `/airport-transfers`, `/vehicle-rentals`, `/tours`, `/contact`), privacy and terms, `sitemap.ts`, `robots.ts`, PNG favicon, `api/enquiry/[type]` route |
| `src/components/ui` | Design-system primitives (Button, Input, Select, Textarea, Checkbox, RadioGroup, Accordion, Sheet) |
| `src/components/layout` | Header with Services dropdown, mobile menu, footer, floating WhatsApp action, logo |
| `src/components/sections` | Heroes, service and destination cards, steps, FAQ, CTA, contact panel, photo slots |
| `src/components/forms` | Airport transfer, vehicle rental, tour and general enquiry forms |
| `src/lib` | Site config, WhatsApp links, Zod schemas, enquiry handler, Resend sender, rate limit, SEO helpers, analytics |
| `src/data` | All business content as typed data: services, vehicles, destinations, FAQs, navigation, images |
| `src/emails` | React Email notification template |
| `public/brand` | Approved logo files and marks (unchanged originals) |
| `brand/business-card` | Editable card source, print PDFs with bleed, 600 dpi PNGs |
| `brand/social-templates` | Editable social templates and 15 PNG exports |
| `docs` | Design system, deployment, brand usage, test summary |
| `CONTENT_PENDING.md` | Everything waiting on client confirmation |

## Enquiries
Four forms post to `/api/enquiry/{airport-transfer|vehicle-rental|tour|contact}`. The server validates with the same Zod schemas as the browser, checks the honeypot, timing, origin and rate limit, then sends a structured email through Resend. The form only says "sent" when Resend accepts the message; `generate_lead` fires only then. Without email credentials the API answers `503` and the form points people to WhatsApp. WhatsApp links use `https://wa.me/94743638418` with service-specific messages.

## Status
Email delivery and GA4 are implemented but **not yet live**: they need `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL`, `ENQUIRY_TO_EMAIL` and `NEXT_PUBLIC_GA_MEASUREMENT_ID`. No client photography has been supplied, so the image slots use licensed stock stand-ins until real photos replace the files in `public/images/`. See `CONTENT_PENDING.md`, `docs/DEPLOYMENT.md` and `docs/TESTING.md`.
