import type { Metadata } from "next";
import { ApplicationForm } from "@/components/application-form";
import { Container } from "@/components/ui";
import { programFromQuery } from "@/lib/application";

export const metadata: Metadata = { title: "Prijava, Agent Masterclass", description: "Prijava za Agent Masterclass programe." };

export default async function ApplicationPage({ searchParams }: { searchParams: Promise<{ program?: string | string[] }> }) {
  const params = await searchParams;
  const queryProgram = Array.isArray(params.program) ? params.program[0] : params.program;
  return <main className="application-page" id="hero"><Container><ApplicationForm initialProgram={programFromQuery(queryProgram)} /></Container></main>;
}
