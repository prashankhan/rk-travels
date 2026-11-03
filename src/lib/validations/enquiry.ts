import { z } from "zod";

/* Shared by the browser forms and the API route, so both validate identically. */

const required = (label: string) => `Enter ${label}.`;

const fullName = z
  .string()
  .trim()
  .min(2, "Enter your full name.")
  .max(100, "Keep your name under 100 characters.");

export const whatsappNumber = z
  .string()
  .trim()
  .min(1, "Enter your WhatsApp number.")
  .regex(/^\+?[\d\s()-]+$/, "Use digits only, with your country code, e.g. +44 7700 900123.")
  .refine((v) => {
    const digits = v.replace(/\D/g, "").length;
    return digits >= 8 && digits <= 15;
  }, "Enter a full number including your country code.");

const shortText = (label: string, max = 160) =>
  z.string().trim().min(2, required(label)).max(max, `Keep this under ${max} characters.`);

const optionalText = (max: number) =>
  z.string().trim().max(max, `Keep this under ${max} characters.`).optional().or(z.literal(""));

const isoDate = (label: string) =>
  z
    .string()
    .min(1, `Choose ${label}.`)
    .regex(/^\d{4}-\d{2}-\d{2}$/, `Choose ${label}.`)
    .refine((v) => !Number.isNaN(Date.parse(`${v}T00:00:00Z`)), `Choose a valid ${label}.`)
    .refine((v) => v >= earliestAllowedDate(), "Choose a date from today onwards.");

const count = (label: string, max: number) =>
  z
    .string()
    .trim()
    .min(1, `Enter the number of ${label}.`)
    .regex(/^\d{1,3}$/, "Use a whole number.")
    .refine((v) => Number(v) >= 1 && Number(v) <= max, `Enter a number between 1 and ${max}.`);

/** Anti-spam fields present on every form. */
const antiSpam = {
  /** Honeypot: hidden from people, filled in by bots. */
  website: z.string().max(0).optional().or(z.literal("")),
  /** Milliseconds since epoch when the form was first rendered. */
  startedAt: z.number().int().positive().optional(),
  /** Client-generated key so a double submit sends one email. */
  requestId: z.string().max(64).optional(),
};

/**
 * Yesterday in UTC, so a traveller ahead of UTC (Sri Lanka is +05:30) can still choose "today".
 * Overridable in tests.
 */
export function earliestAllowedDate(now: Date = new Date()): string {
  const d = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  return d.toISOString().slice(0, 10);
}

export const airportTransferSchema = z.object({
  fullName,
  whatsapp: whatsappNumber,
  transferType: z.enum(["pickup", "dropoff"], { error: "Choose pickup or drop-off." }),
  pickupLocation: shortText("a pickup location"),
  dropoffLocation: shortText("a drop-off location"),
  travelDate: isoDate("a travel date"),
  pickupTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Choose a pickup time."),
  passengers: count("passengers", 60),
  flightNumber: optionalText(20),
  additionalRequirements: optionalText(1500),
  ...antiSpam,
});

export const vehicleCategories = ["car", "van", "motorcycle", "tuk-tuk"] as const;
export const driverPreferences = ["with-driver", "self-drive", "no-preference"] as const;

export const vehicleRentalSchema = z
  .object({
    fullName,
    whatsapp: whatsappNumber,
    vehicleCategory: z.enum(vehicleCategories, { error: "Choose a vehicle category." }),
    startDate: isoDate("a start date"),
    endDate: isoDate("an end date"),
    pickupLocation: shortText("a pickup location"),
    driverPreference: z.enum(driverPreferences).optional().or(z.literal("")),
    additionalRequirements: optionalText(1500),
    ...antiSpam,
  })
  .refine((d) => d.endDate >= d.startDate, { path: ["endDate"], message: "Choose an end date on or after the start date." });

