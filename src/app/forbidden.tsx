import Link from 'next/link'

export default function ForbiddenPage() {
  return (
    <main className="group-page">
      <div className="group-noise" />
      <section className="group-login-shell">
        <div className="group-login-card">
          <div className="group-section-head">
            <div>
              <p className="group-eyebrow">Acceso denegado</p>
              <h1>No autorizado (403)</h1>
            </div>
          </div>
          <p>Tu rol no tiene permiso para acceder a este recurso.</p>
          <p>
            <Link href="/workspace">Volver al workspace</Link>
          </p>
        </div>
      </section>
    </main>
  )
}
