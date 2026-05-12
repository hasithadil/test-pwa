"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, MapPin, Calendar, ChevronRight, Layers } from "lucide-react";
import { experience } from "@/data/portfolio";

// ─── Motion constants ─────────────────────────────────────────
const EASE = [0.25, 0.4, 0.25, 1] as const;

const sectionFade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const cardSlide = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE } },
};

const bulletList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.25 } },
};

const bulletItem = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
};

// ─── Meta chip ────────────────────────────────────────────────
function MetaChip({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--cyan)]/70" />
      {label}
    </span>
  );
}

// ─── Single timeline entry ────────────────────────────────────
type Job = (typeof experience)[0];

function TimelineEntry({ job, isLast }: { job: Job; isLast: boolean }) {
  const isCurrent = job.period.includes("Present");

  return (
    <motion.div
      variants={cardSlide}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={`relative pl-[4.5rem] ${!isLast ? "pb-12" : "pb-2"}`}
    >
      {/* ── Timeline dot ── */}
      <div className="absolute left-[1.35rem] top-7 z-10 flex h-5 w-5 -translate-x-1/2 items-center justify-center">
        {/* Pulse ring for active role */}
        {isCurrent && (
          <span className="absolute h-full w-full animate-ping rounded-full bg-[var(--cyan)]/25" />
        )}
        {/* Outer glow ring */}
        <span className="absolute h-8 w-8 rounded-full bg-[var(--cyan)]/[0.06]" />
        {/* Core dot */}
        <span className="relative h-3.5 w-3.5 rounded-full bg-[var(--cyan)] ring-4 ring-[var(--background)] ring-offset-0" />
      </div>

      {/* ── Card ── */}
      <div className="group rounded-2xl border border-border/60 bg-[var(--surface)] p-6 transition-all duration-300 hover:border-[var(--cyan)]/20 hover:shadow-[0_8px_32px_rgba(0,217,255,0.07)]">

        {/* Header row */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <h3 className="text-lg font-bold leading-tight text-foreground">
                {job.company}
              </h3>
              {isCurrent && (
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Current
                </span>
              )}
            </div>

            <p className="flex items-center gap-1.5 font-medium text-[var(--cyan)]">
              <Briefcase className="h-3.5 w-3.5 shrink-0" />
              {job.role}
            </p>
          </div>

          {/* Period badge */}
          <span className="shrink-0 self-start rounded-lg border border-border/60 bg-[var(--surface-raised)] px-3 py-1 font-mono text-xs text-muted-foreground">
            {job.period}
          </span>
        </div>

        {/* Meta: location */}
        <div className="mb-4 flex flex-wrap gap-4">
          <MetaChip icon={MapPin} label={job.location} />
          <MetaChip icon={Calendar} label={job.period} />
        </div>

        {/* Project badge */}
        <div className="mb-5 flex items-center gap-2">
          <Layers className="h-3.5 w-3.5 shrink-0 text-[var(--cyan)]/60" />
          <span className="rounded-full border border-[var(--cyan)]/20 bg-[var(--cyan)]/[0.07] px-3 py-0.5 font-mono text-[11px] font-medium text-[var(--cyan)]">
            {job.project}
          </span>
        </div>

        {/* Description */}
        <p className="mb-5 leading-relaxed text-muted-foreground">
          {job.description}
        </p>

        {/* Divider */}
        <div className="mb-5 h-px bg-gradient-to-r from-[var(--cyan)]/20 via-border to-transparent" />

        {/* Highlights — 2-col grid on sm+ */}
        <motion.ul
          variants={bulletList}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 gap-2.5 sm:grid-cols-2"
        >
          {job.highlights.map((point) => (
            <motion.li
              key={point}
              variants={bulletItem}
              className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
            >
              <ChevronRight className="mt-[3px] h-3.5 w-3.5 shrink-0 text-[var(--cyan)]/50" />
              {point}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────
export function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null);

  // Scroll-driven line: tracks how far we've scrolled through the section
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.85", "end 0.35"],
  });

  // scaleY goes 0 → 1 as we scroll; originY: 0 keeps the top anchored
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute right-0 top-1/3 h-[450px] w-[450px] translate-x-1/3 rounded-full bg-[var(--cyan)]/[0.04] blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-4xl px-6">
        {/* ── Section heading ── */}
        <motion.div
          variants={sectionFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block font-mono text-sm tracking-[0.2em] uppercase text-[var(--cyan)]">
            Experience
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Work Experience
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Professional experience building enterprise-grade software in the
            FinTech domain.
          </p>
          <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent" />
        </motion.div>

        {/* ── Timeline ── */}
        <div ref={timelineRef} className="relative">

          {/* Animated vertical line */}
          <div className="absolute left-[1.35rem] top-7 h-[calc(100%-2rem)] w-0.5 -translate-x-1/2 overflow-hidden rounded-full bg-border/20">
            <motion.div
              style={{ scaleY: lineScaleY, originY: 0 }}
              className="h-full w-full origin-top bg-gradient-to-b from-[var(--cyan)] via-[var(--cyan)]/50 to-[var(--cyan)]/10"
            />
          </div>

          {/* Static base line so there's always a faint track behind the glow */}
          <div className="absolute left-[1.35rem] top-7 h-[calc(100%-2rem)] w-0.5 -translate-x-1/2 rounded-full bg-border/20" />

          {/* Entries */}
          {experience.map((job, i) => (
            <TimelineEntry
              key={job.company}
              job={job}
              isLast={i === experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
