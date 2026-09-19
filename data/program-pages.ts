import { siteConfig } from "@/data/site";

type IntroItem =
  | { type: "paragraph"; text: string }
  | { type: "questions"; items: string[] }
  | { type: "meta"; text: string };

export type ProgramPageData = {
  slug: "pocetnici" | "prodajne-vestine";
  eyebrow: string;
  title: string;
  mobileIntro: string;
  intro: IntroItem[];
  duration: string;
  coverage: { title: string; description?: string }[];
  saturdays: { number: string; title: string; description: string }[];
  outcomesTitle: string;
  outcomes: string[];
  materials: { title: string; description: string }[];
  fit: string[];
  notFit: string[];
  faq: { question: string; answer: string }[];
  price: string;
  exam?: { paragraphs: string[]; disclaimer: string };
};

export const beginnerProgram: ProgramPageData = {
  slug: "pocetnici",
  eyebrow: "ZA ONE KOJI TEK ULAZE U POSAO",
  title: "Od prvog poziva do prve provizije.",
  mobileIntro: "Ako razmišljaš o poslu agenta za nekretnine ili si tek počeo, verovatno imaš više pitanja nego odgovora.",
  intro: [
    { type: "questions", items: [
      "Kako da dođem do prve nekretnine?",
      "Šta kažem vlasniku kada ga pozovem?",
      "Kako znam koliko stan realno vredi?",
      "Šta treba da proverim od dokumentacije?",
      "Kako uopšte izgleda ceo posao od početka do kraja?",
    ] },
    { type: "paragraph", text: "Većina novih agenata uči tako što ih neko pošalje na teren i kaže: „Snađi se.”" },
    { type: "paragraph", text: "Ovaj program radi suprotno." },
    { type: "paragraph", text: "Za četiri predavanja prolazimo ceo posao agenta od prvog poziva do zaključenja prodaje, korak po korak." },
    { type: "meta", text: `${siteConfig.programDuration} · ${siteConfig.beginnerPrice}` },
    { type: "paragraph", text: "Na kraju programa znaćeš kako da dođeš do prve nekretnine koju ćeš prodavati, kako da proceniš njenu realnu tržišnu vrednost, koji troškovi prate prodaju i kupovinu nekretnine, i koje greške mogu da te koštaju posla." },
    { type: "paragraph", text: "Radi se uživo, kroz simulacije i praktičan rad – ne samo slušanjem." },
  ],
  duration: siteConfig.programDuration,
  coverage: [
    { title: "Kako se u ovom poslu zarađuje i šta je potrebno da se dođe do prve provizije" },
    { title: "Kako da dođeš do nekretnine u ponudi i kako se vodi razgovor sa prodavcem" },
    { title: "Procena tržišne vrednosti i odbrana cene pred prodavcem koji traži previše" },
    { title: "Obilazak sa kupcem, prigovori i zaključenje posla" },
    { title: "Priručnik sa procedurama i papirologijom + gradivo za stručni ispit" },
  ],
  saturdays: [
    { number: "1. predavanje", title: "Posao i prva prodaja", description: "Kako se zarađuje, kako dolaziš do prve nekretnine u ponudi, prvi razgovor sa prodavcem i potpis ugovora o posredovanju. Simulacija celog procesa od prvog poziva do potpisa." },
    { number: "2. predavanje", title: "Cena", description: "Procena tržišne vrednosti, ukupni troškovi za klijenta. Kako prodavcu saopštiti cenu nižu od očekivane. Simulacija razgovora sa prodavcem." },
    { number: "3. predavanje", title: "Kupac", description: "Kvalifikacija kupca, vođenje obilaska i rad sa prigovorima. Simulacija procesa od prvog poziva do obilaska i rešavanja prigovora." },
    { number: "4. predavanje", title: "Zaključenje", description: "Pregovaranje, zatvaranje i praćenje klijenta do realizacije. Rad na konkretnim situacijama i dokumentaciji. Završna simulacija cele transakcije." },
  ],
  outcomesTitle: "Šta ćeš znati nakon završenog kursa",
  outcomes: [
    "Da samostalno pozoveš prodavca, zakažeš izlazak na teren i dođeš do stana u ponudi",
    "Da odrediš realnu tržišnu cenu nekretnine i obrazložiš je prodavcu koji ima previsoka očekivanja",
    "Da klijentu na licu mesta objasniš koliko ga kupovina ukupno košta",
    "Da prepoznaš problem u dokumentaciji pre nego što uđeš u posao i da prepoznaš kada treba stati",
    "Da vodiš obilazak, odgovoriš na prigovor i dovedeš posao do potpisa",
    "Da izađeš na stručni ispit pripremljen, uz jasan plan učenja koji dobijaš na kursu",
  ],
  materials: [
    { title: "Udžbenik programa", description: "Vodi te kroz sva četiri predavanja i ostaje ti kao praktičan materijal za rad i nakon programa." },
    { title: "Skripta prigovora sa telefona", description: "Najčešći prigovori prodavaca kada zoveš da dobiješ nekretninu — proveren odgovor za svaku situaciju." },
    { title: "Struktura poziva", description: "Kako da otvoriš poziv, šta da kažeš u prvih deset sekundi i kako da vodiš razgovor ka konkretnom rezultatu." },
    { title: "Priručnik sa procedurama", description: "Liste dokumentacije, koraci u poslu od prvog poziva do uknjižbe i situacije u kojima treba stati." },
    { title: "Gradivo za stručni ispit", description: "Organizovano gradivo uz plan učenja po nedeljama." },
  ],
  exam: {
    paragraphs: ["Zakon o posredovanju u prometu i zakupu nepokretnosti propisuje da poslove posredovanja ne sme da obavlja lice bez položenog stručnog ispita. Ispit se polaže pred Ministarstvom unutrašnje i spoljne trgovine."],
    disclaimer: "Program te uvodi u oblasti koje ispit pokriva, ali ne izdaje licencu.",
  },
  fit: [
    "Razmišljaš o poslu agenta za nekretnine i hoćeš da uđeš pripremljen",
    "Tek si se zaposlio u agenciji i niko te ne obučava",
    "Vodiš agenciju i želiš da nove agente uvedeš u posao od početka",
  ],
  notFit: [
    "Radiš kao agent duže od godinu dana. Za tebe je program prodajnih veština",
    "Očekuješ da posle četiri predavanja budeš gotov agent. Ovo je temelj, ne kraj učenja",
    "Očekuješ licencu na kraju programa. Licencu izdaje nadležno ministarstvo",
  ],
  faq: [],
  price: siteConfig.beginnerPrice,
};

