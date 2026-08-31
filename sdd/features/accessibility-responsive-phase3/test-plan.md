# Accessibility & Responsive Phase 3 — Test Plan

Traceability to `accessibility-responsive-phase3-spec-v1.md`.

| Requirement | Test file | Cases |
|---|---|---|
| R3 | `tests/group-consent.test.ts` | parseStoredConsent: missing key → null; valid JSON → typed prefs with forced true flags; malformed JSON → null; partial JSON → defaults filled; serializeConsent produces version/updatedAt |
| R1/R2/R4/R5/R6/R7/R8/R9 | manual validation | keyboard-only pass, focus visibility, reduced-motion emulation, viewport sweep, zoom 200%, dark theme visual check |

Runner unchanged: `npm test` (tsx --test, node:test). Phase 1+2 suites must stay green (59 tests).

Manual QA tooling: agent-browser (already installed) — keyboard tab order, focus visibility, viewports 320×568, 375×812, 812×375, 820×1180, 1180×820, 1440×900, zoom 200%.
