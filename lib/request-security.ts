export function validateApiRequest(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.startsWith("application/json")) return "Zahtev mora biti u JSON formatu.";
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 20_000) return "Zahtev je prevelik.";
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return "Nedozvoljen izvor zahteva.";
  return null;
}
