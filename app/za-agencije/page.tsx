import type { Metadata } from "next";
import { ButtonLink, Container, Section, SectionHeading } from "@/components/ui";
import { EditorialHero } from "@/components/static-page";

export const metadata: Metadata = { title: "Obuka za timove agencija za nekretnine" };

export default function AgenciesPage() {
  return <main><EditorialHero eyebrow="ZA AGENCIJE" title="Šalješ ceo tim?" intro="Kada ceo tim prođe istu obuku, prestaje da se dešava da svaki agent vodi razgovor na svoj način." />
    <Section><Container><SectionHeading eyebrow="ZAJEDNIČKI STANDARD" title="Isti jezik. Iste skripte. Ista struktura razgovora." /><p className="lead-copy">Dobijate zajednički jezik, iste skripte i istu strukturu prvog poziva.</p><div className="agency-benefits"><article><span>01</span><h3>Za nove agente</h3><p>Od prvog poziva do prve provizije.</p><ButtonLink href="/pocetnici" variant="secondary">Pogledaj program →</ButtonLink></article><article><span>02</span><h3>Za agente koji već rade</h3><p>Prodajne veštine za agente za nekretnine</p><ButtonLink href="/prodajne-vestine" variant="secondary">Pogledaj program →</ButtonLink></article></div></Container></Section>
    <Section className="light-section"><Container><div className="team-offer"><div><SectionHeading eyebrow="GRUPNA PONUDA" title="Obuka prilagođena timu" /><p>Za grupe od tri i više polaznika dostupan je popust.</p><ButtonLink href="/prijava">Prijavi tim →</ButtonLink></div></div></Container></Section>
  </main>;
}
