import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getStripeClient, getStripePriceId, StripeConfigurationError } from "@/lib/payments";

export const runtime = "nodejs";

const handledEvents = new Set<Stripe.Event.Type>([
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
  "checkout.session.async_payment_failed",
  "checkout.session.expired",
]);

function applicationIdentityFromSession(session: Stripe.Checkout.Session) {
  const metadataId = session.metadata?.applicationId;
  const referenceId = session.client_reference_id;
  if (metadataId && referenceId && metadataId !== referenceId) return { consistent: false, id: null };
  return { consistent: true, id: metadataId || referenceId || null };
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Nedostaje Stripe potpis." }, { status: 400 });

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("Stripe webhook configuration error: STRIPE_WEBHOOK_SECRET nije podešen.");
    return NextResponse.json({ error: "Webhook trenutno nije podešen." }, { status: 503 });
  }

  const rawBody = await request.text();
  let stripe: Stripe;
  try {
    stripe = getStripeClient();
  } catch (error) {
    console.error("Stripe webhook configuration error:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Webhook trenutno nije podešen." }, { status: 503 });
  }
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Nevažeći potpis.";
    console.warn("Stripe webhook signature verification failed:", message);
    return NextResponse.json({ error: "Nevažeći Stripe potpis." }, { status: 400 });
  }

  if (!handledEvents.has(event.type)) return NextResponse.json({ received: true });

  try {
    const eventSession = event.data.object as Stripe.Checkout.Session;
    const session = await stripe.checkout.sessions.retrieve(eventSession.id, { expand: ["line_items.data.price"] });
    const identity = applicationIdentityFromSession(session);
    if (!identity.consistent) {
      console.warn("Stripe webhook ignored: inconsistent Application ID.", event.id, session.id);
      return NextResponse.json({ received: true });
    }

    const application = await prisma.application.findUnique({
      where: { paymentReference: session.id },
      select: { id: true, program: true, paymentReference: true, paymentStatus: true },
    });
    if (!application || (identity.id && identity.id !== application.id)) {
      console.warn("Stripe webhook ignored: Application and Checkout Session do not match.", event.id, session.id);
      return NextResponse.json({ received: true });
    }

    if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
      if (session.mode !== "payment" || session.payment_status !== "paid") {
        return NextResponse.json({ received: true });
      }

      const expectedPriceId = getStripePriceId(application.program);
      const lineItem = session.line_items?.data[0];
      const sessionPriceId = typeof lineItem?.price === "string" ? lineItem.price : lineItem?.price?.id;
      if (!expectedPriceId || session.line_items?.data.length !== 1 || lineItem?.quantity !== 1 || sessionPriceId !== expectedPriceId) {
        console.warn("Stripe webhook ignored: Checkout line item does not match the Application program.", event.id, session.id);
        return NextResponse.json({ received: true });
      }

      await prisma.application.updateMany({
        where: { id: application.id, paymentReference: session.id, paymentStatus: { not: "PAID" } },
        data: { paymentMethod: "CARD", paymentStatus: "PAID" },
      });
      return NextResponse.json({ received: true });
    }

    const nextStatus = event.type === "checkout.session.expired" ? "CANCELLED" : "FAILED";
    await prisma.application.updateMany({
      where: { id: application.id, paymentReference: session.id, paymentStatus: { not: "PAID" } },
      data: { paymentMethod: "CARD", paymentStatus: nextStatus },
    });
    return NextResponse.json({ received: true });
  } catch (error) {
    if (error instanceof StripeConfigurationError) console.error("Stripe webhook configuration error:", error.message);
    else if (error instanceof Stripe.errors.StripeError) console.error("Stripe webhook API error:", event.id, error.type, error.code);
    else console.error("Stripe webhook processing error:", event.id, error);
    return NextResponse.json({ error: "Webhook trenutno nije moguće obraditi." }, { status: 500 });
  }
}
