/**
 * Command Center aggregator — health and metrics collection for the Anclora ecosystem.
 * Implements requirement 22: unified health dashboard with 60s alert detection.
 */

export type AppId =
  | "nexus"
  | "advisor-ai"
  | "content-generator-ai"
  | "synergi"
  | "data-lab"
  | "filestudio"
  | "energyscan";

export type HealthStatus = "healthy" | "degraded" | "error" | "unknown";

export interface AppHealthResult {
  app_id: AppId;
  status: HealthStatus;
  last_check: string; // ISO 8601
  latency_ms?: number;
  error?: string;
}

export interface EcosystemAlert {
  alert_id: string;
  app_id: AppId;
  severity: "warning" | "critical";
  message: string;
  detected_at: string; // ISO 8601
  resolved_at?: string;
}

export interface EcosystemHealthStatus {
  checked_at: string;
  applications: AppHealthResult[];
  alerts: EcosystemAlert[];
}

export interface PipelineMetrics {
  leads_total: number;
  leads_by_temperature: { cold: number; warm: number; hot: number };
  leads_stale: number;
  conversion_rate: number;
  source_breakdown: Record<string, number>;
}

export interface RagQualityMetrics {
  composite_score: number;
  passed: boolean;
  evaluated_at: string;
}

export interface ContentThroughputMetrics {
  jobs_completed_last_24h: number;
  jobs_pending: number;
  average_generation_ms: number;
}

export interface EcosystemMetrics {
  pipeline: PipelineMetrics;
  rag_quality: RagQualityMetrics;
  content_throughput: ContentThroughputMetrics;
}

/** Health check endpoint URLs keyed by app_id */
const APP_HEALTH_URLS: Record<AppId, string> = {
  nexus: process.env.NEXUS_BASE_URL
    ? `${process.env.NEXUS_BASE_URL}/api/v1/health`
    : "",
  "advisor-ai": process.env.ADVISOR_AI_BASE_URL
    ? `${process.env.ADVISOR_AI_BASE_URL}/api/health`
    : "",
  "content-generator-ai": process.env.CONTENT_GEN_BASE_URL
    ? `${process.env.CONTENT_GEN_BASE_URL}/api/health`
    : "",
  synergi: process.env.SYNERGI_BASE_URL
    ? `${process.env.SYNERGI_BASE_URL}/api/health`
    : "",
  "data-lab": process.env.DATA_LAB_BASE_URL
    ? `${process.env.DATA_LAB_BASE_URL}/api/health`
    : "",
  filestudio: process.env.FILESTUDIO_BASE_URL
    ? `${process.env.FILESTUDIO_BASE_URL}/api/health`
    : "",
  energyscan: process.env.ENERGYSCAN_BASE_URL
    ? `${process.env.ENERGYSCAN_BASE_URL}/api/health`
    : "",
};

const HEALTH_CHECK_TIMEOUT_MS = 5_000;

/** Poll a single application's health endpoint */
async function pollAppHealth(appId: AppId): Promise<AppHealthResult> {
  const url = APP_HEALTH_URLS[appId];
  const checkedAt = new Date().toISOString();

  if (!url) {
    return {
      app_id: appId,
      status: "unknown",
      last_check: checkedAt,
      error: "Health URL not configured",
    };
  }

  const start = Date.now();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      HEALTH_CHECK_TIMEOUT_MS,
    );

    const response = await fetch(url, {
      method: "GET",
      headers: { "x-command-center-probe": "1" },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const latencyMs = Date.now() - start;

    if (response.ok) {
      return { app_id: appId, status: "healthy", last_check: checkedAt, latency_ms: latencyMs };
    }
    if (response.status >= 500) {
      return { app_id: appId, status: "error", last_check: checkedAt, latency_ms: latencyMs, error: `HTTP ${response.status}` };
    }
    return { app_id: appId, status: "degraded", last_check: checkedAt, latency_ms: latencyMs, error: `HTTP ${response.status}` };
  } catch (err) {
    const latencyMs = Date.now() - start;
    const message = err instanceof Error ? err.message : "Unknown error";
    return { app_id: appId, status: "error", last_check: checkedAt, latency_ms: latencyMs, error: message };
  }
}

