import type { Metadata } from "next";
import { ProgramPage } from "@/components/program-page";
import { beginnerProgram } from "@/data/program-pages";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = { title: `Kako postati agent za nekretnine — obuka uživo u ${siteConfig.city}` };

export default function BeginnersPage() { return <ProgramPage program={beginnerProgram} />; }
