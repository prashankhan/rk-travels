/**
 * Photographs for the site. R.K Travels has no photography yet, so these are licensed
 * stock stand-ins from Pexels and Unsplash (free to use). Replace each file with the
 * client's own photo and keep the same `src` path.
 *
 * Places (Sigiriya, Kandy, Ella, Galle, Nuwara Eliya, Negombo, tea country, a Galle
 * forest road, and the tuk-tuks) are photographs of Sri Lanka. The car, van, motorcycle,
 * and aircraft wing are generic travel pictures — they are not the fleet and not
 * Bandaranaike airport. Do not present them as either. No founder or customer portrait
 * is invented. See CONTENT_PENDING.md.
 */
export type SiteImage = {
  src: string | null;
  alt: string;
  /** What the photograph should show once client photography replaces the stock file. */
  subject: string;
  /** Focal point for object-position, e.g. "70% 50%". */
  focus?: string;
};

function img(src: string, subject: string, alt: string, focus?: string): SiteImage {
  return { src, alt, subject, focus };
}

export const images = {
  homeHero: img(
    "/images/vehicles/forest-road.jpg",
    "Scenic coastal road with a tourist vehicle, near Negombo",
    "A tree-lined road in Sri Lanka",
    "50% 45%",
  ),
  airportTransfers: img(
    "/images/airport/wing.jpg",
    "Arrivals at Bandaranaike International Airport",
    "An aircraft wing above the clouds",
    "50% 45%",
  ),
  vehicleRentals: img(
    "/images/vehicles/tuk-tuk.jpg",
    "A tourist vehicle on a hill-country road",
    "A tuk-tuk on a country road in Sri Lanka",
    "50% 55%",
  ),
  tours: img(
    "/images/tours/sigiriya.jpg",
    "Sigiriya rock fortress at first light",
    "Sigiriya rock fortress rising above the forest",
    "50% 40%",
  ),
  aboutIntro: img(
    "/images/about/negombo-sunset.jpg",
    "Negombo lagoon with fishing boats",
    "Sunset over the sea at Negombo",
    "50% 35%",
  ),
  aboutJourney: img(
    "/images/about/journey-road.jpg",
    "Travellers on a scenic road journey",
    "A train journey through the hills near Ella, Sri Lanka",
    "40% 50%",
  ),
  servicesHero: img(
    "/images/services/tea-country.jpg",
    "Road journey through tea country",
    "Tea plantations in Sri Lanka's hill country",
    "50% 45%",
  ),
  contactHero: img(
    "/images/about/negombo-sunset.jpg",
    "Negombo beach in the evening",
    "Sunset over the sea at Negombo",
    "50% 35%",
  ),
  cars: img("/images/vehicles/car.jpg", "A car suited to two to four travellers", "A car travelling on an open road", "50% 55%"),
  vans: img("/images/vehicles/van.jpg", "A van for families and groups", "A passenger van on a mountain road", "50% 60%"),
  motorcycles: img(
    "/images/vehicles/motorcycle.jpg",
    "A motorcycle on a quiet coastal road",
    "A motorcycle on a palm-lined coastal road",
    "50% 62%",
  ),
  tuktuks: img(
    "/images/vehicles/tuk-tuk.jpg",
    "A tuk-tuk on a Negombo street",
    "A tuk-tuk on a country road in Sri Lanka",
    "50% 55%",
  ),
  sigiriya: img("/images/destinations/sigiriya.jpg", "Sigiriya rock fortress", "Sigiriya rock fortress", "50% 42%"),
  kandy: img(
    "/images/destinations/kandy.jpg",
    "Kandy lake and the Temple of the Tooth",
    "The Temple of the Sacred Tooth Relic in Kandy",
    "50% 28%",
  ),
  ella: img("/images/destinations/ella.jpg", "Nine Arches Bridge, Ella", "A train crossing the Nine Arches Bridge near Ella", "50% 55%"),
  galle: img("/images/destinations/galle.jpg", "Galle Fort ramparts by the sea", "The ramparts of Galle Fort", "50% 32%"),
  nuwaraEliya: img(
    "/images/destinations/nuwara-eliya.jpg",
    "Tea plantations around Nuwara Eliya",
    "Tea plantations in the hills around Nuwara Eliya",
    "50% 45%",
  ),
  negombo: img("/images/home/negombo-boats.jpg", "Negombo beach and lagoon", "Traditional fishing boats on Negombo beach", "50% 60%"),
} satisfies Record<string, SiteImage>;
