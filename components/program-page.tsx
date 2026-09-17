import Link from "next/link";
import { Faq } from "@/components/faq";
import { ButtonLink, Container, Section, SectionHeading } from "@/components/ui";
import type { ProgramPageData } from "@/data/program-pages";
import { siteConfig } from "@/data/site";

const applicationHref = (slug: ProgramPageData["slug"]) => `/prijava?program=${slug}`;

function Checklist({ items }: { items: string[] }) {
  return <ul className="checklist">{items.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>;
}

function Coverage({ items }: { items: ProgramPageData["coverage"] }) {
  return <ul className="checklist coverage-list">{items.map((item) => <li key={item.title}><span aria-hidden="true">✓</span><p><strong>{item.title}</strong>{item.description && <small>{item.description}</small>}</p></li>)}</ul>;
}

function ProgramIntro({ items }: { items: ProgramPageData["intro"] }) {
  return <section className="program-continuation">{items.map((item, index) => {
    if (item.type === "questions") return <ul className="program-intro-questions" key={index}>{item.items.map((question) => <li key={question}>{question}</li>)}</ul>;
    if (item.type === "meta") return <p className="program-intro-meta" key={index}>{item.text}</p>;
    return <p key={item.text}>{item.text}</p>;
  })}</section>;
}

function Curriculum({ items }: { items: ProgramPageData["saturdays"] }) {
  return <>
    <div className="saturday-accordion">{items.map((item, index) => <details key={item.number} open={index === 0}>
      <summary><span><small>{item.number}</small>{item.title}</span><b aria-hidden="true">+</b></summary><p>{item.description}</p>
    </details>)}</div>
    <div className="saturday-grid">{items.map((item) => <article key={item.number} className="saturday-card"><div><p className="eyebrow">{item.number}</p></div><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
  </>;
}

function Materials({ items }: { items: ProgramPageData["materials"] }) {
  return <div className="material-list">{items.map((item, index) => <article key={item.title}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><p><strong>{item.title}</strong>{item.description && <small>{item.description}</small>}</p></article>)}</div>;
}

function AudienceFit({ program }: { program: ProgramPageData }) {
  return <div className="audience-grid"><article><h3>Jeste ako:</h3><ul>{program.fit.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></article><article><h3>Nije ako:</h3><ul>{program.notFit.map((item) => <li key={item}><span aria-hidden="true">×</span>{item}</li>)}</ul></article></div>;
}

function PriceCard({ program, sticky = false }: { program: ProgramPageData; sticky?: boolean }) {
  return <aside className={`price-card ${sticky ? "price-card-sticky" : ""}`} aria-label="Termin i cena">
    <p className="eyebrow">PROGRAM UŽIVO</p>
    <p>{program.duration}</p><p>{siteConfig.city}</p><div className="price-value"><strong>{program.price}</strong></div>
    <ButtonLink href={applicationHref(program.slug)}>Rezerviši mesto</ButtonLink>
  </aside>;
}

export function ProgramPage({ program }: { program: ProgramPageData }) {
  return <main className="program-page">
    <section className="program-hero" id="hero"><Container><div className="program-hero-copy"><p className="eyebrow">{program.eyebrow}</p><h1>{program.title}</h1><p className="program-hero-intro">{program.mobileIntro}</p><ButtonLink href={applicationHref(program.slug)}>Prijavi se i nastavi na uplatu</ButtonLink><p className="program-hero-meta">{program.duration} · {program.price}</p></div></Container></section>
    <Container className="program-layout"><div className="program-main">
      <ProgramIntro items={program.intro} />
      <Section><SectionHeading eyebrow="PROGRAM" title="Šta pokrivamo" /><Coverage items={program.coverage} /></Section>
      <Section className="curriculum-section"><SectionHeading eyebrow="ČETIRI PREDAVANJA" title="Program kroz četiri predavanja" /><Curriculum items={program.saturdays} /></Section>
      <Section className="outcomes-section"><SectionHeading eyebrow="NAKON KURSA" title={program.outcomesTitle} /><Checklist items={program.outcomes} /></Section>
      <Section><SectionHeading eyebrow="UKLJUČENO" title="Materijal koji dobijaš" /><Materials items={program.materials} /></Section>
      {program.exam && <Section className="exam-section"><SectionHeading eyebrow="VAŽNA INFORMACIJA" title="Stručni ispit" />{program.exam.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="exam-disclaimer">{program.exam.disclaimer}</div><Link className="text-link" href="/strucni-ispit">Sve o stručnom ispitu <span aria-hidden="true">→</span></Link></Section>}
      <Section><SectionHeading eyebrow="ZA KOGA JE PROGRAM" title="Za koga jeste i za koga nije" /><AudienceFit program={program} /></Section>
      <section className="mobile-price-section"><SectionHeading eyebrow="UPIS" title="Termin i cena" /><PriceCard program={program} /></section>
      {program.faq.length > 0 && <Section className="program-faq"><SectionHeading eyebrow="DOBRO JE ZNATI" title="Česta pitanja" /><Faq items={program.faq} /></Section>}
    </div><div className="desktop-price-column"><PriceCard program={program} sticky /></div></Container>
    <Section className="program-final final-section"><Container><div className="final-card"><p className="eyebrow">SLEDEĆA GRUPA</p><h2>Prijave su otvorene</h2><ButtonLink href={applicationHref(program.slug)}>Prijavi se i nastavi na uplatu</ButtonLink></div></Container></Section>
  </main>;
}
