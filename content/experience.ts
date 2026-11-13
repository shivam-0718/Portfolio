export type Experience = {
  company: string;
  url: string;
  logo: { src: string; width: number; height: number };
  role: string;
  period: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    company: "Techwave",
    url: "https://www.techwave.com",
    logo: { src: "/assets/logos/techwave.png", width: 1024, height: 215 },
    role: "Senior Software Engineer",
    period: "Nov 2025 – Present",
    bullets: [
      "Building high-volume, event-driven backend systems using Java 8/17 and Spring Boot microservices.",
      "Working across fintech payment domains including FPS, SWIFT MT103, and cross-border GBP payment flows.",
      "Designing and implementing debit/credit transaction flows with accurate reconciliation.",
      "Developing Spring Boot services backed by DB2, SQL, and Hibernate for reliable data persistence.",
      "Investigating and resolving end-to-end transaction flow issues across distributed systems in production.",
      "Contributing to LLD, HLD, and feature design; writing unit and integration tests using JUnit and Karate.",
      "Automating CI/CD pipelines via Jenkins, GitHub Actions, and GitHub Workflows.",
      "Actively participating in tech discussions and upskilling across cutting-edge domains including Agentic AI, ML, Blockchain, and Fintech.",
    ],
  },
  {
    company: "Infosys",
    url: "https://www.infosys.com",
    logo: { src: "/assets/logos/infosys.svg", width: 48, height: 20 },
    role: "Senior Systems Engineer",
    period: "Nov 2022 – Oct 2025",
    bullets: [
      "Built scalable enterprise applications using Java, Python, C#, and SQL, delivering solutions aligned with client requirements.",
      "Developed Spring Boot microservices and RESTful APIs powering high-throughput backend systems.",
      "Contributed to enterprise-scale backend systems, focusing on reliability and transaction integrity.",
      "Managed MySQL database migrations and performed data validation across production environments.",
      "Conducted security audits, vulnerability assessments, and patch management to strengthen IT system security.",
      "Resolved complex technical issues across enterprise development environments, maintaining quality standards.",
    ],
  },
];
