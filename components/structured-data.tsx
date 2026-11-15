import { experience } from "@/content/experience";
import { site, socials } from "@/content/site";

// schema.org JSON-LD on every page. Search engines and AI answer engines read it to tell
// who the site is about. One Person node, referenced by @id from the WebSite and ProfilePage.
export function StructuredData() {
  const personId = `${site.url}/#person`;
  const [current, ...previous] = experience;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        url: `${site.url}/`,
        image: new URL(site.photo, site.url).toString(),
        jobTitle: site.role,
        description: site.description,
        worksFor: { "@type": "Organization", name: current.company, url: current.url },
        alumniOf: previous.map((job) => ({ "@type": "Organization", name: job.company, url: job.url })),
        knowsAbout: site.skills,
        sameAs: [...socials.map((s) => s.href), site.medium],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: `${site.url}/`,
        name: site.name,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${site.url}/#profile`,
        url: `${site.url}/`,
        name: site.name,
        isPartOf: { "@id": `${site.url}/#website` },
        mainEntity: { "@id": personId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
