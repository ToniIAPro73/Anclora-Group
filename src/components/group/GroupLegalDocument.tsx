import Link from 'next/link'
import { GroupLegalFooter } from '@/components/group/GroupLegalFooter'

type Block = {
  title: string
  paragraphs: string[]
}

export function GroupLegalDocument({ title, description, blocks }: { title: string; description: string; blocks: Block[] }) {
  return (
    <main className="group-page">
      <div className="group-noise" />
      <section className="group-shell">
        <section className="group-section">
          <p className="group-eyebrow">Anclora Group</p>
          <h1>{title}</h1>
          <p>{description}</p>
          <p>Última actualización: 17 de mayo de 2026</p>
        </section>
        <section className="group-section">
          {blocks.map((block) => (
            <article key={block.title} className="group-map-card">
              <strong>{block.title}</strong>
              {block.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </article>
          ))}
        </section>
        <nav className="group-cookie-actions">
          <Link href="/terms" className="group-ghost-button">Términos</Link>
          <Link href="/privacy" className="group-ghost-button">Privacidad</Link>
          <Link href="/legal" className="group-ghost-button">Aviso legal</Link>
          <Link href="/login" className="group-button">Volver</Link>
        </nav>
        <GroupLegalFooter />
      </section>
    </main>
  )
}
