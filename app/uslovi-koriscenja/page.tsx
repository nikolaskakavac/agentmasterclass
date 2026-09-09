import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = { title: "Uslovi korišćenja — Agent Masterclass" };
export default function TermsPage() { return <LegalPage title="Uslovi korišćenja" content={siteConfig.termsContent} />; }
