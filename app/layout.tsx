import { ContactFormProvider } from "@/components/contact-form-provider";
import { siteMetadata } from "@/lib/site";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className={inter.className}>
        <ContactFormProvider>{children}</ContactFormProvider>
      </body>
    </html>
  );
}
