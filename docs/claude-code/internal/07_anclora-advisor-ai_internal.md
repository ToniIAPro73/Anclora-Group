# Anclora Advisor AI — Guía Técnica Interna

**Clasificación:** Interno | **Segmento:** Aplicaciones Internas | **Versión:** 1.1 | **Fecha:** Abril 2026

---

## 1. Propósito y Rol en el Ecosistema

Anclora Advisor AI es el **asesor inteligente** del ecosistema Anclora. Proporciona orientación especializada en tres dominios:

1. **Fiscal**: IVA, IRPF, RETA, deducciones para autónomos en pluriactividad
2. **Laboral**: pluriactividad, riesgos contractuales, despidos, compatibilidad de prestaciones
3. **Mercado inmobiliario**: inteligencia de mercado de lujo, foco en Mallorca

Target: autónomos en pluriactividad con exposición al sector inmobiliario español.

---

## 2. Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|--------|
| Framework | Next.js (App Router) | 15.x |
| UI | React | 19.x |
| Lenguaje | TypeScript | — |
| Base de datos | Supabase PostgreSQL + pgvector | — |
| Auth | Supabase Auth | — |
| LLM principal | Anthropic Claude | — |
| LLMs alternativos | OpenAI, Groq, Cloudflare Workers AI, Ollama (local) | — |
| Vision LLM | ZAI / GLM-4.5V (facturas con imagen) | — |
| Embeddings | @xenova/transformers (384-dim) | — |
| Email | Nodemailer (SMTP) | — |
| PDF | pdf-lib | — |
| Testing | Playwright (E2E + UI), tsx (unit/integration) | — |
| Estilos | Tailwind CSS | — |
| Deploy | Vercel (`ancloraadvisorai-ten.vercel.app`) | — |

**Nota**: Advisor AI usa **Supabase** (no Neon), a diferencia del stack estándar Premium. Proyecto Supabase ref: `lvpplnqbyvscpuljnzqf`.

---

## 3. Arquitectura

### Orquestador (lib/agents/orchestrator.ts)

El cerebro central de la aplicación:

- **Routing por especialidad**: palabras clave dirigen la consulta a fiscal / laboral / mercado
- **Cascada de retrieval multi-tier**: umbrales de similitud configurables
- **Selección de modelo**: primary (heavy) → fast (simple) → fallback (local)
- **Response guard**: segunda llamada LLM verifica grounding cuando confianza es media/baja (anti-alucinación)
- **Caché en memoria**: TTL-based para respuestas frecuentes
- **Herramientas fiscales determinísticas**: cálculos basados en reglas (no LLM)
- **Suggested actions**: acciones sugeridas contextuales
- **Persistencia de conversación**: a Supabase

### Perfiles de Runtime AI (`AI_RUNTIME_PROFILE`)

| Perfil | Stack |
|--------|-------|
| local | Ollama (qwen2.5:14b principal, llama3.x fallback) |
| groq_cloudflare | Groq + Cloudflare Workers AI |
| anthropic | Anthropic Claude (principal) |
| openai | OpenAI (alternativo) |

### RAG Pipeline

- Vector store: pgvector en Supabase (`rag_documents`)
- Embeddings: @xenova/transformers (384-dim)
- Categorías: `fiscal`, `laboral`, `mercado`

---

## 4. Módulos Principales

| Módulo | Descripción |
|--------|-------------|
| **Chat** (`/dashboard/chat`) | Interfaz principal de asesoría con RAG y citaciones |
| **Fiscal** | Templates, workflow v1–v3, alertas fiscales |
| **Laboral** | Evaluaciones de riesgo, mitigaciones v1–v3, storage de evidencias |
| **Facturas** | Serie, pagos (v4), pagos parciales (v5), rectificaciones (v6), VeriFactu (v7), importación imagen+VLM (v8) |
| **Admin Panel** | RBAC roles, jobs de ingesta, versiones de documentos RAG, audit logs, filtros de estado |
| **Operations/Jobs** | Procesador outbox, alertas de recordatorio |
| **NotebookLM** | Sync automático de fuentes a 3 notebooks (fiscal, laboral, brand/positioning) |

---

## 5. Variables de Entorno

```env
# Supabase (proyecto ref: lvpplnqbyvscpuljnzqf)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=    # NUNCA exponer en cliente

# AI Runtime Profile
AI_RUNTIME_PROFILE=anthropic  # local | groq_cloudflare | anthropic | openai

# LLMs (según perfil activo)
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
GROQ_API_KEY=
OLLAMA_BASE_URL=http://localhost:11434
CLOUDFLARE_AI_API_TOKEN=

# App
NEXT_PUBLIC_APP_URL=

# Email
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

---

## 6. Schema de Base de Datos

- `rag_documents`: documentos de conocimiento (fiscal/laboral/mercado)
- `conversations`: historial de conversaciones
- `ingest_jobs`: trabajos de ingesta de nuevos documentos
- `audit_log`: registro de acciones del admin
- Tablas de facturas: `invoice_series`, `invoices`, `invoice_payments`, etc.

Migraciones SQL en `db/migrations/` (secuenciales, Feb–Mar 2026).

---

## 7. Comandos de Desarrollo

```bash
npm install
# Configurar .env.local con credenciales Supabase
npm run dev
npm run test          # tsx unit/integration
npm run test:e2e      # Playwright E2E
```

---

## 8. Branding Canónico

| Token | Valor |
|-------|-------|
| Familia | **Interna** (baseline de referencia del ecosistema) |
| Tipografía display | Cormorant Garamond |
| Tipografía body | Source Sans 3 |
| Accent (placeholder) | Mint `#1dab89` |
| Base (placeholder) | Navy `#162944` |
| Prefijo componentes | `advisor-` |
| Prefijo assets | `advisor_` |
| Módulo branding | `src/lib/advisor-brand.ts` |

---

## 9. Contratos UX/UI

1. `ANCLORA_INTERNAL_APP_CONTRACT.md`
2. `UI_MOTION_CONTRACT.md`
3. `MODAL_CONTRACT.md`
4. `LOCALIZATION_CONTRACT.md`

---

## 10. Notas de Seguridad

- `SUPABASE_SERVICE_ROLE_KEY` es privilegiada — NUNCA en el cliente
- Las consultas de asesoría fiscal/legal son sensibles; logs con cuidado
- Supabase RLS debe estar habilitado en todas las tablas de usuario
- NO mezclar con el proyecto Supabase de Nexus (`jtlnmypcrgmzxeuiffup`)

---

*Generado por Claude Code — Abril 2026 (v1.1)*
