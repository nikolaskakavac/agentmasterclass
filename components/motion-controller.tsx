"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelectors = [
  ".section-heading",
  ".choice-help",
  ".schedule-grid",
  ".teacher-grid",
  ".teams-band",
  ".faq-list",
  ".final-card",
  ".lecturer-intro",
  ".philosophy-quote",
  ".team-offer",
  ".form-layout",
  ".contact-layout",
  ".exam-cta",
  ".source-grid",
  ".legal-content",
].join(",");

const staggerGroups = [
  [".program-grid", ".program-card"],
  [".reasons-grid", ".reason-card"],
  [".saturday-grid", ".saturday-card"],
  [".agency-benefits", "article"],
  [".exam-topics", "article"],
  [".biography-grid", ".content-placeholder"],
] as const;

export function MotionController() {
  const pathname = usePathname();
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) return;

    const revealElements = new Set<HTMLElement>();
    document.querySelectorAll<HTMLElement>(revealSelectors).forEach((element) => revealElements.add(element));

    staggerGroups.forEach(([groupSelector, itemSelector]) => {
      document.querySelectorAll<HTMLElement>(groupSelector).forEach((group) => {
        group.querySelectorAll<HTMLElement>(itemSelector).forEach((item, index) => {
          item.style.setProperty("--reveal-order", String(index));
          revealElements.add(item);
        });
      });
    });

    revealElements.forEach((element) => element.dataset.reveal = "pending");
    document.documentElement.classList.add("motion-ready");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        element.dataset.reveal = "visible";
        observer.unobserve(element);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

    revealElements.forEach((element) => observer.observe(element));
    const safetyTimer = window.setTimeout(() => {
      revealElements.forEach((element) => element.dataset.reveal = "visible");
    }, 1600);

    return () => {
      window.clearTimeout(safetyTimer);
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, [pathname]);

  return null;
}
