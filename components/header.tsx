"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/site";
import { Container } from "@/components/ui";

export function Header() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !open) return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);
  return <header className="site-header">
    <Container className="flex h-[72px] items-center justify-between">
      <Link href="/" className="brand" aria-label="Agent Masterclass, početna">Agent<span>Masterclass</span></Link>
      <nav aria-label="Glavna navigacija" className="hidden items-center gap-7 lg:flex">
        {navigation.map((item) => <Link key={item.href} href={item.href} className="nav-link">{item.label}</Link>)}
        <Link href="/prijava" className="button button-primary h-12">Prijavi se</Link>
      </nav>
      <button ref={buttonRef} type="button" className="hamburger lg:hidden" aria-label={open ? "Zatvori meni" : "Otvori meni"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
        <span className={open ? "rotate-45 translate-y-[6px]" : ""} /><span className={open ? "opacity-0" : ""} /><span className={open ? "-rotate-45 -translate-y-[6px]" : ""} />
      </button>
    </Container>
    <nav id="mobile-navigation" aria-label="Mobilna navigacija" aria-hidden={!open} data-open={open} className="mobile-nav lg:hidden">
      <Container className="flex flex-col py-3">
        {navigation.map((item) => <Link key={item.href} href={item.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>{item.label}<span aria-hidden="true">→</span></Link>)}
      </Container>
    </nav>
  </header>;
}
