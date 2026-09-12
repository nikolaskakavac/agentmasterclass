import { NextResponse } from "next/server";
import { normalizeEmail, normalizePhoneForMatch } from "@/lib/application";
import { startApplicationCheckout } from "@/lib/payments";
import { prisma } from "@/lib/prisma";
import { isRateLimited, validateApiRequest } from "@/lib/request-security";

const genericMessage = "Nismo uspeli da pronađemo prijavu sa unetim podacima. Proveri podatke ili pošalji novu prijavu.";

export async function POST(request: Request) {
  const requestError = validateApiRequest(request);
  if (requestError) return NextResponse.json({ error: requestError }, { status: 400 });
  if (isRateLimited(request, "payment-resume")) {
    return NextResponse.json({ error: "Previše pokušaja. Pokušaj ponovo malo kasnije." }, { status: 429 });
  }

  let payload: { email?: unknown; phone?: unknown };
  try {
    payload = await request.json() as { email?: unknown; phone?: unknown };
  } catch {
    return NextResponse.json({ error: genericMessage }, { status: 400 });
  }

  const email = normalizeEmail(payload.email);
  const phone = normalizePhoneForMatch(payload.phone);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || phone.length < 6 || phone.length > 18) {
    return NextResponse.json({ status: "not_found", message: genericMessage });
  }

  try {
    const candidates = await prisma.application.findMany({
      where: { email },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: { id: true, phone: true, program: true, paymentStatus: true },
    });
    const application = candidates.find((candidate) => normalizePhoneForMatch(candidate.phone) === phone);
    if (!application || application.program === "UNSURE") {
      return NextResponse.json({ status: "not_found", message: genericMessage });
    }
    if (application.paymentStatus === "PAID") return NextResponse.json({ status: "paid", message: "Uplata je već evidentirana." });
    if (application.paymentStatus === "PENDING") return NextResponse.json({ status: "pending", message: "Uplata se obrađuje." });

    const checkout = await startApplicationCheckout(application.id, new URL(request.url).origin);
    if (checkout.status === "ready") return NextResponse.json({ status: "checkout", checkoutUrl: checkout.checkoutUrl });
    if (checkout.status === "already_paid") return NextResponse.json({ status: "paid", message: "Uplata je već evidentirana." });
    if (checkout.status === "processing") return NextResponse.json({ status: "pending", message: "Uplata se obrađuje." });
    if (checkout.status === "not_found" || checkout.status === "unsupported_program") {
      return NextResponse.json({ status: "not_found", message: genericMessage });
    }
    return NextResponse.json({ error: "Nastavak plaćanja trenutno nije dostupan. Pokušaj ponovo malo kasnije." }, { status: 503 });
  } catch (error) {
    console.error("Payment resume error:", error);
    return NextResponse.json({ error: "Nastavak plaćanja trenutno nije dostupan. Pokušaj ponovo malo kasnije." }, { status: 503 });
  }
}
