"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { contactFormTheme } from "@/lib/contact-form-theme";

type ContactFormProviderProps = {
  children: React.ReactNode;
};

export function ContactFormProvider({ children }: ContactFormProviderProps) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={contactFormTheme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
}
