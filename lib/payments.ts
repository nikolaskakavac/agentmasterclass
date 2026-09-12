import "server-only";

import Stripe from "stripe";
import type { Program } from "@prisma/client";
import { siteConfig } from "@/data/site";

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
  return session.status === "open" && Boolean(session.url);
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
