// Blue capsule filter tabs (ui-sdk TabsTab), shared by Projects and Thoughts.
export const capsuleTab =
  "inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full border border-border px-3.5 text-[0.8rem] font-medium text-muted-foreground transition-colors hover:border-link/60 hover:text-foreground data-selected:border-link data-selected:bg-link data-selected:text-primary-foreground";

// Keeps one query parameter in the address bar without a navigation; `null` (the default view) removes it.
export function saveParam(name: string, value: string | null) {
  const url = new URL(location.href);
  if (value === null) url.searchParams.delete(name);
  else url.searchParams.set(name, value);
  history.replaceState(history.state, "", url);
}
