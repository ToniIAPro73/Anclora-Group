# Anclora Content Generator AI — Guía Técnica Interna

**Clasificación:** Interno | **Versión:** 1.0 | **Fecha:** Abril 2026

---

## 1. Propósito y Rol en el Ecosistema

Anclora Content Generator AI es el **motor editorial e inteligencia de contenido** para Anclora Private Estates. No es un generador genérico de texto: es una plataforma especializada en content intelligence para Real Estate de lujo, con RAG (Retrieval-Augmented Generation) anclado a fuentes de dominio inmobiliario.

**Ciclo editorial:**
```
Knowledge Base (ingesta) → RAG retrieval → Generación con LLM → Draft → Review → Published
```

---

## 2. Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|--------|
| Framework | Next.js (App Router) | 15.x |
| Lenguaje | TypeScript | — |
| UI | React | 19.x |
| Estilos | Tailwind CSS v4, shadcn/ui | — |
| Auth | Better Auth (email/password + organizations) | — |
| Base de datos | Neon PostgreSQL + Drizzle ORM | — |
| Vector store | pgvector (Neon) | — |
| Embeddings | Transformers.js (local) | — |
| LLMs | Anthropic Claude, Groq, Ollama | — |
| Deploy | Vercel | — |

**Preparado para escalar a:**
- Pinecone (vector store)
- Google Gemini (embeddings)

---

## 3. Arquitectura

### Multi-Tenancy

- Modelo: `workspace_id` en cada entidad
- Auth: Better Auth gestiona organizaciones y workspaces
- **Estado actual**: Multi-tenancy definida a nivel de modelo, enforcement aún en hardening (Fase 1)

### Dashboard Shell

- El dashboard (`/dashboard/*`) usa layout `h-screen overflow-hidden`
- **Regla crítica**: NO scroll vertical global en `/dashboard/*`
- Cada panel interno gestiona su propio scroll

### RAG Pipeline

```
Ingesta: texto → chunking → embeddings (Transformers.js) → pgvector
Retrieval: query → vector search → contexto relevante → LLM prompt
```

---

## 4. Variables de Entorno

```env
# Base de datos
DATABASE_URL=postgresql://user:pass@endpoint.neon.tech/db?sslmode=require

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=
BETTER_AUTH_ENABLED=true
NEXT_PUBLIC_BETTER_AUTH_ENABLED=true

# LLMs
ANTHROPIC_API_KEY=sk-ant-...
GROQ_API_KEY=gsk_...

# RAG
RAG_VECTOR_BACKEND=pgvector
RAG_EMBEDDING_BACKEND=local
RAG_SIMILARITY_THRESHOLD=0.7
RAG_TOP_K=5

# Opcional: Pinecone + Gemini (no activos por defecto)
GOOGLE_AI_API_KEY=
GEMINI_EMBEDDING_MODEL=gemini-embedding-001
PINECONE_API_KEY=
PINECONE_INDEX_NAME=gemini-rag
```

---

## 5. Estructura de Directorios

```
src/
  app/
    api/
      content/generate   # POST: genera contenido con LLM + RAG
      content/ingest     # POST: ingesta a knowledge base
      metrics/dashboard  # GET: métricas del dashboard
    dashboard/           # Shell del dashboard y vistas
  components/            # UI y layout
  lib/
    ai/                  # Clientes y adaptadores LLM
    db/                  # Schema Drizzle, cliente Neon, tipos
    rag/                 # Chunking, embeddings, retrieval, pipeline
    auth/                # Better Auth, tenancy, helpers de sesión
sdd/                     # Core specs y specs por feature
.antigravity/            # Rules, skills y orquestación del equipo AI
```

---

## 6. APIs Principales

### POST `/api/content/generate`

```json
{
  "templateId": "uuid",
  "opportunityId": "uuid",
  "contentType": "blog|linkedin|instagram|facebook|newsletter|custom",
  "title": "Informe editorial Q2",
  "userPrompt": "Redacta una pieza orientada a compradores internacionales",
  "ragQuery": "tendencias de demanda en Bendinat",
  "microZoneId": "uuid"
}
```

### POST `/api/content/ingest`

```json
{
  "title": "Informe de mercado",
  "sourceType": "manual",
  "sourceCategory": "market|regulation|lifestyle|infrastructure|editorial|general",
  "content": "Texto base para la knowledge base"
}
```

### GET `/api/metrics/dashboard`

- Devuelve métricas del workspace autenticado
- Si `DATABASE_URL` no existe, devuelve métricas vacías de forma segura

---

## 7. Comandos de Desarrollo

```bash
npm install
npm run dev
npm run lint
npm run build
npm run test
npm run db:generate    # Genera migraciones Drizzle
npm run db:push        # Aplica esquema a Neon
npm run db:studio      # Drizzle Studio UI
npm run db:migrate     # Ejecuta migraciones pendientes
```

---

## 8. Roadmap Activo

| Fase | Estado | Descripción |
|------|--------|-------------|
| 0 | Completada | Rebaseline documental |
| 1 | Completada (baseline) | Hardening de identidad y tenancy |
| 2 | Parcialmente avanzada | UX operativa |
| 3 | Activa | RAG de dominio: fuentes especializadas, micro-zonas |
| 4 | Planificada | Telemetría editorial (ciclo draft-published) |
| 5 | Planificada | Automatización y agentes |

---

## 9. Principios No Negociables

- En `/dashboard/*` NUNCA scroll vertical global del documento
- El shell del dashboard: `h-screen overflow-hidden`
- Si una vista necesita scroll, vive dentro de su panel interno
- Ningún cambio de UI aparenta persistencia real si la acción no existe en backend
- `workspaceId` siempre se resuelve en server vía Better Auth, nunca desde cliente

---

## 10. Branding Canónico

| Token | Valor |
|-------|-------|
| Familia | Interna |
| Accent | Coral `#E06848` |
| Tipografía | Inter, JetBrains Mono |
| Borde icono | Plata cromada |
| Interior icono | Carbón cálido `#1A1410` |
| Prefijo favicon | `contentgen_` |

---

*Generado por Claude Code — Abril 2026*
