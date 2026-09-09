import { testimonials } from "@/data/site";

export function Testimonials() {
  if (testimonials.length === 0) return null;
  return <section aria-labelledby="testimonials-title">
    <h2 id="testimonials-title">Utisci polaznika</h2>
    <div>{testimonials.map((item) => <figure key={item.name}><blockquote>{item.quote}</blockquote><figcaption>{item.name} · {item.agency}</figcaption></figure>)}</div>
  </section>;
}
