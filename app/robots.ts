import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const restrictedPaths = [
    "/admin",
    "/admin/",
    "/api/admin",
    "/api/uploads",
    "/api/files",
    "/api/analytics-events",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: restrictedPaths,
        crawlDelay: 1,
      },
      {
        userAgent: ["OAI-SearchBot", "ChatGPT-User", "ChatGPT-User"],
        allow: ["/", "/llms.txt"],
        disallow: restrictedPaths,
      },
      {
        userAgent: ["Claude-SearchBot", "Claude-User", "ClaudeBot"],
        allow: ["/", "/llms.txt"],
        disallow: restrictedPaths,
      },
      {
        userAgent: ["PerplexityBot", "Perplexity-User", "PerplexityCrawler"],
        allow: ["/", "/llms.txt"],
        disallow: restrictedPaths,
      },
      {
        userAgent: ["Google-Extended", "GoogleOther"],
        allow: "/",
        disallow: restrictedPaths,
      },
      {
        userAgent: ["GPTBot", "CCBot"],
        disallow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: restrictedPaths,
        crawlDelay: 1,
      },
    ],
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
    host: siteConfig.siteUrl,
  };
}
