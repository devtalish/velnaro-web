import { CONTACT_EMAIL } from "./social-constants";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://velnaro.com"
).replace(/\/$/, "");

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const SITE_NAME = "VELNARO";

export const SITE_TITLE = "VELNARO — Software Development & Technology Solutions";

export const SITE_DESCRIPTION =
  "VELNARO designs and develops custom software, web applications, AI-enabled products, and workflow automation shaped around real problems.";

export const SITE_TAGLINE =
  "Software and technology solutions built with purpose.";

export const OG_IMAGE = "/og.jpg";
export const OG_IMAGE_ALT = "VELNARO — Software Development & Technology Solutions";
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
  "Technology Solutions",
  "Custom Software",
  "Web Applications",
  "AI-Enabled Applications",
  "Workflow Automation",
  "Software Architecture",
  "System Integrations",
  "Digital Products",
];

export const HOME_TITLE = "VELNARO — Software Development & Technology Solutions";

export const HOME_DESCRIPTION =
  "VELNARO designs and develops custom software, web applications, AI-enabled products, and workflow automation shaped around real problems.";

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
    description: "VELNARO — Software Development & Technology Solutions.",
  },
  {
    name: "Services",
    hash: "#services",
    description: "Custom software, AI-enabled applications, workflow automation, and software architecture.",
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
