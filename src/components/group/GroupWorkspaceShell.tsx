import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, LayoutGrid, ShieldCheck, Sparkles } from 'lucide-react'
import { getAppsForRole, getGroupAppDefinitions } from '@/lib/group-access'
import type { GroupSession } from '@/lib/group-auth'
import { getGroupMessages, getRoleLabels } from '@/lib/group-ui'

type Props = {
  session: GroupSession
}

export function GroupWorkspaceShell({ session }: Props) {
  const apps = getAppsForRole(session.role)
  const allApps = getGroupAppDefinitions()
  const ui = getGroupMessages()
  const roleLabels = getRoleLabels()

  return (
    <main className="group-page">
      <div className="group-noise" />
      <section className="group-shell">
        <header className="group-topbar">
          <div className="group-brand">
            <div className="group-brand-badge">
              <Image src="/brand/logo-anclora-group.png" alt="Anclora Group" width={54} height={54} className="group-brand-logo" />
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
            <p className="group-eyebrow">{ui.heroEyebrow}</p>
            <h1>{ui.heroTitle}</h1>
            <p>{ui.heroBody}</p>
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
              <p className="group-eyebrow">{ui.appsEyebrow}</p>
              <h2>{ui.appsTitle}</h2>
            </div>
          </div>
          <div className="group-app-grid">
            {apps.map((app) => (
              <article key={app.key} className="group-app-card">
                <div className="group-app-head">
                  <span>{app.eyebrow}</span>
                  <small>{app.visibility === 'internal' ? ui.visibilityInternal : ui.visibilityExternal}</small>
                </div>
                {app.logoSrc ? (
                  <div className="group-app-logo-wrap">
                    <Image
                      src={app.logoSrc}
                      alt={app.title}
                      width={112}
                      height={112}
                      className="group-app-logo"
                    />
                  </div>
                ) : null}
                <h3>{app.title}</h3>
                <p>{app.description}</p>
                {app.url.startsWith('/') ? (
                  <Link href={app.url} className="group-link-button">
                    Abrir aplicación
                    <ArrowUpRight size={15} />
                  </Link>
                ) : (
                  <a href={app.url} target="_blank" rel="noreferrer" className="group-link-button">
                    Abrir aplicación
                    <ArrowUpRight size={15} />
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="group-section group-section-secondary">
          <div className="group-section-head">
            <div>
              <p className="group-eyebrow">{ui.architectureEyebrow}</p>
              <h2>{ui.architectureTitle}</h2>
            </div>
            <Link href="/docs/anclora-group-access-architecture-v1.md" className="group-doc-link" target="_blank">
              {ui.architectureLink}
            </Link>
          </div>
          <div className="group-map-grid">
            {allApps.map((app) => (
              <article key={app.key} className={`group-map-card is-${app.visibility}`}>
                {app.logoSrc ? (
                  <div className="group-map-logo-wrap">
                    <Image
                      src={app.logoSrc}
                      alt={app.title}
                      width={88}
                      height={88}
                      className="group-map-logo"
                    />
                  </div>
                ) : null}
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
