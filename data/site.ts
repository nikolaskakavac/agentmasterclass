export const siteConfig = {
  name: "Agent Masterclass",
  city: "[GRAD]",
  startingPrice: "[IZNOS]",
  beginnerPrice: "[IZNOS]",
  salesPrice: "[IZNOS]",
  nextDate: "[DATUM]",
  groupSize: "[BROJ]",
  yearsExperience: "[BROJ]",
  agencyName: "[NAZIV]",
  phone: "[TELEFON]",
  email: "[EMAIL]",
  address: "[ADRESA]",
  year: "[GODINA]",
  legalEntity: "[NAZIV PRAVNOG LICA, PIB, MATIČNI BROJ]",
  programMonth: "[MESEC]",
  date1: "[DATUM 1]",
  date2: "[DATUM 2]",
  date3: "[DATUM 3]",
  date4: "[DATUM 4]",
  time: "[VREME]",
  nextMonth: "[SLEDEĆI MESEC]",
  paymentNote: "[rate / rana prijava — ako postoji]",
  agencyFoundedYear: "[GODINA OSNIVANJA AGENCIJE]",
  transactionCount: "[BROJ TRANSAKCIJA]",
  agentTrainingExperience: "[ISKUSTVO U OBUCI AGENATA]",
  educationAndCertificates: "[OBRAZOVANJE I SERTIFIKATI]",
  salesPhilosophy: "[LIČNA FILOZOFIJA PRODAJE — MARIJINIM REČIMA]",
  teamDiscount: "[USLOVI POPUSTA ZA TIMOVE]",
  privateTeamSession: "[USLOVI TERMINA SAMO ZA JEDNU AGENCIJU]",
  ministrySourceUrl: "[URL MINISTARSTVA TRGOVINE]",
  legalSourceUrl: "[URL ZAKONA]",
  examLastUpdated: "[DATUM POSLEDNJEG AŽURIRANJA]",
  termsContent: "[TEKST USLOVA KORIŠĆENJA DOSTAVLJA NARUČILAC]",
  privacyContent: "[TEKST POLITIKE PRIVATNOSTI DOSTAVLJA NARUČILAC]",
  formBackendNote: "[BACKEND SLANJE FORME BIĆE POVEZANO NAKNADNO]",
  instagramUrl: "#instagram",
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
