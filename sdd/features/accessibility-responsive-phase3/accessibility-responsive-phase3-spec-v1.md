# Accessibility, Responsive & Theme Hardening Phase 3 — Spec v1

Status: implemented
Depends on: security-hardening-phase1, portal-architecture-phase2 (both committed, not reopened).
Scope: accessibility, keyboard, focus, reduced motion, theme consistency, touch targets, responsive polish.
Out of scope: functional architecture changes, i18n, visual redesign, any Phase 1 security mechanism.

## Post-Phase-2 findings verified as real

- Cookie modal has `role="dialog"`/`aria-modal` but no focus trap, no Escape, no initial focus, no focus restoration.
- Legal documents render section titles as `<strong>` instead of headings.
- Login inputs lack `name`/`autocomplete`; error message lacks `role="alert"`.
- No global `:focus-visible` treatment; focus is a subtle color change only.
- No `prefers-reduced-motion` handling (halo sweep animation runs unconditionally).
- Light theme tokens exist (`body[data-theme='light']`) but all surfaces are hardcoded dark rgba gradients; no theme toggle exists anywhere; light theme is broken dead code.
- Placeholder contrast ~0.34 alpha (too low).
- Footer legal links and filter chips below comfortable touch targets.
- Dead CSS from Phase 2 removal: `.group-hero*`, `.group-architecture-card*`, `.group-architecture-logo*`.
- `.group-login-shell` uses rigid `100vh` (mobile landscape clipping risk).
- Catalog card logo uses `alt={app.title}` immediately followed by an h3 with the same text (redundant for AT).
- forbidden.tsx uses h2 as its only heading.

## Requirements and acceptance criteria

### R1 — Semantics

- Exactly one logical h1 per page; legal document blocks use h2; forbidden page uses h1.
- Landmarks: header/nav/main/footer present on all portal pages.
- Acceptance: DOM inspection + manual keyboard pass.

### R2 — Login accessibility

- Inputs get `name` and `autocomplete="username"` / `current-password`.
- Error message gets `role="alert"`.
- Security messages unchanged (no user enumeration).

### R3 — Cookie consent dialog

- Initial focus on the dialog container (aria-labelledby + aria-describedby), focus trap on Tab/Shift+Tab, Escape closes without persisting (banner reappears next visit until a choice is made), focus restored to the invoking element on close, body scroll locked while open.
- Consent parse/serialize extracted to pure `src/lib/group-consent.ts` for testability.
- Acceptance: unit tests for consent helpers; manual keyboard verification.

### R4 — Focus visible

- Global `:focus-visible` style: 2px outline in a high-contrast token with offset, respecting border-radius. No outline removal without equivalent.

### R5 — Reduced motion

- `@media (prefers-reduced-motion: reduce)`: animations and long transitions disabled, halo sweep off. Functional feedback (focus, active states) remains.

### R6 — Theme decision: dark-only

- Evidence: no theme toggle exists in the UI; light theme surfaces are hardcoded dark and broken; docs already state Spanish-only/dark-default reality.
- Decision (brief §11 option B): remove the broken light theme. Delete `body[data-theme='light']` tokens, the `data-theme` plumbing, `getGroupDefaultTheme`/`pickTheme`, and `NEXT_PUBLIC_GROUP_DEFAULT_THEME` from `.env.example` (marked as removed).
- Acceptance: no dead theme code; dark theme unchanged visually.

### R7 — Touch targets and contrast

- Portal nav links min-height 44px; chips 40px; footer legal links get padded hit areas (~44px); placeholder alpha raised for legibility.

### R8 — Responsive polish

- `100vh` → `100svh` on full-height shells. Verify mobile/tablet landscape (812×375, 1180×820) without clipping or horizontal scroll. No new overflow hacks.

### R9 — Cleanup

- Remove dead CSS: `.group-hero*`, `.group-architecture-card*`, `.group-architecture-logo*`, `.group-architecture-card-top`. Catalog card logo alt → decorative (`alt=""`).

### R10 — Tests

- New: `tests/group-consent.test.ts` (parse valid/invalid/missing stored consent; serialize shape). Phase 1+2 suites stay green (59 tests).

## Non-goals

Everything in the phase brief section 29. No axe/Playwright installation; manual QA with agent-browser.
