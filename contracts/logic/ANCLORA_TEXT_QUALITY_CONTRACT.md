---
title: ANCLORA_TEXT_QUALITY_CONTRACT
type: standard
estado: activo
scope: ecosystem-text-quality
tags: [copy, quality, i18n, seo, geo, aeo, agent, contract]
related:
  - "[[LOCALIZATION_CONTRACT]]"
  - "[[HERMES_COPY_CURATOR_CONTRACT]]"
  - "[[ANCLORA_BRAND_IDENTITY_AND_SEO_GEO_CONTRACT]]"
---

# ANCLORA_TEXT_QUALITY_CONTRACT

## Objetivo

Definir el gate transversal de calidad textual para todas las aplicaciones del ecosistema Anclora: ortografía, semántica, humanización, localización, claims, SEO, GEO y AEO.

Este contrato no sustituye a `LOCALIZATION_CONTRACT`, `HERMES_COPY_CURATOR_CONTRACT` ni `ANCLORA_BRAND_IDENTITY_AND_SEO_GEO_CONTRACT`. Los orquesta y fija cuándo debe ejecutarse la validación antes de cerrar repos nuevos, features o cambios de copy.

## Autoridad

- Fuente contractual: `contracts/logic/ANCLORA_TEXT_QUALITY_CONTRACT.md`
- Contrato de localización: `contracts/logic/LOCALIZATION_CONTRACT.md`
- Contrato de agente de copy: `contracts/logic/HERMES_COPY_CURATOR_CONTRACT.md`
- Contrato SEO/GEO/AEO: `contracts/core/ANCLORA_BRAND_IDENTITY_AND_SEO_GEO_CONTRACT.md`
- Skill operativa recomendada: `anclora-text-quality-guardian`

## Cuándo aplica

La validación aplica cuando una tarea modifica o crea:

- Copy visible de producto.
- Landings, páginas públicas, páginas de producto, FAQs o blogs.
- Metadatos SEO, Open Graph, schema.org, sitemap o hreflang.
- Locale files, traducciones, microcopy, mensajes de error o estados vacíos.
- Documentación pública, PDFs indexables, emails comerciales o prompts editoriales.
- Features de repos nuevos antes de considerarlas listas para review.

No aplica como bloqueo automático a cambios puramente técnicos sin texto visible, salvo que modifiquen metadatos, rutas públicas, contenidos o documentación.

## Gate obligatorio

El orden de revisión es:

1. **Extracción de superficie**: identificar archivos y textos afectados.
2. **Ortografía y gramática**: corregir errores evidentes en el idioma activo.
3. **Semántica**: verificar que el significado no cambia y que no aparecen claims nuevos.
4. **Humanización**: eliminar literalismos, IA-ismos, grandilocuencia vacía y tono artificial.
5. **Localización**: validar cobertura real de idiomas, placeholders, interpolaciones y naturalidad por locale.
6. **Claims y marca**: aplicar Brand/IP, Hermes Copy Curator y disclaimers sectoriales.
7. **SEO técnico**: title, meta description, canonical, hreflang, H1, alt text, sitemap cuando aplique.
8. **GEO**: claridad de entidad, descripción factual, schema coherente y diferenciación entre productos.
9. **AEO**: respuesta directa a preguntas, FAQs útiles, estructura para snippets y buscadores conversacionales.
10. **Reporte final**: emitir `PASS`, `PASS_WITH_WARNINGS` o `FAIL` con evidencias.

## Reglas de ortografía, semántica y humanización

- No publicar texto con errores ortográficos evidentes en el idioma objetivo.
- No cambiar el sentido original al humanizar o traducir.
- No añadir promesas, garantías, cifras o beneficios no soportados por evidencia.
- Mantener un tono Anclora premium, concreto y útil.
- Evitar texto genérico de IA: "revolucionario", "líder indiscutible", "solución integral" o fórmulas similares sin prueba.
- Diferenciar hechos, interpretación y propuesta.
- Proteger nombres propios, marcas, rutas, variables, claves JSON, placeholders e interpolaciones.

## Reglas SEO/GEO/AEO

SEO y GEO se rigen por `ANCLORA_BRAND_IDENTITY_AND_SEO_GEO_CONTRACT.md`. Este contrato añade el uso obligatorio dentro del gate de calidad textual.

