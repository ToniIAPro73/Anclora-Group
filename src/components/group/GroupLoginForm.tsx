'use client'

import { useState, type FormEvent } from 'react'
import { getGroupMessages } from '@/lib/group-ui'

export function GroupLoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const ui = getGroupMessages()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const body = (await response.json().catch(() => null)) as { error?: string } | null
      if (!response.ok) {
        throw new Error(body?.error || ui.loginErrorFallback)
      }

      window.location.assign('/workspace')
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : ui.loginErrorFallback)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="group-form" onSubmit={handleSubmit}>
      <label className="group-field">
        <span>{ui.usernameLabel}</span>
        <input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="antonio" required />
      </label>
      <label className="group-field">
        <span>{ui.passwordLabel}</span>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••••" required />
      </label>
      {error ? <p className="group-notice">{error}</p> : null}
      <button className="group-button" type="submit" disabled={submitting}>
        {submitting ? ui.loginSubmitBusy : ui.loginSubmitIdle}
      </button>
    </form>
  )
}
