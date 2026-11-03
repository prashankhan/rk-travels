import { images, type SiteImage } from "./images";

/** Editorial inspiration only — not packages, itineraries or prices. */
export type Destination = { slug: string; name: string; region: string; note: string; image: SiteImage };

export const destinations: Destination[] = [
  { slug: "sigiriya", name: "Sigiriya", region: "Cultural Triangle", note: "The ancient rock fortress, rising above the forest of the central plains.", image: images.sigiriya },
  { slug: "kandy", name: "Kandy", region: "Central Province", note: "The hill capital, its lake and the Temple of the Sacred Tooth Relic.", image: images.kandy },
  { slug: "ella", name: "Ella", region: "Hill country", note: "Tea-covered hills, viewpoints and the Nine Arches Bridge.", image: images.ella },
  { slug: "galle", name: "Galle", region: "South coast", note: "Colonial streets and sea views inside the walls of Galle Fort.", image: images.galle },
  { slug: "nuwara-eliya", name: "Nuwara Eliya", region: "Hill country", note: "Cool air and tea estates high in the central highlands.", image: images.nuwaraEliya },
  { slug: "negombo", name: "Negombo", region: "West coast", note: "Our home base: beaches, the lagoon and a short drive from the airport.", image: images.negombo },
];

/** Verified tours. Empty until R.K Travels confirms itineraries — see CONTENT_PENDING.md. */
export type Tour = { slug: string; title: string; summary: string; durationDays?: number; destinations: string[]; image?: SiteImage };
export const tours: Tour[] = [];
