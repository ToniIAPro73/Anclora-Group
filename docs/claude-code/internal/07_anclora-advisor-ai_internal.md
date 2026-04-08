# Anclora Advisor AI — Guía Técnica Interna

**Clasificación:** Interno | **Versión:** 1.0 | **Fecha:** Abril 2026

---

## 1. Propósito y Rol en el Ecosistema

Anclora Advisor AI es la **aplicación de asesoría inteligente** del ecosistema Anclora. Proporciona orientación especializada en tres ámbitos interrelacionados:

1. **Fiscal**: optimización tributaria para autónomos en pluriactividad
2. **Laboral**: gestión de situaciones laborales complejas
3. **Mercado inmobiliario**: análisis de oportunidades y tendencias

Target principal: autónomos en régimen de pluriactividad con exposición al sector inmobiliario.

---

## 2. Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|--------|
| Framework | Next.js (App Router) | 15.x |
| UI | React | 19.x |
| Lenguaje | TypeScript | — |
| Base de datos | Supabase PostgreSQL + pgvector | — |
| LLM principal | Anthropic Claude | — |
| LLM local | Ollama Mistral | — |
| Deploy | Vercel | — |

**Nota**: Advisor AI usa **Supabase** (no Neon), diferenciándose del resto del stack Premium que usa Neon. A tener en cuenta para consolidación futura.

---

## 3. Arquitectura

### Branding Module

- `src/lib/advisor-brand.ts`: módulo centralizado de tokens de marca

### Modelo de IA

- **Anthropic Claude**: consultas de alta complejidad (fiscal, legal)
- **Ollama Mistral**: procesamiento local / fallback
- **pgvector** (Supabase): almacenamiento de embeddings para RAG

### Flujo de Asesoría

```
Usuario formula consulta → RAG retrieval (pgvector) → LLM (Claude/Mistral)
    → Respuesta estructurada con referencias a normativa
```

---

## 4. Variables de Entorno

Configurar en `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# LLMs
ANTHROPIC_API_KEY=
OLLAMA_BASE_URL=http://localhost:11434  # Para Ollama local

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 5. Setup Local

```bash
# 1. Configurar .env.local con credenciales Supabase
# 2. Instalar dependencias
npm install

# 3. Arrancar servidor de desarrollo
npm run dev

# Acceso: http://localhost:3000
```

**Opcional**: instalar Ollama localmente para usar Mistral sin API key externa.

---

## 6. Branding Canónico

| Token | Valor |
|-------|-------|
| Familia | Interna (baseline de referencia del ecosistema) |
| Tipografía display | Cormorant Garamond |
| Tipografía body | Source Sans 3 |
| Accent (placeholder) | Mint `#1dab89` |
| Base (placeholder) | Navy `#162944` |
| Prefijo componentes | `advisor-` |
| Prefijo assets | `advisor_` |
| Módulo branding | `src/lib/advisor-brand.ts` |
| Estado activos finales | Pendientes de entrega |

---

## 7. Contratos UX/UI

1. `ANCLORA_INTERNAL_APP_CONTRACT.md`
2. `UI_MOTION_CONTRACT.md`
3. `MODAL_CONTRACT.md`
4. `LOCALIZATION_CONTRACT.md`

---

## 8. Diferencias con el Resto del Ecosistema

| Aspecto | Advisor AI | Ecosistema estándar |
|---------|-----------|---------------------|
| Base de datos | Supabase PostgreSQL | Neon PostgreSQL |
| Tipografía display | Cormorant Garamond | Variable por familia |
| LLM secundario | Ollama Mistral (local) | No aplica |
| Target usuario | Autónomos pluriactividad | Inversores/equipos |

---

## 9. Notas de Seguridad

- `SUPABASE_SERVICE_ROLE_KEY` es una clave privilegiada — NUNCA expoenerla en cliente
- Las consultas de asesoría fiscal/legal son sensibles; registrar logs con cuidado
- Supabase Row Level Security (RLS) debe estar habilitado en tablas de usuario

---

*Generado por Claude Code — Abril 2026*
