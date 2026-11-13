import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site, socials } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ path: "/" });

const social = Object.fromEntries(socials.map((s) => [s.name, s]));

function ExternalLink({ name, children }: { name: "GitHub" | "X" | "LinkedIn"; children: React.ReactNode }) {
  const s = social[name];
  return (
    <a
      href={s.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${s.label} (opens in new tab)`}
      className="inline-link"
    >
      {children}
    </a>
  );
}

export default function AboutPage() {
  return (
    <section aria-labelledby="about-heading" className="text-[0.95rem] leading-[1.75]">
      <h1 id="about-heading" className="mb-4 text-[1.75rem] leading-tight font-semibold tracking-tight">
        {site.name}
      </h1>

      <div className="flow-root">
        <p className="mb-3.5">
          I’m a software engineer based in Mumbai, India, with 4 years of experience building enterprise applications —
          mostly in the fintech and payments space.
        </p>

        <div className="mx-auto mt-4 mb-6 w-full max-w-[280px] md:float-right md:mt-0 md:mb-4 md:ml-8 md:w-[220px]">
          <Image
            src="/images/profile.jpeg"
            alt="Shivam Vyas, Senior Software Engineer"
            width={1194}
            height={1600}
            priority
            sizes="(min-width: 768px) 220px, 280px"
            className="h-auto w-full rounded border border-line bg-surface grayscale-[10%]"
          />
        </div>

        <p className="mb-3.5">
          My interest in computers started early — a Windows XP machine at home, hours spent poking around, Winamp in the
          background, playing Pinball, experimenting with everything in sight. Those were fun days. It wasn’t until
          school introduced me to my first lines of HTML that it clicked. Then came C++ in high school, and with it came
          bigger questions: how does a computer actually work? What happens under the hood? That curiosity carried
          through university, where Python and Java pulled me deeper into software engineering and I started thinking
          seriously about how large-scale systems are built.
        </p>
        <p className="mb-3.5">
          Since entering the industry, I have utilized Java and Spring Boot as my primary tools for architecting robust
          backend systems. My early professional years were defined by designing scalable APIs, contributing to
          microservices development, and mastering the rigorous standards required to move code from local environments
          to “production-ready” states.
        </p>
        <p className="mb-3.5">
          Today, as a Senior Software Engineer, my work centers on the banking payments domain and gateway integrations.
          I dedicate my time to translating complex transaction flows into backend systems that are inherently simple,
          reliable, and secure. I find deep satisfaction in this specific problem space, where technical precision is
          critical to the integrity and success of every transaction.
        </p>
        <p>
          You can explore my{" "}
          <Link href="/experience/" className="inline-link">
            background
          </Link>{" "}
          and{" "}
          <Link href="/projects/" className="inline-link">
            projects
          </Link>{" "}
          here, or find me on <ExternalLink name="GitHub">GitHub</ExternalLink>,{" "}
          <ExternalLink name="X">X/Twitter</ExternalLink>, and <ExternalLink name="LinkedIn">LinkedIn</ExternalLink>.
        </p>
      </div>
    </section>
  );
}
