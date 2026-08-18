# Project Structure

**Root:** `c:\Users\Usuario\Documents\Trabalhos\ArtIux\artiux-lab`

## Directory Tree

```
artiux-lab/
├── .claude/skills/            Claude Code skill defs (not app code)
├── public/                    static assets (svgs, images, font json)
├── src/
│   ├── app/                   Next.js App Router routes
│   │   ├── components/        one route per showcase component (badge, button, calendar, dialog, drawer, select, textField, icons, ...)
│   │   ├── layers/, three/, test/   experimental/demo routes
│   │   ├── layout.tsx, page.tsx, loading.tsx, globals.css
│   │   └── snap-old.tsx        dead file (see CONCERNS.md)
│   ├── artiux-components/     canonical design-system source (badge, button, calendar, card, dialog, drawer, select, sidebar, tabs, textField, tooltip, icons, ...)
│   ├── artiux-hooks/          use-mobile.tsx, useOutsideClick.ts
│   ├── artiux-utils/          getColors.ts
│   ├── assets/                brand, components, images
│   ├── components/            legacy component set + shadcn ui/ + demo widgets (charts, animatedForm, grainient, cardSwap, layout/)
│   ├── hook/                  legacy hooks (useLenis, useOutsideClick, useScrollSmoother, useSnap)
│   ├── interfaces/            iconProps.ts
│   ├── lib/utils.ts           cn() helper (only file)
│   └── views/home/index.tsx   landing page view
├── components.json            shadcn config
├── next.config.ts
├── postcss.config.mjs         tailwind v4 plugin
├── tsconfig.json              strict:true, @/* → ./src/*
├── vercel.json
├── pnpm-lock.yaml / yarn.lock (both present — see CONCERNS.md)
└── package.json
```

## Module Organization

### `src/app`

**Purpose:** Routing + per-component showcase/demo pages.
**Location:** `src/app/**/page.tsx`
**Key files:** `layout.tsx` (mounts `<Analytics/>`, `<Toaster/>`), `src/app/components/*` (one folder per showcased component)

### `src/artiux-components`

**Purpose:** Canonical, actively developed design-system component library.
**Location:** `src/artiux-components/<component>/index.tsx`
**Key files:** `icons/index.tsx` (5311 lines), `sidebar.tsx` (707 lines)

### `src/components`

**Purpose:** Legacy component implementations + shadcn primitives + page-specific demo widgets.
**Location:** `src/components/<component>/<component>.tsx`, `src/components/ui/*`
**Key files:** `ui/sparkles.tsx` (424 lines), `grainient/index.tsx` (WebGL shader background), `animatedForm/animatedForm.tsx`

## Where Things Live

**UI components (canonical):** `src/artiux-components/`
**UI components (legacy/demo):** `src/components/`
**Hooks:** split across `src/hook/` and `src/artiux-hooks/` (some files byte-identical duplicates)
**Utils:** `src/lib/utils.ts` (shadcn `cn`), `src/artiux-utils/getColors.ts`
**Types/interfaces:** `src/interfaces/`
**Styling config:** `postcss.config.mjs` + `@theme` block in `src/app/globals.css` (Tailwind v4, no `tailwind.config.js`)
**Configuration:** none — no `.env*` files, no `process.env` usage anywhere in `src`
