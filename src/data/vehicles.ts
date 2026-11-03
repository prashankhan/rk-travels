import { images, type SiteImage } from "./images";

/** A verified vehicle listing. Add entries only with confirmed details from R.K Travels. */
export type VehicleListing = {
  name: string;
  seats?: number;
  transmission?: "manual" | "automatic";
  withDriver?: boolean;
  selfDrive?: boolean;
  image?: SiteImage;
  notes?: string;
};

export type VehicleCategory = {
  id: "car" | "van" | "motorcycle" | "tuk-tuk";
  title: string;
  description: string;
  goodFor: string;
  image: SiteImage;
  /** Empty until the actual fleet is confirmed — see CONTENT_PENDING.md. */
  listings: VehicleListing[];
};

export const vehicleCategories: VehicleCategory[] = [
  { id: "car", title: "Cars", description: "Comfortable for couples and small families on longer drives.", goodFor: "Couples, small families", image: images.cars, listings: [] },
  { id: "van", title: "Vans", description: "Room for families, groups and luggage, for transfers or multi-day trips.", goodFor: "Families, groups, extra luggage", image: images.vans, listings: [] },
  { id: "motorcycle", title: "Motorcycles", description: "An independent way to explore coastal roads and nearby towns.", goodFor: "Confident solo riders", image: images.motorcycles, listings: [] },
  { id: "tuk-tuk", title: "Tuk-tuks", description: "The classic Sri Lankan way to get around town and along the coast.", goodFor: "Short trips, local exploring", image: images.tuktuks, listings: [] },
];
