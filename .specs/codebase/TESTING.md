# Testing Infrastructure

**No testing infrastructure exists in this repo.**

## Test Frameworks

**Unit/Integration:** none (no Jest/Vitest in devDependencies)
**E2E:** none (no Playwright/Cypress)
**Coverage:** none

## Test Organization

**Location:** N/A — no `*.test.*`/`*.spec.*` files, no `__tests__` dirs found anywhere under `src`
**Naming:** N/A

## Testing Patterns

### Unit Tests
**Approach:** none
**Location:** none

### Integration Tests
**Approach:** none

### E2E Tests
**Approach:** none

## Test Execution

No test command exists in `package.json` scripts (`dev`, `build`, `start`, `lint` only). No CI config (`.github/workflows` absent).

## Test Coverage Matrix

| Code Layer | Required Test Type | Location Pattern | Run Command |
| ---------- | --------------------------- | ---------------------- | ----------- |
| `src/artiux-components/*` | none | n/a | n/a |
| `src/components/*` | none | n/a | n/a |
| `src/app/**/page.tsx` | none | n/a | n/a |
| hooks (`src/hook`, `src/artiux-hooks`) | none | n/a | n/a |

All layers: **no existing tests**. See CONCERNS.md → Test Coverage Gaps.

## Parallelism Assessment

N/A — no test suite to assess.

## Gate Check Commands

| Gate Level | When to Use | Command |
| ---------- | ----------- | ------- |
| Quick | N/A (no unit tests) | — |
| Full | N/A (no e2e/integration tests) | — |
| Build | After phase completion | `pnpm build` (Next.js build is currently the only available correctness gate; `pnpm lint` needs an ESLint config to actually run — see CONCERNS.md) |

**Recommendation:** Given Next.js 15 + React 19, Vitest + React Testing Library (unit/component) and Playwright (e2e for showcase routes) would fit this stack with minimal setup friction.
