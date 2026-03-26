import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, KeyRound, ShieldCheck } from 'lucide-react'
import type { GroupSession } from '@/lib/group-auth'

type Props = {
  session: GroupSession
  title: string
  eyebrow: string
  description: string
  logoSrc: string
  loginHref: string
  loginLabel: string
  helperTitle: string
  helperCopy: string
  accessTitle: string
  accessCopy: string
}

export function GroupInternalAccessPage({
  session,
  title,
  eyebrow,
  description,
  logoSrc,
  loginHref,
  loginLabel,
  helperTitle,
  helperCopy,
  accessTitle,
  accessCopy,
}: Props) {
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
              <p className="group-brand-line">Acceso interno corporativo</p>
            </div>
          </div>
          <div className="group-user-panel">
            <strong>{session.displayName}</strong>
            <span>{session.role}</span>
          </div>
        </header>

        <section className="group-access-layout">
          <article className="group-login-brand">
            <div className="group-access-backline">
              <Link href="/workspace" className="group-access-backlink">
                <ArrowLeft size={16} />
                Volver al launcher interno
              </Link>
            </div>
            <div className="group-access-brand">
              <div className="group-brand-badge is-large">
                <Image src={logoSrc} alt={title} width={108} height={108} className="group-brand-logo" />
              </div>
              <div>
                <p className="group-eyebrow">{eyebrow}</p>
                <h1>{title}</h1>
                <p>{description}</p>
              </div>
            </div>
          </article>

          <article className="group-login-card">
            <div className="group-access-panels">
              <div className="group-access-panel">
                <div className="group-access-panel-icon">
                  <KeyRound size={18} />
                </div>
                <div>
                  <p className="group-eyebrow">Acceso interno</p>
                  <h2>{accessTitle}</h2>
                  <p>{accessCopy}</p>
                </div>
              </div>

              <div className="group-access-panel">
                <div className="group-access-panel-icon">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <p className="group-eyebrow">Criterio de acceso</p>
                  <h2>{helperTitle}</h2>
                  <p>{helperCopy}</p>
                </div>
              </div>
            </div>

            <div className="group-access-actions">
              <a href={loginHref} target="_blank" rel="noreferrer" className="group-link-button">
                {loginLabel}
                <ArrowUpRight size={15} />
              </a>
            </div>
          </article>
        </section>
      </section>
    </main>
  )
}
