import { type Skill, skillGroups } from "@/content/skills";

function SkillLogo({ skill }: { skill: Skill }) {
  if (!skill.icon) return null;
  const ext = skill.ext ?? "svg";
  const common = { alt: "", width: 18, height: 18, loading: "lazy" as const, decoding: "async" as const };
  if (!skill.themed) {
    return <img {...common} src={`/skills/${skill.icon}.${ext}`} className="size-[18px] shrink-0" />;
  }
  // Both variants are in the markup; the hidden one is never fetched because it's lazy and display:none.
  return (
    <>
      <img {...common} src={`/skills/${skill.icon}-light.${ext}`} className="size-[18px] shrink-0 dark:hidden" />
      <img {...common} src={`/skills/${skill.icon}-dark.${ext}`} className="hidden size-[18px] shrink-0 dark:block" />
    </>
  );
}

export function Skills() {
  return (
    <div className="mt-10">
      <h2 id="skills-heading" className="mb-4 text-[1.1rem] font-semibold">
        Skills
      </h2>
      <dl className="flex flex-col gap-4 md:gap-3">
        {skillGroups.map((group) => (
          <div key={group.label} className="flex flex-col gap-2 md:flex-row md:items-start md:gap-4">
            <dt className="text-[0.72rem] font-medium tracking-[0.04em] text-muted-foreground uppercase md:w-36 md:shrink-0 md:pt-1.5">
              {group.label}
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className={`inline-flex min-h-[28px] items-center gap-1.5 rounded-full border border-border bg-card py-1 pr-3 text-[0.8rem] leading-none font-medium text-card-foreground ${skill.icon ? "pl-1.5" : "pl-3"}`}
                  >
                    <SkillLogo skill={skill} />
                    {skill.name}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
