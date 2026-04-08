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
| `group-admin` | Todas las apps |
| `private-estates-ops` | Private Estates |
| `partner-ops` | Synergi |
| `data-ops` | Data Lab, Nexus, Command Center |
| `content-ops` | Content Generator AI |
| `advisory` | Advisor AI |
| `growth-ops` | Impulso + apps de activación |

8 apps registradas en el launcher (ver sección Integraciones).

### Modelo de 3 Capas

```
Entry Layer:       Private Estates, Synergi
Core Layer:        Data Lab, Nexus, Command Center
Activation Layer:  Content Generator AI, Advisor AI, Impulso
```

### Páginas Relay

- `/workspace/synergi-access` → redirige al backoffice de Synergi (autenticación requerida)
- `/workspace/data-lab-access` → redirige al backoffice de Data Lab

### Localización

4 idiomas preparados: `es`, `en`, `de`, `fr`. Actualmente `en/de/fr` son mirrors de `es` (placeholders). Todo el copy centralizado en `src/lib/group-ui.ts`.

---

## 4. Variables de Entorno

```env
# Autenticación
ANCLORA_GROUP_SESSION_SECRET=
ANCLORA_GROUP_BOOTSTRAP_USERNAME=
ANCLORA_GROUP_BOOTSTRAP_PASSWORD=
ANCLORA_GROUP_BOOTSTRAP_DISPLAY_NAME=
ANCLORA_GROUP_BOOTSTRAP_ROLE=group-admin
ANCLORA_GROUP_INTERNAL_USERS_JSON=[{"username":"...","password":"...","displayName":"...","role":"group-admin"}]

# UI
NEXT_PUBLIC_GROUP_DEFAULT_LOCALE=es
NEXT_PUBLIC_GROUP_DEFAULT_THEME=dark

# URLs del ecosistema (todas sobreescribibles)
NEXT_PUBLIC_PRIVATE_ESTATES_URL=https://anclora-private-estates.vercel.app/
NEXT_PUBLIC_SYNERGI_INTERNAL_URL=https://anclora-synergi.vercel.app/partner-admissions/login
NEXT_PUBLIC_DATA_LAB_INTERNAL_URL=https://anclora-data-lab.vercel.app/access-requests/login
NEXT_PUBLIC_NEXUS_URL=https://anclora-nexus-frontend.vercel.app/
NEXT_PUBLIC_COMMAND_CENTER_URL=https://boveda-anclora.vercel.app/
NEXT_PUBLIC_CONTENT_GENERATOR_AI_URL=https://anclora-content-generator-ai.vercel.app/
NEXT_PUBLIC_ADVISOR_AI_URL=https://ancloraadvisorai-ten.vercel.app/
```

---

## 5. Apps Registradas en el Launcher

| App Key | Título | Tipo | Visibilidad | URL por defecto |
|---------|--------|------|-------------|------------------|
| `private-estates` | Anclora Private Estates | external-hub | Pública | anclora-private-estates.vercel.app |
| `synergi` | Anclora Synergi | partner-platform | Interna | anclora-synergi.vercel.app |
| `data-lab` | Anclora Data Lab | intelligence-platform | Interna | anclora-data-lab.vercel.app |
| `nexus` | Anclora Nexus | ops-platform | Interna | anclora-nexus-frontend.vercel.app |
| `command-center` | Anclora Command Center | ops-platform | Interna | boveda-anclora.vercel.app |
| `content-generator-ai` | Anclora Content Generator AI | ai-platform | Interna | anclora-content-generator-ai.vercel.app |
| `advisor-ai` | Anclora Advisor AI | ai-platform | Interna | ancloraadvisorai-ten.vercel.app |
| `impulso` | Anclora Impulso | wellness-platform | Interna | anclora-impulso.vercel.app |

---

## 6. Estructura de Directorios Relevante

```
src/
  lib/
    group-auth.ts      # HMAC session auth
    group-access.ts    # 7 roles + 8 apps registry
    group-ui.ts        # Copy centralizado y locale handling
  components/
    group/
      GroupWorkspaceShell.tsx  # Launcher principal
public/
  brand/               # Activos de marca
  docs/                # PDF de arquitectura
scripts/
  dev-safe.ps1         # Arranque seguro (Windows/PowerShell)
  generate-architecture-pdf.mjs
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

- Session secret fuerte en producción (mínimo 32 caracteres aleatorios)
- `timingSafeEqual` previene ataques de timing en comparación de cookies
- `ANCLORA_GROUP_INTERNAL_USERS_JSON` NUNCA en el repo; siempre en env del servidor
- Variables `NEXT_PUBLIC_*` son públicas en el cliente — no incluir secrets
- Sin base de datos: reducida superficie de ataque

---

*Generado por Claude Code — Abril 2026 (v1.1)*
