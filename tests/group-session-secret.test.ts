import test from 'node:test'
import assert from 'node:assert/strict'
import { getSessionSecret } from '../src/lib/group-session-token'

const SECRET_ENV = 'ANCLORA_GROUP_SESSION_SECRET'

function withEnv(env: Record<string, string | undefined>, run: () => void) {
  const saved: Record<string, string | undefined> = {}
  for (const key of Object.keys(env)) {
    saved[key] = process.env[key]
    if (env[key] === undefined) delete process.env[key]
    else process.env[key] = env[key] as string
  }
  try {
    run()
  } finally {
    for (const key of Object.keys(env)) {
      if (saved[key] === undefined) delete process.env[key]
      else process.env[key] = saved[key] as string
    }
  }
}

test('production without secret fails closed', () => {
  withEnv({ NODE_ENV: 'production', [SECRET_ENV]: undefined }, () => {
    assert.throws(() => getSessionSecret(), /ANCLORA_GROUP_SESSION_SECRET/)
  })
})

test('production with empty secret fails closed', () => {
  withEnv({ NODE_ENV: 'production', [SECRET_ENV]: '   ' }, () => {
    assert.throws(() => getSessionSecret())
  })
})

test('production error never leaks a secret value', () => {
  withEnv({ NODE_ENV: 'production', [SECRET_ENV]: undefined }, () => {
    try {
      getSessionSecret()
      assert.fail('should have thrown')
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      assert.ok(!message.includes('anclora-group-local-dev-secret'))
    }
  })
})

test('production with valid secret returns it', () => {
  withEnv({ NODE_ENV: 'production', [SECRET_ENV]: 'super-secret-value' }, () => {
    assert.equal(getSessionSecret(), 'super-secret-value')
  })
})

test('development falls back to explicit local secret', () => {
  withEnv({ NODE_ENV: 'development', [SECRET_ENV]: undefined }, () => {
    assert.equal(getSessionSecret(), 'anclora-group-local-dev-secret')
  })
})

test('test environment falls back to explicit local secret', () => {
  withEnv({ NODE_ENV: 'test', [SECRET_ENV]: undefined }, () => {
    assert.equal(getSessionSecret(), 'anclora-group-local-dev-secret')
  })
})
