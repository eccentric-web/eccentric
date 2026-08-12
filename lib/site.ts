import type { Metadata } from "next";

export type NavLink = {
  label: string;
  href: string;
};

export type MegaMenuColumn = {
  title: string;
  items: NavLink[];
};

export type MegaMenuConfig = {
  title: string;
  description: string;
  cta: NavLink;
  columns: MegaMenuColumn[];
};

function categoryHref(prefix: string, label: string): string {
  const slug = label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `#${prefix}-${slug}`;
}

export const site = {
  name: "Eccentric",
  logo: {
    src: "/logo.svg",
    width: 240,
    height: 88,
  },
  landingVideo: {
    src: "https://assets.eccentric.co.in/landing.mp4",
  },
  slogan: [
    "Engineering a tech",
    "equipped future",
    "with AI",
  ],
  services: [
    "Cyber Security",
    "Infrastructure and Automation",
    "Data Backup",
    "Compliance",
    "ERP and CRM Solution",
    "System Modernization",
    "Consulting",
    "Biometric",
    "Data Engineering",
    "Quality Engineering and Automation",
  ].map((label) => ({
    label,
    href: categoryHref("services", label),
  })),
  industries: [
    "E-commerce and Retail",
    "OTT",
    "Logistic",
    "Banking and Finance",
    "Healthcare",
    "Manufacturing and Supply Chain",
  ].map((label) => ({
    label,
    href: categoryHref("industry", label),
  })),
  megaMenus: {
    services: {
      title: "Services",
      description:
        "End-to-end technology solutions engineered for scale, security, and innovation.",
      cta: {
        label: "Let's Build",
        href: "#contact",
      },
      columns: [
        {
          title: "Security & Data",
          items: [
            "Cyber Security",
            "Data Backup",
            "Compliance",
            "Biometric",
          ].map((label) => ({
            label,
            href: categoryHref("services", label),
          })),
        },
        {
          title: "Infrastructure",
          items: [
            "Infrastructure and Automation",
            "System Modernization",
            "Data Engineering",
          ].map((label) => ({
            label,
            href: categoryHref("services", label),
          })),
        },
        {
          title: "Solutions",
          items: [
            "ERP and CRM Solution",
            "Consulting",
            "Quality Engineering and Automation",
          ].map((label) => ({
            label,
            href: categoryHref("services", label),
          })),
        },
      ],
    },
    industry: {
      title: "Industries",
      description:
        "Deep domain expertise across sectors driving digital transformation.",
      cta: {
        label: "Contact Us",
        href: "#contact",
      },
      columns: [
        {
          title: "Digital",
          items: ["E-commerce and Retail", "OTT"].map((label) => ({
            label,
            href: categoryHref("industry", label),
          })),
        },
        {
          title: "Enterprise",
          items: ["Banking and Finance", "Healthcare"].map((label) => ({
            label,
            href: categoryHref("industry", label),
          })),
        },
        {
          title: "Operations",
          items: ["Logistic", "Manufacturing and Supply Chain"].map((label) => ({
            label,
            href: categoryHref("industry", label),
          })),
        },
      ],
    },
  } satisfies Record<string, MegaMenuConfig>,
  nav: [
    { label: "Careers", href: "#careers" },
    { label: "About Us", href: "#about" },
  ] satisfies NavLink[],
  contact: {
    getInTouch: {
      label: "Let's Build",
      href: "#contact",
    },
    getInContact: {
      label: "Contact Us",
      href: "#contact",
    },
  },
} as const;

export const siteMetadata: Metadata = {
  title: `${site.name} — Engineering a tech equipped future with AI`,
  description:
    "Eccentric engineers a tech-equipped future with AI. Explore our services, industries, careers, and mission.",
};
