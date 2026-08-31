import { compare, hash } from 'bcryptjs'

const BCRYPT_ROUNDS = 10

// Precomputed bcrypt hash used to equalize response timing when the username
// does not exist. Prevents user enumeration via timing side channel.
const DUMMY_HASH = '$2b$10$hPdrD19Y8mTN0Fw5yYDV/uYNv4tklB0jhmkjxcNou05oZSi63nCxa'

export function hashPassword(password: string): Promise<string> {
  return hash(password, BCRYPT_ROUNDS)
}

export function verifyPasswordHash(password: string, passwordHash: string): Promise<boolean> {
  return compare(password, passwordHash)
}

/** Runs one bcrypt compare against a dummy hash. Result is always discarded. */
export async function burnCompareCycle(password: string): Promise<void> {
  await compare(password, DUMMY_HASH)
}
