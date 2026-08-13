import { ContactFormProvider } from "@/components/contact-form-provider";
import { siteMetadata } from "@/lib/site";
import "./globals.css";

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ContactFormProvider>{children}</ContactFormProvider>
      </body>
    </html>
  );
}
