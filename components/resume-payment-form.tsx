"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";

type ResumeResponse = {
  status?: "checkout" | "pending" | "paid" | "not_found";
  checkoutUrl?: string;
  message?: string;
  error?: string;
};

export function ResumePaymentForm() {
  const submitLock = useRef(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResumeResponse | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitLock.current) return;
    submitLock.current = true;
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/payment-resume", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, phone }),
      });
      const responseData = await response.json() as ResumeResponse;
      if (!response.ok) throw new Error(responseData.error || "Nastavak plaćanja trenutno nije dostupan.");
      if (responseData.status === "checkout" && responseData.checkoutUrl) {
        window.location.assign(responseData.checkoutUrl);
        return;
      }
      setResult(responseData);
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : "Nastavak plaćanja trenutno nije dostupan." });
    } finally {
      submitLock.current = false;
      setLoading(false);
    }
  };

  return <form className="application-form resume-payment-form" onSubmit={submit}>
    <div className="application-heading">
      <p className="eyebrow">UPLATA</p>
      <h1>Već si se prijavio?</h1>
      <p>Unesi podatke koje si koristio pri prijavi i nastavi na uplatu.</p>
    </div>
    <label><span>Email</span><input name="email" type="email" autoComplete="email" value={email} required maxLength={254} onChange={(event) => setEmail(event.target.value)} /></label>
    <label><span>Telefon</span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} required maxLength={40} onChange={(event) => setPhone(event.target.value)} /></label>
    <button className="button button-primary" type="submit" disabled={loading}>{loading ? "Provera prijave…" : "Pronađi prijavu"}</button>
    {result?.message && <div className="resume-payment-result" role="status"><p>{result.message}</p>{result.status === "not_found" && <Link href="/prijava">Vrati se na prijavu →</Link>}</div>}
    {result?.error && <p className="submission-message submission-error" role="alert">{result.error}</p>}
  </form>;
}
