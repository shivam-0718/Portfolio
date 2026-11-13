import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import { PageHeading } from "@/components/page-heading";
import { experience } from "@/content/experience";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Experience",
  description:
    "Shivam Vyas's work history — Senior Software Engineer with 4 years in fintech and payments, Java, Spring Boot.",
  path: "/experience/",
});

export default function ExperiencePage() {
  return (
    <section aria-labelledby="experience-heading">
      <PageHeading id="experience-heading" href="/experience/">
        Experience
      </PageHeading>
      <ol className="flex flex-col gap-10">
        {experience.map((job) => (
          <li key={job.company}>
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${job.company} (opens in new tab)`}
              className="mb-4 inline-block leading-none transition-opacity hover:opacity-70"
            >
              <Image
                src={job.logo.src}
                alt={job.company}
                width={job.logo.width}
                height={job.logo.height}
                className="logo-invert h-5 w-auto"
              />
            </a>
            <p className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[0.95rem]">
              <strong className="font-semibold">{job.role}</strong>
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.82rem] text-muted-foreground tabular-nums">
                <CalendarDays aria-hidden="true" strokeWidth={1.75} className="size-3.5" />
                {job.period}
              </span>
            </p>
            <ul className="flex list-disc flex-col gap-1.5 pl-[1.1rem] text-[0.95rem] leading-[1.7] marker:text-muted-foreground">
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
