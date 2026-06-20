/**
 * Property 20: Role Hierarchy Permission Superset
 * For any pair (higher, lower) drawn from the hierarchy, higher role's permission
 * set is a strict superset of lower role's permission set.
 * Validates: Requirement 23.3
 */

import test from "node:test";
import assert from "node:assert/strict";
import fc from "fast-check";
import {
  ROLE_HIERARCHY,
  getPermissions,
  getRoleRank,
} from "../src/lib/auth/roles";
import type { OrgRole } from "../src/lib/auth/types";

const roleArb = fc.constantFrom<OrgRole>(
  "group-admin",
  "app-admin",
  "operator",
  "viewer",
);

test("Property 20: higher role permissions are a strict superset of lower role permissions", () => {
  fc.assert(
    fc.property(roleArb, roleArb, (roleA, roleB) => {
      // Only test pairs where roleA is strictly above roleB
      if (!isStrictlyAbove(roleA, roleB)) return;

      const higherPerms = getPermissions(roleA);
      const lowerPerms = getPermissions(roleB);

      // Every permission in lowerRole must exist in higherRole
      for (const perm of lowerPerms) {
        assert.ok(
          higherPerms.has(perm),
          `${roleA} must have all permissions of ${roleB}, missing: ${perm}`,
        );
      }

      // higherRole must have at least one permission not in lowerRole (strict superset)
      let hasExtra = false;
      for (const perm of higherPerms) {
        if (!lowerPerms.has(perm)) {
          hasExtra = true;
          break;
        }
      }
      assert.ok(
        hasExtra,
        `${roleA} must have at least one extra permission compared to ${roleB}`,
      );
    }),
    { numRuns: 500 },
  );
});

test("Property 20: role hierarchy is transitive — group-admin is superset of every lower role", () => {
  fc.assert(
    fc.property(roleArb, (lowerRole) => {
      if (lowerRole === "group-admin") return;

      const adminPerms = getPermissions("group-admin");
      const lowerPerms = getPermissions(lowerRole);

      for (const perm of lowerPerms) {
        assert.ok(
          adminPerms.has(perm),
          `group-admin must have ${perm} (from ${lowerRole})`,
        );
      }
    }),
    { numRuns: 200 },
  );
});

test("Property 20: permission sets are strictly ordered — no two distinct roles share the same permission set", () => {
  fc.assert(
    fc.property(roleArb, roleArb, (roleA, roleB) => {
      if (roleA === roleB) return;

      const permsA = getPermissions(roleA);
      const permsB = getPermissions(roleB);

      // Sets must differ — one must be a strict superset of the other
      const aContainsB = [...permsB].every((p) => permsA.has(p));
      const bContainsA = [...permsA].every((p) => permsB.has(p));

      // They cannot both be supersets of each other (that would mean equal sets)
      assert.ok(
        !(aContainsB && bContainsA),
        `${roleA} and ${roleB} must not have identical permission sets`,
      );
    }),
    { numRuns: 200 },
  );
});

function isStrictlyAbove(roleA: OrgRole, roleB: OrgRole): boolean {
  return getRoleRank(roleA) < getRoleRank(roleB);
}

// Exhaust all adjacent pairs explicitly as a deterministic complement
test("Property 20: all adjacent pairs in hierarchy satisfy strict superset (exhaustive)", () => {
  for (let i = 0; i < ROLE_HIERARCHY.length - 1; i++) {
    const higher = ROLE_HIERARCHY[i];
    const lower = ROLE_HIERARCHY[i + 1];
    const higherPerms = getPermissions(higher);
    const lowerPerms = getPermissions(lower);

    for (const perm of lowerPerms) {
      assert.ok(
        higherPerms.has(perm),
        `${higher} must include ${perm} from ${lower}`,
      );
    }
    assert.ok(
      higherPerms.size > lowerPerms.size,
      `${higher} must have strictly more permissions than ${lower}`,
    );
  }
});
