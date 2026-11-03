import { describe, expect, it } from "vitest";
import { getEmailConfig, toRows } from "@/lib/email";

describe("getEmailConfig", () => {
  it("is null until every variable is set", () => {
    expect(getEmailConfig({ RESEND_API_KEY: "k" } as unknown as NodeJS.ProcessEnv)).toBeNull();
    expect(getEmailConfig({ RESEND_API_KEY: "k", ENQUIRY_FROM_EMAIL: "a@b.c", ENQUIRY_TO_EMAIL: "x@y.z, w@y.z" } as unknown as NodeJS.ProcessEnv)?.to).toEqual(["x@y.z", "w@y.z"]);
  });
});

describe("toRows", () => {
  it("labels fields, maps values and skips empty ones", () => {
    const rows = toRows("vehicle-rental", { fullName: "A B", whatsapp: "+44", vehicleCategory: "tuk-tuk", driverPreference: "", startDate: "2026-12-01" });
    expect(rows).toContainEqual({ label: "Vehicle category", value: "Tuk-tuk" });
    expect(rows.find((r) => r.label === "Driver preference")).toBeUndefined();
  });
});
