import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { GroupAppDefinition } from '@/lib/group-access'
import { getGroupMessages } from '@/lib/group-ui'

/** Internal relay routes use next/link; external URLs open in a new tab.
 * A paused app (e.g. Talent) never renders as a clickable link — there is
 * nothing live to open — it shows a disabled, non-interactive affordance
 * instead so the CTA never silently 404s or misleads as "active". */
export function GroupAppCta({ app, label }: { app: GroupAppDefinition; label: string }) {
  if (app.status === 'paused') {
    const ui = getGroupMessages()
    return (
      <span className="group-link-button is-disabled" aria-disabled="true">
        <span>{ui.openAppPausedLabel}</span>
      </span>
    )
  }
  if (app.url.startsWith('/')) {
    return (
      <Link href={app.url} className="group-link-button">
        <span>{label}</span>
        <ArrowUpRight size={15} />
      </Link>
    )
  }
  return (
    <a href={app.url} target="_blank" rel="noreferrer" className="group-link-button">
      <span>{label}</span>
      <ArrowUpRight size={15} />
    </a>
  )
}

/** Compact row used by the operational home and architecture lanes. */
export function GroupAppRow({ app }: { app: GroupAppDefinition }) {
  const isPaused = app.status === 'paused'
  const ui = isPaused ? getGroupMessages() : null
  const content = (
    <>
      {app.logoSrc ? (
        <span className="group-app-row-logo">
          <Image src={app.logoSrc} alt="" width={36} height={36} className="group-app-row-logo-img" />
        </span>
      ) : null}
      <span className="group-app-row-copy">
        <strong>{app.title}</strong>
        <small>{isPaused ? `${app.eyebrow} · ${ui!.statusPaused}` : app.eyebrow}</small>
      </span>
      {isPaused ? null : <ArrowUpRight size={16} className="group-app-row-icon" />}
    </>
  )

  if (isPaused) {
    return (
      <span className="group-app-row is-disabled" aria-disabled="true">
        {content}
      </span>
    )
  }

  const className = 'group-app-row'
  if (app.url.startsWith('/')) {
    return (
      <Link href={app.url} className={className}>
        {content}
      </Link>
    )
  }
  return (
    <a href={app.url} target="_blank" rel="noreferrer" className={className}>
      {content}
    </a>
  )
}
