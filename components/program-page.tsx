import Link from "next/link";
import { Faq } from "@/components/faq";
import { ButtonLink, Container, Section, SectionHeading } from "@/components/ui";
import type { ProgramPageData } from "@/data/program-pages";
import { programFaq } from "@/data/program-pages";
import { siteConfig } from "@/data/site";

const applicationHref = (slug: ProgramPageData["slug"]) => `/prijava?program=${slug}`;

function Checklist({ items }: { items: string[] }) {
  return <ul className="checklist">{items.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>;
}

function Curriculum({ items }: { items: ProgramPageData["saturdays"] }) {
  return <>
    <div className="saturday-accordion">{items.map((item, index) => <details key={item.number} open={index === 0}>
      <summary><span><small>{item.number} · {item.date}</small>{item.title}</span><b aria-hidden="true">+</b></summary><p>{item.description}</p>
    </details>)}</div>
    <div className="saturday-grid">{items.map((item) => <article key={item.number} className="saturday-card"><div><p className="eyebrow">{item.number}</p><p className="saturday-date">{item.date}</p></div><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
  </>;
}

function Materials({ items }: { items: ProgramPageData["materials"] }) {
  return <div className="material-list">{items.map((item, index) => <article key={item.title}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><p><strong>{item.title}</strong>{item.description && <> — {item.description}</>}</p></article>)}</div>;
}

function AudienceFit({ program }: { program: ProgramPageData }) {
  return <div className="audience-grid"><article><h3>Jeste ako:</h3><ul>{program.fit.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></article><article><h3>Nije ako:</h3><ul>{program.notFit.map((item) => <li key={item}><span aria-hidden="true">×</span>{item}</li>)}</ul></article></div>;
}

function PriceCard({ program, sticky = false }: { program: ProgramPageData; sticky?: boolean }) {
  return <aside className={`price-card ${sticky ? "price-card-sticky" : ""}`} aria-label="Termin i cena">
    <p className="eyebrow">{siteConfig.programMonth} grupa</p><div className="price-dates"><span>{siteConfig.date1}</span><span>{siteConfig.date2}</span><span>{siteConfig.date3}</span><span>{siteConfig.date4}</span></div>
    <p>subotom, {siteConfig.time}</p><p>{siteConfig.address}</p><div className="price-value"><strong>{program.price}</strong><span>RSD</span></div><p>{siteConfig.paymentNote}</p>
    <ButtonLink href={applicationHref(program.slug)}>Rezerviši mesto</ButtonLink><p className="places-left">Grupa je ograničena na {siteConfig.groupSize} mesta. Kada se popuni, sledeći termin je {siteConfig.nextMonth}.</p>
  </aside>;
}

export function ProgramPage({ program }: { program: ProgramPageData }) {
  const fullIntro = [program.mobileIntro, ...program.continuation].join(" ");
  return <main className="program-page">
    <section className="program-hero" id="hero"><Container><div className="program-hero-copy"><p className="eyebrow">{program.eyebrow} · UPIS ZA {siteConfig.programMonth}</p><h1>{program.title}</h1><p className="program-intro-mobile">{program.mobileIntro}</p><p className="program-intro-desktop">{fullIntro}</p><ButtonLink href={applicationHref(program.slug)}>Prijavi se za {siteConfig.programMonth} grupu</ButtonLink><p className="program-hero-meta">4 subote · {siteConfig.date1}–{siteConfig.date4} · {program.price} RSD</p></div></Container></section>
    <Container className="program-layout"><div className="program-main">
      <section className="program-continuation">{program.continuation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>
      <Section><SectionHeading eyebrow="PROGRAM" title="Šta pokrivamo" /><Checklist items={program.coverage} /></Section>
      <Section className="curriculum-section"><SectionHeading eyebrow="ČETIRI SUBOTE" title="Program po subotama" /><Curriculum items={program.saturdays} /></Section>
      <Section className="outcomes-section"><SectionHeading eyebrow="NAKON KURSA" title="Šta ćeš znati nakon završenog kursa" /><Checklist items={program.outcomes} /></Section>
      <Section><SectionHeading eyebrow="UKLJUČENO" title="Materijal koji dobijaš" /><Materials items={program.materials} /></Section>
      {program.exam && <Section className="exam-section"><SectionHeading eyebrow="VAŽNA INFORMACIJA" title="Stručni ispit" />{program.exam.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="exam-disclaimer">{program.exam.disclaimer}</div><Link className="text-link" href="/strucni-ispit">Sve o stručnom ispitu <span aria-hidden="true">→</span></Link></Section>}
      <Section><SectionHeading eyebrow="ZA KOGA JE PROGRAM" title="Za koga jeste i za koga nije" /><AudienceFit program={program} /></Section>
      <section className="mobile-price-section"><SectionHeading eyebrow="UPIS" title="Termin i cena" /><PriceCard program={program} /></section>
      <Section className="program-faq"><SectionHeading eyebrow="DOBRO JE ZNATI" title="Česta pitanja" /><Faq items={programFaq} /></Section>
    </div><div className="desktop-price-column"><PriceCard program={program} sticky /></div></Container>
    <Section className="program-final final-section"><Container><div className="final-card"><p className="eyebrow">SLEDEĆA GRUPA</p><h2>Počinje {siteConfig.nextDate}</h2><p className="final-availability">{siteConfig.groupSize} mesta.</p><ButtonLink href={applicationHref(program.slug)}>Prijavi se</ButtonLink><div className="contact-actions"><span>Pitanje pre prijave?</span><a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></div></div></Container></Section>
  </main>;
}
