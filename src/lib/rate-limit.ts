/**
 * Small fixed-window limiter kept in memory. On Vercel each serverless instance keeps its own
 * window, so treat this as a first line of defence; swap in a shared store (e.g. Upstash Redis)
 * if abuse becomes a problem. See docs/DEPLOYMENT.md.
 */
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000, now = Date.now()) {
  const b = buckets.get(key);
  if (!b || b.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    if (buckets.size > 5000) for (const [k, v] of buckets) if (v.resetAt <= now) buckets.delete(k);
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }
  if (b.count >= limit) return { ok: false, remaining: 0, retryAfter: Math.ceil((b.resetAt - now) / 1000) };
  b.count += 1;
  return { ok: true, remaining: limit - b.count, retryAfter: 0 };
}

export function resetRateLimits() {
  buckets.clear();
}
