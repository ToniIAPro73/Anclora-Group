import { NextRequest, NextResponse } from 'next/server'
import { authenticateGroupUser, clearGroupSession, createGroupSession } from '@/lib/group-auth'
import {
  checkLoginRateLimit,
  clearLoginFailures,
  loginRateLimitKey,
  recordLoginFailure,
  resolveClientIp,
} from '@/lib/group-rate-limit'

const MAX_USERNAME_LENGTH = 200
const MAX_PASSWORD_LENGTH = 256

// Generic by design: never reveal whether the username exists.
const INVALID_CREDENTIALS = 'Usuario o password no válidos.'
const RATE_LIMITED = 'Demasiados intentos. Inténtalo de nuevo más tarde.'

/**
 * Minimal auth audit trail for Vercel runtime logs. Structured JSON, never
 * logs passwords, hashes, tokens or payloads.
 */
function logAuthEvent(event: 'group_login_success' | 'group_login_failed' | 'group_login_rate_limited', detail: Record<string, string | number>) {
  const line = JSON.stringify({ event, ...detail })
  if (event === 'group_login_success') {
    console.info(line)
  } else {
    console.warn(line)
  }
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') || ''

  if (contentType.includes('application/x-www-form-urlencoded')) {
    const form = await request.formData()
    if (String(form.get('_method') || '').toUpperCase() === 'DELETE') {
      await clearGroupSession()
      return NextResponse.redirect(new URL('/login', request.url), { status: 302 })
    }
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 })
  }

  const username = (payload as { username?: unknown })?.username
  const password = (payload as { password?: unknown })?.password

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    !username.trim() ||
    !password ||
    username.length > MAX_USERNAME_LENGTH ||
    password.length > MAX_PASSWORD_LENGTH
  ) {
    return NextResponse.json({ error: 'Invalid credentials payload.' }, { status: 400 })
  }

  const normalizedUsername = username.trim()
  const clientIp = resolveClientIp(request)
  const rateKey = loginRateLimitKey(clientIp, normalizedUsername)

  const limit = checkLoginRateLimit(rateKey)
  if (!limit.allowed) {
    logAuthEvent('group_login_rate_limited', { ip: clientIp, retryAfterSeconds: limit.retryAfterSeconds })
    return NextResponse.json(
      { error: RATE_LIMITED },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    )
  }

  const session = await authenticateGroupUser(normalizedUsername, password)
  if (!session) {
    recordLoginFailure(rateKey)
    logAuthEvent('group_login_failed', { ip: clientIp, username: normalizedUsername })
    return NextResponse.json({ error: INVALID_CREDENTIALS }, { status: 401 })
  }

  clearLoginFailures(rateKey)
  await createGroupSession(session)
  logAuthEvent('group_login_success', { ip: clientIp, username: normalizedUsername })
  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  await clearGroupSession()
  return NextResponse.json({ ok: true })
}