/** Poll all ecosystem applications in parallel and aggregate results */
export async function aggregateEcosystemHealth(): Promise<EcosystemHealthStatus> {
  const appIds = Object.keys(APP_HEALTH_URLS) as AppId[];
  const results = await Promise.all(appIds.map(pollAppHealth));

  const alerts: EcosystemAlert[] = results
    .filter((r) => r.status === "error" || r.status === "degraded")
    .map((r) => ({
      alert_id: `${r.app_id}-${Date.now()}`,
      app_id: r.app_id,
      severity: r.status === "error" ? "critical" : "warning",
      message: r.error ?? `${r.app_id} is ${r.status}`,
      detected_at: r.last_check,
    }));

  return {
    checked_at: new Date().toISOString(),
    applications: results,
    alerts,
  };
}

/** Fetch pipeline metrics from Nexus (returns stub when URL not configured) */
export async function fetchPipelineMetrics(): Promise<PipelineMetrics> {
  const baseUrl = process.env.NEXUS_BASE_URL;
  if (!baseUrl) {
    return {
      leads_total: 0,
      leads_by_temperature: { cold: 0, warm: 0, hot: 0 },
      leads_stale: 0,
      conversion_rate: 0,
      source_breakdown: {},
    };
  }

  try {
    const response = await fetch(`${baseUrl}/api/v1/leads/metrics`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXUS_INTERNAL_API_KEY ?? ""}`,
        "x-command-center-probe": "1",
      },
    });
    if (!response.ok) throw new Error(`Nexus metrics HTTP ${response.status}`);
    return (await response.json()) as PipelineMetrics;
  } catch {
    return {
      leads_total: 0,
      leads_by_temperature: { cold: 0, warm: 0, hot: 0 },
      leads_stale: 0,
      conversion_rate: 0,
      source_breakdown: {},
    };
  }
}

/** Fetch RAG quality score from Advisor AI */
export async function fetchRagQualityMetrics(): Promise<RagQualityMetrics> {
  const baseUrl = process.env.ADVISOR_AI_BASE_URL;
  if (!baseUrl) {
    return { composite_score: 0, passed: false, evaluated_at: new Date().toISOString() };
  }

  try {
    const response = await fetch(`${baseUrl}/api/rag/evaluation/latest`, {
      headers: {
        "x-advisor-internal-api-key": process.env.ADVISOR_INTERNAL_API_KEY ?? "",
        "x-command-center-probe": "1",
      },
    });
    if (!response.ok) throw new Error(`Advisor AI metrics HTTP ${response.status}`);
    return (await response.json()) as RagQualityMetrics;
  } catch {
    return { composite_score: 0, passed: false, evaluated_at: new Date().toISOString() };
  }
}

/** Fetch content generation throughput from Content Generator AI */
export async function fetchContentThroughputMetrics(): Promise<ContentThroughputMetrics> {
  const baseUrl = process.env.CONTENT_GEN_BASE_URL;
  if (!baseUrl) {
    return { jobs_completed_last_24h: 0, jobs_pending: 0, average_generation_ms: 0 };
  }

  try {
    const response = await fetch(`${baseUrl}/api/metrics/throughput`, {
      headers: {
        "x-command-center-probe": "1",
      },
    });
    if (!response.ok) throw new Error(`Content Gen metrics HTTP ${response.status}`);
    return (await response.json()) as ContentThroughputMetrics;
  } catch {
    return { jobs_completed_last_24h: 0, jobs_pending: 0, average_generation_ms: 0 };
  }
}

/** Aggregate all metrics in parallel */
export async function aggregateEcosystemMetrics(): Promise<EcosystemMetrics> {
  const [pipeline, rag_quality, content_throughput] = await Promise.all([
    fetchPipelineMetrics(),
    fetchRagQualityMetrics(),
    fetchContentThroughputMetrics(),
  ]);
  return { pipeline, rag_quality, content_throughput };
}
