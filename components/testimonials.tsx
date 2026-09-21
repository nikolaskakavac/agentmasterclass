"use client";

import { useRef } from "react";
import { Container, Section, SectionHeading } from "@/components/ui";

export function Testimonials() {
  const railRef = useRef<HTMLDivElement>(null);

  const scrollTestimonials = (direction: -1 | 1) => {
    const rail = railRef.current;
    const firstCard = rail?.querySelector<HTMLElement>(".testimonial-video");

    if (!rail || !firstCard) return;

    const gap = Number.parseFloat(getComputedStyle(rail).columnGap) || 0;
    rail.scrollBy({ left: direction * (firstCard.offsetWidth + gap), behavior: "smooth" });
  };

  return <Section className="testimonials-section">
    <Container>
      <div className="testimonial-heading-row">
        <SectionHeading eyebrow="ISKUSTVA POLAZNIKA" title="Utisci i rezultati" />
        <div className="testimonial-rail-controls" aria-label="Kontrole video utisaka">
          <button type="button" onClick={() => scrollTestimonials(-1)} aria-label="Prethodni video utisak"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m10 5-7 7 7 7M3 12h18" /></svg></button>
          <button type="button" onClick={() => scrollTestimonials(1)} aria-label="Sledeći video utisak"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m14 5 7 7-7 7M21 12H3" /></svg></button>
        </div>
      </div>
      <div className="testimonial-video-grid" ref={railRef}>
        {[1, 2, 3].map((number) => <div className="testimonial-video" key={number}>
          <video
            aria-label={`Video utisak polaznika ${number}`}
            controls
            playsInline
            preload="metadata"
            poster={`/images/testimonials/testimonial-${number}.webp`}
          >
            <source src={`/videos/testimonial-${number}.mp4`} type="video/mp4" />
            Tvoj pregledač ne podržava video reprodukciju.
          </video>
        </div>)}
      </div>
    </Container>
  </Section>;
}
