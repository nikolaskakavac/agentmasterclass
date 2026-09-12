import Link from "next/link";
import { navigation, siteConfig } from "@/data/site";
import { Container } from "@/components/ui";

const groups = [
  { label: "Programi", links: navigation.slice(0, 2) },
  { label: "Škola", links: [...navigation.slice(2), { label: "Stručni ispit", href: "/strucni-ispit" }] },
] as const;

export function Footer() {
  return <footer className="footer">
    <Container>
      <div className="footer-desktop">
        <div><p className="brand brand-footer">Agent<span>Masterclass</span></p><p>Škola za agente za nekretnine.</p></div>
        {groups.map((group) => <div key={group.label}><h3>{group.label}</h3>{group.links.map((link) => <Link key={link.label} href={link.href}>{link.label}</Link>)}</div>)}
      </div>
      <div className="footer-mobile">
        {groups.map((group) => <details key={group.label}><summary>{group.label}<span>+</span></summary>{group.links.map((link) => <Link key={link.label} href={link.href}>{link.label}</Link>)}</details>)}
      </div>
      <div className="footer-bottom">
        <p>© {siteConfig.year} Agent Masterclass</p>
        <Link href="/uplata">Već si se prijavio? Nastavi na uplatu</Link>
      </div>
    </Container>
  </footer>;
}
