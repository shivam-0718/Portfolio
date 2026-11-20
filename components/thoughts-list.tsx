"use client";

import { Tabs, TabsList, TabsPanel, TabsTab } from "@ui-sdk/react/tabs";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { capsuleTab, saveParam } from "@/components/capsule-tab";
import { type Thought, thoughtHref } from "@/content/thoughts";

const filters = [
  { value: "all", label: "All", match: () => true, empty: "Nothing here yet." },
  {
    value: "technology",
    label: "Technology",
    match: (t: Thought) => t.category === "technology",
    empty: "Nothing here yet.",
  },
  {
    value: "reflections",
    label: "Reflections",
    match: (t: Thought) => t.category === "reflection",
    empty: "Personal writing, coming soon.",
  },
] as const;

type Filter = (typeof filters)[number]["value"];

const isFilter = (value: string | null): value is Filter => filters.some((f) => f.value === value);

const dateFormat = new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "short", day: "2-digit", timeZone: "UTC" });

function ThoughtRow({ thought }: { thought: Thought }) {
  const href = thoughtHref(thought);
  const external = thought.kind === "external";
  // shud.in style: the whole row is the link, and the leader dots stay faint until hover.
  const row = (
    <>
      <span className="inline-flex items-baseline gap-1 text-foreground transition-colors group-hover:text-link">
        {thought.title}
        {external && (
          <ArrowUpRight
            aria-hidden="true"
            strokeWidth={1.75}
            className="size-3.5 shrink-0 translate-y-0.5 text-muted-foreground transition-[color,translate] group-hover:translate-x-0.5 group-hover:text-link"
          />
        )}
      </span>
      <span
        aria-hidden="true"
        className="hidden min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-muted-foreground/20 transition-colors group-hover:border-muted-foreground/60 sm:block"
      />
      <time
        dateTime={thought.date}
        className="shrink-0 font-mono text-[0.78rem] text-muted-foreground tabular-nums transition-colors group-hover:text-foreground"
      >
        {dateFormat.format(new Date(thought.date))}
      </time>
    </>
  );
  const className = "group flex flex-col gap-0.5 text-[0.92rem] sm:flex-row sm:items-baseline sm:gap-2";
  return (
    <li>
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${thought.title} (opens in new tab)`}
          className={className}
        >
          {row}
        </a>
      ) : (
        <Link href={href} className={className}>
          {row}
        </Link>
      )}
    </li>
  );
}

export function ThoughtsList({ thoughts }: { thoughts: Thought[] }) {
  // The server renders "All"; ?category= is applied after hydration.
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const category = new URLSearchParams(location.search).get("category");
    if (isFilter(category)) setFilter(category);
  }, []);

  return (
    <Tabs
      value={filter}
      onValueChange={(value) => {
        if (!isFilter(value)) return;
        setFilter(value);
        saveParam("category", value === "all" ? null : value);
      }}
    >
      <TabsList aria-label="Filter articles" className="mb-5 flex flex-wrap gap-2">
        {filters.map((f) => (
          <TabsTab key={f.value} value={f.value} className={capsuleTab}>
            {f.label}
            <span className="tabular-nums opacity-75">{thoughts.filter(f.match).length}</span>
          </TabsTab>
        ))}
      </TabsList>

      {filters.map((f) => {
        const matching = thoughts.filter(f.match);
        return (
          <TabsPanel key={f.value} value={f.value}>
            {matching.length === 0 ? (
              <p className="text-[0.92rem] text-muted-foreground">{f.empty}</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {matching.map((thought) => (
                  <ThoughtRow key={thoughtHref(thought)} thought={thought} />
                ))}
              </ul>
            )}
          </TabsPanel>
        );
      })}
    </Tabs>
  );
}
