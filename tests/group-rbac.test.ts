import test from 'node:test'
import assert from 'node:assert/strict'
import { isAppAccessAllowed } from '../src/lib/group-access'
import type { GroupRole } from '../src/lib/group-access'

const ALL_ROLES: GroupRole[] = [
  'group-admin',
  'private-estates-ops',
  'partner-ops',
  'data-ops',
  'content-ops',
  'advisory',
  'growth-ops',
]

test('group-admin can access every relay app', () => {
  assert.equal(isAppAccessAllowed('group-admin', 'synergi'), true)
  assert.equal(isAppAccessAllowed('group-admin', 'data-lab'), true)
})

test('synergi allows group-admin, private-estates-ops, partner-ops only', () => {
  const allowed = ALL_ROLES.filter((role) => isAppAccessAllowed(role, 'synergi'))
  assert.deepEqual(allowed.sort(), ['group-admin', 'partner-ops', 'private-estates-ops'].sort())
})

test('synergi denies data-ops, content-ops, advisory, growth-ops', () => {
  for (const role of ['data-ops', 'content-ops', 'advisory', 'growth-ops'] as GroupRole[]) {
    assert.equal(isAppAccessAllowed(role, 'synergi'), false)
  }
})

test('data-lab allows group-admin, private-estates-ops, partner-ops, data-ops only', () => {
  const allowed = ALL_ROLES.filter((role) => isAppAccessAllowed(role, 'data-lab'))
  assert.deepEqual(
    allowed.sort(),
    ['group-admin', 'private-estates-ops', 'partner-ops', 'data-ops'].sort(),
  )
})

test('data-lab denies content-ops, advisory, growth-ops', () => {
  for (const role of ['content-ops', 'advisory', 'growth-ops'] as GroupRole[]) {
    assert.equal(isAppAccessAllowed(role, 'data-lab'), false)
  }
})

test('invalid role fails closed', () => {
  assert.equal(isAppAccessAllowed('superuser' as GroupRole, 'synergi'), false)
  assert.equal(isAppAccessAllowed('' as GroupRole, 'data-lab'), false)
})
