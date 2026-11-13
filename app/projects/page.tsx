import { Star } from "lucide-react";
import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { type Project, projects, projectUrl } from "@/content/projects";
import { socials } from "@/content/site";
import { getRepoStats, languageColors, type RepoStats } from "@/lib/github";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description: "Shivam Vyas's side projects — backend engineering, Java, Spring Boot, and more.",
  path: "/projects/",
});

export const revalidate = 86400;

const github = socials.find((s) => s.name === "GitHub")!;
const monthYear = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });
const fullDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

function Language({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      <span
        aria-hidden="true"
        className="size-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: languageColors[name] ?? "var(--muted-foreground)" }}
      />
      {name}
    </span>
  );
}

function Stars({ count }: { count?: number }) {
  if (count === undefined) return <span className="text-muted-foreground/60">—</span>;
  return (
    <span className="inline-flex items-center gap-1 tabular-nums" aria-label={`${count} ${count === 1 ? "star" : "stars"}`}>
      <Star aria-hidden="true" strokeWidth={1.75} className="size-3.5" />
      {count}
    </span>
  );
}

function Updated({ iso }: { iso?: string }) {
  if (!iso) return <span className="text-muted-foreground/60">—</span>;
  return <time dateTime={iso}>{fullDate.format(new Date(iso))}</time>;
}

function ProjectRow({ project, stats }: { project: Project; stats: RepoStats }) {
  const url = projectUrl(project);
  return (
    <tr className="border-b border-border align-top last:border-b-0">
      <td className="py-4 pr-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} (opens in new tab)`}
            className="font-semibold text-link hover:underline hover:underline-offset-3"
          >
            {project.name}
          </a>
          {project.inProgress && (
            <span className="rounded-lg border border-link/40 px-1.5 text-[0.68rem] leading-[1.4rem] font-medium text-link">
              In progress
            </span>
          )}
        </div>
        <p className="mt-1 text-[0.85rem] leading-relaxed text-muted-foreground">{project.description}</p>
        <p className="mt-1 font-mono text-[0.72rem] text-muted-foreground">{project.stack}</p>

        {/* Below md the side columns are hidden; GitHub's repo-list meta row takes their place. */}
        <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.75rem] text-muted-foreground md:hidden">
          <Language name={stats.language} />
          {stats.stars !== undefined && <Stars count={stats.stars} />}
          <span>
            Started <time dateTime={project.started}>{monthYear.format(new Date(project.started))}</time>
          </span>
          {stats.updated && (
            <span>
              Updated <Updated iso={stats.updated} />
            </span>
          )}
        </div>
      </td>
      <td className="hidden py-4 pr-4 text-[0.8rem] text-muted-foreground md:table-cell">
        <Language name={stats.language} />
      </td>
      <td className="hidden py-4 pr-4 text-[0.8rem] whitespace-nowrap text-muted-foreground tabular-nums md:table-cell">
        <time dateTime={project.started}>{monthYear.format(new Date(project.started))}</time>
      </td>
      <td className="hidden py-4 pr-4 text-[0.8rem] whitespace-nowrap text-muted-foreground tabular-nums md:table-cell">
        <Updated iso={stats.updated} />
      </td>
      <td className="hidden py-4 text-right text-[0.8rem] text-muted-foreground md:table-cell">
        <Stars count={stats.stars} />
      </td>
    </tr>
  );
}

export default async function ProjectsPage() {
  const stats = await Promise.all(projects.map(getRepoStats));

  return (
    <section aria-labelledby="projects-heading">
      <PageHeading id="projects-heading" href="/projects/">
        Projects
      </PageHeading>
      <p className="mb-6 text-[0.95rem] leading-[1.7]">
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

      <div className="border border-border">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Projects with language, start date, last update and GitHub stars</caption>
          <thead className="hidden border-b border-border bg-muted/60 text-[0.72rem] tracking-[0.04em] text-muted-foreground uppercase md:table-header-group">
            <tr>
              <th scope="col" className="py-2.5 pr-4 pl-4 font-medium">
                Project
              </th>
              <th scope="col" className="py-2.5 pr-4 font-medium">
                Language
              </th>
              <th scope="col" className="py-2.5 pr-4 font-medium">
                Started
              </th>
              <th scope="col" className="py-2.5 pr-4 font-medium">
                Updated
              </th>
              <th scope="col" className="py-2.5 pr-4 text-right font-medium">
                <Star aria-hidden="true" strokeWidth={1.75} className="ml-auto size-3.5" />
                <span className="sr-only">Stars</span>
              </th>
            </tr>
          </thead>
          <tbody className="[&_td:first-child]:pl-4 [&_td:last-child]:pr-4">
            {projects.map((project, i) => (
              <ProjectRow key={projectUrl(project)} project={project} stats={stats[i]} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
