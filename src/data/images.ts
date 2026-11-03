/**
 * Every photograph on the site is listed here. No client photography has been supplied yet,
 * so each entry has `src: null` and renders an honest "Photo pending" slot describing the shot.
 *
 * To add a photo: put it in /public/images/... and set `src` (e.g. "/images/home/hero.jpg").
 * Use real R.K Travels photography wherever possible. Never present stock vehicles as the fleet,
 * and never invent staff portraits or customer trips. See CONTENT_PENDING.md.
 */
export type SiteImage = {
  src: string | null;
  alt: string;
  /** What the photograph should show. Shown in the pending slot. */
  subject: string;
  /** Focal point for object-position, e.g. "70% 50%". */
  focus?: string;
};

const img = (subject: string, alt: string, focus?: string): SiteImage => ({ src: null, alt, subject, focus });

export const images = {
  homeHero: img("Scenic coastal road with a tourist vehicle, near Negombo", "A vehicle on a coastal road in Sri Lanka", "65% 50%"),
  airportTransfers: img("Arrivals at Bandaranaike International Airport", "Travellers arriving at Bandaranaike International Airport"),
  vehicleRentals: img("A tourist vehicle on a hill-country road", "A rental vehicle on a winding road in Sri Lanka's hill country"),
  tours: img("Sigiriya rock fortress at first light", "Sigiriya rock fortress rising above the forest"),
  aboutIntro: img("Negombo lagoon with fishing boats", "Fishing boats on Negombo lagoon"),
  aboutJourney: img("Travellers on a scenic road journey", "Travellers stopping on a scenic road in Sri Lanka"),
  servicesHero: img("Road journey through tea country", "A road winding through tea plantations"),
  contactHero: img("Negombo beach in the evening", "Negombo beach at sunset"),
  cars: img("A car suited to two to four travellers", "A car for hire in Sri Lanka"),
  vans: img("A van for families and groups", "A van for family and group travel"),
  motorcycles: img("A motorcycle on a quiet coastal road", "A motorcycle on a coastal road"),
  tuktuks: img("A tuk-tuk on a Negombo street", "A tuk-tuk on a street in Negombo"),
  sigiriya: img("Sigiriya rock fortress", "Sigiriya rock fortress"),
  kandy: img("Kandy lake and the Temple of the Tooth", "Kandy lake with the Temple of the Sacred Tooth Relic"),
  ella: img("Nine Arches Bridge, Ella", "The Nine Arches Bridge near Ella"),
  galle: img("Galle Fort ramparts by the sea", "The ramparts of Galle Fort"),
  nuwaraEliya: img("Tea plantations around Nuwara Eliya", "Tea plantations in the hills around Nuwara Eliya"),
  negombo: img("Negombo beach and lagoon", "Negombo beach"),
} satisfies Record<string, SiteImage>;
