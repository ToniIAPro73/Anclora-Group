/**
 * GET /api/command-center/health
 * Returns aggregated health status for all ecosystem applications.
 * Requires group-admin role (checked via SSO token in Authorization header).
 * Implements requirement 22.1, 22.2: aggregate health + alert within 60s.
 */

import { NextRequest, NextResponse } from "next/server";
import { aggregateEcosystemHealth } from "@/lib/command-center/aggregator";
import { validateSsoToken, hasPermission } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const ssoSecret = process.env.SSO_SECRET ?? "";

  if (!token || !ssoSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const session = validateSsoToken(token, ssoSecret);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hasPermission(session.role, "view:cross-app-metrics")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const health = await aggregateEcosystemHealth();
  return NextResponse.json(health);
}
