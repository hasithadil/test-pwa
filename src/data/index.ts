import type { Project, Skill } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "Project One",
    description: "A short description of the project.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    featured: true,
  },
];

export const SKILLS: Skill[] = [
  { name: "TypeScript", category: "languages", level: "expert" },
  { name: "React", category: "frontend", level: "expert" },
  { name: "Next.js", category: "frontend", level: "advanced" },
  { name: "Node.js", category: "backend", level: "advanced" },
  { name: "Tailwind CSS", category: "frontend", level: "expert" },
  { name: "PostgreSQL", category: "backend", level: "intermediate" },
  { name: "Docker", category: "devops", level: "intermediate" },
  { name: "Git", category: "tools", level: "expert" },
];
