"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { applicantOptions, experienceOptions, programOptions, type ApplicantValue, type ExperienceValue, type ProgramValue } from "@/lib/application";
import { programs, siteConfig } from "@/data/site";

type Values = {
  fullName: string;
  email: string;
  phone: string;
  program: ProgramValue;
  experience: ExperienceValue | "";
  challenge: string;
  applicantType: ApplicantValue | "";
  consent: boolean;
};

type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;

const firstStepFields: Field[] = ["fullName", "email", "phone", "program"];

function fieldError(field: Field, values: Values) {
  if (field === "fullName" && values.fullName.trim().length < 2) return "Unesi ime i prezime.";
  if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) return "Unesi ispravnu email adresu.";
  if (field === "phone") {
    const phone = values.phone.trim();
    const digits = phone.replace(/\D/g, "");
    if (!/^[0-9+()\-./\s]+$/.test(phone) || digits.length < 6 || digits.length > 18) return "Unesi ispravan broj telefona.";
  }
  if (field === "program" && !values.program) return "Izaberi program.";
  if (field === "experience" && !values.experience) return "Izaberi trenutno iskustvo.";
  if (field === "applicantType" && !values.applicantType) return "Izaberi način prijave.";
  if (field === "consent" && !values.consent) return "Saglasnost je obavezna.";
  return "";
}

function ErrorText({ field, errors }: { field: Field; errors: Errors }) {
  return <span id={`${field}-error`} className="application-error" aria-live="polite">{errors[field]}</span>;
}

