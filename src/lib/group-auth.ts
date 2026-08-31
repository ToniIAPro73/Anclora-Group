import { cookies } from 'next/headers'
import { forbidden, redirect } from 'next/navigation'
import { getGroupUsers, isAppAccessAllowed, type GroupAppKey } from '@/lib/group-access'
import { burnCompareCycle, verifyPasswordHash } from '@/lib/group-passwords'
import {
  createSessionToken,
  getSessionSecret,
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  verifySessionToken,
  type GroupSession,
} from '@/lib/group-session-token'

export { getSessionSecret, SESSION_COOKIE, SESSION_TTL_SECONDS }
export type { GroupSession }

export async function getGroupSession(): Promise<GroupSession | null> {
  const store = await cookies()
  const token = store.get(SESSION_COOKIE)?.value
  if (!token) return null
  return verifySessionToken(token)
}

export async function requireGroupSession(): Promise<GroupSession> {
  const session = await getGroupSession()
  if (!session) redirect('/login')
  return session
}

/**
 * Server-side RBAC enforcement for internal relay pages. Roles are derived
 * from the app registry; there is no parallel list to keep in sync.
 * No session redirects to /login; insufficient role renders a 403.
 */
export async function requireAppAccess(appKey: GroupAppKey): Promise<GroupSession> {
  const session = await requireGroupSession()
  if (!isAppAccessAllowed(session.role, appKey)) forbidden()
  return session
}

export async function authenticateGroupUser(username: string, password: string): Promise<GroupSession | null> {
  const user = getGroupUsers().find((candidate) => candidate.username === username)

  if (!user) {
    // Equalize timing so unknown usernames are indistinguishable.
    await burnCompareCycle(password)
    return null
  }

  if (user.passwordHash) {
    const matches = await verifyPasswordHash(password, user.passwordHash)
    if (!matches) return null
  } else if (user.legacyPassword !== null) {
    // Development-only legacy path; production never produces such records.
    const matches = user.legacyPassword === password
    await burnCompareCycle(password)
    if (!matches) return null
  } else {
    await burnCompareCycle(password)
    return null
  }

  return {
    username: user.username,
    displayName: user.displayName,
    role: user.role,
  }
}

export async function createGroupSession(session: GroupSession) {
  const store = await cookies()
  store.set(SESSION_COOKIE, createSessionToken(session), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
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
    maxAge: 0,
  })
}
