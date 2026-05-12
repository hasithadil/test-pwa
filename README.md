# Hasitha Dilshan — Portfolio

Personal portfolio website built with Next.js 15, Tailwind CSS v4, and Framer Motion.

---

## Quick Start (after cloning)

All setup is already committed to the repo. You only need three commands:

```bash
git clone <your-repo-url>
cd hasitha-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

That's it. No extra init steps needed.

---

## Available Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Production build (also runs type checking)
npm run start    # Serve the production build locally
npm run lint     # Run ESLint
```

---

## Tech Stack

| Package | Version | Purpose |
|---|---|---|
| `next` | 16.2.6 | Framework — App Router, SSR, image optimization |
| `react` / `react-dom` | 19.2.4 | UI library |
| `typescript` | ^5 | Type safety |
| `tailwindcss` | ^4 | Utility-first CSS |
| `framer-motion` | ^12 | Animations and scroll-driven effects |
| `lucide-react` | ^1.14 | Icon library |
| `next-themes` | ^0.4.6 | Dark / light mode |
| `react-hook-form` | ^7.75 | Contact form with validation |
| `@base-ui/react` | ^1.4.1 | Base for shadcn/ui components |
| `class-variance-authority` | ^0.7.1 | Variant-based component styling |
| `clsx` + `tailwind-merge` | latest | Conditional class merging via `cn()` |
| `tw-animate-css` | ^1.4 | Extra Tailwind animation utilities |
| `shadcn` | ^4.7 | Component CLI (used to add UI primitives) |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout — Navbar, Footer, ThemeProvider, metadata
│   ├── page.tsx            # Home page — composes all sections
│   ├── globals.css         # CSS variables, Tailwind base, custom cursor, keyframes
│   └── favicon.ico
│
├── components/
│   ├── ui/                 # shadcn/ui primitives (don't edit directly)
│   │   ├── button.tsx
│   │   └── card.tsx
│   │
│   ├── sections/           # One file per page section
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   │
│   ├── shared/             # Reusable global UI
│   │   ├── ThemeProvider.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── ScrollToTop.tsx
│   │   └── LoadingScreen.tsx
│   │
│   ├── Navbar.tsx          # Sticky navbar with glassmorphism + mobile drawer
│   └── Footer.tsx
│
├── hooks/
│   ├── useScrollProgress.ts   # Returns 0–100 scroll percentage
│   └── useActiveSection.ts    # IntersectionObserver — tracks visible section
│
├── data/
│   └── portfolio.ts        # ← Edit this to update all site content
│
├── constants/
│   └── index.ts            # Site config, nav items, social links
│
├── types/
│   └── index.ts            # TypeScript interfaces
│
└── lib/
    └── utils.ts            # cn() helper (clsx + tailwind-merge)
```

---

## Updating Content

**All portfolio content lives in one file:**

```
src/data/portfolio.ts
```

Edit the exported objects there to update the site — no component changes needed:

| Export | Controls |
|---|---|
| `personalInfo` | Name, title, tagline, email, phone, photo path, social URLs, CV path |
| `profileSummary` | About section paragraph |
| `typingPhrases` | Hero typing animation phrases |
| `education` | Education timeline entries |
| `experience` | Work experience timeline |
| `projects` | Project cards (title, description, tech, links) |
| `skills` | Tech stack organized by category |
| `certifications` | Certifications list |

---

## Adding More shadcn Components

shadcn is already initialized (`components.json` is committed). To add a new component:

```bash
npx shadcn@latest add <component-name>

# Examples:
npx shadcn@latest add dialog
npx shadcn@latest add badge
npx shadcn@latest add tooltip
```

Components land in `src/components/ui/`. Browse available components at [ui.shadcn.com](https://ui.shadcn.com/docs/components).

---

## What Was Done During Initial Setup

> These steps are already committed — **do not run them again** after cloning.
> This section is for reference only.

```bash
# 1. Scaffold Next.js 15 with TypeScript, Tailwind v4, ESLint, App Router, src/ dir
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes

# 2. Install additional packages
npm install framer-motion lucide-react next-themes react-hook-form

# 3. Initialize shadcn/ui (creates components.json, adds Button, updates globals.css)
npx shadcn@latest init --yes --defaults

# 4. Add the Card component used by the Projects section
npx shadcn@latest add card
```

---

## Key Configuration Files

| File | Purpose |
|---|---|
| `components.json` | shadcn/ui config — component style, path aliases |
| `tsconfig.json` | TypeScript config — `@/*` alias points to `src/` |
| `postcss.config.mjs` | Tailwind CSS v4 PostCSS plugin |
| `eslint.config.mjs` | ESLint with Next.js rules |
| `next.config.ts` | Next.js config (default, extend here if needed) |

---

## Color Palette

Defined as CSS custom properties in `src/app/globals.css`:

| Token | Value | Usage |
|---|---|---|
| `--cyan` | `#00d9ff` | Primary accent — CTAs, highlights, active states |
| `--cyan-dim` | `#00b3d6` | Hover state for cyan elements |
| `--blue-accent` | `#3b82f6` | Gradient partner for cyan |
| `--background` | `oklch(0.07 0.015 265)` ≈ `#07070f` | Page background |
| `--surface` | `oklch(0.11 0.015 265)` ≈ `#0f0f1a` | Card / section backgrounds |
| `--surface-raised` | `oklch(0.14 0.015 265)` ≈ `#13131f` | Elevated cards |

Helper classes available anywhere:
```
text-gradient-cyan   →  cyan-to-blue gradient text
glow-cyan            →  box-shadow cyan glow
border-glow-cyan     →  glowing border
```

---

## Adding an OG Image

For social share previews to work, place a **1200 × 630 px** image at:

```
public/og-image.png
```

The metadata in `app/layout.tsx` already references it.

---

## Deployment (Vercel)

1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repository — Vercel auto-detects Next.js
4. Click **Deploy** — no environment variables needed for now

The build command (`npm run build`) and output directory are detected automatically.

---

## Node.js Version

Recommended: **Node.js 18.17+** (required by Next.js 15).

Check your version:
```bash
node --version
```
