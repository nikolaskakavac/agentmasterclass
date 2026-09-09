import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = { title: "Politika privatnosti — Agent Masterclass" };
export default function PrivacyPage() { return <LegalPage title="Politika privatnosti" content={siteConfig.privacyContent} />; }
