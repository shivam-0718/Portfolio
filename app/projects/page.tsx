import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { type Project, projects, projectUrl } from "@/content/projects";
import { getRepoStats, type LanguageShare, languageColors, type RepoStats } from "@/lib/github";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Shivam Vyas's projects on GitHub: Spring Boot and Spring AI backends, Java, data structures and algorithms, and this Next.js site.",
  path: "/projects/",
});

export const revalidate = 86400;

const fullDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

// GitHub's style: one decimal, and anything under 0.1% shows as "<0.1%".
function formatPercent(percent: number) {
  return percent < 0.1 ? "<0.1%" : `${percent.toFixed(1)}%`;
}

function Language({ language }: { language: LanguageShare }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      <span
        aria-hidden="true"
        className="size-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: languageColors[language.name] ?? "var(--muted-foreground)" }}
      />
      <span className="text-foreground/85">{language.name}</span>
      {language.percent !== undefined && <span className="tabular-nums">{formatPercent(language.percent)}</span>}
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

        {/* Below md the side columns are hidden; GitHub's repo-list meta rows take their place. */}
        <p className="mt-1 font-mono text-[0.72rem] text-muted-foreground md:hidden">{project.stack.join(" · ")}</p>
        <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.75rem] text-muted-foreground md:hidden">
          {stats.languages.map((language) => (
            <Language key={language.name} language={language} />
          ))}
          {stats.updated && (
            <span>
              Updated <Updated iso={stats.updated} />
            </span>
          )}
        </div>
      </td>
      <td className="hidden py-4 pr-4 md:table-cell">
        <ul className="flex flex-col gap-1 font-mono text-[0.72rem] leading-[1.25rem] whitespace-nowrap text-muted-foreground">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </td>
      <td className="hidden py-4 pr-4 text-[0.8rem] text-muted-foreground md:table-cell">
        <ul className="flex flex-col gap-1 leading-[1.25rem]">
          {stats.languages.map((language) => (
            <li key={language.name}>
              <Language language={language} />
            </li>
          ))}
        </ul>
      </td>
      <td className="hidden py-4 text-[0.8rem] leading-[1.25rem] whitespace-nowrap text-muted-foreground tabular-nums md:table-cell">
        <Updated iso={stats.updated} />
      </td>
    </tr>
  );
}

export default async function ProjectsPage() {
  const stats = await Promise.all(projects.map(getRepoStats));
  // Most recently updated first. Projects GitHub couldn't date keep their content/ order, at the end.
  const rows = projects
    .map((project, i) => ({ project, stats: stats[i] }))
    .sort((a, b) => (b.stats.updated ?? "").localeCompare(a.stats.updated ?? ""));

  return (
    <section aria-labelledby="projects-heading">
      <PageHeading id="projects-heading" href="/projects/">
        Projects
      </PageHeading>
      <div className="border border-border">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Projects with tech stack, languages and last update</caption>
          <thead className="hidden border-b border-border bg-muted/60 text-[0.72rem] tracking-[0.04em] text-muted-foreground uppercase md:table-header-group">
            <tr>
              <th scope="col" className="py-2.5 pr-4 pl-4 font-medium">
                Project
              </th>
              <th scope="col" className="py-2.5 pr-4 font-medium">
                Tech stack
              </th>
              <th scope="col" className="py-2.5 pr-4 font-medium">
                Languages
              </th>
              <th scope="col" className="py-2.5 pr-4 font-medium">
                Updated
              </th>
            </tr>
          </thead>
          <tbody className="[&_td:first-child]:pl-4 [&_td:last-child]:pr-4">
            {rows.map(({ project, stats }) => (
              <ProjectRow key={projectUrl(project)} project={project} stats={stats} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
