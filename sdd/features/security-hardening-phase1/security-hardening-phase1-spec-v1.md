# Security & Authorization Hardening Phase 1 — Spec v1

Status: implemented
Scope: S1–S6 + S9 audit findings + auth/RBAC test coverage
Out of scope: UX redesign, architecture redesign, domain config, any item listed in the phase brief section 14.

## Goal

Remove the production security blockers identified in the recent audit before portal.anclora.com goes live.

## Requirements and acceptance criteria

### R1 — Session secret fail-closed (S1)

- `getSessionSecret()` returns the value of `ANCLORA_GROUP_SESSION_SECRET`.
- In `production`, a missing or empty secret throws a descriptive error that never includes the secret value. No default is used.
- In `development`/`test`, an explicit local fallback (`anclora-group-local-dev-secret`) may be used for DX.
- Acceptance: unit tests cover production-missing (throws), production-valid (works), development fallback (works).

### R2 — Password hashing (S2)

- `ANCLORA_GROUP_INTERNAL_USERS_JSON` supports `passwordHash` (bcrypt) per user.
- Bootstrap user supports `ANCLORA_GROUP_BOOTSTRAP_PASSWORD_HASH`.
- Plaintext passwords are never accepted in `production`; records without a hash are rejected fail-closed at parse time.
- A legacy plaintext path (`password` field / `ANCLORA_GROUP_BOOTSTRAP_PASSWORD`) is accepted only when `NODE_ENV !== 'production'`, as a documented development-only compatibility shim.
- Verification uses `bcrypt.compare`; unknown usernames still run one bcrypt compare against a dummy hash to avoid timing-based user enumeration.
- Acceptance: unit tests for valid hash, wrong password, and no-plaintext-in-production.

### R3 — Server-side RBAC (S3)

- `isAppAccessAllowed(role, appKey)` derives allowed roles from the app registry (no duplicated role arrays).
- `requireAppAccess(appKey)` enforces it server-side: no session redirects to `/login`; insufficient role renders the global `forbidden.tsx` with HTTP 403 via `forbidden()`.
- Applied to `/workspace/synergi-access` (synergi) and `/workspace/data-lab-access` (data-lab).
- Acceptance: unit tests for allowed/denied per role per app, invalid role fail-closed.

### R4 — Strict role validation

- `isGroupRole(value)` is the single source of truth.
- Used in: users JSON parse, bootstrap parse, session token verify.
- Invalid role always fails closed (user skipped / session rejected).
- Acceptance: unit tests for each validation point.

### R5 — Login rate limiting (S4)

- `POST /api/auth/session` is rate limited by `IP + username`, fixed window of 15 minutes, max 5 failed attempts.
- Exceeded limit returns HTTP 429 with a generic message and `Retry-After` header; it never reveals whether the username exists.
- Store is in-memory per serverless instance (best-effort); interface is isolated in `group-rate-limit.ts` so a shared store (e.g. Redis) can replace it later. Known limitation, documented.
- Acceptance: route test reaches 429 after the limit.

### R6 — Session iat/exp (S5)

- Session token payload includes `iat` and `exp` (seconds, TTL 12h).
- Verification checks signature, structure, valid role, and `exp` (30s clock tolerance). Expired tokens are rejected.
- Logout clears the cookie (client-side invalidation). Stateless model: no server-side revocation store in this phase; documented.
- Acceptance: unit tests for valid roundtrip, tampered signature, tampered payload, malformed token, expired token, invalid role.

### R7 — Security headers (S6)

- Baseline headers via `next.config.ts` on all routes: CSP, HSTS, X-Content-Type-Options, Referrer-Policy, X-Frame-Options, frame-ancestors (CSP), Permissions-Policy.
- CSP uses `'unsafe-inline'` for scripts/styles because Next.js injects inline assets; nonce-based strict CSP is deferred (documented limitation).
- Acceptance: headers verified against a running server.

### R8 — Portal noindex (S9)

- Root layout metadata sets `robots: { index: false, follow: false }`.
- `X-Robots-Tag: noindex, nofollow` header on all routes.
- No sitemap.
- Acceptance: verified against a running server.

### R9 — Auth route hardening

- `POST` accepts JSON only for login; username/password must be strings with length caps (200 / 256).
- Responses: 400 invalid input, 401 wrong credentials (generic), 429 rate limited, no stack traces, no user enumeration.
- Cookie unchanged: httpOnly, sameSite=lax, secure in production, path=/, no domain attribute, maxAge aligned with token exp.

## Non-goals

Everything in the phase brief section 14. No database, no Auth.js, no OAuth, no external IdP, no middleware-based enforcement replacement.
