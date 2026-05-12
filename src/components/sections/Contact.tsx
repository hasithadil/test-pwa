"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Mail, ArrowUpRight, Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { personalInfo } from "@/data/portfolio";

// ─── Brand SVGs ───────────────────────────────────────────────
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

// ─── Types ────────────────────────────────────────────────────
type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

// ─── Contact card definitions ─────────────────────────────────
const CARDS = [
  {
    label: "Email",
    display: personalInfo.email,
    cta: "Send a message",
    href: personalInfo.socials.email,
    icon: Mail,
    iconColor: "text-[var(--cyan)]",
    iconBg: "bg-[var(--cyan)]/10",
    hoverRing: "hover:ring-[var(--cyan)]/25",
    hoverGlow: "hover:shadow-[0_8px_28px_rgba(0,217,255,0.09)]",
    ctaColor: "text-[var(--cyan)]",
    external: false,
  },
  {
    label: "LinkedIn",
    display: "hasitha-dilshan-971b191bb",
    cta: "Connect with me",
    href: personalInfo.socials.linkedin,
    icon: LinkedInIcon,
    iconColor: "text-sky-400",
    iconBg: "bg-sky-500/10",
    hoverRing: "hover:ring-sky-400/25",
    hoverGlow: "hover:shadow-[0_8px_28px_rgba(56,189,248,0.08)]",
    ctaColor: "text-sky-400",
    external: true,
  },
  {
    label: "GitHub",
    display: "@hasithadil",
    cta: "View my code",
    href: personalInfo.socials.github,
    icon: GitHubIcon,
    iconColor: "text-zinc-300",
    iconBg: "bg-zinc-500/10",
    hoverRing: "hover:ring-zinc-400/25",
    hoverGlow: "hover:shadow-[0_8px_28px_rgba(161,161,170,0.07)]",
    ctaColor: "text-zinc-300",
    external: true,
  },
] as const;

// ─── Animation variants ───────────────────────────────────────
const EASE = [0.25, 0.4, 0.25, 1] as const;

const sectionFade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const cardStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

// ─── Input component ──────────────────────────────────────────
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}
function InputField({ label, error, className, ...props }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground/80">{label}</label>
      <input
        className={cn(
          "w-full rounded-xl border bg-[var(--surface-raised)] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50",
          "transition-all duration-200 outline-none",
          "focus:border-[var(--cyan)]/50 focus:ring-2 focus:ring-[var(--cyan)]/15",
          error ? "border-red-500/50" : "border-border/60",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

// ─── Textarea component ───────────────────────────────────────
interface TextareaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}
function TextareaField({ label, error, className, ...props }: TextareaFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground/80">{label}</label>
      <textarea
        className={cn(
          "w-full resize-none rounded-xl border bg-[var(--surface-raised)] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50",
          "transition-all duration-200 outline-none",
          "focus:border-[var(--cyan)]/50 focus:ring-2 focus:ring-[var(--cyan)]/15",
          error ? "border-red-500/50" : "border-border/60",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

// ─── Contact form ─────────────────────────────────────────────
function ContactForm() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>();

  function onSubmit(data: ContactFormValues) {
    const subject = `Portfolio contact from ${data.name}`;
    const body = `${data.message}\n\n---\nFrom: ${data.name}\nReply to: ${data.email}`;
    const url = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, "_blank");
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 6000);
  }

  return (
    <motion.div
      variants={sectionFade}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="mx-auto mt-16 max-w-2xl"
    >
      {/* Form card */}
      <div className="rounded-2xl border border-border/60 bg-[var(--surface)] p-6 sm:p-8">
        <h3 className="mb-1 text-lg font-semibold text-foreground">
          Send a message
        </h3>
        <p className="mb-6 text-sm text-muted-foreground">
          Fill out the form and your email client will open with the message
          pre-filled.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {/* Name + Email row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InputField
              label="Name"
              placeholder="Hasitha Dilshan"
              error={errors.name?.message}
              {...register("name", {
                required: "Name is required",
                minLength: { value: 2, message: "At least 2 characters" },
              })}
            />
            <InputField
              label="Email"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
          </div>

          {/* Message */}
          <TextareaField
            label="Message"
            rows={5}
            placeholder="Hi Hasitha, I'd love to chat about..."
            error={errors.message?.message}
            {...register("message", {
              required: "Message is required",
              minLength: { value: 20, message: "At least 20 characters" },
            })}
          />

          {/* Submit */}
          <div className="flex items-center justify-between gap-4 pt-1">
            <p className="text-xs text-muted-foreground/60">
              Opens your email client — no data is stored.
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300",
                "bg-[var(--cyan)] text-[#07070f] shadow-md shadow-[var(--cyan)]/20",
                "hover:bg-[var(--cyan-dim)] hover:shadow-[var(--cyan)]/35",
                "disabled:opacity-60 disabled:cursor-not-allowed"
              )}
            >
              <Send className="h-3.5 w-3.5" />
              Send Message
            </button>
          </div>
        </form>

        {/* Success state */}
        {sent && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/8 px-4 py-3 text-sm text-emerald-400"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            Email client opened! Don&apos;t forget to hit send.
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────
export function ContactSection() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[var(--cyan)]/[0.05] blur-[130px]" />
      </div>

      <div className="container mx-auto max-w-5xl px-6">
        {/* ── Section heading ── */}
        <motion.div
          variants={sectionFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14 text-center"
        >
          <span className="mb-3 inline-block font-mono text-sm tracking-[0.2em] uppercase text-[var(--cyan)]">
            Contact
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Let&apos;s Connect
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground">
            Whether it&apos;s a collaboration, a job opportunity, or just a
            conversation — I&apos;m always open to connecting with people doing
            interesting work.
          </p>
          <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent" />
        </motion.div>

        {/* ── Contact cards ── */}
        <motion.div
          variants={cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <motion.a
                key={card.label}
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noopener noreferrer" : undefined}
                variants={cardItem}
                whileHover={{ y: -6, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className={cn(
                  "group flex flex-col items-center gap-4 rounded-2xl border border-border/60 bg-[var(--surface)] p-6 text-center",
                  "ring-1 ring-transparent transition-all duration-300",
                  card.hoverRing,
                  card.hoverGlow
                )}
              >
                {/* Icon circle */}
                <div
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110",
                    card.iconBg
                  )}
                >
                  <Icon className={cn("h-7 w-7", card.iconColor)} />
                </div>

                {/* Label */}
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">{card.label}</p>
                  <p className="max-w-[14rem] truncate text-xs text-muted-foreground">
                    {card.display}
                  </p>
                </div>

                {/* CTA */}
                <span
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium transition-gap duration-200",
                    card.ctaColor
                  )}
                >
                  {card.cta}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </motion.a>
            );
          })}
        </motion.div>

        {/* ── Contact form ── */}
        <ContactForm />
      </div>
    </section>
  );
}
