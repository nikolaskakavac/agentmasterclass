"use client";

import { useRef, useState } from "react";

type CheckoutResponse = { checkoutUrl?: string; error?: string };

export function CheckoutButton({ applicationId }: { applicationId: string }) {
  const requestInProgress = useRef(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const openCheckout = async () => {
    if (requestInProgress.current) return;
    requestInProgress.current = true;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/applications/${encodeURIComponent(applicationId)}/checkout`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({}),
      });
      const result = await response.json() as CheckoutResponse;
      if (!response.ok || !result.checkoutUrl) throw new Error(result.error || "Plaćanje trenutno nije moguće pokrenuti.");
      window.location.assign(result.checkoutUrl);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Plaćanje trenutno nije moguće pokrenuti.");
      requestInProgress.current = false;
      setLoading(false);
    }
  };

  return <>
    <button className="button button-primary" type="button" disabled={loading} onClick={openCheckout}>
      {loading ? "Otvaranje plaćanja…" : "Plati karticom"}
    </button>
    {error && <p className="submission-message submission-error" role="alert">{error}</p>}
  </>;
}
