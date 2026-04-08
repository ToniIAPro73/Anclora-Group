# Anclora Group — Guía Técnica Interna

**Clasificación:** Interno | **Versión:** 1.0 | **Fecha:** Abril 2026

---

## 1. Propósito y Rol en el Ecosistema

Anclora Group es la **entidad matriz** del ecosistema Anclora. Actúa como portal corporativo centralizado que proporciona autenticación corporativa ligera (cookie firmada, sin OAuth externo), launcher de aplicaciones con control de acceso por rol, gestión de identidad de marca base del ecosistema, y punto de entrada único para todos los empleados y administradores.

No es una app de cara al cliente final. Es el hub de operación interna.

---

## 2. Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|--------|
| Framework | Next.js (App Router) | 16.x |
| Lenguaje | TypeScript | 5.x |
| UI | React | 19.x |
| Iconos | lucide-react | 0.563+ |
| PDF | pdf-lib | 1.17+ |
| Imágenes | sharp | 0.34+ |
| Testing | tsx --test | 4.x |
| Deploy | Vercel / Next.js standalone | — |

---

## 3. Arquitectura

### Modelo de Autenticación

- Cookie firmada con `ANCLORA_GROUP_SESSION_SECRET`
- Usuario bootstrap configurable vía variables de entorno
- Usuarios adicionales vía `ANCLORA_GROUP_INTERNAL_USERS_JSON` (array JSON en env)
- Roles: `group-admin` y extensible
- **Sin base de datos**: los usuarios viven en variables de entorno

### Launcher por Rol

El portal muestra las aplicaciones del ecosistema según el rol del usuario autenticado. Cada app del ecosistema está enlazada a través de variables de entorno `NEXT_PUBLIC_*_URL`.

### Branding Base

- Tipografía: `Georgia` (serif)
- Tema: `dark` por defecto (configurable vía `NEXT_PUBLIC_GROUP_DEFAULT_THEME`)
- Idioma: `es` por defecto (configurable vía `NEXT_PUBLIC_GROUP_DEFAULT_LOCALE`)
- Copy agrupado en `src/lib/group-ui.ts`

---

## 4. Variables de Entorno

```env
# Autenticación
ANCLORA_GROUP_SESSION_SECRET=
ANCLORA_GROUP_BOOTSTRAP_USERNAME=
ANCLORA_GROUP_BOOTSTRAP_PASSWORD=
ANCLORA_GROUP_BOOTSTRAP_DISPLAY_NAME=
ANCLORA_GROUP_BOOTSTRAP_ROLE=group-admin

# Usuarios adicionales (opcional)
ANCLORA_GROUP_INTERNAL_USERS_JSON=[{"username":"...","password":"...","displayName":"...","role":"group-admin"}]

# Configuración de UI
NEXT_PUBLIC_GROUP_DEFAULT_LOCALE=es
NEXT_PUBLIC_GROUP_DEFAULT_THEME=dark

# URLs del ecosistema
NEXT_PUBLIC_PRIVATE_ESTATES_URL=https://anclora-private-estates.vercel.app/
NEXT_PUBLIC_SYNERGI_INTERNAL_URL=https://anclora-synergi.vercel.app/partner-admissions/login
NEXT_PUBLIC_DATA_LAB_INTERNAL_URL=https://anclora-data-lab.vercel.app/access-requests/login
NEXT_PUBLIC_NEXUS_URL=https://anclora-nexus-frontend.vercel.app/
NEXT_PUBLIC_COMMAND_CENTER_URL=https://anclora-command-center.vercel.app/
NEXT_PUBLIC_CONTENT_GENERATOR_AI_URL=
NEXT_PUBLIC_ADVISOR_AI_URL=
```

---

## 5. Estructura de Directorios Relevante

```
src/
  app/           # App Router de Next.js — páginas y layouts
  lib/
    group-ui.ts  # Copy centralizado de UI (preparado para i18n)
public/
  brand/         # Activos de marca (logo, favicon SVG)
  docs/          # Documentación interna de arquitectura
scripts/
  dev-safe.ps1                    # Script de arranque seguro (PowerShell)
  generate-architecture-pdf.mjs   # Generador de PDF de arquitectura
docs/
  standards/     # Contratos UX/UI (copia local del canon de Command Center)
  claude-code/   # Documentación generada por Claude Code (este directorio)
```

---

## 6. Comandos de Desarrollo

```bash
npm run dev      # Arranque en desarrollo (usa dev-safe.ps1 en Windows)
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # ESLint
npm run test     # Tests con tsx
npm run generate:architecture-pdf  # Genera PDF de arquitectura
```

---

## 7. Contratos UX/UI Aplicables

1. `ANCLORA_ECOSYSTEM_CONTRACT_GROUPS.md`
2. `ANCLORA_BRANDING_MASTER_CONTRACT.md`
3. `ANCLORA_BRANDING_COLOR_TOKENS.md`
4. `ANCLORA_BRANDING_TYPOGRAPHY.md`
5. `ANCLORA_BRANDING_ICON_SYSTEM.md`
6. `ANCLORA_BRANDING_FAVICON_SPEC.md`
7. `UI_MOTION_CONTRACT.md`
8. `MODAL_CONTRACT.md`
9. `LOCALIZATION_CONTRACT.md`

---

## 8. Seguridad

- Los secretos de sesión NUNCA deben ser débiles en producción
- `ANCLORA_GROUP_INTERNAL_USERS_JSON` nunca debe estar en el repositorio; siempre en variables de entorno del servidor
- Las variables `NEXT_PUBLIC_*` son visibles en el cliente — no incluir tokens ni secretos
- No hay base de datos expuesta: toda la autenticación es en memoria

---

## 9. Preparación para Evolución

- El sistema de idioma está centralizado en `NEXT_PUBLIC_GROUP_DEFAULT_LOCALE`
- El sistema de tema está centralizado en `NEXT_PUBLIC_GROUP_DEFAULT_THEME`
- `src/lib/group-ui.ts` es el único punto para cambiar copy de UI
- Los activos de marca (`/brand/`) pueden sustituirse sin rehacer el wiring
- Añadir nuevas apps al launcher solo requiere una nueva variable `NEXT_PUBLIC_*_URL`

---

*Generado por Claude Code — Abril 2026*
