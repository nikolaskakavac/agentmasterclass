import type { Metadata } from "next";
import { ButtonLink, Container, Section, SectionHeading } from "@/components/ui";
import { ContentPlaceholder, EditorialHero, SourceLink } from "@/components/static-page";
import { examContent } from "@/data/static-content";
import { beginnerProgram } from "@/data/program-pages";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = { title: "Stručni ispit za agente za nekretnine — uslovi, prijava, priprema" };

export default function ExamPage() {
  return <main><EditorialHero eyebrow={`POSLEDNJE AŽURIRANJE: ${siteConfig.examLastUpdated}`} title="Stručni ispit za agente za nekretnine" />
    <Section><Container className="narrow-content"><SectionHeading eyebrow="OSNOVNO" title="Ispit i rad u posredovanju" />{beginnerProgram.exam?.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="exam-disclaimer">{beginnerProgram.exam?.disclaimer}</div></Container></Section>
    <Section className="light-section"><Container><div className="exam-topics">{examContent.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{item.title}</h2><ContentPlaceholder>{item.content}</ContentPlaceholder></article>)}</div></Container></Section>
    <Section><Container><SectionHeading eyebrow="ZVANIČNI IZVORI" title="Proveri aktuelne informacije" /><div className="source-grid"><SourceLink href={siteConfig.ministrySourceUrl} label="Ministarstvo trgovine" /><SourceLink href={siteConfig.legalSourceUrl} label="Tekst Zakona" /></div><div className="exam-cta"><p>Kurs te uvodi u oblasti koje ispit pokriva, daje ti gradivo i plan učenja, i pokriva praktični deo posla koji ispit uopšte ne dodiruje.</p><ButtonLink href="/pocetnici">Pogledaj program za početnike →</ButtonLink></div></Container></Section>
  </main>;
}
