type TurnstileVerifyResponse = {
  success: boolean;
  "error-codes"?: string[];
};

export async function verifyTurnstileToken(token: string, remoteIp?: string) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    return { success: false, error: "Captcha is not configured." };
  }

  const body = new URLSearchParams();
  body.set("secret", secretKey);
  body.set("response", token);

  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    if (!response.ok) {
      return { success: false, error: "Unable to verify captcha." };
    }

    const result = (await response.json()) as TurnstileVerifyResponse;

    if (!result.success) {
      return { success: false, error: "Captcha verification failed. Please try again." };
    }

    return { success: true as const };
  } catch {
    return { success: false, error: "Unable to verify captcha." };
  }
}
