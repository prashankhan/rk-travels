import "server-only";
import { enquirySchemas, isEnquiryType } from "@/lib/validations/enquiry";
import { getEmailConfig, sendEnquiryEmail, type EmailConfig, type SendResult } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { siteUrl } from "@/lib/site";
import type { EnquiryType } from "@/lib/validations/enquiry";

export type EnquiryResponse =
  | { ok: true; id: string }
  | {
      ok: false;
      code: "invalid_type" | "bad_request" | "rate_limited" | "too_fast" | "validation" | "email_not_configured" | "send_failed";
      message: string;
      fieldErrors?: Record<string, string>;
    };

type Deps = {
  getConfig?: () => EmailConfig | null;
  send?: (c: EmailConfig, t: EnquiryType, d: Record<string, unknown>, o: { idempotencyKey?: string; siteUrl: string }) => Promise<SendResult>;
  now?: () => number;
};

const MAX_BODY = 20_000;
const MIN_FILL_MS = 2500;

function json(body: EnquiryResponse, status: number, headers: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // non-browser clients; still rate limited and validated
  try {
    return new URL(origin).host === (req.headers.get("x-forwarded-host") ?? req.headers.get("host"));
  } catch {
    return false;
  }
}

export async function handleEnquiry(req: Request, typeParam: string, deps: Deps = {}): Promise<Response> {
  const now = deps.now ?? Date.now;
  if (!isEnquiryType(typeParam)) return json({ ok: false, code: "invalid_type", message: "Unknown enquiry type." }, 404);
  if (!sameOrigin(req)) return json({ ok: false, code: "bad_request", message: "Request not allowed." }, 403);
  if (!(req.headers.get("content-type") ?? "").includes("application/json"))
    return json({ ok: false, code: "bad_request", message: "Send the form as JSON." }, 415);

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
  const limit = rateLimit(`enquiry:${ip}`, 5, 10 * 60 * 1000, now());
  if (!limit.ok)
    return json(
      { ok: false, code: "rate_limited", message: "Too many enquiries from this connection. Please wait a few minutes or message us on WhatsApp." },
      429,
      { "Retry-After": String(limit.retryAfter) },
    );

  const raw = await req.text();
  if (raw.length > MAX_BODY) return json({ ok: false, code: "bad_request", message: "That message is too long." }, 413);
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, code: "bad_request", message: "The form could not be read." }, 400);
  }
  if (!body || typeof body !== "object") return json({ ok: false, code: "bad_request", message: "The form could not be read." }, 400);

  const record = body as Record<string, unknown>;
  if (typeof record.website === "string" && record.website.length > 0)
    return json({ ok: false, code: "bad_request", message: "The form could not be sent." }, 400);
  if (typeof record.startedAt === "number" && now() - record.startedAt < MIN_FILL_MS)
    return json({ ok: false, code: "too_fast", message: "That was quick — please check your details and send again." }, 400);

  const type: EnquiryType = typeParam;
  const parsed = enquirySchemas[type].safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return json({ ok: false, code: "validation", message: "Please check the highlighted fields.", fieldErrors }, 422);
  }

  const config = (deps.getConfig ?? getEmailConfig)();
  if (!config)
    return json(
      { ok: false, code: "email_not_configured", message: "Please message us on WhatsApp with the same details and we will reply there." },
      503,
    );

  const { website: _w, startedAt: _s, requestId, ...data } = parsed.data as Record<string, unknown>;
  void _w;
  void _s;
  const idempotencyKey = typeof requestId === "string" && /^[A-Za-z0-9_-]{8,64}$/.test(requestId) ? `${type}-${requestId}` : undefined;

  try {
    const result = await (deps.send ?? sendEnquiryEmail)(config, type, data, { idempotencyKey, siteUrl: siteUrl() });
    if (!result.ok) throw new Error(result.reason);
    return json({ ok: true, id: result.id }, 200);
  } catch {
    return json(
      { ok: false, code: "send_failed", message: "Your enquiry could not be sent. Please try again, or message us on WhatsApp." },
      502,
    );
  }
}
