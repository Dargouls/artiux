# Tech Stack

**Analyzed:** 2026-08-24

## Core

- Framework: Next.js 15.5.21 (App Router, Turbopack dev)
- Language: TypeScript 5 (strict mode)
- Runtime: React 19.2.3 / react-dom 19.2.3
- Package manager: pnpm

## Frontend

- UI Framework: React 19 + Radix UI primitives (`radix-ui`, `@radix-ui/react-dialog`, `-label`, `-slot`, `-aspect-ratio`)
- Styling: Tailwind CSS 4 (CSS-first config in `src/app/globals.css`, no `tailwind.config.*`), `class-variance-authority` for variants, `cn()` (`twMerge`+`clsx`) helper in `src/lib/utils.ts`
- State Management: Zustand (local/global), component-local `useState`
- Form Handling: `react-hook-form` + `zod` + `@hookform/resolvers`
- Animation: Motion (`motion/react`), GSAP + `@gsap/react`, `@react-spring/web`, Lenis (smooth scroll), `@tsparticles/*`
- 3D: `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `three`, `three-stdlib`, `ogl`
- Custom fork dependency: `next-view-transitions-gabriel-azv` (developer's own npm-scoped fork, wraps View Transitions API)

## Backend

- None. No API routes, no server calls, no database. Pure static/client demo app.

## Testing

- None configured. No test runner in devDependencies, no test files in repo (confirmed via search). README's own roadmap lists "implement automated testing" as a future step.

## External Services

- Vercel Web Analytics (`@vercel/analytics`) — only external network integration found.
- No `.env*` files, no `process.env` usage anywhere in `src/`.

## Development Tools

- Prettier 3.5.3 + `prettier-plugin-tailwindcss` installed as devDependency, but **no project-level `.prettierrc*` / `prettier.config.*` file exists** — falls back to Prettier defaults if run.
- No ESLint config file at project root despite `"lint": "next lint"` script existing — likely broken/no-op until a config is added.
- `components.json` present (shadcn/ui CLI config: style "new-york", baseColor "neutral", icons "lucide") — used historically to scaffold pieces under `src/components/ui/`.
- `vercel.json` — single rewrite: `components.localhost:3000/` → `/components` (local subdomain dev aid).
