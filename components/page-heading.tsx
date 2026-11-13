import { navIcon } from "@/content/site";

export function PageHeading({ id, href, children }: { id: string; href: string; children: React.ReactNode }) {
  const Icon = navIcon(href);
  return (
    <h1 id={id} className="mb-6 flex items-center gap-2 text-[1.1rem] font-semibold">
      <Icon aria-hidden="true" strokeWidth={1.75} className="size-[1.1rem] shrink-0 text-link" />
      {children}
    </h1>
  );
}
