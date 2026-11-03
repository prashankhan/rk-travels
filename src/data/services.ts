import { images, type SiteImage } from "./images";

export type Service = {
  slug: string;
  index: string;
  title: string;
  href: string;
  summary: string;
  linkLabel: string;
  image: SiteImage;
  includes: string[];
};

/** The three primary services, in the approved order. */
export const primaryServices: Service[] = [
  {
    slug: "airport-transfers",
    index: "01",
    title: "Airport transfers",
    href: "/airport-transfers",
    summary: "Pickups and drop-offs arranged around your flight, so the first and last part of your trip is simple.",
    linkLabel: "Arrange a transfer",
    image: images.airportTransfers,
    includes: ["Airport pickups on arrival", "Drop-offs for your departure", "Transfers for families and groups"],
  },
  {
    slug: "vehicle-rentals",
    index: "02",
    title: "Vehicle rentals",
    href: "/vehicle-rentals",
    summary: "Cars, vans, motorcycles and tuk-tuks for getting around Sri Lanka at your own pace.",
    linkLabel: "Browse vehicle types",
    image: images.vehicleRentals,
    includes: ["Cars", "Vans", "Motorcycles", "Tuk-tuks"],
  },
  {
    slug: "tours",
    index: "03",
    title: "Tours & experiences",
    href: "/tours",
    summary: "Private sightseeing, family trips and custom journeys to the places you want to see.",
    linkLabel: "Explore tours",
    image: images.tours,
    includes: ["Private sightseeing trips", "Family and group travel", "Custom travel arrangements"],
  },
];

export type SupportingService = { id: string; title: string; summary: string };

/** Supporting services — never presented as primary pillars. */
export const supportingServices: SupportingService[] = [
  {
    id: "hotel-booking",
    title: "Hotel booking assistance",
    summary: "Planning a route and need somewhere to stay along the way? Tell us where and when, and we can help with hotel arrangements.",
  },
  {
    id: "house-rental",
    title: "House rental assistance",
    summary: "Staying longer in Sri Lanka? Let us know what you are looking for and we can help you find a house to rent.",
  },
];
