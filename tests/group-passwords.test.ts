import test from 'node:test'
import assert from 'node:assert/strict'
import { hashSync } from 'bcryptjs'
import { burnCompareCycle, hashPassword, verifyPasswordHash } from '../src/lib/group-passwords'

test('correct password verifies against its hash', async () => {
  const passwordHash = await hashPassword('correct-horse-battery-staple')
  assert.equal(await verifyPasswordHash('correct-horse-battery-staple', passwordHash), true)
})

test('wrong password is rejected', async () => {
  const passwordHash = hashSync('right-password', 4)
  assert.equal(await verifyPasswordHash('wrong-password', passwordHash), false)
})

test('hash format is bcrypt', async () => {
  const passwordHash = await hashPassword('anything')
  assert.match(passwordHash, /^\$2[aby]\$10\$/)
})

test('dummy compare cycle runs without throwing', async () => {
  await burnCompareCycle('anything')
})
