/**
 * Login rate limiting (brute-force mitigation for POST /api/auth/session).
 *
 * Strategy: fixed window per `ip + username` key. Failed attempts increment
 * the counter; a successful login clears it.
 *
 * Scope/limitation: the store is in-memory per serverless instance. On Vercel
 * this means limits are best-effort (instances scale and recycle), not a
 * hard global cap. The interface is deliberately isolated here so a shared
 * store (e.g. Redis/Upstash) can replace it without touching callers.
 */

const WINDOW_MS = 15 * 60 * 1000
export const LOGIN_MAX_FAILED_ATTEMPTS = 5

type WindowEntry = {
  failures: number
  windowStart: number
}

const attempts = new Map<string, WindowEntry>()

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number }

function getEntry(key: string, now: number): WindowEntry {
  const existing = attempts.get(key)
  if (!existing || now - existing.windowStart >= WINDOW_MS) {
    const fresh: WindowEntry = { failures: 0, windowStart: now }
    attempts.set(key, fresh)
    return fresh
  }
  return existing
}

export function checkLoginRateLimit(key: string, now: number = Date.now()): RateLimitResult {
  const entry = getEntry(key, now)
  if (entry.failures >= LOGIN_MAX_FAILED_ATTEMPTS) {
    const retryAfterSeconds = Math.max(1, Math.ceil((entry.windowStart + WINDOW_MS - now) / 1000))
    return { allowed: false, retryAfterSeconds }
  }
  return { allowed: true }
}

export function recordLoginFailure(key: string, now: number = Date.now()): void {
  getEntry(key, now).failures += 1
}

export function clearLoginFailures(key: string): void {
  attempts.delete(key)
}

/** Test hook: wipes all windows. Not used by production code. */
export function resetLoginRateLimits(): void {
  attempts.clear()
}

/** Best-effort client IP extraction from proxy headers. */
export function resolveClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  return request.headers.get('x-real-ip')?.trim() || 'unknown'
}

export function loginRateLimitKey(ip: string, username: string): string {
  return `${ip}|${username.toLowerCase()}`
}
