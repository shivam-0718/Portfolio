"use client";

import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationList,
  PaginationNext,
  PaginationPrevious,
} from "@ui-sdk/react/pagination";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@ui-sdk/react/tabs";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { capsuleTab } from "@/components/capsule-tab";
import { type Project, projectUrl } from "@/content/projects";
import type { LanguageShare, RepoStats } from "@/lib/github";
import { languageColors } from "@/lib/language-colors";

export type ProjectRowData = { project: Project; stats: RepoStats };

const PAGE_SIZE = 5;

const filters = [
  { value: "all", label: "All", match: () => true },
  { value: "in-progress", label: "In progress", match: (p: Project) => Boolean(p.inProgress) },
  { value: "completed", label: "Completed", match: (p: Project) => !p.inProgress },
] as const;

type Filter = (typeof filters)[number]["value"];

const isFilter = (value: string | null): value is Filter => filters.some((f) => f.value === value);

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

function ProjectRow({ project, stats }: ProjectRowData) {
  return (
    <tr className="border-b border-border align-top last:border-b-0">
      <td className="py-4 pr-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <a
            href={projectUrl(project)}
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

function Table({ rows }: { rows: ProjectRowData[] }) {
  return (
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
          {rows.map((row) => (
            <ProjectRow key={projectUrl(row.project)} {...row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const pageButton =
  "flex h-8 min-w-8 cursor-pointer items-center justify-center rounded-lg border border-border px-2 text-[0.8rem] tabular-nums text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground data-current:border-link data-current:bg-link data-current:text-primary-foreground data-disabled:cursor-default data-disabled:opacity-40 data-disabled:hover:bg-transparent";

// Keeps ?status= and ?page= in the address bar without a navigation, so links open the same view.
function saveToUrl(filter: Filter, page: number) {
  const url = new URL(location.href);
  if (filter === "all") url.searchParams.delete("status");
  else url.searchParams.set("status", filter);
  if (page === 1) url.searchParams.delete("page");
  else url.searchParams.set("page", String(page));
  history.replaceState(history.state, "", url);
}

export function ProjectsTable({ rows }: { rows: ProjectRowData[] }) {
  // The server renders "All", page 1; the URL is applied after hydration.
  const [filter, setFilter] = useState<Filter>("all");
  const [page, setPage] = useState(1);
  const top = useRef<HTMLDivElement>(null);

  const counts = Object.fromEntries(filters.map((f) => [f.value, rows.filter((r) => f.match(r.project)).length]));

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    const nextFilter = isFilter(status) ? status : "all";
    const total = rows.filter((r) => filters.find((f) => f.value === nextFilter)!.match(r.project)).length;
    const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const requested = Number.parseInt(params.get("page") ?? "1", 10);
    setFilter(nextFilter);
    setPage(Number.isFinite(requested) ? Math.min(Math.max(requested, 1), pageCount) : 1);
  }, [rows]);

  function changePage(next: number) {
    setPage(next);
    saveToUrl(filter, next);
    // On a long page (phones), bring the top of the list back into view.
    const box = top.current?.getBoundingClientRect();
    if (box && box.top < 0) top.current?.scrollIntoView({ block: "start" });
  }

  function changeFilter(next: Filter) {
    setFilter(next);
    setPage(1);
    saveToUrl(next, 1);
  }

  return (
    <Tabs value={filter} onValueChange={(value) => isFilter(value) && changeFilter(value)}>
      <div ref={top} className="scroll-mt-24">
        <TabsList aria-label="Filter projects" className="mb-4 flex flex-wrap gap-2">
          {filters.map((f) => (
            <TabsTab
              key={f.value}
              value={f.value}
              className={capsuleTab}
            >
              {f.label}
              <span className="tabular-nums opacity-75">{counts[f.value]}</span>
            </TabsTab>
          ))}
        </TabsList>
      </div>

      {filters.map((f) => {
        const matching = rows.filter((r) => f.match(r.project));
        const pageCount = Math.max(1, Math.ceil(matching.length / PAGE_SIZE));
        const current = Math.min(page, pageCount);
        return (
          <TabsPanel key={f.value} value={f.value}>
            {matching.length === 0 ? (
              <p className="border border-border px-4 py-8 text-center text-[0.9rem] text-muted-foreground">
                Nothing here yet.
              </p>
            ) : (
              <Table rows={matching.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)} />
            )}

            {pageCount > 1 && (
              <Pagination
                aria-label={`${f.label} projects pages`}
                pageCount={pageCount}
                page={current}
                onPageChange={changePage}
                className="mt-4 flex justify-center"
              >
                <PaginationList className="flex items-center gap-1.5">
                  {({ items }) => (
                    <>
                      <PaginationItem>
                        <PaginationPrevious className={pageButton}>
                          <ChevronLeftIcon aria-hidden="true" strokeWidth={1.75} className="size-4" />
                          <span className="sr-only">Previous page</span>
                        </PaginationPrevious>
                      </PaginationItem>
                      {items.map((item) => (
                        <PaginationItem key={item}>
                          {typeof item === "number" ? (
                            <PaginationLink page={item} className={pageButton} />
                          ) : (
                            <PaginationEllipsis className="px-1 text-muted-foreground">…</PaginationEllipsis>
                          )}
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext className={pageButton}>
                          <span className="sr-only">Next page</span>
                          <ChevronRightIcon aria-hidden="true" strokeWidth={1.75} className="size-4" />
                        </PaginationNext>
                      </PaginationItem>
                    </>
                  )}
                </PaginationList>
              </Pagination>
            )}
          </TabsPanel>
        );
      })}
    </Tabs>
  );
}
