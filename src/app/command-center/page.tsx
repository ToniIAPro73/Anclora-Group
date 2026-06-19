/**
 * Command Center — unified ecosystem health and metrics dashboard.
 * Implements requirement 22: health polling, 60s alert display, pipeline metrics,
 * RAG quality scores, content throughput, and group-admin role enforcement.
 */

import { requireGroupSession } from "@/lib/group-auth";
import { redirect } from "next/navigation";
import type {
  EcosystemHealthStatus,
  EcosystemMetrics,
} from "@/lib/command-center/aggregator";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function fetchHealth(): Promise<EcosystemHealthStatus | null> {
  try {
    const base = process.env.NEXT_PUBLIC_COMMAND_CENTER_BASE_URL ?? "";
    const secret = process.env.COMMAND_CENTER_INTERNAL_TOKEN ?? "";
    if (!base || !secret) return null;

    const res = await fetch(`${base}/api/command-center/health`, {
      headers: { Authorization: `Bearer ${secret}` },
      next: { revalidate: 0 },
    });
    if (!res.ok) return null;
    return (await res.json()) as EcosystemHealthStatus;
  } catch {
    return null;
  }
}

async function fetchMetrics(): Promise<EcosystemMetrics | null> {
  try {
    const base = process.env.NEXT_PUBLIC_COMMAND_CENTER_BASE_URL ?? "";
    const secret = process.env.COMMAND_CENTER_INTERNAL_TOKEN ?? "";
    if (!base || !secret) return null;

    const res = await fetch(`${base}/api/command-center/metrics`, {
      headers: { Authorization: `Bearer ${secret}` },
      next: { revalidate: 0 },
    });
    if (!res.ok) return null;
    return (await res.json()) as EcosystemMetrics;
  } catch {
    return null;
  }
}

function statusBadge(status: string) {
  const colours: Record<string, string> = {
    healthy: "bg-green-100 text-green-800",
    degraded: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
    unknown: "bg-gray-100 text-gray-600",
  };
  return colours[status] ?? colours.unknown;
}

export default async function CommandCenterPage() {
  const session = await requireGroupSession();
  if (session.role !== "group-admin") {
    redirect("/workspace");
  }

  const [health, metrics] = await Promise.all([fetchHealth(), fetchMetrics()]);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Command Center</h1>
        <p className="mt-1 text-sm text-gray-500">
          Anclora Group — Ecosystem Health &amp; Operations Dashboard
        </p>
        {health && (
          <p className="mt-1 text-xs text-gray-400">
            Last checked:{" "}
            {new Date(health.checked_at).toLocaleString("es-ES")}
          </p>
        )}
      </header>

      {/* Alerts */}
      {health && health.alerts.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-red-700">
            Active Alerts ({health.alerts.length})
          </h2>
          <ul className="space-y-2">
            {health.alerts.map((alert) => (
              <li
                key={alert.alert_id}
                className={`rounded-lg border px-4 py-3 text-sm ${
                  alert.severity === "critical"
                    ? "border-red-300 bg-red-50 text-red-800"
                    : "border-yellow-300 bg-yellow-50 text-yellow-800"
                }`}
              >
                <span className="font-medium uppercase">[{alert.severity}]</span>{" "}
                <span className="font-semibold">{alert.app_id}</span> —{" "}
                {alert.message}
                <span className="ml-2 text-xs opacity-70">
                  {new Date(alert.detected_at).toLocaleTimeString("es-ES")}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* App Health Grid */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-gray-800">
          Application Health
        </h2>
        {health ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {health.applications.map((app) => (
              <div
                key={app.app_id}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {app.app_id}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusBadge(app.status)}`}
                  >
                    {app.status}
                  </span>
                </div>
                {app.latency_ms !== undefined && (
                  <p className="text-xs text-gray-400">{app.latency_ms}ms</p>
                )}
                {app.error && (
                  <p className="mt-1 text-xs text-red-500 truncate">
                    {app.error}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Health data unavailable — configure NEXT_PUBLIC_COMMAND_CENTER_BASE_URL.
          </p>
        )}
      </section>

      {/* Metrics */}
      {metrics && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Pipeline */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-gray-800">
              Commercial Pipeline (Nexus)
            </h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Total leads</dt>
                <dd className="font-medium">{metrics.pipeline.leads_total}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Hot</dt>
                <dd className="font-medium text-red-600">
                  {metrics.pipeline.leads_by_temperature.hot}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Warm</dt>
                <dd className="font-medium text-yellow-600">
                  {metrics.pipeline.leads_by_temperature.warm}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Cold</dt>
                <dd className="font-medium text-blue-600">
                  {metrics.pipeline.leads_by_temperature.cold}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Stale</dt>
                <dd className="font-medium text-orange-500">
                  {metrics.pipeline.leads_stale}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Conversion rate</dt>
                <dd className="font-medium">
                  {(metrics.pipeline.conversion_rate * 100).toFixed(1)}%
                </dd>
              </div>
            </dl>
          </section>

          {/* RAG Quality */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-gray-800">
              RAG Quality (Advisor AI)
            </h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Composite score</dt>
                <dd
                  className={`font-bold ${
                    metrics.rag_quality.composite_score >= 0.7
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {metrics.rag_quality.composite_score.toFixed(2)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Status</dt>
                <dd
                  className={`font-medium ${
                    metrics.rag_quality.passed
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {metrics.rag_quality.passed ? "PASSED" : "BELOW THRESHOLD"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Evaluated at</dt>
                <dd className="text-gray-700">
                  {new Date(metrics.rag_quality.evaluated_at).toLocaleTimeString(
                    "es-ES",
                  )}
                </dd>
              </div>
            </dl>
          </section>

          {/* Content Throughput */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-gray-800">
              Content Throughput (Content Gen AI)
            </h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Jobs (24h)</dt>
                <dd className="font-medium">
                  {metrics.content_throughput.jobs_completed_last_24h}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Jobs pending</dt>
                <dd className="font-medium">
                  {metrics.content_throughput.jobs_pending}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Avg generation</dt>
                <dd className="font-medium">
                  {metrics.content_throughput.average_generation_ms}ms
                </dd>
              </div>
            </dl>
          </section>
        </div>
      )}
    </main>
  );
}
