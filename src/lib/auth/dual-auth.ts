/**
 * Dual-auth window for Supabase → Better Auth migration in Nexus.
 * Implements requirement 16.4: 30-day dual-auth window accepting both token types.
 *
 * During the migration period, Nexus accepts both Supabase JWT tokens and
 * Better Auth SSO tokens. After the window closes, only Better Auth tokens
 * are accepted.
 */

import { createHmac } from "node:crypto";
import { validateSsoToken } from "./sso";
import type { DualAuthResult, SupabaseSessionPayload } from "./types";

const DUAL_AUTH_WINDOW_DAYS = 30;

export type DualAuthConfig = {
  /** Better Auth secret for SSO token validation */
  betterAuthSecret: string;
  /** Supabase JWT secret for legacy token validation */
  supabaseJwtSecret: string;
  /** Date when the migration window started (ISO 8601) */
  migrationStartDate: string;
};

/**
 * Determines whether the dual-auth window is currently active.
 * The window lasts 30 days from the configured migration start date.
 */
export function isDualAuthWindowActive(config: DualAuthConfig): boolean {
  const start = new Date(config.migrationStartDate);
  const end = new Date(
    start.getTime() + DUAL_AUTH_WINDOW_DAYS * 24 * 60 * 60 * 1000,
  );
  const now = new Date();
  return now >= start && now <= end;
}

/**
 * Returns the number of days remaining in the dual-auth window.
 * Returns 0 if the window has expired or has not started.
 */
export function dualAuthDaysRemaining(config: DualAuthConfig): number {
  const start = new Date(config.migrationStartDate);
  const end = new Date(
    start.getTime() + DUAL_AUTH_WINDOW_DAYS * 24 * 60 * 60 * 1000,
  );
  const now = new Date();

  if (now < start || now > end) return 0;

  const remaining = Math.ceil(
    (end.getTime() - now.getTime()) / (24 * 60 * 60 * 1000),
  );
  return Math.max(0, remaining);
}

/**
 * Validates an authentication token during the dual-auth migration window.
 *
 * Strategy:
 * 1. Try Better Auth SSO token first (preferred path).
 * 2. If that fails and dual-auth window is active, try Supabase JWT.
 * 3. If both fail, return provider: "none".
 */
export function validateDualAuth(
  token: string,
  config: DualAuthConfig,
): DualAuthResult {
  // 1. Try Better Auth first
  const betterAuthSession = validateSsoToken(token, config.betterAuthSecret);
  if (betterAuthSession) {
    return { provider: "better-auth", session: betterAuthSession };
  }

  // 2. If dual-auth window is active, try Supabase JWT
  if (isDualAuthWindowActive(config)) {
    const supabaseSession = validateSupabaseToken(
      token,
      config.supabaseJwtSecret,
    );
    if (supabaseSession) {
      return { provider: "supabase", session: supabaseSession };
    }
  }

  // 3. Neither provider could validate the token
  const windowActive = isDualAuthWindowActive(config);
  return {
    provider: "none",
    reason: windowActive
      ? "Token invalid for both Better Auth and Supabase providers"
      : "Token invalid for Better Auth (Supabase migration window has expired)",
  };
}

/**
 * Validates a Supabase JWT token using HMAC-SHA256 verification.
 * This is a simplified validation for the migration period.
 * In production, Supabase uses RS256, but for internal service-to-service
 * validation within the migration window, the JWT secret approach is acceptable.
 */
function validateSupabaseToken(
  token: string,
  jwtSecret: string,
): SupabaseSessionPayload | null {
  const parts = token.split(".");
  if (parts.length !== 3) {
    return null;
  }

  const [headerB64, payloadB64, signatureB64] = parts;

  // Verify signature
  const signingInput = `${headerB64}.${payloadB64}`;
  const expectedSignature = createHmac("sha256", jwtSecret)
    .update(signingInput)
    .digest("base64url");

  if (expectedSignature !== signatureB64) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf8"),
    ) as SupabaseSessionPayload;

    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp <= now) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/** The migration window duration in days */
export { DUAL_AUTH_WINDOW_DAYS };
