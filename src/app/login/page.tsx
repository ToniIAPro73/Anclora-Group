import Image from 'next/image'
import { redirect } from 'next/navigation'
import { GroupLoginForm } from '@/components/group/GroupLoginForm'
import { getGroupSession } from '@/lib/group-auth'

export default async function LoginPage() {
  const session = await getGroupSession()
  if (session) redirect('/workspace')

  return (
    <main className="group-page">
      <div className="group-noise" />
      <section className="group-login-shell">
        <div className="group-login-brand">
          <div className="group-brand-badge is-large">
            <Image src="/brand/logo-anclora-group.svg" alt="Anclora Group" width={92} height={92} className="group-brand-logo" />
          </div>
          <p className="group-eyebrow">Internal Corporate Portal</p>
          <h1>Anclora Group</h1>
          <p>
            Entorno corporativo desde el que Anclora organiza el acceso interno a sus aplicaciones,
            equipos, operaciones y herramientas estratégicas con control por rol y una arquitectura unificada.
          </p>
        </div>
        <div className="group-login-card">
          <div className="group-section-head">
            <div>
              <p className="group-eyebrow">Secure Access</p>
              <h2>Acceso interno al launcher corporativo</h2>
            </div>
          </div>
          <GroupLoginForm />
        </div>
      </section>
    </main>
  )
}
