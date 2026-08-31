'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import type { GroupAppDefinition } from '@/lib/group-access'
import { groupAppsByBusinessArea, searchGroupApps } from '@/lib/group-access'
import { getGroupMessages } from '@/lib/group-ui'
import { GroupAppRow } from '@/components/group/GroupAppCta'

type Props = {
  apps: GroupAppDefinition[]
}

/**
 * Operational home: fast search over the user's authorized apps plus a
 * compact grouped list. Receives only role-filtered apps from the server.
 */
export function GroupQuickAccess({ apps }: Props) {
  const [query, setQuery] = useState('')
  const ui = getGroupMessages()

  const results = searchGroupApps(apps, query)
  const groups = groupAppsByBusinessArea(results)
  const searching = query.trim().length > 0

  return (
    <section className="group-section group-quick-access" aria-label={ui.searchLabel}>
      <div className="group-search">
        <Search size={18} aria-hidden="true" />
        <label htmlFor="group-app-search" className="group-visually-hidden">
          {ui.searchLabel}
        </label>
        <input
          id="group-app-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={ui.searchPlaceholder}
          autoComplete="off"
        />
      </div>

      {searching ? (
        <p className="group-empty-note" role="status" aria-live="polite">
          {results.length === 0
            ? ui.searchNoResults
            : `${results.length} ${results.length === 1 ? 'aplicación encontrada' : 'aplicaciones encontradas'}`}
        </p>
      ) : null}

      {results.length === 0 ? null : searching ? (
        <div className="group-app-rows">
          {results.map((app) => (
            <GroupAppRow key={app.key} app={app} />
          ))}
        </div>
      ) : (
        groups.map((group) => (
          <section key={group.area.key} className="group-area-block">
            <h2 className="group-area-title">{group.area.label}</h2>
            <div className="group-app-rows">
              {group.apps.map((app) => (
                <GroupAppRow key={app.key} app={app} />
              ))}
            </div>
          </section>
        ))
      )}
    </section>
  )
}
