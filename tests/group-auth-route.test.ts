import test from 'node:test'
import assert from 'node:assert/strict'
import { NextRequest } from 'next/server'
import { hashSync } from 'bcryptjs'
import { POST } from '../src/app/api/auth/session/route'
import { LOGIN_MAX_FAILED_ATTEMPTS, resetLoginRateLimits } from '../src/lib/group-rate-limit'

const USERS_ENV = 'ANCLORA_GROUP_INTERNAL_USERS_JSON'
const SECRET_ENV = 'ANCLORA_GROUP_SESSION_SECRET'

const FIXTURE_PASSWORD = 'fixture-password-123'
const FIXTURE_USERS = JSON.stringify([
  {
    username: 'fixture-admin',
    passwordHash: hashSync(FIXTURE_PASSWORD, 4),
    displayName: 'Fixture Admin',
    role: 'group-admin',
  },
])

function postRequest(body: string, contentType = 'application/json') {
  return new NextRequest('http://localhost/api/auth/session', {
    method: 'POST',
    headers: { 'content-type': contentType },
    body,
  })
}

// Sets fixture env for the duration of one async test.
async function withFixtureEnv(run: () => Promise<void>) {
  const savedUsers = process.env[USERS_ENV]
  const savedSecret = process.env[SECRET_ENV]
  process.env[USERS_ENV] = FIXTURE_USERS
  process.env[SECRET_ENV] = 'route-test-secret'
  resetLoginRateLimits()
  try {
    await run()
  } finally {
    resetLoginRateLimits()
    if (savedUsers === undefined) delete process.env[USERS_ENV]
    else process.env[USERS_ENV] = savedUsers
    if (savedSecret === undefined) delete process.env[SECRET_ENV]
    else process.env[SECRET_ENV] = savedSecret
  }
}

test('invalid JSON returns 400', async () => {
  await withFixtureEnv(async () => {
    const response = await POST(postRequest('{not json'))
    assert.equal(response.status, 400)
  })
})

test('non-string credentials return 400', async () => {
  await withFixtureEnv(async () => {
    const response = await POST(postRequest(JSON.stringify({ username: 42, password: null })))
    assert.equal(response.status, 400)
  })
})

test('oversized credentials return 400', async () => {
  await withFixtureEnv(async () => {
    const response = await POST(postRequest(JSON.stringify({ username: 'x'.repeat(201), password: 'y' })))
    assert.equal(response.status, 400)
  })
})

test('wrong password returns generic 401', async () => {
  await withFixtureEnv(async () => {
    const response = await POST(postRequest(JSON.stringify({ username: 'fixture-admin', password: 'wrong' })))
    assert.equal(response.status, 401)
    const body = await response.json()
    assert.equal(body.error, 'Usuario o password no válidos.')
  })
})

test('unknown username returns the same generic 401', async () => {
  await withFixtureEnv(async () => {
    const response = await POST(postRequest(JSON.stringify({ username: 'no-such-user', password: 'wrong' })))
    assert.equal(response.status, 401)
    const body = await response.json()
    assert.equal(body.error, 'Usuario o password no válidos.')
  })
})

test('rate limit kicks in with 429 after max failed attempts', async () => {
  await withFixtureEnv(async () => {
    const payload = JSON.stringify({ username: 'fixture-admin', password: 'wrong' })
    for (let attempt = 0; attempt < LOGIN_MAX_FAILED_ATTEMPTS; attempt++) {
      const response = await POST(postRequest(payload))
      assert.equal(response.status, 401)
    }
    const blocked = await POST(postRequest(payload))
    assert.equal(blocked.status, 429)
    assert.ok(blocked.headers.get('retry-after'))
    const body = await blocked.json()
    assert.equal(body.error, 'Demasiados intentos. Inténtalo de nuevo más tarde.')
  })
})

test('rate limit is keyed per username, not global', async () => {
  await withFixtureEnv(async () => {
    const payload = JSON.stringify({ username: 'fixture-admin', password: 'wrong' })
    for (let attempt = 0; attempt < LOGIN_MAX_FAILED_ATTEMPTS; attempt++) {
      await POST(postRequest(payload))
    }
    // A different username from the same IP is still allowed.
    const other = await POST(postRequest(JSON.stringify({ username: 'someone-else', password: 'wrong' })))
    assert.equal(other.status, 401)
  })
})

// NOTE: login success (200) and logout (DELETE) call next/headers cookies(),
// which requires a real Next.js request context and cannot run under plain
// node:test. They are covered by the manual validation checklist instead.
