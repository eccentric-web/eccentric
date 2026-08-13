"use client";

import { FormEvent, useCallback, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { site } from "@/lib/site";
import { defaultPhoneCountry, phoneCountryByValue } from "@/lib/phone-countries";
import { ContactPhoneField } from "@/components/contact-phone-field";
import { ContactTurnstile } from "@/components/contact-turnstile";

type FormData = {
  name: string;
  email: string;
  organisation: string;
  phoneCountry: string;
  phone: string;
  message: string;
};

const initialFormData: FormData = {
  name: "",
  email: "",
  organisation: "",
  phoneCountry: defaultPhoneCountry,
  phone: "",
  message: "",
};

function ContactForm() {
  const { submitLabel, successMessage, fields } = site.contact.form;
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);
  const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  const handleTurnstileVerify = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken("");
  }, []);

  const resetTurnstile = useCallback(() => {
    setTurnstileToken("");
    setTurnstileResetSignal((current) => current + 1);
  }, []);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    if (turnstileEnabled && !turnstileToken) {
      setStatus("error");
      setErrorMessage("Please complete the captcha.");
      return;
    }

    try {
      const selectedCountry = phoneCountryByValue.get(formData.phoneCountry);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          organisation: formData.organisation,
          country: formData.phoneCountry,
          phoneCountryCode: selectedCountry?.dialCode ?? "",
          phone: formData.phone,
          message: formData.message,
          turnstileToken: turnstileEnabled ? turnstileToken : undefined,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? "Unable to submit your enquiry. Please try again.");
      }

      setStatus("success");
      setFormData(initialFormData);
      resetTurnstile();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
      resetTurnstile();
    }
  };

  if (status === "success") {
    return (
      <Alert severity="success" role="status" sx={{ borderRadius: 1.5 }}>
        {successMessage}
      </Alert>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: "100%" }}>
      <Stack spacing={1.75}>
        <Stack spacing={1.5}>
          <TextField
            fullWidth
            required
            label={fields.name.label}
            name="name"
            value={formData.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder={fields.name.placeholder}
            autoComplete="name"
          />

          <TextField
            fullWidth
            required
            type="email"
            label={fields.email.label}
            name="email"
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder={fields.email.placeholder}
            autoComplete="email"
          />

          <TextField
            fullWidth
            required
            label={fields.organisation.label}
            name="organisation"
            value={formData.organisation}
            onChange={(event) => updateField("organisation", event.target.value)}
            placeholder={fields.organisation.placeholder}
            autoComplete="organization"
          />

          <ContactPhoneField
            label={fields.phone.label}
            placeholder={fields.phone.placeholder}
            phoneCountry={formData.phoneCountry}
            phone={formData.phone}
            onPhoneCountryChange={(value) => updateField("phoneCountry", value)}
            onPhoneChange={(value) => updateField("phone", value)}
          />

          <TextField
            fullWidth
            required
            multiline
            minRows={3}
            label={fields.message.label}
            name="message"
            value={formData.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder={fields.message.placeholder}
          />
        </Stack>

        {status === "error" && errorMessage ? (
          <Alert severity="error" role="alert">
            {errorMessage}
          </Alert>
        ) : null}

        <ContactTurnstile
          onVerify={handleTurnstileVerify}
          onExpire={handleTurnstileExpire}
          onError={handleTurnstileExpire}
          resetSignal={turnstileResetSignal}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          className="contact-section__submit"
          disabled={turnstileEnabled && !turnstileToken}
          loading={status === "submitting"}
          loadingPosition="start"
          endIcon={
            status === "submitting" ? undefined : (
              <Box
                component="span"
                className="contact-section__submit-icon"
                aria-hidden="true"
                sx={{ display: "inline-flex", lineHeight: 0 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
                </svg>
              </Box>
            )
          }
        >
          {status === "submitting" ? "Submitting..." : submitLabel}
        </Button>
      </Stack>
    </Box>
  );
}

export function ContactSection() {
  const { eyebrow, title } = site.contact.form;

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-section-title">
      <div className="contact-section__mesh" aria-hidden="true" />
      <div className="contact-section__glow contact-section__glow--left" aria-hidden="true" />
      <div className="contact-section__glow contact-section__glow--right" aria-hidden="true" />

      <div className="contact-section__inner">
        <header className="contact-section__header">
          <p className="contact-section__eyebrow">{eyebrow}</p>
          <h2 id="contact-section-title" className="contact-section__title">
            {title}
          </h2>
        </header>

        <div className="contact-section__body">
          <Box className="contact-section__form-panel" sx={{ width: "100%" }}>
            <Paper
                elevation={8}
                sx={{
                  width: "100%",
                  height: "100%",
                  p: { xs: 2, md: 2.5 },
                  borderRadius: 3,
                  border: "1px solid rgba(226, 232, 240, 0.9)",
                  background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
                  boxShadow:
                    "0 4px 8px rgba(15, 23, 42, 0.04), 0 14px 36px rgba(15, 23, 42, 0.1), 0 28px 64px rgba(14, 165, 233, 0.1)",
                }}
              >
              <ContactForm />
            </Paper>
          </Box>
        </div>
      </div>
    </section>
  );
}
