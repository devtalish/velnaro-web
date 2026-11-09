import { type FC } from "react";
import {
  CONTACT_POINT_EMAIL, SITE_DESCRIPTION, SITE_NAME, SITE_SECTIONS, SITE_URL, SOCIAL_PROFILES,
} from "@/constants/seo-constants";
import { HERO_LOCATION } from "@/constants/hero-constants";
import { SERVICES } from "@/constants/services-constants";

const locationParts = HERO_LOCATION.split(",").map((part) => part.trim()).filter(Boolean);
const address = locationParts.length
  ? {
      "@type": "PostalAddress",
      ...(locationParts[0] ? { addressLocality: locationParts[0] } : {}),
      ...(locationParts[1] ? { addressCountry: locationParts[1] } : {}),
    }
  : undefined;

const organization = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  email: `mailto:${CONTACT_POINT_EMAIL}`,
  logo: `${SITE_URL}/opengraph-image`,
  sameAs: SOCIAL_PROFILES,
  ...(address ? { address } : {}),
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const sectionId = (hash: string) => `${SITE_URL}/${hash}`;
const sections = SITE_SECTIONS.map((section) => ({
  "@type": "WebPageElement",
  "@id": sectionId(section.hash),
  name: section.name,
  description: section.description,
  url: sectionId(section.hash),
  isPartOf: { "@id": `${SITE_URL}/#webpage` },
}));

const navigation = {
  "@type": "ItemList",
  "@id": `${SITE_URL}/#sections`,
  name: `${SITE_NAME} sections`,
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  numberOfItems: SITE_SECTIONS.length,
  itemListElement: SITE_SECTIONS.map((section, index) => ({
    "@type": "ListItem", position: index + 1, name: section.name, url: sectionId(section.hash),
  })),
};

const webpage = {
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  mainEntity: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en",
  primaryImageOfPage: `${SITE_URL}/opengraph-image`,
  hasPart: sections.map((section) => ({ "@id": section["@id"] })),
  significantLink: SITE_SECTIONS.map((section) => sectionId(section.hash)),
};

const professionalService = {
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#service`,
  name: SITE_NAME,
  url: SITE_URL,
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: SERVICES.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service.title, description: service.description },
    })),
  },
};

const graph = {
  "@context": "https://schema.org",
  "@graph": [organization, website, webpage, navigation, ...sections, professionalService],
};

export const JsonLd: FC = () => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
);
