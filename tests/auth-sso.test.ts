import test from "node:test";
import assert from "node:assert/strict";
import {
  createSsoToken,
  validateSsoToken,
  hasAppAccess,
  getEffectiveRole,
} from "../src/lib/auth/sso";
import type {
  AppAccess,
  BetterAuthSessionPayload,
} from "../src/lib/auth/types";

const TEST_SECRET = "test-secret-for-sso-unit-tests";

const sampleApps: AppAccess[] = [
  { app_id: "nexus", enabled: true },
  { app_id: "content-generator-ai", enabled: true },
  { app_id: "synergi", enabled: true, role_override: "operator" },
  { app_id: "command-center", enabled: false },
];

test("createSsoToken produces a token starting with the correct prefix", () => {
  const token = createSsoToken(
    { user_id: "u1", org_id: "org1", role: "app-admin", apps: sampleApps },
    TEST_SECRET,
  );
  assert.ok(token.startsWith("ba_sso_v1."));
});

test("validateSsoToken decodes a valid token", () => {
  const token = createSsoToken(
    { user_id: "u1", org_id: "org1", role: "app-admin", apps: sampleApps },
    TEST_SECRET,
  );
  const result = validateSsoToken(token, TEST_SECRET);
  assert.ok(result !== null);
  assert.equal(result.user_id, "u1");
  assert.equal(result.org_id, "org1");
  assert.equal(result.role, "app-admin");
  assert.equal(result.apps.length, 4);
});

test("validateSsoToken rejects token with wrong secret", () => {
  const token = createSsoToken(
    { user_id: "u1", org_id: "org1", role: "viewer", apps: [] },
    TEST_SECRET,
  );
  const result = validateSsoToken(token, "wrong-secret");
  assert.equal(result, null);
});

test("validateSsoToken rejects expired token", () => {
  const token = createSsoToken(
    { user_id: "u1", org_id: "org1", role: "viewer", apps: [], ttlSeconds: -1 },
    TEST_SECRET,
  );
  const result = validateSsoToken(token, TEST_SECRET);
  assert.equal(result, null);
});

test("validateSsoToken rejects malformed tokens", () => {
  assert.equal(validateSsoToken("", TEST_SECRET), null);
  assert.equal(validateSsoToken("not-a-token", TEST_SECRET), null);
  assert.equal(validateSsoToken("ba_sso_v1.", TEST_SECRET), null);
  assert.equal(validateSsoToken("ba_sso_v1.abc", TEST_SECRET), null);
});

test("hasAppAccess grants group-admin access to everything", () => {
  const session: BetterAuthSessionPayload = {
    user_id: "u1",
    org_id: "org1",
    role: "group-admin",
    apps: [],
    issued_at: 0,
    expires_at: 9999999999,
  };
  assert.equal(hasAppAccess(session, "nexus"), true);
  assert.equal(hasAppAccess(session, "command-center"), true);
});

test("hasAppAccess checks app-level access for non-admin roles", () => {
  const session: BetterAuthSessionPayload = {
    user_id: "u1",
    org_id: "org1",
    role: "app-admin",
    apps: sampleApps,
    issued_at: 0,
    expires_at: 9999999999,
  };
  assert.equal(hasAppAccess(session, "nexus"), true);
  assert.equal(hasAppAccess(session, "command-center"), false); // disabled
});

test("getEffectiveRole uses role_override when present", () => {
  const session: BetterAuthSessionPayload = {
    user_id: "u1",
    org_id: "org1",
    role: "app-admin",
    apps: sampleApps,
    issued_at: 0,
    expires_at: 9999999999,
  };
  assert.equal(getEffectiveRole(session, "synergi"), "operator");
  assert.equal(getEffectiveRole(session, "nexus"), "app-admin");
});

test("getEffectiveRole falls back to org role for unknown apps", () => {
  const session: BetterAuthSessionPayload = {
    user_id: "u1",
    org_id: "org1",
    role: "operator",
    apps: [],
    issued_at: 0,
    expires_at: 9999999999,
  };
  assert.equal(getEffectiveRole(session, "nexus"), "operator");
});
