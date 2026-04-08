# Anclora Command Center (Bóveda Anclora) — Guía Técnica Interna

**Clasificación:** Interno | **Segmento:** Premium | **Versión:** 1.1 | **Fecha:** Abril 2026

---

## 1. Propósito y Rol en el Ecosistema

Anclora Command Center ("Bóveda Anclora") es la **bóveda operativa y documental** del ecosistema. Es un sistema dual:

1. **Vault Obsidian**: "segundo cerebro" y hub master de documentación para todo el ecosistema Anclora — knowledge base estratégico/operativo, contratos de gobernanza, research, playbooks, tracking de proyectos.
2. **Dashboard React/Vite** (`dashboard/`): capa de visualización interactiva ejecutiva que consume el vault Obsidian como fuente de datos.

**Principio fundamental**: Los cambios de contratos UX/UI van PRIMERO a Command Center, luego se propagan al resto de repos.

---

## 2. Stack Tecnológico

### Vault Obsidian (capa de conocimiento)
- Markdown puro con wikilinks Obsidian, frontmatter, callouts
- Skills para agentes AI en `.codex/skills/` y `.claude/skills/`
- Scripts PowerShell para gobernanza automática de contratos

### Dashboard App (`dashboard/`)

| Capa | Tecnología | Versión |
|------|-----------|--------|
| Framework | **React** (no Next.js) | 19 |
| Bundler | **Vite** | 8.x |
| Lenguaje | TypeScript | — |
| Parsing markdown | gray-matter | — |
| Export Excel | ExcelJS | — |
| File watching | chokidar | — |
| Deploy | Vercel (`boveda-anclora.vercel.app`) | — |

**Nota importante**: el dashboard usa **React + Vite**, NO Next.js.

---

## 3. Estructura del Vault Obsidian

```
daily-notes/        # Log diario: ops, foco, decisiones
proyectos/          # Notas de proyectos con estado y próximos pasos
research/           # Inteligencia de mercado, comparativas, hipótesis
playbooks/          # Procedimientos y checklists repetibles
sistemas/           # Decisiones de arquitectura y reglas de sistema
personas/           # Memoria relacional de contactos clave
ideas/              # Pre-proyecto / ideación
inbox/              # Cola de captura rápida
templates/          # Plantillas de notas reutilizables
resources/          # Guías canónicas y documentación maestra
docs/
  standards/        # CANON: contratos UX/UI del ecosistema
  governance/       # Jerarquía, compliance matrix, catálogo de condiciones
  cambios/          # Cola y historial de cambios contractuales
logs/
  contract-governance.log  # Audit trail de gobernanza
scripts/            # PowerShell de automatización
```

---

## 4. Dashboard App (React/Vite)

### Módulos principales

- **ExecutiveView** (`src/modules/executive/ExecutiveView.tsx`) — visión de alto nivel del ecosistema
- **RealEstateView** (`src/modules/real-estate/RealEstateView.tsx`) — pipeline de propiedades, métricas de prospección
- **DashboardShell** (`src/DashboardShell.tsx`) — shell y navegación principal

### Build pipeline del dashboard

```bash
npm run sync:vault     # Sincroniza vault markdown en public/ o generated/
npm run sync:notes     # Sincroniza notas específicas
npm run tsc            # Verifica TypeScript
npm run build          # Vite build
```

### Scripts de sincronización

```
scripts/sync-vault-data.mjs
scripts/sync-real-estate-dataset.mjs
scripts/watch-notes-and-sync.mjs
scripts/generate-workbook-from-excel.mjs
```

---

## 5. Sistema de Gobernanza de Contratos

### Flujo de Cambios

```
1. Detectar cambios en docs/standards/
2. Registrar en CONTRACT_CHANGE_QUEUE.md
3. ANALYSIS_REQUIRED → PLAN_READY
4. Decisiones: APPROVED / REJECTED / APP_ONLY
5. Si APPROVED: actualizar bóveda PRIMERO, luego propagar a repos
6. Actualizar CONTRACT_COMPLIANCE_MATRIX.md
7. Mover a historial (CONTRACT_CHANGE_HISTORY.md)
```

### Scripts PowerShell

| Script | Función |
|--------|----------|
| `propagate-contracts.ps1` | Propaga contratos aprobados |
| `audit-contract-sync.ps1` | Audita sincronización entre repos |
| `run-contract-governance-cycle.ps1` | Ciclo completo de gobernanza |
| `detect-contract-changes.ps1` | Detecta cambios en `docs/standards/` |
| `close-contract-change.ps1` | Cierra un cambio |
| `process-contract-change-queue.ps1` | Procesa la cola |

---

## 6. Integraciones del Ecosistema (desde el vault)

| Herramienta | Uso |
|-------------|-----|
| StateFox | Señales territoriales y datos de propiedades |
| Inmovilla | CRM / datos de mercado |
| Coda | Gestión de pipeline |
| Slack | Coordinación de equipo |
| Vercel | Deploy del dashboard |
| NotebookLM | "Inteligencia Territorial Suroeste Mallorca 2026" |
| GitHub | Tracking de todos los repos del ecosistema |
| Obsidian | Editor del vault |

---

## 7. MOCs Principales (Maps of Content)

- `[[Anclora Group]]` — Hub corporativo
- `[[MOC de Negocio]]` — Mapa de negocio
- `[[MOC Real Estate Comercial]]` — Mapa comercial
- `[[MOC Stack Operativo Anclora]]` — Stack tecnológico
- `[[Mapa del Sistema de Agentes]]` — Arquitectura de agentes AI
- `[[MOC Toni - Marca Personal y Autoridad]]` — Marca personal

---

## 8. Notas Críticas

- **NUNCA** modificar contratos en un repo individual sin pasar por Command Center primero
- El log `logs/contract-governance.log` es el único registro de auditoría de cambios contractuales
- Los wikilinks Obsidian (`[[...]]`) son internos del vault; no funcionan en GitHub
- El dashboard (`boveda-anclora.vercel.app`) y el vault son la misma codebase, con el dashboard en `dashboard/`

---

*Generado por Claude Code — Abril 2026 (v1.1)*
