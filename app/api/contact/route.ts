import { NextResponse } from "next/server";
import { phoneCountryByValue } from "@/lib/phone-countries";
import { verifyTurnstileToken } from "@/lib/turnstile";

type ContactPayload = {
  name?: string;
  email?: string;
  organisation?: string;
  phone?: string;
  country?: string;
  phoneCountryCode?: string;
  message?: string;
  turnstileToken?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string) {
  return /^\d{6,15}$/.test(value);
}

function getClientIp(request: Request) {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    undefined
  );
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY;

  if (turnstileSecretKey) {
    const turnstileToken = payload.turnstileToken?.trim() ?? "";

    if (!turnstileToken) {
      return NextResponse.json({ error: "Please complete the captcha." }, { status: 400 });
    }

    const captchaResult = await verifyTurnstileToken(turnstileToken, getClientIp(request));

    if (!captchaResult.success) {
      return NextResponse.json(
        { error: captchaResult.error ?? "Captcha verification failed." },
        { status: 400 },
      );
    }
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const organisation = payload.organisation?.trim() ?? "";
  const phone = payload.phone?.trim() ?? "";
  const country = payload.country?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (!name || !email || !organisation || !phone || !country || !message) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }

  if (!phoneCountryByValue.has(country)) {
    return NextResponse.json({ error: "Please select a valid country." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!isValidPhone(phone)) {
    return NextResponse.json(
      { error: "Please enter a valid mobile number (6-15 digits)." },
      { status: 400 },
    );
  }

  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
