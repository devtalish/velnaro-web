import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/seo-constants";

/** Canonical, public, indexable URLs only. lastModified is included only when the content date is known. */
const ROUTES: MetadataRoute.Sitemap = [
  { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
  { url: `${SITE_URL}/ai-search-visibility`, changeFrequency: "monthly", priority: 0.95 },
  { url: `${SITE_URL}/services/geo-aeo-ai-search-visibility`, changeFrequency: "monthly", priority: 0.95 },
  { url: `${SITE_URL}/ai-automation`, changeFrequency: "monthly", priority: 0.85 },
  { url: `${SITE_URL}/services/ai-automation-business-systems`, changeFrequency: "monthly", priority: 0.85 },
  { url: `${SITE_URL}/software-development`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/services/custom-software-web-development`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/guides`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${SITE_URL}/guides/what-is-generative-engine-optimization-geo-2026`, lastModified: new Date("2026-11-19T00:00:00.000Z"), changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/locations`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${SITE_URL}/locations/canada-geo-aeo-agency`, changeFrequency: "monthly", priority: 0.65 },
  { url: `${SITE_URL}/locations/australia-geo-aeo-agency`, changeFrequency: "monthly", priority: 0.65 },
  { url: `${SITE_URL}/locations/uk-geo-aeo-agency`, changeFrequency: "monthly", priority: 0.65 },
  { url: `${SITE_URL}/locations/austria-geo-aeo-agency`, changeFrequency: "monthly", priority: 0.65 },
  { url: `${SITE_URL}/locations/usa-geo-aeo-agency`, changeFrequency: "monthly", priority: 0.65 },
  { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
  { url: `${SITE_URL}/terms-of-service`, changeFrequency: "yearly", priority: 0.2 },
  { url: `${SITE_URL}/cookie-policy`, changeFrequency: "yearly", priority: 0.2 },
  { url: `${SITE_URL}/disclaimer`, changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES;
}
