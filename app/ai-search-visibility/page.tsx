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

import { SearchVisibilityHero } from "@/components/ai-search-visibility/search-visibility-hero";
import { DiscoveryComparison } from "@/components/ai-search-visibility/discovery-comparison";
import { SearchFramework } from "@/components/ai-search-visibility/search-framework";
import { VisibilityFramework } from "@/components/ai-search-visibility/visibility-framework";
import { MeasurementExplainer } from "@/components/ai-search-visibility/measurement-explainer";
import { ImprovementProcess } from "@/components/ai-search-visibility/improvement-process";
import { RelatedWorkGrid } from "@/components/ai-search-visibility/related-work-grid";
import { AutomationFAQ } from "@/components/ai-automation/automation-faq";
import { ServiceCta } from "@/components/services/service-cta";

type ProjectRef = {
  title: string;
  description: string;
  href?: string;
  image?: string;
  capabilities: string[];
};

const MEASUREMENT_ITEMS = [
  {
    name: "Search impressions",
    description:
      "How often your site appears in search results for relevant queries.",
    related: ["Google Search Console"],
  },
  {
    name: "Search clicks",
    description:
      "Clicks from searchers who visit your site after seeing it in results.",
    related: ["Google Search Console"],
  },
  {
    name: "Organic traffic",
    description:
      "Visits to your site from unpaid search results.",
    related: ["Google Analytics"],
  },
  {
    name: "Indexed pages",
    description:
      "Pages from your site that search engines have discovered and stored.",
    related: ["Google Search Console"],
  },
  {
    name: "AI citation visibility",
    description:
      "How often your brand is referenced as a source in AI-generated responses.",
    related: ["Platform-specific analytics"],
  },
];

const IMPROVEMENT_STAGES = [
  {
    number: "01",
    title: "Audit",
    description:
      "Comprehensive review of technical foundations, content structure and entity clarity.",
    cta: "Request a Visibility Assessment",
    ctaHref: "#contact",
  },
  {
    number: "02",
    title: "Diagnose",
    description:
      "Identify specific gaps in crawlability, indexation, content quality and entity signals.",
  },
  {
    number: "03",
    title: "Structure",
    description:
      "Implement technical improvements, content redesign and entity relationship optimizations.",
  },
  {
    number: "04",
    title: "Improve",
    description:
      "Deploy page improvements, content rewrites and structured data implementations.",
  },
  {
    number: "05",
    title: "Measure and refine",
    description:
      "Track visibility changes, analyze citation patterns and iterate the optimization program.",
  },
];

const RELATED_WORK: ProjectRef[] = [
  {
    title: "Restaurant website",
    description:
      "A restaurant web experience focused on presenting the venue and its offering.",
    href: "https://restaurant-d-g.vercel.app/",
    capabilities: ["Website structure", "Content presentation", "Digital experience"],
  },
  {
    title: "Aether Estates",
    description:
      "A real-estate web experience designed to present property information.",
    href: "https://aether-estate-2ur6.vercel.app/",
    capabilities: ["Property presentation", "Visual interface", "Discovery"],
  },
  {
    title: "ClinicFlow",
    description:
      "A healthcare software concept focused on presenting clinical workflows.",
    href: "https://cliniflow-eta.vercel.app/",
    capabilities: ["Workflow presentation", "Structured interface", "Digital experience"],
  },
];

export const metadata: Metadata = {
  title: {
    absolute: `${"AI Search Visibility — AEO & GEO"} | ${SITE_NAME}`,
  },
  description:
    "We help businesses strengthen how their brand, expertise and solutions are discovered, understood and cited across AI-powered search experiences through technical improvements, strategic content and measurable visibility optimization.",
  alternates: {
    canonical: "/ai-search-visibility",
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/ai-search-visibility"),
    siteName: SITE_NAME,
    title: `${"AI Search Visibility — AEO & GEO"} | ${SITE_NAME}`,
    description:
      "We help businesses strengthen how their brand, expertise and solutions are discovered, understood and cited across AI-powered search experiences through technical improvements, strategic content and measurable visibility optimization.",
    locale: OG_LOCALE,
    images: OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: `${"AI Search Visibility — AEO & GEO"} | ${SITE_NAME}`,
    description:
      "We help businesses strengthen how their brand, expertise and solutions are discovered, understood and cited across AI-powered search experiences through technical improvements, strategic content and measurable visibility optimization.",
    images: OG_IMAGES,
  },
};

