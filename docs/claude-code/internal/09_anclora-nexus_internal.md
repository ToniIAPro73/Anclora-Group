# Anclora Nexus — Guía Técnica Interna

**Clasificación:** Interno | **Segmento:** Aplicaciones Internas | **Versión:** 1.1 | **Fecha:** Abril 2026

---

## 1. Propósito y Rol en el Ecosistema

Anclora Nexus es el **CRM de prospección y workspace operativo interno** del ecosistema Anclora. Es el motor de inteligencia competitiva del negocio real estate: detecta vendedores motivados antes de que listen en portales, gestiona el pipeline de compradores y partners, y agrega inteligencia territorial de las Islas Baleares.

**Funciones principales:**
- Prospección de vendedores motivados (vía StateFox + scrapers)
- Matching de compradores con propiedades (scoring multidimensional)
- Gestión del ciclo de vida de partners (Synergi integrado)
- Inteligencia territorial (NotebookLM + Cloudflare Workers AI)
- Acceso de Data Lab (multi-tenant, packs de inteligencia)

---

## 2. Stack Tecnológico

### Frontend

| Capa | Tecnología | Versión |
|------|-----------|--------|
| Framework | Next.js (App Router) | 16.1.6 |
| UI | React | 19.2.3 |
| Lenguaje | TypeScript | — |
| Estilos | Tailwind CSS 4 | — |
| Componentes | Radix UI + shadcn/ui | — |
| Estado | Zustand | 5.0.11 |
| Auth | Supabase Auth Helpers | 0.15.0 |
| Animaciones | Framer Motion | — |
| Deploy | Vercel (`anclora-nexus-frontend.vercel.app`) | — |

### Backend (Python)

| Capa | Tecnología | Versión |
|------|-----------|--------|
| Framework | **FastAPI** + Uvicorn | — |
| Agentes AI | **LangGraph** 0.3+ | — |
| Lenguaje | Python | 3.11+ |
| Validación | Pydantic v2 | — |
| Base de datos | Supabase PostgreSQL (Cloud) con RLS por `org_id` | — |
| LLM principal | **Groq** (llama-3.3-70b, llama-3.1-8b) | — |
| Embeddings | Cloudflare Workers AI (bge-small-en-v1.5) | — |
| Scraping portal | Apify (Idealista, Fotocasa) | — |
| Scraping on-demand | Firecrawl | — |

**Nota**: Nexus es una arquitectura de monorepo. El frontend Next.js vive en `frontend/`, el backend Python en `backend/`. Son runtime independientes pero comparten el mismo repo.

**Proyecto Supabase ref**: `jtlnmypcrgmzxeuiffup` (NO mezclar con Advisor AI).

---

## 3. Arquitectura

### Estructura del Repo

```
frontend/          # Next.js app
  src/
    app/           # App Router
    components/
    lib/
backend/           # FastAPI + Python
  routers/         # API routers (intelligence, prospection, etc.)
  services/        # Lógica de negocio
  agents/          # LangGraph agent
sdd/               # Specs y contratos SDD
  contracts/       # Contratos SDD específicos de Nexus
.agent/
  rules/           # Reglas de agentes
docs/
  standards/       # Contratos UX/UI
```

### Agente LangGraph

```
process_input → planner → limit_check → executor → result_handler → audit_logger → finalize
```

**Límites constitucionales**:
- 50 leads/día máximo
- 100k tokens/día máximo
- 60 min por tarea
- 2 agentes en paralelo máximo

### Pipeline de Vendedores (HITL)

```
StateFox + live capture → ingestion_events → nexus_sellers
    → seller_interactions → seller_memory_records
    → workbench → supervised send (HITL: aprobación humana requerida)
```

**HITL**: el envío de outreach a vendedores requiere aprobación humana. El agente nunca envía mensajes automáticamente.

### Fórmula de Scoring de Compradores

```
priority = (budget × 0.35) + (urgency × 0.25) + (property_fit × 0.25) + (source_quality × 0.15)
```

5 niveles de respuesta SLA según prioridad.

### Audit Trail

- Tabla `audit_log`: append-only, HMAC-SHA256 signed
- `REVOKE` previene UPDATE/DELETE incluso desde el cliente

---

## 4. Rutas del Frontend

| Ruta | Descripción |
|------|-------------|
| `/dashboard` | Panel principal |
| `/sellers` | Pipeline de vendedores |
| `/intelligence/statefox-bridge` | Bridge de datos StateFox |
| `/source-observatory` | Monitoreo de salud de fuentes de scraping |
| `/automation-alerting` | Gestión de alertas automáticas |
| `/command-center` | Panel de control ejecutivo |
| `/private-area` | Gateway a portales partner y Data Lab |
| `/invite` | Onboarding por invitación |
| `/login` | Auth Supabase magic link |

