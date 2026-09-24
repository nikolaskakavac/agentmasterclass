import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink, Container, Section, SectionHeading } from "@/components/ui";
import { EditorialHero } from "@/components/static-page";

export const metadata: Metadata = { title: "Marija Miskinović, predavač" };

export default function LecturerPage() {
  return <main><EditorialHero eyebrow="PREDAVAČ" title="Marija Miskinović" intro="Dugogodišnji agent i vlasnica agencije za nekretnine" />
    <Section><Container className="lecturer-intro"><figure className="portrait-frame lecturer-photo"><Image className="stock-image" src="/images/marija-miskinovic.jpeg" alt="Marija Miskinović" width={1600} height={2400} priority sizes="(min-width: 768px) 45vw, 100vw" /></figure><div><SectionHeading eyebrow="O PREDAVAČU" title="Iskustvo sa terena" /><p>Marija vodi agenciju za nekretnine i dalje aktivno radi sa klijentima. Ne predaje iz teorije, već iz posla koji obavlja svakog dana.</p><p>Oba programa su nastala iz onoga što je videla kao najčešći razlog propalih poslova: agent koji zna nekretninu, ali ne zna razgovor.</p></div></Container></Section>
    <Section><Container><div className="dual-cta"><ButtonLink href="/pocetnici">Program za početnike →</ButtonLink><ButtonLink href="/prodajne-vestine" variant="secondary">Program za agente →</ButtonLink></div></Container></Section>
  </main>;
}
