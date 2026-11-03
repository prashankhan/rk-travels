import { describe, expect, it } from "vitest";
import { airportTransferSchema, contactSchema, tourSchema, vehicleRentalSchema, earliestAllowedDate } from "@/lib/validations/enquiry";

const future = (days: number) => new Date(Date.now() + days * 864e5).toISOString().slice(0, 10);
const base = { fullName: "Test Traveller", whatsapp: "+44 7700 900123" };

describe("airportTransferSchema", () => {
  const valid = { ...base, transferType: "pickup", pickupLocation: "BIA", dropoffLocation: "Negombo", travelDate: future(5), pickupTime: "09:15", passengers: "2" };
  it("accepts a complete request", () => expect(airportTransferSchema.safeParse(valid).success).toBe(true));
  it("rejects past dates", () => expect(airportTransferSchema.safeParse({ ...valid, travelDate: "2020-01-01" }).success).toBe(false));
  it("rejects a short phone number", () => expect(airportTransferSchema.safeParse({ ...valid, whatsapp: "12345" }).success).toBe(false));
  it("rejects zero passengers", () => expect(airportTransferSchema.safeParse({ ...valid, passengers: "0" }).success).toBe(false));
  it("rejects a filled honeypot", () => expect(airportTransferSchema.safeParse({ ...valid, website: "spam" }).success).toBe(false));
});

describe("vehicleRentalSchema", () => {
  const valid = { ...base, vehicleCategory: "van", startDate: future(3), endDate: future(6), pickupLocation: "Negombo" };
  it("accepts a valid rental", () => expect(vehicleRentalSchema.safeParse(valid).success).toBe(true));
  it("rejects an end date before the start", () => {
    const r = vehicleRentalSchema.safeParse({ ...valid, endDate: future(1) });
    expect(r.success).toBe(false);
    expect(r.error?.issues[0].path).toEqual(["endDate"]);
  });
  it("rejects unknown categories", () => expect(vehicleRentalSchema.safeParse({ ...valid, vehicleCategory: "boat" }).success).toBe(false));
});

describe("tourSchema", () => {
  const valid = { ...base, destinations: "Sigiriya and Ella", startDate: future(10), travellers: "4", pickupLocation: "Airport" };
  it("needs an end date or a trip length", () => {
    expect(tourSchema.safeParse(valid).success).toBe(false);
    expect(tourSchema.safeParse({ ...valid, duration: "7 days" }).success).toBe(true);
    expect(tourSchema.safeParse({ ...valid, endDate: future(17) }).success).toBe(true);
  });
});

describe("contactSchema", () => {
  const valid = { ...base, topic: "Something else", message: "Hello, I have a question about my trip." };
  it("accepts an empty optional email", () => expect(contactSchema.safeParse({ ...valid, email: "" }).success).toBe(true));
  it("rejects an invalid email", () => expect(contactSchema.safeParse({ ...valid, email: "nope" }).success).toBe(false));
});

describe("earliestAllowedDate", () => {
  it("is the previous UTC day", () => expect(earliestAllowedDate(new Date("2026-11-03T02:00:00Z"))).toBe("2026-11-02"));
});
