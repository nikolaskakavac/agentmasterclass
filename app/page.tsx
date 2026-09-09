import Link from "next/link";
import { Faq } from "@/components/faq";
import { Testimonials } from "@/components/testimonials";
import { ButtonLink, Container, IconMark, Section, SectionHeading } from "@/components/ui";
import { programs, siteConfig } from "@/data/site";

const reasons = [
  { number: "01", title: "Predaje neko ko i dalje radi ovaj posao", text: "Marija vodi agenciju za nekretnine i aktivno radi sa klijentima. Svi primeri na času su situacije koje su se stvarno desile." },
  { number: "02", title: "Uči se izvođenjem, ne slušanjem", text: "Oko polovine svakog termina je vežba i simulacija. Svaka tehnika se proba odmah, u sali." },
  { number: "03", title: "Mala grupa", text: `Najviše ${siteConfig.groupSize} polaznika, da bi svako stigao da odigra scenarije i bude ispraćen pojedinačno.` },
] as const;

const schedule = [
  ["Blok 1", "60 min", "Tema dana + vežba"], ["Blok 2", "60 min", "Nastavak + vežba"], ["Pauza", "30 min", "Kafa i razmena iskustava"], ["Blok 3", "60 min", "Prodajni deo + vežba"], ["Blok 4", "60 min", "Simulacija cele faze posla"],
] as const;

const faq = [
  { question: "Koji program je za mene?", answer: "Ako još nisi radio kao agent — program za početnike. Ako već radiš i problem ti je u razgovoru sa klijentom — program prodajnih veština." },
  { question: "Da li dobijam licencu?", answer: "Ne. Uverenje o položenom stručnom ispitu izdaje Ministarstvo trgovine. Program za početnike te uvodi u oblasti ispita i daje ti gradivo i plan učenja, ali sam ispit polažeš pred Ministarstvom." },
  { question: "Koliko traje kurs?", answer: "Četiri subote, po četiri sata aktivne nastave, jednom nedeljno. Završava se za mesec dana." },
  { question: "Da li se sve radi uživo?", answer: "Da. Nema snimaka — program se zasniva na simulacijama koje se izvode u sali." },
  { question: "Koliko ljudi je u grupi?", answer: `Najviše ${siteConfig.groupSize}, da bi svako stigao da odigra scenarije.` },
] as const;

