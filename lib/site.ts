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
    "Cloud Computing",
    "Generative AI",
    "Salesforce",
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
    "Media and Entertainment",
    "Logistics and Supply Chain",
    "Banking and Financial Services",
    "Healthcare and Life Sciences",
    "Manufacturing and Supply Chain",
  ].map((label) => ({
    label,
    href: categoryHref("industry", label),
  })),
  megaMenus: {
    services: {
      title: "End-to-end technology solutions for modern enterprises",
      description:
        "From cyber security and compliance to cloud computing, Salesforce, generative AI, data engineering, and ERP/CRM—we help organizations modernize legacy systems, automate operations, and adopt AI with confidence.",
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
            "Data Engineering",
          ].map((label) => ({
            label,
            href: categoryHref("services", label),
          })),
        },
        {
          title: "Infrastructure & Solutions",
          items: [
            "Infrastructure and Automation",
            "Cloud Computing",
            "Generative AI",
            "Salesforce",
            "System Modernization",
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
      title: "Industry expertise that powers digital transformation",
      description:
        "We partner with leaders across banking, healthcare, retail, media and entertainment, logistics, and manufacturing—delivering tailored solutions that improve efficiency, resilience, and customer experience at scale.",
      cta: {
        label: "Contact Us",
        href: "#contact",
      },
      columns: [
        {
          title: "Digital & Logistics",
          items: ["E-commerce and Retail", "Media and Entertainment", "Logistics and Supply Chain"].map((label) => ({
            label,
            href: categoryHref("industry", label),
          })),
        },
        {
          title: "Enterprise",
          items: ["Banking and Finance", "Healthcare", "Manufacturing and Supply Chain"].map(
            (label) => ({
              label,
              href: categoryHref("industry", label),
            }),
          ),
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
