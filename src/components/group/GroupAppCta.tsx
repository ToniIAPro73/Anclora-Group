import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { GroupAppDefinition } from '@/lib/group-access'

/** Internal relay routes use next/link; external URLs open in a new tab. */
export function GroupAppCta({ app, label }: { app: GroupAppDefinition; label: string }) {
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
  const content = (
    <>
      {app.logoSrc ? (
        <span className="group-app-row-logo">
          <Image src={app.logoSrc} alt="" width={36} height={36} className="group-app-row-logo-img" />
        </span>
      ) : null}
      <span className="group-app-row-copy">
        <strong>{app.title}</strong>
        <small>{app.eyebrow}</small>
      </span>
      <ArrowUpRight size={16} className="group-app-row-icon" />
    </>
  )

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
