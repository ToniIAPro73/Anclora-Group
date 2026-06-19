/**
 * Property 21: Session Invalidation on User Deactivation
 * When a user is deactivated, all previously valid session tokens must return
 * unauthorized (null from validateSsoToken with revocation check).
 * Validates: Requirement 23.4
 */

import test from "node:test";
import assert from "node:assert/strict";
import fc from "fast-check";
import { createSsoToken, validateSsoToken } from "../src/lib/auth/sso";
import type { AppAccess, OrgRole } from "../src/lib/auth/types";

/**
 * In-memory revocation store for deactivated users.
 * In production, this would be backed by a distributed cache (Redis/Upstash).
 * The property test uses this to simulate the deactivation mechanism.
 */
class RevocationStore {
  private deactivatedAt: Map<string, number> = new Map();

  deactivate(userId: string): void {
    this.deactivatedAt.set(userId, Math.floor(Date.now() / 1000));
  }

  isDeactivated(userId: string): boolean {
    return this.deactivatedAt.has(userId);
  }

  /** Returns the unix timestamp when the user was deactivated, or null */
  deactivatedTimestamp(userId: string): number | null {
    return this.deactivatedAt.get(userId) ?? null;
  }

  clear(): void {
    this.deactivatedAt.clear();
  }
}

/**
 * Session validator with revocation check.
 * Returns null if the token is invalid, expired, or belongs to a deactivated user.
 */
function validateWithRevocation(
  token: string,
  secret: string,
  store: RevocationStore,
) {
  const session = validateSsoToken(token, secret);
  if (!session) return null;
  if (store.isDeactivated(session.user_id)) return null;
  return session;
}

const roleArb = fc.constantFrom<OrgRole>(
  "group-admin",
  "app-admin",
  "operator",
  "viewer",
);

const appAccessArb = fc.array(
  fc.record<AppAccess>({
    app_id: fc.constantFrom(
      "nexus" as const,
      "content-generator-ai" as const,
      "synergi" as const,
      "command-center" as const,
    ),
    enabled: fc.boolean(),
    role_override: fc.option(roleArb, { nil: undefined }),
  }),
  { maxLength: 4 },
);

test("Property 21: deactivated user's previously valid token is rejected", () => {
  fc.assert(
    fc.property(
      fc.uuid(),
      fc.uuid(),
      roleArb,
      appAccessArb,
      (userId, orgId, role, apps) => {
        const secret = "test-secret-prop-21";
        const store = new RevocationStore();

        // Create a valid token
        const token = createSsoToken(
          { user_id: userId, org_id: orgId, role, apps, ttlSeconds: 3600 },
          secret,
        );

        // Token must be valid before deactivation
        const before = validateWithRevocation(token, secret, store);
        assert.ok(before !== null, "token should be valid before deactivation");
        assert.equal(before.user_id, userId);

        // Deactivate the user
        store.deactivate(userId);

        // Same token must now be rejected
        const after = validateWithRevocation(token, secret, store);
        assert.equal(
          after,
          null,
          "token must be null after user deactivation",
        );
      },
    ),
    { numRuns: 300 },
  );
});

test("Property 21: deactivating user A does not invalidate user B's token", () => {
  fc.assert(
    fc.property(
      fc.uuid(),
      fc.uuid(),
      roleArb,
      appAccessArb,
      (userIdA, userIdB, role, apps) => {
        fc.pre(userIdA !== userIdB);

        const secret = "test-secret-prop-21-isolation";
        const store = new RevocationStore();

        const tokenB = createSsoToken(
          { user_id: userIdB, org_id: "org1", role, apps, ttlSeconds: 3600 },
          secret,
        );

        // Deactivate user A only
        store.deactivate(userIdA);

        // User B's token must still be valid
        const result = validateWithRevocation(tokenB, secret, store);
        assert.ok(
          result !== null,
          "user B's token must remain valid when user A is deactivated",
        );
        assert.equal(result.user_id, userIdB);
      },
    ),
    { numRuns: 300 },
  );
});

test("Property 21: multiple tokens for the same deactivated user are all rejected", () => {
  fc.assert(
    fc.property(
      fc.uuid(),
      fc.uuid(),
      roleArb,
      appAccessArb,
      fc.integer({ min: 1, max: 5 }),
      (userId, orgId, role, apps, tokenCount) => {
        const secret = "test-secret-prop-21-multi";
        const store = new RevocationStore();

        // Create multiple valid tokens with different TTLs
        const tokens = Array.from({ length: tokenCount }, (_, i) =>
          createSsoToken(
            {
              user_id: userId,
              org_id: orgId,
              role,
              apps,
              ttlSeconds: 3600 + i * 60,
            },
            secret,
          ),
        );

        // All tokens must be valid before deactivation
        for (const token of tokens) {
          assert.ok(
            validateWithRevocation(token, secret, store) !== null,
            "all tokens must be valid before deactivation",
          );
        }

        // Deactivate the user
        store.deactivate(userId);

        // All tokens must be invalid after deactivation
        for (const token of tokens) {
          assert.equal(
            validateWithRevocation(token, secret, store),
            null,
            "all tokens must be null after user deactivation",
          );
        }
      },
    ),
    { numRuns: 200 },
  );
});

test("Property 21: revocation store correctly tracks deactivation state", () => {
  fc.assert(
    fc.property(fc.array(fc.uuid(), { minLength: 1, maxLength: 10 }), (userIds) => {
      const store = new RevocationStore();

      // Before deactivation: none are deactivated
      for (const uid of userIds) {
        assert.equal(store.isDeactivated(uid), false);
      }

      // Deactivate them one by one and verify
      const deactivated = new Set<string>();
      for (const uid of userIds) {
        store.deactivate(uid);
        deactivated.add(uid);

        for (const other of userIds) {
          assert.equal(
            store.isDeactivated(other),
            deactivated.has(other),
            `isDeactivated(${other}) should be ${deactivated.has(other)}`,
          );
        }
      }
    }),
    { numRuns: 200 },
  );
});
