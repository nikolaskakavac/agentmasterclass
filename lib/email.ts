export type TransactionalEmailKind = "APPLICATION_RECEIVED" | "BANK_TRANSFER_INSTRUCTIONS" | "CARD_PAYMENT_CONFIRMED";

export async function sendTransactionalEmail(kind: TransactionalEmailKind, applicationId: string) {
  void kind;
  void applicationId;
  return { status: "not_configured" as const };
}
