import { certifications, experience } from "@/content/experience";
import { projects, projectUrl } from "@/content/projects";
import { navItems, site, socials } from "@/content/site";
import { getThoughts, thoughtHref } from "@/content/thoughts";

// /llms.txt (llmstxt.org): a plain-Markdown summary of the site for AI assistants and answer
// engines. Built from the same content/ data as the pages, so it never drifts.
export const dynamic = "force-static";

export function GET() {
  const page = (href: string) => new URL(href, site.url).toString();

  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.name} is a ${site.role} at ${experience[0].company}. Core skills: ${site.skills.join(", ")}.`,
    "",
    "## Pages",
    "",
    ...navItems.map((item) => `- [${item.label}](${page(item.href)})`),
    "",
    "## Experience",
    "",
    ...experience.flatMap((job) => [
      `### ${job.role}, ${job.company} (${job.period})`,
      "",
      ...job.bullets.map((bullet) => `- ${bullet}`),
      "",
    ]),
    "## Certifications",
    "",
    ...certifications.map((cert) => `- [${cert.name}](${cert.url}), ${cert.issuer} (${cert.date})`),
    "",
    "## Projects",
    "",
    ...projects.map(
      (project) =>
        `- [${project.name}](${projectUrl(project)}): ${project.description} Stack: ${project.stack.join(", ")}.${project.inProgress ? " (In progress)" : ""}`,
    ),
    "",
    "## Writing",
    "",
    ...getThoughts().map((thought) => `- [${thought.title}](${thoughtHref(thought)}) (${thought.date})`),
    "",
    "## Profiles",
    "",
    ...socials.map((social) => `- [${social.label}](${social.href})`),
    `- [Medium](${site.medium})`,
    "",
  ];

  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
