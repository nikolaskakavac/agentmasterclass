export const siteConfig = {
  name: "Agent Masterclass",
  city: "Beograd",
  startingPrice: "600 €",
  beginnerPrice: "600 €",
  salesPrice: "600 €",
  nextDate: "",
  groupSize: "",
  yearsExperience: "",
  agencyName: "",
  phone: "",
  email: "",
  address: "",
  year: "2026",
  legalEntity: "",
  programMonth: "",
  date1: "",
  date2: "",
  date3: "",
  date4: "",
  time: "",
  nextMonth: "",
  paymentNote: "",
  agencyFoundedYear: "",
  transactionCount: "",
  agentTrainingExperience: "",
  educationAndCertificates: "",
  salesPhilosophy: "",
  teamDiscount: "",
  privateTeamSession: "",
  ministrySourceUrl: "",
  legalSourceUrl: "",
  examLastUpdated: "",
  termsContent: "",
  privacyContent: "",
  formBackendNote: "",
  bankRecipient: "",
  bankAccount: "",
  bankPaymentPurpose: "",
  bankReferenceInstruction: "",
  transactionalEmailNote: "",
  unsureProgramSummary: "",
  instagramUrl: "",
} as const;

export const programs = [
  {
    id: "pocetnici",
    eyebrow: "ZA ONE KOJI TEK ULAZE U POSAO",
    title: "Kako postati uspešan agent za nekretnine",
    description:
      "Većina ljudi u nekretnine uđe tako što dobije telefon i rečenicu „zovi, snađi se”. To ne donosi rezultat. Ovaj kurs radi suprotno.",
    href: "/pocetnici",
    price: siteConfig.beginnerPrice,
    variant: "light" as const,
  },
  {
    id: "agenti",
    eyebrow: "ZA AGENTE KOJI VEĆ RADE",
    title: "Prodajne veštine za agente za nekretnine",
    description:
      "Imaš kontakte, izlaziš na terene, a klijenti se ne javljaju. Najčešće problem nije u ceni nego u tome što razgovor nije vođen.",
    href: "/prodajne-vestine",
    price: siteConfig.salesPrice,
    variant: "dark" as const,
  },
] as const;

export const testimonials: ReadonlyArray<{
  quote: string;
  name: string;
  agency: string;
  image?: string;
}> = [];

export const navigation = [
  { label: "Za početnike", href: "/pocetnici" },
  { label: "Za agente", href: "/prodajne-vestine" },
  { label: "Predavač", href: "/predavac" },
  { label: "Za agencije", href: "/za-agencije" },
] as const;
