/**
 * Core types for Better Auth organization-level identity.
 * Implements unified identity model for the Anclora Group ecosystem.
 */

/** Role hierarchy: group-admin > app-admin > operator > viewer */
export type OrgRole = "group-admin" | "app-admin" | "operator" | "viewer";

/** Application identifiers within the Anclora ecosystem */
export type AppId =
  | "nexus"
  | "content-generator-ai"
  | "synergi"
  | "command-center";

/** Per-application access configuration for a member */
export type AppAccess = {
  app_id: AppId;
  role_override?: OrgRole;
  enabled: boolean;
};

/** A member within an organization */
export type OrganizationMember = {
  user_id: string;
  role: OrgRole;
  apps: AppAccess[];
  active: boolean;
  joined_at: string;
};

/** Organization-level identity mapping to an Anclora Group entity */
export interface OrganizationIdentity {
  org_id: string;
  org_name: string;
  slug: string;
  members: OrganizationMember[];
  created_at: string;
}

/** Session token payload issued by Better Auth */
export type BetterAuthSessionPayload = {
  user_id: string;
  org_id: string;
  role: OrgRole;
  apps: AppAccess[];
  issued_at: number;
  expires_at: number;
};

/** Legacy Supabase session shape (subset needed for dual-auth) */
export type SupabaseSessionPayload = {
  sub: string;
  email?: string;
  role?: string;
  exp: number;
  iat: number;
};

/** Result of token validation during dual-auth window */
export type DualAuthResult =
  | { provider: "better-auth"; session: BetterAuthSessionPayload }
  | { provider: "supabase"; session: SupabaseSessionPayload }
  | { provider: "none"; reason: string };
