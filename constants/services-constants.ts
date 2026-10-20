import { type Service } from "@/types/portfolio-types";

export const SERVICES: Service[] = [
  {
    id: 1,
    title: "Custom Software & Web Applications",
    description:
      "Purpose-built web applications and digital products designed around your users, workflows, and business requirements.",
    icon: "/assets/logos/react.svg",
    bullets: [
      "User-centered product design",
      "Scalable architecture & clean code",
      "Performance & accessibility built-in",
    ],
  },
  {
    id: 2,
    title: "AI-Enabled Applications",
    description:
      "Applications that incorporate AI capabilities where they offer a practical, meaningful improvement to the experience or workflow.",
    icon: "/assets/logos/javascript.svg",
    bullets: [
      "LLM integration & prompt engineering",
      "Computer vision & gesture recognition",
      "AI-assisted workflows & automation",
    ],
  },
  {
    id: 3,
    title: "Workflow Automation",
    description:
      "Connected workflows that reduce repetitive manual work and help information move more consistently between tools and systems.",
    icon: "/assets/logos/tailwindcss.svg",
    bullets: [
      "Process mapping & optimization",
      "System integrations & API orchestration",
      "Custom automation tooling",
    ],
  },
  {
    id: 4,
    title: "Software Architecture & Integrations",
    description:
      "Thoughtful technical foundations and integrations that help applications, services, and data work together.",
    icon: "/assets/logos/react.svg",
    bullets: [
      "Architecture assessment & design",
      "Legacy system modernization",
      "Cross-platform data synchronization",
    ],
  },
];
