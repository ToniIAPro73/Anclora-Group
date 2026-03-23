import { cookies } from 'next/headers'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { redirect } from 'next/navigation'
import { getGroupUsers, type GroupRole } from '@/lib/group-access'

const SESSION_COOKIE = 'anclora-group-session'

export type GroupSession = {
  username: string
  displayName: string
  role: GroupRole
}

function getSecret() {
  return process.env.ANCLORA_GROUP_SESSION_SECRET?.trim() || 'anclora-group-local-dev-secret'
}

function encode(payload: GroupSession) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = createHmac('sha256', getSecret()).update(body).digest('base64url')
  return `${body}.${signature}`
}

function decode(token: string): GroupSession | null {
  const [body, signature] = token.split('.')
  if (!body || !signature) return null

  const expected = createHmac('sha256', getSecret()).update(body).digest()
  const received = Buffer.from(signature, 'base64url')
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null

  try {
    return JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as GroupSession
  } catch {
    return null
  }
}

export async function getGroupSession() {
  const store = await cookies()
  const token = store.get(SESSION_COOKIE)?.value
  if (!token) return null
  return decode(token)
}

export async function requireGroupSession() {
  const session = await getGroupSession()
  if (!session) redirect('/login')
  return session
}

export function authenticateGroupUser(username: string, password: string): GroupSession | null {
  const user = getGroupUsers().find((candidate) => candidate.username === username && candidate.password === password)
  if (!user) return null

  return {
    username: user.username,
    displayName: user.displayName,
    role: user.role,
  }
}

export async function createGroupSession(session: GroupSession) {
  const store = await cookies()
  store.set(SESSION_COOKIE, encode(session), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12,
  })
}

export async function clearGroupSession() {
  const store = await cookies()
  store.set(SESSION_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(0),
  })
}
