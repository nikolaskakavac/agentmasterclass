import Image from "next/image";
import Link from "next/link";
import { Faq } from "@/components/faq";
import { Testimonials } from "@/components/testimonials";
import { ButtonLink, Container, IconMark, Section, SectionHeading } from "@/components/ui";
import { programs, siteConfig } from "@/data/site";

const reasons = [
  { number: "01", title: "Predaje neko ko i dalje radi ovaj posao", text: "Marija vodi agenciju za nekretnine i aktivno radi sa klijentima. Svi primeri na času su situacije koje su se stvarno desile." },
  { number: "02", title: "Uči se izvođenjem, ne slušanjem", text: "Oko polovine svakog termina je vežba i simulacija. Svaka tehnika se proba odmah, u sali." },
  { number: "03", title: "Mala grupa", text: "Rad u manjoj grupi daje svakom polazniku prostor da odigra scenarije i dobije usmerenje." },
] as const;

const schedule = [
  ["Blok 1", "70 min", "Tema dana + vežba"], ["Blok 2", "70 min", "Nastavak + vežba"], ["Pauza", "30 min", "Kafa i razmena iskustava"], ["Blok 3", "70 min", "Prodajni deo + vežba i simulacija cele faze posla"],
] as const;

const faq = [
  { question: "Koji program je za mene?", answer: "Ako još nisi radio kao agent, izaberi program za početnike. Ako već radiš i problem ti je u razgovoru sa klijentom, izaberi program prodajnih veština." },
  { question: "Da li dobijam licencu?", answer: "Ne. Agent Masterclass je privatna obuka i ne izdaje licencu ni uverenje o položenom stručnom ispitu. Program za početnike te uvodi u oblasti ispita i daje ti gradivo i plan učenja, ali sam ispit polažeš pred nadležnim ministarstvom." },
  { question: "Koliko traje kurs?", answer: "4 dana predavanja tokom jednog meseca. Svaki termin ima 3 bloka po 70 minuta, uz 30 minuta pauze." },
  { question: "Da li se sve radi uživo?", answer: "Da. Nema snimaka. Program se zasniva na simulacijama koje se izvode u sali." },
  { question: "Koliko ljudi je u grupi?", answer: "Grupa je ograničena kako bi svaki polaznik stigao da odigra scenarije." },
] as const;

