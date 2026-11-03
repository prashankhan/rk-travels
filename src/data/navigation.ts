export type NavItem = { label: string; href: string; description?: string };
export type NavGroup = { label: string; href: string; items?: NavItem[] };

export const serviceNav: NavItem[] = [
  { label: "Airport transfers", href: "/airport-transfers", description: "Pickups and drop-offs, arranged around your flight." },
  { label: "Vehicle rentals", href: "/vehicle-rentals", description: "Cars, vans, motorcycles and tuk-tuks." },
  { label: "Tours & experiences", href: "/tours", description: "Private and custom journeys across Sri Lanka." },
];

export const mainNav: NavGroup[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", items: serviceNav },
  { label: "Tours", href: "/tours" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  explore: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Tours", href: "/tours" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    ...serviceNav.map(({ label, href }) => ({ label, href })),
    { label: "Hotel booking assistance", href: "/services#hotel-booking" },
    { label: "House rental assistance", href: "/services#house-rental" },
  ],
};
