# Integracije koje slede

## Stripe

Za povezivanje postojećeg Stripe naloga biće potrebni `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` i postojeći Price ID za svaki program. Checkout sesija mora nastajati isključivo na serveru, iz programa sačuvanog uz prijavu. Webhook mora proveravati Stripe potpis, idempotentno obrađivati event ID i jedini sme postaviti status `PAID`.

## Transakcioni email

Potrebno je izabrati provajdera, verifikovati domen pošiljaoca i dodati njegov serverski API ključ. Integraciona granica već razlikuje poruke: primljena prijava, instrukcije za uplatu na račun i potvrđena kartična uplata.
