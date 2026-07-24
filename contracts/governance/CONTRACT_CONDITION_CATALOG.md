# Contract Condition Catalog

## Objetivo

Tener un catálogo canónico y no ambiguo de condiciones contractuales del ecosistema Anclora.

Este documento evita:
- condiciones duplicadas entre contratos
- solapes entre familia y universal
- auditorías donde no queda claro qué se está validando

## Regla de lectura

1. Primero leer `CONTRACT_HIERARCHY.md`
2. Después identificar la familia en `APPLICATION_FAMILY_MAP.md`
3. Después auditar esta tabla de condiciones

## Contratos universales

### `ANCLORA_GROUP_BRAND_IP_CONTRACT.md`

| ID | Condición | Aplica a |
| --- | --- | --- |
| `BIP1` | Anclora Group figura como entidad matriz para titularidad, operación y propiedad intelectual | Todas las apps Anclora Group |
| `BIP2` | El copyright usa la fórmula canónica por idioma y no usa "Anclora" como titular jurídico aislado | Todas las apps Anclora Group con footer, legal pages o docs públicas |
| `BIP3` | La declaración de marca derivada aparece en footer, legal pages o documentación pública según superficie | Todas las marcas derivadas |
| `BIP4` | No se afirma registro concedido si el estado real es marca en proceso de registro / pendiente de validación legal final | Todas las apps y documentos |
| `BIP5` | i18n legal cubre todos los idiomas soportados por la app sin mezclar idiomas en una misma superficie | Apps multilenguaje |

### `COOKIES_CONSENT_CONTRACT.md`

| ID | Condición | Aplica a |
| --- | --- | --- |
| `CK1` | Cookies no técnicas no se cargan antes del consentimiento explícito del usuario | Todas las apps públicas |
| `CK2` | Aceptar y rechazar tienen la misma prominencia visual en el banner | Todas las apps públicas |
| `CK3` | El footer incluye enlace o botón funcional para reabrir preferencias de cookies | Todas las apps públicas |
| `CK4` | Las categorías de cookies mostradas corresponden a las que realmente usa la app | Todas las apps públicas |
| `CK5` | El banner y el modal de preferencias son responsives y legibles en mobile | Todas las apps públicas |
| `CK6` | El footer no solapa el banner de cookies ni ningún botón flotante | Todas las apps públicas |
| `CK7` | Los textos de cookies respetan el idioma activo en apps multilingües | Apps multilingües |

### `UI_MOTION_CONTRACT.md`

| ID | Condición | Aplica a |
| --- | --- | --- |
| `M1` | Cards equivalentes comparten la misma semántica de elevación | Todas las apps |
| `M2` | Hover no provoca clipping, bordes perdidos ni solapes | Todas las apps |
| `M3` | El borde activo/focus es visible y coherente con el tema | Todas las apps |
| `M4` | CTA primario, secundario y destructivo mantienen semántica estable, incluido foreground y contraste por familia al cambiar de tema | Todas las apps |
| `M5` | Superficies interactivas no mezclan patrones de motion incompatibles en una misma pantalla | Todas las apps |
| `M6` | Cards y surfaces con hover se validan visualmente en escritorio y móvil antes de publicar | Todas las apps |

### `MODAL_CONTRACT.md`

| ID | Condición | Aplica a |
| --- | --- | --- |
| `D1` | Cierre superior derecho claro y accesible | Todas las apps |
| `D2` | Acciones principales visibles en la parte inferior | Todas las apps |
| `D3` | Sin scroll vertical u horizontal evitable | Todas las apps |
| `D4` | Antes de añadir scroll se reorganiza layout, densidad o tamaño del modal | Todas las apps |
| `D5` | El contenido completo se valida visualmente en escritorio y móvil antes de publicar | Todas las apps |
| `D6` | Si no se consigue cumplir visualmente, el cambio no se cierra sin escalar la decisión | Todas las apps |

### `LOCALIZATION_CONTRACT.md`

| ID | Condición | Aplica a |
| --- | --- | --- |
| `L1` | Todos los idiomas soportados por la app son reales, no un toggle cosmético | Apps multilenguaje |
| `L2` | No se mezclan idiomas dentro de la misma experiencia | Apps multilenguaje |
| `L3` | No se dejan strings de producto hardcodeados cuando debe existir i18n | Apps multilenguaje |
| `L4` | El idioma seleccionado persiste correctamente entre pantallas y flujos críticos | Apps multilenguaje |
| `L5` | Los textos clave se revisan en escritorio y móvil en cada idioma soportado | Apps multilenguaje |

### `ANCLORA_TEXT_QUALITY_CONTRACT.md`

