import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Search and AI crawlers are welcome: the site is public, and being quoted by AI answer
// engines (ChatGPT, Claude, Perplexity, Gemini, Apple) is the point of /llms.txt.
// They're listed by name so the intent is explicit even though "*" already allows them.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiCrawlers, allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
