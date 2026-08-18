# External Integrations

## Analytics

**Service:** Vercel Analytics (`@vercel/analytics`)
**Purpose:** Page/traffic analytics
**Implementation:** `src/app/layout.tsx` — `import { Analytics } from '@vercel/analytics/next'`, mounted as `<Analytics />` in root layout
**Configuration:** none needed (auto-detected on Vercel deploy)
**Authentication:** n/a (tied to Vercel project)

## Hosting

**Service:** Vercel
**Purpose:** Deployment target
**Implementation:** `vercel.json` — single host-based rewrite rule: `components.localhost:3000` → `/components`
**Configuration:** `vercel.json`
**Authentication:** n/a

## API Integrations

None found. No `src/app/api` directory, no server actions, no fetch calls to external services, zero `process.env` usages anywhere in `src`, no `.env`/`.env.example` files.

## Webhooks

None.

## Background Jobs

None.

## Notes

- No auth provider (no NextAuth/Clerk/Auth0/Supabase).
- No database/ORM (no Prisma/Mongoose/Drizzle).
- No error-tracking service (no Sentry).
- `next-view-transitions-gabriel-azv` is a third-party npm dependency (View Transitions API wrapper), not a service integration, but note it appears to be a personal/single-maintainer fork (package name suggests a personal npm publish) — worth checking for maintenance risk if depended on long-term.
- If any integration is added in the future, there is currently no established convention in this repo for env var usage/configuration — this would be a new pattern, not an extension of an existing one.
