// Languages and last update are fetched live from GitHub (lib/github.ts); `language`
// here is only the fallback when GitHub can't be reached, or for a folder inside a repo.
// `stack` is frameworks and tools: languages come from GitHub, so don't repeat them here.
export type Project = {
  name: string;
  repo: string;
  path?: string;
  description: string;
  stack: string[];
  language: string;
  inProgress?: boolean;
};

export const projects: Project[] = [
  {
    name: "Portfolio",
    repo: "shivam-0718/Portfolio",
    description: "This website: Next.js, Tailwind and ui-sdk, with an agent-ready UI.",
    stack: ["Next.js", "Tailwind", "ui-sdk"],
    language: "TypeScript",
    inProgress: true,
  },
  {
    name: "Tours & Travels Backend",
    repo: "shivam-0718/tours-and-travels-backend",
    description: "Backend service for a tours and travels booking platform.",
    stack: ["Spring Boot"],
    language: "Java",
    inProgress: true,
  },
  {
    name: "Customer Manager",
    repo: "shivam-0718/SpringBoot-Projects",
    path: "CustomerManager",
    description: "REST API for managing customers: CRUD with DTOs, request validation and a global exception handler.",
    stack: ["Spring Boot", "Spring Data JPA", "MySQL"],
    language: "Java",
  },
  {
    name: "Vaccine Manager",
    repo: "shivam-0718/SpringBoot-Projects",
    path: "VaccineManager",
    description: "REST API for vaccines with bulk registration, search filters, dynamic projections and custom JPQL queries.",
    stack: ["Spring Boot", "Spring Data JPA", "MySQL"],
    language: "Java",
  },
  {
    name: "Weather Application",
    repo: "shivam-0718/SpringBoot-Projects",
    path: "Weather",
    description: "REST API that returns the current weather and air quality for a city by calling WeatherAPI.com.",
    stack: ["Spring Boot", "WeatherAPI.com"],
    language: "Java",
  },
  {
    name: "Striver A2Z DSA",
    repo: "shivam-0718/Strivers_A2Z_DSA",
    description: "Java solutions to Striver’s A2Z DSA course, from LeetCode, GFG and more.",
    stack: ["Data Structures", "Algorithms"],
    language: "Java",
    inProgress: true,
  },
  {
    name: "Email Consultation",
    repo: "shivam-0718/EmailConsultation",
    description: "Sends notification and confirmation emails with Spring Boot and Spring Email.",
    stack: ["Spring Boot", "Spring Email"],
    language: "Java",
  },
  {
    name: "Registration Web App",
    repo: "shivam-0718/Java_Projects",
    path: "Java/Servlets/RegistrationWebApp",
    description: "User registration and login built on the MVC pattern.",
    stack: ["Servlets", "JSP", "JDBC"],
    language: "Java",
  },
  {
    name: "ToDoList",
    repo: "shivam-0718/Java_Projects",
    path: "Java/JDBC/ToDoList",
    description: "Console to-do manager doing CRUD against a relational database.",
    stack: ["JDBC"],
    language: "Java",
  },
  {
    name: "Task Checker",
    repo: "shivam-0718/Java_Projects",
    path: "Java/Hibernate/TaskChecker",
    description: "Console task manager using Hibernate ORM over MySQL.",
    stack: ["Hibernate", "MySQL"],
    language: "Java",
  },
];

export function projectUrl(project: Project) {
  return project.path
    ? `https://github.com/${project.repo}/tree/main/${project.path}`
    : `https://github.com/${project.repo}`;
}
