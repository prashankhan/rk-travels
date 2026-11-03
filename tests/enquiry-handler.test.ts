import { beforeEach, describe, expect, it, vi } from "vitest";
import { handleEnquiry } from "@/lib/enquiry-handler";
import { resetRateLimits } from "@/lib/rate-limit";

const future = (d: number) => new Date(Date.now() + d * 864e5).toISOString().slice(0, 10);
const body = {
  fullName: "Test Traveller", whatsapp: "+44 7700 900123", transferType: "pickup", pickupLocation: "BIA",
  dropoffLocation: "Negombo", travelDate: future(4), pickupTime: "10:00", passengers: "2", website: "",
  startedAt: Date.now() - 10_000, requestId: "abc12345def",
};
const config = { apiKey: "re_test", from: "R.K Travels <test@example.com>", to: ["inbox@example.com"] };
const req = (b: unknown, headers: Record<string, string> = {}) =>
  new Request("http://localhost/api/enquiry/airport-transfer", { method: "POST", headers: { "content-type": "application/json", host: "localhost", "x-forwarded-for": "1.2.3.4", ...headers }, body: JSON.stringify(b) });

describe("handleEnquiry", () => {
  beforeEach(() => resetRateLimits());

  it("reports success only when the provider accepts", async () => {
    const send = vi.fn().mockResolvedValue({ ok: true, id: "email_123" });
    const res = await handleEnquiry(req(body), "airport-transfer", { getConfig: () => config, send });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, id: "email_123" });
    expect(send).toHaveBeenCalledOnce();
    const [, type, data, opts] = send.mock.calls[0];
    expect(type).toBe("airport-transfer");
    expect(data).not.toHaveProperty("website");
    expect(opts.idempotencyKey).toBe("airport-transfer-abc12345def");
  });

  it("returns 502 when the provider fails", async () => {
    const res = await handleEnquiry(req(body), "airport-transfer", { getConfig: () => config, send: vi.fn().mockResolvedValue({ ok: false, reason: "provider_error" }) });
    expect(res.status).toBe(502);
    expect((await res.json()).ok).toBe(false);
  });

  it("returns 503 when email is not configured, without sending", async () => {
    const send = vi.fn();
    const res = await handleEnquiry(req(body), "airport-transfer", { getConfig: () => null, send });
    expect(res.status).toBe(503);
    expect((await res.json()).code).toBe("email_not_configured");
    expect(send).not.toHaveBeenCalled();
  });

  it("returns field errors for invalid input", async () => {
    const res = await handleEnquiry(req({ ...body, whatsapp: "x" }), "airport-transfer", { getConfig: () => config, send: vi.fn() });
    expect(res.status).toBe(422);
    expect((await res.json()).fieldErrors.whatsapp).toBeTruthy();
  });

  it("rejects the honeypot and too-fast submissions", async () => {
    const send = vi.fn();
    expect((await handleEnquiry(req({ ...body, website: "http://spam" }), "airport-transfer", { getConfig: () => config, send })).status).toBe(400);
    expect((await handleEnquiry(req({ ...body, startedAt: Date.now() }), "airport-transfer", { getConfig: () => config, send })).status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it("rejects cross-origin posts and unknown types", async () => {
    expect((await handleEnquiry(req(body, { origin: "https://evil.example" }), "airport-transfer", { getConfig: () => config })).status).toBe(403);
    expect((await handleEnquiry(req(body), "nope", { getConfig: () => config })).status).toBe(404);
  });

  it("rate limits repeated submissions", async () => {
    const send = vi.fn().mockResolvedValue({ ok: true, id: "x" });
    const codes = [];
    for (let i = 0; i < 6; i++) codes.push((await handleEnquiry(req(body), "airport-transfer", { getConfig: () => config, send })).status);
    expect(codes.slice(0, 5).every((c) => c === 200)).toBe(true);
    expect(codes[5]).toBe(429);
  });
});
