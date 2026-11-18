import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/seo-constants";

const LAST_UPDATED = new Date("2026-11-19T00:00:00.000Z");

const ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/ai-search-visibility", changeFrequency: "monthly", priority: 0.95 },
  { path: "/services/geo-aeo-ai-search-visibility", changeFrequency: "monthly", priority: 0.95 },
  { path: "/ai-automation", changeFrequency: "monthly", priority: 0.85 },
  { path: "/services/ai-automation-business-systems", changeFrequency: "monthly", priority: 0.85 },
  { path: "/software-development", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services/custom-software-web-development", changeFrequency: "monthly", priority: 0.8 },
  { path: "/guides/what-is-generative-engine-optimization-geo-2026", changeFrequency: "monthly", priority: 0.9 },
  { path: "/locations/canada-geo-aeo-agency", changeFrequency: "monthly", priority: 0.65 },
  { path: "/locations/australia-geo-aeo-agency", changeFrequency: "monthly", priority: 0.65 },
  { path: "/locations/uk-geo-aeo-agency", changeFrequency: "monthly", priority: 0.65 },
  { path: "/locations/austria-geo-aeo-agency", changeFrequency: "monthly", priority: 0.65 },
  { path: "/locations/usa-geo-aeo-agency", changeFrequency: "monthly", priority: 0.65 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms-of-service", changeFrequency: "yearly", priority: 0.2 },
  { path: "/cookie-policy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/disclaimer", changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: LAST_UPDATED,
    changeFrequency,
    priority,
  }));
}
