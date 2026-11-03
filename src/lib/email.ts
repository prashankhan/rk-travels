import "server-only";
import { Resend } from "resend";
import { EnquiryNotification } from "@/emails/enquiry-notification";
import { enquiryLabels, fieldLabels, valueLabels, type EnquiryType } from "@/lib/validations/enquiry";

export type EmailConfig = { apiKey: string; from: string; to: string[] };

/** Returns the email configuration, or null when any variable is missing. */
export function getEmailConfig(env: NodeJS.ProcessEnv = process.env): EmailConfig | null {
  const apiKey = env.RESEND_API_KEY?.trim();
  const from = env.ENQUIRY_FROM_EMAIL?.trim();
  const to = env.ENQUIRY_TO_EMAIL?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];
  if (!apiKey || !from || to.length === 0) return null;
  return { apiKey, from, to };
}

export function toRows(type: EnquiryType, data: Record<string, unknown>): { label: string; value: string }[] {
  return fieldLabels[type]
    .map(([key, label]) => {
      const raw = data[key];
      if (raw === undefined || raw === null || String(raw).trim() === "") return null;
      const value = valueLabels[key]?.[String(raw)] ?? String(raw).trim();
      return { label, value };
    })
    .filter((r): r is { label: string; value: string } => r !== null);
}

export type SendResult = { ok: true; id: string } | { ok: false; reason: "provider_error" };

export async function sendEnquiryEmail(
  config: EmailConfig,
  type: EnquiryType,
  data: Record<string, unknown>,
  opts: { idempotencyKey?: string; siteUrl: string },
): Promise<SendResult> {
  const resend = new Resend(config.apiKey);
  const rows = toRows(type, data);
  const name = String(data.fullName ?? "").trim();
  const subject = `${enquiryLabels[type]} — ${name}`.slice(0, 180);
  const { data: result, error } = await resend.emails.send(
    {
      from: config.from,
      to: config.to,
      subject,
      react: EnquiryNotification({ title: enquiryLabels[type], rows, whatsapp: String(data.whatsapp ?? ""), siteUrl: opts.siteUrl }),
      text: [enquiryLabels[type], "", ...rows.map((r) => `${r.label}: ${r.value}`)].join("\n"),
      ...(typeof data.email === "string" && data.email ? { replyTo: data.email } : {}),
      tags: [{ name: "enquiry_type", value: type.replace(/[^a-zA-Z0-9_-]/g, "_") }],
    },
    opts.idempotencyKey ? { idempotencyKey: opts.idempotencyKey } : undefined,
  );
  if (error || !result?.id) return { ok: false, reason: "provider_error" };
  return { ok: true, id: result.id };
}
