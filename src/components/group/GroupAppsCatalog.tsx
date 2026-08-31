'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Search } from 'lucide-react'
import type { GroupAppDefinition, GroupBusinessArea } from '@/lib/group-access'
import { getGroupBusinessAreas, searchGroupApps } from '@/lib/group-access'
import { getGroupMessages, getKindLabels } from '@/lib/group-ui'
import { GroupAppCta } from '@/components/group/GroupAppCta'

type VisibilityFilter = 'all' | 'internal' | 'external-facing'

type Props = {
  apps: GroupAppDefinition[]
}

/**
 * Full catalog: search + business-area chips + visibility filter over the
 * user's authorized apps. Receives only role-filtered apps from the server.
 */
export function GroupAppsCatalog({ apps }: Props) {
  const [query, setQuery] = useState('')
  const [area, setArea] = useState<GroupBusinessArea | 'all'>('all')
  const [visibility, setVisibility] = useState<VisibilityFilter>('all')
  const ui = getGroupMessages()
  const kindLabels = getKindLabels()
  const areas = getGroupBusinessAreas()

  const results = searchGroupApps(apps, query).filter((app) => {
    if (area !== 'all' && app.businessArea !== area) return false
    if (visibility !== 'all' && app.visibility !== visibility) return false
    return true
  })

  return (
    <section className="group-section" aria-label={ui.catalogTitle}>
      <div className="group-search">
        <Search size={18} aria-hidden="true" />
        <label htmlFor="group-catalog-search" className="group-visually-hidden">
          {ui.searchLabel}
        </label>
        <input
          id="group-catalog-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={ui.searchPlaceholder}
          autoComplete="off"
        />
      </div>

      <div className="group-filters">
        <div className="group-chip-row" role="group" aria-label={ui.filterAreaAll}>
          <button
            type="button"
            className={`group-chip${area === 'all' ? ' is-active' : ''}`}
            onClick={() => setArea('all')}
          >
            {ui.filterAreaAll}
          </button>
          {areas.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`group-chip${area === item.key ? ' is-active' : ''}`}
              onClick={() => setArea(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="group-chip-row" role="group" aria-label={ui.filterVisibilityAll}>
          {(['all', 'internal', 'external-facing'] as const).map((value) => (
            <button
              key={value}
              type="button"
              className={`group-chip${visibility === value ? ' is-active' : ''}`}
              onClick={() => setVisibility(value)}
            >
              {value === 'all' ? ui.filterVisibilityAll : value === 'internal' ? ui.visibilityInternal : ui.visibilityExternal}
            </button>
          ))}
        </div>
      </div>

      <p className="group-empty-note" role="status" aria-live="polite">
        {results.length === 0
          ? ui.searchNoResults
          : `${results.length} ${results.length === 1 ? 'aplicación' : 'aplicaciones'}`}
      </p>

      {results.length === 0 ? null : (
        <div className="group-app-grid">
          {results.map((app) => (
            <article key={app.key} className="group-app-card">
              <div className="group-app-head">
                <span>{app.eyebrow}</span>
                <small>{app.visibility === 'internal' ? ui.visibilityInternal : ui.visibilityExternal}</small>
              </div>
              {app.logoSrc ? (
                <div className="group-app-logo-wrap">
                  <Image src={app.logoSrc} alt="" width={112} height={112} className="group-app-logo" />
                </div>
              ) : null}
              <div className="group-app-body">
                <h3>{app.title}</h3>
                <p className="group-app-kind">{kindLabels[app.kind]}</p>
                <p>{app.description}</p>
                <GroupAppCta app={app} label={ui.openAppLabel} />
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
