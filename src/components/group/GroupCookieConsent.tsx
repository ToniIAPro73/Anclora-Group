'use client'

import { useEffect, useState } from 'react'

type CookiePreferences = {
  necessary: true
  session: true
  analytics: boolean
  marketing: boolean
  updatedAt: string
  version: 'v1'
}

const STORAGE_KEY = 'anclora-cookie-consent-v1'
const defaults: CookiePreferences = {
  necessary: true,
  session: true,
  analytics: false,
  marketing: false,
  updatedAt: '',
  version: 'v1',
}

export function GroupCookieConsent() {
  const [open, setOpen] = useState(() => {
    if (typeof window === 'undefined') return false
    return !localStorage.getItem(STORAGE_KEY)
  })
  const [settings, setSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>(() => {
    if (typeof window === 'undefined') return defaults
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<CookiePreferences>
        return {
          necessary: true,
          session: true,
          analytics: Boolean(parsed.analytics),
          marketing: Boolean(parsed.marketing),
          updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : '',
          version: 'v1',
        }
      }
    } catch {}
    return defaults
  })

  useEffect(() => {
    const listener = () => {
      setOpen(true)
      setSettings(true)
    }
    window.addEventListener('anclora:open-cookie-preferences', listener)
    return () => window.removeEventListener('anclora:open-cookie-preferences', listener)
  }, [])

  function persist(next: CookiePreferences) {
    const value = { ...next, necessary: true as const, session: true as const, updatedAt: new Date().toISOString(), version: 'v1' as const }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    setPreferences(value)
    setOpen(false)
    setSettings(false)
  }

  return (
    <>
      {open ? (
        <div className="group-cookie-overlay" role="dialog" aria-modal="true" aria-labelledby="group-cookie-title">
          <div className="group-cookie-modal">
            {!settings ? (
              <>
                <p className="group-eyebrow">Anclora Group</p>
                <h2 id="group-cookie-title">Preferencias de cookies</h2>
                <p>Este portal usa cookies necesarias para sesión, seguridad y preferencias. Las categorías opcionales no están activadas por defecto.</p>
                <div className="group-cookie-actions">
                  <button type="button" className="group-button" onClick={() => persist({ ...defaults, analytics: true, marketing: true })}>Aceptar todas</button>
                  <button type="button" className="group-ghost-button" onClick={() => setSettings(true)}>Configuración</button>
                  <button type="button" className="group-ghost-button" onClick={() => persist(defaults)}>Rechazar opcionales</button>
                </div>
              </>
            ) : (
              <>
                <h2 id="group-cookie-title">Gestionar cookies</h2>
                <div className="group-cookie-list">
                  <CookieRow title="Cookies necesarias" description="Funcionamiento básico, seguridad y preferencias. No se pueden desactivar." checked disabled onChange={() => {}} />
                  <CookieRow title="Sesión y autenticación" description="Mantienen el acceso corporativo y protegen la cuenta." checked disabled onChange={() => {}} />
                  <CookieRow title="Análisis operativo" description="Ayudan a mejorar estabilidad y uso interno cuando exista instrumentación." checked={preferences.analytics} onChange={(analytics) => setPreferences((current) => ({ ...current, analytics }))} />
                  <CookieRow title="Marketing" description="Reservadas para comunicación corporativa relevante. No activan scripts inexistentes." checked={preferences.marketing} onChange={(marketing) => setPreferences((current) => ({ ...current, marketing }))} />
                </div>
                <div className="group-cookie-actions">
                  <button type="button" className="group-ghost-button" onClick={() => setSettings(false)}>Volver</button>
                  <button type="button" className="group-ghost-button" onClick={() => persist(defaults)}>Rechazar opcionales</button>
                  <button type="button" className="group-button" onClick={() => persist(preferences)}>Guardar preferencias</button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
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
