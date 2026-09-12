import "server-only";

import Stripe from "stripe";
import type { Program } from "@prisma/client";
import { siteConfig } from "@/data/site";
import { prisma } from "@/lib/prisma";

const stripePriceEnvironment: Record<Exclude<Program, "UNSURE">, "STRIPE_PRICE_POCETNICI" | "STRIPE_PRICE_PRODAJNE_VESTINE"> = {
  BEGINNER: "STRIPE_PRICE_POCETNICI",
  SALES_SKILLS: "STRIPE_PRICE_PRODAJNE_VESTINE",
};

let stripeClient: Stripe | undefined;

export class StripeConfigurationError extends Error {}

export function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) throw new StripeConfigurationError("STRIPE_SECRET_KEY nije podešen.");
  stripeClient ??= new Stripe(secretKey);
  return stripeClient;
}

export function getStripePriceId(program: Program) {
  if (program === "UNSURE") return null;
  const environmentName = stripePriceEnvironment[program];
  const priceId = process.env[environmentName];
  if (!priceId) throw new StripeConfigurationError(`${environmentName} nije podešen.`);
  return priceId;
}

export function isReusableCheckoutSession(session: Stripe.Checkout.Session) {
  return session.status === "open" && session.payment_status === "unpaid" && Boolean(session.url);
}

export type CheckoutSessionState = "not_started" | "resumable" | "processing" | "expired" | "incomplete" | "unavailable";

export async function getCheckoutSessionState(paymentReference: string | null): Promise<CheckoutSessionState> {
  if (!paymentReference) return "not_started";

  try {
    const session = await getStripeClient().checkout.sessions.retrieve(paymentReference, { expand: ["payment_intent"] });
    if (session.payment_status === "paid" || session.payment_status === "no_payment_required") return "processing";
    if (isReusableCheckoutSession(session)) return "resumable";
    if (session.status === "expired") return "expired";

    const paymentIntent = typeof session.payment_intent === "object" ? session.payment_intent : null;
    if (session.status === "complete" && paymentIntent?.status === "processing") return "processing";
    if (session.status === "complete") return "processing";
    return "incomplete";
  } catch (error) {
    if (error instanceof StripeConfigurationError) console.error("Stripe Checkout state configuration error:", error.message);
    else if (error instanceof Stripe.errors.StripeError) console.error("Stripe Checkout state API error:", error.type, error.code);
    else console.error("Checkout session state error:", error);
    return "unavailable";
  }
}

export type ApplicationCheckoutResult =
  | { status: "ready"; checkoutUrl: string; resumed: boolean }
  | { status: "not_found" | "already_paid" | "unsupported_program" | "processing" | "not_configured" | "stripe_error" | "database_error" };

export async function startApplicationCheckout(applicationId: string, origin: string): Promise<ApplicationCheckoutResult> {
  try {
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      select: { id: true, email: true, program: true, paymentStatus: true, paymentReference: true },
    });
    if (!application) return { status: "not_found" };
    if (application.paymentStatus === "PAID") return { status: "already_paid" };

    const priceId = getStripePriceId(application.program);
    if (!priceId) return { status: "unsupported_program" };

    const stripe = getStripeClient();
    if (application.paymentReference) {
      const existingSession = await stripe.checkout.sessions.retrieve(application.paymentReference);
      if (isReusableCheckoutSession(existingSession)) return { status: "ready", checkoutUrl: existingSession.url!, resumed: true };
      if (existingSession.status === "complete" && application.paymentStatus === "PENDING") return { status: "processing" };
    }

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
    if (!session.url) return { status: "stripe_error" };

    try {
      await prisma.application.update({
        where: { id: application.id },
        data: { paymentMethod: "CARD", paymentStatus: "PENDING", paymentReference: session.id },
      });
    } catch (databaseError) {
      await stripe.checkout.sessions.expire(session.id).catch(() => undefined);
      console.error("Checkout database error:", databaseError);
      return { status: "database_error" };
    }

    return { status: "ready", checkoutUrl: session.url, resumed: false };
  } catch (error) {
    if (error instanceof StripeConfigurationError) {
      console.error("Stripe Checkout configuration error:", error.message);
      return { status: "not_configured" };
    }
    if (error instanceof Stripe.errors.StripeError) {
      console.error("Stripe Checkout API error:", error.type, error.code);
      return { status: "stripe_error" };
    }
    console.error("Checkout session error:", error);
    return { status: "database_error" };
  }
}

export const serverProgramPricing: Record<Program, string | null> = {
  BEGINNER: siteConfig.beginnerPrice,
  SALES_SKILLS: siteConfig.salesPrice,
  UNSURE: null,
};

export type CardCheckoutResult =
  | { status: "ready"; checkoutUrl: string }
  | { status: "not_configured" };

export async function createCardCheckout(): Promise<CardCheckoutResult> {
  return { status: "not_configured" };
}

export const bankTransferInstructions = {
  recipient: siteConfig.bankRecipient,
  account: siteConfig.bankAccount,
  paymentPurpose: siteConfig.bankPaymentPurpose,
  referenceInstruction: siteConfig.bankReferenceInstruction,
};
