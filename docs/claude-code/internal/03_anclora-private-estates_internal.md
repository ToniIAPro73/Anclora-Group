# Anclora Private Estates — Guía Técnica Interna

**Clasificación:** Interno | **Versión:** 1.1 | **Fecha:** Abril 2026

---

## 1. Propósito y Rol en el Ecosistema

Anclora Private Estates es la **plataforma pública Ultra Premium** del ecosistema Anclora. Es el sitio de marketing de lujo orientado a compradores e inversores de alto patrimonio para propiedades exclusivas en las Islas Baleares (Mallorca, Ibiza, Menorca). Integra lead capture conectado al backend de Nexus.

**Posición en el ecosistema:**
- Punto de destino desde Private Estates Landing
- Origen de tráfico hacia Synergi (partners/agentes), Data Lab (analítica) y Nexus (agent portal)
- Envía leads capturados directamente a la API de Nexus

---

## 2. Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|--------|
| Framework | Vite (SPA pura) | 7.x |
| Lenguaje | TypeScript | 5.9 |
| UI Library | React | 19.x |
| Routing | React Router DOM | v7 |
| Estilos | Tailwind CSS v3 + custom CSS vars | — |
| Componentes | shadcn/ui (New York style, Radix UI) | — |
| Animaciones | GSAP 3.14 + ScrollTrigger, @gsap/react | — |
| Internacionalización | i18next 25 + react-i18next | es, en, de, fr |
| Formularios | react-hook-form + Zod v4 | — |
| Charts | Recharts | — |
| CAPTCHA | reCAPTCHA v2 o ALTCHA (pluggable vía env) | — |
| Notificaciones | Sonner | — |
| Carousel | embla-carousel-react | — |
| Tema | next-themes | — |
| Testing | Node.js built-in test runner | — |
| Deploy | Vercel | — |

**Diferencia clave**: Vite SPA (no Next.js) — renderizado 100% en cliente, sin SSR, sin rutas API propias.

---

## 3. Arquitectura

### SPA con Lazy Loading

- `App.tsx` es la raíz: routing, GSAP scroll orchestration, i18n setup
- Todas las secciones excepto `HeroSection` y `Navbar` son `React.lazy()`
- Secciones diferidas montan al primer evento de usuario (scroll, touch, keydown) o evento custom `anclora:reveal-deferred-sections`

### Arquitectura GSAP/ScrollTrigger

- Cada sección gestiona su propio contexto GSAP
- Un controlador global de snap en `App.tsx` coordina las secciones pinadas
- La posición de scroll se preserva entre cambios de idioma usando `sessionStorage` con anchors de sección

### Integración con Nexus

- El formulario de contacto envía leads a `VITE_ANCLORA_NEXUS_PUBLIC_LEAD_URL`
- Endpoint por defecto: `nexus.anclora.group/api/public/cta/lead`
- El idioma se pasa como `?lang=` query param al enlazar a portales internos

---

## 4. Secciones de la Landing

| Sección | Descripción |
|---------|-------------|
| **HeroSection** | Hero full-bleed con parallax, animación de entrada, widget de búsqueda de propiedades |
| **PropertiesSection** | 3 propiedades destacadas (villas en Cala Fornells, Santa Ponsa, Palma; €1.95M–€3.2M); dual currency EUR/GBP |
| **PhilosophySection** | 3 pilares: Trophy Selection, Data Lab Intelligence, Legal & Wealth structuring |
| **InvestmentSection** | Tesis de inversión en Baleares con métricas de mercado |
| **NeighborhoodSection** | Spotlight en Palma Casco Antiguo |
| **ValuationSection** | Formulario de valoración de propiedades (3 servicios: Instant Valuation, Rental Forecast, Tax & Costs) |
| **InsightsSection** | Artículos de mercado + newsletter "El Briefing" |
| **AboutSection** | Presentación de la agencia |
| **ContactSection** | Formulario con CAPTCHA + envío a Nexus API |

---

## 5. Variables de Entorno

```env
# Nexus lead capture
VITE_ANCLORA_NEXUS_PUBLIC_LEAD_URL=https://nexus.anclora.group/api/public/cta/lead
VITE_ANCLORA_NEXUS_LOGIN_URL=

# Private Area links
VITE_ANCLORA_PARTNER_PORTAL_URL=
VITE_ANCLORA_DATA_LAB_URL=

# CAPTCHA
VITE_RECAPTCHA_SITE_KEY=              # Si usa reCAPTCHA
VITE_ALTCHA_CHALLENGE_URL=            # Si usa ALTCHA
```

---

## 6. Branding Canónico

| Token | Valor |
|-------|-------|
| Familia | Ultra Premium |
| Accent | Oro `#D4AF37` |
| Fondo base | `#07252F`, `#0B313F` |
| Tipografía display | Cardo (serif) |
| Tipografía UI | Inter |
| Tipografía acentos | Fraunces |
| Módulo de branding | `src/lib/private-estates-brand.ts` |
| Tema default | Dark |

---

## 7. Menú — Área Privada

El menú overlay incluye un grupo "Private Area" con enlaces a:
- **Nexus Agent Portal** ← `VITE_ANCLORA_NEXUS_LOGIN_URL`
- **Partner Portal** (Synergi) ← `VITE_ANCLORA_PARTNER_PORTAL_URL`
- **Data Lab Portal** ← `VITE_ANCLORA_DATA_LAB_URL`

---

## 8. Gobernanza de Features (SDD)

```
sdd/core/constitution-canonical.md   # Constitución SDD
sdd/features/<feature-id>/          # Spec por feature
.agent/rules/                        # Reglas de agentes
.agent/skills/features/              # Skills por feature
.antigravity/prompts/features/       # Prompts de orquestación
```

Feature activa completada: `ANCLORA-MENU-002` (menú overlay clarity redesign).

---

## 9. Comandos de Desarrollo

```bash
npm install
npm run dev
npm run build
npm run lint
npm run test
npm run preview
```

---

## 10. Páginas Legales

- `/legal/privacidad`
- `/legal/cookies`
- `/legal/terminos`
- `/legal/disclaimer`
- `/legal/codigo-etico`

---

## 11. Seguridad

- SPA pura: NO hay SSR. Todo procesamiento sensible va a APIs externas (Nexus).
- La API key de reCAPTCHA es pública (`VITE_`); la verificación server-side ocurre en Nexus.
- El campo `lang` como query param es para UX, no para seguridad.

---

*Generado por Claude Code — Abril 2026 (v1.1)*
