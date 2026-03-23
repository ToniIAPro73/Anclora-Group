import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, LayoutGrid, ShieldCheck, Sparkles } from 'lucide-react'
import { getAppsForRole, getGroupAppDefinitions } from '@/lib/group-access'
import type { GroupSession } from '@/lib/group-auth'

type Props = {
  session: GroupSession
}

const roleLabels: Record<GroupSession['role'], string> = {
  'group-admin': 'Group Admin',
  'private-estates-ops': 'Private Estates Ops',
  'partner-ops': 'Partner Ops',
  'data-ops': 'Data Ops',
  'content-ops': 'Content Ops',
  advisory: 'Advisor AI',
  'growth-ops': 'Growth Ops',
}

export function GroupWorkspaceShell({ session }: Props) {
  const apps = getAppsForRole(session.role)
  const allApps = getGroupAppDefinitions()

  return (
    <main className="group-page">
      <div className="group-noise" />
      <section className="group-shell">
        <header className="group-topbar">
          <div className="group-brand">
            <div className="group-brand-badge">
              <Image src="/brand/logo-anclora-group.svg" alt="Anclora Group" width={54} height={54} className="group-brand-logo" />
            </div>
            <div>
              <p className="group-brand-name">ANCLORA GROUP</p>
              <p className="group-brand-line">Launcher interno corporativo con control por rol</p>
            </div>
          </div>
          <div className="group-user-panel">
            <strong>{session.displayName}</strong>
            <span>{roleLabels[session.role]}</span>
            <form action="/api/auth/session" method="post">
              <input type="hidden" name="_method" value="DELETE" />
              <button className="group-ghost-button" type="submit">Cerrar sesión</button>
            </form>
          </div>
        </header>

        <section className="group-hero">
          <div className="group-hero-copy">
            <p className="group-eyebrow">Corporate Access Layer</p>
            <h1>Una única puerta para las aplicaciones internas de Anclora.</h1>
            <p>
              Anclora Group organiza el acceso interno a aplicaciones, equipos, operaciones y herramientas
              estratégicas mediante una arquitectura unificada y gobernada por roles.
            </p>
          </div>
          <div className="group-hero-metrics">
            <article>
              <LayoutGrid size={18} />
              <strong>{apps.length}</strong>
              <span>apps habilitadas para tu rol</span>
            </article>
            <article>
              <ShieldCheck size={18} />
              <strong>{allApps.length}</strong>
              <span>aplicaciones en el ecosistema corporativo</span>
            </article>
            <article>
              <Sparkles size={18} />
              <strong>1</strong>
              <span>launcher premium unificado</span>
            </article>
          </div>
        </section>

        <section className="group-section">
          <div className="group-section-head">
            <div>
              <p className="group-eyebrow">Enabled Apps</p>
              <h2>Aplicaciones visibles para tu rol</h2>
            </div>
          </div>
          <div className="group-app-grid">
            {apps.map((app) => (
              <article key={app.key} className="group-app-card">
                <div className="group-app-head">
                  <span>{app.eyebrow}</span>
                  <small>{app.visibility === 'internal' ? 'Internal' : 'External-facing'}</small>
                </div>
                <h3>{app.title}</h3>
                <p>{app.description}</p>
                <a href={app.url} target="_blank" rel="noreferrer" className="group-link-button">
                  Abrir aplicación
                  <ArrowUpRight size={15} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="group-section group-section-secondary">
          <div className="group-section-head">
            <div>
              <p className="group-eyebrow">Architecture</p>
              <h2>Mapa corporativo actual</h2>
            </div>
            <Link href="/docs/anclora-group-access-architecture-v1.md" className="group-doc-link" target="_blank">
              Ver arquitectura de acceso
            </Link>
          </div>
          <div className="group-map-grid">
            {allApps.map((app) => (
              <article key={app.key} className={`group-map-card is-${app.visibility}`}>
                <span>{app.eyebrow}</span>
                <strong>{app.title}</strong>
                <p>{app.description}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}
