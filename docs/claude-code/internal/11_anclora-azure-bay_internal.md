# Anclora Azure Bay Landing — Guía Técnica Interna

**Clasificación:** Interno | **Versión:** 1.0 | **Fecha:** Abril 2026

---

## 1. Propósito y Rol en el Ecosistema

Azure Bay Landing Page es la **landing page de alta conversión** para el desarrollo inmobiliario de lujo Azure Bay (Playa Viva / Meridian Group) en Al Marjan Island, Ras Al Khaimah, UAE. Implementa un pipeline de captación de leads completo y en producción:

```
Formulario + ALTCHA → HubSpot CRM → PDF personalizado → S3 storage → SMTP email con dossier
```

Es el primer proyecto Portfolio que implementa el patrón de Anclora Portfolio en producción real.

---

## 2. Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|--------|
| Framework | Next.js (App Router) | 16.x |
| Lenguaje | TypeScript | 5.x |
| Estilos | Tailwind CSS 4 | — |
| UI | shadcn/ui (Button), Radix UI | — |
| Formularios | react-hook-form + Zod | — |
| Bot protection | ALTCHA (proof-of-work, privacy-preserving) | — |
| PDF | pdf-lib + @pdf-lib/fontkit | — |
| Email | nodemailer (SMTP) | — |
| Storage | AWS S3-compatible (Cloudflare R2 / iDrive e2) | — |
| CRM | HubSpot Forms API + Meetings | — |
| Analytics | Vercel Analytics | — |
| Testing | Vitest | — |
| Deploy | Vercel | — |

---

## 3. Arquitectura

### Single-Page Architecture

Arquitectura monolítica intencional: toda la landing vive en `app/page.tsx` como un único Client Component con todo el estado co-localizado. Esto es diseño deliberado para landing pages de conversión.

### Pipeline de Lead Completo

```
Formulario de contacto
  │
  1. Verificación ALTCHA (proof-of-work, no cookies)
  │
  2. Creación de contacto en HubSpot (con UTM tracking)
  │
  3. Generación de PDF personalizado (pdf-lib, fuente Allura, estilo oro #8B7355)
  │
  4. Subida a S3 (Cloudflare R2 / iDrive e2) con URL firmada (24h expiry)
  │
  5. Email SMTP con enlace de descarga + botón HubSpot Meetings
      ├─ ES: tony@uniestate.co.uk
      └─ EN: michael@uniestate.co.uk
```

### Detección de Entorno para Storage

```
Vercel (producción) → /tmp/dossiers (S3 fallback)
Desarrollo local     → Carpeta Documents del usuario (Windows)
```

---

## 4. Variables de Entorno

```env
# HubSpot
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=
HUBSPOT_FORM_GUID=
HUBSPOT_MEETINGS_URL_ES=
HUBSPOT_MEETINGS_URL_EN=

# SMTP (Uniestate, enrutamiento por idioma)
SMTP_HOST=
SMTP_PORT=
SMTP_USER_ES=                    # tony@uniestate.co.uk
SMTP_PASS_ES=
SMTP_USER_EN=                    # michael@uniestate.co.uk
SMTP_PASS_EN=

# S3-compatible storage (Cloudflare R2 o iDrive e2)
S3_Endpoint=
S3_BUCKET_NAME=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
R2_ACCOUNT_ID=                   # Cloudflare R2
R2_BUCKET_NAME=

# ALTCHA
ALTCHA_SECRET=
ALTCHA_CHALLENGE_TTL=

# MongoDB Atlas (en .env.example pero no en uso activo)
MONGODB_URI=
```

---

## 5. Estructura de Directorios

```
app/
  page.tsx                # SPA completa (Client Component)
  landing-config.ts       # Configuración del sitio
  landing-content.ts      # Todo el copy bilingue (ES/EN)
  HubSpotScript.tsx       # Cargador del script HubSpot
  api/
    submit-lead/          # POST: pipeline completo de lead
    local-dossiers/[file] # GET: serving seguro de PDFs
    altcha/challenge      # GET: generación de desafíos ALTCHA
  sections/               # Secciones de la landing
lib/
  dossier-storage.ts      # Detección de entorno + config S3
  altcha.ts               # HMAC challenge + verificación
  lead-protection.ts      # Protección adicional de leads
  utils.ts                # cn() helper
public/
  fonts/Allura-Regular.ttf  # Fuente para PDF personalizado
sdd/                      # 5 features (3 CLOSED/GO, 1 CONDITIONAL GO, 1 PLANNED)
scripts/
  lighthouse-kpi-gate.mjs  # Gate de Core Web Vitals
docs/standards/           # Mismos 5 contratos que Portfolio
```

---

## 6. Workflow de Ramas

```
development (trabajo AI/Claude)
    │
    ▼ (usuario promueve)
preview (validación)
    │
    ▼ (usuario promueve)
production (live)
```

**Regla crítica**: El trabajo de desarrollo AI va SOLO a `development`. NUNCA direct push a `preview` o `production`.

---

## 7. URLs de Producción

- https://playaviva-uniestate.vercel.app (actual)
- Rebranding en progreso: Playa Viva → Azure Bay / Uniestate → Meridian Group

---

## 8. SDD de Features

| Feature | Estado |
|---------|--------|
| Performance / Accessibility | CLOSED / GO |
| Lead Capture Reliability | CLOSED / GO |
| Content Ops | CLOSED / GO |
| Conversion Analytics | IMPLEMENTED / CONDITIONAL GO |
| CRM Handoff / Lead Intelligence | PLANNED |

---

## 9. Seguridad

- ALTCHA es proof-of-work: no tracking, no cookies, privacy-preserving
- SMTP credentials: dos cuentas separadas (ES/EN); NUNCA exponer en cliente
- S3 URLs firmadas con expiry de 24h
- Next.js config incluye headers de seguridad: `X-Frame-Options DENY`, `X-XSS-Protection`, `nosniff`
- `ALTCHA_SECRET` debe ser fuerte y rotarse periódicamente

---

*Generado por Claude Code — Abril 2026*
