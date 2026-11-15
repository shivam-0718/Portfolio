import type { Project } from "@/content/projects";

// `percent` is missing for the fallback (GitHub unreachable, or a folder inside a repo).
export type LanguageShare = { name: string; percent?: number };

export type RepoStats = {
  languages: LanguageShare[];
  updated?: string;
};

// GitHub's own linguist colours, so the dots match what visitors see on GitHub.
export const languageColors: Record<string, string> = {
  Java: "#b07219",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#663399",
  Python: "#3572a5",
};

const ONE_DAY = 60 * 60 * 24;

async function gh<T>(path: string): Promise<T | undefined> {
  try {
    const res = await fetch(`https://api.github.com/${path}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "shivamvyas.in",
        // Optional: unauthenticated builds share 60 requests/hour per IP.
        ...(process.env.GITHUB_TOKEN && { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }),
      },
      next: { revalidate: ONE_DAY },
    });
    return res.ok ? ((await res.json()) as T) : undefined;
  } catch {
    return undefined;
  }
}

type Repo = { pushed_at: string };
type Commit = { commit: { committer: { date: string } } };

// GitHub returns bytes per language; turn them into shares like the bar on a repo page.
function toShares(bytes: Record<string, number> | undefined): LanguageShare[] | undefined {
  const entries = Object.entries(bytes ?? {});
  const total = entries.reduce((sum, [, n]) => sum + n, 0);
  if (!total) return undefined;
  return entries
    .sort(([, a], [, b]) => b - a)
    .map(([name, n]) => ({ name, percent: (n / total) * 100 }));
}

export async function getRepoStats(project: Project): Promise<RepoStats> {
  const fallback = [{ name: project.language }];

  // GitHub only reports languages per repo, so a folder shows its curated language.
  if (project.path) {
    const commits = await gh<Commit[]>(
      `repos/${project.repo}/commits?path=${encodeURIComponent(project.path)}&per_page=1`,
    );
    return { languages: fallback, updated: commits?.[0]?.commit.committer.date };
  }

  const [repo, languages] = await Promise.all([
    gh<Repo>(`repos/${project.repo}`),
    gh<Record<string, number>>(`repos/${project.repo}/languages`),
  ]);
  return { languages: toShares(languages) ?? fallback, updated: repo?.pushed_at };
}
