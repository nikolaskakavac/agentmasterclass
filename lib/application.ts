export const programOptions = [
  { value: "BEGINNER", label: "Za početnike", slug: "pocetnici" },
  { value: "SALES_SKILLS", label: "Prodajne veštine", slug: "prodajne-vestine" },
  { value: "UNSURE", label: "Nisam siguran", slug: null },
] as const;

export const experienceOptions = [
  { value: "NONE", label: "Ne" },
  { value: "UNDER_SIX_MONTHS", label: "Manje od 6 meseci" },
  { value: "SIX_TO_TWELVE_MONTHS", label: "6–12 meseci" },
  { value: "ONE_TO_THREE_YEARS", label: "1–3 godine" },
  { value: "OVER_THREE_YEARS", label: "Više od 3 godine" },
] as const;

export const applicantOptions = [
  { value: "INDIVIDUAL", label: "Sam" },
  { value: "TEAM_TWO_TO_THREE", label: "2–3 osobe" },
  { value: "TEAM_FOUR_PLUS", label: "4+" },
] as const;

export type ProgramValue = typeof programOptions[number]["value"];
export type ExperienceValue = typeof experienceOptions[number]["value"];
export type ApplicantValue = typeof applicantOptions[number]["value"];

export type ApplicationPayload = {
  clientRequestId: string;
  fullName: string;
  email: string;
  phone: string;
  program: string;
  experience: string;
  challenge?: string;
  applicantType: string;
  consent: boolean;
};

export type ApplicationErrors = Partial<Record<keyof ApplicationPayload, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneCharacters = /^[0-9+()\-./\s]+$/;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function normalizeText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, maxLength) : "";
}

export function normalizeEmail(value: unknown) {
  return normalizeText(value, 254).toLowerCase();
}

export function normalizePhoneForMatch(value: unknown) {
  return normalizeText(value, 40).replace(/\D/g, "");
}

export function validateApplication(input: unknown) {
  const raw = (input && typeof input === "object" ? input : {}) as Partial<ApplicationPayload>;
  const data = {
    clientRequestId: normalizeText(raw.clientRequestId, 36),
    fullName: normalizeText(raw.fullName, 120),
    email: normalizeEmail(raw.email),
    phone: normalizeText(raw.phone, 40),
    program: normalizeText(raw.program, 30),
    experience: normalizeText(raw.experience, 40),
    challenge: normalizeText(raw.challenge, 1500) || null,
    applicantType: normalizeText(raw.applicantType, 40),
    consent: raw.consent === true,
  };
  const errors: ApplicationErrors = {};
  if (!uuidPattern.test(data.clientRequestId)) errors.clientRequestId = "Nevažeći identifikator zahteva.";
  if (data.fullName.length < 2) errors.fullName = "Unesi ime i prezime.";
  if (!emailPattern.test(data.email)) errors.email = "Unesi ispravnu email adresu.";
  const digits = data.phone.replace(/\D/g, "");
  if (!phoneCharacters.test(data.phone) || digits.length < 6 || digits.length > 18) errors.phone = "Unesi ispravan broj telefona.";
  if (!programOptions.some((option) => option.value === data.program)) errors.program = "Izaberi program.";
  if (!experienceOptions.some((option) => option.value === data.experience)) errors.experience = "Izaberi trenutno iskustvo.";
  if (!applicantOptions.some((option) => option.value === data.applicantType)) errors.applicantType = "Izaberi način prijave.";
  if (!data.consent) errors.consent = "Saglasnost je obavezna.";
  return { data, errors, valid: Object.keys(errors).length === 0 };
}

export function mapApplicant(value: string) {
  if (value === "TEAM_TWO_TO_THREE") return { applicantType: "TEAM" as const, teamSize: "TWO_TO_THREE" as const };
  if (value === "TEAM_FOUR_PLUS") return { applicantType: "TEAM" as const, teamSize: "FOUR_PLUS" as const };
  return { applicantType: "INDIVIDUAL" as const, teamSize: null };
}

export function programFromQuery(value?: string) : ProgramValue {
  if (value === "pocetnici") return "BEGINNER";
  if (value === "prodajne-vestine") return "SALES_SKILLS";
  return "BEGINNER";
}
