import { siteConfig } from "@/data/site";

export type ProgramPageData = {
  slug: "pocetnici" | "prodajne-vestine";
  eyebrow: string;
  title: string;
  mobileIntro: string;
  continuation: string[];
  coverage: string[];
  saturdays: { number: string; title: string; description: string; date: string }[];
  outcomes: string[];
  materials: { title: string; description: string }[];
  fit: string[];
  notFit: string[];
  price: string;
  exam?: { paragraphs: string[]; disclaimer: string };
};

const dates = [siteConfig.date1, siteConfig.date2, siteConfig.date3, siteConfig.date4];

export const beginnerProgram: ProgramPageData = {
  slug: "pocetnici",
  eyebrow: "ZA ONE KOJI TEK ULAZE U POSAO",
  title: "Kako postati uspešan agent za nekretnine",
  mobileIntro: "Većina ljudi u nekretnine uđe tako što dobije telefon i rečenicu „zovi, snađi se”. To ne donosi rezultat. Donosi šest meseci lupanja glavom o zid i povratak na stari posao.",
  continuation: [
    "Ovaj kurs radi suprotno: dobijaš konkretne, proverene smernice sa terena, od nekoga ko ovaj posao radi svakog dana.",
    "Za mesec dana znaš kako da dođeš do prvog stana koji ćeš prodavati, koliko nekretnina realno vredi, šta klijenta ukupno košta i koje greške te koštaju posla. Radi se uživo, kroz simulacije, a ne slušanjem.",
  ],
  coverage: [
    "Kako se u ovom poslu zarađuje i koliko se čeka do prve provizije",
    "Kako da dođeš do nekretnine u ponudi i kako se vodi razgovor sa prodavcem",
    "Procena vrednosti i odbrana cene pred prodavcem koji traži previše",
    "Obilazak sa kupcem, prigovori i zaključenje posla",
    "Priručnik sa procedurama i papirologijom + gradivo za stručni ispit",
  ],
  saturdays: [
    { number: "1. subota", title: "Posao i prva prodaja", date: dates[0], description: "Kako se zarađuje, kako se dolazi do stana u ponudi, prvi razgovor sa prodavcem i potpis ugovora o posredovanju. Dan se završava simulacijom celog puta od poziva do potpisa." },
    { number: "2. subota", title: "Cena", date: dates[1], description: "Procena vrednosti, ukupan trošak za klijenta, kako se prodavcu saopštava cena niža od očekivane. Simulacija prezentacije procene prodavcu koji se ne slaže." },
    { number: "3. subota", title: "Kupac", date: dates[2], description: "Kvalifikacija kupca, vođenje obilaska i rad na prigovorima. Simulacija od poziva po oglasu do prigovora." },
    { number: "4. subota", title: "Zaključenje", date: dates[3], description: "Pregovori, zatvaranje i praćenje klijenta. Realne situacije sa papirima kroz odlučivanje. Završna simulacija cele transakcije." },
  ],
  outcomes: [
    "Da samostalno pozoveš prodavca, zakažeš izlazak i dođeš do stana u ponudi",
    "Da odrediš realnu cenu nekretnine i da je obrazložiš prodavcu koji traži previše",
    "Da klijentu na licu mesta kažeš koliko ga kupovina ukupno košta",
    "Da prepoznaš problem u papirima pre nego što uđeš u posao, i da znaš kada se staje",
    "Da vodiš obilazak, odgovoriš na prigovor i dovedeš posao do potpisa",
    "Da izađeš na stručni ispit pripremljen, sa planom učenja koji dobijaš na kursu",
  ],
  materials: [
    { title: "Udžbenik kursa", description: "vodi te kroz sva četiri termina, nosiš ga na časove i ostaje ti posle kursa" },
    { title: "Skripta prigovora sa telefona", description: "najčešći prigovori prodavaca kada zoveš da dobiješ stan, i proveren odgovor na svaki" },
    { title: "Struktura poziva", description: "kako se poziv otvara, prvih deset sekundi i način koji u praksi daje rezultat" },
    { title: "Priručnik sa procedurama", description: "kontrolne liste dokumenata, tok posla od poziva do uknjižbe, situacije u kojima se staje" },
    { title: "Gradivo za stručni ispit", description: "sa planom učenja po nedeljama" },
  ],
  exam: {
    paragraphs: [
      "Zakon o posredovanju u prometu i zakupu nepokretnosti propisuje da poslove posredovanja ne sme da obavlja lice bez položenog stručnog ispita. Ispit se polaže pred Ministarstvom trgovine.",
      "Kurs te uvodi u oblasti koje ispit pokriva, daje ti gradivo i plan učenja, i pokriva praktični deo posla koji ispit uopšte ne dodiruje.",
    ],
    disclaimer: "Agent Masterclass je privatna obuka. Uverenje o položenom stručnom ispitu izdaje isključivo Ministarstvo trgovine. Naš program je priprema za ispit i za rad, ne zamena za ispit i ne izdavanje licence.",
  },
  fit: ["Razmišljaš da pređeš u nekretnine i hoćeš da uđeš pripremljen", "Tek si se zaposlio u agenciji i niko te ne obučava", "Vodiš agenciju i zaposlio si nove ljude"],
  notFit: ["Radiš kao agent duže od godinu dana. Za tebe je program prodajnih veština", "Očekuješ da posle četiri subote budeš gotov agent. Ovo je temelj, ne kraj učenja", "Očekuješ licencu na kraju kursa. Licencu izdaje Ministarstvo"],
  price: siteConfig.beginnerPrice,
};

