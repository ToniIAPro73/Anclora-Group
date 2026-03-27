import Image from 'next/image'
import { redirect } from 'next/navigation'
import { GroupLoginForm } from '@/components/group/GroupLoginForm'
import { getGroupSession } from '@/lib/group-auth'
import { getGroupMessages } from '@/lib/group-ui'

export default async function LoginPage() {
  const session = await getGroupSession()
  if (session) redirect('/workspace')
  const ui = getGroupMessages()

  return (
    <main className="group-page">
      <div className="group-noise" />
      <section className="group-login-shell">
        <div className="group-login-brand">
          <div className="group-brand-badge is-large is-centered">
            <Image src="/brand/logo-anclora-group.webp" alt="Anclora Group" width={92} height={92} className="group-brand-logo" />
          </div>
          <h1>Anclora Group</h1>
          <p>{ui.loginTitle}</p>
        </div>
        <div className="group-login-card">
          <div className="group-section-head">
            <div>
              <p className="group-eyebrow">{ui.loginCardEyebrow}</p>
              <h2>{ui.loginCardTitle}</h2>
            </div>
          </div>
          <GroupLoginForm />
        </div>
      </section>
    </main>
  )
}
