import test from 'node:test'
import assert from 'node:assert/strict'
import {
  COOKIE_CONSENT_STORAGE_KEY,
  DEFAULT_COOKIE_PREFERENCES,
  parseStoredConsent,
  serializeConsent,
} from '../src/lib/group-consent'

test('storage key is versioned', () => {
  assert.equal(COOKIE_CONSENT_STORAGE_KEY, 'anclora-cookie-consent-v1')
})

test('parseStoredConsent returns null when nothing is stored', () => {
  assert.equal(parseStoredConsent(null), null)
  assert.equal(parseStoredConsent(''), null)
})

test('parseStoredConsent returns null on malformed JSON', () => {
  assert.equal(parseStoredConsent('{not-json'), null)
})

test('parseStoredConsent parses a valid stored consent', () => {
  const raw = JSON.stringify({
    necessary: true,
    session: true,
    analytics: true,
    marketing: false,
    updatedAt: '2026-08-31T10:00:00.000Z',
    version: 'v1',
  })
  const parsed = parseStoredConsent(raw)

  assert.ok(parsed)
  assert.equal(parsed.analytics, true)
  assert.equal(parsed.marketing, false)
  assert.equal(parsed.updatedAt, '2026-08-31T10:00:00.000Z')
  assert.equal(parsed.version, 'v1')
})

test('parseStoredConsent forces necessary and session to true', () => {
  const raw = JSON.stringify({ necessary: false, session: false, analytics: 1 })
  const parsed = parseStoredConsent(raw)

  assert.ok(parsed)
  assert.equal(parsed.necessary, true)
  assert.equal(parsed.session, true)
  assert.equal(parsed.analytics, true)
})

test('parseStoredConsent defaults missing fields to a safe state', () => {
  const parsed = parseStoredConsent('{}')

  assert.ok(parsed)
  assert.deepEqual(parsed, {
    necessary: true,
    session: true,
    analytics: false,
    marketing: false,
    updatedAt: '',
    version: 'v1',
  })
})

test('parseStoredConsent ignores a non-string updatedAt', () => {
  const parsed = parseStoredConsent(JSON.stringify({ updatedAt: 123 }))

  assert.ok(parsed)
  assert.equal(parsed.updatedAt, '')
})

test('serializeConsent stamps version and ISO updatedAt', () => {
  const serialized = serializeConsent({ ...DEFAULT_COOKIE_PREFERENCES, analytics: true })
  const parsed = JSON.parse(serialized) as Record<string, unknown>

  assert.equal(parsed.version, 'v1')
  assert.equal(parsed.necessary, true)
  assert.equal(parsed.session, true)
  assert.equal(parsed.analytics, true)
  assert.equal(typeof parsed.updatedAt, 'string')
  assert.ok(!Number.isNaN(Date.parse(parsed.updatedAt as string)))
})

test('serializeConsent output round-trips through parseStoredConsent', () => {
  const serialized = serializeConsent({ ...DEFAULT_COOKIE_PREFERENCES, marketing: true })
  const parsed = parseStoredConsent(serialized)

  assert.ok(parsed)
  assert.equal(parsed.marketing, true)
  assert.equal(parsed.necessary, true)
})
