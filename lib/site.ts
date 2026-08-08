import type { Metadata } from "next";

export const site = {
  name: "Eccentric",
  logo: {
    src: "/logo.svg",
    width: 240,
    height: 80,
  },
  maintenance: {
    heading: "Under maintenance",
    message:
      "We're making improvements and will be back shortly. Thank you for your patience.",
  },
} as const;

export const siteMetadata: Metadata = {
  title: `${site.name} — Under maintenance`,
  description: `${site.name} is temporarily unavailable while we perform maintenance.`,
  robots: {
    index: false,
    follow: false,
  },
};
