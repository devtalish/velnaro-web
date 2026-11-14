import { type Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import {
  OG_IMAGES,
  OG_LOCALE,
  SITE_NAME,
  absoluteUrl,
} from "@/constants/seo-constants";

import { ServiceHero } from "@/components/services/service-hero";
import { ProductInterfaceShowcase } from "@/components/services/product-interface-showcase";
import { CapabilityFeature } from "@/components/services/capability-feature";
import { ArchitectureDiagram } from "@/components/services/architecture-diagram";
import { DevelopmentTimeline } from "@/components/services/development-timeline";
import { ServiceProjectGrid } from "@/components/services/service-project-grid";
import { FAQAccordion } from "@/components/services/faq-accordion";
import { ServiceCta } from "@/components/services/service-cta";

type ServiceProject = {
  title: string;
  category: string;
  description: string;
  href?: string;
  image?: string;
  technologies: string[];
};

const SOFTWARE_PROJECTS: ServiceProject[] = [
  {
    title: "Restaurant",
    category: "Restaurant / Web Experience",
    description:
      "A restaurant web experience focused on presenting the venue and its offering through a polished digital presence.",
    href: "https://restaurant-d-g.vercel.app/",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Motion"],
  },
  {
    title: "Aether Estates",
    category: "Real Estate / Web Experience",
    description:
      "A real-estate web experience designed to present property information through a focused, visual interface.",
    href: "https://aether-estate-2ur6.vercel.app/",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Motion"],
  },
  {
    title: "ClinicFlow",
    category: "Healthcare Software Concept",
    description:
      "A healthcare-oriented software concept focused on presenting clinical workflows in a structured digital interface.",
    href: "https://cliniflow-eta.vercel.app/",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "React"],
  },
];

const DEVELOPMENT_PROCESS = [
  {
    id: 1,
    title: "Understand",
    description:
      "Understand the business, objectives, challenges, customers and requirements.",
  },
  {
    id: 2,
    title: "Plan",
    description: "Establish the solution strategy and project scope.",
  },
  {
    id: 3,
    title: "Design",
    description: "Plan the experience and implementation structure.",
  },
  {
    id: 4,
    title: "Build",
    description: "Develop, integrate, test and refine the solution.",
  },
  {
    id: 5,
    title: "Validate and launch",
    description: "Deploy and support the solution.",
  },
];

export const metadata: Metadata = {
  title: {
    absolute: `${"Software Development & Digital Solutions"} | ${SITE_NAME}`,
  },
  description:
    "VELNARO designs and develops custom software and digital products built around the way your business works. From high-performing websites to custom business platforms, we deliver scalable solutions that streamline operations and support business growth.",
  alternates: {
    canonical: "/software-development",
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/software-development"),
    siteName: SITE_NAME,
    title: `${"Software Development & Digital Solutions"} | ${SITE_NAME}`,
    description:
      "VELNARO designs and develops custom software and digital products built around the way your business works.",
    locale: OG_LOCALE,
    images: OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: {
      absolute: `${"Software Development & Digital Solutions"} | ${SITE_NAME}`,
    },
    description:
      "VELNARO designs and develops custom software and digital products built around the way your business works.",
    images: OG_IMAGES,
  },
};

export default function SoftwareDevelopment() {
  return (
    <>
      <Navbar />
      <section
      id="software-development"
      className="c-space relative overflow-visible"
    >
      <div className="mx-auto max-w-7xl px-6 pt-28">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-deep-teal"
        >
          <span aria-hidden>←</span> Back to VELNARO
        </Link>
      </div>

      <ServiceHero
        eyebrow="SOFTWARE DEVELOPMENT"
        headline="Software built around the way your business works."
        subtitle="
          We design and develop websites, web applications, internal platforms and custom digital products that align with your business processes and grow with your organization.
        "
        primaryCtaText="Discuss Your Project"
        primaryCtaHref="#contact"
        secondaryCtaText="Explore Our Work"
        secondaryCtaHref="/#work"
        capabilityLine="Digital products · Web applications · Business platforms"
      />

      <ProductInterfaceShowcase
        mainAlt="Product interface showcase"
        mainClassName=""
        panel1Title="Customer-facing portal"
        panel1Description="A refined customer-facing portal with intuitive navigation and clear action paths."
        panel2Title="Admin dashboard"
        panel2Description="A centralized admin dashboard for managing content, users, and analytics."
        panel3Title="Mobile-responsive design"
        panel3Description="Fully responsive experience that works beautifully across all devices."
      />

      <CapabilityFeature
        title="What we build"
        description="
          Through careful discovery and iterative design, we deliver digital products that are
          user-centered, scalable, and maintainable without endless rework.
        "
        visualAlt="Software capabilities illustration"
        capabilities={[
          "Websites and Digital Experiences",
          "Custom Web Applications",
          "Business Platforms and Dashboards",
          "Product Engineering and Integrations",
        ]}
      />

      <ArchitectureDiagram
        title="Product engineering in practice"
        description="
          Digital products are built on a structured foundation. The following layers illustrate
          how software systems can be organized for clarity, maintainability, and scale.
        "
        layers={[
          {
            name: "Interface Layer",
            description:
              "User-facing screens and interactions designed for usability and clarity.",
          },
          {
            name: "Application Logic",
            description:
              "Business rules and workflows that process data and coordinate operations.",
          },
          {
            name: "Data Layer",
            description:
              "Database schemas and data models that structure information for reliability.",
          },
          {
            name: "Integrations",
            description:
              "API connections and third-party services that extend functionality.",
          },
          {
            name: "Infrastructure",
            description:
              "Deployment platforms and hosting environments that ensure availability and performance.",
          },
        ]}
      />

      <DevelopmentTimeline steps={DEVELOPMENT_PROCESS} />

      <ServiceProjectGrid
        projects={SOFTWARE_PROJECTS}
        seeAllHref="/#work"
      />

      <FAQAccordion
        title="FAQ"
        items={[
          {
            question: "What can VELNARO help build?",
            answer:
              "VELNARO works across three divisions: software development and digital solutions, AI automation and business systems, and AI search visibility (AEO & GEO). The right scope depends on the problem and requirements.",
          },
          {
            question: "How does a project begin?",
            answer:
              "It begins with a conversation about the problem, the intended outcome, and the constraints. From there, the scope and an appropriate next step can be discussed.",
          },
          {
            question: "Can you work with an existing application or workflow?",
            answer:
              "The first step is to understand the current system, the issue to address, and the technical constraints. That helps determine whether an improvement, integration, or larger change is appropriate.",
          },
          {
            question: "How can I discuss a project?",
            answer:
              "Use the contact form to share a brief description of what you have in mind. Include the context you already know; you do not need a complete specification to start the conversation.",
          },
        ]}
      />

      <ServiceCta
        headline="Have a product in mind? Let's build it properly."
        subtitle="
          Tell us about your idea, requirements, and constraints. We'll help you scope a solution that fits your business and gets results.
        "
        primaryCtaText="Discuss Your Project"
        primaryCtaHref="#contact"
        secondaryCtaText="Explore Our Work"
        secondaryCtaHref="/#work"
      />
      </section>
      <Footer />
    </>
  );
}