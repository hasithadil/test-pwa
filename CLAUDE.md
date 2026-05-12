# Hasitha Portfolio — CLAUDE.md

Project context and conventions for AI-assisted development.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui |
| Animations | Framer Motion |
| Icons | Lucide React |
| Theme | next-themes (dark-first) |
| Package manager | npm |
| Deployment target | Vercel |

---

## Project Structure

```
hasitha-portfolio/
├── public/                      # Static assets (images, SVGs, resume PDF)
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout — ThemeProvider, metadata
│   │   ├── page.tsx             # Home page (assembles section components)
│   │   ├── globals.css          # Global styles, CSS variables, Tailwind base
│   │   └── favicon.ico
│   ├── components/
│   │   ├── ui/                  # shadcn/ui primitives (Button, Card, etc.)
│   │   ├── layout/              # Header, Footer, Navigation, MobileMenu
│   │   ├── sections/            # Hero, About, Skills, Projects, Contact
│   │   └── shared/              # ThemeProvider, ThemeToggle, SectionWrapper,
│   │                            #   ScrollProgress, AnimatedText, etc.
│   ├── hooks/
│   │   ├── useScrollProgress.ts # Scroll % for progress bar
│   │   └── useActiveSection.ts  # IntersectionObserver for active nav item
│   ├── types/
│   │   └── index.ts             # Project, Skill, NavItem, SocialLink interfaces
│   ├── data/
│   │   └── index.ts             # PROJECTS and SKILLS arrays (edit to update content)
│   ├── constants/
│   │   └── index.ts             # SITE_CONFIG, NAV_ITEMS, SOCIAL_LINKS
│   └── lib/
│       └── utils.ts             # shadcn cn() helper
├── components.json              # shadcn/ui config
├── tailwind.config.ts           # (auto-managed by Tailwind v4)
├── tsconfig.json
└── CLAUDE.md                    # This file
```

---

## Color Palette

Dark-first theme with cyan/electric-blue accent. All colors are defined as CSS custom properties in `src/app/globals.css`.

### Brand Colors

| Token | Hex | Usage |
|---|---|---|
| `--cyan` | `#00d9ff` | Primary accent, CTAs, highlights |
| `--cyan-dim` | `#00b3d6` | Hover states, scrollbar |
| `--blue-accent` | `#3b82f6` | Gradient partner for cyan |

### Dark Theme (default)

| Token | OKLCH | Approx Hex | Usage |
|---|---|---|---|
| `--background` | `oklch(0.07 0.015 265)` | `#07070f` | Page background |
| `--surface` | `oklch(0.11 0.015 265)` | `#0f0f1a` | Card/section backgrounds |
| `--surface-raised` | `oklch(0.14 0.015 265)` | `#13131f` | Elevated cards |
| `--foreground` | `oklch(0.93 0.01 240)` | `#e2e8f0` | Primary text |
| `--muted-foreground` | `oklch(0.60 0.02 240)` | `#94a3b8` | Secondary text |
| `--border` | `oklch(1 0 0 / 8%)` | white/8% | Borders |
| `--primary` | `oklch(0.84 0.17 198)` | `≈#00d9ff` | shadcn primary (= cyan) |

### Gradient Helper

```tsx
// Use the utility class for gradient text
<span className="text-gradient-cyan">Hello</span>

// Inline gradient for backgrounds
className="bg-gradient-to-r from-[var(--cyan)] to-[var(--blue-accent)]"
```

### Glow Utilities (defined in globals.css)

- `glow-cyan` — box-shadow cyan glow on cards/buttons
- `border-glow-cyan` — glowing border variant

---

## Coding Conventions

### TypeScript
- Strict mode is enabled — no `any`, no implicit returns
- Prefer `type` over `interface` for unions; use `interface` for object shapes
- All data shapes are defined in `src/types/index.ts`
- Use `as const` on literal objects/arrays in `constants/`

### Components
- All React components use named exports (no default exports except page/layout)
- `"use client"` only when the component uses browser APIs, hooks, or event handlers
- Server Components by default — keep data fetching at the top level
- Props interfaces named `<ComponentName>Props`
- No prop drilling beyond 2 levels — use composition or context

### Styling
- Tailwind utility classes only — no custom CSS in component files
- Custom CSS only in `globals.css` using `@layer base` / `@layer utilities`
- Use `cn()` from `@/lib/utils` for conditional class merging
- Responsive: mobile-first (`sm:`, `md:`, `lg:`, `xl:`)
- Dark/light handled via CSS variables — never use `dark:` class for colors that should track the theme token

### Animations (Framer Motion)
- Define variants outside the component for reuse
- Prefer `viewport={{ once: true }}` for scroll-triggered animations
- Use `AnimatePresence` for mount/unmount transitions
- Keep animation durations under 600ms; use `ease: [0.25, 0.4, 0.25, 1]` for snappy feel

### Imports
- Path alias `@/*` maps to `src/*`
- Order: React → Next.js → third-party → internal (`@/components` → `@/hooks` → `@/lib` → `@/types`)

### File Naming
- Components: `PascalCase.tsx`
- Hooks: `camelCase.ts` with `use` prefix
- Utilities/data/constants: `camelCase.ts`
- Section IDs match nav href anchors exactly: `#about`, `#skills`, `#projects`, `#contact`

### No-comment rule
- Only add a comment when the WHY is non-obvious
- No JSDoc blocks, no "this component renders X" comments

---

## Adding shadcn Components

```bash
npx shadcn@latest add <component-name>
```

Components land in `src/components/ui/`. Do not edit them directly — override via Tailwind or wrapper components.

---

## Content Updates

All portfolio content lives in two files — no code changes needed elsewhere:

- **`src/data/index.ts`** — `PROJECTS` and `SKILLS` arrays
- **`src/constants/index.ts`** — name, email, nav items, social links

---

## Running the Project

```bash
npm run dev      # Development server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
```
