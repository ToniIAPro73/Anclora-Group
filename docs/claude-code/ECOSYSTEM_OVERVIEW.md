# Anclora Group — Visión General del Ecosistema Real Estate

**Fecha:** Abril 2026 | **Versión:** 1.0 | **Clasificación:** Interno / Estratégico

---

## 1. Visión del Ecosistema

Anclora Group es la entidad matriz que vertebra un ecosistema digital de aplicaciones premium orientadas al sector inmobiliario de lujo. Cada aplicación cumple un rol específico dentro de la cadena de valor: desde la captación y presentación de propiedades de lujo hasta la gestión de partners, analítica de datos, generación de contenido con IA y asesoría especializada.

### Principios rectores

- **Coherencia de marca**: Contratos UX/UI compartidos garantizan consistencia visual en todo el ecosistema.
- **Modularidad**: Cada aplicación es autónoma pero interoperable.
- **Escalabilidad**: Arquitectura preparada para crecer sin rehacer los fundamentos.
- **Calidad premium**: Estándares de diseño y rendimiento aplicados al nivel del sector de lujo.

---

## 2. Mapa del Ecosistema Real Estate

```
Anclora Group (Entidad Matriz)
│
├── Ultra Premium Real Estate
│   ├── Anclora Private Estates Landing  ← Landing page de captación
│   └── Anclora Private Estates          ← Plataforma principal de propiedades
│
├── Premium Real Estate (Apps de soporte)
│   ├── Anclora Synergi                  ← Portal de admisión de partners
│   ├── Anclora Data Lab                 ← Inteligencia analítica
│   ├── Anclora Content Generator AI     ← Motor editorial con IA
│   ├── Anclora Advisor AI               ← Asesoría fiscal e inmobiliaria
│   ├── Anclora Command Center           ← Bóveda operativa y documental
│   └── Anclora Nexus                    ← Workspace operativo interno
│
└── Portfolio Real Estate
    ├── Anclora Portfolio                ← Blueprint técnico reutilizable
    └── Anclora Azure Bay Landing        ← Landing de alta conversión
```

---

## 3. Inventario de Aplicaciones

### 3.1 Empresa Matriz

| App | Repo | Stack Principal | Propósito |
|-----|------|-----------------|-----------|
| Anclora Group | ToniIAPro73/Anclora-Group | Next.js 16, TypeScript | Portal corporativo y hub de acceso por rol |

### 3.2 Ultra Premium Real Estate

| App | Repo | Stack Principal | Propósito |
|-----|------|-----------------|-----------|
| Anclora Private Estates Landing | ToniIAPro73/anclora-private-estates-landing | — | Landing page de marketing Ultra Premium |
| Anclora Private Estates | ToniIAPro73/Anclora-Private-Estates | React 19, Vite, GSAP | Frontend principal para propiedades de lujo |

### 3.3 Premium Real Estate

| App | Repo | Stack Principal | Propósito |
|-----|------|-----------------|-----------|
| Anclora Synergi | ToniIAPro73/anclora-synergi | Next.js, Neon DB, Resend | Portal de admisión y gestión de partners |
| Anclora Data Lab | ToniIAPro73/anclora-data-lab | Next.js, Neon DB | Inteligencia analítica y activos de datos |
| Anclora Content Generator AI | ToniIAPro73/anclora-content-generator-ai | Next.js 15, Anthropic, pgvector | Motor editorial AI para Real Estate de lujo |
| Anclora Advisor AI | ToniIAPro73/Anclora-Advisor-AI | Next.js 15, Supabase, Anthropic | Asesoría fiscal, laboral e inmobiliaria |
| Anclora Command Center | ToniIAPro73/anclora-command-center | Obsidian, PowerShell | Bóveda documental y contractual del ecosistema |
| Anclora Nexus | ToniIAPro73/Anclora-Nexus | Next.js, multilingual | Workspace operativo interno |

