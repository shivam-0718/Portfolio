import type { Project } from "@/content/projects";

export type RepoStats = {
  language: string;
  updated?: string;
  stars?: number;
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

type Repo = { language: string | null; stargazers_count: number; pushed_at: string };
type Commit = { commit: { committer: { date: string } } };

export async function getRepoStats(project: Project): Promise<RepoStats> {
  if (project.path) {
    const commits = await gh<Commit[]>(
      `repos/${project.repo}/commits?path=${encodeURIComponent(project.path)}&per_page=1`,
    );
    return { language: project.language, updated: commits?.[0]?.commit.committer.date };
  }

  const repo = await gh<Repo>(`repos/${project.repo}`);
  return {
    language: repo?.language ?? project.language,
    updated: repo?.pushed_at,
    stars: repo?.stargazers_count,
  };
}
