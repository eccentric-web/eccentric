"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useEffect, useRef, useState } from "react";

type ContactTurnstileProps = {
  onVerify: (token: string) => void;
  onExpire: () => void;
  onError?: () => void;
  onAvailabilityChange?: (available: boolean) => void;
  resetSignal?: number;
};

async function loadTurnstileSiteKey() {
  const buildTimeKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();

  if (buildTimeKey) {
    return buildTimeKey;
  }

  const response = await fetch("/api/turnstile-config");

  if (!response.ok) {
    return "";
  }

  const payload = (await response.json()) as { siteKey?: string };
  return payload.siteKey?.trim() ?? "";
}

export function ContactTurnstile({
  onVerify,
  onExpire,
  onError,
  onAvailabilityChange,
  resetSignal = 0,
}: ContactTurnstileProps) {
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [siteKey, setSiteKey] = useState(
    () => process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "",
  );
  const [status, setStatus] = useState<"loading" | "ready" | "error">(() =>
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ? "ready" : "loading",
  );

  useEffect(() => {
    if (siteKey) {
      return;
    }

    let cancelled = false;

    const resolveSiteKey = async () => {
      try {
        const resolvedSiteKey = await loadTurnstileSiteKey();

        if (cancelled) {
          return;
        }

        if (!resolvedSiteKey) {
          setStatus("error");
          onAvailabilityChange?.(false);
          return;
        }

        setSiteKey(resolvedSiteKey);
        setStatus("ready");
        onAvailabilityChange?.(true);
      } catch {
        if (!cancelled) {
          setStatus("error");
          onAvailabilityChange?.(false);
        }
      }
    };

    void resolveSiteKey();

    return () => {
      cancelled = true;
    };
  }, [siteKey, onAvailabilityChange]);

  useEffect(() => {
    if (resetSignal === 0) {
      return;
    }

    turnstileRef.current?.reset();
  }, [resetSignal]);

  if (status === "loading") {
    return <div className="contact-turnstile" aria-hidden="true" />;
  }

  if (status === "error" || !siteKey) {
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
