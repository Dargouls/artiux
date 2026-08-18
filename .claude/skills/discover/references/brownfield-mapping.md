# Brownfield Mapping

**Trigger:** "Map codebase", "Analyze existing code", "Document current architecture"

**Purpose:** Understand existing project structure before adding features.

## Process

**High-level approach:**

1. Explore directory structure systematically
2. Identify technology stack from dependency manifests
3. Extract patterns from representative code samples
4. Document observed conventions and architectures
5. Catalog external integrations
6. Identify concerns: tech debt, known bugs, security risks, performance bottlenecks, fragile areas

**Analysis depth:**

- Sample 5-10 representative files per category
- Focus on consistency and patterns, not exhaustive coverage
- Extract actual examples, not assumptions

## Output: 7 Files in .specs/codebase/

---

### 1. STACK.md (2,000 tokens)

**Purpose:** Document technology stack and dependencies.

**Extract from:** Dependency manifests, build config, runtime config.

```markdown
# Tech Stack

**Analyzed:** [date]

## Core

- Framework: [detected name + version]
- Language: [detected name + version]
- Runtime: [detected name + version]
- Package manager: [detected manager]

## Frontend (if applicable)

- UI Framework: [name + version]
- Styling: [approach + tools]
- State Management: [library/pattern]
- Form Handling: [library if present]

## Backend (if applicable)

- API Style: [REST/GraphQL/gRPC + framework]
- Database: [ORM/query builder + database system]
- Authentication: [library/approach]

## Testing

- Unit: [framework]
- Integration: [framework]
- E2E: [framework if present]

## External Services

- [Category]: [Service name]

## Development Tools

- [Tool category]: [Tool name]
```

---

### 2. ARCHITECTURE.md (4,000 tokens)

**Purpose:** Document architectural patterns and data flow.

```markdown
# Architecture

**Pattern:** [Identified pattern - monolith/microservices/modular/etc]

## High-Level Structure

[Create diagram/description based on actual organization]

## Identified Patterns

### [Pattern Name]

**Location:** [where this pattern lives]
**Purpose:** [what this achieves]
**Implementation:** [how it's structured]
**Example:** [reference to actual file/function]

## Data Flow

### [Key Flow - e.g., Authentication/Payment/etc]

[Map actual flow from code analysis]

## Code Organization

**Approach:** [feature-based/layer-based/domain-driven/etc]
**Module boundaries:** [How code is divided]
```

---

### 3. CONVENTIONS.md (3,000 tokens)

**Purpose:** Document code style and naming conventions.

Extract from 5-10 representative files. Document **observed** conventions with
concrete examples, not ideal conventions.

```markdown
# Code Conventions

## Naming Conventions

**Files:** [Observed pattern]
Examples: [actual filenames]

**Functions/Methods:** [Observed pattern]
Examples: [actual function names]

**Variables:** [Observed pattern]

**Constants:** [Observed pattern]

## Code Organization

**Import/Dependency Declaration:** [Observed ordering]
**File Structure:** [Observed organization within files]

## Type Safety/Documentation

**Approach:** [Type system/documentation approach]

## Error Handling

**Pattern:** [Observed approach]

## Comments/Documentation

**Style:** [When/how comments are used]
```

---

### 4. STRUCTURE.md (2,000 tokens)

**Purpose:** Document directory layout and file organization.

```markdown
# Project Structure

**Root:** [project root path]

## Directory Tree

[Visual tree representation — max 3 levels deep]

## Module Organization

### [Module/Area Name]

**Purpose:** [what this area handles]
**Location:** [where files live]
**Key files:** [important files]

## Where Things Live

**[Capability/Feature]:**
- UI/Interface: [location]
- Business Logic: [location]
- Data Access: [location]
- Configuration: [location]
```

---

### 5. TESTING.md (4,000 tokens)

**Purpose:** Document testing infrastructure and patterns.

```markdown
# Testing Infrastructure

## Test Frameworks

**Unit/Integration:** [framework + version]
**E2E:** [framework + version]
**Coverage:** [tool if used]

## Test Organization

**Location:** [where tests live]
**Naming:** [test file naming pattern]

## Testing Patterns

### Unit Tests
**Approach:** [observed pattern]
**Location:** [where unit tests live]

### Integration Tests
**Approach:** [observed pattern]

### E2E Tests
**Approach:** [observed pattern if present]

## Test Execution

**Commands:** [how to run tests]

## Test Coverage Matrix

| Code Layer | Required Test Type          | Location Pattern       | Run Command |
| ---------- | --------------------------- | ---------------------- | ----------- |
| [layer]    | [unit/integration/e2e/none] | [glob or path pattern] | [command]   |

## Parallelism Assessment

| Test Type | Parallel-Safe? | Isolation Model | Evidence                      |
| --------- | -------------- | --------------- | ----------------------------- |
| [type]    | [Yes/No]       | [description]   | [file/pattern that proves it] |

## Gate Check Commands

| Gate Level | When to Use                            | Command                     |
| ---------- | -------------------------------------- | --------------------------- |
| Quick      | After tasks with unit tests only       | [unit test command]         |
| Full       | After tasks with e2e/integration tests | [unit + e2e commands]       |
| Build      | After phase completion                 | [build + lint + unit + e2e] |
```

**Instructions for Test Coverage Matrix:**
- Sample 5-10 existing test files to identify patterns
- Extract run commands from package.json, Makefile, CI config
- Mark layers with no existing tests as "none" with a note in CONCERNS.md

**Parallelism Assessment signals:**
- NOT parallel-safe: shared DB connection, table-level cleanup, shared mock state
- Parallel-safe: per-test DB creation, data namespacing, no shared mutable state

---

### 6. INTEGRATIONS.md (5,000 tokens)

**Purpose:** Document external service integrations.

```markdown
# External Integrations

## [Service Category]

**Service:** [service name]
**Purpose:** [what this integration provides]
**Implementation:** [where integration lives in code]
**Configuration:** [how service is configured]
**Authentication:** [auth approach if applicable]

## API Integrations

### [API Name]

**Purpose:** [what this API provides]
**Location:** [where API client/code lives]
**Authentication:** [auth method]
**Key endpoints:** [major endpoints used]

## Webhooks

### [Webhook Source]

**Purpose:** [what events are handled]
**Location:** [webhook handler location]

## Background Jobs

**Queue system:** [system if used]
**Location:** [where job definitions live]
```

---

### 7. CONCERNS.md (5,000 tokens)

**Purpose:** Surface actionable warnings about the codebase.

See [concerns.md](concerns.md) for full template and guidelines.

---

## Total Context Budget

**Combined:** ~19,000 tokens (10% of context window)
**Loading strategy:** Load relevant docs on-demand based on task
