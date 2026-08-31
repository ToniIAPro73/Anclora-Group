# Portal Architecture & UX Phase 2 — Spec v1

Status: implemented
Depends on: security-hardening-phase1 (S1–S6, S9) — not reopened.
Scope: information architecture, launcher UX, registry SSOT, PDF/docs drift reconciliation.
Out of scope: domain config, i18n implementation, favorites/recents, public landing redesign, any Phase 1 security mechanism.

## Goal

Evolve anclora-group from a single-page launcher with duplicated architecture into a private corporate operating portal that scales from 15 to 30–50 apps.

## Information architecture

New authenticated route map:

- `/workspace` — operational home: compact header (user, role, available app count), fast search, grouped quick access. No hero, no full architecture map, no duplicated app cards, no decorative metrics.
- `/apps` — full catalog: search + filters (business area, visibility), richer cards. Only apps authorized for the session role.
- `/architecture` — systemic layer map derived from the registry. Compact lanes/chips, not catalog cards. Filtered to apps the session role can access (default: no disclosure of unauthorized apps; this is a deliberate choice, documented here).
- `/docs` — authenticated documentation section. The architecture PDF and its companion document move out of `public/` and are served via session-protected route handlers.
- Unchanged: `/login`, `/privacy`, `/terms`, `/legal`, relay pages, auth API.

## Requirements and acceptance criteria

### R1 — Registry as SSOT

- `GroupAppDefinition` gains `businessArea` and `architectureLayer`. No `status` field (no real evidence). No `sortOrder` (array order is canonical).
- `businessArea` taxonomy derived from existing `kind`/domain data: `real-estate`, `partnerships`, `intelligence-data`, `operations`, `content-ai`, `fiscal-compliance`, `utilities`, `personal`.
- Architecture layers move from hardcoded arrays in `GroupWorkspaceShell`/PDF script into the registry: `entry`, `core`, `activation` with layer metadata declared once (`getArchitectureLayers()` derives groups from app definitions).
- Acceptance: tests assert every app has valid `businessArea`/`architectureLayer`, keys unique, layer derivation matches registry, no orphan layer references.

### R2 — Search

- Pure function `searchGroupApps(apps, query)` matches title, eyebrow, description, kind and business-area label (case/diacritic-insensitive).
- Only ever receives role-filtered apps; unauthorized apps can never appear.
- Client-side, no search library.
- Acceptance: unit tests for matching, diacritics, empty query, and RBAC isolation.

### R3 — Grouping

- `groupAppsByBusinessArea(apps)` groups role-filtered apps by `businessArea` using registry-declared area metadata (label per area, declared once).
- Acceptance: unit tests.

### R4 — /workspace operational home

- Compact operational header instead of hero; quick search; grouped compact access list; single useful metric (apps available for role).
- Acceptance: manual validation; no architecture map on page.

### R5 — /apps catalog

- Search + business-area filter + visibility filter; cards with logo, function, type, visibility, CTA. Role-filtered only.
- Acceptance: manual validation per role.

### R6 — /architecture

- Layered lanes derived from `getArchitectureLayers()`, filtered by session role. Compact chips (logo + title), link through to allowed apps.
- Acceptance: unit test for derivation; manual validation.

### R7 — /docs and protected documents

- `/docs` page lists available private documents.
- `public/docs/*` removed; files move to `private-docs/`; served by route handlers behind `requireGroupSession()` (unauthenticated → redirect to /login).
- Acceptance: manual check that old public URL 404s and new route requires session.

### R8 — PDF from SSOT

- `scripts/generate-architecture-pdf.ts` (tsx) imports the registry directly; no inline app inventory. Output to `private-docs/`.
- Acceptance: run script, PDF contains all 15 registry apps grouped by layer.

### R9 — Navigation

- Shared `GroupPortalNav` (server component, `active` prop): Workspace / Apps / Architecture / Docs + user, role label, logout. Used by all four sections and relay pages. Mobile: compact wrapped row, no hamburger needed for 4 items.
- Acceptance: manual keyboard navigation, focus visible.

### R10 — Visual direction: premium operational

- Smaller type scale on portal pages, denser surfaces, no giant headlines outside /login. Remove `.group-page { overflow: hidden }` (hides real overflow bugs). Add 2-column intermediate breakpoint (821–1100px) for app grids.
- Acceptance: manual viewport sweep 375×812, 812×375, 820×1180, 1180×820, 1440×900.

### R11 — URL registry reconciliation

- `.env.example` documents every `NEXT_PUBLIC_*_URL` used by the registry, using code fallbacks as evidence. Unresolvable conflicts (advisor-ai, command-center) are marked as GAP in the report, code fallback unchanged.

### R12 — Documentation reconciliation

- Fix obviously false claims in README*.md, docs/claude-code/**, relevant SDD docs: app count (15), Spanish-only UI reality, correct roles, existing routes. No full documentation rewrite.

### R13 — Tests

- New: search behavior + RBAC isolation, grouping, registry metadata integrity, architecture derivation, URL fallback sanity.
- Phase 1 tests must keep passing.

## Non-goals

Everything in the phase brief section 25. Favorites and recents are classified NEXT and not implemented.
