import type { Program } from "@prisma/client";
import { siteConfig } from "@/data/site";

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
