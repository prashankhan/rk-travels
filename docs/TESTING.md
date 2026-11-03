# Build and testing summary

Last run: 3 November 2026, local production build (`next build` + `next start`), Node 22, Next.js 16.4.4.

| Check | Command | Result |
| --- | --- | --- |
| Type check | `npm run typecheck` | Pass |
| Lint | `npm run lint` | Pass (no errors or warnings) |
| Unit and API tests | `npm test` | 26 / 26 pass — validation schemas, WhatsApp links, email config and rows, React Email render, enquiry route (success, provider failure, missing config, validation, honeypot, too-fast, cross-origin, rate limit) |
| Production build | `npm run build` | Pass — 7 pages + privacy, terms, sitemap, robots, icons static; `/api/enquiry/[type]` dynamic |
| Browser checks | Playwright, 1440px and 390px | All 7 pages render with no console errors and no horizontal overflow; mobile menu opens and closes on Escape; Services dropdown works |
| Form flow | Playwright, airport transfer form | Empty submit shows 7 field errors; a valid submit without email credentials shows "Online enquiries are not available yet" with a WhatsApp fallback (no false success) |
| Accessibility | axe-core 4.10 (WCAG 2.0–2.2 A/AA + best practice), 9 pages × 2 widths | 0 violations |
| Lighthouse 13 (mobile, localhost) | home / airport transfers | Performance 96 / 90, Accessibility 100, Best practices 100, SEO 100, CLS 0 |

## Not verified
- **Email delivery through Resend** — no API key or verified domain yet. The code path is covered by tests with a mocked provider only.
- **GA4 tracking** — no measurement ID yet. Verify events in GA4 DebugView after setting `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- **Real-world performance** — scores above are on localhost with no photographs. Re-run Lighthouse on the Vercel deployment once real images are added.
- **Business card print output** — RGB PDF; needs the printer's CMYK conversion and proof.
