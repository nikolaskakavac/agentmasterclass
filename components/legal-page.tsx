import { EditorialHero } from "@/components/static-page";

export function LegalPage({ title, content }: { title: string; content: string }) {
  void content;
  return <main><EditorialHero eyebrow="PRAVNO" title={title} /></main>;
}
