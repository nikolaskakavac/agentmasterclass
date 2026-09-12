"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site";

export function MobileCta() {
  const pathname = usePathname();
  const hiddenOnFlowPage = pathname === "/prijava" || pathname === "/hvala";
  const program = pathname === "/pocetnici" ? "pocetnici" : pathname === "/prodajne-vestine" ? "prodajne-vestine" : null;
  const price = program === "pocetnici" ? siteConfig.beginnerPrice : program === "prodajne-vestine" ? siteConfig.salesPrice : siteConfig.startingPrice;
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (hiddenOnFlowPage) return;
    const hero = document.getElementById("hero");
    if (!hero) return;
    const update = () => setVisible(hero.getBoundingClientRect().bottom <= 0);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [hiddenOnFlowPage, pathname]);
  if (hiddenOnFlowPage) return null;
  return <div className={`mobile-cta ${visible ? "is-visible" : ""}`} aria-hidden={!visible}>
    <p>{program ? price : `Od ${price}`} <span>· 4 subote</span></p>
    <Link href={program ? `/prijava?program=${program}` : "/prijava"} tabIndex={visible ? 0 : -1}>Prijavi se</Link>
  </div>;
}