---

## 5. Servicios Backend Principales

| Servicio | Descripción |
|---------|-------------|
| `sellers_service.py` + `seller_memory_service.py` | CRM de vendedores y memoria semántica |
| `statefox_*_service.py` | Pipeline de captura StateFox (bridge, live, discovery) |
| `ingestion_service.py` | Ingesta unificada de eventos |
| `prospection_service.py` + `scoring_service.py` | Matching y scoring de compradores |
| `territorial_sync_service.py` | Sync de inteligencia territorial con NotebookLM |
| `source_observatory_service.py` | Monitoreo de salud de fuentes |
| `command_center_service.py` | Agregación de métricas ejecutivas |
| `partner_admission_service.py` | Ciclo de vida de partners (Synergi integrado) |
| `data_lab_access_service.py` + `intelligence_packs_service.py` | Acceso selectivo Data Lab |
| `firecrawl_service.py` | Scraping web on-demand |
| `notebooklm_service.py` | Integración NotebookLM API |
| `valuation_request_service.py` | Solicitudes de valoración de propiedades |
| `buyer_memory_service.py` + `buyer_outreach_service.py` | CRM lado comprador |
| `finops.py` | Dashboard de operaciones financieras |
| `embedding_service.py` | Gestión de embeddings vectoriales |

---

## 6. Routers Backend

```
backend/routers/
  intelligence/   # Inteligencia territorial
  prospection/    # Prospección de compradores
  finops/         # Operaciones financieras
  partners/       # Gestión de partners
  sellers/        # CRM de vendedores
  skills/         # Skills del agente
  ingestion/      # Ingesta de datos
  public/         # APIs públicas (ej: lead capture desde Private Estates)
```

**API pública de lead capture**: `POST /api/public/cta/lead` — usada por Private Estates.

---

## 7. Variables de Entorno Principales

```env
# Supabase (proyecto ref: jtlnmypcrgmzxeuiffup)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Backend Python
GROQ_API_KEY=                   # LLM principal
CLOUDFLARE_AI_API_TOKEN=        # Embeddings
CLOUDFLARE_ACCOUNT_ID=
FIRECRAWL_API_KEY=              # Scraping on-demand
APOD_API_KEY=                   # Apify (portales)
STATEFOX_API_KEY=               # Señales territoriales
NOTEBOOKLM_API_KEY=             # Inteligencia territorial

# App
NEXT_PUBLIC_APP_URL=
```

---

## 8. Base de Datos (56 Migraciones Secuenciales)

Tablas principales:

| Área | Tablas |
|------|--------|
| Vendedores | `nexus_sellers`, `seller_interactions`, `ingestion_events`, `seller_memory_records` |
| Compradores | `nexus_buyers`, `buyer_memory_contextual_recall`, `buyer_outreach_supervised` |
| Inteligencia | `notebooklm_insights` |
| Automatización | `automation_alerts`, `multichannel_feed_orchestrator` |
| Partners | `synergi_partner_admissions`, `partner_workspace_*`, `synergi_shared_opportunities` |
| Data Lab | `multi_tenant_intelligence_packs`, `data_lab_selective_access` |
| Scoring | `prospection_matching_tables`, `seller_signal`, `valuation_requests` |
| Auditoría | `audit_log` (append-only, HMAC-SHA256 signed) |
| Límites | `constitutional_limits` (50 leads/día, 100k tokens/día) |

---

## 9. Branding Canónico

| Token | Valor |
|-------|-------|
| Familia | **Interna** |
| Tema | Dark único |
| Fondo | `#0F1629`, `#141C3A`, `#192350` |
| Accent | Oro `#D4AF37` |
| Tipografía principal | Inter |
| Tipografía display | Playfair Display |
| Idiomas | es, en, de, ru |

---

## 10. Contratos UX/UI

1. `ANCLORA_ECOSYSTEM_CONTRACT_GROUPS.md`
2. `ANCLORA_INTERNAL_APP_CONTRACT.md`
3. `UI_MOTION_CONTRACT.md`
4. `MODAL_CONTRACT.md`
5. `LOCALIZATION_CONTRACT.md`

Nexus mantiene además contratos SDD propios en `sdd/contracts/`.

---

## 11. Excluido del Scope v0

- Multi-tenancy (scope v1)
- Pagos
- MFA
- pgvector embeddings (scope v1)

---

*Generado por Claude Code — Abril 2026 (v1.1)*
