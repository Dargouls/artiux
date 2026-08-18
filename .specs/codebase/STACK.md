# Tech Stack

**Analyzed:** 2026-08-18

## Core

- Framework: Next.js 15.5.21 (App Router, Turbopack dev)
- Language: TypeScript 5, `strict: true`
- Runtime: React 19.2.3 / React DOM 19.2.3
- Package manager: pnpm (pnpm-lock.yaml present) — **but yarn.lock also committed** (see CONCERNS.md)

## Frontend

- UI Framework: React 19 + Next.js App Router (`src/app`)
- Component base: shadcn/ui (`components.json`, style `new-york`, base color `neutral`) + fully custom in-house design system `src/artiux-components/*`
- Styling: Tailwind CSS v4 (CSS-first config via `@theme` in `globals.css`, no `tailwind.config.js`), `class-variance-authority` (cva) for variants, `tailwind-merge` + `clsx` via `cn()` helper (`src/lib/utils.ts`), `tailwind-scrollbar`, `tw-animate-css`
- State Management: none (no Redux/Zustand/Jotai) — local `useState`/`useRef`/context only
- Form Handling: `react-hook-form` + `@hookform/resolvers` + `zod` (present but not consistently wired up — see CONCERNS.md)
- Animation/graphics: GSAP + `@gsap/react`, `motion`, `@react-spring/web`, `lenis` (smooth scroll), `animejs`, `next-view-transitions-gabriel-azv`, OGL (raw WebGL), `@react-three/fiber`/`drei`/`postprocessing` + `three`, `leva` (debug GUI), `@tsparticles/*`
- Icons: `lucide-react`, `@mynaui/icons-react`, `@iconify/react`, plus custom SVG set in `src/artiux-components/icons/index.tsx`
- Charts: `recharts` (wrapped by custom `barChart`/`lineChart`/`pieChart` components)
- Toasts: `react-hot-toast`

## Backend

None. No API routes, no server actions, no ORM, no database, no auth library. Pure client-facing component-showcase/marketing site.

## Testing

- Unit: none configured
- Integration: none configured
- E2E: none configured
- Coverage: none

## External Services

- Analytics: `@vercel/analytics` (mounted in root layout) — only real third-party SaaS integration
- Hosting: Vercel (`vercel.json` host-based rewrite; no serverless functions)

## Development Tools

- Formatting: `prettier` + `prettier-plugin-tailwindcss` (devDependency only, **no committed config file**)
- Linting: `next lint` script present, **no ESLint config file found**
- Build: Next.js/Turbopack
