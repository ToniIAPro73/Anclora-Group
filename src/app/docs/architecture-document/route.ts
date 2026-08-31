import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'
import { getGroupSession } from '@/lib/group-auth'

// Private document: never under public/. Requires an active session.
export async function GET() {
  const session = await getGroupSession()
  if (!session) redirect('/login')

  const file = await readFile(
    path.join(process.cwd(), 'private-docs', 'anclora-group-access-architecture-v1.md'),
  )
  return new NextResponse(new Uint8Array(file), {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'content-disposition': 'inline; filename="anclora-group-access-architecture-v1.md"',
      'cache-control': 'private, no-store',
    },
  })
}
