import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { programOptions } from "@/lib/application";
import { ButtonLink, Container } from "@/components/ui";
import { CheckoutButton } from "@/components/checkout-button";

export const metadata: Metadata = { title: "Prijava je primljena, Agent Masterclass", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ ref?: string | string[] }> }) {
  const params = await searchParams;
  const reference = Array.isArray(params.ref) ? params.ref[0] : params.ref;
  let application: { id: string; program: "BEGINNER" | "SALES_SKILLS" | "UNSURE"; paymentStatus: "NOT_STARTED" | "PENDING" | "PAID" | "FAILED" | "CANCELLED" } | null = null;
  if (reference && /^c[a-z0-9]{20,}$/i.test(reference)) {
    try {
      application = await prisma.application.findUnique({ where: { id: reference }, select: { id: true, program: true, paymentStatus: true } });
    } catch {
      application = null;
    }
  }

  if (!application) return <main className="thank-you-page" id="hero"><Container><div className="thank-you-card"><p className="eyebrow">POTVRDA PRIJAVE</p><h1>Prijava nije potvrđena.</h1><p>Vrati se na formu i proveri da li je prijava uspešno sačuvana.</p><ButtonLink href="/prijava">Nazad na prijavu</ButtonLink></div></Container></main>;

  const selected = programOptions.find((option) => option.value === application?.program);
  const programHref = selected?.slug ? `/${selected.slug}` : "/";

  return <main className="thank-you-page" id="hero"><Container><div className="thank-you-card">
    <p className="eyebrow">AGENT MASTERCLASS</p>
    <h1>Prijava je primljena.</h1>
    <p>Detalji o programu i narednim koracima biće potvrđeni pre početka obuke.</p>
    {application.paymentStatus === "PAID" ? <div className="payment-status payment-status-paid">
      <p className="eyebrow">PLAĆANJE POTVRĐENO</p>
      <h2>Tvoje mesto je rezervisano.</h2>
      <p>Plaćanje je uspešno potvrđeno.</p>
    </div> : <div className={`payment-status ${application.paymentStatus === "PENDING" ? "payment-status-pending" : application.paymentStatus === "FAILED" || application.paymentStatus === "CANCELLED" ? "payment-status-unsuccessful" : "payment-status-ready"}`}>
      <p className="eyebrow">{application.paymentStatus === "FAILED" || application.paymentStatus === "CANCELLED" ? "PLAĆANJE NIJE ZAVRŠENO" : "PLAĆANJE"}</p>
      <h2>{application.paymentStatus === "PENDING" ? "Potvrda plaćanja je u obradi" : "Nastavi na uplatu kada ti odgovara"}</h2>
      <p>{application.paymentStatus === "PENDING" ? "Status će biti potvrđen nakon bezbedne provere Stripe plaćanja." : "Prijava je uspešno sačuvana. Mesto potvrđuješ uplatom."}</p>
      {application.program !== "UNSURE" && application.paymentStatus !== "PENDING" && <div className="payment-methods"><CheckoutButton applicationId={application.id} label="Nastavi na uplatu" /></div>}
    </div>}
    <div className="thank-you-actions"><Link className="button button-primary" href={programHref}>Pogledaj program →</Link></div>
  </div></Container></main>;
}