| ID | Condición | Aplica a |
| --- | --- | --- |
| `TQ1` | Todo copy visible nuevo o modificado pasa revisión ortográfica, gramatical y semántica antes de cerrar la feature | Todas las apps con copy visible |
| `TQ2` | La humanización elimina IA-ismos, literalismos y grandilocuencia sin cambiar significado ni añadir claims | Todas las apps y documentos |
| `TQ3` | Placeholders, interpolaciones, rutas, claves JSON, variables y nombres propios se preservan durante corrección y localización | Todas las apps |
| `TQ4` | Las superficies públicas validan SEO básico: title, meta description, H1, canonical/hreflang y alt text cuando aplique | Apps, landings y docs públicas |
| `TQ5` | Las superficies públicas validan GEO: entidad clara, descripción factual, schema coherente y diferenciación entre productos | Apps, landings y docs públicas |
| `TQ6` | Las superficies orientadas a búsqueda validan AEO: respuestas directas, FAQs útiles y estructura apta para buscadores conversacionales | Landings, blogs, FAQs y páginas de producto |
| `TQ7` | El resultado del gate se documenta como `PASS`, `PASS_WITH_WARNINGS` o `FAIL` con evidencias | Todas las apps afectadas |

### Contratos AI Act / IA

| ID | Condición | Aplica a |
| --- | --- | --- |
| `AI1` | Toda feature IA relevante tiene propósito, límites, proveedor/modelo y datos tratados documentados | Todas las apps con IA |
| `AI2` | Las salidas generadas o asistidas por IA se identifican de forma contextual cuando aplique | Todas las apps con IA o contenido sintético |
| `AI3` | Las acciones sensibles requieren supervisión humana efectiva y confirmación explícita | Apps con decisiones, exportaciones, sistemas oficiales o comunicaciones externas |
| `AI4` | Los proveedores/modelos IA se registran con datos enviados, retención, región, entrenamiento y estado de revisión | Todas las apps con IA |
| `AI5` | Las features que afecten a empleo, salud, vivienda, crédito, educación, servicios o decisiones legales se bloquean o escalan a revisión legal | Apps con dominios sensibles |
| `AI6` | No se usan claims absolutos de cumplimiento, certificación, sustitución profesional, ahorro garantizado o exención total de responsabilidad | Todas las apps y documentos |

## Contratos de familia

### `ANCLORA_INTERNAL_APP_CONTRACT.md`

| ID | Condición | Aplica a |
| --- | --- | --- |
| `I1` | Shell funcional y denso, priorizando claridad operativa | Apps internas |
| `I2` | Toggles visibles de idioma/tema cuando el contrato de la app lo exija | Apps internas |
| `I3` | Priorización de eficiencia operativa sobre teatralidad visual | Apps internas |

### `ANCLORA_PREMIUM_APP_CONTRACT.md`

| ID | Condición | Aplica a |
| --- | --- | --- |
| `P1` | Topbar, hero, cards y filtros mantienen tratamiento premium consistente | Apps premium |
| `P2` | Densidad controlada en móvil sin sacrificar jerarquía | Apps premium |
| `P3` | Ritmo visual y aire suficientes en claro y oscuro | Apps premium |
| `P4` | Tono premium sin romper contratos universales | Apps premium |
| `P5` | Toggles y controles superiores se integran visualmente con la identidad de la app | Apps premium |
| `P6` | Las variantes premium por tema no cambian arbitrariamente la lectura de botones, pills o CTAs equivalentes | Apps premium |

### `ANCLORA_ULTRA_PREMIUM_APP_CONTRACT.md`

| ID | Condición | Aplica a |
| --- | --- | --- |
| `U1` | Presentación editorial de muy alto nivel | Ultra premium |
| `U2` | Overrides de marca documentados y controlados | Ultra premium |
| `U3` | Cada override ultra premium sigue respetando motion, modal e i18n universales | Ultra premium |

### `ANCLORA_PORTFOLIO_SHOWCASE_CONTRACT.md`

| ID | Condición | Aplica a |
| --- | --- | --- |
| `S1` | Prioridad a conversión, narrativa visual y captación | Portfolio |
| `S2` | CTA y recorrido de showcase coherentes entre landings | Portfolio |
| `S3` | La expresividad visual no rompe legibilidad ni responsive | Portfolio |

## Regla anti-solape

Una condición:
- vive una sola vez en este catálogo
- se asigna a un contrato concreto
- no se reescribe con otra redacción en otro contrato

Si una familia necesita matizar una condición universal:
- la amplía
- no la duplica
- no la contradice

## Uso en auditoría

Para cada app:

1. identificar sus contratos aplicables
2. validar las condiciones por ID
3. registrar el estado en `CONTRACT_COMPLIANCE_MATRIX.md`
4. si una condición cambia, registrarlo en `docs/cambios/CONTRACT_CHANGE_QUEUE.md`
