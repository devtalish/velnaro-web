import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/seo-constants";

/**
 * Search and AI retrieval crawlers are explicitly allowed.
 * GPTBot and ClaudeBot are training crawlers; allowing them is a separate
 * content-use choice from allowing their search/retrieval bots.
 */
const PUBLIC_CRAWLERS = [
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/admin/", "/dashboard/"] },
      ...PUBLIC_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/", "/admin/", "/dashboard/"],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