export const salesProgram: ProgramPageData = {
  slug: "prodajne-vestine",
  eyebrow: "ZA AGENTE KOJI VEĆ RADE",
  title: "Prodajne veštine za agente za nekretnine",
  mobileIntro: "Obuka se održava uživo u Beogradu. Program vodi Marija Miškinović, dugogodišnji agent i vlasnica agencije za nekretnine.",
  intro: [
    { type: "paragraph", text: "Imaš kontakte, izlaziš na terene, zoveš klijente - a razgovor se svejedno završi sa „javiću Vam se”. Problem retko leži u ceni. Leži u tome ko kontroliše tok razgovora, ti ili klijent." },
    { type: "meta", text: `${siteConfig.programDuration} · ${siteConfig.salesPrice}` },
    { type: "paragraph", text: "Ovaj program je fokusiran na ono što pravi razliku u svakodnevnom radu agenta: kako da otkriješ šta klijent zaista traži, kako da vodiš razgovor i obilazak sa jasnim ciljem i dovedeš komunikaciju do konkretne odluke." },
  ],
  duration: siteConfig.programDuration,
  coverage: [
    { title: "Pitanja koja otkrivaju stvarne potrebe klijenta", description: "Kako da saznaš pravi budžet, rokove, kriterijume i ono što klijentu zaista predstavlja prioritet." },
    { title: "Kako da vodiš obilazak, a ne samo pokazuješ nekretninu", description: "Kako da strukturišeš obilazak, čitaš reakcije klijenta i vodiš razgovor ka sledećem koraku." },
    { title: "Četiri tipa klijenta", description: "Kako da prepoznaš različite obrasce ponašanja i prilagodiš način komunikacije osobi preko puta sebe." },
    { title: "Prigovori i otpor", description: "Kako da razlikuješ pravi prigovor od izgovora i odgovoriš bez ulaska u odbranu." },
    { title: "Pregovaranje i zatvaranje", description: "Kako da vodiš razgovor o ceni, prepoznaš trenutak za odluku i šta da uradiš kada klijent kaže: „Javićemo se.“" },
  ],
  saturdays: [
    { number: "1. predavanje", title: "Otkrivanje", description: "Prvi korak uspešne prodaje je razumevanje klijenta. Pokrivamo kako da otkriješ šta klijent zaista traži, a ne samo ono što kaže. Kvalifikacija klijenta i struktura prvog poziva. Simulacija i analiza kompletnog prvog kontakta." },
    { number: "2. predavanje", title: "Vođenje", description: "Kako da čitaš signale tokom obilaska, izgradiš poverenje i preuzmeš vođenje razgovora. Kroz simulacije analiziramo konkretne situacije sa terena i način na koji se razgovor može usmeriti ka sledećem koraku." },
    { number: "3. predavanje", title: "Otpor", description: "Kako prepoznati šta se krije iza prigovora i prilagoditi pristup različitim tipovima klijenata. Četiri tipa klijenta, matrica prigovora i struktura odgovora, uz simulacije obilazaka sa zahtevnim situacijama." },
    { number: "4. predavanje", title: "Odluka", description: "Pregovaranje o ceni, prepoznavanje pravog trenutka za zatvaranje posla i praćenje klijenta nakon razgovora. Završna simulacija kompletnog prodajnog procesa." },
  ],
  outcomesTitle: "Šta ćeš znati nakon završene edukacije",
  outcomes: [
    "Da već u prvom razgovoru precizno utvrdiš budžet, rokove i stvarne kriterijume klijenta",
    "Da prepoznaš signale interesovanja i otpora i znaš kako da reaguješ u pravom trenutku",
    "Da prilagodiš prezentaciju nekretnine konkretnom klijentu, umesto da svima prodaješ na isti način",
    "Da odgovoriš na prigovor bez ulaska u odbranu",
    "Da vodiš pregovore sa obe strane i dođeš do odluke bez nepotrebnog pritiska",
    "Da imaš sistem praćenja klijenta umesto da posao ostane na „javićemo se”",
  ],
  materials: [
    { title: "Set pitanja za prvi kontakt", description: "Strukturisana pitanja za kvalitetnu kvalifikaciju klijenta pre izlaska na teren." },
    { title: "Struktura vođenja obilaska", description: "Praktičan vodič koji koristiš na terenu za vođenje razgovora i obilaska." },
    { title: "Matrica prigovora", description: "Najčešći prigovori i odgovor prilagođen svakom tipu klijenta." },
    { title: "Skripta za pregovaranje i praćenje", description: "Jasna struktura za vođenje pregovora, zatvaranje i komunikaciju sa klijentom nakon obilaska." },
  ],
  fit: [
    "Radiš kao agent najmanje 6 meseci",
    "Imaš kontakte i prilike, ali premalo zatvorenih poslova",
    "Vodiš agenciju i želiš da tim priča istim jezikom",
    "Spreman si da svoje postojeće iskustvo preispitaš, uvežbaš nove pristupe i radiš kroz praktične simulacije",
    "Spreman/na si da uvežbaš nove pristupe i igraš scenarije naglas pred grupom",
  ],
  notFit: [
    "Tek ulaziš u posao. Za tebe je program za početnike",
    "Smatraš da je problem isključivo u tržištu, ceni ili kvalitetu ponude",
    "Ne želiš da učestvuješ u praktičnim vežbama i simulacijama pred grupom",
  ],
  faq: [
    { question: "Koliko traje kurs?", answer: "4 dana predavanja tokom jednog meseca. Svaki termin ima 3 bloka po 70 minuta, uz 30 minuta pauze između blokova." },
    { question: "Da li se edukacija dešava uživo?", answer: "Da. Nema snimaka. Program se zasniva na radu uživo i praktičnim simulacijama koje se izvode u sali." },
  ],
  price: siteConfig.salesPrice,
};
