import { certifications, experience } from "@/content/experience";
import { projects, projectUrl } from "@/content/projects";
import { navItems, site, socials } from "@/content/site";
import { skillGroups } from "@/content/skills";
import { getThoughts, thoughtHref } from "@/content/thoughts";

// Builds /llms.txt (a short index) and /llms-full.txt (everything) from the same content/ data
// as the pages, so they never drift. Format: llmstxt.org.
const page = (href: string) => new URL(href, site.url).toString();

export function buildLlms({ full }: { full: boolean }) {
  const [current, ...previous] = experience;

  const intro = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    // Roles and dates only: employer names stay on the visible Experience page.
    `- Current role: ${current.role} (${current.period})`,
    ...previous.map((job) => `- Previously: ${job.role} (${job.period})`),
    `- Core skills: ${site.skills.join(", ")}`,
    `- Website: ${page("/")}`,
    "",
  ];

  const pages = [
    "## Pages",
    "",
    ...navItems.map((item) => `- [${item.label}](${page(item.href)})`),
    `- [Resume (PDF)](${page("/resume.pdf")})`,
    "",
  ];

  const profiles = [
    "## Profiles",
    "",
    ...socials.map((social) => `- [${social.label}](${social.href})`),
    `- [Medium](${site.medium})`,
    "",
  ];

  if (!full) {
    return [
      ...intro,
      ...pages,
      ...profiles,
      "## Optional",
      "",
      `- [Full details](${page("/llms-full.txt")}): experience, skills, certifications, projects and articles in one file`,
      "",
    ].join("\n");
  }

  return [
    ...intro,
    "## Experience",
    "",
    ...experience.flatMap((job) => [
      `### ${job.role} (${job.period})`,
      "",
      ...job.bullets.map((bullet) => `- ${bullet}`),
      "",
    ]),
    "## Skills",
    "",
    ...skillGroups.map((group) => `- ${group.label}: ${group.skills.map((skill) => skill.name).join(", ")}`),
    "",
    "## Certifications",
    "",
    ...certifications.map((cert) => `- [${cert.name}](${cert.url}), ${cert.issuer} (${cert.date})`),
    "",
    "## Projects",
    "",
    ...projects.map(
      (project) =>
        `- [${project.name}](${projectUrl(project)}) (${project.inProgress ? "in progress" : "completed"}): ${project.description} Stack: ${project.stack.join(", ")}.`,
    ),
    "",
    "## Articles",
    "",
    ...getThoughts().map(
      (thought) => `- [${thought.title}](${thoughtHref(thought)}) (${thought.category}, ${thought.date})`,
    ),
    "",
    ...pages,
    ...profiles,
  ].join("\n");
}

export const textResponse = (body: string) =>
  new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
