# Anclora Group — Guía Técnica Interna

**Clasificación:** Interno | **Versión:** 1.1 | **Fecha:** Abril 2026

---

## 1. Propósito y Rol en el Ecosistema

Anclora Group es la **entidad matriz** del ecosistema Anclora. Actúa como portal corporativo centralizado (intranet/launcher) que proporciona:

- Autenticación corporativa ligera (cookie HMAC-SHA256, sin OAuth externo)
- Launcher de aplicaciones con control de acceso por 7 roles definidos
- Modelo de 3 capas: Entry Layer / Core Layer / Activation Layer
- Punto de entrada único para todos los empleados
- Páginas relay para tools internas (Synergi, Data Lab)

---

## 2. Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|--------|
| Framework | Next.js (App Router, SSR puro) | 16.1.6 |
| Lenguaje | TypeScript | 5.x |
| UI | React | 19.x |
| Auth | HMAC-SHA256 cookie (custom) | — |
| Iconos | lucide-react | 0.563+ |
| PDF | pdf-lib | 1.17+ |
| Imágenes | sharp | 0.34+ |
| Testing | Node.js built-in test runner (tsx) | — |
| Linting | ESLint 9 + eslint-config-next | — |
| Deploy | Vercel | — |

**Sin base de datos**: toda la gestión de usuarios es vía variables de entorno.

---

## 3. Arquitectura

### Autenticación (src/lib/group-auth.ts)

- Cookie HMAC-SHA256 firmada: `anclora-group-session`
- Expiry: 12 horas
- Flags: `httpOnly`, `sameSite: lax`
- Usa `timingSafeEqual` para prevenir timing attacks
- Usuario bootstrap: vía env vars
- Usuarios adicionales: `ANCLORA_GROUP_INTERNAL_USERS_JSON` (array JSON)

### Control de Acceso (src/lib/group-access.ts)

7 roles definidos:

| Rol | Acceso a |
|-----|----------|
| `group-admin` | Todas las apps (15) |
| `private-estates-ops` | `private-estates`, `private-estates-landing`, `synergi`, `data-lab`, `nexus`, `command-center`, `content-generator-ai`, `syncxml`, `energyscan`, `filestudio`, `visionflow` (11) |
| `partner-ops` | `private-estates`, `private-estates-landing`, `synergi`, `data-lab`, `command-center` (5) |
| `data-ops` | `private-estates`, `private-estates-landing`, `data-lab`, `command-center`, `energyscan`, `visionflow` (6) |
| `content-ops` | `private-estates`, `private-estates-landing`, `command-center`, `content-generator-ai`, `filestudio`, `visionflow` (6) |
| `advisory` | `command-center`, `advisor-ai`, `fiscal`, `syncxml`, `filestudio` (5) |
| `growth-ops` | `command-center`, `impulso` (2) |

15 apps registradas en el launcher (ver sección Apps Registradas). La fuente de verdad es el array `roles` de cada app en `src/lib/group-access.ts`; el RBAC se aplica en servidor vía `requireAppAccess`.

### Modelo de 3 Capas

```
Entry Layer:       Private Estates, Private Estates Landing, Synergi, Linguo Cam
Core Layer:        Data Lab, Nexus, Command Center, VisionFlow, FileStudio
Activation Layer:  Content Generator AI, Advisor AI, Fiscal, SyncXML, EnergyScan, Impulso
```

(Asignación por `architectureLayer` en `src/lib/group-access.ts`.)

### Rutas del Portal

- `/workspace` → home operativa tras login
- `/apps` → catálogo de apps autorizadas según rol
- `/architecture` → mapa de las 3 capas
- `/docs` → documentación autenticada (incluye el PDF y el documento de arquitectura)
- `/login`, `/privacy`, `/terms`, `/legal`, API `/api/auth/session`

### Páginas Relay

- `/workspace/synergi-access` → redirige al backoffice de Synergi (autenticación requerida)
- `/workspace/data-lab-access` → redirige al backoffice de Data Lab

### Localización

La UI del portal es solo en español: no existe selector de idioma. `src/lib/group-ui.ts` declara 4 locales (`es`, `en`, `de`, `fr`), pero `en/de/fr` son mirrors de `es` (placeholders); el i18n real es una fase futura. Todo el copy centralizado en `src/lib/group-ui.ts`.

---

## 4. Variables de Entorno

