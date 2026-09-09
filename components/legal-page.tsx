import { Container, Section } from "@/components/ui";
import { ContentPlaceholder, EditorialHero } from "@/components/static-page";

export function LegalPage({ title, content }: { title: string; content: string }) {
  return <main><EditorialHero eyebrow="PRAVNO" title={title} /><Section><Container className="legal-content"><ContentPlaceholder>{content}</ContentPlaceholder></Container></Section></main>;
}
