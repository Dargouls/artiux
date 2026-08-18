---
name: discover
description: >-
  Map existing codebases. Creates 7 brownfield analysis docs in .specs/codebase/.
  Use when entering an unfamiliar codebase, mapping architecture, or documenting
  concerns/tech debt. Triggers on "map codebase", "analyze existing code",
  "document concerns", "find tech debt".
---

# Discover

Map existing codebases before building features.

## Step 0 — Load Foundation (MANDATORY)

Invoke `/sdd-foundation` using the Skill tool now. Apply its rules (project
structure, shared conventions) for the remainder of this session. All outputs
follow the `.specs/` structure defined there. Do not proceed until you have
loaded it.

---

## Commands

| Trigger                                        | Reference                                              |
| ---------------------------------------------- | ------------------------------------------------------ |
| Map codebase, analyze existing code            | [brownfield-mapping.md](references/brownfield-mapping.md) |
| Document concerns, find tech debt, what's risky | [concerns.md](references/concerns.md)                  |

---

## Output

7 brownfield docs in `.specs/codebase/`:
STACK.md, ARCHITECTURE.md, CONVENTIONS.md, STRUCTURE.md, TESTING.md,
INTEGRATIONS.md, CONCERNS.md
