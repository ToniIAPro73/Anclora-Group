import test from 'node:test'
import assert from 'node:assert/strict'
import { getGroupUsers, isGroupRole } from '../src/lib/group-access'

const USERS_ENV = 'ANCLORA_GROUP_INTERNAL_USERS_JSON'
const BOOTSTRAP_KEYS = [
  'ANCLORA_GROUP_BOOTSTRAP_USERNAME',
  'ANCLORA_GROUP_BOOTSTRAP_PASSWORD_HASH',
  'ANCLORA_GROUP_BOOTSTRAP_PASSWORD',
  'ANCLORA_GROUP_BOOTSTRAP_DISPLAY_NAME',
  'ANCLORA_GROUP_BOOTSTRAP_ROLE',
] as const

function withEnv(env: Record<string, string | undefined>, run: () => void) {
  const keys = [USERS_ENV, ...BOOTSTRAP_KEYS, 'NODE_ENV']
  const saved: Record<string, string | undefined> = {}
  for (const key of keys) {
    saved[key] = process.env[key]
    delete process.env[key]
  }
  for (const [key, value] of Object.entries(env)) {
    if (value !== undefined) process.env[key] = value
  }
  try {
    run()
  } finally {
    for (const key of keys) {
      if (saved[key] === undefined) delete process.env[key]
      else process.env[key] = saved[key] as string
    }
  }
}

test('isGroupRole accepts registry roles and rejects anything else', () => {
  assert.equal(isGroupRole('group-admin'), true)
  assert.equal(isGroupRole('data-ops'), true)
  assert.equal(isGroupRole('superuser'), false)
  assert.equal(isGroupRole(''), false)
  assert.equal(isGroupRole(undefined), false)
  assert.equal(isGroupRole(42), false)
})

test('valid users JSON parses with hashes', () => {
  withEnv(
    {
      [USERS_ENV]: JSON.stringify([
        { username: 'ana', passwordHash: '$2b$10$abc', displayName: 'Ana', role: 'data-ops' },
      ]),
    },
    () => {
      const users = getGroupUsers()
      assert.equal(users.length, 1)
      assert.equal(users[0].username, 'ana')
      assert.equal(users[0].passwordHash, '$2b$10$abc')
      assert.equal(users[0].legacyPassword, null)
      assert.equal(users[0].role, 'data-ops')
    },
  )
})

test('malformed users JSON yields no users', () => {
  withEnv({ [USERS_ENV]: '{not json' }, () => {
    assert.deepEqual(getGroupUsers(), [])
  })
})

test('user with invalid role is rejected fail-closed', () => {
  withEnv(
    {
      [USERS_ENV]: JSON.stringify([
        { username: 'eve', passwordHash: '$2b$10$abc', displayName: 'Eve', role: 'superuser' },
      ]),
    },
    () => {
      assert.deepEqual(getGroupUsers(), [])
    },
  )
})

test('plaintext password record is rejected in production', () => {
  withEnv(
    {
      NODE_ENV: 'production',
      [USERS_ENV]: JSON.stringify([
        { username: 'legacy', password: 'plaintext', displayName: 'Legacy', role: 'group-admin' },
      ]),
    },
    () => {
      assert.deepEqual(getGroupUsers(), [])
    },
  )
})

test('plaintext password record works only outside production', () => {
  withEnv(
    {
      NODE_ENV: 'development',
      [USERS_ENV]: JSON.stringify([
        { username: 'legacy', password: 'plaintext', displayName: 'Legacy', role: 'group-admin' },
      ]),
    },
    () => {
      const users = getGroupUsers()
      assert.equal(users.length, 1)
      assert.equal(users[0].passwordHash, null)
      assert.equal(users[0].legacyPassword, 'plaintext')
    },
  )
})

test('bootstrap user with hash is valid', () => {
  withEnv(
    {
      ANCLORA_GROUP_BOOTSTRAP_USERNAME: 'boss',
      ANCLORA_GROUP_BOOTSTRAP_PASSWORD_HASH: '$2b$10$abc',
    },
    () => {
      const users = getGroupUsers()
      assert.equal(users.length, 1)
      assert.equal(users[0].username, 'boss')
      assert.equal(users[0].role, 'group-admin')
      assert.equal(users[0].passwordHash, '$2b$10$abc')
    },
  )
})

test('bootstrap with invalid role yields no user', () => {
  withEnv(
    {
      ANCLORA_GROUP_BOOTSTRAP_USERNAME: 'boss',
      ANCLORA_GROUP_BOOTSTRAP_PASSWORD_HASH: '$2b$10$abc',
      ANCLORA_GROUP_BOOTSTRAP_ROLE: 'superuser',
    },
    () => {
      assert.deepEqual(getGroupUsers(), [])
    },
  )
})

test('bootstrap plaintext password rejected in production', () => {
  withEnv(
    {
      NODE_ENV: 'production',
      ANCLORA_GROUP_BOOTSTRAP_USERNAME: 'boss',
      ANCLORA_GROUP_BOOTSTRAP_PASSWORD: 'plaintext',
    },
    () => {
      assert.deepEqual(getGroupUsers(), [])
    },
  )
})

test('no users configured yields empty list', () => {
  withEnv({}, () => {
    assert.deepEqual(getGroupUsers(), [])
  })
})
