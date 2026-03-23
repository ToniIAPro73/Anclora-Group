import { NextRequest, NextResponse } from 'next/server'
import { authenticateGroupUser, clearGroupSession, createGroupSession } from '@/lib/group-auth'

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') || ''

  if (contentType.includes('application/x-www-form-urlencoded')) {
    const form = await request.formData()
    if (String(form.get('_method') || '').toUpperCase() === 'DELETE') {
      await clearGroupSession()
      return NextResponse.redirect(new URL('/login', request.url), { status: 302 })
    }
  }

  let payload: { username?: string; password?: string }
  try {
    payload = (await request.json()) as { username?: string; password?: string }
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 })
  }

  const session = authenticateGroupUser(payload.username?.trim() || '', payload.password?.trim() || '')
  if (!session) {
    return NextResponse.json({ error: 'Usuario o password no válidos.' }, { status: 401 })
  }

  await createGroupSession(session)
  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  await clearGroupSession()
  return NextResponse.json({ ok: true })
}
