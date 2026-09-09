import type { Metadata } from "next";
import { ProgramPage } from "@/components/program-page";
import { salesProgram } from "@/data/program-pages";

export const metadata: Metadata = { title: "Prodajne veštine za agente za nekretnine — obuka uživo" };

export default function SalesSkillsPage() { return <ProgramPage program={salesProgram} />; }
