# Security Hardening Phase 1 — Test Plan

Traceability to `security-hardening-phase1-spec-v1.md`.

| Requirement | Test file | Cases |
|---|---|---|
| R1 | `tests/group-session-secret.test.ts` | production missing secret throws; production valid secret works; development/test fallback works; error never contains the secret |
| R2 | `tests/group-passwords.test.ts`, `tests/group-users.test.ts` | correct password verifies; wrong password fails; unknown user fails (dummy compare); plaintext record rejected in production; legacy plaintext works only outside production |
| R3 | `tests/group-rbac.test.ts` | group-admin allowed everywhere; synergi allowed roles; synergi denied roles; data-lab allowed roles; data-lab denied roles; invalid role fail-closed |
| R4 | `tests/group-users.test.ts`, `tests/group-session-token.test.ts` | invalid role in users JSON skipped; invalid bootstrap role rejected; token with invalid role rejected |
| R5 | `tests/group-auth-route.test.ts` | 429 after 5 failed attempts; Retry-After present; 429 message generic |
| R6 | `tests/group-session-token.test.ts` | valid roundtrip; tampered signature; tampered payload; malformed token; expired token; invalid role |
| R9 | `tests/group-auth-route.test.ts` | 400 invalid JSON; 400 non-string fields; 401 wrong credentials generic |
| R7/R8 | manual validation | headers + noindex verified on running server |

Runner: `npm test` (`tsx --test tests/**/*.test.ts`, node:test). No additional test framework.

Manual validation (no real secrets): `/` redirects to `/login`; failed login; successful login with local fixture user (bcrypt hash); `/workspace`; relay allowed; relay denied (403); logout; expired session rejected.