```env
# Autenticación (modelo post-hardening)
# ANCLORA_GROUP_SESSION_SECRET es OBLIGATORIA en producción (fail-closed al arrancar si falta;
# existe fallback solo en desarrollo/test). Generar con: openssl rand -base64 48
ANCLORA_GROUP_SESSION_SECRET=

# Las contraseñas son hashes bcrypt, nunca texto plano.
# Generar un hash con: node scripts/hash-password.mjs "<password>"
ANCLORA_GROUP_BOOTSTRAP_USERNAME=
ANCLORA_GROUP_BOOTSTRAP_PASSWORD_HASH=
ANCLORA_GROUP_BOOTSTRAP_DISPLAY_NAME=
ANCLORA_GROUP_BOOTSTRAP_ROLE=group-admin
ANCLORA_GROUP_INTERNAL_USERS_JSON=[{"username":"...","passwordHash":"<bcrypt-hash>","displayName":"...","role":"group-admin"}]

# Legacy solo en desarrollo (ignorada en producción):
# ANCLORA_GROUP_BOOTSTRAP_PASSWORD=   # texto plano, DX local únicamente

# UI
NEXT_PUBLIC_GROUP_DEFAULT_LOCALE=es
# Sin variable de tema: el portal es dark-only (el light theme roto se eliminó en Phase 3).

# URLs del ecosistema (todas sobreescribibles)
# La lista completa de NEXT_PUBLIC_*_URL —con sus defaults y GAPs conocidos— vive en .env.example:
# NEXT_PUBLIC_PRIVATE_ESTATES_URL, NEXT_PUBLIC_PRIVATE_ESTATES_LANDING_URL,
# NEXT_PUBLIC_SYNERGI_INTERNAL_URL, NEXT_PUBLIC_DATA_LAB_INTERNAL_URL, NEXT_PUBLIC_NEXUS_URL,
# NEXT_PUBLIC_COMMAND_CENTER_URL, NEXT_PUBLIC_CONTENT_GENERATOR_AI_URL, NEXT_PUBLIC_ADVISOR_AI_URL,
# NEXT_PUBLIC_IMPULSO_URL, NEXT_PUBLIC_FISCAL_URL, NEXT_PUBLIC_SYNCXML_URL,
# NEXT_PUBLIC_ENERGYSCAN_URL, NEXT_PUBLIC_FILESTUDIO_URL, NEXT_PUBLIC_VISIONFLOW_URL,
# NEXT_PUBLIC_LINGUO_CAM_URL
```

Sesión: cookie `anclora-group-session` HMAC-SHA256 con `iat`/`exp` (12h), `httpOnly`, `sameSite: lax`, `secure` en producción. Login con rate limit (429 tras 5 intentos fallidos por IP+username / 15 min) y headers de seguridad + `noindex` en todo el portal.

---

## 5. Apps Registradas en el Launcher

La fuente de verdad (SSOT) del catálogo es `getGroupAppDefinitions()` en `src/lib/group-access.ts`: títulos, descripciones, roles, visibilidad y URLs por defecto se declaran ahí. Resumen de las 15 apps:

| App Key | Título | Visibilidad |
|---------|--------|-------------|
| `private-estates` | Anclora Private Estates | Pública |
| `private-estates-landing` | Anclora Private Estates Landing Page | Pública |
| `synergi` | Anclora Synergi | Interna |
| `data-lab` | Anclora Data Lab | Interna |
| `nexus` | Anclora Nexus | Interna |
| `command-center` | Anclora Command Center | Interna |
| `content-generator-ai` | Anclora Content Generator AI | Interna |
| `advisor-ai` | Anclora Advisor AI | Interna |
| `fiscal` | Anclora Fiscal | Interna |
| `syncxml` | Anclora SyncXML | Interna |
| `energyscan` | Anclora EnergyScan | Interna |
| `filestudio` | Anclora FileStudio | Interna |
| `visionflow` | Anclora VisionFlow | Interna |
| `linguo-cam` | Anclora Linguo Cam | Interna |
| `impulso` | Anclora Impulso | Interna |

---

## 6. Estructura de Directorios Relevante

```
src/
  lib/
    group-auth.ts      # HMAC session auth
    group-access.ts    # 7 roles + 15 apps registry
    group-ui.ts        # Copy centralizado y locale handling
  components/
    group/
      GroupPortalNav.tsx       # Navegación del portal (workspace/apps/architecture/docs)
      GroupAppsCatalog.tsx     # Catálogo de apps por rol
public/
  brand/               # Activos de marca
private-docs/          # PDF y documento MD de arquitectura (servidos autenticados vía /docs)
scripts/
  dev-safe.ps1         # Arranque seguro (Windows/PowerShell)
  generate-architecture-pdf.ts # PDF derivado del registry (npm run generate:architecture-pdf)
  hash-password.mjs    # Helper para generar hashes bcrypt de contraseñas
sdd/
  core/                # Product spec v0
  features/
.agent/
  rules/               # Reglas de gobernanza de agentes
  skills/
    anclorabot-multiagente-system/
docs/
  standards/           # Contratos UX/UI
```

---

## 7. Comandos de Desarrollo

```bash
npm run dev      # (usa dev-safe.ps1 en Windows)
npm run build
npm run start
npm run lint
npm run test
npm run generate:architecture-pdf
```

---

## 8. Seguridad

- `ANCLORA_GROUP_SESSION_SECRET` obligatoria en producción: arranque fail-closed si falta (fallback solo en desarrollo/test)
- Contraseñas como hashes bcrypt (`passwordHash`); el texto plano legacy solo existe en desarrollo
- `timingSafeEqual` previene ataques de timing en comparación de cookies
- Login con rate limit (429 tras 5 intentos fallidos por IP+username / 15 min)
- Headers de seguridad + `noindex` en todo el portal
- `ANCLORA_GROUP_INTERNAL_USERS_JSON` NUNCA en el repo; siempre en env del servidor
- Variables `NEXT_PUBLIC_*` son públicas en el cliente — no incluir secrets
- Sin base de datos: reducida superficie de ataque

---

*Generado por Claude Code — Abril 2026 (v1.1)*
