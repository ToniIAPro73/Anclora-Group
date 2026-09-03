# Anclora Group — Visión General del Ecosistema Real Estate

**Fecha:** Abril 2026 | **Versión:** 1.1 | **Clasificación:** Interno / Estratégico

---

## 1. Visión del Ecosistema

Anclora Group es la entidad matriz que vertebra un ecosistema digital de aplicaciones premium orientadas al sector inmobiliario de lujo en las Islas Baleares (Mallorca, Ibiza, Menorca). Cada aplicación cumple un rol específico dentro de la cadena de valor: desde la captación y presentación de propiedades de lujo hasta la gestión de partners, analítica de datos, generación de contenido con IA y asesoría especializada.

### Principios rectores

- **Coherencia de marca**: Contratos UX/UI compartidos garantizan consistencia visual en todo el ecosistema.
- **Modularidad**: Cada aplicación es autónoma pero interoperable.
- **Escalabilidad**: Arquitectura preparada para crecer sin rehacer los fundamentos.
- **Calidad premium**: Estándares de diseño y rendimiento al nivel del sector de lujo.

---

## 2. Mapa del Ecosistema Real Estate

```
Anclora Group (Entidad Matriz) — hub corporativo interno
│
│ [CAPA DE ENTRADA]
├── Ultra Premium Real Estate
│   ├── Anclora Private Estates Landing  ← Landing page de captación
│   └── Anclora Private Estates          ← Plataforma principal de propiedades
│
│ [CAPA CORE]
├── Premium Real Estate
│   ├── Anclora Synergi                  ← Portal de admisión de partners
│   ├── Anclora Data Lab                 ← Inteligencia analítica Baleares
│   └── Anclora Command Center           ← Bóveda operativa y documental
│
│ [CAPA DE ACTIVACIÓN]
├── Aplicaciones Internas Real Estate
│   ├── Anclora Content Generator AI     ← Motor editorial con IA
│   ├── Anclora Advisor AI               ← Asesoría fiscal e inmobiliaria
│   └── Anclora Nexus                    ← CRM/workspace operativo interno
│
├── Rama Editorial (Contenido e IA)
│   ├── Anclora Content Generator AI     ← Herramienta de producción editorial con IA
│   ├── Anclora Insights ADN             ← Sello editorial · investigación y conocimiento aplicado
│   └── Anclora Talent                   ← Plataforma editorial (ebooks/EPUB/PDF) — En pausa
│
│ [APLICACIONES INTERNAS ADICIONALES]
├── Utilidades y operación interna
│   ├── Anclora Fiscal                   ← Operación fiscal trazable
│   ├── Anclora GuestHub                 ← Gestión de huéspedes y alquiler vacacional
│   ├── Anclora EnergyScan               ← Análisis energético inmobiliario
│   ├── Anclora FileStudio               ← Conversión y tratamiento de archivos
│   ├── Anclora VisionFlow               ← Mapa visual del ecosistema
│   ├── Anclora Linguo Cam               ← Comunicación translingüe
│   └── Anclora Impulso                  ← Fitness y nutrición
│
└── Portfolio Real Estate
    ├── Anclora Portfolio                ← Blueprint técnico reutilizable
    └── Anclora Azure Bay Landing        ← Landing de alta conversión
```

---

## 3. Inventario de Aplicaciones

La fuente de verdad del catálogo del portal Anclora Group es el registry `src/lib/group-access.ts` (17 apps registradas). Este inventario es una vista de ecosistema: incluye además repositorios fuera del registry del portal (Portfolio, Azure Bay).

### 3.1 Empresa Matriz

| App | Repo | Stack Principal | Propósito |
|-----|------|-----------------|-----------|
| Anclora Group | ToniIAPro73/Anclora-Group | Next.js 16, TypeScript | Portal corporativo y hub de acceso por rol |

### 3.2 Ultra Premium Real Estate

| App | Repo | Stack Principal | Propósito |
|-----|------|-----------------|-----------|
| Anclora Private Estates Landing | ToniIAPro73/anclora-private-estates-landing | React 19, Vite 7, TypeScript, Tailwind | Landing page de captación Ultra Premium (compradores, inversores y propietarios) |
| Anclora Private Estates | ToniIAPro73/Anclora-Private-Estates | React 19, Vite, GSAP, i18next | Plataforma principal de propiedades de lujo |

### 3.3 Premium Real Estate

| App | Repo | Stack Principal | Propósito |
|-----|------|-----------------|-----------|
| Anclora Synergi | ToniIAPro73/anclora-synergi | Next.js 16, Neon, Resend | Portal de admisión y gestión de partners |
| Anclora Data Lab | ToniIAPro73/anclora-data-lab | Next.js 16, Neon, Tailwind | Inteligencia analítica Baleares |
| Anclora Command Center | ToniIAPro73/anclora-command-center | Obsidian + React/Vite dashboard | Bóveda documental y contractual del ecosistema |

