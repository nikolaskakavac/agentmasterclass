import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createCardCheckout, serverProgramPricing } from "@/lib/payments";
import { validateApiRequest } from "@/lib/request-security";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const requestError = validateApiRequest(request);
  if (requestError) return NextResponse.json({ error: requestError }, { status: 400 });
  const { id } = await context.params;
  if (!/^c[a-z0-9]{20,}$/i.test(id)) return NextResponse.json({ error: "Prijava nije pronađena." }, { status: 404 });

  let method: unknown;
  try {
    method = (await request.json() as { method?: unknown }).method;
  } catch {
    return NextResponse.json({ error: "Zahtev nije moguće pročitati." }, { status: 400 });
  }
  if (method !== "CARD" && method !== "BANK_TRANSFER") return NextResponse.json({ error: "Izaberi način plaćanja." }, { status: 422 });

  try {
    const application = await prisma.application.findUnique({ where: { id }, select: { program: true, paymentStatus: true } });
    if (!application) return NextResponse.json({ error: "Prijava nije pronađena." }, { status: 404 });
    if (application.paymentStatus === "PAID") return NextResponse.json({ error: "Plaćanje je već potvrđeno." }, { status: 409 });

    if (method === "BANK_TRANSFER") {
      await prisma.application.update({ where: { id }, data: { paymentMethod: "BANK_TRANSFER", paymentStatus: "PENDING" } });
      return NextResponse.json({ status: "pending", redirectUrl: `/hvala?ref=${encodeURIComponent(id)}` });
    }

    if (serverProgramPricing[application.program] === null) {
      return NextResponse.json({ error: "Za prijavu bez izabranog programa kartično plaćanje još nije moguće." }, { status: 409 });
    }
    await prisma.application.update({ where: { id }, data: { paymentMethod: "CARD", paymentStatus: "NOT_STARTED" } });
    const checkout = await createCardCheckout();
    if (checkout.status === "not_configured") {
      return NextResponse.json({ status: "not_configured", message: "Kartično plaćanje još nije povezano. Prijava je sačuvana, ali uplata nije izvršena." });
    }
    return NextResponse.json({ status: "ready", checkoutUrl: checkout.checkoutUrl });
  } catch {
    return NextResponse.json({ error: "Način plaćanja trenutno nije moguće sačuvati." }, { status: 503 });
  }
}
