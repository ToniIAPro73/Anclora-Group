# Anclora Synergi — Guía Técnica Interna

**Clasificación:** Interno | **Versión:** 1.0 | **Fecha:** Abril 2026

---

## 1. Propósito y Rol en el Ecosistema

Anclora Synergi es el **portal independiente de partners** del ecosistema Anclora. Gestiona el ciclo completo de admisión, activación y gestión de socios comerciales (agentes inmobiliarios, partners de inversión, etc.).

**Flujo principal:**
1. Partner solicita acceso desde la web pública (con reCAPTCHA)
2. Equipo interno revisa y aprueba/rechaza desde el panel admin
3. Partner aprobado recibe credenciales por email y accede al workspace privado

---

## 2. Stack Tecnológico

| Capa | Tecnología |
|------|----------|
| Framework | Next.js (App Router) |
| Lenguaje | TypeScript |
| Base de datos | Neon PostgreSQL |
| Bot protection | Google reCAPTCHA |
| Email | Resend API |
| Auth | Cookies firmadas (server) |
| Deploy | Vercel |

---

## 3. Rutas Principales

| Ruta | Tipo | Descripción |
|------|------|-------------|
| `/` | Pública | Solicitud de partnership + acceso aprobado |
| `/partner-admissions/login` | Pública | Login para partners aprobados |
| `/workspace/*` | Privada (partner) | Workspace del partner |
| `/admin/*` | Interna (admin) | Panel de revisión y decisión |
| `/admin/invites` | Interna (admin) | Generación de códigos de invitación |

---

## 4. Ciclo de Admisión

```
Solicitud pública (reCAPTCHA) → Neon DB (pendiente)
    │
    ▼
Panel admin: Aprobar / Rechazar / Reenviar credenciales
    │
    ├─ Aprobado → Email Resend con credenciales → Workspace privado
    └─ Rechazado → Email Resend de notificación
```

---

## 5. Variables de Entorno

```env
NEXT_PUBLIC_PRIVATE_ESTATES_PARTNER_ENTRY_URL=
NEXT_PUBLIC_PRIVATE_ESTATES_URL=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
RECAPTCHA_VERIFY_URL=
DATABASE_URL=
SYNERGI_ADMIN_USERNAME=
SYNERGI_ADMIN_PASSWORD=
SYNERGI_ADMIN_SESSION_SECRET=
SYNERGI_PARTNER_SESSION_SECRET=
USER_TEXT=
PASS_TEXT=
UTILIZAR_USER_TEXT=
SYNERGI_EMAIL_PROVIDER=
RESEND_API_KEY=
SYNERGI_EMAIL_FROM=
SYNERGI_EMAIL_REPLY_TO=
SYNERGI_SUPPORT_EMAIL=
```

---

## 6. Base de Datos

Esquema mínimo en Neon PostgreSQL:
- `partner_requests`: solicitudes (estado: pending, approved, rejected)
- `partners`: partners aprobados con credenciales
- `invite_codes`: códigos de invitación generados por admin

---

## 7. Email Transaccional (Resend)

- Confirmación de solicitud recibida
- Aprobación con credenciales de acceso
- Rechazo con notificación
- Reenvío de credenciales

---

## 8. Branding Canónico

| Token | Valor |
|-------|-------|
| Familia | Premium |
| Tipografía | DM Sans |
| Accent | Púrpura `#8C5AB4` |
| Borde icono | Cobre `#C07860` |
| Interior icono | `#1C162A` |
| Prefijo favicon | `synergi_` |

---

## 9. Contratos UX/UI

1. `ANCLORA_ECOSYSTEM_CONTRACT_GROUPS.md`
2. `ANCLORA_PREMIUM_APP_CONTRACT.md`
3. `UI_MOTION_CONTRACT.md`
4. `MODAL_CONTRACT.md`
5. `LOCALIZATION_CONTRACT.md`

---

*Generado por Claude Code — Abril 2026*
