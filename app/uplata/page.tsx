import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { ResumePaymentForm } from "@/components/resume-payment-form";

export const metadata: Metadata = { title: "Nastavi na uplatu, Agent Masterclass", robots: { index: false, follow: false } };

export default function PaymentResumePage() {
  return <main className="application-page resume-payment-page" id="hero"><Container><ResumePaymentForm /></Container></main>;
}
