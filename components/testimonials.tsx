import { Container, Section, SectionHeading } from "@/components/ui";

export function Testimonials() {
  return <Section className="testimonials-section">
    <Container>
      <SectionHeading eyebrow="ISKUSTVA POLAZNIKA" title="Utisci i rezultati" />
      <div className="testimonial-video-grid">
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
