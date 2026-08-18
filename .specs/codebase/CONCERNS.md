# Codebase Concerns

**Analysis Date:** 2026-08-18

## Tech Debt

**Duplicated component libraries:**

- Issue: `src/components/button/button.tsx` and `src/artiux-components/button/index.tsx` are two separate, drifted implementations of "Button" with different prop APIs (`variant?: 'contained'|'text'|'outlined'|'icon'` vs `variant?: 'primary'|'secondary'|'ghost'`). Same overlap pattern likely repeats for circularProgress, textField, label, radio.
- Files: `src/components/*`, `src/artiux-components/*`
- Why: `artiux-components` appears to be a newer canonical rewrite that hasn't fully replaced the legacy `src/components` set yet.
- Impact: Unclear which is canonical; both are actively used elsewhere in the app, raising risk of inconsistent UI and doubled maintenance.
- Fix approach: Decide canonical library (likely `artiux-components`), migrate remaining usages, delete legacy duplicates.

**Duplicated hook files:**

- Issue: `src/hook/useOutsideClick.ts` and `src/artiux-hooks/useOutsideClick.ts` are byte-for-byte identical.
- Files: `src/hook/useOutsideClick.ts`, `src/artiux-hooks/useOutsideClick.ts`
- Why: Two parallel hook directories exist with no documented separation rule.
- Impact: Future edits to one copy silently diverge from the other.
- Fix approach: Consolidate into `src/artiux-hooks/` (the canonical-library-aligned location) and update imports.

**Broken/unportable dependency:**

- Issue: `"@artiux/components": "link:C:/Users/Usuario/Documents/Trabalhos/ArtIux/artiux"` in `package.json` is an absolute Windows path to a sibling repo on one developer's machine, and is not imported anywhere in `src` (0 matches).
- Files: `package.json`
- Why: Likely leftover from local experimentation linking a sibling package repo.
- Impact: Breaks `pnpm install` on any other machine or CI.
- Fix approach: Remove the dependency entry if truly unused, or replace with a published/workspace-relative reference.

**Mixed package manager lockfiles:**

- Issue: both `pnpm-lock.yaml` and `yarn.lock` committed at root.
- Files: `pnpm-lock.yaml`, `yarn.lock`
- Why: Inconsistent package-manager usage over project history.
- Impact: Risk of phantom-dependency bugs depending on which lockfile/tool is used to install.
- Fix approach: Pick one package manager (pnpm, matching `pnpm-workspace.yaml`), delete the other lockfile, document in README.

**No ESLint/Prettier config committed:**

- Issue: `next lint` script and `prettier`/`prettier-plugin-tailwindcss` are devDependencies, but no `.eslintrc*`/`eslint.config.*`/`.prettierrc*` file exists.
- Files: repo root
- Why: Likely relies on an uncommitted local/IDE config.
- Impact: No enforced style — explains mixed tabs/2-space indentation and mixed `export default`/named export styles across near-identical components.
- Fix approach: Add and commit an ESLint flat config + Prettier config; run once to normalize existing files.

**shadcn hooks alias mismatch:**

- Issue: `components.json` declares `"hooks": "@/hooks"` but no `src/hooks` directory exists; real hooks live in `src/hook` and `src/artiux-hooks`.
- Files: `components.json`
- Why: Alias likely left at shadcn CLI default, not adjusted to this repo's actual structure.
- Impact: Any future `shadcn add` scaffolding of a hook-consuming component will generate an incorrect import path.
- Fix approach: Update `components.json` `hooks` alias to match the real hook directory (or consolidate hooks first per above).

## Security Considerations

**Dynamic Tailwind class interpolation:**

- Risk: Components in `src/artiux-components` build class names by interpolating variables, e.g. `` `bg-${getColors(color).background} text-${getColors(color).foreground} shadow-xl shadow-${getColors(color).background}/15` `` (`src/artiux-components/button/index.tsx`). Tailwind's content scanner statically greps source for class strings and may not detect these dynamically-built names, silently dropping the generated CSS in production builds.
- Files: `src/artiux-components/button/index.tsx` and likely other `artiux-components/*` files using `getColors()`
- Current mitigation: none observed
- Recommendations: Use a static lookup map (`{ red: 'bg-red-500', blue: 'bg-blue-500' }`) or a Tailwind safelist in the CSS `@theme`/config instead of string interpolation.

## Fragile Areas

**Large monolithic files:**

- Files: `src/artiux-components/icons/index.tsx` (5311 lines), `src/app/components/icons/page.tsx` (5416 lines), `src/artiux-components/sidebar.tsx` (707 lines), `src/components/ui/sparkles.tsx` (424 lines)
- Why fragile: Single enormous files are hard to review/diff; icon files are mostly SVG data but still add IDE/build load.
- Safe modification: For icon files, changes are typically additive (new icon entries) so risk is low; `sidebar.tsx` and `sparkles.tsx` are behavioral components and should be reviewed carefully before edits given size.
- Test coverage: none (see Test Coverage Gaps below).

**Dead/experimental files left in tree:**

- Files: `src/app/snap-old.tsx` (superseded, still present), `src/app/test/page.tsx`, `src/app/three/page.tsx`, `src/app/layers/page.tsx` (demo/scratch routes mixed with production routes, no route grouping to separate them)
- Why fragile: Unclear which routes are meant to ship vs. scratch work; risk of shipping unfinished/demo pages.
- Safe modification: Before adding new routes, confirm with project owner which existing routes are production vs. demo; consider a `(dev)` route group to separate them.

## Test Coverage Gaps

**Entire codebase:**

- What's not tested: Everything — no unit, integration, or e2e tests exist.
- Risk: Any refactor (e.g. consolidating the duplicated component libraries above) has no safety net.
- Priority: High if planning to touch `artiux-components`, form logic, or shared hooks; Medium for purely visual/demo routes.

## Dependencies at Risk

**next-view-transitions-gabriel-azv:**

- Risk: Package name suggests a personal/single-maintainer fork of the View Transitions API wrapper; unclear long-term maintenance.
- Migration plan: If issues arise, evaluate the upstream `next-view-transitions` package or a first-party View Transitions API implementation.
