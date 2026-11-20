// Mirrors the resume (public/resume.pdf). When the resume changes, update both.
export type Experience = {
  company: string;
  url: string;
  // `className` sets the rendered height. The wordmarks differ in weight and padding,
  // so each one is sized by eye to look the same size as the others.
  logo: { src: string; width: number; height: number; className: string };
  role: string;
  location: string;
  period: string;
  // ISO year-month for structured data; no `end` means current.
  start: string;
  end?: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    company: "Techwave",
    url: "https://www.techwave.com",
    logo: { src: "/assets/logos/techwave.png", width: 1024, height: 215, className: "h-5" },
    role: "Senior Software Engineer",
    location: "Hyderabad, India",
    period: "Nov 2025 – Present",
    start: "2025-11",
    bullets: [
      "Develop high-volume, event-driven backend services in Java and Spring Boot for a banking payments platform.",
      "Own end-to-end feature development for FPS, SWIFT MT103 and cross-border GBP payment flows, from design and implementation through to delivery.",
      "Design debit/credit processing with accurate reconciliation and exception handling across distributed services.",
      "Build high-concurrency data persistence and transaction management on DB2 and SQL with Hibernate/JPA.",
      "Translate business requirements into HLD and feature designs, and back delivered code with JUnit 5 and Karate tests.",
    ],
  },
  {
    company: "Infosys",
    url: "https://www.infosys.com",
    logo: { src: "/assets/logos/infosys.svg", width: 48, height: 20, className: "h-7" },
    role: "Senior Systems Engineer",
    location: "Bengaluru, India",
    period: "Nov 2022 – Oct 2025",
    start: "2022-11",
    end: "2025-10",
    bullets: [
      "Developed Spring Boot microservices and RESTful APIs in Java and SQL for high-throughput enterprise backend systems, focused on reliability and data integrity.",
      "Managed MySQL database migrations and validated data across production environments.",
      "Conducted security audits, vulnerability assessments and patch management for enterprise IT systems.",
      "Diagnosed and resolved complex technical issues across development and testing environments, maintaining code quality and process standards.",
    ],
  },
];

export type Certification = { name: string; issuer: string; date: string; url: string };

// Newest first. `date` is YYYY-MM.
export const certifications: Certification[] = [
  {
    name: "Claude Code in Action",
    issuer: "Anthropic",
    date: "2026-03",
    url: "https://verify.skilljar.com/c/jvh4x2tfhsuo",
  },
  {
    name: "Prompt Engineering with ChatGPT",
    issuer: "DeepLearning.AI",
    date: "2026-03",
    url: "https://learn.deeplearning.ai/accomplishments/0f76d68c-2179-4b1c-8edf-00d56c8f14a2",
  },
  {
    name: "Spring AI and Microservices",
    issuer: "Telusko",
    date: "2025-07",
    url: "https://courses.telusko.com/learn/Spring3-and-Spring-Boot-AI---Live-Course",
  },
  {
    name: "Certified Ethical Hacker (C|EH) v12",
    issuer: "EC-Council",
    date: "2024-12",
    url: "https://aspen.eccouncil.org/VerifyBadge?type=certification&a=uRqtOymgDprTXYQsvZRtwMXE5Mu4Mhm010iY97QSmT4=",
  },
];
