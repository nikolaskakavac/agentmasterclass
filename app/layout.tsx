import type { Metadata } from "next";
import { IBM_Plex_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileCta } from "@/components/mobile-cta";
import { MotionController } from "@/components/motion-controller";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-plex-sans",
});

export const metadata: Metadata = {
  title: "Agent Masterclass, škola za agente za nekretnine",
  description: "Obuka uživo za buduće i aktivne agente za nekretnine.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="sr-Latn" className={`${inter.variable} ${plexSans.variable}`}><body><Header />{children}<Footer /><MobileCta /><MotionController /></body></html>;
}