### 3.4 Aplicaciones Internas Real Estate

| App | Repo | Stack Principal | Propósito |
|-----|------|-----------------|-----------|
| Anclora Content Generator AI | ToniIAPro73/anclora-content-generator-ai | Next.js 15, Better Auth, Neon/pgvector, Anthropic | Motor editorial AI para Real Estate de lujo |
| Anclora Advisor AI | ToniIAPro73/Anclora-Advisor-AI | Next.js 15, Supabase/pgvector, Anthropic+multi-LLM | Asesoría fiscal, laboral e inmobiliaria |
| Anclora Nexus | ToniIAPro73/Anclora-Nexus | Next.js frontend + FastAPI/LangGraph backend, Supabase | CRM de prospección y workspace operativo |

### 3.4bis Rama Editorial (Contenido e IA)

Unidad estratégica de producción y publicación de contenido digital con apoyo de IA — no es una categoría genérica de "herramientas de IA". Registrada en el portal bajo `businessArea: 'content-ai'` (`src/lib/group-access.ts`).

| App | Repo | Rol en la rama | Estado |
|-----|------|-----------------|--------|
| Anclora Content Generator AI | ToniIAPro73/anclora-content-generator-ai | Herramienta de producción: crear, transformar y adaptar contenidos con IA | Activo |
| Anclora Insights ADN | ToniIAPro73/anclora-insights-adn | Sello editorial: investigación, análisis y conocimiento aplicado — referencia de voz y criterio editorial | Activo |
| Anclora Talent | ToniIAPro73/anclora-talent | Plataforma editorial: creación, edición, maquetación y publicación de proyectos digitales (ebooks, PDF/DOCX/EPUB) | **En pausa** |

`Anclora FileStudio` permanece clasificado en `utilities` (procesamiento documental transversal), no en esta rama — clasificación canónica preservada, no movida automáticamente.

### 3.5 Otras Aplicaciones Internas del Portal

Registradas en el portal Anclora Group (`src/lib/group-access.ts`):

| App | Repo | Stack Principal | Propósito |
|-----|------|-----------------|-----------|
| Anclora Impulso | — | — | Fitness y nutrición con generación de rutinas por IA |
| Anclora Fiscal | — | — | Sistema operativo fiscal trazable (ventas digitales, cierres mensuales) |
| Anclora GuestHub | — | — | Gestión de huéspedes, check-in y operación de alquiler vacacional |
| Anclora EnergyScan | — | — | Análisis energético de activos inmobiliarios |
| Anclora FileStudio | — | — | Conversión y tratamiento privado de archivos |
| Anclora VisionFlow | — | — | Workspace visual para mapear apps, evidencias y handoffs del ecosistema |
| Anclora Linguo Cam | — | — | Comunicación en tiempo real con subtítulos, ASR y traducción asistida |

### 3.6 Portfolio Real Estate

Repos del ecosistema fuera del registry del portal Anclora Group:

| App | Repo | Stack Principal | Propósito |
|-----|------|-----------------|-----------|
| Anclora Portfolio | ToniIAPro73/Anclora-Portfolio | Next.js 16, Prisma, shadcn/ui | Blueprint técnico reutilizable para demos |
| Anclora Azure Bay Landing | ToniIAPro73/anclora-azure-bay-landing-page | Next.js 16, HubSpot, S3, ALTCHA | Landing de alta conversión para Azure Bay |

---

## 4. Arquitectura de Branding

| Grupo | Apps | Color Accent | Tipografía Base |
|-------|------|-------------|------------------|
| **Ultra Premium** | Private Estates | Oro `#D4AF37`, Teal `#07252F` | Cardo, Fraunces, Inter |
| **Premium** | Synergi | Púrpura `#8C5AB4` | DM Sans |
| **Premium** | Data Lab | Teal/Verde `#2DA078` | — |
| **Premium** | Command Center (dashboard) | Dark premium | Inter |
| **Interna** | Content Generator AI | Coral `#E06848` | Inter, JetBrains Mono |
| **Interna** | Advisor AI | Mint `#1dab89`, Navy `#162944` | Cormorant Garamond, Source Sans 3 |
| **Interna** | Nexus | Oro `#D4AF37`, Navy `#0F1629` | Inter, Playfair Display |
| **Portfolio** | Portfolio, Azure Bay | Neutro premium | Inter, sistema shadcn/ui |
| **Corporativa** | Anclora Group | Dark, Georgia | Georgia |

---

## 5. Jerarquía de Contratos UX/UI

La bóveda canónica vive en `Anclora Command Center` (`docs/standards/`) y se propaga a todos los repos.

