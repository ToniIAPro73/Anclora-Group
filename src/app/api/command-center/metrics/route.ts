/**
 * GET /api/command-center/metrics
 * Returns aggregated commercial pipeline, RAG quality, and content throughput metrics.
 * Requires group-admin role.
 * Implements requirements 22.3, 22.4, 22.5.
 */

import { NextRequest, NextResponse } from "next/server";
import { aggregateEcosystemMetrics } from "@/lib/command-center/aggregator";
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

  const metrics = await aggregateEcosystemMetrics();
  return NextResponse.json(metrics);
}
