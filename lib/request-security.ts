export function validateApiRequest(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.startsWith("application/json")) return "Zahtev mora biti u JSON formatu.";
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 20_000) return "Zahtev je prevelik.";
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return "Nedozvoljen izvor zahteva.";
  return null;
}

const rateLimitGlobal = globalThis as unknown as { apiRateLimits?: Map<string, { count: number; resetAt: number }> };
const apiRateLimits = rateLimitGlobal.apiRateLimits ?? new Map<string, { count: number; resetAt: number }>();
rateLimitGlobal.apiRateLimits = apiRateLimits;

export function isRateLimited(request: Request, scope: string, limit = 5, windowMs = 10 * 60_000) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const address = forwarded || request.headers.get("x-real-ip") || "unknown";
  const key = `${scope}:${address}`;
  const now = Date.now();
  const current = apiRateLimits.get(key);

  if (!current || current.resetAt <= now) {
    apiRateLimits.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  current.count += 1;
  return current.count > limit;
}
