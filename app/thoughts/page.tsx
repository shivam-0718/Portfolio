import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
import { getThoughts, thoughtHref } from "@/content/thoughts";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Thoughts",
  description: "Writing by Shivam Vyas on backend engineering, payments and generative AI.",
  path: "/thoughts/",
});

const dateFormat = new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "short", day: "2-digit", timeZone: "UTC" });

export default function ThoughtsPage() {
  const thoughts = getThoughts();

  return (
    <section aria-labelledby="thoughts-heading">
      <PageHeading id="thoughts-heading" href="/thoughts/">
        Thoughts
      </PageHeading>
      {thoughts.length === 0 ? (
        <p className="text-[0.95rem] text-muted-foreground">Nothing here yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {thoughts.map((thought) => {
            const href = thoughtHref(thought);
            const external = thought.kind === "external";
            const className = "group inline-flex items-baseline gap-1 text-[0.92rem] text-foreground transition-colors hover:text-link";
            return (
              <li key={href} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2">
                {external ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${thought.title} (opens in new tab)`}
                    className={className}
                  >
                    {thought.title}
                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={1.75}
                      className="size-3.5 shrink-0 translate-y-0.5 text-muted-foreground transition-[color,translate] group-hover:translate-x-0.5 group-hover:text-link"
                    />
                  </a>
                ) : (
                  <Link href={href} className={className}>
                    {thought.title}
                  </Link>
                )}
                <span aria-hidden="true" className="hidden min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-muted-foreground/40 sm:block" />
                <time dateTime={thought.date} className="shrink-0 font-mono text-[0.78rem] text-muted-foreground tabular-nums">
                  {dateFormat.format(new Date(thought.date))}
                </time>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
