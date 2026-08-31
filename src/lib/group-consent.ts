export type CookiePreferences = {
  necessary: true
  session: true
  analytics: boolean
  marketing: boolean
  updatedAt: string
  version: 'v1'
}

export const COOKIE_CONSENT_STORAGE_KEY = 'anclora-cookie-consent-v1'

export const DEFAULT_COOKIE_PREFERENCES: CookiePreferences = {
  necessary: true,
  session: true,
  analytics: false,
  marketing: false,
  updatedAt: '',
  version: 'v1',
}

/**
 * Parses stored consent. Returns null when nothing valid is stored, so the
 * caller shows the banner again. Necessary/session are always forced true.
 */
export function parseStoredConsent(raw: string | null): CookiePreferences | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as Partial<CookiePreferences>
    return {
      necessary: true,
      session: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : '',
      version: 'v1',
    }
  } catch {
    return null
  }
}

export function serializeConsent(preferences: CookiePreferences): string {
  const value: CookiePreferences = {
    ...preferences,
    necessary: true,
    session: true,
    updatedAt: new Date().toISOString(),
    version: 'v1',
  }
  return JSON.stringify(value)
}