export default function Home() {
  return <main>
    <section id="hero" className="hero">
      <Container className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">AGENT MASTERCLASS</p>
          <h1>Škola za agente za nekretnine</h1>
          <p className="hero-mobile-text">Obuka uživo u {siteConfig.city}. Predaje Marija Miškinović, vlasnica agencije za nekretnine.</p>
          <p className="hero-desktop-text">Dva programa uživo u {siteConfig.city}. Jedan za one koji tek ulaze u posao, drugi za agente koji već rade ali ne zatvaraju dovoljno. Predaje Marija Miškinović, vlasnica agencije za nekretnine sa {siteConfig.yearsExperience} godina iskustva na terenu.</p>
          <div className="hero-actions">
            <ButtonLink href="#pocetnici">Tek ulazim u posao <span aria-hidden="true">→</span></ButtonLink>
            <ButtonLink href="#agenti" variant="outline">Već radim kao agent <span aria-hidden="true">→</span></ButtonLink>
          </div>
        </div>
        <figure className="portrait-frame hero-portrait" aria-label="Mesto za buduću fotografiju Marije Miškinović u realnom radnom okruženju">
          <div className="portrait-field" aria-hidden="true"><span>M·M</span></div>
          <figcaption>Fotografija Marije Miškinović biće dodata</figcaption>
        </figure>
      </Container>
    </section>

    <Section id="programi" className="programs-section">
      <Container>
        <SectionHeading eyebrow="IZABERI SVOJ PROGRAM" title="Dva programa. Jedan sledeći korak." />
        <div className="program-grid">
          {programs.map((program) => <article id={program.id} key={program.id} className={`program-card program-${program.variant}`}>
            <p className="eyebrow">{program.eyebrow}</p><h3>{program.title}</h3><p>{program.description}</p>
            <p className="program-meta">4 subote · 4 sata po terminu · {program.price} RSD</p>
            <ButtonLink href={program.href} variant={program.variant === "dark" ? "primary" : "secondary"}>Pogledaj program <span aria-hidden="true">→</span></ButtonLink>
          </article>)}
        </div>
        <div className="choice-help"><p><strong>Nisi siguran koji je za tebe?</strong> Ako još nisi radio kao agent — prvi. Ako radiš duže od pola godine i problem ti je u razgovoru sa klijentom — drugi.</p><Link href="/kontakt">Pitaj nas <span aria-hidden="true">→</span></Link></div>
      </Container>
    </Section>

    <Section className="reasons-section">
      <Container><SectionHeading eyebrow="ZAŠTO AGENT MASTERCLASS" title="Škola zasnovana na poslu, ne na teoriji." />
        <div className="reasons-grid">{reasons.map((reason) => <article key={reason.number} className="reason-card"><IconMark>{reason.number}</IconMark><h3>{reason.title}</h3><p>{reason.text}</p></article>)}</div>
      </Container>
    </Section>

    <Section className="schedule-section">
      <Container className="schedule-grid"><div><SectionHeading eyebrow="JEDAN DAN U SALI" title="Kako izgleda jedan termin" /><div className="timeline">{schedule.map(([block, time, description]) => <div className="timeline-row" key={block}><span className="timeline-dot" /><p><strong>{block}</strong><small>{time}</small></p><p>{description}</p></div>)}</div></div>
        <aside className="duration-card"><p className="duration-number">4<small> sata</small></p><h3>aktivne nastave</h3><p>Pauza ne ulazi u to vreme — ukupno u sali 4 sata i 30 minuta.</p></aside>
      </Container>
    </Section>

    <Section className="teacher-section">
      <Container className="teacher-grid"><figure className="portrait-frame teacher-photo" aria-label="Mesto za buduću profesionalnu fotografiju Marije Miškinović"><div className="portrait-field" aria-hidden="true"><span>M·M</span></div><figcaption>Fotografija Marije Miškinović biće dodata</figcaption></figure>
        <div className="teacher-copy"><p className="eyebrow">PREDAVAČ</p><h2>Marija Miškinović</h2><p className="teacher-role">Vlasnica agencije {siteConfig.agencyName} · {siteConfig.yearsExperience} godina u prodaji nekretnina</p><p>Marija vodi agenciju {siteConfig.agencyName} i i dalje aktivno radi sa klijentima — ne predaje iz teorije nego iz posla koji obavlja svakog dana.</p><p>Oba programa su nastala iz onoga što je videla kao najčešći razlog propalih poslova: agent koji zna nekretninu, ali ne zna razgovor.</p><ButtonLink href="/predavac" variant="secondary">Više o Mariji <span aria-hidden="true">→</span></ButtonLink></div>
      </Container>
    </Section>

    <Testimonials />

    <Section className="teams-section"><Container><div className="teams-band"><div><p className="eyebrow">ZA AGENCIJE</p><h2>Šalješ ceo tim?</h2><p>Kada ceo tim prođe istu obuku, prestaje da se dešava da svaki agent vodi razgovor na svoj način. Za grupe od tri i više polaznika dostupan je popust.</p></div><ButtonLink href="/za-agencije">Zatraži ponudu <span aria-hidden="true">→</span></ButtonLink></div></Container></Section>

    <Section className="faq-section"><Container className="faq-grid"><SectionHeading eyebrow="DOBRO JE ZNATI" title="Česta pitanja" /><Faq items={faq} /></Container></Section>

    <Section className="final-section"><Container><div className="final-card"><p className="eyebrow">SLEDEĆA GRUPA</p><h2>Počinje {siteConfig.nextDate}</h2><p className="final-availability">{siteConfig.groupSize} mesta po programu.</p><ButtonLink href="/prijava">Prijavi se</ButtonLink><div className="contact-actions"><span>Pitanje pre prijave?</span><a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></div></div></Container></Section>
  </main>;
}
