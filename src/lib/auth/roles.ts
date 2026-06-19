/**
 * Role hierarchy and permission system.
 * Implements requirement 23.3: group-admin > app-admin > operator > viewer.
 * Property 20: higher role's permission set is a strict superset of lower role's.
 */

import type { OrgRole } from "./types";

/** Enumerated permissions available in the system */
export type Permission =
  | "read:own"
  | "read:all"
  | "write:own"
  | "write:all"
  | "manage:users"
  | "manage:roles"
  | "manage:org"
  | "manage:apps"
  | "view:metrics"
  | "view:cross-app-metrics"
  | "admin:system";

/** Ordered role hierarchy from highest to lowest privilege */
export const ROLE_HIERARCHY: readonly OrgRole[] = [
  "group-admin",
  "app-admin",
  "operator",
  "viewer",
] as const;

/** Permission sets per role. Each higher role is a strict superset of lower roles. */
const ROLE_PERMISSIONS: Record<OrgRole, ReadonlySet<Permission>> = {
  viewer: new Set<Permission>(["read:own"]),
  operator: new Set<Permission>(["read:own", "read:all", "write:own"]),
  "app-admin": new Set<Permission>([
    "read:own",
    "read:all",
    "write:own",
    "write:all",
    "manage:users",
    "manage:roles",
    "view:metrics",
  ]),
  "group-admin": new Set<Permission>([
    "read:own",
    "read:all",
    "write:own",
    "write:all",
    "manage:users",
    "manage:roles",
    "manage:org",
    "manage:apps",
    "view:metrics",
    "view:cross-app-metrics",
    "admin:system",
  ]),
};

/** Returns the numeric rank of a role (0 = highest, 3 = lowest) */
export function getRoleRank(role: OrgRole): number {
  const index = ROLE_HIERARCHY.indexOf(role);
  if (index === -1) {
    throw new Error(`Unknown role: ${role}`);
  }
  return index;
}

/** Returns true if roleA is higher than or equal to roleB in the hierarchy */
export function isRoleAtLeast(roleA: OrgRole, roleB: OrgRole): boolean {
  return getRoleRank(roleA) <= getRoleRank(roleB);
}

/** Returns true if roleA is strictly higher than roleB */
export function isRoleAbove(roleA: OrgRole, roleB: OrgRole): boolean {
  return getRoleRank(roleA) < getRoleRank(roleB);
}

/** Returns the permission set for a given role */
export function getPermissions(role: OrgRole): ReadonlySet<Permission> {
  return ROLE_PERMISSIONS[role];
}

/** Returns true if the role has a specific permission */
export function hasPermission(role: OrgRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].has(permission);
}

/**
 * Validates that the role hierarchy satisfies the superset property:
 * each higher role's permissions are a strict superset of every lower role.
 */
export function validateHierarchyIntegrity(): boolean {
  for (let i = 0; i < ROLE_HIERARCHY.length - 1; i++) {
    const higherRole = ROLE_HIERARCHY[i];
    const lowerRole = ROLE_HIERARCHY[i + 1];
    const higherPerms = ROLE_PERMISSIONS[higherRole];
    const lowerPerms = ROLE_PERMISSIONS[lowerRole];

    // Every permission in lowerRole must exist in higherRole
    for (const perm of lowerPerms) {
      if (!higherPerms.has(perm)) {
        return false;
      }
    }

    // higherRole must have at least one permission not in lowerRole (strict superset)
    let hasExtra = false;
    for (const perm of higherPerms) {
      if (!lowerPerms.has(perm)) {
        hasExtra = true;
        break;
      }
    }
    if (!hasExtra) {
      return false;
    }
  }
  return true;
}