export const salesProgram: ProgramPageData = {
  slug: "prodajne-vestine",
  eyebrow: "ZA AGENTE KOJI VEĆ RADE",
  title: "Prodajne veštine za agente za nekretnine",
  mobileIntro: "Imaš kontakte, izlaziš na terene, a klijenti se ne javljaju. Najčešće problem nije u ceni nego u tome što razgovor nije vođen. Prepušten je klijentu.",
  continuation: ["Ovaj program se bavi isključivo time: kako se otkriva šta klijent stvarno traži, kako se drži kontrola obilaska i kako se posao dovodi do odluke."],
  coverage: ["Pitanja koja otkrivaju stvarni budžet, rok i kriterijume", "Čitanje signala interesovanja i otpora tokom obilaska", "Četiri tipa klijenta i kako se pristup menja za svaki", "Prigovori: struktura odgovora koja ne ulazi u odbranu", "Pregovaranje, zatvaranje i praćenje klijenta posle „javićemo se”"],
  saturdays: [
    { number: "1. subota", title: "Otkrivanje", date: dates[0], description: "Kako se otkriva šta klijent stvarno traži, a ne šta kaže. Kvalifikacija i struktura prvog poziva. Simulacija celog prvog kontakta." },
    { number: "2. subota", title: "Vođenje", date: dates[1], description: "Čitanje signala tokom obilaska, izgradnja poverenja i preuzimanje vođenja razgovora. Simulacija kompletnog obilaska." },
    { number: "3. subota", title: "Otpor", date: dates[2], description: "Četiri tipa klijenta, struktura odgovora na prigovor i matrica prigovora. Simulacija obilaska sa skrivenim prigovorima." },
    { number: "4. subota", title: "Odluka", date: dates[3], description: "Pregovaranje o ceni, prepoznavanje trenutka za zatvaranje i praćenje klijenta. Završna simulacija celog puta." },
  ],
  outcomes: ["Da u prvom razgovoru izvučeš stvarni budžet, rok i kriterijume klijenta", "Da prepoznaš kada klijent otvara, a kada se zatvara, i šta u tom trenutku da uradiš", "Da prilagodiš prezentaciju iste nekretnine različitim tipovima klijenata", "Da odgovoriš na prigovor bez ulaska u odbranu", "Da vodiš pregovore sa obe strane i da tražiš odluku bez pritiska", "Da imaš sistem praćenja klijenta umesto da posao ostane na „javićemo se”"],
  materials: [
    { title: "Set pitanja za prvi kontakt", description: "za kvalifikaciju klijenta pre izlaska na teren" },
    { title: "Struktura vođenja obilaska", description: "jedna strana koju nosiš na teren" },
    { title: "Matrica prigovora", description: "najčešći prigovori i odgovor prilagođen svakom tipu klijenta" },
    { title: "Skripta za pregovaranje i praćenje klijenta", description: "" },
  ],
  fit: ["Radiš kao agent najmanje pola godine", "Imaš dovoljno kontakata, ali premalo zatvorenih poslova", "Vodiš agenciju i želiš da tim priča istim jezikom", "Spreman si da igraš scenarije naglas pred grupom"],
  notFit: ["Tek ulaziš u posao. Za tebe je program za početnike", "Očekuješ pravnu obuku, ugovore i procenu vrednosti. To je predmet drugog programa", "Ne želiš da vežbaš pred drugima"],
  price: siteConfig.salesPrice,
};

export const programFaq = [
  { question: "Koji program je za mene?", answer: "Ako još nisi radio kao agent, izaberi program za početnike. Ako već radiš i problem ti je u razgovoru sa klijentom, izaberi program prodajnih veština." },
  { question: "Da li dobijam licencu?", answer: "Ne. Uverenje o položenom stručnom ispitu izdaje Ministarstvo trgovine. Program za početnike te uvodi u oblasti ispita i daje ti gradivo i plan učenja, ali sam ispit polažeš pred Ministarstvom." },
  { question: "Koliko traje kurs?", answer: "Četiri subote. Svaki termin ima 3 bloka po 70 minuta, uz 30 minuta pauze." },
  { question: "Da li se sve radi uživo?", answer: "Da. Nema snimaka. Program se zasniva na simulacijama koje se izvode u sali." },
  { question: "Koliko ljudi je u grupi?", answer: "Grupa je ograničena kako bi svaki polaznik stigao da odigra scenarije." },
] as const;
