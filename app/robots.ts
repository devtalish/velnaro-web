import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/seo-constants";

/** Retrieval/search crawlers are allowed; training crawlers are not granted blanket access. */
const ALLOWED_RETRIEVAL_CRAWLERS = [
  "Googlebot", "Bingbot", "OAI-SearchBot", "ChatGPT-User",
  "Claude-SearchBot", "Claude-User", "PerplexityBot",
];
const DISALLOWED_TRAINING_CRAWLERS = [
  "GPTBot", "ClaudeBot", "Google-Extended", "Applebot-Extended", "CCBot",
];
const PRIVATE_PATHS = ["/api/", "/admin/", "/dashboard/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
      ...ALLOWED_RETRIEVAL_CRAWLERS.map((userAgent) => ({
        userAgent, allow: "/", disallow: PRIVATE_PATHS,
      })),
      ...DISALLOWED_TRAINING_CRAWLERS.map((userAgent) => ({
        userAgent, disallow: "/",
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
