import type { MetadataRoute } from "next";
import { navItems, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Pages only change when the site is rebuilt, so the build time is an honest lastModified.
  const lastModified = new Date();
  return navItems.map((item) => ({
    url: new URL(item.href, site.url).toString(),
    lastModified,
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.7,
  }));
}
