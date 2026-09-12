import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getStripeClient, getStripePriceId, isReusableCheckoutSession, StripeConfigurationError } from "@/lib/payments";
import { validateApiRequest } from "@/lib/request-security";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: RouteContext) {
  const requestError = validateApiRequest(request);
  if (requestError) return NextResponse.json({ error: requestError }, { status: 400 });

  const { id } = await context.params;
  if (!/^c[a-z0-9]{20,}$/i.test(id)) return NextResponse.json({ error: "Prijava nije pronađena." }, { status: 404 });

  try {
    const application = await prisma.application.findUnique({
      where: { id },
      select: { id: true, email: true, program: true, paymentStatus: true, paymentReference: true },
    });
    if (!application) return NextResponse.json({ error: "Prijava nije pronađena." }, { status: 404 });
    if (application.paymentStatus === "PAID") return NextResponse.json({ error: "Plaćanje je već potvrđeno." }, { status: 409 });

    const priceId = getStripePriceId(application.program);
    if (!priceId) return NextResponse.json({ error: "Za prijavu bez izabranog programa kartično plaćanje nije moguće." }, { status: 409 });

    const stripe = getStripeClient();
    if (application.paymentReference) {
      const existingSession = await stripe.checkout.sessions.retrieve(application.paymentReference);
      if (isReusableCheckoutSession(existingSession)) return NextResponse.json({ checkoutUrl: existingSession.url });
      if (existingSession.status === "complete" && application.paymentStatus === "PENDING") {
        return NextResponse.json({ error: "Potvrda prethodnog plaćanja je u obradi." }, { status: 409 });
      }
    }

    const origin = new URL(request.url).origin;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: application.email,
      client_reference_id: application.id,
      metadata: { applicationId: application.id },
      payment_intent_data: { metadata: { applicationId: application.id } },
      success_url: `${origin}/hvala?ref=${encodeURIComponent(application.id)}&payment=processing`,
      cancel_url: `${origin}/hvala?ref=${encodeURIComponent(application.id)}&payment=cancelled`,
    }, {
      idempotencyKey: `application-checkout-${application.id}-${application.paymentReference ?? "initial"}`,
    });
    if (!session.url) return NextResponse.json({ error: "Stripe nije vratio adresu za plaćanje." }, { status: 502 });

    try {
      await prisma.application.update({
        where: { id: application.id },
        data: { paymentMethod: "CARD", paymentStatus: "PENDING", paymentReference: session.id },
      });
    } catch (databaseError) {
      await stripe.checkout.sessions.expire(session.id).catch(() => undefined);
      throw databaseError;
    }

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) {
    if (error instanceof StripeConfigurationError) {
      console.error("Stripe Checkout configuration error:", error.message);
      return NextResponse.json({ error: "Kartično plaćanje trenutno nije podešeno." }, { status: 503 });
    }
    if (error instanceof Stripe.errors.StripeError) {
      console.error("Stripe Checkout API error:", error.type, error.code);
      return NextResponse.json({ error: "Stripe trenutno nije uspeo da pokrene plaćanje. Pokušaj ponovo." }, { status: 502 });
    }
    console.error("Checkout session error:", error);
    return NextResponse.json({ error: "Plaćanje trenutno nije moguće pokrenuti." }, { status: 503 });
  }
}
