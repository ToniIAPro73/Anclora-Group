import test from 'node:test'
import assert from 'node:assert/strict'
import {
  getAppsForRole,
  getGroupAppDefinitions,
  groupAppsByBusinessArea,
  searchGroupApps,
} from '../src/lib/group-access'

const ALL = getGroupAppDefinitions()

test('search matches by title', () => {
  const results = searchGroupApps(ALL, 'synergi')
  assert.ok(results.some((app) => app.key === 'synergi'))
})

test('search matches by description and kind', () => {
  assert.ok(searchGroupApps(ALL, 'SES.HOSPEDAJES').some((app) => app.key === 'syncxml'))
  assert.ok(searchGroupApps(ALL, 'ai-platform').every((app) => app.kind === 'ai-platform'))
})

test('search matches by business area label', () => {
  const results = searchGroupApps(ALL, 'fiscal y cumplimiento')
  assert.ok(results.some((app) => app.key === 'fiscal'))
  assert.ok(results.every((app) => app.businessArea === 'fiscal-compliance'))
})

test('search is case and diacritic insensitive', () => {
  const withAccent = searchGroupApps(ALL, 'inteligencia')
  const withoutAccent = searchGroupApps(ALL, 'INTELIGENCIA')
  assert.deepEqual(
    withAccent.map((app) => app.key).sort(),
    withoutAccent.map((app) => app.key).sort(),
  )
  assert.ok(withAccent.length > 0)
})

test('empty query returns the whole set; no match returns empty', () => {
  assert.equal(searchGroupApps(ALL, '   ').length, ALL.length)
  assert.equal(searchGroupApps(ALL, 'zzz-no-existe').length, 0)
})

test('search over a role-filtered set never leaks unauthorized apps', () => {
  const growthApps = getAppsForRole('growth-ops')
  const results = searchGroupApps(growthApps, 'anclora')
  assert.ok(results.length > 0)
  for (const app of results) {
    assert.ok(app.roles.includes('growth-ops'), `${app.key} leaked into growth-ops results`)
  }
  assert.ok(!results.some((app) => app.key === 'advisor-ai'))
})

test('grouping by business area covers all apps and skips empty areas', () => {
  const groups = groupAppsByBusinessArea(ALL)
  const grouped = groups.flatMap((group) => group.apps.map((app) => app.key)).sort()
  assert.deepEqual(grouped, ALL.map((app) => app.key).sort())
  for (const group of groups) {
    assert.ok(group.apps.length > 0)
  }
})

test('grouping preserves registry order inside each area', () => {
  const groups = groupAppsByBusinessArea(ALL)
  for (const group of groups) {
    const registryOrder = ALL.filter((app) => app.businessArea === group.area.key).map((app) => app.key)
    assert.deepEqual(group.apps.map((app) => app.key), registryOrder)
  }
})

test('grouping a role-filtered set only contains authorized apps', () => {
  const groups = groupAppsByBusinessArea(getAppsForRole('growth-ops'))
  for (const group of groups) {
    for (const app of group.apps) {
      assert.ok(app.roles.includes('growth-ops'))
    }
  }
})
