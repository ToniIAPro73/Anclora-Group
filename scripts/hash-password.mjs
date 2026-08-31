#!/usr/bin/env node
/**
 * Generates a bcrypt password hash for ANCLORA_GROUP_INTERNAL_USERS_JSON or
 * ANCLORA_GROUP_BOOTSTRAP_PASSWORD_HASH.
 *
 * Usage: node scripts/hash-password.mjs "<password>"
 * The password is never logged; only the resulting hash is printed.
 */
import { hash } from 'bcryptjs'

const password = process.argv[2]

if (!password) {
  console.error('Usage: node scripts/hash-password.mjs "<password>"')
  process.exit(1)
}

const passwordHash = await hash(password, 10)
console.log(passwordHash)
