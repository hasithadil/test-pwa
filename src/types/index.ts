export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "devops" | "tools" | "languages";
  level: "beginner" | "intermediate" | "advanced" | "expert";
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
}
