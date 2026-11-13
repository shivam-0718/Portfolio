// An external entry links out (e.g. Medium). A hosted entry will render from
// content/thoughts/<slug>.mdx once the blog moves onto the site.
export type Thought =
  | { kind: "external"; title: string; date: string; url: string }
  | { kind: "hosted"; title: string; date: string; slug: string; excerpt: string };

const thoughts: Thought[] = [
  {
    kind: "external",
    title: "Generative AI Decoded | Part 4 of 5",
    date: "2026-11-13",
    url: "https://medium.com/@svyas.1870/generative-ai-decoded-part-4-of-5-f83432d1ab9a",
  },
  {
    kind: "external",
    title: "Generative AI Decoded | Part 3 of 5",
    date: "2026-10-16",
    url: "https://medium.com/@svyas.1870/generative-ai-decoded-part-3-of-5-9ef82e3c0fba",
  },
  {
    kind: "external",
    title: "Generative AI Decoded | Part 2 of 5",
    date: "2026-08-08",
    url: "https://medium.com/@svyas.1870/generative-ai-decoded-part-2-of-5-085c2df71834",
  },
  {
    kind: "external",
    title: "Generative AI Decoded | Part 1 of 5",
    date: "2026-07-12",
    url: "https://medium.com/@svyas.1870/generative-ai-decoded-part-1-of-5-a87884bc7e77",
  },
];

export function getThoughts() {
  return [...thoughts].sort((a, b) => b.date.localeCompare(a.date));
}

export function thoughtHref(thought: Thought) {
  return thought.kind === "external" ? thought.url : `/thoughts/${thought.slug}/`;
}
