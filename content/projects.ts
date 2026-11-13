// `started` is the date of the first commit (for a folder, the first commit touching it).
// Stars, last update and language are fetched live from GitHub (lib/github.ts); `language`
// here is only the fallback when GitHub can't be reached.
export type Project = {
  name: string;
  repo: string;
  path?: string;
  description: string;
  stack: string;
  language: string;
  started: string;
  inProgress?: boolean;
};

export const projects: Project[] = [
  {
    name: "Portfolio",
    repo: "shivam-0718/Portfolio",
    description: "This website: Next.js, Tailwind and ui-sdk, with an agent-ready UI.",
    stack: "Next.js · TypeScript",
    language: "TypeScript",
    started: "2026-05-07",
    inProgress: true,
  },
  {
    name: "Tours & Travels Backend",
    repo: "shivam-0718/tours-and-travels-backend",
    description: "Backend service for a tours and travels booking platform.",
    stack: "Spring Boot",
    language: "Java",
    started: "2026-11-05",
    inProgress: true,
  },
  {
    name: "Spring Boot Projects",
    repo: "shivam-0718/SpringBoot-Projects",
    description: "Hands-on Spring Boot projects: Spring MVC, Data JPA, REST and Spring AI.",
    stack: "Spring Boot · Spring AI",
    language: "Java",
    started: "2026-10-10",
  },
  {
    name: "Striver A2Z DSA",
    repo: "shivam-0718/Strivers_A2Z_DSA",
    description: "Java solutions to Striver’s A2Z DSA course, from LeetCode, GFG and more.",
    stack: "DSA",
    language: "Java",
    started: "2026-09-12",
  },
  {
    name: "Email Consultation",
    repo: "shivam-0718/EmailConsultation",
    description: "Sends notification and confirmation emails with Spring Boot and Spring Email.",
    stack: "Spring Boot · Spring Email",
    language: "Java",
    started: "2025-09-11",
  },
  {
    name: "Registration Web App",
    repo: "shivam-0718/Java_Projects",
    path: "Java/Servlets/RegistrationWebApp",
    description: "User registration and login built on the MVC pattern.",
    stack: "Servlets · JSP · JDBC",
    language: "Java",
    started: "2025-06-08",
  },
  {
    name: "ToDoList",
    repo: "shivam-0718/Java_Projects",
    path: "Java/JDBC/ToDoList",
    description: "Console to-do manager doing CRUD against a relational database.",
    stack: "JDBC",
    language: "Java",
    started: "2025-03-22",
  },
  {
    name: "Task Checker",
    repo: "shivam-0718/Java_Projects",
    path: "Java/Hibernate/TaskChecker",
    description: "Console task manager using Hibernate ORM over MySQL.",
    stack: "Hibernate · MySQL",
    language: "Java",
    started: "2025-03-22",
  },
];

export function projectUrl(project: Project) {
  return project.path
    ? `https://github.com/${project.repo}/tree/main/${project.path}`
    : `https://github.com/${project.repo}`;
}
