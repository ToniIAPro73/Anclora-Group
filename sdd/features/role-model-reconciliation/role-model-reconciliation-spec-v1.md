# Role Model Reconciliation — Spec v1

Status: implemented
Depends on: security-hardening-phase1, portal-architecture-phase2 (committed).
Scope: reconcile the documented role model with the implemented one. Documentation-level change only; no code behavior changes.
Out of scope: adding/removing roles, changing app assignments, editing closed specs.

## Problem

`commercial-ops` appears in closed documents as a base role:

- `sdd/core/spec-core-v1.md` — "Modelo de roles base".
- `sdd/features/anclora-group-internal-portal-v1/anclora-group-internal-portal-v1-spec-v1.md` — "Personas".
- `private-docs/anclora-group-access-architecture-v1.md` — rol base con acceso a Nexus/Synergi/reporting.

The code has never contained `commercial-ops`. Since the bootstrap commit (`09253f3`), the implemented model has 7 roles, with `private-estates-ops` where the specs said `commercial-ops`:

- `group-admin`
- `private-estates-ops`
- `partner-ops`
- `data-ops`
- `content-ops`
- `advisory`
- `growth-ops`

Evidence: `src/lib/group-access.ts` (`GroupRole`), `tests/group-rbac.test.ts`, `docs/claude-code/internal/01_anclora-group_internal.md`, `docs/claude-code/ECOSYSTEM_OVERVIEW.md`. Git history shows `commercial-ops` was never reconciled after the initial rename.

Per AGENTS.md SDD rules ("spec inmutable", "el core spec manda sobre las features"), the divergence requires a new spec rather than editing the closed ones.

## Decision

1. The **authoritative role model is the implemented one**: the 7 roles above, defined in `src/lib/group-access.ts` and enforced by `isGroupRole()` fail-closed validation.
2. `commercial-ops` is **superseded by `private-estates-ops`** as of this spec. Any future role-model change (add/remove/rename a role) requires a new spec in `sdd/features/`.
3. Closed documents keep their historical content unchanged (spec inmutable). This spec supersedes their role lists where they conflict.
4. `private-docs/anclora-group-access-architecture-v1.md` is a living document of this repo; its role list is updated to match section 1 (done in this change).

## Acceptance criteria

- [x] No code or test references `commercial-ops`.
- [x] `private-docs/anclora-group-access-architecture-v1.md` role list matches the 7 implemented roles.
- [x] This spec exists and records the supersession.
