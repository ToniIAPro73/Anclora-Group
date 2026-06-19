/**
 * Organization role propagation across ecosystem applications.
 * Implements requirements 23.2 (propagate within 60s) and 23.4 (immediate session invalidation).
 */

import type { OrgRole, AppId } from "./types";

/** Connected applications that receive role propagation events */
const PROPAGATION_TARGETS: AppId[] = [
  "nexus",
  "content-generator-ai",
  "synergi",
];

const APP_BASE_URLS: Record<AppId, string> = {
  nexus: process.env.NEXUS_BASE_URL ?? "",
  "content-generator-ai": process.env.CONTENT_GEN_BASE_URL ?? "",
  synergi: process.env.SYNERGI_BASE_URL ?? "",
  "command-center": "",
};

const INTERNAL_API_KEY = process.env.GROUP_INTERNAL_API_KEY ?? "";

export interface RolePropagationEvent {
  event_type: "role_changed";
  user_id: string;
  org_id: string;
  new_role: OrgRole;
  propagated_at: string; // ISO 8601
}

export interface DeactivationEvent {
  event_type: "user_deactivated";
  user_id: string;
  org_id: string;
  deactivated_at: string; // ISO 8601
}

export type PropagationResult = {
  app_id: AppId;
  success: boolean;
  error?: string;
};

/** Propagate a role change to all connected applications */
export async function propagateRoleChange(
  userId: string,
  orgId: string,
  newRole: OrgRole,
): Promise<PropagationResult[]> {
  const event: RolePropagationEvent = {
    event_type: "role_changed",
    user_id: userId,
    org_id: orgId,
    new_role: newRole,
    propagated_at: new Date().toISOString(),
  };

  const results = await Promise.all(
    PROPAGATION_TARGETS.map((appId) => sendPropagationEvent(appId, event)),
  );

  return results;
}

/**
 * Deactivate a user across all applications.
 * Invalidates all active sessions immediately (requirement 23.4).
 */
export async function deactivateUser(
  userId: string,
  orgId: string,
): Promise<PropagationResult[]> {
  const event: DeactivationEvent = {
    event_type: "user_deactivated",
    user_id: userId,
    org_id: orgId,
    deactivated_at: new Date().toISOString(),
  };

  const results = await Promise.all(
    PROPAGATION_TARGETS.map((appId) => sendDeactivationEvent(appId, event)),
  );

  return results;
}

async function sendPropagationEvent(
  appId: AppId,
  event: RolePropagationEvent,
): Promise<PropagationResult> {
  const baseUrl = APP_BASE_URLS[appId];
  if (!baseUrl) {
    return { app_id: appId, success: false, error: "Base URL not configured" };
  }

  try {
    const response = await fetch(
      `${baseUrl}/api/v1/internal/identity/role-changed`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-group-internal-api-key": INTERNAL_API_KEY,
        },
        body: JSON.stringify(event),
      },
    );

    if (!response.ok) {
      return {
        app_id: appId,
        success: false,
        error: `HTTP ${response.status}`,
      };
    }
    return { app_id: appId, success: true };
  } catch (err) {
    return {
      app_id: appId,
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

async function sendDeactivationEvent(
  appId: AppId,
  event: DeactivationEvent,
): Promise<PropagationResult> {
  const baseUrl = APP_BASE_URLS[appId];
  if (!baseUrl) {
    return { app_id: appId, success: false, error: "Base URL not configured" };
  }

  try {
    const response = await fetch(
      `${baseUrl}/api/v1/internal/identity/user-deactivated`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-group-internal-api-key": INTERNAL_API_KEY,
        },
        body: JSON.stringify(event),
      },
    );

    if (!response.ok) {
      return {
        app_id: appId,
        success: false,
        error: `HTTP ${response.status}`,
      };
    }
    return { app_id: appId, success: true };
  } catch (err) {
    return {
      app_id: appId,
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

/** Returns whether all propagation targets acknowledged the event */
export function allPropagated(results: PropagationResult[]): boolean {
  return results.every((r) => r.success);
}

/** Returns the list of failed application IDs */
export function failedApps(results: PropagationResult[]): AppId[] {
  return results.filter((r) => !r.success).map((r) => r.app_id);
}
