/**
 * Better Auth unified provider for Anclora Group ecosystem.
 *
 * Public API surface for organization-level identity, SSO, role management,
 * and the Supabase → Better Auth dual-auth migration window.
 */

// Types
export type {
  OrgRole,
  AppId,
  AppAccess,
  OrganizationMember,
  OrganizationIdentity,
  BetterAuthSessionPayload,
  SupabaseSessionPayload,
  DualAuthResult,
} from "./types";

// Role hierarchy and permissions
export {
  ROLE_HIERARCHY,
  getRoleRank,
  isRoleAtLeast,
  isRoleAbove,
  getPermissions,
  hasPermission,
  validateHierarchyIntegrity,
} from "./roles";
export type { Permission } from "./roles";

// Configuration
export { createBetterAuthConfig } from "./config";
export type {
  BetterAuthConfig,
  TrustedAppConfig,
  OrganizationPluginConfig,
} from "./config";

// SSO
export {
  createSsoToken,
  validateSsoToken,
  hasAppAccess,
  getEffectiveRole,
  SSO_TOKEN_VERSION,
} from "./sso";
export type { SsoTokenCreateParams } from "./sso";

// Dual-auth migration
export {
  isDualAuthWindowActive,
  dualAuthDaysRemaining,
  validateDualAuth,
  DUAL_AUTH_WINDOW_DAYS,
} from "./dual-auth";
export type { DualAuthConfig } from "./dual-auth";
