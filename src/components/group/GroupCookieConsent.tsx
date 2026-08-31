'use client'

import { useEffect, useRef, useState } from 'react'
import {
  COOKIE_CONSENT_STORAGE_KEY,
  DEFAULT_COOKIE_PREFERENCES,
  parseStoredConsent,
  serializeConsent,
  type CookiePreferences,
} from '@/lib/group-consent'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function GroupCookieConsent() {
  const [open, setOpen] = useState(() => {
    if (typeof window === 'undefined') return false
    return !parseStoredConsent(localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY))
  })
  const [settings, setSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>(() => {
    if (typeof window === 'undefined') return DEFAULT_COOKIE_PREFERENCES
    return parseStoredConsent(localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)) ?? DEFAULT_COOKIE_PREFERENCES
  })

  const dialogRef = useRef<HTMLDivElement>(null)
  const restoreFocusRef = useRef<Element | null>(null)

  function close() {
    setOpen(false)
    setSettings(false)
  }

  function persist(next: CookiePreferences) {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, serializeConsent(next))
    setPreferences({ ...next, necessary: true, session: true, version: 'v1' })
    close()
  }

  useEffect(() => {
    const listener = () => {
      setOpen(true)
      setSettings(true)
    }
    window.addEventListener('anclora:open-cookie-preferences', listener)
    return () => window.removeEventListener('anclora:open-cookie-preferences', listener)
  }, [])

  // Initial focus, focus trap, Escape, scroll lock, focus restoration.
  useEffect(() => {
    if (!open) return

    restoreFocusRef.current = document.activeElement
    const dialog = dialogRef.current
    dialog?.focus()
    document.body.style.overflow = 'hidden'

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
        return
      }
      if (event.key !== 'Tab' || !dialog) return

      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      const restoreTo = restoreFocusRef.current
      if (restoreTo instanceof HTMLElement) restoreTo.focus()
    }
  }, [open])

  if (!open) return null

  return (
    <div className="group-cookie-overlay">
      <div
        ref={dialogRef}
        className="group-cookie-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="group-cookie-title"
        aria-describedby="group-cookie-description"
        tabIndex={-1}
      >
        {!settings ? (
          <>
            <p className="group-eyebrow">Anclora Group</p>
            <h2 id="group-cookie-title">Preferencias de cookies</h2>
            <p id="group-cookie-description">Este portal usa cookies necesarias para sesión, seguridad y preferencias. Las categorías opcionales no están activadas por defecto.</p>
            <div className="group-cookie-actions">
              <button type="button" className="group-button" onClick={() => persist({ ...DEFAULT_COOKIE_PREFERENCES, analytics: true, marketing: true })}>Aceptar todas</button>
              <button type="button" className="group-ghost-button" onClick={() => setSettings(true)}>Configuración</button>
              <button type="button" className="group-ghost-button" onClick={() => persist(DEFAULT_COOKIE_PREFERENCES)}>Rechazar opcionales</button>
            </div>
          </>
        ) : (
          <>
            <h2 id="group-cookie-title">Gestionar cookies</h2>
            <p id="group-cookie-description">Activa o desactiva las categorías opcionales. Las necesarias permanecen siempre activas.</p>
            <div className="group-cookie-list">
              <CookieRow title="Cookies necesarias" description="Funcionamiento básico, seguridad y preferencias. No se pueden desactivar." checked disabled onChange={() => {}} />
              <CookieRow title="Sesión y autenticación" description="Mantienen el acceso corporativo y protegen la cuenta." checked disabled onChange={() => {}} />
              <CookieRow title="Análisis operativo" description="Ayudan a mejorar estabilidad y uso interno cuando exista instrumentación." checked={preferences.analytics} onChange={(analytics) => setPreferences((current) => ({ ...current, analytics }))} />
              <CookieRow title="Marketing" description="Reservadas para comunicación corporativa relevante. No activan scripts inexistentes." checked={preferences.marketing} onChange={(marketing) => setPreferences((current) => ({ ...current, marketing }))} />
            </div>
            <div className="group-cookie-actions">
              <button type="button" className="group-ghost-button" onClick={() => setSettings(false)}>Volver</button>
              <button type="button" className="group-ghost-button" onClick={() => persist(DEFAULT_COOKIE_PREFERENCES)}>Rechazar opcionales</button>
              <button type="button" className="group-button" onClick={() => persist(preferences)}>Guardar preferencias</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function CookieRow({ title, description, checked, disabled, onChange }: { title: string; description: string; checked: boolean; disabled?: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="group-cookie-row">
      <span>
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(event) => onChange(event.target.checked)} />
    </label>
  )
}
