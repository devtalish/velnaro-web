import { type Transition } from "motion/react";
import { type Project } from "@/types/portfolio-types";

export const MY_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Restaurant",
    category: "Restaurant / Web Experience",
    description:
      "A restaurant web experience focused on presenting the venue and its offering through a polished digital presence.",
    subDescription: [
      "Designed a refined digital presence for a restaurant venue",
      "Focused on visual presentation of the venue and its offerings",
      "Built for performance and accessibility across devices",
    ],
    href: "https://restaurant-d-g.vercel.app/",
    logo: "",
    image: "",
    accent: "from-deep-teal/40 to-slate/10",
    tags: [
      { id: 1, name: "Next.js", path: "/assets/logos/react.svg" },
      { id: 2, name: "TypeScript", path: "/assets/logos/javascript.svg" },
      { id: 3, name: "TailwindCSS", path: "/assets/logos/tailwindcss.svg" },
      { id: 4, name: "Motion", path: "/assets/logos/javascript.svg" },
    ],
  },
  {
    id: 2,
    title: "Aether Real Estate",
    category: "Real Estate / Web Experience",
    description:
      "A real-estate web experience designed to present property information through a focused, visual interface.",
    subDescription: [
      "Created a property-focused web interface",
      "Emphasized visual presentation of property information",
      "Optimized for smooth browsing and discovery",
    ],
    href: "https://aether-estate-2ur6.vercel.app/",
    logo: "",
    image: "",
    accent: "from-slate/40 to-deep-teal/10",
    tags: [
      { id: 1, name: "Next.js", path: "/assets/logos/react.svg" },
      { id: 2, name: "TypeScript", path: "/assets/logos/javascript.svg" },
      { id: 3, name: "TailwindCSS", path: "/assets/logos/tailwindcss.svg" },
      { id: 4, name: "Motion", path: "/assets/logos/javascript.svg" },
    ],
  },
  {
    id: 3,
    title: "SignaAI",
    category: "Gesture Recognition",
    description:
      "A gesture-recognition application exploring interaction through computer vision and hand gestures.",
    subDescription: [
      "Built a computer vision based gesture recognition system",
      "Explored natural interaction through hand gestures",
      "Designed for real-time responsiveness",
    ],
    href: "https://signaai.vercel.app/",
    logo: "",
    image: "",
    accent: "from-deep-teal/40 to-pale-sage/10",
    tags: [
      { id: 1, name: "Next.js", path: "/assets/logos/react.svg" },
      { id: 2, name: "TypeScript", path: "/assets/logos/javascript.svg" },
      { id: 3, name: "Computer Vision", path: "/assets/logos/javascript.svg" },
      { id: 4, name: "WebGL", path: "/assets/logos/javascript.svg" },
    ],
  },
  {
    id: 4,
    title: "ClinicFlow",
    category: "Healthcare Software Concept",
    description:
      "A healthcare-oriented software concept focused on presenting clinical workflows in a structured digital interface.",
    subDescription: [
      "Designed a structured interface for clinical workflows",
      "Focused on clarity and usability in healthcare contexts",
      "Built as a concept for digital healthcare tools",
    ],
    href: "https://cliniflow-eta.vercel.app/",
    logo: "",
    image: "",
    accent: "from-pale-sage/40 to-slate/10",
    tags: [
      { id: 1, name: "Next.js", path: "/assets/logos/react.svg" },
      { id: 2, name: "TypeScript", path: "/assets/logos/javascript.svg" },
      { id: 3, name: "TailwindCSS", path: "/assets/logos/tailwindcss.svg" },
      { id: 4, name: "React", path: "/assets/logos/react.svg" },
    ],
  },
  {
    id: 5,
    title: "Atlas Knowledge Hub",
    category: "AI Knowledge Assistant",
    description:
      "An AI knowledge-hub concept intended to help people work with information through an assistant-style experience.",
    subDescription: [
      "Concept for an AI-powered knowledge assistant",
      "Designed for intuitive information discovery",
      "Exploring conversational interface patterns",
    ],
    href: "",
    logo: "",
    image: "",
    accent: "from-slate/40 to-graphite/10",
    tags: [
      { id: 1, name: "AI", path: "/assets/logos/javascript.svg" },
      { id: 2, name: "Next.js", path: "/assets/logos/react.svg" },
      { id: 3, name: "TypeScript", path: "/assets/logos/javascript.svg" },
      { id: 4, name: "LLM", path: "/assets/logos/javascript.svg" },
    ],
  },
  {
    id: 6,
    title: "OpsPilot Dashboard",
    category: "Workflow Dashboard",
    description:
      "A workflow-dashboard concept focused on bringing operational information and tasks into a structured interface.",
    subDescription: [
      "Concept for an operational dashboard",
      "Designed to surface tasks and information clearly",
      "Built for workflow visibility and control",
    ],
    href: "",
    logo: "",
    image: "",
    accent: "from-graphite/40 to-deep-teal/10",
    tags: [
      { id: 1, name: "React", path: "/assets/logos/react.svg" },
      { id: 2, name: "TypeScript", path: "/assets/logos/javascript.svg" },
      { id: 3, name: "TailwindCSS", path: "/assets/logos/tailwindcss.svg" },
      { id: 4, name: "Dashboard", path: "/assets/logos/javascript.svg" },
    ],
  },
];

export const TILT_SPRING: Transition = { stiffness: 200, damping: 18 };

export const TILT_RANGE: { x: [number, number]; y: [number, number] } = {
  x: [10, -10],
  y: [-14, 14],
};

export const TRACK_SPRING: Transition = { stiffness: 60, damping: 20 };

export const PREVIEW_WINDOW = 1;
