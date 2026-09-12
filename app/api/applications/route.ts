import { NextResponse } from "next/server";
import type { Experience, Program } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { mapApplicant, validateApplication } from "@/lib/application";
import { validateApiRequest } from "@/lib/request-security";

export async function POST(request: Request) {
  const requestError = validateApiRequest(request);
  if (requestError) return NextResponse.json({ error: requestError }, { status: 400 });

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Zahtev nije moguće pročitati." }, { status: 400 });
  }

  const validation = validateApplication(payload);
  if (!validation.valid) return NextResponse.json({ error: "Proveri označena polja.", fields: validation.errors }, { status: 422 });

  const applicant = mapApplicant(validation.data.applicantType);
  try {
    const application = await prisma.application.upsert({
      where: { clientRequestId: validation.data.clientRequestId },
      update: {},
      create: {
        clientRequestId: validation.data.clientRequestId,
        fullName: validation.data.fullName,
        email: validation.data.email,
        phone: validation.data.phone,
        program: validation.data.program as Program,
        experience: validation.data.experience as Experience,
        challenge: validation.data.challenge,
        applicantType: applicant.applicantType,
        teamSize: applicant.teamSize,
        consentAt: new Date(),
      },
      select: { id: true },
    });
    return NextResponse.json({ applicationId: application.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Prijavu trenutno nije moguće sačuvati. Pokušaj ponovo malo kasnije." }, { status: 503 });
  }
}
