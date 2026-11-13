import Link from "next/link";

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-heading">
      <h1 id="not-found-heading" className="mb-4 text-[1.1rem] font-semibold">
        Page not found
      </h1>
      <p className="text-[0.95rem]">
        That page doesn’t exist. Head back to the{" "}
        <Link href="/" className="inline-link">
          home page
        </Link>
        .
      </p>
    </section>
  );
}
