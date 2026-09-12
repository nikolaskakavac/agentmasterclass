import type { Metadata } from "next";
import { ButtonLink, Container, Section, SectionHeading } from "@/components/ui";
import { EditorialHero } from "@/components/static-page";

export const metadata: Metadata = { title: "Kontakt, Agent Masterclass" };

export default function ContactPage() {
  return <main><EditorialHero eyebrow="KONTAKT" title="Kontaktiraj Agent Masterclass" />
    <Section><Container className="narrow-content"><SectionHeading eyebrow="PRIJAVA" title="Izaberi program i pošalji prijavu" /><p>Prijavni formular vodi te kroz izbor programa i nekoliko kratkih pitanja.</p><ButtonLink href="/prijava">Prijavi se i nastavi na uplatu</ButtonLink></Container></Section>
  </main>;
}
