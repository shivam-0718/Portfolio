import type { Metadata } from "next";
import { absolute, breadcrumb, JsonLd, personId } from "@/components/json-ld";
import { PageHeading } from "@/components/page-heading";
import { ProjectsTable } from "@/components/projects-table";
import { projects, projectUrl } from "@/content/projects";
import { getRepoStats } from "@/lib/github";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Shivam Vyas's software projects on GitHub: Spring Boot REST APIs, a tours and travels backend, Java data structures and algorithms, and this Next.js portfolio.",
  path: "/projects/",
});

export const revalidate = 86400;

export default async function ProjectsPage() {
  const stats = await Promise.all(projects.map(getRepoStats));
  // Most recently updated first. Projects GitHub couldn't date keep their content/ order, at the end.
  const rows = projects
    .map((project, i) => ({ project, stats: stats[i] }))
    .sort((a, b) => (b.stats.updated ?? "").localeCompare(a.stats.updated ?? ""));

  // Every project is listed here, whatever page or filter the visitor is on.
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumb("Projects", "/projects/"),
      {
        "@type": "ItemList",
        name: "Projects by Shivam Vyas",
        url: absolute("/projects/"),
        numberOfItems: rows.length,
        itemListElement: rows.map(({ project, stats }, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "SoftwareSourceCode",
            name: project.name,
            description: project.description,
            codeRepository: projectUrl(project),
            programmingLanguage: stats.languages.map((language) => language.name),
            keywords: project.stack.join(", "),
            ...(stats.updated && { dateModified: stats.updated }),
            creativeWorkStatus: project.inProgress ? "In progress" : "Completed",
            author: { "@id": personId },
          },
        })),
      },
    ],
  };

  return (
    <section aria-labelledby="projects-heading">
      <JsonLd data={structuredData} />
      <PageHeading id="projects-heading" href="/projects/">
        Projects
      </PageHeading>
      <ProjectsTable rows={rows} />
    </section>
  );
}
