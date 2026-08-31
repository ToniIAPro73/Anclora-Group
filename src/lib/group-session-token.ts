import { createHmac, timingSafeEqual } from 'node:crypto'
import { isGroupRole, type GroupRole } from '@/lib/group-access'

export const SESSION_COOKIE = 'anclora-group-session'
export const SESSION_TTL_SECONDS = 60 * 60 * 12

const CLOCK_TOLERANCE_SECONDS = 30
const LOCAL_DEV_SECRET = 'anclora-group-local-dev-secret'

export type GroupSession = {
  username: string
  displayName: string
  role: GroupRole
}

type GroupSessionPayload = GroupSession & {
  iat: number
  exp: number
}

/**
 * Single source of truth for the session signing secret.
 * Production fails closed: no secret, no boot. The local fallback exists
 * only outside production for developer experience. The secret value is
 * never logged nor included in errors.
 */
export function getSessionSecret(): string {
  const secret = process.env.ANCLORA_GROUP_SESSION_SECRET?.trim()
  if (secret) return secret

  if (process.env.NODE_ENV === 'production') {
    throw new Error('ANCLORA_GROUP_SESSION_SECRET must be set to a long random value in production.')
  }

  return LOCAL_DEV_SECRET
}

function sign(body: string): string {
  return createHmac('sha256', getSessionSecret()).update(body).digest('base64url')
}

export function createSessionToken(session: GroupSession, nowMs: number = Date.now()): string {
  const iat = Math.floor(nowMs / 1000)
  const payload: GroupSessionPayload = { ...session, iat, exp: iat + SESSION_TTL_SECONDS }
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
  return `${body}.${sign(body)}`
}

export function verifySessionToken(token: string, nowMs: number = Date.now()): GroupSession | null {
  const parts = token.split('.')
  if (parts.length !== 2) return null
  const [body, signature] = parts
  if (!body || !signature) return null

  const expected = createHmac('sha256', getSessionSecret()).update(body).digest()
  const received = Buffer.from(signature, 'base64url')
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null

  let payload: GroupSessionPayload
  try {
    payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as GroupSessionPayload
  } catch {
    return null
  }

  const nowSeconds = Math.floor(nowMs / 1000)
  if (
    typeof payload.username !== 'string' ||
    typeof payload.displayName !== 'string' ||
    !isGroupRole(payload.role) ||
    typeof payload.iat !== 'number' ||
    typeof payload.exp !== 'number'
  ) {
    return null
  }

  if (payload.exp + CLOCK_TOLERANCE_SECONDS < nowSeconds) return null
  if (payload.iat - CLOCK_TOLERANCE_SECONDS > nowSeconds) return null

  return {
    username: payload.username,
    displayName: payload.displayName,
    role: payload.role,
  }
}
