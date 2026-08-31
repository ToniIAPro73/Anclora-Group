import Image from 'next/image'
import Link from 'next/link'
import type { GroupSession } from '@/lib/group-auth'
import { getGroupMessages, getRoleLabels } from '@/lib/group-ui'

export type GroupPortalSection = 'workspace' | 'apps' | 'architecture' | 'docs'

type Props = {
  session: GroupSession
  active: GroupPortalSection
}

export function GroupPortalNav({ session, active }: Props) {
  const ui = getGroupMessages()
  const roleLabels = getRoleLabels()

  const items: Array<{ key: GroupPortalSection; href: string; label: string }> = [
    { key: 'workspace', href: '/workspace', label: ui.navWorkspace },
    { key: 'apps', href: '/apps', label: ui.navApps },
    { key: 'architecture', href: '/architecture', label: ui.navArchitecture },
    { key: 'docs', href: '/docs', label: ui.navDocs },
  ]

  return (
    <header className="group-topbar group-portal-nav">
      <div className="group-brand">
        <Link href="/workspace" className="group-brand-badge" aria-label="Anclora Group">
          <Image src="/brand/anclora-group.webp" alt="" width={54} height={54} className="group-brand-logo" />
        </Link>
        <div>
          <p className="group-brand-name">ANCLORA GROUP</p>
          <p className="group-brand-line">Portal operativo corporativo</p>
        </div>
      </div>

      <nav className="group-portal-links" aria-label="Navegación del portal">
        {items.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`group-portal-link${active === item.key ? ' is-active' : ''}`}
            aria-current={active === item.key ? 'page' : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="group-user-panel">
        <strong>{session.displayName}</strong>
        <span>{roleLabels[session.role]}</span>
        <form action="/api/auth/session" method="post">
          <input type="hidden" name="_method" value="DELETE" />
          <button className="group-ghost-button" type="submit">{ui.logoutLabel}</button>
        </form>
      </div>
    </header>
  )
}
