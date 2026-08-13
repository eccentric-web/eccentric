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

export type CareerHighlight = {
  value: string;
  label: string;
};

export type SocialPlatform = "x" | "instagram" | "linkedin" | "mail";

export type SocialLink = {
  platform: SocialPlatform;
  href: string;
  label: string;
};

export type FocusAreaAccent =
  | "cloud"
  | "ai"
  | "security"
  | "data"
  | "infra"
  | "salesforce";

export type FocusArea = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  accent: FocusAreaAccent;
  image: string;
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
  focusAreas: {
    eyebrow: "Solutions that drive real impact",
    title: "Technology expertise. Business outcomes.",
    description:
      "These are the niches we are building toward—and the kinds of partnerships we are actively pursuing in the market. We combine modern technology with proven delivery to solve complex challenges and create measurable value.",
    backgroundImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80",
    items: [
      {
        id: "cloud-computing",
        title: "Cloud Computing",
        tagline: "Build the foundation for agility and growth.",
        description:
          "We design secure, scalable, and cost-optimized cloud solutions that help you innovate faster and serve customers anywhere in the world.",
        accent: "cloud",
        image:
          "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "generative-ai",
        title: "Generative AI",
        tagline: "Turn creativity and data into a competitive edge.",
        description:
          "From intelligent automation to content generation, we build AI solutions that enhance productivity, personalize experiences, and unlock new opportunities.",
        accent: "ai",
        image:
          "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "cybersecurity",
        title: "Cybersecurity",
        tagline: "Protect what matters. Always.",
        description:
          "We implement proactive security strategies and advanced controls that safeguard your systems, data, and reputation in an evolving threat landscape.",
        accent: "security",
        image:
          "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "data-engineering",
        title: "Data Engineering",
        tagline: "Build a reliable data backbone for smarter decisions.",
        description:
          "We create modern data pipelines and platforms that ensure quality, accessibility, and governance—so your teams can focus on insights, not data wrangling.",
        accent: "data",
        image:
          "https://images.unsplash.com/photo-1639322537508-14d0b305526a?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "infrastructure-data-center",
        title: "Infrastructure & Data Center",
        tagline: "Power performance with resilient infrastructure.",
        description:
          "We design, optimize, and manage robust environments that deliver high availability, efficiency, and the flexibility to scale with your business.",
        accent: "infra",
        image:
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "salesforce",
        title: "Salesforce",
        tagline: "Unify sales, service, and customer relationships.",
        description:
          "We implement and customize Salesforce solutions that streamline workflows, improve visibility across teams, and deliver personalized customer experiences at scale.",
        accent: "salesforce",
        image:
          "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
      },
    ] satisfies FocusArea[],
  },
  nav: [
    { label: "Careers", href: "#careers" },
    { label: "About Us", href: "#about" },
  ] satisfies NavLink[],
  careers: {
    eyebrow: "Careers",
    title: {
      lead: "Help us engineer a",
      accent: "tech-equipped future with AI.",
    },
    description:
      "We're looking for curious builders who love solving hard problems and shipping work that matters.",
    highlights: [
      { value: "AI-first", label: "Engineering culture" },
      { value: "Remote", label: "Flexible collaboration" },
      { value: "Global", label: "Client impact" },
    ] satisfies CareerHighlight[],
    badge: "Now hiring",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    cta: {
      label: "Join our team",
      href: "#contact",
    },
  },
  footer: {
    description: [
      "Engineering intelligent systems for the modern enterprise.",
      "Secure, scalable technology—from cloud and AI to data and cybersecurity.",
    ],
    social: [
      {
        platform: "x",
        href: "https://x.com/eccentric",
        label: "Follow Eccentric on X",
      },
      {
        platform: "instagram",
        href: "https://instagram.com/eccentric",
        label: "Follow Eccentric on Instagram",
      },
      {
        platform: "linkedin",
        href: "https://linkedin.com/company/eccentric",
        label: "Follow Eccentric on LinkedIn",
      },
      {
        platform: "mail",
        href: "mailto:sales@eccentric.co.in",
        label: "Email Eccentric",
      },
    ] satisfies SocialLink[],
    copyright: `© ${new Date().getFullYear()} Eccentric. All rights reserved.`,
  },
  about: {
    title: "About Eccentric",
    description:
      "Eccentric partners with organizations to design, build, and scale secure, modern technology solutions—from cloud and AI to cybersecurity and data engineering.",
  },
  contact: {
    getInTouch: {
      label: "Let's Build",
      href: "#contact",
    },
    getInContact: {
      label: "Contact Us",
      href: "#contact",
    },
    form: {
      eyebrow: "Get in Touch",
      title:
        "Get Customized Solutions, Recommendations, and Estimates for Your Requirements.",
      submitLabel: "Submit",
      successMessage: "Thank you. We have received your enquiry and will be in touch soon.",
      fields: {
        name: { label: "Full name", placeholder: "Your name" },
        email: { label: "Email", placeholder: "you@company.com" },
        organisation: { label: "Organisation", placeholder: "Company name" },
        phone: { label: "Contact number", placeholder: "Mobile number" },
        message: { label: "Message", placeholder: "How can we help you?" },
      },
    },
  },
} as const;

export const siteMetadata: Metadata = {
  title: `${site.name} — Engineering a tech equipped future with AI`,
  description:
    "Eccentric engineers a tech-equipped future with AI. Explore our services, industries, careers, and mission.",
};