export default function AISearchVisibility() {
  return (
    <>
      <Navbar />
      <section id="ai-search-visibility" className="c-space relative overflow-visible">
      <div className="mx-auto max-w-7xl px-0 pt-28">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-deep-teal"
        >
          <span aria-hidden>←</span> Back to VELNARO
        </Link>
      </div>

      <SearchVisibilityHero
        eyebrow="AI SEARCH VISIBILITY / GEO / AEO"
        headline="Make your business easier to discover, understand and reference."
        subtitle="
          VELNARO works on the technical, content and structural foundations that help search engines and AI-assisted discovery systems understand a business. We focus on improving eligibility, clarity and discoverability rather than guaranteeing particular results.
        "
        primaryCtaText="Request a Visibility Assessment"
        primaryCtaHref="#contact"
        secondaryCtaText="Explore Our Approach"
        secondaryCtaHref="/#work"
      />

      <DiscoveryComparison
        title="How discovery experiences differ"
        traditionalTitle="TRADITIONAL SEARCH"
        traditionalItems={[
          "Search query entered",
          "Results page displayed",
          "User clicks a result",
          "Website discovered and visited",
        ]}
        aiTitle="AI-ASSISTED DISCOVERY"
        aiItems={[
          "User asks a conversational question",
          "AI generates a response",
          "Supporting sources and citations are provided",
          "User refines or follows up on the answer",
        ]}
      />

      <SearchFramework areas={[
        {
          number: "01",
          title: "Technical Search Foundations",
          description:
            "Crawlability, indexing, site architecture, page performance and technical clarity.",
          capabilities: ["Crawlability", "Indexing", "Site architecture", "Page performance", "Technical clarity"],
        },
        {
          number: "02",
          title: "Content Quality and Structure",
          description:
            "Helpful content, clear headings, topic coverage, question-led information and evidence quality.",
          capabilities: ["Content structure", "Topic coverage", "Helpful answers", "Question-led information", "Source quality"],
        },
        {
          number: "03",
          title: "Entity and Brand Clarity",
          description:
            "Consistent business information, clear descriptions, relevant relationships, accurate structured information.",
          capabilities: ["Consistent business info", "Clear descriptions", "Relevant relationships", "Accurate structured data"],
        },
        {
          number: "04",
          title: "Search and Answer Readiness",
          description:
            "Relevant search intent, useful direct answers, contextual explanations, well-structured pages.",
          capabilities: ["Search intent", "Direct answers", "Contextual explanations", "Well-structured pages"],
        },
        {
          number: "05",
          title: "Monitoring and Improvement",
          description:
            "Search Console, indexing checks, search performance, AI citation reporting, content improvement cycles.",
          capabilities: ["Google Search Console", "Bing Webmaster Tools", "Indexing checks", "Performance tracking", "Content cycles"],
        },
      ]} />

      <VisibilityFramework
        title="The visibility framework"
        description="
          How business and website information flows through technical foundations into search and AI discovery.
        "
        stages={[
          { name: "Business and website information", description: "Your brand, expertise and offerings" },
          { name: "Technical foundations", description: "Crawlability, indexing, site architecture" },
          { name: "Content and entity clarity", description: "Structured information and clear descriptions" },
          { name: "Search engine discovery", description: "Traditional search engine indexing and ranking" },
          { name: "AI-assisted discovery", description: "AI model recognition and citation" },
          { name: "Measurement and iteration", description: "Tracking visibility and improving over time" },
        ]}
      />

      <MeasurementExplainer title="What measurement actually means" items={MEASUREMENT_ITEMS} />

      <ImprovementProcess stages={IMPROVEMENT_STAGES} />

      <RelatedWorkGrid projects={RELATED_WORK} />

      <AutomationFAQ
        eyebrow="AI SEARCH VISIBILITY"
        title="FAQ"
        items={[
          {
            question: "What is GEO?",
            answer:
              "GEO (Generative Engine Optimization) improves the clarity, structure and authority of your business information so AI systems can better understand it. These practices may support discoverability and citation eligibility, but cannot guarantee that a brand will be referenced in AI-generated answers.",
          },
          {
            question: "What is AEO?",
            answer:
              "AEO (Answer Engine Optimization) focuses on optimizing for answer engines that surface direct answers to conversational questions. Both AEO and GEO require clear entity information, authoritative content and technical foundations.",
          },
          {
            question: "How is GEO different from traditional SEO?",
            answer:
              "GEO and traditional SEO share technical foundations like site speed and structured data, but GEO additionally optimizes for how AI models understand, reference and cite brand information. Traditional SEO focuses on keyword rankings and click-through rates in search results.",
          },
          {
            question: "Can AI search visibility be guaranteed?",
            answer:
              "No. We do not guarantee specific AI recommendations, citations or Google AI Overview appearances. AI systems use proprietary ranking and selection methods that evolve continuously. We confidently research, plan, implement and measure the agreed optimization work, and provide transparent reporting on visibility changes.",
          },
          {
            question: "How do you measure AI-search visibility?",
            answer:
              "We track brand mention rates, citation patterns and visibility changes across AI platforms where data is available, alongside traditional measurements from Google Search Console and Bing Webmaster Tools. Availability and completeness of AI citation reporting differ by platform.",
          },
          {
            question: "Does a business need to redesign its website?",
            answer:
              "Not necessarily. Many optimizations can be made to existing content and structure. Technical improvements, schema markup additions and content restructuring can often be implemented incrementally. A full audit will clarify what is needed.",
          },
        ]}
      />

      <ServiceCta
        headline="Let's make your expertise easier to find."
        subtitle="
          Tell us about your search visibility goals. We'll help you assess your current presence and develop a plan to improve your eligibility and discoverability across traditional and AI-powered search experiences.
        "
        primaryCtaText="Request a Visibility Assessment"
        primaryCtaHref="#contact"
        secondaryCtaText=""
        secondaryCtaHref=""
      />
      </section>
      <Footer />
    </>
  );
}