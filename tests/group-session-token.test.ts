import test from 'node:test'
import assert from 'node:assert/strict'
import { createHmac } from 'node:crypto'
import { createSessionToken, verifySessionToken, SESSION_TTL_SECONDS } from '../src/lib/group-session-token'
import type { GroupSession } from '../src/lib/group-session-token'

const SECRET_ENV = 'ANCLORA_GROUP_SESSION_SECRET'

const SESSION: GroupSession = { username: 'antonio', displayName: 'Antonio', role: 'group-admin' }

function withSecret(run: () => void) {
  const saved = process.env[SECRET_ENV]
  process.env[SECRET_ENV] = 'test-secret-for-token-tests'
  try {
    run()
  } finally {
    if (saved === undefined) delete process.env[SECRET_ENV]
    else process.env[SECRET_ENV] = saved
  }
}

test('valid token roundtrips', () => {
  withSecret(() => {
    const token = createSessionToken(SESSION)
    assert.deepEqual(verifySessionToken(token), SESSION)
  })
})

test('token carries iat and exp with 12h TTL', () => {
  withSecret(() => {
    const token = createSessionToken(SESSION)
    const body = JSON.parse(Buffer.from(token.split('.')[0], 'base64url').toString('utf8'))
    assert.equal(typeof body.iat, 'number')
    assert.equal(body.exp - body.iat, SESSION_TTL_SECONDS)
  })
})

test('tampered signature is rejected', () => {
  withSecret(() => {
    const token = createSessionToken(SESSION)
    const [body] = token.split('.')
    const forged = `${body}.${Buffer.from('forged-signature-value').toString('base64url')}`
    assert.equal(verifySessionToken(forged), null)
  })
})

test('tampered payload is rejected', () => {
  withSecret(() => {
    const token = createSessionToken(SESSION)
    const [, signature] = token.split('.')
    const tamperedBody = Buffer.from(
      JSON.stringify({ ...SESSION, role: 'group-admin', username: 'attacker', iat: 1, exp: 9999999999 }),
    ).toString('base64url')
    assert.equal(verifySessionToken(`${tamperedBody}.${signature}`), null)
  })
})

test('malformed tokens are rejected', () => {
  withSecret(() => {
    assert.equal(verifySessionToken(''), null)
    assert.equal(verifySessionToken('only-one-part'), null)
    assert.equal(verifySessionToken('a.b.c'), null)
    assert.equal(verifySessionToken('.'), null)
  })
})

test('expired token is rejected', () => {
  withSecret(() => {
    const past = Date.now() - (SESSION_TTL_SECONDS + 3600) * 1000
    const token = createSessionToken(SESSION, past)
    assert.equal(verifySessionToken(token), null)
  })
})

test('token within clock tolerance is still accepted', () => {
  withSecret(() => {
    const almostExpired = Date.now() - (SESSION_TTL_SECONDS - 10) * 1000
    const token = createSessionToken(SESSION, almostExpired)
    assert.deepEqual(verifySessionToken(token), SESSION)
  })
})

test('token with invalid role is rejected fail-closed', () => {
  withSecret(() => {
    const crafted = { username: 'x', displayName: 'X', role: 'superuser', iat: 1, exp: 9999999999 }
    const body = Buffer.from(JSON.stringify(crafted)).toString('base64url')
    // Signed with the real secret: signature valid, role still rejected.
    const signature = createHmac('sha256', process.env[SECRET_ENV] as string).update(body).digest('base64url')
    assert.equal(verifySessionToken(`${body}.${signature}`), null)
  })
})
