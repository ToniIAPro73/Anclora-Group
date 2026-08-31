# Portal Architecture Phase 2 — Test Plan

Traceability to `portal-architecture-phase2-spec-v1.md`.

| Requirement | Test file | Cases |
|---|---|---|
| R1 | `tests/group-registry.test.ts` | every app has valid businessArea + architectureLayer; unique keys; relay apps keep internal URLs; all roles referenced by apps are valid GroupRole values |
| R2 | `tests/group-search.test.ts` | matches title/eyebrow/description/kind/area label; diacritic-insensitive; empty query returns all; query with no match returns empty; search over role-filtered set never returns unauthorized apps |
| R3 | `tests/group-search.test.ts` | groupAppsByBusinessArea groups correctly, preserves registry order, areas with zero apps omitted |
| R6 | `tests/group-registry.test.ts` | getArchitectureLanes derives all 15 apps from registry; layer metadata present; every app appears in exactly one layer; role-filtered architecture contains only apps whose roles include the role |
| R11 | `tests/group-registry.test.ts` | every external app URL is absolute http(s); relay URLs are internal paths |
| R4/R5/R7/R9/R10 | manual validation | viewport sweep, RBAC behavior, docs auth, keyboard navigation |

Runner unchanged: `npm test` (tsx --test, node:test). Phase 1 suites must stay green (43 tests).
