# Codebase Concerns

**Analysis Date:** 2026-08-24

## Tech Debt

**No ESLint config despite `lint` script:**

- Issue: `package.json` defines `"lint": "next lint"` but no `.eslintrc*` or `eslint.config.*` exists at project root.
- Files: project root (missing file), `package.json:8`
- Why: Likely removed or never scaffolded; Next.js normally ships one by default.
- Impact: `pnpm lint` either no-ops or prompts interactive setup — no enforced lint gate currently runs in this workflow (CI or local).
- Fix approach: Add `eslint.config.mjs` (flat config, Next.js 15 default) and wire into a pre-commit/CI check.

**Inconsistent component file naming (index.tsx vs `<name>.tsx`):**

- Issue: Most `src/artiux/components/<name>/` folders use `index.tsx`, but Dialog (`dialog/dialog.tsx`) and RippleContainer (`rippleContainer/rippleContainer.tsx`) deviate.
- Files: `src/artiux/components/dialog/dialog.tsx`, `src/artiux/components/rippleContainer/rippleContainer.tsx`
- Why: Unclear — likely organic drift, no enforced convention.
- Impact: Minor DX inconsistency; import paths differ (`@/artiux/components/dialog/dialog` vs `@/artiux/components/select`), easy to get wrong when copy-pasting for new components.
- Fix approach: Standardize on `index.tsx` for all component folders, or document the exception explicitly.

**Two competing compound-component conventions:**

- Issue: Most components use flat named exports (`CardHeader`, `CardTitle` composed manually); Dialog alone uses static-property attachment (`Dialog.Header`, `Dialog.Title`).
- Files: `src/artiux/components/dialog/dialog.tsx:85-88` vs `src/artiux/components/card/index.tsx`
- Why: No documented rationale found.
- Impact: Consumers must learn two different composition patterns depending on component; increases API surface inconsistency for a library whose whole pitch is copy-paste consistency.
- Fix approach: Pick one convention (README's shadcn/React-Bits inspiration suggests flat exports is more idiomatic) and migrate Dialog, or document why Dialog is the intentional exception.

**Mixed camelCase/kebab-case route folder naming:**

- Issue: `src/app/components/*` folders mix camelCase (`buttonGroup`, `circularProgress`) and kebab-case (`bubble-button`, `circle-transition`, `ripple-container`, `to-left`, `step-form`).
- Files: `src/app/components/*` (28 folders)
- Why: No enforced convention; likely different contributors/sessions.
- Impact: URL inconsistency (`/components/buttonGroup` vs `/components/bubble-button`) — confusing for both maintainers and any future automated route generation.
- Fix approach: Standardize on kebab-case for URL segments (more conventional for web routes) in a dedicated rename pass; would require updating any internal links/sidebar nav referencing these paths.

**Stray local machine artifact in `pnpm-workspace.yaml`:**

- Issue: An `overrides.list`-style path appears to reference a local pnpm store path specific to the developer's machine.
- Files: `pnpm-workspace.yaml`
- Why: Likely accidental commit of a machine-local config.
- Impact: Could break `pnpm install` for other contributors/CI if the path is genuinely machine-specific and required.
- Fix approach: Verify the file's actual necessity; remove or generalize if it only works on the original author's machine.

## Test Coverage Gaps

**No automated tests anywhere:**

- What's not tested: Every component in `src/artiux/components/*`, all doc routes, all site UI. Zero test files repo-wide.
- Risk: Any refactor (e.g. the naming/convention cleanups above) has no safety net — regressions surface only via manual browsing.
- Priority: Medium — acceptable for a copy-paste component showcase (consumers test in their own projects), but risky if `src/artiux` logic (e.g. `getColors.ts`, `use-mobile.tsx`) grows more complex. Already called out in README's own roadmap.

## Dependencies at Risk

**Personal-fork dependency:**

- Risk: `next-view-transitions-gabriel-azv` is a personally-scoped npm fork, not the upstream/official package — unclear maintenance guarantee, single point of failure if the author's npm account/package is ever removed.
- Migration plan: Confirm whether this fork is still needed vs. upstream `next-view-transitions`, or vendor the small wrapper directly into the repo to remove the external dependency risk.

**No config file for Prettier despite dependency:**

- Risk: `prettier` + `prettier-plugin-tailwindcss` are installed but unconfigured — running `prettier` project-wide would use defaults only, and the Tailwind class-sorting plugin has no effect without being registered in a config.
- Migration plan: Add `.prettierrc.json` with `plugins: ["prettier-plugin-tailwindcss"]` to actually realize the intended tooling benefit.
