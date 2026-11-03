# Setup and deployment

## Requirements
Node.js 20.9 or newer (22 recommended), npm.

## Local development
```bash
npm install
cp .env.example .env.local   # fill in what you have; the site runs without any of it
npm run dev                  # http://localhost:3000
```

## Environment variables
| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | For production | Canonical URLs, sitemap, Open Graph, structured data. No trailing slash. On Vercel it falls back to the production deployment URL. |
| `RESEND_API_KEY` | For email | Resend API key (server only). |
| `ENQUIRY_FROM_EMAIL` | For email | Sender on a domain verified in Resend, e.g. `R.K Travels <enquiries@yourdomain.com>`. |
| `ENQUIRY_TO_EMAIL` | For email | Inbox for enquiries. Several addresses can be comma-separated. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | GA4 measurement ID (`G-…`). Leave empty to disable analytics. |

**Until all three email variables are set, the forms do not claim success.** The API returns `503 email_not_configured` and the form shows a message pointing to WhatsApp.

## Deploying to Vercel
1. Import the GitHub repository in Vercel (framework preset: Next.js, defaults are fine).
2. Add the environment variables above for Production (and Preview if you want forms to work there).
3. Deploy. Add the custom domain under Project → Domains and set `NEXT_PUBLIC_SITE_URL` to it.
4. Preview deployments serve `robots.txt` with `Disallow: /` so they are not indexed.

## Resend setup
1. Create a Resend account and add the business domain under Domains; add the DNS records it lists and wait for verification.
2. Create an API key with sending access → `RESEND_API_KEY`.
3. Set `ENQUIRY_FROM_EMAIL` to an address on the verified domain and `ENQUIRY_TO_EMAIL` to the business inbox.
4. Send a test enquiry from each of the four forms and confirm it arrives. Preview the email template with `npm run email:dev` (needs `npm i -D react-email`).

## Google Analytics 4
Set `NEXT_PUBLIC_GA_MEASUREMENT_ID`. GA loads with Consent Mode v2: analytics storage is denied until the visitor accepts in the small consent panel; ad storage is always denied. Events:

| Event | When |
| --- | --- |
| `whatsapp_click`, `phone_click` | Click on any link with `data-track` (header, footer, contact panels, floating button) |
| `generate_lead` | Only after the server confirms the email provider accepted an enquiry |
| `airport_transfer_enquiry`, `vehicle_rental_enquiry`, `tour_enquiry`, `contact_form_submit` | Alongside `generate_lead`, per form |

Mark `generate_lead` as a key event in GA4. Verify in GA4 DebugView before relying on the numbers — tracking is not verified until then.

## Spam and abuse protection
- Hidden honeypot field; submissions faster than 2.5 s are rejected.
- Same-origin check, JSON-only, 20 KB body limit, strict Zod validation on the server.
- Rate limit: 5 enquiries per IP per 10 minutes, in memory. On Vercel each instance has its own counter; if abuse appears, replace `src/lib/rate-limit.ts` with a shared store such as Upstash Redis.
- Duplicate protection: the button disables while sending, and each form sends an idempotency key that Resend uses to drop duplicates.
