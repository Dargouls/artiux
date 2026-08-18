# Code Conventions

**Note:** No ESLint or Prettier config file is committed, so nothing below is tool-enforced — these are observed patterns only, and they are inconsistent across the two component sets.

## Naming Conventions

**Files/Folders:** Mixed. Most feature folders use camelCase (`buttonGroup`, `checkboxCompose`, `stepFormProvider`). Some App Router demo route folders use kebab-case (`bubble-button`, `ripple-container`, `step-form`). `artiux-components/*` folders always use `index.tsx` as entry; `components/*` folders name the file after the component (`button/button.tsx`, `textField/textField.tsx`).

**Components:** PascalCase. Examples: `Button`, `AnimatedForm`, `RippleContainer`.

**Hooks:** camelCase prefixed `use`. Examples: `useOutsideClick`, `useCalendar`, `useSnap`.

**Utils/variables:** camelCase. Examples: `cn`, `getColors`, `hexToRgb`.

## Code Organization

**Export style:** Inconsistent — `src/components/button/button.tsx` uses `export default function Button(...)`; `src/artiux-components/button/index.tsx` uses named `export function Button(...)`. Both patterns coexist throughout.

**Import/Dependency Declaration:** Loose convention of aliased `@/` + third-party imports first, blank line, then relative imports — not enforced by tooling, varies file to file.

**Indentation:** Tabs in most hand-written component files; 2-space in shadcn-generated files (`src/lib/utils.ts`, `src/components/ui/*`). Not standardized.

## Type Safety/Documentation

**Approach:** `interface XProps extends DetailedHTMLProps<...>` is the standard pattern for components wrapping native HTML elements. `type` aliases for plain data shapes. `VariantProps<typeof xVariants>` (from `class-variance-authority`) used to derive variant prop types.

**Looseness:** `any` appears ~8 times in `src` despite `strict: true` in tsconfig (e.g. `useOutsideClick.ts` types the listener as `(event: any) => void` and accepts `callback: Function`).

## Error Handling

**Pattern:** Minimal/absent. Only one `try` block found in all of `src` (`src/components/grainient/index.tsx`, WebGL context handling). No error boundaries, no async rejection handling — e.g. the simulated form submit in `animatedForm.tsx` has no failure path.

## Comments/Documentation

**Style:** Sparse inline `//` comments explaining specific lines only (e.g. `useOutsideClick.ts`: `// DO NOTHING if the element being clicked is the target element or their children`). No JSDoc blocks on exported functions/components.

## Styling Convention

**cva() for variants** is the standard way components declare style variants, used consistently in both component sets.

**Risk:** Dynamic Tailwind class interpolation appears repeatedly in `artiux-components`, e.g.:
```ts
primary: `bg-${getColors(color).background} text-${getColors(color).foreground} shadow-xl shadow-${getColors(color).background}/15`,
```
Tailwind's content scanner may not detect these at build time — see CONCERNS.md.

## `'use client'` usage

88 files across `src` use `'use client'` — the app leans almost entirely on client components; RSC is used mainly for the App Router shell.