| Contrato | Aplica a |
|----------|----------|
| `ANCLORA_ECOSYSTEM_CONTRACT_GROUPS.md` | Todos |
| `ANCLORA_BRANDING_MASTER_CONTRACT.md` | Todos |
| `ANCLORA_BRANDING_COLOR_TOKENS.md` | Todos |
| `ANCLORA_BRANDING_TYPOGRAPHY.md` | Todos |
| `ANCLORA_BRANDING_ICON_SYSTEM.md` | Todos |
| `ANCLORA_BRANDING_FAVICON_SPEC.md` | Todos |
| `UI_MOTION_CONTRACT.md` | Todos |
| `MODAL_CONTRACT.md` | Todos |
| `LOCALIZATION_CONTRACT.md` | Todos |
| `ANCLORA_ULTRA_PREMIUM_APP_CONTRACT.md` | Private Estates |
| `ANCLORA_PREMIUM_APP_CONTRACT.md` | Synergi, Data Lab, Command Center dashboard |
| `ANCLORA_INTERNAL_APP_CONTRACT.md` | Content Gen AI, Advisor AI, Nexus, Insights ADN, Talent |

---

## 6. Flujo de Valor y Relaciones entre Apps

```
Cliente/Inversor/Propietario
    │
    ├─► Private Estates Landing ──► Nexus API (lead capture / valoración)
    │    (SPA React 19/Vite)         │
    │         │                     └──► Synergi (sección partners)
    │         │                     └──► Data Lab (señales de mercado)
    │         └──► Private Estates (app principal — CTA final)
    │               (SPA Vite/React, GSAP, i18next)
    │
    ├─► Azure Bay Landing ──► HubSpot CRM ──► SMTP + S3 (PDF personalizado)
    │
    └─► Anclora Group (portal corporativo, 7 roles, 3 capas)
            │
            ├──► Nexus (CRM: prospección vendedores Mallorca, StateFox, LangGraph)
            ├──► Command Center (gobernanza documental)
            ├──► Content Generator AI (producción editorial)
            ├──► Advisor AI (asesoría fiscal/inmobiliaria)
            ├──► Synergi (backoffice de partners)
            └──► Data Lab (inteligencia de mercado)
```

---

## 7. Arquitectura de Acceso de Anclora Group

Anclora Group organiza las apps en 3 capas (entry / core / activation) y 7 roles. El acceso por rol se deriva del registry `src/lib/group-access.ts`:

| Rol | Apps con acceso |
|-----|------------------|
| `group-admin` | Todas las apps (17) |
| `private-estates-ops` | `private-estates`, `private-estates-landing`, `synergi`, `data-lab`, `nexus`, `command-center`, `content-generator-ai`, `guesthub`, `energyscan`, `filestudio`, `visionflow` (11) |
| `partner-ops` | `private-estates`, `private-estates-landing`, `synergi`, `data-lab`, `command-center` (5) |
| `data-ops` | `private-estates`, `private-estates-landing`, `data-lab`, `command-center`, `energyscan`, `visionflow` (6) |
| `content-ops` | `private-estates`, `private-estates-landing`, `command-center`, `content-generator-ai`, `insights-adn`, `talent`, `filestudio`, `visionflow` (8) |
| `advisory` | `command-center`, `advisor-ai`, `fiscal`, `guesthub`, `filestudio` (5) |
| `growth-ops` | `command-center`, `impulso` (2) |

---

## 8. Estándares de Calidad del Ecosistema

| Área | Estándar |
|------|----------|
| Performance | Lighthouse KPI gates — Core Web Vitals |
| Accesibilidad | WCAG 2.1 AA mínimo en apps públicas |
| Testing | Vitest (unit) + Playwright (E2E) |
| CI/CD | GitHub Actions + Vercel deployments |
| Idiomas base | Español / Inglés |
| Idiomas extendidos | Private Estates: de, fr — Data Lab: de — Nexus: de, ru |
| Commits | Convención `feat/fix/docs: [ANCLORA-XXX] Descripción` |

Nota: la UI del portal Anclora Group es actualmente solo en español (los locales `en/de/fr` en `src/lib/group-ui.ts` son placeholders; i18n real en fase futura).

---

## 9. URLs de Producción

| App | URL |
|-----|-----|
| Anclora Group | (configurable vía env) |
| Private Estates | https://anclora-private-estates.vercel.app |
| Synergi | https://anclora-synergi.vercel.app |
| Data Lab | https://anclora-data-lab.vercel.app |
| Nexus | https://anclora-nexus-frontend.vercel.app |
| Command Center | https://command-center.dev.anclora.com/ |
| Content Generator AI | https://anclora-content-generator-ai.vercel.app |
| Advisor AI | https://ancloraadvisorai-ten.vercel.app |
| Azure Bay Landing | https://playaviva-uniestate.vercel.app |

---

*Generado por Claude Code — Abril 2026 (v1.1)*
