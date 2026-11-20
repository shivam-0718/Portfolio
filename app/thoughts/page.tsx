import type { Metadata } from "next";
import { absolute, breadcrumb, JsonLd, personId } from "@/components/json-ld";
import { PageHeading } from "@/components/page-heading";
import { ThoughtsList } from "@/components/thoughts-list";
import { getThoughts, thoughtHref } from "@/content/thoughts";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Thoughts",
  description:
    "Articles by Shivam Vyas, a software engineer, on backend engineering with Java and Spring Boot, software engineering, generative AI and its Java ecosystem, and technology in general, plus personal reflections.",
  path: "/thoughts/",
});

export default function ThoughtsPage() {
  const thoughts = getThoughts();

  return (
    <section aria-labelledby="thoughts-heading">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumb("Thoughts", "/thoughts/"),
            {
              "@type": "ItemList",
              name: "Articles by Shivam Vyas",
              url: absolute("/thoughts/"),
              numberOfItems: thoughts.length,
              itemListElement: thoughts.map((thought, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "BlogPosting",
                  headline: thought.title,
                  articleSection: thought.category === "technology" ? "Technology" : "Reflections",
                  datePublished: thought.date,
                  url: thought.kind === "external" ? thought.url : absolute(thoughtHref(thought)),
                  author: { "@id": personId },
                },
              })),
            },
          ],
        }}
      />
      <PageHeading id="thoughts-heading" href="/thoughts/">
        Thoughts
      </PageHeading>
      <ThoughtsList thoughts={thoughts} />
    </section>
  );
}
