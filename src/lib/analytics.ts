export type AnalyticsEvent =
  | "generate_lead"
  | "whatsapp_click"
  | "phone_click"
  | "airport_transfer_enquiry"
  | "vehicle_rental_enquiry"
  | "tour_enquiry"
  | "contact_form_submit";

type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

/** Sends a GA4 event when gtag is loaded and consent was given; otherwise does nothing. */
export function track(event: AnalyticsEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", event, params);
}
