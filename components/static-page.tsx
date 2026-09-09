import type { ReactNode } from "react";
import { Container } from "@/components/ui";

export function EditorialHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return <section className="editorial-hero" id="hero"><Container><div className="editorial-hero-copy"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{intro && <p>{intro}</p>}</div></Container></section>;
}

export function ContentPlaceholder({ children }: { children: ReactNode }) {
  return <div className="content-placeholder">{children}</div>;
}

export function SourceLink({ href, label }: { href: string; label: string }) {
  const pending = href.startsWith("[");
  return pending ? <span className="source-link source-link-pending" aria-disabled="true"><strong>{label}</strong><span>{href}</span></span> : <a className="source-link" href={href} target="_blank" rel="noreferrer"><strong>{label}</strong><span>Otvori zvanični izvor →</span></a>;
}
