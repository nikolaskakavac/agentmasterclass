import { NextResponse } from "next/server";
import { startApplicationCheckout } from "@/lib/payments";
import { validateApiRequest } from "@/lib/request-security";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: RouteContext) {
  const requestError = validateApiRequest(request);
  if (requestError) return NextResponse.json({ error: requestError }, { status: 400 });

  const { id } = await context.params;
  if (!/^c[a-z0-9]{20,}$/i.test(id)) return NextResponse.json({ error: "Prijava nije pronađena." }, { status: 404 });

  const checkout = await startApplicationCheckout(id, new URL(request.url).origin);
  if (checkout.status === "ready") return NextResponse.json({ checkoutUrl: checkout.checkoutUrl });
  if (checkout.status === "not_found") return NextResponse.json({ error: "Prijava nije pronađena." }, { status: 404 });
  if (checkout.status === "already_paid") return NextResponse.json({ error: "Plaćanje je već potvrđeno." }, { status: 409 });
  if (checkout.status === "unsupported_program") return NextResponse.json({ error: "Za prijavu bez izabranog programa kartično plaćanje nije moguće." }, { status: 409 });
  if (checkout.status === "processing") return NextResponse.json({ error: "Potvrda prethodnog plaćanja je u obradi." }, { status: 409 });
  if (checkout.status === "not_configured") return NextResponse.json({ error: "Kartično plaćanje trenutno nije podešeno." }, { status: 503 });
  if (checkout.status === "stripe_error") return NextResponse.json({ error: "Stripe trenutno nije uspeo da pokrene plaćanje. Pokušaj ponovo." }, { status: 502 });
  return NextResponse.json({ error: "Plaćanje trenutno nije moguće pokrenuti." }, { status: 503 });
}
