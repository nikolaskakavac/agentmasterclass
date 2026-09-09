import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileCta } from "@/components/mobile-cta";
import { MotionController } from "@/components/motion-controller";

export const metadata: Metadata = {
  title: "Agent Masterclass — Škola za agente za nekretnine",
  description: "Obuka uživo za buduće i aktivne agente za nekretnine.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="sr-Latn"><body><Header />{children}<Footer /><MobileCta /><MotionController /></body></html>;
}
