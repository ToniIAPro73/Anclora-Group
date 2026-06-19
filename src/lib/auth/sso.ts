/**
 * SSO token utilities for cross-application authentication.
 * Implements requirement 16.2: SSO token valid across Nexus, Content Gen, Synergi.
 */

import { createHmac, timingSafeEqual } from "node:crypto";
import type {
  AppId,
  BetterAuthSessionPayload,
  OrgRole,
  AppAccess,
} from "./types";

const SSO_TOKEN_VERSION = 1;
const SSO_TOKEN_PREFIX = "ba_sso_v1.";

export type SsoTokenCreateParams = {
  user_id: string;
  org_id: string;
  role: OrgRole;
  apps: AppAccess[];
  /** Token lifetime in seconds (default: 7 days) */
  ttlSeconds?: number;
};

/**
 * Creates a signed SSO token valid across all trusted applications.
 * The token encodes the user's organization identity and role.
 */
export function createSsoToken(
  params: SsoTokenCreateParams,
  secret: string,
): string {
  const now = Math.floor(Date.now() / 1000);
  const ttl = params.ttlSeconds ?? 7 * 24 * 60 * 60;

  const payload: BetterAuthSessionPayload = {
    user_id: params.user_id,
    org_id: params.org_id,
    role: params.role,
    apps: params.apps,
    issued_at: now,
    expires_at: now + ttl,
  };

  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", secret)
    .update(body)
    .digest("base64url");

  return `${SSO_TOKEN_PREFIX}${body}.${signature}`;
}

/**
 * Validates and decodes an SSO token.
 * Returns the session payload if the token is valid and not expired.
 */
export function validateSsoToken(
  token: string,
  secret: string,
): BetterAuthSessionPayload | null {
  if (!token.startsWith(SSO_TOKEN_PREFIX)) {
    return null;
  }

  const stripped = token.slice(SSO_TOKEN_PREFIX.length);
  const dotIndex = stripped.lastIndexOf(".");
  if (dotIndex === -1) {
    return null;
  }

  const body = stripped.slice(0, dotIndex);
  const signature = stripped.slice(dotIndex + 1);

  const expectedSignature = createHmac("sha256", secret)
    .update(body)
    .digest("base64url");

  const expectedBuf = Buffer.from(expectedSignature, "utf8");
  const receivedBuf = Buffer.from(signature, "utf8");

  if (expectedBuf.length !== receivedBuf.length) {
    return null;
  }

  if (!timingSafeEqual(expectedBuf, receivedBuf)) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8"),
    ) as BetterAuthSessionPayload;

    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.expires_at <= now) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Checks whether a validated session has access to a specific application.
 */
export function hasAppAccess(
  session: BetterAuthSessionPayload,
  appId: AppId,
): boolean {
  // group-admin has access to everything
  if (session.role === "group-admin") {
    return true;
  }

  return session.apps.some((app) => app.app_id === appId && app.enabled);
}

/**
 * Resolves the effective role for a user within a specific application.
 * Uses the app-level role override if present, otherwise the org-level role.
 */
export function getEffectiveRole(
  session: BetterAuthSessionPayload,
  appId: AppId,
): OrgRole {
  const appConfig = session.apps.find((app) => app.app_id === appId);
  return appConfig?.role_override ?? session.role;
}

/** Version of the SSO token format */
export { SSO_TOKEN_VERSION };
