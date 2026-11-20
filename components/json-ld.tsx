import { site } from "@/content/site";

// Renders schema.org JSON-LD. "<" is escaped so content can never close the script tag early.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const personId = `${site.url}/#person`;
export const absolute = (path: string) => new URL(path, site.url).toString();

// Home › Page breadcrumb, so search results show "shivamvyas.in › Projects".
export function breadcrumb(name: string, path: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: site.name, item: absolute("/") },
      { "@type": "ListItem", position: 2, name, item: absolute(path) },
    ],
  };
}
