import { redirect } from 'next/navigation'
import { getGroupSession } from '@/lib/group-auth'

export default async function HomePage() {
  const session = await getGroupSession()
  redirect(session ? '/workspace' : '/login')
}
