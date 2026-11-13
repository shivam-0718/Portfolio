import type { Metadata } from "next";
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
      <h1 id="projects-heading" className="mb-6 text-[1.1rem] font-semibold">
        Projects
      </h1>
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
      <ul className="flex list-disc flex-col gap-2.5 pl-5 text-[0.92rem] marker:text-muted">
        {projects.map((project) => (
          <li key={project.url}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} (opens in new tab)`}
              className="inline-link"
            >
              {project.title}
            </a>
            {project.tech && <span className="ml-1.5 font-mono text-[0.75rem] whitespace-nowrap text-muted">{project.tech}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}
