import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 md:px-8 ${className}`}>{children}</div>;
}

export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return <section id={id} className={`scroll-mt-24 py-14 md:py-24 ${className}`}>{children}</section>;
}

export function ButtonLink({ children, href, variant = "primary", className = "" }: { children: ReactNode; href: string; variant?: "primary" | "secondary" | "outline"; className?: string }) {
  return <Link href={href} className={`button button-${variant} ${className}`}>{children}</Link>;
}

export function SectionHeading({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return <div className="section-heading">
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
    <h2>{title}</h2>
    {intro && <p className="section-intro">{intro}</p>}
  </div>;
}

export function IconMark({ children }: { children: ReactNode }) {
  return <span className="icon-mark" aria-hidden="true">{children}</span>;
}
