import test from "node:test";
import assert from "node:assert/strict";
import {
  ROLE_HIERARCHY,
  getRoleRank,
  isRoleAtLeast,
  isRoleAbove,
  getPermissions,
  hasPermission,
  validateHierarchyIntegrity,
} from "../src/lib/auth/roles";
import type { OrgRole } from "../src/lib/auth/types";

test("role hierarchy has correct order", () => {
  assert.deepEqual(ROLE_HIERARCHY, [
    "group-admin",
    "app-admin",
    "operator",
    "viewer",
  ]);
});

test("getRoleRank returns ascending indices", () => {
  assert.equal(getRoleRank("group-admin"), 0);
  assert.equal(getRoleRank("app-admin"), 1);
  assert.equal(getRoleRank("operator"), 2);
  assert.equal(getRoleRank("viewer"), 3);
});

test("getRoleRank throws for unknown role", () => {
  assert.throws(() => getRoleRank("unknown" as OrgRole), /Unknown role/);
});

test("isRoleAtLeast identifies higher or equal roles", () => {
  assert.equal(isRoleAtLeast("group-admin", "viewer"), true);
  assert.equal(isRoleAtLeast("group-admin", "group-admin"), true);
  assert.equal(isRoleAtLeast("viewer", "group-admin"), false);
  assert.equal(isRoleAtLeast("operator", "app-admin"), false);
  assert.equal(isRoleAtLeast("app-admin", "operator"), true);
});

test("isRoleAbove identifies strictly higher roles", () => {
  assert.equal(isRoleAbove("group-admin", "app-admin"), true);
  assert.equal(isRoleAbove("group-admin", "group-admin"), false);
  assert.equal(isRoleAbove("viewer", "operator"), false);
});

test("group-admin has all permissions including admin:system", () => {
  const perms = getPermissions("group-admin");
  assert.ok(perms.has("admin:system"));
  assert.ok(perms.has("manage:org"));
  assert.ok(perms.has("manage:apps"));
  assert.ok(perms.has("view:cross-app-metrics"));
});

test("viewer has only read:own permission", () => {
  const perms = getPermissions("viewer");
  assert.equal(perms.size, 1);
  assert.ok(perms.has("read:own"));
});

test("operator has read and write:own but not manage permissions", () => {
  const perms = getPermissions("operator");
  assert.ok(perms.has("read:own"));
  assert.ok(perms.has("read:all"));
  assert.ok(perms.has("write:own"));
  assert.ok(!perms.has("manage:users"));
  assert.ok(!perms.has("admin:system"));
});

test("hasPermission returns correct results", () => {
  assert.equal(hasPermission("group-admin", "admin:system"), true);
  assert.equal(hasPermission("viewer", "admin:system"), false);
  assert.equal(hasPermission("operator", "write:own"), true);
});

test("hierarchy integrity validates successfully", () => {
  assert.equal(validateHierarchyIntegrity(), true);
});

test("each higher role is a strict superset of the lower role", () => {
  for (let i = 0; i < ROLE_HIERARCHY.length - 1; i++) {
    const higher = ROLE_HIERARCHY[i];
    const lower = ROLE_HIERARCHY[i + 1];
    const higherPerms = getPermissions(higher);
    const lowerPerms = getPermissions(lower);

    // All lower permissions exist in higher
    for (const perm of lowerPerms) {
      assert.ok(
        higherPerms.has(perm),
        `${higher} should have permission ${perm} from ${lower}`,
      );
    }

    // Higher has at least one extra
    assert.ok(
      higherPerms.size > lowerPerms.size,
      `${higher} should have more permissions than ${lower}`,
    );
  }
});
