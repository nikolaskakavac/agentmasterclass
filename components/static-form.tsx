"use client";

import type { FormEvent } from "react";
import { siteConfig } from "@/data/site";

export function StaticForm({ type }: { type: "contact" | "agency" }) {
  const submit = (event: FormEvent<HTMLFormElement>) => event.preventDefault();
  return <form className="static-form" onSubmit={submit}>
    {type === "agency" && <label><span>Naziv agencije</span><input name="agency" autoComplete="organization" required /></label>}
    <label><span>Ime i prezime</span><input name="name" autoComplete="name" required /></label>
    <div className="form-row"><label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label><label><span>Telefon</span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" required /></label></div>
    {type === "agency" && <div className="form-row"><label><span>Broj članova tima</span><input name="team-size" inputMode="numeric" required /></label><label><span>Program</span><select name="program" defaultValue=""><option value="" disabled>Izaberi program</option><option>Za početnike</option><option>Prodajne veštine</option><option>Nisam siguran</option></select></label></div>}
    <label><span>{type === "agency" ? "Šta je vašem timu potrebno?" : "Poruka"}</span><textarea name="message" rows={5} required /></label>
    <button className="button button-primary" type="submit">{type === "agency" ? "Zatraži ponudu" : "Pošalji poruku"}</button>
    <p className="form-note">{siteConfig.formBackendNote}</p>
  </form>;
}
