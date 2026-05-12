"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, ChevronDown, Download, ArrowRight, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { personalInfo, typingPhrases } from "@/data/portfolio";

// ─── Typing animation ─────────────────────────────────────────
function useTypingAnimation(phrases: string[]) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIndex];
    const delay = isDeleting ? 38 : charIndex === phrase.length ? 1600 : 68;

    const t = setTimeout(() => {
      if (!isDeleting && charIndex < phrase.length) {
        setCharIndex((c) => c + 1);
      } else if (!isDeleting && charIndex === phrase.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIndex > 0) {
        setCharIndex((c) => c - 1);
      } else {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }
    }, delay);

    return () => clearTimeout(t);
  }, [charIndex, isDeleting, phraseIndex, phrases]);

  return phrases[phraseIndex].slice(0, charIndex);
}

// ─── Motion variants ──────────────────────────────────────────
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

// ─── Brand SVG icons (lucide-react dropped brand icons in v0.400+) ─
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ─── Social links config ──────────────────────────────────────
const socials = [
  { icon: GitHubIcon, href: personalInfo.socials.github, label: "GitHub", external: true },
  { icon: LinkedInIcon, href: personalInfo.socials.linkedin, label: "LinkedIn", external: true },
  { icon: Mail, href: personalInfo.socials.email, label: "Email", external: false },
] as const;

// ─── Component ────────────────────────────────────────────────
export function HeroSection() {
  const typedText = useTypingAnimation(typingPhrases);

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Animated gradient orbs ── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -left-32 -top-32 h-[560px] w-[560px] rounded-full bg-[var(--cyan)]/[0.09] blur-[120px]"
          animate={{ x: [0, 50, 0], y: [0, -35, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-48 top-1/3 h-[420px] w-[420px] rounded-full bg-blue-600/[0.08] blur-[100px]"
          animate={{ x: [0, -35, 0], y: [0, 45, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute -bottom-24 left-1/3 h-[360px] w-[360px] rounded-full bg-[var(--cyan)]/[0.06] blur-[100px]"
          animate={{ x: [0, 30, 0], y: [0, -25, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4.5 }}
        />
      </div>

      {/* ── Subtle grid ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* ── Content ── */}
      <motion.div
        className="container mx-auto max-w-4xl px-6 text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Location badge */}
        <motion.div variants={fadeUp} className="mb-7 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--cyan)]/20 bg-[var(--cyan)]/5 px-4 py-1.5 text-sm text-[var(--cyan)]">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {personalInfo.location}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          className="mb-5 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-[5.5rem] lg:leading-[1.05]"
        >
          <span className="text-gradient-cyan">{personalInfo.name}</span>
        </motion.h1>

        {/* Typing animation */}
        <motion.div
          variants={fadeUp}
          className="mb-6 flex h-9 items-center justify-center gap-0.5 text-xl font-medium sm:text-2xl"
        >
          <span className="text-foreground/85">{typedText}</span>
          <span className="mt-0.5 inline-block h-6 w-[2px] animate-[blink_1s_step-end_infinite] bg-[var(--cyan)]" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="#projects"
            className={cn(
              buttonVariants({ size: "lg" }),
              "group h-12 w-full rounded-full bg-[var(--cyan)] px-8 font-semibold text-[#07070f] shadow-lg shadow-[var(--cyan)]/20 transition-all duration-300 hover:bg-[var(--cyan-dim)] hover:shadow-[var(--cyan)]/35 sm:w-auto"
            )}
          >
            View My Work
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <a
            href={personalInfo.resumeUrl}
            download
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "h-12 w-full rounded-full border-[var(--cyan)]/25 px-8 text-foreground transition-all duration-300 hover:border-[var(--cyan)]/55 hover:bg-[var(--cyan)]/8 hover:text-[var(--cyan)] sm:w-auto"
            )}
          >
            <Download className="mr-2 h-4 w-4" />
            Download CV
          </a>
        </motion.div>

        {/* Social icons */}
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center gap-3"
        >
          {socials.map(({ icon: Icon, href, label, external }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-[var(--surface)] text-muted-foreground transition-all duration-300 hover:border-[var(--cyan)]/45 hover:bg-[var(--cyan)]/8 hover:text-[var(--cyan)]"
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.93 }}
            >
              <Icon className="h-[18px] w-[18px]" />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.7 }}
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
