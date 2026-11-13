import type { Metadata } from "next";
import { site } from "@/content/site";

const ogImage = { url: "/images/og.png", width: 1200, height: 630, alt: `${site.name} — ${site.role}` };

export function pageMetadata({ title, description, path }: { title?: string; description?: string; path: string }): Metadata {
  const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.role}`;
  const desc = description ?? site.description;
  return {
    ...(title && { title }),
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_IN",
      url: path,
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage.url],
    },
  };
}
