"use client";

import { motion } from "framer-motion";
import { ExternalLink, ChevronRight, Star, Lock } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { projects } from "@/data/portfolio";

// ─── GitHub SVG (removed from lucide-react v0.400+) ──────────
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

// ─── Animation variants ───────────────────────────────────────
const EASE = [0.25, 0.4, 0.25, 1] as const;

const sectionFade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const gridStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

// ─── Project card ─────────────────────────────────────────────
type Project = (typeof projects)[0];

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group flex h-full flex-col"
    >
      <Card
        className={[
          // reset Card defaults that we'll control manually
          "flex h-full flex-col gap-0 py-0",
          // surface + border
          "border-0 bg-[var(--surface)] ring-1 ring-white/[0.07]",
          // hover: glow ring + drop shadow
          "transition-all duration-350",
          "group-hover:ring-[var(--cyan)]/25",
          "group-hover:shadow-[0_12px_40px_rgba(0,217,255,0.09)]",
        ].join(" ")}
      >
        {/* ── Header ── */}
        <CardHeader className="flex flex-col gap-3 border-b border-border/50 px-5 pb-4 pt-5">
          {/* Year + featured pill */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] tracking-widest text-muted-foreground/60">
              {project.year}
            </span>
            {project.featured && (
              <span className="flex items-center gap-1 rounded-full bg-[var(--cyan)]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[var(--cyan)]">
                <Star className="h-2.5 w-2.5 fill-current" />
                Featured
              </span>
            )}
          </div>

          <CardTitle className="text-[1.05rem] font-bold leading-snug text-foreground">
            {project.title}
          </CardTitle>

          <CardDescription className="text-sm leading-relaxed">
            {project.description}
          </CardDescription>
        </CardHeader>

        {/* ── Body: highlights + badges ── */}
        <CardContent className="flex flex-1 flex-col justify-between gap-5 px-5 py-4">
          {/* Highlights */}
          <ul className="space-y-2">
            {project.highlights.slice(0, 3).map((h) => (
              <li
                key={h}
                className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
              >
                <ChevronRight className="mt-[1px] h-3.5 w-3.5 shrink-0 text-[var(--cyan)]/50" />
                {h}
              </li>
            ))}
          </ul>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[var(--cyan)]/20 bg-[var(--cyan)]/[0.07] px-2.5 py-[3px] font-mono text-[11px] font-medium text-[var(--cyan)] transition-colors duration-200 group-hover:border-[var(--cyan)]/35 group-hover:bg-[var(--cyan)]/[0.11]"
              >
                {tech}
              </span>
            ))}
          </div>
        </CardContent>

        {/* ── Footer: links ── */}
        <CardFooter className="flex items-center gap-4 border-t border-border/50 bg-transparent px-5 py-3">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              <GitHubIcon className="h-[15px] w-[15px]" />
              Source Code
            </a>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground/35 italic select-none">
              <Lock className="h-3 w-3" />
              Private
            </span>
          )}

          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex items-center gap-1.5 text-sm text-[var(--cyan)] transition-colors duration-200 hover:text-[var(--cyan-dim)]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live Demo
            </a>
          ) : (
            /* push GitHub link left when no demo */
            <span className="ml-auto" />
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────
export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-0 top-1/2 h-[500px] w-[500px] -translate-x-1/3 -translate-y-1/2 rounded-full bg-[var(--cyan)]/[0.04] blur-[130px]" />
      </div>

      <div className="container mx-auto max-w-6xl px-6">
        {/* ── Section heading ── */}
        <motion.div
          variants={sectionFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block font-mono text-sm tracking-[0.2em] uppercase text-[var(--cyan)]">
            Projects
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Featured Work
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            A selection of projects that highlight my approach to building
            scalable, production-grade software.
          </p>
          <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent" />
        </motion.div>

        {/* ── Cards grid ── */}
        <motion.div
          variants={gridStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
