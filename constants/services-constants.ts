import { type Service } from "@/types/portfolio-types";

export const SERVICES: Service[] = [
  {
    id: 1,
    title: "Software Development & Digital Solutions",
    description:
      "Purpose-built web applications and digital products designed around your users, workflows, and business requirements. We also provide thoughtful software architecture and system integrations that help applications and data work together smoothly.",
    href: "/software-development",
    bullets: [
      "User-centered product design",
      "Scalable architecture & clean code",
      "Performance & accessibility built-in",
      "Legacy system modernization & cross-platform synchronization",
    ],
  },
  {
    id: 2,
    title: "AI Automation & Business Systems",
    description:
      "Applications that incorporate AI capabilities where they offer a practical, meaningful improvement to the experience or workflow, plus connected workflows that reduce repetitive manual work and help information move more consistently between tools and systems.",
    href: "/ai-automation",
    bullets: [
      "LLM integration & prompt engineering",
      "Computer vision & gesture recognition",
      "AI-assisted workflows & automation",
      "Process mapping & optimization",
      "System integrations & API orchestration",
      "Custom automation tooling",
    ],
  },
  {
    id: 3,
    title: "AI Search Visibility — AEO & GEO",
    description:
      "AI-powered search visibility optimization strengthening how your brand is understood and discovered through AI-powered search platforms. AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) ensure your brand is understood, cited, and recommended by the platforms your audience uses.",
    href: "/ai-search-visibility",
    bullets: [
      "Technical foundations for AI discoverability",
      "Content optimization for AI platforms",
      "Brand and entity clarity",
      "Authority development",
      "Visibility monitoring",
    ],
  },
];