export const tourSchema = z
  .object({
    fullName,
    whatsapp: whatsappNumber,
    destinations: z.string().trim().min(2, "Tell us where you would like to go.").max(500, "Keep this under 500 characters."),
    startDate: isoDate("a start date"),
    endDate: z.string().optional().or(z.literal("")),
    duration: optionalText(60),
    travellers: count("travellers", 99),
    pickupLocation: shortText("a pickup location"),
    additionalRequirements: optionalText(1500),
    ...antiSpam,
  })
  .refine((d) => Boolean(d.endDate) || Boolean(d.duration?.trim()), {
    path: ["duration"],
    message: "Add an end date or an approximate trip length.",
  })
  .refine((d) => !d.endDate || (/^\d{4}-\d{2}-\d{2}$/.test(d.endDate) && d.endDate >= d.startDate), {
    path: ["endDate"],
    message: "Choose an end date on or after the start date.",
  });

export const contactTopics = [
  "Airport transfers",
  "Vehicle rentals",
  "Tours & experiences",
  "Hotel booking assistance",
  "House rental assistance",
  "Something else",
] as const;

export const contactSchema = z.object({
  fullName,
  whatsapp: whatsappNumber,
  email: z.union([z.literal(""), z.email("Enter a valid email address, or leave it empty.")]).optional(),
  topic: z.enum(contactTopics, { error: "Choose what your enquiry is about." }),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters).").max(2000, "Keep your message under 2000 characters."),
  ...antiSpam,
});

export const enquirySchemas = {
  "airport-transfer": airportTransferSchema,
  "vehicle-rental": vehicleRentalSchema,
  tour: tourSchema,
  contact: contactSchema,
} as const;

export type EnquiryType = keyof typeof enquirySchemas;
export type AirportTransferInput = z.input<typeof airportTransferSchema>;
export type VehicleRentalInput = z.input<typeof vehicleRentalSchema>;
export type TourInput = z.input<typeof tourSchema>;
export type ContactInput = z.input<typeof contactSchema>;

export function isEnquiryType(v: string): v is EnquiryType {
  return Object.prototype.hasOwnProperty.call(enquirySchemas, v);
}

export const enquiryLabels: Record<EnquiryType, string> = {
  "airport-transfer": "Airport transfer enquiry",
  "vehicle-rental": "Vehicle rental enquiry",
  tour: "Tour enquiry",
  contact: "General enquiry",
};

/** Human-readable field labels for the notification email, in display order. */
export const fieldLabels: Record<EnquiryType, [string, string][]> = {
  "airport-transfer": [
    ["fullName", "Full name"], ["whatsapp", "WhatsApp number"], ["transferType", "Transfer type"],
    ["pickupLocation", "Pickup location"], ["dropoffLocation", "Drop-off location"], ["travelDate", "Travel date"],
    ["pickupTime", "Pickup time"], ["passengers", "Passengers"], ["flightNumber", "Flight number"],
    ["additionalRequirements", "Additional requirements"],
  ],
  "vehicle-rental": [
    ["fullName", "Full name"], ["whatsapp", "WhatsApp number"], ["vehicleCategory", "Vehicle category"],
    ["startDate", "Rental start date"], ["endDate", "Rental end date"], ["pickupLocation", "Pickup location"],
    ["driverPreference", "Driver preference"], ["additionalRequirements", "Additional requirements"],
  ],
  tour: [
    ["fullName", "Full name"], ["whatsapp", "WhatsApp number"], ["destinations", "Preferred destinations"],
    ["startDate", "Travel start date"], ["endDate", "Travel end date"], ["duration", "Trip length"],
    ["travellers", "Travellers"], ["pickupLocation", "Pickup location"], ["additionalRequirements", "Additional requirements"],
  ],
  contact: [
    ["fullName", "Full name"], ["whatsapp", "WhatsApp number"], ["email", "Email"], ["topic", "Topic"], ["message", "Message"],
  ],
};

export const valueLabels: Record<string, Record<string, string>> = {
  transferType: { pickup: "Airport pickup", dropoff: "Airport drop-off" },
  vehicleCategory: { car: "Car", van: "Van", motorcycle: "Motorcycle", "tuk-tuk": "Tuk-tuk" },
  driverPreference: { "with-driver": "With a driver", "self-drive": "Self-drive", "no-preference": "No preference yet" },
};
