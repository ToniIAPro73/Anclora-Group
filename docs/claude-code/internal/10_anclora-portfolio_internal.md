# Anclora Portfolio — Guía Técnica Interna

**Clasificación:** Interno | **Versión:** 1.0 | **Fecha:** Abril 2026

---

## 1. Propósito y Rol en el Ecosistema

Anclora Portfolio es el **blueprint técnico reutilizable** del ecosistema Anclora. Su objetivo es doble:

1. **Showcase técnico**: demostrar arquitectura modular, calidad de código y capacidades de la plataforma a clientes potenciales
2. **Engine reutilizable**: servir como plantilla base para nuevos proyectos Real Estate del grupo

No es una landing de conversión (ese es Azure Bay). Es una prueba de ingeniería y pensamiento de producto.

---

## 2. Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|--------|
| Framework | Next.js (App Router) | 16.x |
| Lenguaje | TypeScript | 5.x |
| Estilos | Tailwind CSS 4, shadcn/ui, Radix UI | — |
| Animaciones | Framer Motion | — |
| Validación | Zod 4 | — |
| ORM / BD | Prisma 7 + SQLite (dev) | — |
| Auth | NextAuth v4 | — |
| Estado | Zustand, TanStack Query | — |
| Testing | Vitest, Testing Library | — |
| Package manager | Bun (primario) / npm | — |
| Deploy | Next.js standalone + Caddy / Vercel | — |

---

## 3. Arquitectura

### Patrón Homepage Controller

`src/app/page.tsx` es el componente de composición raíz — declarativo, delega estado a `useHomepageController`. El controller orquesta todos los hooks de la página:

```
useHomepageController
  ├─ use-language.ts
  ├─ use-gallery.ts
  ├─ use-residence-selection.ts
  ├─ use-section-navigation.ts
  ├─ use-faq-items.ts
  ├─ use-contact-form.ts
  ├─ use-conversion-tracking.ts
  ├─ use-mobile.ts
  └─ use-scroll-navigation.ts
```

### Secciones de la App

```
src/components/sections/
  hero-section.tsx
  gallery-section.tsx
  residences-section.tsx
  investment-section.tsx
  contact-section.tsx
  storytelling-section.tsx
  blueprint-section.tsx
  features-section.tsx
  faqs-section.tsx
  location-section.tsx
  footer-section.tsx
  floating-sidebar.tsx
  top-nav.tsx
```

### API Routes

| Ruta | Método | Descripción |
|------|--------|-------------|
| `/api/contact` | POST | Formulario de contacto (Zod, rate limit 8/60s, persiste a `db/inquiries.json`) |
| `/api/contact` | GET | Retorna total de consultas recibidas |
| `/api` | GET | Health/metadata endpoint |
| `/api/analytics` | GET | Métricas de analytics |

---

## 4. Variables de Entorno

```env
DATABASE_URL=file:./dev.db      # SQLite local (Prisma)
NEXTAUTH_URL=
NEXTAUTH_SECRET=
NEXT_PUBLIC_EUR_TO_GBP=          # Tasa de cambio EUR/GBP

# Opcionales (pendientes de configurar)
NEXT_PUBLIC_GA_ID=               # Google Analytics
NEXT_PUBLIC_HOTJAR_ID=           # Hotjar
# SENTRY_DSN=                    # Sentry error tracking
```

---

## 5. Estructura de Directorios

```
src/
  app/
    page.tsx              # Composición raíz
    api/                  # API routes
    legal/                # Página legal
    privacy/              # Página de privacidad
    cookies/              # Página de cookies
  components/sections/    # Una sección = un archivo
  data/
    translations.ts       # ES/EN bilingua
    gallery.ts
    residences.ts
    residence-units.ts
    lib/                  # inquiry store, rate-limiter, schemas
db/
  inquiries.json          # Almacén de contactos (file-backed)
docs/
  standards/              # 5 contratos UX/UI compartidos con Azure Bay
  ARCHITECTURE.md         # Mapa de capas detallado
  API.md                  # Referencia REST completa
  TECHNICAL_DOCUMENTATION.md  # Guía técnica completa
sdd/                      # Specs de features
scripts/
  lighthouse-kpi-gate.mjs # Gate de Core Web Vitals para CI
```

---

## 6. Comandos de Desarrollo

```bash
bun install         # Instalar (Bun es el package manager principal)
bun dev             # Servidor de desarrollo
bun build           # Build de producción
bun test            # Vitest
bun lint            # ESLint

# Con npm también funciona
npm install && npm run dev
```

---

## 7. Internacionalización

Sistema bilingue ES/EN implementado en `src/data/translations.ts`. El idioma se gestiona vía hook `use-language.ts` y afecta todo el copy de la página.

---

## 8. Despliegue

Dos modos de despliegue:

1. **Vercel**: el más simple, configuración estándar Next.js
2. **Standalone + Caddy**: `Caddyfile` incluido para despliegue en servidor propio (Next.js `output: 'standalone'`)

Gate de Lighthouse en CI: `scripts/lighthouse-kpi-gate.mjs` verifica Core Web Vitals antes de merge.

---

## 9. Contratos UX/UI

Comparte los mismos 5 contratos con Azure Bay Landing (`docs/standards/`). Leer antes de tocar UI.

---

## 10. SDD y Calidad

```
sdd/
  core/                    # Spec principal
  features/
    performance-accessibility/
    lead-capture-reliability/
    content-ops-portfolio-storytelling/
```

Validaciones mínimas antes de merge: `lint`, `build`, tests de Vitest, Lighthouse gate.

---

*Generado por Claude Code — Abril 2026*
