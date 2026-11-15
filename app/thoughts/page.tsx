import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
import { getThoughts, thoughtHref } from "@/content/thoughts";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Thoughts",
  description: "Writing by Shivam Vyas on backend engineering and generative AI, including the Generative AI Decoded series.",
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
              <li key={href}>
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
          })}
        </ul>
      )}
    </section>
  );
}
