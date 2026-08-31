import { GroupPortalNav } from '@/components/group/GroupPortalNav'
import { GroupAppsCatalog } from '@/components/group/GroupAppsCatalog'
import { GroupLegalFooter } from '@/components/group/GroupLegalFooter'
import { getAppsForRole } from '@/lib/group-access'
import { requireGroupSession } from '@/lib/group-auth'
import { getGroupMessages } from '@/lib/group-ui'

export default async function AppsPage() {
  const session = await requireGroupSession()
  const apps = getAppsForRole(session.role)
  const ui = getGroupMessages()

  return (
    <main className="group-page">
      <div className="group-noise" />
      <section className="group-shell">
        <GroupPortalNav session={session} active="apps" />

        <header className="group-op-header">
          <p className="group-eyebrow">{ui.catalogEyebrow}</p>
          <h1>{ui.catalogTitle}</h1>
        </header>

        <GroupAppsCatalog apps={apps} />
        <GroupLegalFooter />
      </section>
    </main>
  )
}
