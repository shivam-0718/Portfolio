import { absolute, JsonLd, personId } from "@/components/json-ld";
import { certifications, experience } from "@/content/experience";
import { site, socials } from "@/content/site";
import { skillGroups } from "@/content/skills";

// schema.org JSON-LD on every page: who the site is about (Person) and the site itself (WebSite).
// Search engines and AI answer engines use it to connect the site, profiles and work history
// to one person. Pages add their own nodes (ProfilePage, ItemList, BreadcrumbList) by @id.
export function StructuredData() {
  // Roles and dates only: employer names stay on the visible Experience page, not in metadata.
  const occupations = experience.map((job) => ({
    "@type": "Occupation",
    name: job.role,
    ...(job.end ? { description: `${job.start} to ${job.end}` } : { description: `Since ${job.start}` }),
  }));

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        url: absolute("/"),
        image: absolute(site.photo),
        jobTitle: site.role,
        description: site.description,
        hasOccupation: occupations.map((occupation) => ({ ...occupation, skills: site.skills.join(", ") })),
        knowsAbout: skillGroups.flatMap((group) => group.skills.map((skill) => skill.name)),
        hasCredential: certifications.map((cert) => ({
          "@type": "EducationalOccupationalCredential",
          name: cert.name,
          recognizedBy: { "@type": "Organization", name: cert.issuer },
          url: cert.url,
        })),
        sameAs: [...socials.map((s) => s.href), site.medium],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: absolute("/"),
        name: site.name,
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
    ],
  };

  return <JsonLd data={graph} />;
}