### SEO

- Toda superficie pública debe tener title y meta description únicos por idioma.
- Las páginas multilingües deben validar hreflang y canonical cuando haya rutas equivalentes.
- El H1 debe describir el producto o intención principal de la página.
- Las imágenes informativas deben tener alt text en el idioma activo.
- Los bloques SEO no pueden ser relleno de palabras clave.

### GEO

- Toda descripción pública de producto debe responder de forma clara: qué es, para quién es, qué hace y qué no hace cuando sea relevante.
- El schema debe representar el producto real y no contradecir su naturaleza.
- No usar claims vacíos para LLMs ni mezclar dominios entre productos.
- Las correcciones de representación por LLM deben hacerse en contenido accesible, metadatos y structured data, no sólo en SEO técnico.

### AEO

- Las páginas públicas deben incluir respuestas directas a preguntas reales del usuario cuando la intención de búsqueda lo justifique.
- Las FAQs deben ser útiles, específicas y coherentes con el producto; no deben existir sólo para ocupar keywords.
- El contenido debe poder ser citado por AI Overviews, ChatGPT Search, Perplexity u otros motores conversacionales sin inducir a error.
- Las respuestas deben evitar ambigüedad en sectores sensibles: inmobiliario, energía, fiscal, laboral, legal o cumplimiento.

## Modos de ejecución

- `audit`: detectar problemas y emitir reporte sin modificar archivos.
- `suggest`: proponer cambios concretos sin aplicarlos.
- `apply-safe`: aplicar únicamente cambios de bajo riesgo, sin claims nuevos y sin tocar texto legal.
- `apply-reviewed`: aplicar cambios aprobados por humano, con evidencia de revisión.

El modo seguro por defecto para agentes es `audit` o `suggest`. El modo `apply-safe` sólo se permite si se preservan placeholders, significado, claims y contratos aplicables.

## Severidades

| Severidad | Significado | Resultado |
| --- | --- | --- |
| `low` | Mejora opcional | `PASS_WITH_WARNINGS` |
| `medium` | Texto mejorable o señal SEO/GEO/AEO incompleta | `PASS_WITH_WARNINGS` |
| `high` | Riesgo de publicación, claim débil, mezcla de idioma o metadato crítico ausente | `FAIL` si afecta superficie pública |
| `critical` | Claim falso, sentido cambiado, placeholder roto, texto legal alterado o schema contradictorio | `FAIL` |

## Reglas para agentes

- Codex, Claude Code, Gemini CLI y Hermes deben consultar este contrato antes de cerrar tareas con copy visible.
- Los agentes deben preferir una skill central y un CLI compartido antes que scripts duplicados por repo.
- Si falta configuración local, el agente debe inferir superficies estándar y reportar la suposición.
- Si detecta texto legal, claims sensibles o promesas de resultado, debe pedir revisión humana antes de aplicar cambios.
- Un `PASS_WITH_WARNINGS` no equivale a publicación automática.

## Configuración mínima por repo

Cada repo puede incluir `anclora.text-quality.yml` o `anclora.text-quality.json` con:

```yaml
app: anclora-private-estates
family: ultra-premium
default_language: es
active_languages: [es, en, de, fr]
public_surfaces: [app, src, content, public, docs]
protected_tokens: [placeholders, routes, json_keys, env_vars]
mode: audit
```

Si no existe configuración, el agente debe usar el inventario contractual de la bóveda y declarar que trabaja con configuración inferida.

## Criterios de aceptación

Una feature o repo nuevo no está listo si:

- introduce copy visible sin revisión ortográfica y semántica.
- deja traducciones literales o artificiales en idiomas activos.
- mezcla idiomas dentro de una misma superficie.
- añade claims no soportados o contradice disclaimers sectoriales.
- publica una página pública sin title, meta description, H1 o schema cuando aplique.
- no responde a intención AEO básica en páginas orientadas a captación o búsqueda.
- genera `FAIL` en la batería de validación textual.

## Relacionado

- [[LOCALIZATION_CONTRACT]]
- [[HERMES_COPY_CURATOR_CONTRACT]]
- [[ANCLORA_BRAND_IDENTITY_AND_SEO_GEO_CONTRACT]]
- [[ANCLORA_LANGUAGE_TOGGLE_CONTRACT]]
