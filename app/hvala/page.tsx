import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { programOptions } from "@/lib/application";
import { ButtonLink, Container } from "@/components/ui";
import { CheckoutButton } from "@/components/checkout-button";
import { getCheckoutSessionState } from "@/lib/payments";

export const metadata: Metadata = { title: "Prijava je primljena, Agent Masterclass", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ ref?: string | string[] }> }) {
  const params = await searchParams;
  const reference = Array.isArray(params.ref) ? params.ref[0] : params.ref;
  let application: { id: string; program: "BEGINNER" | "SALES_SKILLS" | "UNSURE"; paymentStatus: "NOT_STARTED" | "PENDING" | "PAID" | "FAILED" | "CANCELLED"; paymentReference: string | null } | null = null;
  if (reference && /^c[a-z0-9]{20,}$/i.test(reference)) {
    try {
      application = await prisma.application.findUnique({ where: { id: reference }, select: { id: true, program: true, paymentStatus: true, paymentReference: true } });
    } catch {
      application = null;
    }
  }

  if (!application) return <main className="thank-you-page" id="hero"><Container><div className="thank-you-card"><p className="eyebrow">POTVRDA PRIJAVE</p><h1>Prijava nije potvrđena.</h1><p>Vrati se na formu i proveri da li je prijava uspešno sačuvana.</p><ButtonLink href="/prijava">Nazad na prijavu</ButtonLink></div></Container></main>;

  const selected = programOptions.find((option) => option.value === application?.program);
  const programHref = selected?.slug ? `/${selected.slug}` : "/";
  const checkoutState = application.paymentStatus === "PENDING" ? await getCheckoutSessionState(application.paymentReference) : "not_started";
  const paymentIsProcessing = application.paymentStatus === "PENDING" && checkoutState === "processing";
  const paymentCanContinue = application.program !== "UNSURE" && application.paymentStatus !== "PAID" && !paymentIsProcessing;
  const paymentWasOpened = application.paymentStatus === "PENDING" && checkoutState === "resumable";

  return <main className="thank-you-page" id="hero"><Container><div className="thank-you-card">
    <p className="eyebrow">AGENT MASTERCLASS</p>
    <h1>Prijava je primljena.</h1>
    <p>Detalji o programu i narednim koracima biće potvrđeni pre početka obuke.</p>
    {application.paymentStatus === "PAID" ? <div className="payment-status payment-status-paid">
      <p className="eyebrow">PLAĆANJE POTVRĐENO</p>
      <h2>Tvoje mesto je rezervisano.</h2>
      <p>Plaćanje je uspešno potvrđeno.</p>
    </div> : <div className={`payment-status ${paymentIsProcessing ? "payment-status-pending" : application.paymentStatus === "FAILED" || application.paymentStatus === "CANCELLED" ? "payment-status-unsuccessful" : "payment-status-ready"}`}>
      <p className="eyebrow">{application.paymentStatus === "FAILED" || application.paymentStatus === "CANCELLED" ? "PLAĆANJE NIJE ZAVRŠENO" : "PLAĆANJE"}</p>
      <h2>{paymentIsProcessing ? "Potvrda plaćanja je u obradi" : paymentWasOpened ? "Uplata nije završena." : "Nastavi na uplatu kada ti odgovara"}</h2>
      <p>{paymentIsProcessing ? "Status će biti potvrđen nakon bezbedne provere Stripe plaćanja." : paymentWasOpened ? "Možeš da nastaviš tamo gde si stao." : "Prijava je uspešno sačuvana. Mesto potvrđuješ uplatom."}</p>
      {paymentCanContinue && <div className="payment-methods"><CheckoutButton applicationId={application.id} label="Nastavi na uplatu" /></div>}
    </div>}
    <div className="thank-you-actions"><Link className="button button-primary" href={programHref}>Pogledaj program →</Link></div>
  </div></Container></main>;
}
