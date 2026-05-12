"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Briefcase, Calendar } from "lucide-react";
import { personalInfo, profileSummary, education } from "@/data/portfolio";

// ─── Shared easing ────────────────────────────────────────────
const EASE = [0.25, 0.4, 0.25, 1] as const;

// ─── Variants ─────────────────────────────────────────────────
const slideLeft = {
  hidden: { opacity: 0, x: -52 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
};

const slideRight = {
  hidden: { opacity: 0, x: 52 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const staggerList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const listItem = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
};

// ─── Quick stat chip ──────────────────────────────────────────
function StatChip({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-[var(--surface)] px-3 py-1.5 text-sm text-muted-foreground">
      <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--cyan)]" />
      {label}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────
export function AboutSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      {/* Faint radial glow behind section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
      >
        <div className="h-[600px] w-[600px] rounded-full bg-[var(--cyan)]/[0.04] blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-6xl px-6">
        {/* ── Section heading ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block font-mono text-sm tracking-[0.2em] text-[var(--cyan)] uppercase">
            About
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Who I Am
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent" />
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* ── Left: Photo ── */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            {/* Decorative offset card behind the photo */}
            <div
              aria-hidden
              className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border border-[var(--cyan)]/15 bg-[var(--cyan)]/[0.03]"
            />

            {/* Photo card */}
            <motion.div
              whileHover={{ y: -8, scale: 1.015 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative overflow-hidden rounded-2xl border border-border bg-[var(--surface)] shadow-xl shadow-black/30"
            >
              {/* Aspect ratio container */}
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={personalInfo.profileImage}
                  alt={`${personalInfo.name} — profile photo`}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
                />
                {/* Subtle gradient at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--surface)] to-transparent" />
              </div>

              {/* Name strip at bottom of photo */}
              <div className="px-5 py-4">
                <p className="font-semibold text-foreground">{personalInfo.name}</p>
                <p className="text-sm text-[var(--cyan)]">{personalInfo.title}</p>
              </div>
            </motion.div>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.5, ease: EASE }}
              className="mt-4 flex justify-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-4 py-1.5 text-sm text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Open to Opportunities
              </span>
            </motion.div>
          </motion.div>

          {/* ── Right: Text content ── */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-8"
          >
            {/* Profile summary */}
            <div>
              <h3 className="mb-4 text-xl font-semibold text-foreground">
                A bit about me
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {profileSummary}
              </p>
            </div>

            {/* Quick stat chips */}
            <div className="flex flex-wrap gap-2">
              <StatChip icon={MapPin} label={personalInfo.location} />
              <StatChip icon={Briefcase} label="FinTech Domain" />
              <StatChip icon={Calendar} label="2023 — Present" />
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-[var(--cyan)]/30 via-border to-transparent" />

            {/* Education timeline */}
            <div>
              <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-foreground">
                <GraduationCap className="h-5 w-5 text-[var(--cyan)]" />
                Education
              </h3>

              <motion.ol
                variants={staggerList}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="relative space-y-0"
              >
                {/* Vertical timeline line */}
                <div
                  aria-hidden
                  className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--cyan)]/40 via-border to-transparent"
                />

                {education.map((edu, i) => (
                  <motion.li
                    key={edu.institution}
                    variants={listItem}
                    className="relative flex gap-5 pb-8 last:pb-0"
                  >
                    {/* Timeline dot */}
                    <div className="relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--cyan)]/30 bg-[var(--surface)]">
                      <GraduationCap className="h-3.5 w-3.5 text-[var(--cyan)]" />
                    </div>

                    {/* Entry content */}
                    <div className="min-w-0 flex-1 rounded-xl border border-border/60 bg-[var(--surface-raised)]/60 p-4 transition-colors duration-300 hover:border-[var(--cyan)]/20 hover:bg-[var(--surface-raised)]">
                      {/* Period badge */}
                      <span className="mb-1.5 inline-block font-mono text-xs tracking-wider text-[var(--cyan)]">
                        {edu.period}
                      </span>
                      <h4 className="font-semibold leading-snug text-foreground">
                        {edu.institution}
                      </h4>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {edu.degree}
                      </p>
                      {edu.details && (
                        <p className="mt-1.5 text-xs text-muted-foreground/70">
                          {edu.details}
                        </p>
                      )}
                      <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground/55">
                        <MapPin className="h-3 w-3" />
                        {edu.location}
                      </div>
                    </div>
                  </motion.li>
                ))}
              </motion.ol>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
