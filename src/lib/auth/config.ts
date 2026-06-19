/**
 * Better Auth configuration for Anclora Group ecosystem.
 * Implements requirement 16.1: unified auth provider for Nexus, Content Gen, Synergi.
 * Implements requirement 23.1: organization-level identity.
 */

import type { AppId, OrgRole } from "./types";

/** Better Auth provider configuration */
export type BetterAuthConfig = {
  /** Base URL of the Better Auth server */
  baseUrl: string;
  /** Secret key for signing session tokens */
  secret: string;
  /** Session token expiry in seconds (default: 7 days) */
  sessionMaxAge: number;
  /** Applications configured for SSO */
  trustedApps: TrustedAppConfig[];
  /** Organization plugin configuration */
  organization: OrganizationPluginConfig;
};

/** Trusted application configuration for SSO */
export type TrustedAppConfig = {
  app_id: AppId;
  /** Base URL of the application */
  baseUrl: string;
  /** Allowed redirect URIs for this app */
  redirectUris: string[];
  /** Whether the app accepts SSO tokens from this provider */
  ssoEnabled: boolean;
};

/** Organization plugin configuration */
export type OrganizationPluginConfig = {
  /** Allow users to belong to multiple organizations */
  multiOrg: boolean;
  /** Default role assigned to new members */
  defaultRole: OrgRole;
  /** Allowed roles in the system */
  allowedRoles: readonly OrgRole[];
  /** Maximum propagation time for role changes (milliseconds) */
  rolePropagationMaxMs: number;
};

const DEFAULT_SESSION_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds
const ROLE_PROPAGATION_MAX_MS = 60_000; // 60 seconds per requirement 23.2

/**
 * Creates the Better Auth configuration from environment variables.
 * All sensitive values must come from environment, never hardcoded.
 */
export function createBetterAuthConfig(): BetterAuthConfig {
  const baseUrl = getEnvOrThrow("BETTER_AUTH_URL");
  const secret = getEnvOrThrow("BETTER_AUTH_SECRET");

  return {
    baseUrl,
    secret,
    sessionMaxAge: DEFAULT_SESSION_MAX_AGE,
    trustedApps: buildTrustedApps(),
    organization: {
      multiOrg: true,
      defaultRole: "viewer",
      allowedRoles: ["group-admin", "app-admin", "operator", "viewer"],
      rolePropagationMaxMs: ROLE_PROPAGATION_MAX_MS,
    },
  };
}

function buildTrustedApps(): TrustedAppConfig[] {
  return [
    {
      app_id: "nexus",
      baseUrl: getEnvOrDefault(
        "BETTER_AUTH_NEXUS_URL",
        "https://anclora-nexus-frontend.vercel.app",
      ),
      redirectUris: ["/auth/callback", "/api/auth/callback"],
      ssoEnabled: true,
    },
    {
      app_id: "content-generator-ai",
      baseUrl: getEnvOrDefault(
        "BETTER_AUTH_CONTENT_GEN_URL",
        "https://anclora-content-generator-ai.vercel.app",
      ),
      redirectUris: ["/auth/callback", "/api/auth/callback"],
      ssoEnabled: true,
    },
    {
      app_id: "synergi",
      baseUrl: getEnvOrDefault(
        "BETTER_AUTH_SYNERGI_URL",
        "https://anclora-synergi.vercel.app",
      ),
      redirectUris: ["/auth/callback", "/api/auth/callback"],
      ssoEnabled: true,
    },
    {
      app_id: "command-center",
      baseUrl: getEnvOrDefault(
        "BETTER_AUTH_COMMAND_CENTER_URL",
        "https://anclora-command-center.vercel.app",
      ),
      redirectUris: ["/auth/callback", "/api/auth/callback"],
      ssoEnabled: true,
    },
  ];
}

function getEnvOrThrow(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Better Auth cannot start without it.`,
    );
  }
  return value;
}

function getEnvOrDefault(name: string, fallback: string): string {
  return process.env[name]?.trim() || fallback;
}
