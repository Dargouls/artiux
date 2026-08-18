# Codebase Concerns

**Trigger:** Part of brownfield mapping, or explicitly "document concerns", "find tech debt", "what's risky"

**Purpose:** Surface actionable warnings about the codebase. Focused on "what to
watch out for when making changes." Living documentation, not a complaint list.

## When to Generate

CONCERNS.md is generated as part of brownfield mapping. Also created/updated when:

- Exploring a new area reveals risks
- A bug investigation uncovers systemic issues
- A feature implementation hits unexpected fragility
- A dependency audit reveals risks

## Process

### 1. Gather Evidence

Look for concrete signals — not opinions:

- Code patterns: TODO/FIXME/HACK, duplicated logic, missing error handling
- Test coverage gaps: untested critical paths, missing edge cases
- Dependencies: outdated packages, deprecated libraries, security advisories
- Performance: N+1 queries, missing indexes, synchronous blocking
- Security: client-side-only auth, unvalidated inputs, exposed secrets

### 2. Classify and Document

Each concern must have: **what** (problem), **where** (file paths), **why**
(impact), and **how** (fix approach).

### 3. Prioritize by Risk

Focus on real damage — data loss, security breaches, user-facing failures,
scaling walls. Minor style issues and normal TODOs do not belong here.

---

## Template: `.specs/codebase/CONCERNS.md`

**Size limit:** 5,000 tokens

```markdown
# Codebase Concerns

**Analysis Date:** [YYYY-MM-DD]

## Tech Debt

**[Area/Component]:**

- Issue: [What's the shortcut/workaround]
- Files: [Specific file paths]
- Why: [Why it was done this way]
- Impact: [What breaks or degrades]
- Fix approach: [How to properly address it]

## Known Bugs

**[Bug description]:**

- Symptoms: [What happens]
- Trigger: [How to reproduce]
- Files: [Where the bug lives]
- Root cause: [If known]

## Security Considerations

**[Area]:**

- Risk: [What could go wrong]
- Files: [Where the risk lives]
- Current mitigation: [What's in place]
- Recommendations: [What should be added]

## Performance Bottlenecks

**[Slow operation]:**

- Problem: [What's slow]
- Files: [Where the bottleneck lives]
- Measurement: [Actual numbers]
- Improvement path: [How to fix]

## Fragile Areas

**[Component/Module]:**

- Files: [Where the fragility lives]
- Why fragile: [What makes it break]
- Safe modification: [How to change without breaking]
- Test coverage: [Gaps?]

## Scaling Limits

**[Resource/System]:**

- Current capacity: [Numbers]
- Limit: [Where it breaks]
- Scaling path: [How to increase]

## Dependencies at Risk

**[Package/Service]:**

- Risk: [deprecated, unmaintained, breaking changes]
- Migration plan: [Alternative or upgrade path]

## Test Coverage Gaps

**[Untested area]:**

- What's not tested: [Specific functionality]
- Risk: [What could break unnoticed]
- Priority: [High/Medium/Low]
```

**Include only sections with findings.** Omit empty sections.

---

## What Belongs vs. What Doesn't

**Include:** Evidence-backed issues with fix approaches, file paths, measurements.

**Exclude:** Opinions without evidence, complaints without solutions, future
feature ideas, normal TODOs, working architectural decisions, minor style issues.

---

## Writing Guidelines

- **Always include file paths** — use backticks: `src/file.ts`
- Be specific: "500ms p95" not "slow"
- Include reproduction steps for bugs
- Suggest fix approaches, not just problems
- Tone: Professional, solution-oriented, factual

## How CONCERNS.md Gets Used

- **Feature planning:** Check before designing features that touch flagged areas
- **Risk estimation:** Use fragile areas and scaling limits for change risk
- **Implementation:** Consult before modifying flagged components
