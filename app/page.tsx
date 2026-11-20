import type { Metadata } from "next";
import Image from "next/image";
import { absolute, JsonLd, personId } from "@/components/json-ld";
import { Skills } from "@/components/skills";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ path: "/" });

export default function AboutPage() {
  return (
    <section aria-labelledby="about-heading" className="text-[0.95rem] leading-[1.75]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": `${site.url}/#profile`,
          url: absolute("/"),
          name: site.name,
          description: site.description,
          isPartOf: { "@id": `${site.url}/#website` },
          mainEntity: { "@id": personId },
        }}
      />
      <h1 id="about-heading" className="mb-4 text-[1.75rem] leading-tight font-semibold tracking-tight">
        {site.name}
      </h1>

      <div className="flow-root">
        <p className="mb-3.5">
          Hi there <span aria-hidden="true">👋</span> I’m Shivam Vyas, a software engineer with 4 years of experience
          building backend systems in Java and Spring Boot: microservices, REST APIs and transaction-heavy distributed
          systems.
        </p>

        <div className="mx-auto mt-4 mb-6 w-full max-w-[280px] md:float-right md:mt-0 md:mb-4 md:ml-8 md:w-[220px]">
          <Image
            src="/images/profile.jpeg"
            alt="Shivam Vyas, Senior Software Engineer"
            width={900}
            height={1200}
            priority
            sizes="(min-width: 768px) 220px, 280px"
            className="h-auto w-full rounded-lg border border-border bg-muted grayscale-[10%]"
          />
        </div>

        <p className="mb-3.5">
          Computers hooked me early, from a Windows XP machine at home to my first lines of HTML at school and C++ in
          high school. That curiosity followed me to university, where Python and Java pulled me into software for good.
        </p>
        <p className="mb-3.5">
          When I started my career, Java and Spring Boot became my everyday tools. My early years went into designing
          APIs, building microservices and learning what it really takes to get code from a laptop to production.
        </p>
        <p className="mb-3.5">
          Today I own features end to end, from design to delivery: event-driven services, data-heavy workflows and the
          tests that keep them reliable. Lately I’ve been building with Spring AI and LangChain4j, exploring how agentic
          AI fits into backend systems.
        </p>
        <p>Welcome to my corner of the internet. I hope you enjoy looking around.</p>
      </div>

      <Skills />
    </section>
  );
}
