import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/ui";
import { EditorialHero } from "@/components/static-page";
import { StaticForm } from "@/components/static-form";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = { title: "Kontakt — Agent Masterclass" };

export default function ContactPage() {
  return <main><EditorialHero eyebrow="KONTAKT" title="Kontaktiraj Agent Masterclass" />
    <Section><Container className="contact-layout"><div><SectionHeading eyebrow="KONTAKT PODACI" title="Pitanje pre prijave?" /><address className="contact-cards"><a href={`mailto:${siteConfig.email}`}><span>Email</span><strong>{siteConfig.email}</strong></a><a href={`tel:${siteConfig.phone}`}><span>Telefon</span><strong>{siteConfig.phone}</strong></a><div><span>Adresa</span><strong>{siteConfig.address}</strong></div><a href={siteConfig.instagramUrl}><span>Instagram</span><strong>Instagram</strong></a></address></div><StaticForm type="contact" /></Container></Section>
  </main>;
}
