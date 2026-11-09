import { CONTACT_EMAIL } from "./social-constants";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://velnaro.agency"
).replace(/\/$/, "");

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const SITE_NAME = "VELNARO";

export const SITE_TITLE = "VELNARO — Software, AI Automation & AI Search Visibility";

export const SITE_DESCRIPTION =
  "VELNARO is a digital agency building custom software, AI automation systems, and AI search visibility programs that help businesses grow.";

export const SITE_TAGLINE =
  "Software, AI automation, and AI search visibility built with purpose.";

export const OG_IMAGE = "/og.jpg";
export const OG_IMAGE_ALT = "VELNARO — Software, AI Automation & AI Search Visibility";
export const OG_LOCALE = "en_US";

export const OG_IMAGES = [
  {
    url: OG_IMAGE,
    width: 1200,
    height: 630,
    alt: OG_IMAGE_ALT,
  },
];

export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "";

export const SITE_KEYWORDS = [
  "VELNARO",
  "Software Development",
  "Digital Solutions",
  "AI Automation",
  "Business Systems",
  "AI Search Visibility",
  "Answer Engine Optimization",
  "Generative Engine Optimization",
  "AEO",
  "GEO",
  "Custom Software",
  "Web Applications",
  "Workflow Automation",
  "Digital Products",
];

export const HOME_TITLE = "VELNARO — Software, AI Automation & AI Search Visibility";

export const HOME_DESCRIPTION =
  "VELNARO is a digital agency building custom software, AI automation systems, and AI search visibility programs that help businesses grow.";

export const ADMIN_TITLE = "Contact submissions";

export const ADMIN_DESCRIPTION =
  "Private dashboard for contact form submissions. Not part of the public site.";

export const ADMIN_LOGIN_TITLE = "Sign in";

export const ADMIN_LOGIN_DESCRIPTION =
  "Sign in to the private contact submissions dashboard.";

export const SITE_SECTIONS = [
  {
    name: "Home",
    hash: "#home",
    description: "VELNARO — Software, AI automation, and AI search visibility.",
  },
  {
    name: "Services",
    hash: "#services",
    description: "Software development, AI automation, and AI search visibility programs.",
  },
  {
    name: "Work",
    hash: "#work",
    description: "Selected digital products and concepts across web experiences, AI applications, and operational tools.",
  },
  {
    name: "Process",
    hash: "#process",
    description: "A clear path from idea to delivery — discover, plan, build, validate, deliver.",
  },
  {
    name: "Contact",
    hash: "#contact",
    description: "Start a conversation about your project with VELNARO.",
  },
] as const;

export const SOCIAL_PROFILES = [];

export const CONTACT_POINT_EMAIL = CONTACT_EMAIL;
