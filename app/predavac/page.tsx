import type { Metadata } from "next";
import { ButtonLink, Container, Section, SectionHeading } from "@/components/ui";
import { ContentPlaceholder, EditorialHero } from "@/components/static-page";
import { lecturerContent } from "@/data/static-content";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = { title: "Marija Miškinović — predavač" };

export default function LecturerPage() {
  return <main><EditorialHero eyebrow="PREDAVAČ" title="Marija Miškinović" intro={`Vlasnica agencije ${siteConfig.agencyName} · ${siteConfig.yearsExperience} godina u prodaji nekretnina`} />
    <Section><Container className="lecturer-intro"><figure className="portrait-frame lecturer-photo" aria-label="Mesto za buduću profesionalnu fotografiju Marije Miškinović"><div className="portrait-field" aria-hidden="true"><span>M·M</span></div><figcaption>Fotografija Marije Miškinović biće dodata</figcaption></figure><div><SectionHeading eyebrow="O PREDAVAČU" title="Iskustvo sa terena" /><p>Marija vodi agenciju {siteConfig.agencyName} i i dalje aktivno radi sa klijentima — ne predaje iz teorije nego iz posla koji obavlja svakog dana.</p><p>Oba programa su nastala iz onoga što je videla kao najčešći razlog propalih poslova: agent koji zna nekretninu, ali ne zna razgovor.</p><dl className="credentials"><div><dt>Agencija osnovana</dt><dd>{siteConfig.agencyFoundedYear}</dd></div><div><dt>Transakcije</dt><dd>{siteConfig.transactionCount}</dd></div><div><dt>Obuka agenata</dt><dd>{siteConfig.agentTrainingExperience}</dd></div><div><dt>Obrazovanje i sertifikati</dt><dd>{siteConfig.educationAndCertificates}</dd></div></dl></div></Container></Section>
    <Section className="light-section"><Container><SectionHeading eyebrow="BIOGRAFIJA" title="Profesionalni put" /><div className="biography-grid">{lecturerContent.biography.map((paragraph) => <ContentPlaceholder key={paragraph}>{paragraph}</ContentPlaceholder>)}</div></Container></Section>
    <Section><Container><blockquote className="philosophy-quote">{siteConfig.salesPhilosophy}</blockquote><div className="dual-cta"><ButtonLink href="/pocetnici">Program za početnike →</ButtonLink><ButtonLink href="/prodajne-vestine" variant="secondary">Program za agente →</ButtonLink></div></Container></Section>
  </main>;
}
