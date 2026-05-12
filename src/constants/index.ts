import type { NavItem, SocialLink } from "@/types";

export const SITE_CONFIG = {
  name: "Hasitha",
  title: "Hasitha | Software Engineer",
  description:
    "Software engineer specializing in building exceptional digital experiences.",
  url: "https://hasitha.dev",
  email: "vpn41685@gmail.com",
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", url: "https://github.com", icon: "Github" },
  { label: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
  { label: "Twitter", url: "https://twitter.com", icon: "Twitter" },
];
