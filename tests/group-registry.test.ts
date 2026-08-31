import test from 'node:test'
import assert from 'node:assert/strict'
import {
  getArchitectureLanes,
  getGroupAppDefinitions,
  getGroupBusinessAreas,
  isGroupRole,
} from '../src/lib/group-access'

test('every app has valid businessArea and architectureLayer', () => {
  const areas = getGroupBusinessAreas().map((item) => item.key)
  const layers = ['entry', 'core', 'activation']
  for (const app of getGroupAppDefinitions()) {
    assert.ok(areas.includes(app.businessArea), `${app.key} has invalid businessArea`)
    assert.ok(layers.includes(app.architectureLayer), `${app.key} has invalid architectureLayer`)
  }
})

test('app keys are unique', () => {
  const keys = getGroupAppDefinitions().map((app) => app.key)
  assert.equal(new Set(keys).size, keys.length)
})

test('every role referenced by an app is a valid GroupRole', () => {
  for (const app of getGroupAppDefinitions()) {
    for (const role of app.roles) {
      assert.ok(isGroupRole(role), `${app.key} references invalid role ${role}`)
    }
  }
})

test('relay apps keep internal URLs; all other URLs are absolute http(s)', () => {
  for (const app of getGroupAppDefinitions()) {
    if (app.url.startsWith('/')) {
      assert.ok(['synergi', 'data-lab'].includes(app.key), `unexpected internal URL for ${app.key}`)
    } else {
      assert.match(app.url, /^https:\/\//, `${app.key} url must be absolute https`)
    }
  }
})

test('architecture lanes derive every app exactly once from the registry', () => {
  const lanes = getArchitectureLanes()
  assert.deepEqual(lanes.map((lane) => lane.key), ['entry', 'core', 'activation'])
  const laneApps = lanes.flatMap((lane) => lane.apps.map((app) => app.key)).sort()
  const registryApps = getGroupAppDefinitions().map((app) => app.key).sort()
  assert.deepEqual(laneApps, registryApps)
})

test('layer metadata is present for every lane', () => {
  for (const lane of getArchitectureLanes()) {
    assert.ok(lane.eyebrow && lane.title && lane.body, `lane ${lane.key} missing metadata`)
  }
})

test('role-filtered architecture only contains apps allowed for that role', () => {
  const all = getGroupAppDefinitions()
  const advisoryApps = all.filter((app) => app.roles.includes('advisory'))
  const lanes = getArchitectureLanes(advisoryApps)
  const shown = lanes.flatMap((lane) => lane.apps)
  assert.ok(shown.length > 0)
  for (const app of shown) {
    assert.ok(app.roles.includes('advisory'), `${app.key} should not be visible to advisory`)
  }
})
