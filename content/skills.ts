// Skills shown as capsules on the About page, saved in public/skills/ so nothing loads from a third party.
// Logos: skillicons.dev (github.com/tandpfun/skill-icons, MIT). Where it has none, the same tile style is
// rebuilt from Simple Icons (CC0) or the project's own logo (LangChain4j). No good logo → name-only capsule.
// `icon` is the file name without extension; `themed` icons have -light/-dark variants that follow the site theme.
export type Skill = { name: string; icon?: string; themed?: boolean; ext?: "svg" | "png" };
export type SkillGroup = { label: string; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    skills: [
      { name: "Java", icon: "java", themed: true },
      { name: "Python", icon: "python", themed: true },
      { name: "JavaScript", icon: "javascript" },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Spring Boot", icon: "spring", themed: true },
      { name: "Spring Security", icon: "springsecurity", themed: true },
      { name: "Hibernate", icon: "hibernate", themed: true },
      { name: "Microservices" },
    ],
  },
  {
    label: "AI",
    skills: [
      { name: "Spring AI", icon: "spring", themed: true },
      { name: "LangChain4j", icon: "langchain4j", themed: true, ext: "png" },
      { name: "Google ADK" },
      { name: "Agentic AI" },
    ],
  },
  {
    label: "Data & Messaging",
    skills: [
      { name: "MySQL", icon: "mysql", themed: true },
      { name: "PostgreSQL", icon: "postgresql", themed: true },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Kafka", icon: "kafka" },
      { name: "RabbitMQ", icon: "rabbitmq", themed: true },
    ],
  },
  {
    label: "Testing",
    skills: [
      { name: "JUnit 5", icon: "junit5", themed: true },
      { name: "Mockito" },
      { name: "Karate" },
      { name: "SonarQube", icon: "sonarqube", themed: true },
    ],
  },
  {
    label: "DevOps & Cloud",
    skills: [
      { name: "Docker", icon: "docker" },
      { name: "Kubernetes", icon: "kubernetes" },
      { name: "Jenkins", icon: "jenkins", themed: true },
      { name: "GitHub Actions", icon: "githubactions", themed: true },
      { name: "Maven", icon: "maven", themed: true },
      { name: "Git", icon: "git" },
      { name: "AWS", icon: "aws", themed: true },
      { name: "GCP", icon: "gcp", themed: true },
    ],
  },
  {
    label: "Tools",
    skills: [
      { name: "Postman", icon: "postman" },
      { name: "IntelliJ IDEA", icon: "idea", themed: true },
      { name: "Splunk" },
      { name: "Grafana", icon: "grafana", themed: true },
    ],
  },
];
