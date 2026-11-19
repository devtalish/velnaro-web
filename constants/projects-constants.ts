import { type Transition } from "motion/react";
import { type Project } from "@/types/portfolio-types";

export const MY_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Restaurant",
    section: "selected-work",
    category: "Restaurant / Web Experience",
    description: "A live website project for a restaurant.",
    subDescription: [
      "A restaurant-focused website that presents the dining experience, menu information and key details in one place.",
      "Designed to help visitors quickly understand the venue and take the next step toward visiting.",
    ],
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
    subDescription: [
      "A real-estate website built to introduce the business and present property opportunities clearly.",
      "The experience gives prospective buyers and renters a simple path to explore listings and make enquiries.",
    ],
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
    subDescription: [
      "A gesture-recognition application that explores interaction through hand movements.",
      "The project demonstrates how computer vision can make digital experiences feel more natural and accessible.",
    ],
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
    subDescription: [
      "A clinic-focused software concept for bringing everyday healthcare workflows into one digital experience.",
      "It highlights how clearer patient and clinic processes can reduce friction for staff and visitors.",
    ],
    href: "https://cliniflow-eta.vercel.app/",
    logo: "",
    image: "",
    accent: "from-pale-sage/40 to-slate/10",
    tags: [],
  },
  {
    id: 5,
    title: "SmileCare",
    section: "selected-work",
    category: "Healthcare Website Concept",
    description: "A patient-focused clinic website concept designed to present healthcare services and make appointment enquiries straightforward.",
    subDescription: [
      "A clinic website concept that introduces healthcare services and helps patients find the information they need.",
      "Clear service presentation and appointment enquiry pathways make the first step toward care easier.",
    ],
    href: "https://smilecare-omega.vercel.app/",
    logo: "",
    image: "",
    accent: "from-slate/40 to-graphite/10",
    tags: [],
  },
  {
    id: 6,
    title: "Horizon Estate",
    section: "selected-work",
    category: "Real Estate Platform Concept",
    description: "A property discovery concept showcasing curated listings and a polished real-estate browsing experience.",
    subDescription: [
      "A real-estate platform concept focused on discovering and exploring property listings.",
      "Property presentation, browsing tools and enquiry paths help visitors move from discovery to their next decision.",
    ],
    href: "https://horizon-estate-velnaro.vercel.app/",
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
