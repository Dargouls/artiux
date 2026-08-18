# Architecture

**Pattern:** Single Next.js App Router application — client-heavy component showcase/marketing site. Not a monorepo despite a `pnpm-workspace.yaml` file (it holds only a pnpm global override, no `packages:` field).

## High-Level Structure

```
src/
├── app/                  Next.js App Router routes + demo/showcase pages
├── artiux-components/    "ArtIux" in-house design-system library (canonical, growing)
├── artiux-hooks/         hooks for artiux-components
├── artiux-utils/         utils for artiux-components (e.g. getColors.ts)
├── components/           older/parallel component set + shadcn `ui/` primitives + demo widgets
├── hook/                 older hooks directory (duplicates artiux-hooks in places)
├── interfaces/           shared TS interfaces
├── lib/utils.ts          shadcn `cn()` helper
└── views/home/           landing page view
```

Two component libraries coexist: `src/artiux-components/*` (newer, named-export, `index.tsx` entry files) and `src/components/*` (older, default-export, file-named-after-component). See CONVENTIONS.md and CONCERNS.md.

## Identified Patterns

### Design-system component (ArtIux)

**Location:** `src/artiux-components/<component>/index.tsx`
**Purpose:** Canonical, actively-developed component library intended to eventually ship as `@artiux/components`.
**Implementation:** cva-based variants, props typed via `interface XProps extends DetailedHTMLProps<...>`, named exports.
**Example:** `src/artiux-components/button/index.tsx`

### Legacy/demo component

**Location:** `src/components/<component>/<component>.tsx`
**Purpose:** Earlier component implementations and page-specific demo widgets (charts, animated form, grainient WebGL background).
**Implementation:** default exports, different prop APIs than the artiux-components analogues of the same name.
**Example:** `src/components/button/button.tsx`

### shadcn/ui primitives

**Location:** `src/components/ui/*`
**Purpose:** Base primitives scaffolded via shadcn CLI (`components.json`), extended with many custom visual-effect components (spotlight-card, sparkles, wavy-background, trail-cursor, etc.)

### Component showcase routes

**Location:** `src/app/components/<name>/page.tsx`
**Purpose:** Live demo/documentation page per component, paired with `previewCode`/`copyCode` (react-syntax-highlighter) to show usage source.

## Data Flow

No client-server data flow exists — no API routes, no fetch calls to a backend, no `process.env` usage anywhere in `src`. The only "submission" flow is `src/components/animatedForm/animatedForm.tsx`, which simulates success via `setTimeout` + toast (no real network call).

## Code Organization

**Approach:** Feature/component-based folders under `src/app` (routes) and `src/artiux-components` / `src/components` (implementation), not domain-driven or layered.
**Module boundaries:** Weak — no enforced boundary between "library" code (`artiux-components`) and "app" code (`app`, `components`); demo pages import directly from both component sets interchangeably.
