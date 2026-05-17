'use client'

import Link from 'next/link'

export function GroupLegalFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="group-legal-footer">
      <div>
        <strong>Anclora Group</strong>
        <p>Entidad propietaria y operadora del ecosistema Anclora.</p>
        <p>© {year} Anclora Group — Todos los derechos reservados.</p>
      </div>
      <nav aria-label="Legal Anclora Group">
        <Link href="/terms">Términos del servicio</Link>
        <Link href="/privacy">Política de privacidad</Link>
        <Link href="/legal">Aviso legal</Link>
        <a href="mailto:hola@anclora.com">hola@anclora.com</a>
        <button type="button" onClick={() => window.dispatchEvent(new Event('anclora:open-cookie-preferences'))}>Cookies</button>
      </nav>
    </footer>
  )
}
