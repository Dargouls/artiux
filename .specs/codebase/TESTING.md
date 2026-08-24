# Testing Infrastructure

## Test Frameworks

**Unit/Integration:** None installed.
**E2E:** None installed.
**Coverage:** None.

No test runner (Jest, Vitest, Playwright, Cypress) appears in `package.json` devDependencies. No `*.test.*`, `*.spec.*`, or `__tests__` files exist anywhere in the repo (confirmed via full-repo search).

## Test Organization

**Location:** N/A — none exist.
**Naming:** N/A.

## Testing Patterns

### Unit Tests
**Approach:** Not implemented.
**Location:** N/A

### Integration Tests
**Approach:** Not implemented.

### E2E Tests
**Approach:** Not implemented.

## Test Execution

**Commands:** None available. `package.json` scripts are `dev`, `build`, `start`, `lint` only.

## Test Coverage Matrix

| Code Layer | Required Test Type | Location Pattern | Run Command |
| ---------- | ------------------- | ----------------- | ----------- |
| `src/artiux/components/*` (library) | none | n/a | n/a |
| `src/app/components/*` (doc routes) | none | n/a | n/a |
| `src/components/*` (site UI) | none | n/a | n/a |
| `src/views/home` | none | n/a | n/a |

## Parallelism Assessment

N/A — no test suite exists to assess.

## Gate Check Commands

| Gate Level | When to Use | Command |
| ---------- | ----------- | ------- |
| Quick | After any change | `pnpm build` (TypeScript strict mode is the only real compile-time check; `pnpm lint` is currently non-functional, see CONCERNS.md) |
| Full | N/A | no e2e/integration suite exists |
| Build | Before shipping | `pnpm build` |

**Note:** README's own roadmap explicitly lists implementing automated testing as a future step — this is a known, acknowledged gap, not an oversight to silently work around.
