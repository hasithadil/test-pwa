"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useActiveSection } from "@/hooks/useActiveSection";
import { personalInfo } from "@/data/portfolio";

// ─── Nav link definitions ─────────────────────────────────────
const NAV_LINKS = [
  { label: "Home",       href: "#home" },
  { label: "About",      href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills",     href: "#skills" },
  { label: "Projects",   href: "#projects" },
  { label: "Contact",    href: "#contact" },
] as const;

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

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

// ─── Theme toggle ─────────────────────────────────────────────
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Render invisible placeholder until mounted to prevent hydration shift
  if (!mounted) return <div className="h-9 w-9 rounded-lg" />;

  const isDark = theme !== "light";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle colour scheme"
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-[var(--surface)] text-muted-foreground transition-all duration-200 hover:border-[var(--cyan)]/35 hover:text-foreground"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? "sun" : "moon"}
          initial={{ scale: 0.6, opacity: 0, rotate: -30 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.6, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.18 }}
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}

// ─── Desktop nav link ─────────────────────────────────────────
function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "relative text-sm font-medium transition-colors duration-200",
        active
          ? "text-[var(--cyan)]"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
      {/* Active underline dot */}
      {active && (
        <motion.span
          layoutId="nav-dot"
          className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--cyan)]"
        />
      )}
    </a>
  );
}

// ─── Mobile drawer ────────────────────────────────────────────
function MobileMenu({
  open,
  onClose,
  activeSection,
}: {
  open: boolean;
  onClose: () => void;
  activeSection: string;
}) {
  const socials = [
    { icon: GitHubIcon, href: personalInfo.socials.github,  label: "GitHub",   external: true },
    { icon: LinkedInIcon, href: personalInfo.socials.linkedin, label: "LinkedIn", external: true },
    { icon: Mail, href: personalInfo.socials.email, label: "Email", external: false },
  ] as const;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-x-0 top-16 z-40 h-[calc(100dvh-4rem)] md:hidden"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative border-b border-border/50 bg-[var(--background)]/95 px-6 pb-6 pt-4 backdrop-blur-xl"
          >
            {/* Nav links */}
            <nav className="flex flex-col">
              {NAV_LINKS.map(({ href, label }, i) => {
                const id = href.slice(1);
                const isActive = activeSection === id;
                return (
                  <motion.a
                    key={href}
                    href={href}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.045 + 0.06, duration: 0.25 }}
                    onClick={onClose}
                    className={cn(
                      "border-b border-border/30 py-3.5 text-base font-medium transition-colors duration-150 last:border-0",
                      isActive
                        ? "text-[var(--cyan)]"
                        : "text-foreground/80 hover:text-foreground"
                    )}
                  >
                    {label}
                  </motion.a>
                );
              })}
            </nav>

            {/* Social icons + CV button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.32, duration: 0.25 }}
              className="mt-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                {socials.map(({ icon: Icon, href, label, external }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-all duration-200 hover:border-[var(--cyan)]/35 hover:text-[var(--cyan)]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>

              <a
                href={personalInfo.resumeUrl}
                download
                onClick={onClose}
                className="rounded-full bg-[var(--cyan)] px-4 py-1.5 text-sm font-semibold text-[#07070f] transition-opacity duration-200 hover:opacity-90"
              >
                Download CV
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Navbar ───────────────────────────────────────────────────
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progress = useScrollProgress();
  const activeSection = useActiveSection(SECTION_IDS);

  // Detect scroll past threshold for glassmorphism
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on desktop resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "border-b border-white/[0.07] bg-[var(--background)]/80 shadow-lg shadow-black/10 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[var(--cyan)] to-[var(--blue-accent)] transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />

        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--cyan)]/10 font-mono text-xs font-bold text-[var(--cyan)] ring-1 ring-[var(--cyan)]/25">
              HD
            </div>
            <span className="text-[15px] font-bold text-foreground">
              Hasitha<span className="text-[var(--cyan)]">.</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map(({ href, label }) => (
              <NavLink
                key={href}
                href={href}
                label={label}
                active={activeSection === href.slice(1)}
              />
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-[var(--surface)] text-muted-foreground transition-all duration-200 hover:border-[var(--cyan)]/35 hover:text-foreground md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={menuOpen ? "close" : "open"}
                  initial={{ scale: 0.7, rotate: -15, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0.7, rotate: 15, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {menuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}
