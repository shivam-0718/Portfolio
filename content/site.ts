export const site = {
  name: "Shivam Vyas",
  role: "Senior Software Engineer",
  url: "https://www.shivamvyas.in",
  description:
    "Senior Software Engineer with 4+ years building backend systems in Java and Spring Boot, now working with Spring AI, LangChain4j and agentic AI.",
  // Used by the share card, structured data (knowsAbout) and llms.txt. Most important first.
  skills: ["Java", "Spring Boot", "Microservices", "REST APIs", "Spring AI", "LangChain4j", "Agentic AI"],
  // Public profiles that are also me: socials below plus writing.
  medium: "https://medium.com/@svyas.1870",
  photo: "/images/profile.jpeg",
} as const;

import { BriefcaseBusiness, FolderGit2, type LucideIcon, NotebookPen, UserRound } from "lucide-react";

export type NavItem = { href: string; label: string; icon: LucideIcon };

export const navItems: NavItem[] = [
  { href: "/", label: "About me", icon: UserRound },
  { href: "/experience/", label: "Experience", icon: BriefcaseBusiness },
  { href: "/thoughts/", label: "Thoughts", icon: NotebookPen },
  { href: "/projects/", label: "Projects", icon: FolderGit2 },
];

export const navIcon = (href: string) => navItems.find((item) => item.href === href)!.icon;

// public/resume.pdf must be the copy WITHOUT the phone number: everything in public/ is downloadable.
export const resume = { href: "/resume.pdf", fileName: "Shivam-Vyas-Resume.pdf" } as const;

export type SocialName ="LinkedIn" | "GitHub" | "X";

export type Social = { name: SocialName; label: string; href: string };

export const socials: Social[] = [
  { name: "LinkedIn", label: "LinkedIn", href: "https://linkedin.com/in/shivam-vyas-1807" },
  { name: "GitHub", label: "GitHub", href: "https://github.com/shivam-0718" },
  { name: "X", label: "X / Twitter", href: "https://x.com/s1807v" },
];
