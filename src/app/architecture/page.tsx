import { GroupPortalNav } from '@/components/group/GroupPortalNav'
import { GroupLegalFooter } from '@/components/group/GroupLegalFooter'
import { GroupAppRow } from '@/components/group/GroupAppCta'
import { getAppsForRole, getArchitectureLanes } from '@/lib/group-access'
import { requireGroupSession } from '@/lib/group-auth'
import { getGroupMessages } from '@/lib/group-ui'

export default async function ArchitecturePage() {
  const session = await requireGroupSession()
  // Deliberate choice (spec R6): the map is filtered to apps the session
  // role can access. No disclosure of unauthorized apps by default.
  const lanes = getArchitectureLanes(getAppsForRole(session.role))
  const ui = getGroupMessages()

  return (
    <main className="group-page">
      <div className="group-noise" />
      <section className="group-shell">
        <GroupPortalNav session={session} active="architecture" />

        <header className="group-op-header">
          <p className="group-eyebrow">{ui.architectureEyebrow}</p>
          <h1>{ui.architectureTitle}</h1>
          <p className="group-op-header-meta">{ui.architectureFilteredNote}</p>
        </header>

        <section className="group-section">
          <div className="group-architecture-grid">
            {lanes.map((lane) => (
              <section key={lane.key} className={`group-architecture-column is-${lane.key}-layer`}>
                <div className="group-architecture-head">
                  <p>{lane.eyebrow}</p>
                  <h2>{lane.title}</h2>
                  <span>{lane.body}</span>
                </div>
                <div className="group-architecture-stack">
                  {lane.apps.map((app) => (
                    <GroupAppRow key={app.key} app={app} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
        <GroupLegalFooter />
      </section>
    </main>
  )
}
