import { type FC } from "react";
import { MY_SOCIALS } from "@/constants/social-constants";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/constants/seo-constants";

const organizationId = `${SITE_URL}/#organization`;
const websiteId = `${SITE_URL}/#website`;

const serviceOffers: Array<{ name: string; description: string; price: string; url: string; unitText?: string }> = [
  {
    name: "AI Search & GEO Diagnostic Audit",
    description: "A diagnostic review of technical search foundations, brand/entity clarity, content structure and AI-search discoverability opportunities.",
    price: "850",
    url: "/services/geo-aeo-ai-search-visibility",
  },
  {
    name: "GEO Strategy & Entity Roadmap",
    description: "A prioritized strategy and entity roadmap based on the diagnostic findings and agreed business objectives.",
    price: "1650",
    url: "/services/geo-aeo-ai-search-visibility",
  },
  {
    name: "Complete GEO/AEO Technical Implementation Sprint",
    description: "An implementation engagement for agreed technical, structured-data and content improvements.",
    price: "2800",
    url: "/services/geo-aeo-ai-search-visibility",
  },
  {
    name: "Monthly GEO/AEO Growth Optimization Retainer",
    description: "Ongoing optimization and measurement under a defined monthly scope.",
    price: "2200",
    url: "/services/geo-aeo-ai-search-visibility",
    unitText: "month",
  },
  {
    name: "Advanced Ongoing Authority Program",
    description: "An advanced monthly authority and optimization engagement under a separately agreed scope.",
    price: "4500",
    url: "/services/geo-aeo-ai-search-visibility",
    unitText: "month",
  },
];

const coreServices = [
  { name: "AI Search Visibility — GEO & AEO", description: "Technical SEO, generative and answer-engine readiness, entity clarity, structured data, answer-led content and measurement.", url: "/ai-search-visibility" },
  { name: "AI Automation & Business Systems", description: "Workflow automation, CRM and lead-management systems, document processing, AI assistants and application integrations.", url: "/ai-automation" },
  { name: "Software Development & Digital Solutions", description: "Custom websites, web applications, business dashboards, internal tools and API integrations.", url: "/software-development" },
];
const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: SITE_NAME,
      url: SITE_URL,
      sameAs: MY_SOCIALS.map((social) => social.href),
      description: SITE_DESCRIPTION,
      knowsAbout: [
        "Generative Engine Optimization",
        "Answer Engine Optimization",
        "Technical SEO",
        "Structured Data",
        "AI Automation",
        "Custom Software Development",
      ],
      areaServed: [
        { "@type": "Country", name: "Canada" },
        { "@type": "Country", name: "Australia" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "Austria" },
        { "@type": "Country", name: "United States" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "VELNARO Services and GEO/AEO Engagements",
        itemListElement: [
          ...coreServices.map((service) => ({
            "@type": "Offer",
            url: SITE_URL + service.url,
            itemOffered: { "@type": "Service", name: service.name, description: service.description, provider: { "@id": organizationId } },
          })),
          ...serviceOffers.map((offer) => ({
          "@type": "Offer",
          name: offer.name,
          description: offer.description,
          url: `${SITE_URL}${offer.url}`,
          priceCurrency: "USD",
          price: offer.price,
          ...(offer.unitText
            ? { priceSpecification: { "@type": "UnitPriceSpecification", price: offer.price, priceCurrency: "USD", unitText: offer.unitText } }
            : {}),
          itemOffered: { "@type": "Service", name: offer.name, provider: { "@id": organizationId } },
        })),
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": organizationId },
    },
  ],
};

export const JsonLd: FC = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
  />
);
