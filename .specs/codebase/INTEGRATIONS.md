# External Integrations

No backend, no API routes, no `.env*` files, no `process.env` usage anywhere in `src/`. All "integrations" are client-side SDKs/libraries, not network services.

## Analytics

**Service:** Vercel Web Analytics (`@vercel/analytics`)
**Purpose:** Page-view analytics on deployment.
**Implementation:** `<Analytics/>` rendered in `src/app/layout.tsx` (root layout).
**Configuration:** Zero-config, auto-detected on Vercel deploy.
**Authentication:** N/A (handled by Vercel platform on deploy).

## View Transitions

**Service:** `next-view-transitions-gabriel-azv` — a personal npm-scoped fork/package (matches the repo owner's own dev identity) wrapping the browser View Transitions API for Next.js navigation.
**Purpose:** Animated page transitions.
**Implementation:** `<ViewTransitions>` wraps the app in `src/app/layout.tsx`.
**Configuration:** None beyond the wrapper.

## UI Primitives

**Service:** Radix UI (`radix-ui` umbrella package + individual `@radix-ui/react-dialog`, `-label`, `-slot`, `-aspect-ratio`)
**Purpose:** Accessible unstyled primitives underlying Select, Dialog, etc.
**Implementation:** Composed inside `src/artiux/components/*`.

## 3D / Visual Effects

**Service:** Three.js ecosystem (`@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `three-stdlib`, `ogl`), `@tsparticles/*`
**Purpose:** 3D scenes and particle effects on the landing page (`src/app/three/`, `Grainient` component).
**Implementation:** `src/app/three/`, `src/components/grainient/`.

## Animation

**Service:** GSAP + `@gsap/react`, Motion (`motion/react`), `@react-spring/web`, Lenis (smooth scroll)
**Purpose:** Scroll-driven animation on landing page, enter/exit transitions in components.
**Implementation:** `src/views/home/index.tsx` (GSAP scrollytelling, `useSnap`, `useScrollSmoother` hooks in `src/hook/`), Motion used pervasively across `src/artiux/components/*`.

## Forms

**Service:** `react-hook-form` + `zod` + `@hookform/resolvers`
**Purpose:** Client-side form state and validation. No submission endpoint found — forms are demo-only.
**Implementation:** `src/artiux/components/select` (generic `Control<TFieldValues>` integration), `src/components/animatedForm`, `src/components/stepFormProvider`.

## Webhooks

None.

## Background Jobs

None — no queue system, no server runtime.