export function ApplicationForm({ initialProgram }: { initialProgram: ProgramValue }) {
  const formRef = useRef<HTMLFormElement>(null);
  const requestId = useRef("");
  const submitLock = useRef(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [values, setValues] = useState<Values>({ fullName: "", email: "", phone: "", program: initialProgram, experience: "", challenge: "", applicantType: "", consent: false });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  const update = <K extends Field>(field: K, value: Values[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: "" }));
  };
  const blur = (field: Field) => setErrors((current) => ({ ...current, [field]: fieldError(field, values) }));
  const validate = (fields: Field[]) => {
    const nextErrors = fields.reduce<Errors>((result, field) => {
      const message = fieldError(field, values);
      if (message) result[field] = message;
      return result;
    }, {});
    setErrors((current) => ({ ...current, ...nextErrors }));
    window.requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
    return Object.keys(nextErrors).length === 0;
  };
  const goNext = () => { if (validate(firstStepFields)) setStep(2); };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitLock.current) return;
    const allFields: Field[] = [...firstStepFields, "experience", "applicantType", "consent"];
    if (!validate(allFields)) {
      if (firstStepFields.some((field) => fieldError(field, values))) setStep(1);
      return;
    }
    submitLock.current = true;
    setSubmitting(true);
    setSubmissionError("");
    if (!requestId.current) requestId.current = crypto.randomUUID();
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, clientRequestId: requestId.current }),
      });
      const result = await response.json() as { applicationId?: string; error?: string; fields?: Errors };
      if (!response.ok || !result.applicationId) {
        if (result.fields) setErrors(result.fields);
        throw new Error(result.error || "Prijavu trenutno nije moguće sačuvati.");
      }
      location.assign(`/hvala?ref=${encodeURIComponent(result.applicationId)}`);
    } catch (error) {
      setSubmissionError(error instanceof Error ? error.message : "Prijavu trenutno nije moguće sačuvati.");
    } finally {
      submitLock.current = false;
      setSubmitting(false);
    }
  };

  const selected = programOptions.find((option) => option.value === values.program) ?? programOptions[2];
  const program = programs.find((item) => item.id === selected.slug);

  return <div className="application-layout">
    <form ref={formRef} className="application-form" noValidate onSubmit={submit}>
      <div className="application-heading"><p className="eyebrow">PRIJAVA</p><h1>Prijava za Agent Masterclass</h1></div>
      <p className="step-indicator">Korak {step} od 2</p>
      <fieldset className={`application-step ${step === 1 ? "is-current" : ""}`}>
        <legend>Kontakt</legend>
        <label className="field-full"><span>Ime i prezime</span><input name="fullName" value={values.fullName} autoComplete="name" maxLength={120} aria-invalid={Boolean(errors.fullName)} aria-describedby="fullName-error" onChange={(event) => update("fullName", event.target.value)} onBlur={() => blur("fullName")} /><ErrorText field="fullName" errors={errors} /></label>
        <div className="application-row"><label><span>Telefon</span><input name="phone" type="tel" inputMode="tel" value={values.phone} autoComplete="tel" maxLength={40} aria-invalid={Boolean(errors.phone)} aria-describedby="phone-error" onChange={(event) => update("phone", event.target.value)} onBlur={() => blur("phone")} /><ErrorText field="phone" errors={errors} /></label><label><span>Email</span><input name="email" type="email" inputMode="email" value={values.email} autoComplete="email" maxLength={254} aria-invalid={Boolean(errors.email)} aria-describedby="email-error" onChange={(event) => update("email", event.target.value)} onBlur={() => blur("email")} /><ErrorText field="email" errors={errors} /></label></div>
        <label><span>Koji program?</span><select name="program" value={values.program} aria-invalid={Boolean(errors.program)} aria-describedby="program-error" onChange={(event) => update("program", event.target.value as ProgramValue)} onBlur={() => blur("program")}>{programOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><ErrorText field="program" errors={errors} /></label>
        <button type="button" className="button button-primary step-next" onClick={goNext}>Dalje →</button>
      </fieldset>
      <fieldset className={`application-step ${step === 2 ? "is-current" : ""}`}>
        <legend>Nekoliko pitanja</legend>
        <label><span>Da li trenutno radiš u nekretninama?</span><select name="experience" value={values.experience} aria-invalid={Boolean(errors.experience)} aria-describedby="experience-error" onChange={(event) => update("experience", event.target.value as ExperienceValue)} onBlur={() => blur("experience")}><option value="">Izaberi</option>{experienceOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><ErrorText field="experience" errors={errors} /></label>
        <label><span>Prijavljuješ se sam ili kao tim?</span><select name="applicantType" value={values.applicantType} aria-invalid={Boolean(errors.applicantType)} aria-describedby="applicantType-error" onChange={(event) => update("applicantType", event.target.value as ApplicantValue)} onBlur={() => blur("applicantType")}><option value="">Izaberi</option>{applicantOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><ErrorText field="applicantType" errors={errors} /></label>
        <label><span>Šta ti je trenutno najveći izazov? <small>(opciono)</small></span><textarea name="challenge" rows={5} value={values.challenge} maxLength={1500} onChange={(event) => update("challenge", event.target.value)} /></label>
        <label className="consent-field"><input name="consent" type="checkbox" checked={values.consent} aria-invalid={Boolean(errors.consent)} aria-describedby="consent-error" onChange={(event) => update("consent", event.target.checked)} onBlur={() => blur("consent")} /><span>Saglasan sam sa <Link href="/uslovi-koriscenja">uslovima korišćenja</Link> i <Link href="/politika-privatnosti">politikom privatnosti</Link></span><ErrorText field="consent" errors={errors} /></label>
        <div className="step-actions"><button type="button" className="button button-secondary step-back" onClick={() => setStep(1)}>Nazad</button><button type="submit" className="button button-primary" disabled={submitting}>{submitting ? "Čuvanje prijave…" : "Pošalji prijavu i nastavi na uplatu"}</button></div>
      </fieldset>
      {submissionError && <p className="submission-message submission-error" role="alert">{submissionError}</p>}
      <p className="application-note">Prijava se čuva pre uplate. Mesto se potvrđuje uplatom. <Link href="/uplata">Već si se prijavio? Nastavi na uplatu</Link></p>
    </form>
    <aside className="application-summary" aria-live="polite">
      <p className="eyebrow">IZABRANI PROGRAM</p>
      <h2>{selected.label}</h2>
      {program ? <><p>{program.title}</p><dl><div><dt>Lokacija</dt><dd>{siteConfig.city}</dd></div><div><dt>Cena</dt><dd>{program.price}</dd></div></dl></> : <p>Program možeš izabrati nakon razgovora sa organizatorom.</p>}
    </aside>
  </div>;
}
