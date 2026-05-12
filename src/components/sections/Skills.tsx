"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Monitor,
  Database,
  Cloud,
  Wrench,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { skills } from "@/data/portfolio";

// ─── Devicon CDN icon map ─────────────────────────────────────
// Icons that are dark/black by default need `invert: true` in dark mode.
const BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const SKILL_ICONS: Record<string, { src: string; invert?: boolean }> = {
  Java:             { src: `${BASE}/java/java-original.svg` },
  JavaScript:       { src: `${BASE}/javascript/javascript-original.svg` },
  TypeScript:       { src: `${BASE}/typescript/typescript-original.svg` },
  Python:           { src: `${BASE}/python/python-original.svg` },
  "Spring Boot":    { src: `${BASE}/spring/spring-original.svg` },
  Quarkus:          { src: `${BASE}/quarkus/quarkus-original.svg` },
  "Node.js":        { src: `${BASE}/nodejs/nodejs-original.svg` },
  "Apache Kafka":   { src: `${BASE}/apachekafka/apachekafka-original.svg`, invert: true },
  "React.js":       { src: `${BASE}/react/react-original.svg` },
  HTML5:            { src: `${BASE}/html5/html5-original.svg` },
  CSS3:             { src: `${BASE}/css3/css3-original.svg` },
  "Tailwind CSS":   { src: `${BASE}/tailwindcss/tailwindcss-original.svg` },
  PostgreSQL:       { src: `${BASE}/postgresql/postgresql-original.svg` },
  MySQL:            { src: `${BASE}/mysql/mysql-original.svg` },
  AWS:              { src: `${BASE}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
  Docker:           { src: `${BASE}/docker/docker-original.svg` },
  Kubernetes:       { src: `${BASE}/kubernetes/kubernetes-plain.svg` },
  "GitHub Actions": { src: `${BASE}/github/github-original.svg`, invert: true },
  Linux:            { src: `${BASE}/linux/linux-original.svg` },
  Git:              { src: `${BASE}/git/git-original.svg` },
  Maven:            { src: `${BASE}/maven/maven-original.svg`, invert: true },
  Postman:          { src: `${BASE}/postman/postman-original.svg` },
  "IntelliJ IDEA":  { src: `${BASE}/intellijidea/intellijidea-original.svg` },
};

// ─── Category metadata ────────────────────────────────────────
const CATEGORY_META: Record<
  string,
  { icon: React.ElementType; color: string }
> = {
  Languages:        { icon: Code2,     color: "text-violet-400" },
  Backend:          { icon: Server,    color: "text-emerald-400" },
  Frontend:         { icon: Monitor,   color: "text-sky-400" },
  Databases:        { icon: Database,  color: "text-amber-400" },
  "Cloud & DevOps": { icon: Cloud,     color: "text-orange-400" },
  "Tools & Testing":{ icon: Wrench,    color: "text-rose-400" },
  Concepts:         { icon: Lightbulb, color: "text-[var(--cyan)]" },
};

// ─── Animation variants ───────────────────────────────────────
const EASE = [0.25, 0.4, 0.25, 1] as const;

const sectionFade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const cardStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
};

const cardItem = {
  hidden: { opacity: 0, scale: 0.88, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE },
  },
};

// ─── Skill icon (devicon or letter fallback) ──────────────────
function SkillIcon({ name }: { name: string }) {
  const [failed, setFailed] = useState(false);
  const icon = SKILL_ICONS[name];

  if (!icon || failed) {
    const initials = name
      .split(/[\s.]/)[0]
      .slice(0, 2)
      .toUpperCase();
    return (
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[var(--cyan)]/10 font-mono text-[10px] font-bold text-[var(--cyan)]">
        {initials}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={icon.src}
      alt=""
      width={28}
      height={28}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn(
        "h-7 w-7 shrink-0 object-contain",
        icon.invert && "brightness-0 invert opacity-75"
      )}
    />
  );
}

// ─── Single skill card ────────────────────────────────────────
function SkillCard({ name }: { name: string }) {
  return (
    <motion.div
      variants={cardItem}
      whileHover={{ scale: 1.06, y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group flex cursor-default items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3.5 py-2.5 backdrop-blur-sm transition-colors duration-300 hover:border-[var(--cyan)]/30 hover:bg-white/[0.06] hover:shadow-[0_0_18px_rgba(0,217,255,0.09)]"
    >
      <SkillIcon name={name} />
      <span className="whitespace-nowrap text-sm font-medium text-foreground/80 transition-colors duration-200 group-hover:text-foreground">
        {name}
      </span>
    </motion.div>
  );
}

// ─── Category block ───────────────────────────────────────────
function CategoryBlock({
  category,
  items,
}: {
  category: string;
  items: string[];
}) {
  const meta = CATEGORY_META[category] ?? {
    icon: Lightbulb,
    color: "text-muted-foreground",
  };
  const Icon = meta.icon;

  return (
    <motion.div
      variants={sectionFade}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="flex flex-col gap-4"
    >
      {/* Category header */}
      <div className="flex items-center gap-2">
        <span className={cn("flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.04]", meta.color)}>
          <Icon className="h-3.5 w-3.5" />
        </span>
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {category}
        </h3>
        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
      </div>

      {/* Cards */}
      <motion.div
        variants={cardStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="flex flex-wrap gap-2.5"
      >
        {items.map((skill) => (
          <SkillCard key={skill} name={skill} />
        ))}
      </motion.div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────
export function SkillsSection() {
  const categories = Object.entries(skills) as [string, string[]][];

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 flex items-end justify-end overflow-hidden"
      >
        <div className="h-[500px] w-[500px] translate-x-1/4 translate-y-1/4 rounded-full bg-blue-600/[0.05] blur-[120px]" />
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
          <span className="mb-3 inline-block font-mono text-sm tracking-[0.2em] text-[var(--cyan)] uppercase">
            Skills
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Tech Stack
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Technologies I use to build reliable, scalable software — from
            backend services to cloud infrastructure.
          </p>
          <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent" />
        </motion.div>

        {/* ── Category grid ── */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {categories.map(([category, items]) => (
            <CategoryBlock key={category} category={category} items={items} />
          ))}
        </div>
      </div>
    </section>
  );
}
