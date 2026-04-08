# Anclora Command Center — Guía Técnica Interna

**Clasificación:** Interno | **Versión:** 1.0 | **Fecha:** Abril 2026

---

## 1. Propósito y Rol en el Ecosistema

Anclora Command Center es la **bóveda operativa y documental** del ecosistema Anclora. Es el único repositorio de verdad para:

- Contratos UX/UI canónicos del ecosistema
- Documentación estratégica y operativa
- Gobernanza del sistema de contratos
- Mapas de negocio, stack y operaciones

**Principio fundamental**: Los cambios de contratos UX/UI van PRIMERO a Command Center, luego se propagan al resto de repos.

---

## 2. Naturaleza del Repositorio

A diferencia del resto del ecosistema, Command Center es principalmente un **repositorio Obsidian** (vault de conocimiento), no una aplicación web tradicional. Contiene:

- Vault de notas Obsidian con wikilinks
- Scripts PowerShell para gobernanza automática
- Dashboard web premium (`dashboard/`) como capa de visualización
- Sistema de MOCs (Maps of Content)

---

## 3. Estructura del Vault

```
docs/
  standards/        # CANON: contratos UX/UI del ecosistema
  governance/       # Gobernanza de contratos
    CONTRACT_HIERARCHY.md
    CONTRACT_CONDITION_CATALOG.md
    APPLICATION_FAMILY_MAP.md
    CONTRACT_COMPLIANCE_MATRIX.md
  cambios/          # Cola y historial de cambios contractuales
    CONTRACT_CHANGE_QUEUE.md
    CONTRACT_CHANGE_HISTORY.md
playbooks/          # Playbooks operativos
research/           # Investigación y análisis
resources/          # Recursos y referencias
sistemas/           # Documentación de sistemas
logs/
  contract-governance.log  # Log de gobernanza contractual
scripts/            # Scripts PowerShell de automatización
dashboard/
  docs/standards/   # Copia de contratos específicos del dashboard
```

---

## 4. Sistema de Gobernanza de Contratos

### Flujo de Cambios

```
1. Detectar cambios en docs/standards/
2. Registrar en CONTRACT_CHANGE_QUEUE.md
3. Analizar: ANALYSIS_REQUIRED → PLAN_READY
4. Decisiones: APPROVED / REJECTED / APP_ONLY
5. Si APPROVED: actualizar bóveda primero, luego propagar a repos afectados
6. Actualizar CONTRACT_COMPLIANCE_MATRIX.md
7. Mover cambio a historial (CONTRACT_CHANGE_HISTORY.md)
```

### Flujo Diario Recomendado

```
1. Detectar cambios nuevos en docs/standards/
2. Registrar en cola si no existen
3. Procesar solo cambios aprobados
4. Auditar sincronización contractual entre repos
5. Revisar logs/contract-governance.log
```

---

## 5. Scripts PowerShell

| Script | Función |
|--------|----------|
| `propagate-contracts.ps1` | Propaga contratos aprobados a repos |
| `audit-contract-sync.ps1` | Audita sincronización de contratos |
| `close-contract-change.ps1` | Cierra un cambio contractual |
| `process-contract-change-queue.ps1` | Procesa la cola de cambios |
| `detect-contract-changes.ps1` | Detecta nuevos cambios en `docs/standards/` |
| `run-contract-governance-cycle.ps1` | Ciclo completo de gobernanza |
| `register-daily-contract-governance-task.ps1` | Registra tarea diaria en Task Scheduler |
| `send-contract-governance-reminder.ps1` | Envía recordatorio de gobernanza |

---

## 6. Contratos Canónicos (en `docs/standards/`)

| Contrato | Ámbito |
|----------|--------|
| `ANCLORA_ECOSYSTEM_CONTRACT_GROUPS.md` | Todos los repos |
| `ANCLORA_BRANDING_MASTER_CONTRACT.md` | Todos los repos |
| `ANCLORA_BRANDING_COLOR_TOKENS.md` | Todos los repos |
| `ANCLORA_BRANDING_TYPOGRAPHY.md` | Todos los repos |
| `ANCLORA_BRANDING_ICON_SYSTEM.md` | Todos los repos |
| `ANCLORA_BRANDING_FAVICON_SPEC.md` | Todos los repos |
| `UI_MOTION_CONTRACT.md` | Todos los repos |
| `MODAL_CONTRACT.md` | Todos los repos |
| `LOCALIZATION_CONTRACT.md` | Todos los repos |
| `ANCLORA_ULTRA_PREMIUM_APP_CONTRACT.md` | Private Estates |
| `ANCLORA_PREMIUM_APP_CONTRACT.md` | Synergi, Data Lab |
| `ANCLORA_INTERNAL_APP_CONTRACT.md` | Content Gen AI, Advisor AI, Nexus |

---

## 7. MOCs (Maps of Content) Principales

- `[[Anclora Group]]` — Hub corporativo
- `[[Anclora Command Center]]` — Este vault
- `[[MOC de Negocio]]` — Mapa de negocio
- `[[MOC Real Estate Comercial]]` — Mapa comercial
- `[[MOC Stack Operativo Anclora]]` — Mapa del stack tecnológico
- `[[MOC Toni - Marca Personal y Autoridad]]` — Marca personal
- `[[Mapa del Sistema de Agentes]]` — Arquitectura de agentes AI

---

## 8. Dashboard del Command Center

El directorio `dashboard/` contiene una aplicación web premium (grupo Premium) con sus propios contratos en `dashboard/docs/standards/`. Es una capa de visualización sobre el vault.

---

## 9. Notas Críticas

- **NUNCA** modificar contratos en un repo individual sin pasar por Command Center primero
- El log `logs/contract-governance.log` es el único registro de auditoría de cambios contractuales
- Los wikilinks de Obsidian (`[[...]]`) son internos del vault; no funcionan en GitHub

---

*Generado por Claude Code — Abril 2026*
