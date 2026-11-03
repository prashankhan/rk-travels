import { describe, expect, it } from "vitest";
import { telLink, whatsappLink, whatsappMessages } from "@/lib/whatsapp";

describe("whatsappLink", () => {
  it("uses the business number in wa.me format", () => {
    expect(whatsappLink()).toBe("https://wa.me/94743638418");
  });
  it("URL-encodes prefilled messages", () => {
    expect(whatsappLink("Hello R.K Travels & co?")).toBe("https://wa.me/94743638418?text=Hello%20R.K%20Travels%20%26%20co%3F");
  });
  it("has a message for every service", () => {
    for (const m of Object.values(whatsappMessages)) expect(whatsappLink(m)).toMatch(/^https:\/\/wa\.me\/94743638418\?text=Hello/);
  });
  it("builds a tel link", () => {
    expect(telLink()).toBe("tel:+94743638418");
  });
});
