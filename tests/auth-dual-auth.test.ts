import test from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import {
  isDualAuthWindowActive,
  dualAuthDaysRemaining,
  validateDualAuth,
  DUAL_AUTH_WINDOW_DAYS,
} from "../src/lib/auth/dual-auth";
import { createSsoToken } from "../src/lib/auth/sso";
import type { DualAuthConfig } from "../src/lib/auth/dual-auth";

const BETTER_AUTH_SECRET = "test-better-auth-secret";
const SUPABASE_JWT_SECRET = "test-supabase-jwt-secret";

function makeConfig(migrationStartDate: string): DualAuthConfig {
  return {
    betterAuthSecret: BETTER_AUTH_SECRET,
    supabaseJwtSecret: SUPABASE_JWT_SECRET,
    migrationStartDate,
  };
}

function createSupabaseJwt(
  payload: Record<string, unknown>,
  secret: string,
): string {
  const header = Buffer.from(
    JSON.stringify({ alg: "HS256", typ: "JWT" }),
  ).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", secret)
    .update(`${header}.${body}`)
    .digest("base64url");
  return `${header}.${body}.${signature}`;
}

test("DUAL_AUTH_WINDOW_DAYS equals 30", () => {
  assert.equal(DUAL_AUTH_WINDOW_DAYS, 30);
});

test("isDualAuthWindowActive returns true during window", () => {
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  assert.equal(isDualAuthWindowActive(makeConfig(yesterday)), true);
});

test("isDualAuthWindowActive returns false after window expires", () => {
  const farPast = new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toISOString();
  assert.equal(isDualAuthWindowActive(makeConfig(farPast)), false);
});

test("isDualAuthWindowActive returns false before window starts", () => {
  const future = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  assert.equal(isDualAuthWindowActive(makeConfig(future)), false);
});

test("dualAuthDaysRemaining returns correct remaining days", () => {
  const fiveDaysAgo = new Date(
    Date.now() - 5 * 24 * 60 * 60 * 1000,
  ).toISOString();
  const remaining = dualAuthDaysRemaining(makeConfig(fiveDaysAgo));
  assert.ok(remaining >= 24 && remaining <= 26); // approximately 25 days
});

test("dualAuthDaysRemaining returns 0 when window expired", () => {
  const farPast = new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toISOString();
  assert.equal(dualAuthDaysRemaining(makeConfig(farPast)), 0);
});

test("validateDualAuth accepts Better Auth token regardless of window", () => {
  const config = makeConfig(
    new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toISOString(),
  );
  const token = createSsoToken(
    { user_id: "u1", org_id: "org1", role: "operator", apps: [] },
    BETTER_AUTH_SECRET,
  );
  const result = validateDualAuth(token, config);
  assert.equal(result.provider, "better-auth");
  if (result.provider === "better-auth") {
    assert.equal(result.session.user_id, "u1");
  }
});

test("validateDualAuth accepts Supabase JWT during active window", () => {
  const config = makeConfig(
    new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  );
  const jwt = createSupabaseJwt(
    {
      sub: "user-123",
      email: "test@anclora.com",
      role: "authenticated",
      exp: Math.floor(Date.now() / 1000) + 3600,
      iat: Math.floor(Date.now() / 1000),
    },
    SUPABASE_JWT_SECRET,
  );
  const result = validateDualAuth(jwt, config);
  assert.equal(result.provider, "supabase");
  if (result.provider === "supabase") {
    assert.equal(result.session.sub, "user-123");
    assert.equal(result.session.email, "test@anclora.com");
  }
});

test("validateDualAuth rejects Supabase JWT after window expires", () => {
  const config = makeConfig(
    new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toISOString(),
  );
  const jwt = createSupabaseJwt(
    {
      sub: "user-123",
      role: "authenticated",
      exp: Math.floor(Date.now() / 1000) + 3600,
      iat: Math.floor(Date.now() / 1000),
    },
    SUPABASE_JWT_SECRET,
  );
  const result = validateDualAuth(jwt, config);
  assert.equal(result.provider, "none");
  if (result.provider === "none") {
    assert.ok(result.reason.includes("expired"));
  }
});

test("validateDualAuth rejects invalid tokens entirely", () => {
  const config = makeConfig(
    new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  );
  const result = validateDualAuth("garbage-token", config);
  assert.equal(result.provider, "none");
});

test("validateDualAuth rejects expired Supabase JWT during active window", () => {
  const config = makeConfig(
    new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  );
  const jwt = createSupabaseJwt(
    {
      sub: "user-123",
      role: "authenticated",
      exp: Math.floor(Date.now() / 1000) - 100,
      iat: Math.floor(Date.now() / 1000) - 3700,
    },
    SUPABASE_JWT_SECRET,
  );
  const result = validateDualAuth(jwt, config);
  assert.equal(result.provider, "none");
});

test("validateDualAuth prefers Better Auth when both could match", () => {
  const config = makeConfig(
    new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  );
  const token = createSsoToken(
    { user_id: "u1", org_id: "org1", role: "viewer", apps: [] },
    BETTER_AUTH_SECRET,
  );
  const result = validateDualAuth(token, config);
  assert.equal(result.provider, "better-auth");
});
