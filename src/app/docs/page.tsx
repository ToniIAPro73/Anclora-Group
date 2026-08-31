import { FileText, FileDown } from 'lucide-react'
import { GroupPortalNav } from '@/components/group/GroupPortalNav'
import { GroupLegalFooter } from '@/components/group/GroupLegalFooter'
import { requireGroupSession } from '@/lib/group-auth'
import { getGroupMessages } from '@/lib/group-ui'

export default async function DocsPage() {
  const session = await requireGroupSession()
  const ui = getGroupMessages()

  const documents = [
    {
      href: '/docs/architecture-pdf',
      icon: FileDown,
      title: ui.docArchitecturePdfTitle,
      description: ui.docArchitecturePdfDescription,
    },
    {
      href: '/docs/architecture-document',
      icon: FileText,
      title: ui.docArchitectureDocTitle,
      description: ui.docArchitectureDocDescription,
    },
  ]

  return (
    <main className="group-page">
      <div className="group-noise" />
      <section className="group-shell">
        <GroupPortalNav session={session} active="docs" />

        <header className="group-op-header">
          <p className="group-eyebrow">{ui.docsEyebrow}</p>
          <h1>{ui.docsTitle}</h1>
          <p className="group-op-header-meta">{ui.docsBody}</p>
        </header>

        <section className="group-section">
          <div className="group-doc-list">
            {documents.map((doc) => (
              <a key={doc.href} href={doc.href} target="_blank" rel="noreferrer" className="group-doc-item">
                <span className="group-doc-item-icon">
                  <doc.icon size={20} />
                </span>
                <span className="group-doc-item-copy">
                  <strong>{doc.title}</strong>
                  <small>{doc.description}</small>
                </span>
                <span className="group-doc-item-cta">{ui.docOpenLabel}</span>
              </a>
            ))}
          </div>
        </section>
        <GroupLegalFooter />
      </section>
    </main>
  )
}
