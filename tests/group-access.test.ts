import test from 'node:test'
import assert from 'node:assert/strict'
import { getAppsForRole, getGroupAppDefinitions } from '../src/lib/group-access'

test('group-admin sees the full launcher', () => {
  const apps = getAppsForRole('group-admin')
  const appKeys = apps.map((item) => item.key)
  const expectedKeys = getGroupAppDefinitions().map((item) => item.key)

  assert.deepEqual(appKeys, expectedKeys)
})

test('partner-ops sees synergi and data lab but not advisory ai', () => {
  const apps = getAppsForRole('partner-ops')
  assert.ok(apps.some((item) => item.key === 'synergi'))
  assert.ok(apps.some((item) => item.key === 'data-lab'))
  assert.ok(!apps.some((item) => item.key === 'advisor-ai'))
})

test('advisor-ai and command-center fallbacks use the documented deployments', () => {
  // URL reconciliation: advisor-ai matches the documented deploy
  // (docs/claude-code/internal/07, ECOSYSTEM_OVERVIEW). command-center
  // matches the owner's confirmed production URL (.env.example).
  const apps = getGroupAppDefinitions()
  const advisor = apps.find((item) => item.key === 'advisor-ai')
  const commandCenter = apps.find((item) => item.key === 'command-center')

  assert.equal(advisor?.url, 'https://ancloraadvisorai-ten.vercel.app/')
  assert.equal(commandCenter?.url, 'https://anclora-command-center.vercel.app/')
})

test('editorial branch (content-ai): Content Generator AI, Insights ADN and Talent are all registered under it', () => {
  const apps = getGroupAppDefinitions()
  const editorial = apps.filter((item) => item.businessArea === 'content-ai')
  const editorialKeys = editorial.map((item) => item.key).sort()

  assert.deepEqual(editorialKeys, ['content-generator-ai', 'insights-adn', 'talent'])
})

test('FileStudio keeps its canonical classification (utilities), not moved into the editorial branch', () => {
  const apps = getGroupAppDefinitions()
  const filestudio = apps.find((item) => item.key === 'filestudio')

  assert.equal(filestudio?.businessArea, 'utilities')
})

test('Anclora Talent is registered as paused, never as a plain active product', () => {
  const apps = getGroupAppDefinitions()
  const talent = apps.find((item) => item.key === 'talent')

  assert.equal(talent?.status, 'paused')
  assert.equal(talent?.title, 'Anclora Talent')
})

test('every other editorial app defaults to active (status undefined)', () => {
  const apps = getGroupAppDefinitions()
  const contentGen = apps.find((item) => item.key === 'content-generator-ai')
  const insights = apps.find((item) => item.key === 'insights-adn')

  assert.equal(contentGen?.status, undefined)
  assert.equal(insights?.status, undefined)
})

test('content-ops role has access to the full editorial branch', () => {
  const apps = getAppsForRole('content-ops')
  const keys = apps.map((item) => item.key)

  assert.ok(keys.includes('content-generator-ai'))
  assert.ok(keys.includes('insights-adn'))
  assert.ok(keys.includes('talent'))
})

test('Talent URL falls back to the documented default when the env var is missing or invalid', () => {
  const original = process.env.NEXT_PUBLIC_ANCLORA_TALENT_URL
  delete process.env.NEXT_PUBLIC_ANCLORA_TALENT_URL

  try {
    // Re-require via a fresh definitions call (module-level function, no
    // caching) — missing env falls back to the documented default URL.
    const apps = getGroupAppDefinitions()
    const talent = apps.find((item) => item.key === 'talent')
    assert.equal(talent?.url, 'https://talent.anclora.com')

    process.env.NEXT_PUBLIC_ANCLORA_TALENT_URL = 'not-a-valid-url'
    const appsInvalid = getGroupAppDefinitions()
    const talentInvalid = appsInvalid.find((item) => item.key === 'talent')
    assert.equal(talentInvalid?.url, 'https://talent.anclora.com')

    process.env.NEXT_PUBLIC_ANCLORA_TALENT_URL = 'javascript:alert(1)'
    const appsUnsafe = getGroupAppDefinitions()
    const talentUnsafe = appsUnsafe.find((item) => item.key === 'talent')
    assert.equal(talentUnsafe?.url, 'https://talent.anclora.com')

    process.env.NEXT_PUBLIC_ANCLORA_TALENT_URL = 'https://custom-talent.example.com/'
    const appsValid = getGroupAppDefinitions()
    const talentValid = appsValid.find((item) => item.key === 'talent')
    assert.equal(talentValid?.url, 'https://custom-talent.example.com/')
  } finally {
    if (original === undefined) delete process.env.NEXT_PUBLIC_ANCLORA_TALENT_URL
    else process.env.NEXT_PUBLIC_ANCLORA_TALENT_URL = original
  }
})
