import { describe, expect, it } from "vitest";
import { render } from "@react-email/components";
import { EnquiryNotification } from "@/emails/enquiry-notification";

describe("EnquiryNotification", () => {
  it("renders every row and a WhatsApp reply link", async () => {
    const html = await render(
      <EnquiryNotification title="Tour enquiry" whatsapp="+44 7700 900123" siteUrl="https://example.com" rows={[{ label: "Full name", value: "Test <Traveller>" }, { label: "Travellers", value: "4" }]} />,
    );
    expect(html).toContain("Tour enquiry");
    expect(html).toContain("Test &lt;Traveller&gt;");
    expect(html).toContain("https://wa.me/447700900123");
  });
});
