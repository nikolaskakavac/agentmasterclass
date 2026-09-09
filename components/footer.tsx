import Link from "next/link";
import { navigation, siteConfig } from "@/data/site";
import { Container } from "@/components/ui";

const groups = [
  { label: "Programi", links: navigation.slice(0, 2) },
  { label: "Škola", links: [...navigation.slice(2), { label: "Stručni ispit", href: "/strucni-ispit" }] },
  { label: "Kontakt", links: [{ label: siteConfig.email, href: `mailto:${siteConfig.email}` }, { label: siteConfig.phone, href: `tel:${siteConfig.phone}` }, { label: siteConfig.address, href: "/kontakt" }] },
  { label: "Pravno", links: [{ label: "Uslovi korišćenja", href: "/uslovi-koriscenja" }, { label: "Politika privatnosti", href: "/politika-privatnosti" }] },
] as const;

export function Footer() {
  return <footer className="footer">
    <Container>
      <div className="footer-desktop">
        <div><p className="brand brand-footer">Agent<span>Masterclass</span></p><p>Škola za agente za nekretnine.</p></div>
        {groups.slice(0, 3).map((group) => <div key={group.label}><h3>{group.label}</h3>{group.links.map((link) => <Link key={link.label} href={link.href}>{link.label}</Link>)}</div>)}
      </div>
      <div className="footer-mobile">
        {groups.map((group) => <details key={group.label}><summary>{group.label}<span>+</span></summary>{group.links.map((link) => <Link key={link.label} href={link.href}>{link.label}</Link>)}</details>)}
      </div>
      <div className="footer-bottom">
        <Link href={siteConfig.instagramUrl} aria-label="Instagram">Instagram</Link>
        <p>© {siteConfig.year} Agent Masterclass</p>
        <p className="legal">{siteConfig.legalEntity}</p>
        <div className="footer-legal-links"><Link href="/uslovi-koriscenja">Uslovi korišćenja</Link><Link href="/politika-privatnosti">Politika privatnosti</Link></div>
      </div>
    </Container>
  </footer>;
}
