export const site = {
  name: "Shivam Vyas",
  role: "Senior Software Engineer",
  url: "https://www.shivamvyas.in",
  description:
    "Senior Software Engineer with 4+ years building enterprise applications in fintech, with a core domain in Java, Spring Boot and banking payments. Based in Mumbai, India.",
} as const;

export type NavItem = { href: string; label: string };

export const navItems: NavItem[] = [
  { href: "/", label: "About me" },
  { href: "/experience/", label: "Experience" },
  { href: "/thoughts/", label: "Thoughts" },
  { href: "/projects/", label: "Projects" },
];

export type SocialName = "LinkedIn" | "GitHub" | "X";

export type Social = { name: SocialName; label: string; href: string };

export const socials: Social[] = [
  { name: "LinkedIn", label: "LinkedIn", href: "https://linkedin.com/in/shivam-vyas-1807" },
  { name: "GitHub", label: "GitHub", href: "https://github.com/shivam-0718" },
  { name: "X", label: "X / Twitter", href: "https://x.com/s1807v" },
];
