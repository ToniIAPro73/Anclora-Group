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
