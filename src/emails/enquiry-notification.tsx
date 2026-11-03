import { Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text } from "@react-email/components";

type Row = { label: string; value: string };

export type EnquiryNotificationProps = {
  title: string;
  rows: Row[];
  whatsapp: string;
  siteUrl: string;
};

const navy = "#06274D";
const charcoal = "#263445";
const muted = "#5A6676";
const border = "#E4E7EB";
const yellow = "#FFC107";

/** Internal notification sent to the business inbox for every confirmed enquiry. */
export function EnquiryNotification({ title, rows, whatsapp, siteUrl }: EnquiryNotificationProps) {
  const digits = whatsapp.replace(/\D/g, "");
  const name = rows.find((r) => r.label === "Full name")?.value ?? "a visitor";
  return (
    <Html lang="en">
      <Head />
      <Preview>{`${title} from ${name}`}</Preview>
      <Body style={{ backgroundColor: "#FAFAF7", fontFamily: "Inter, Arial, sans-serif", margin: 0, padding: "24px 0" }}>
        <Container style={{ backgroundColor: "#FFFFFF", border: `1px solid ${border}`, borderRadius: 12, maxWidth: 600, padding: 32 }}>
          <div style={{ width: 40, height: 3, backgroundColor: yellow, marginBottom: 20 }} />
          <Text style={{ color: muted, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", margin: 0, fontWeight: 600 }}>
            R.K Travels website
          </Text>
          <Heading as="h1" style={{ color: navy, fontSize: 24, lineHeight: "32px", margin: "8px 0 24px", fontFamily: "Montserrat, Arial, sans-serif" }}>
            {title}
          </Heading>
          <Section>
            {rows.map((r) => (
              <div key={r.label} style={{ borderTop: `1px solid ${border}`, padding: "12px 0" }}>
                <Text style={{ color: muted, fontSize: 13, lineHeight: "18px", margin: 0 }}>{r.label}</Text>
                <Text style={{ color: charcoal, fontSize: 16, lineHeight: "24px", margin: "2px 0 0", whiteSpace: "pre-wrap" }}>{r.value}</Text>
              </div>
            ))}
          </Section>
          {digits ? (
            <Section style={{ marginTop: 24 }}>
              <Button
                href={`https://wa.me/${digits}`}
                style={{ backgroundColor: yellow, color: navy, borderRadius: 2, padding: "14px 22px", fontWeight: 600, fontSize: 15, fontFamily: "Montserrat, Arial, sans-serif" }}
              >
                Reply on WhatsApp
              </Button>
            </Section>
          ) : null}
          <Hr style={{ borderColor: border, margin: "28px 0 16px" }} />
          <Text style={{ color: muted, fontSize: 13, lineHeight: "18px", margin: 0 }}>
            Sent from the enquiry form on {siteUrl}. Nothing has been confirmed with the customer yet.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

EnquiryNotification.PreviewProps = {
  title: "Airport transfer enquiry",
  whatsapp: "+44 7700 900123",
  siteUrl: "https://www.example.com",
  rows: [
    { label: "Full name", value: "Sample Traveller" },
    { label: "WhatsApp number", value: "+44 7700 900123" },
    { label: "Transfer type", value: "Airport pickup" },
    { label: "Pickup location", value: "Bandaranaike International Airport" },
    { label: "Drop-off location", value: "Negombo" },
  ],
} satisfies EnquiryNotificationProps;

export default EnquiryNotification;
