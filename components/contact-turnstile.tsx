"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useEffect, useRef } from "react";

type ContactTurnstileProps = {
  onVerify: (token: string) => void;
  onExpire: () => void;
  onError?: () => void;
  resetSignal?: number;
};

export function ContactTurnstile({
  onVerify,
  onExpire,
  onError,
  resetSignal = 0,
}: ContactTurnstileProps) {
  const turnstileRef = useRef<TurnstileInstance>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (resetSignal === 0) {
      return;
    }

    turnstileRef.current?.reset();
  }, [resetSignal]);

  if (!siteKey) {
    return null;
  }

  return (
    <div className="contact-turnstile">
      <Turnstile
        ref={turnstileRef}
        siteKey={siteKey}
        options={{ theme: "light" }}
        onSuccess={onVerify}
        onExpire={onExpire}
        onError={onError}
      />
    </div>
  );
}
