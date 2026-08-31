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