### 3.4 Portfolio Real Estate

| App | Repo | Stack Principal | Propósito |
|-----|------|-----------------|-----------|
| Anclora Portfolio | ToniIAPro73/Anclora-Portfolio | Next.js 16, Prisma, shadcn/ui | Blueprint técnico reutilizable para demos |
| Anclora Azure Bay Landing | ToniIAPro73/anclora-azure-bay-landing-page | Next.js 16, HubSpot, S3, ALTCHA | Landing de alta conversión para Azure Bay |

---

## 4. Arquitectura de Branding

| Grupo | Apps | Color Accent | Tipografía Base |
|-------|------|-------------|------------------|
| **Ultra Premium** | Private Estates | Oro `#D4AF37`, Fondo Teal `#07252F` | Cardo, Fraunces, Inter |
| **Premium** | Synergi | Púrpura `#8C5AB4` | DM Sans |
| **Premium** | Data Lab | — | — |
| **Premium / Interna** | Content Generator AI | Coral `#E06848` | Inter, JetBrains Mono |
| **Interna** | Advisor AI | Mint `#1dab89`, Navy `#162944` | Cormorant Garamond, Source Sans 3 |
| **Interna** | Nexus | Oro `#D4AF37` | Inter |
| **Portfolio** | Portfolio, Azure Bay | Neutro premium | Inter, sistema shadcn/ui |
| **Corporativa** | Anclora Group | Dark, `Georgia` | Georgia |

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
| `ANCLORA_PREMIUM_APP_CONTRACT.md` | Synergi, Data Lab |
| `ANCLORA_INTERNAL_APP_CONTRACT.md` | Content Gen AI, Advisor AI, Nexus |

---

## 6. Flujo de Valor y Relaciones entre Apps

```
Cliente/Inversor
    │
    ├─► Azure Bay Landing ──► HubSpot CRM ──► SMTP Email + S3 (Dossier PDF personalizado)
    │
    ├─► Private Estates Landing ──► Private Estates (exploración de propiedades)
    │                                   │
    │                                   ├──► Synergi (registro de partners/agentes)
    │                                   └──► Data Lab (acceso a analítica para perfiles aprobados)
    │
    └─► Anclora Group (portal corporativo, launcher por rol)
            │
            ├──► Command Center (gobernanza y documentación interna)
            ├──► Content Generator AI (producción de contenido editorial)
            ├──► Advisor AI (consultas de asesoría)
            └──► Nexus (workspace operativo del equipo interno)
```

---

## 7. Estándares de Calidad del Ecosistema

| Área | Estándar |
|------|----------|
| Performance | Lighthouse KPI gates — Core Web Vitals |
| Accesibilidad | WCAG 2.1 AA mínimo en apps públicas |
| Testing | Vitest como framework estándar |
| CI/CD | GitHub Actions + Vercel deployments |
| Idiomas base | Español / Inglés |
| Idiomas extendidos | Private Estates: de, fr — Nexus: de, ru |
| Commits | Convención `feat/fix/docs: [ANCLORA-XXX] Descripción` |

---

## 8. URLs de Producción

| App | URL |
|-----|-----|
| Anclora Group | (configurable, ver env `NEXT_PUBLIC_*`) |
| Synergi | https://anclora-synergi.vercel.app |
| Data Lab | https://anclora-data-lab.vercel.app |
| Private Estates | https://anclora-private-estates.vercel.app |
| Nexus | https://anclora-nexus-frontend.vercel.app |
| Command Center | https://anclora-command-center.vercel.app |
| Azure Bay Landing | https://playaviva-uniestate.vercel.app |

---

## 9. Documentación por Artefacto

Este directorio `docs/claude-code/` contiene la documentación completa para cada artefacto:

- `internal/` — Guías técnicas internas para el equipo de desarrollo
- `user/` — Guías orientadas a usuarios finales y clientes

---

*Generado por Claude Code — Abril 2026*
