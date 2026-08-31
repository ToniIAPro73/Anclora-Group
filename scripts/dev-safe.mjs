#!/usr/bin/env node
// Cross-platform development launcher for anclora-group.
//
// - Authoritative dev endpoint: http://127.0.0.1:3005 (AOS runtime manifest:
//   anclora-infrastructure/aos-runtime/manifest.yaml). Override with PORT/HOST:
//     PORT=3100 npm run dev
// - Mirrors the safe-start behavior of scripts/dev-safe.ps1: stop any previous
//   `next dev` belonging to this repository and remove the stale
//   `.next/dev/lock` before launching, so restarts never fail on a busy port
//   or a leftover Turbopack lock.
// - On Windows it delegates to scripts/dev-safe.ps1 (PowerShell), which
//   implements the same behavior natively.

import { spawn, spawnSync } from 'node:child_process'
import { existsSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { setTimeout as delay } from 'node:timers/promises'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const port = process.env.PORT || '3005'
const host = process.env.HOST || '127.0.0.1'
const forwardArgs = process.argv.slice(2)

if (process.platform === 'win32') {
  const ps1 = path.join(projectRoot, 'scripts', 'dev-safe.ps1')
  const result = spawnSync(
    'powershell',
    ['-ExecutionPolicy', 'Bypass', '-File', ps1, '-p', port, '-H', host, ...forwardArgs],
    { stdio: 'inherit', cwd: projectRoot }
  )
  process.exit(result.status ?? 1)
}

const nextBin = path.join(projectRoot, 'node_modules', '.bin', 'next')
if (!existsSync(nextBin)) {
  console.error(`next not found at ${nextBin}. Run npm install before starting the dev server.`)
  process.exit(1)
}

async function stopStaleNextDev() {
  // POSIX only: find node processes running `next dev` for THIS repository.
  // Mirrors dev-safe.ps1, which only targets node.exe processes. If pgrep is
  // unavailable or finds nothing, skip silently — a port conflict would still
  // surface as a normal next dev error.
  const result = spawnSync('pgrep', ['-af', 'node'], { encoding: 'utf8' })
  if (result.error || result.status !== 0 || !result.stdout) return

  const pids = []
  for (const line of result.stdout.split('\n')) {
    const match = line.match(/^(\d+)\s+(.*)$/)
    if (!match) continue
    const pid = Number(match[1])
    const cmd = match[2]
    if (pid === process.pid || pid === process.ppid) continue
    if (cmd.includes(projectRoot) && /\bnext\b/.test(cmd) && /\bdev\b/.test(cmd)) {
      pids.push(pid)
    }
  }

  for (const pid of pids) {
    try {
      process.kill(pid)
    } catch {
      // Already exited or not accessible.
    }
  }
  if (pids.length > 0) await delay(450)
}

function removeStaleLock() {
  const lockFile = path.join(projectRoot, '.next', 'dev', 'lock')
  if (existsSync(lockFile)) {
    try {
      rmSync(lockFile, { force: true })
    } catch {
      // A still-running server may hold it; next dev will report if it matters.
    }
  }
}

await stopStaleNextDev()
removeStaleLock()

console.log(`[dev-safe] Starting anclora-group dev server at http://${host}:${port}`)
console.log('[dev-safe] Override with PORT/HOST env vars. Authoritative port: 3005 (AOS manifest).')

const child = spawn(nextBin, ['dev', '-p', port, '-H', host, ...forwardArgs], {
  stdio: 'inherit',
  cwd: projectRoot,
  env: process.env
})

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }
  process.exit(code ?? 0)
})
