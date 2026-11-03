import { site } from "./site";

/** Properly encoded wa.me link for the business number. */
export function whatsappLink(message?: string, number: string = site.phone.whatsapp): string {
  const base = `https://wa.me/${number.replace(/\D/g, "")}`;
  const text = message?.trim();
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function telLink(phone: string = site.phone.e164): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

/** Service-specific prefilled messages. */
export const whatsappMessages = {
  general: "Hello R.K Travels, I would like to plan a journey in Sri Lanka.",
  airport: "Hello R.K Travels, I would like to arrange an airport transfer.",
  rental: "Hello R.K Travels, I would like to ask about renting a vehicle.",
  tour: "Hello R.K Travels, I would like help planning a tour.",
  contact: "Hello R.K Travels, I have a question.",
} as const;
