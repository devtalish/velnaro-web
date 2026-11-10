import { type Transition } from "motion/react";
import { type Project } from "@/types/portfolio-types";

export const MY_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Restaurant",
    section: "selected-work",
    category: "Restaurant / Web Experience",
    description: "A live website project for a restaurant.",
    subDescription: [],
    href: "https://restaurant-d-g.vercel.app/",
    logo: "",
    image: "",
    accent: "from-deep-teal/40 to-slate/10",
    tags: [],
  },
  {
    id: 2,
    title: "Aether Real Estate",
    section: "selected-work",
    category: "Real Estate / Web Experience",
    description: "A live website project for a real-estate business.",
    subDescription: [],
    href: "https://aether-estate-2ur6.vercel.app/",
    logo: "",
    image: "",
    accent: "from-slate/40 to-deep-teal/10",
    tags: [],
  },
  {
    id: 3,
    title: "SignaAI",
    section: "selected-work",
    category: "Gesture Recognition",
    description: "A gesture-recognition application.",
    subDescription: [],
    href: "https://signaai.vercel.app/",
    logo: "",
    image: "",
    accent: "from-deep-teal/40 to-pale-sage/10",
    tags: [],
  },
  {
    id: 4,
    title: "ClinicFlow",
    section: "selected-work",
    category: "Healthcare Software Concept",
    description: "A live clinic-focused software project.",
    subDescription: [],
    href: "https://cliniflow-eta.vercel.app/",
    logo: "",
    image: "",
    accent: "from-pale-sage/40 to-slate/10",
    tags: [],
  },
  {
    id: 5,
    title: "DocChat",
    section: "interactive-demo",
    category: "Document AI Assistant",
    description: "A concept for a document-chat AI assistant.",
    subDescription: [],
    href: "",
    logo: "",
    image: "",
    accent: "from-slate/40 to-graphite/10",
    tags: [],
  },
  {
    id: 6,
    title: "Dashboard Starter",
    section: "interactive-demo",
    category: "Dashboard Interface",
    description: "A starter concept for a business dashboard interface.",
    subDescription: [],
    href: "",
    logo: "",
    image: "",
    accent: "from-graphite/40 to-deep-teal/10",
    tags: [],
  },
];

export const TILT_SPRING: Transition = { stiffness: 200, damping: 18 };

export const TILT_RANGE: { x: [number, number]; y: [number, number] } = {
  x: [10, -10],
  y: [-14, 14],
};

export const TRACK_SPRING: Transition = { stiffness: 60, damping: 20 };

export const PREVIEW_WINDOW = 1;
