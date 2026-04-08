# Anclora Content Generator AI — Guía Técnica Interna

**Clasificación:** Interno | **Segmento:** Aplicaciones Internas | **Versión:** 1.1 | **Fecha:** Abril 2026

---

## 1. Propósito y Rol en el Ecosistema

Anclora Content Generator AI es el **motor editorial e inteligencia de contenido** del ecosistema Anclora. No es un generador genérico: es una plataforma especializada en content intelligence para Real Estate de lujo en las Islas Baleares, con RAG anclado en fuentes de dominio.

**Ciclo editorial:**
```
Ingesta de fuentes → RAG retrieval → Generación con LLM → Draft → Revisión → Programado → Publicado
```

---

## 2. Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|--------|
| Framework | Next.js (App Router, Turbopack) | 15.5.12 |
| Lenguaje | TypeScript | — |
| UI | React | 19.1 |
| Estilos | Tailwind CSS v4, shadcn/ui, Framer Motion | — |
| Auth | Better Auth v1.5.5 (org plugin + Drizzle adapter) | — |
| Base de datos | Neon PostgreSQL + Drizzle ORM | — |
| Vector Store | pgvector (Neon, 384 dims) | — |
| Embeddings | Transformers.js local (Xenova/all-MiniLM-L6-v2) | — |
| LLM principal | Anthropic Claude (claude-sonnet-4-6) | — |
| LLM rápido | Groq | — |
| LLM local | Ollama (compatible OpenAI endpoint) | — |
| Parsing doc | mammoth (DOCX), pdf-parse (PDF) | — |
| Testing | Vitest (unit) + Playwright (E2E) | — |
| Deploy | Vercel | — |

**Preparado para escalar a**: Pinecone + Google Gemini (no activos por defecto).

---

## 3. Arquitectura

### Multi-Tenancy
- Modelo: `workspace_id` en todas las tablas
- Better Auth gestiona organizaciones y workspaces (workspace = org)
- **Fase 1 activa**: hardening de tenancy (workspaceId resuelto en server, no cliente)

### Dashboard Shell
- `/dashboard/*`: regla crítica NO scroll vertical global (`h-screen overflow-hidden`)
- Cada panel interno gestiona su propio scroll

### Pipeline RAG
```
Ingesta: texto/URL/RSS/DOCX/PDF/NotebookLM → chunking → embeddings locales → pgvector
Retrieval: query → vector search → contexto relevante → prompt LLM
```

### Estrategia de LLM (3 niveles)
- **Ollama** (local/gratuito): modelo por defecto para desarrollo
- **Groq** (cloud rápido): inferencia rápida, bajo coste
- **Anthropic Claude** (razonamiento): `claude-sonnet-4-6` — calidad máxima

---

## 4. Módulos del Dashboard

| Ruta | Módulo | Descripción |
|------|--------|-------------|
| `/dashboard/studio` | Content Studio | Generación y edición de contenido |
| `/dashboard/rag` | Knowledge Base | Gestión de fuentes, ingestación, RAG |
| `/dashboard/metrics` | Métricas | Vistas, impresiones, clicks, leads, conversiones |
| `/dashboard/settings` | Configuración | Config LLM por workspace (proveedor, modelo, temperatura, RAG top-k) |

---

## 5. Schema de Base de Datos (Drizzle ORM + pgvector)

| Tabla | Descripción |
|-------|-------------|
| `content_sources` | Fuentes de conocimiento ingestadas |
| `knowledge_chunks` | Chunks con vector(384) |
| `knowledge_packs` | Paquetes de inteligencia con claims, evidencias, scores |
| `knowledge_pack_evidence` | Evidencias de cada claim |
| `knowledge_pack_claims` | Señales de mercado, tesis, riesgos |
| `knowledge_ingestion_jobs` | Jobs de ingestión |
| `content_opportunities` | Oportunidades editoriales detectadas por IA |
| `content_templates` | Plantillas de contenido |
| `workspace_settings` | Config LLM por workspace |
| `generated_content` | Contenido generado |
| `scheduled_posts` | Cola de publicación por plataforma |
| `content_metrics` | Métricas por pieza de contenido |
| `micro_zones` | Zonas geográficas de Mallorca |
| `lead_tracking` | Leads atribuidos a contenido (scoring A–F) |

Tablas Better Auth: `authUsers`, `authSessions`, `authOrganizations`, `authMembers`, etc.

---

## 6. APIs Principales

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/content/generate` | POST | Generación RAG-augmented |
| `/api/content/ingest` | POST | Ingesta a knowledge base |
| `/api/content/library` | GET/PATCH | Gestión de contenido (estado, scheduling) |
| `/api/content/templates` | GET/POST | CRUD de plantillas |
| `/api/metrics/dashboard` | GET | Métricas agregadas del workspace |
| `/api/automation/recommendations` | GET | Recomendaciones editoriales por IA |
| `/api/rag/sources` | GET/POST | Fuentes de conocimiento |
| `/api/rag/knowledge-packs` | GET/POST | Packs de inteligencia |
| `/api/rag/content-opportunities` | GET | Oportunidades detectadas |
| `/api/rag/import-document` | POST | Ingesta de DOCX/PDF |
| `/api/workspace/settings` | GET/POST | Config LLM del workspace |
| `/api/micro-zones` | POST | Gestión de micro-zonas |
| `/api/auth/[...all]` | — | Better Auth handler |

---

## 7. Variables de Entorno

```env
DATABASE_URL=postgresql://...@...neon.tech/...?sslmode=require
NEXT_PUBLIC_APP_URL=
BETTER_AUTH_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_ENABLED=true
NEXT_PUBLIC_BETTER_AUTH_ENABLED=true
ANTHROPIC_API_KEY=sk-ant-...
GROQ_API_KEY=gsk_...
RAG_VECTOR_BACKEND=pgvector
RAG_EMBEDDING_BACKEND=local
RAG_SIMILARITY_THRESHOLD=0.7
RAG_TOP_K=5
# Opcionales: Pinecone + Gemini (no activos)
GOOGLE_AI_API_KEY=
PINECONE_API_KEY=
```

---

## 8. Comandos de Desarrollo

```bash
npm install
npm run dev
npm run lint
npm run build
npm run test
npm run db:generate
npm run db:push
npm run db:studio
npm run db:migrate
```

---

## 9. Roadmap

| Fase | Estado | Descripción |
|------|--------|-------------|
| 0 | Completada | Rebaseline documental |
| 1 | Completada (baseline) | Hardening identidad y tenancy |
| 2 | Parcialmente avanzada | UX operativa |
| 3 | Activa | RAG de dominio: fuentes, micro-zonas, trazabilidad |
| 4 | Planificada | Telemetría editorial (ciclo draft→published) |
| 5 | Planificada | Automatización y agentes |

---

## 10. Branding Canónico

| Token | Valor |
|-------|-------|
| Familia | **Interna** |
| Accent | Coral `#E06848` |
| Tipografía | Inter, JetBrains Mono |
| Borde icono | Plata cromada |
| Interior icono | Carbón cálido `#1A1410` |
| Prefijo favicon | `contentgen_` |

---

*Generado por Claude Code — Abril 2026 (v1.1)*
