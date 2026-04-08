# Anclora Synergi — Guía Técnica Interna

**Clasificación:** Interno | **Versión:** 1.1 | **Fecha:** Abril 2026

---

## 1. Propósito y Rol en el Ecosistema

Anclora Synergi es el **portal independiente de partners** del ecosistema Anclora. Gestiona el ciclo completo de admisión, activación y gestión de socios comerciales del ecosistema inmobiliario de lujo de las Islas Baleares.

**Flujo principal:**
1. Partner solicita acceso desde la web pública (con reCAPTCHA)
2. Equipo interno revisa y decide desde el panel admin (con analytics + observabilidad)
3. Partner aprobado recibe email con invite-code, lo activa en `/activate`, y accede al workspace privado

---

## 2. Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|--------|
| Framework | Next.js (App Router) | 16.1.6 |
| Lenguaje | TypeScript | — |
| UI | React | 19.2 |
| Base de datos | Neon PostgreSQL (`@neondatabase/serverless`) | — |
| UI Components | Custom (sin Tailwind ni shadcn) | — |
| Email | Resend API (pluggable: `resend` o `noop`) | — |
| Auth | Cookies firmadas custom (sin librerías terceras) | — |
| CAPTCHA | Google reCAPTCHA | — |
| Deploy | Vercel | — |

**Nota**: No usa Tailwind ni shadcn. Tiene identidad visual premium propia.

---

## 3. Rutas Completas

| Ruta | Tipo | Descripción |
|------|------|-------------|
| `/` | Pública | Solicitud de partnership + acceso aprobado |
| `/login` | Pública | Login para partners aprobados |
| `/activate` | Pública | Activación de credenciales con invite-code (primer acceso) |
| `/workspace` | Privada (partner) | Workspace del partner: perfil, activos, referrals, oportunidades, asset-pack requests |
| `/partner-admissions/login` | Interna (admin) | Login del backoffice |
| `/partner-admissions` | Interna (admin) | Panel de revisión y decisión |
| `/partner-admissions/analytics` | Interna (admin) | Dashboard analítico |
| `/partner-admissions/observability` | Interna (admin) | Dashboard de observabilidad |

---

## 4. Ciclo de Admisión

```
Solicitud pública (reCAPTCHA) → Neon DB: partner_admissions
    │
    ▼
Panel admin: Aprobar / Rechazar / Reenviar credenciales
    │
    ├─ Aprobado → Resend email con invite-code
    │             → Partner activa en /activate
    │             → Accede al workspace privado
    └─ Rechazado → Resend email de notificación
```

---

## 5. Schema de Base de Datos (Neon PostgreSQL)

Archivo: `db/partner_admissions.sql`

| Tabla | Descripción |
|-------|-------------|
| `partner_admissions` | Solicitudes de partnership |
| `partner_accounts` | Cuentas de partners aprobados |
| `partner_workspaces` | Workspaces de cada partner |
| `partner_admission_decisions` | Historial de decisiones |
| `partner_profiles` | Perfiles extendidos |
| `partner_assets` | Activos disponibles para el partner |
| `partner_opportunities` | Oportunidades comerciales |
| `partner_referrals` | Referrals gestionados |
| `partner_asset_pack_requests` | Solicitudes de asset packs |
| `partner_activity_events` | Registro de actividad |
| `synergi_audit_events` | Audit trail: actor, endpoint, status, IP, user agent |

---

## 6. APIs Principales

```
POST  /api/partner/session              # Login del partner
POST  /api/partner/activate             # Activación con invite-code
GET   /api/partner/profile              # Perfil del partner
GET   /api/partner/assets               # Activos del partner
GET   /api/partner/referrals            # Referrals
GET   /api/partner/opportunities        # Oportunidades
POST  /api/partner/asset-pack-requests  # Solicitar asset pack
POST  /api/partner/reissue              # Reenvío de credenciales
POST  /api/admin/session                # Login del admin
GET   /api/admin/analytics              # Dashboard analítico
GET   /api/admin/observability          # Dashboard de observabilidad
ROUTE /api/partner-admission/route      # Gestión de solicitudes
GET   /api/partner-admissions/[id]      # Detalle de solicitud
```

---

## 7. Variables de Entorno

```env
NEXT_PUBLIC_PRIVATE_ESTATES_PARTNER_ENTRY_URL=
NEXT_PUBLIC_PRIVATE_ESTATES_URL=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
RECAPTCHA_VERIFY_URL=
DATABASE_URL=     # Neon PostgreSQL connection string
SYNERGI_ADMIN_USERNAME=
SYNERGI_ADMIN_PASSWORD=
SYNERGI_ADMIN_SESSION_SECRET=
SYNERGI_PARTNER_SESSION_SECRET=
USER_TEXT=
PASS_TEXT=
UTILIZAR_USER_TEXT=
SYNERGI_EMAIL_PROVIDER=   # 'resend' o omitir para 'noop'
RESEND_API_KEY=
SYNERGI_EMAIL_FROM=
SYNERGI_EMAIL_REPLY_TO=
SYNERGI_SUPPORT_EMAIL=
```

---

## 8. Email Transaccional (Resend)

- Confirmación de solicitud recibida
- **Aprobación**: email con invite-code para activación
- **Rechazo**: notificación al solicitante
- **Reenvío**: reenvío de credenciales desde panel admin

Si `SYNERGI_EMAIL_PROVIDER` no se configura, default a `noop` (modo silencioso sin envío).

---

## 9. Branding Canónico

| Token | Valor |
|-------|-------|
| Familia | Premium |
| Tipografía | DM Sans |
| Accent | Púrpura `#8C5AB4` |
| Borde icono | Cobre `#C07860` |
| Interior icono | `#1C162A` |
| Prefijo favicon | `synergi_` |

---

## 10. Contratos UX/UI

1. `ANCLORA_ECOSYSTEM_CONTRACT_GROUPS.md`
2. `ANCLORA_PREMIUM_APP_CONTRACT.md`
3. `UI_MOTION_CONTRACT.md`
4. `MODAL_CONTRACT.md`
5. `LOCALIZATION_CONTRACT.md`

---

*Generado por Claude Code — Abril 2026 (v1.1)*
