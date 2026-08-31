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
  const rateKey = loginRateLimitKey(resolveClientIp(request), normalizedUsername)

  const limit = checkLoginRateLimit(rateKey)
  if (!limit.allowed) {
    return NextResponse.json(
      { error: RATE_LIMITED },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    )
  }

  const session = await authenticateGroupUser(normalizedUsername, password)
  if (!session) {
    recordLoginFailure(rateKey)
    return NextResponse.json({ error: INVALID_CREDENTIALS }, { status: 401 })
  }

  clearLoginFailures(rateKey)
  await createGroupSession(session)
  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  await clearGroupSession()
  return NextResponse.json({ ok: true })
}
