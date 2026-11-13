import type { Metadata } from "next";
import { GitBranch } from "lucide-react";
import { PageHeading } from "@/components/page-heading";
import { projects } from "@/content/projects";
import { socials } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description: "Shivam Vyas's side projects — backend engineering, Java, Spring Boot, and more.",
  path: "/projects/",
});

const github = socials.find((s) => s.name === "GitHub")!;

export default function ProjectsPage() {
  return (
    <section aria-labelledby="projects-heading">
      <PageHeading id="projects-heading" href="/projects/">
        Projects
      </PageHeading>
      <p className="mb-5 text-[0.95rem] leading-[1.7]">
        My other mini projects (find all of them on{" "}
        <a
          href={github.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub (opens in new tab)"
          className="inline-link"
        >
          GitHub
        </a>
        ):
      </p>
      <ul className="flex flex-col gap-2.5 text-[0.92rem]">
        {projects.map((project) => (
          <li key={project.url} className="flex gap-2.5">
            <GitBranch aria-hidden="true" strokeWidth={1.75} className="mt-[0.3rem] size-3.5 shrink-0 text-muted-foreground" />
            <span>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} (opens in new tab)`}
                className="inline-link"
              >
                {project.title}
              </a>
              {project.tech && (
                <span className="ml-1.5 font-mono text-[0.75rem] whitespace-nowrap text-muted-foreground">{project.tech}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
