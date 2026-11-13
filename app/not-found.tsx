import { ArrowLeft, SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-heading">
      <h1 id="not-found-heading" className="mb-4 flex items-center gap-2 text-[1.1rem] font-semibold">
        <SearchX aria-hidden="true" strokeWidth={1.75} className="size-[1.1rem] text-link" />
        Page not found
      </h1>
      <p className="mb-5 text-[0.95rem]">That page doesn’t exist.</p>
      <Link href="/" className="group inline-flex items-center gap-1.5 text-[0.92rem] text-foreground hover:text-link">
        <ArrowLeft aria-hidden="true" strokeWidth={1.75} className="size-4 transition-transform group-hover:-translate-x-0.5" />
        Back to the home page
      </Link>
    </section>
  );
}
