import type { Metadata } from "next";
import { ButtonLink, Container, Section, SectionHeading } from "@/components/ui";
import { EditorialHero } from "@/components/static-page";
import { beginnerProgram } from "@/data/program-pages";

export const metadata: Metadata = { title: "Stručni ispit za agente za nekretnine" };

export default function ExamPage() {
  return <main><EditorialHero eyebrow="STRUČNI ISPIT" title="Stručni ispit za agente za nekretnine" />
    <Section><Container className="narrow-content"><SectionHeading eyebrow="OSNOVNO" title="Ispit i rad u posredovanju" />{beginnerProgram.exam?.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="exam-disclaimer">{beginnerProgram.exam?.disclaimer}</div></Container></Section>
    <Section><Container><div className="exam-cta"><p>Kurs te uvodi u oblasti koje ispit pokriva, daje ti gradivo i plan učenja, i pokriva praktični deo posla koji ispit uopšte ne dodiruje.</p><ButtonLink href="/pocetnici">Pogledaj program za početnike →</ButtonLink></div></Container></Section>
  </main>;
}
