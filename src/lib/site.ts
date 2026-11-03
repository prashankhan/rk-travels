/** Confirmed business details. Anything not listed here is pending — see CONTENT_PENDING.md. */
export const site = {
  name: "R.K Travels",
  category: "Travel & Transport Company",
  founder: { name: "Shri", title: "Founder" },
  location: { locality: "Negombo", country: "Sri Lanka", countryCode: "LK", display: "Negombo, Sri Lanka" },
  phone: { display: "+94 74 363 8418", e164: "+94743638418", whatsapp: "94743638418" },
  description:
    "R.K Travels arranges airport transfers, vehicle rentals and tours across Sri Lanka from Negombo.",
} as const;

/** Production URL from the environment; falls back to localhost in development. */
export function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/+$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const logos = {
  primary: { src: "/brand/logos/rk-travels-logo-full-colour.png", width: 1326, height: 662 },
  favicon: { src: "/brand/marks/rk-travels-favicon.png", width: 512, height: 512 },
  social: { src: "/brand/marks/rk-travels-social-profile.png", width: 1080, height: 1080 },
} as const;