export default function Home() {
  return <main>
    <section id="hero" className="hero">
      <Container className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">AGENT MASTERCLASS</p>
          <h1>Škola za agente za nekretnine</h1>
          <p className="hero-mobile-text">Obuka uživo u {siteConfig.cityLocative}. Predaje Marija Miškinović, vlasnica agencije za nekretnine.</p>
          <p className="hero-desktop-text">Dva programa uživo u {siteConfig.cityLocative}. Jedan za one koji tek ulaze u posao, drugi za agente koji već rade, ali ne zatvaraju dovoljno. Predaje Marija Miškinović, vlasnica agencije za nekretnine i aktivni profesionalac sa terena.</p>
          <div className="hero-actions">
            <ButtonLink href="#pocetnici">Tek ulazim u posao <span aria-hidden="true">→</span></ButtonLink>
            <ButtonLink href="#agenti" variant="outline">Već radim kao agent <span aria-hidden="true">→</span></ButtonLink>
          </div>
        </div>
        <figure className="portrait-frame hero-portrait">
          <Image className="stock-image" src="/images/professional-workshop.jpg" alt="Profesionalna edukacija u učionici" width={1800} height={1200} priority sizes="(min-width: 1024px) 40vw, 100vw" />
        </figure>
      </Container>
    </section>

    <Section id="programi" className="programs-section">
      <Container>
        <SectionHeading eyebrow="IZABERI SVOJ PROGRAM" title="Dva programa. Jedan sledeći korak." />
        <div className="program-grid">
          {programs.map((program) => <article id={program.id} key={program.id} className={`program-card program-${program.variant}`}>
            <p className="eyebrow">{program.eyebrow}</p><h3>{program.title}</h3><p>{program.description}</p>
            <p className="program-meta">{siteConfig.programDuration} · 3 bloka po 70 minuta · 30 minuta pauze · {program.price}</p>
            <ButtonLink href={program.href} variant={program.variant === "dark" ? "primary" : "secondary"}>Pogledaj program <span aria-hidden="true">→</span></ButtonLink>
          </article>)}
        </div>
        <div className="choice-help"><p><strong>Nisi siguran koji je za tebe?</strong> Ako još nisi radio kao agent, izaberi prvi program. Ako radiš duže od pola godine i problem ti je u razgovoru sa klijentom, izaberi drugi.</p></div>
      </Container>
    </Section>

    <Testimonials />

    <Section className="reasons-section">
      <Container><SectionHeading eyebrow="ZAŠTO AGENT MASTERCLASS" title="Škola zasnovana na poslu, ne na teoriji." />
        <div className="reasons-grid">{reasons.map((reason) => <article key={reason.number} className="reason-card"><IconMark>{reason.number}</IconMark><h3>{reason.title}</h3><p>{reason.text}</p></article>)}</div>
      </Container>
    </Section>

    <Section className="schedule-section">
      <Container className="schedule-grid"><div><SectionHeading eyebrow="JEDAN DAN U SALI" title="Kako izgleda jedan termin" /><div className="timeline">{schedule.map(([block, time, description]) => <div className="timeline-row" key={block}><span className="timeline-dot" /><p><strong>{block}</strong><small>{time}</small></p><p>{description}</p></div>)}</div></div>
        <aside className="duration-card"><p className="duration-number">3<small> bloka</small></p><h3>po 70 minuta</h3><p>Uz 30 minuta pauze.</p></aside>
      </Container>
    </Section>

    <Section className="teacher-section">
      <Container className="teacher-grid"><figure className="portrait-frame teacher-photo"><Image className="stock-image" src="/images/marija-miskinovic.jpeg" alt="Marija Miškinović" width={1600} height={2400} sizes="(min-width: 768px) 40vw, 100vw" /></figure>
        <div className="teacher-copy"><p className="eyebrow">PREDAVAČ</p><h2>Marija Miškinović</h2><p className="teacher-role">Dugogodišnji agent i vlasnica agencije za nekretnine</p><p>Marija vodi agenciju za nekretnine i dalje aktivno radi sa klijentima. Ne predaje iz teorije, već iz posla koji obavlja svakog dana.</p><p>Oba programa su nastala iz onoga što je videla kao najčešći razlog propalih poslova: agent koji zna nekretninu, ali ne zna razgovor.</p><ButtonLink href="/predavac" variant="secondary">Više o Mariji <span aria-hidden="true">→</span></ButtonLink></div>
      </Container>
    </Section>

    <Section className="teams-section"><Container><div className="teams-band"><div><p className="eyebrow">ZA AGENCIJE</p><h2>Šalješ ceo tim?</h2><p>Kada ceo tim prođe istu obuku, prestaje da se dešava da svaki agent vodi razgovor na svoj način. Za grupe od tri i više polaznika dostupan je popust.</p></div><ButtonLink href="/za-agencije">Zatraži ponudu <span aria-hidden="true">→</span></ButtonLink></div></Container></Section>

    <Section className="faq-section"><Container className="faq-grid"><SectionHeading eyebrow="DOBRO JE ZNATI" title="Česta pitanja" /><Faq items={faq} /></Container></Section>

    <Section className="final-section"><Container><div className="final-card"><p className="eyebrow">SLEDEĆA GRUPA</p><h2>Prijave su otvorene</h2><p className="final-availability">Broj mesta po programu je ograničen.</p><ButtonLink href="/prijava">Prijavi se i nastavi na uplatu</ButtonLink><div className="final-resume-action"><span>Već si se prijavio?</span><Link href="/uplata">Nastavi na uplatu</Link></div></div></Container></Section>
  </main>;
}
