# Contract Hierarchy

## Objetivo

Definir la jerarquía contractual del ecosistema Anclora para evitar solapes, contradicciones y excepciones implícitas entre repositorios.

## Capas contractuales

### 1. Contratos universales

Aplican a todas las aplicaciones del ecosistema, sin excepción de familia.

Documentos:
- `contracts/core/ANCLORA_GROUP_BRAND_IP_CONTRACT.md`
- `contracts/core/ANCLORA_REPOSITORY_VISIBILITY_CONTRACT.md`
- `contracts/components/UI_MOTION_CONTRACT.md`
- `contracts/components/MODAL_CONTRACT.md`
- `contracts/logic/LOCALIZATION_CONTRACT.md`
- `contracts/logic/ANCLORA_TEXT_QUALITY_CONTRACT.md`
- `contracts/core/ANCLORA_AI_ACT_COMPLIANCE_BASELINE.md`
- `contracts/core/ANCLORA_AI_RISK_CLASSIFICATION_MATRIX.md`
- `contracts/core/ANCLORA_AI_HUMAN_OVERSIGHT_POLICY.md`
- `contracts/core/ANCLORA_AI_TRANSPARENCY_AND_DISCLOSURE_RULES.md`
- `contracts/core/ANCLORA_MODEL_PROVIDER_REGISTER.md`

Cobertura:
- titularidad de marca, activos intangibles, copyright, marcas derivadas y textos legales base
- visibilidad pública/privada por familia y requisitos antes de publicar repositorios
- motion, hover, elevación, foco, borde y estados interactivos
- estructura y validación de modales
- localización, textos y experiencia multilenguaje
- calidad ortográfica, semántica, humanización, claims y gate SEO/GEO/AEO para copy visible
- validación visual obligatoria en escritorio y móvil antes de publicar cambios de UI
- baseline IA preliminar, transparencia, supervisión humana, clasificación de riesgo y registro de proveedores/modelos IA

### 2. Contratos de familia

Extienden a los universales con gramáticas y expectativas propias del tipo de producto.

Documentos:
- `contracts/core/ANCLORA_ECOSYSTEM_CONTRACT_GROUPS.md`
- `contracts/core/ANCLORA_INTERNAL_APP_CONTRACT.md`
- `contracts/core/ANCLORA_PREMIUM_APP_CONTRACT.md`
- `contracts/core/ANCLORA_ULTRA_PREMIUM_APP_CONTRACT.md`
- `contracts/core/ANCLORA_PORTFOLIO_SHOWCASE_CONTRACT.md`

Cobertura:
- shell general
- densidad, ritmo visual y nivel de sofisticación
- tratamiento del hero, topbar, toggles, filtros, cards y empty states
- reglas de tono y presencia de marca

### 2.3. Entidad Matriz

`anclora-group` se gobierna como entidad matriz y portal corporativo. Mantiene los contratos universales, pero su branding propio se rige por el sistema `ANCLORA_BRANDING_*` y no por una familia de app operativa.

### 2.5. Contratos de branding

Definen la identidad visual transversal del ecosistema y su diferenciación por entidad o familia.

Documentos:
- `contracts/core/ANCLORA_GROUP_BRAND_IP_CONTRACT.md` (contrato legal/operativo de titularidad)
- `contracts/core/ANCLORA_BRANDING_MASTER_CONTRACT.md`
- `docs/standards/ANCLORA_BRANDING_ICON_SYSTEM.md`
- `docs/standards/ANCLORA_BRANDING_COLOR_TOKENS.md`
- `docs/standards/ANCLORA_BRANDING_TYPOGRAPHY.md`
- `docs/standards/ANCLORA_BRANDING_FAVICON_SPEC.md`

Cobertura:
- titularidad legal y operativa de marca
- iconografía y símbolo fundacional
- escalera visual entre entidad única, internas, premium y ultra premium
- tokens de color
- tipografía
- favicon package

### 3. Contratos específicos de aplicación

Sólo se admiten cuando una app necesita una excepción legítima por:
- identidad de marca
- necesidad operativa de dominio
- accesibilidad
- requisito legal o editorial

Las excepciones deben vivir en el `docs/standards/` del repo afectado.

## Regla de precedencia

La precedencia contractual obligatoria es:

1. `UNIVERSAL`
2. `BRAND_IP`
3. `FAMILY`
4. `BRANDING`
5. `APP-SPECIFIC`

Si dos condiciones parecen distintas:
- gana la más específica
- pero sólo si está documentada explícitamente

Si una excepción no está documentada:
- se considera inconsistencia
- no se considera override válido

## Regla anti-solape

Los contratos de familia:
- pueden ampliar
- pueden precisar
- no pueden contradecir la semántica de los universales

Ejemplos:
- Premium puede exigir una topbar más editorial, pero no puede romper la semántica universal del modal.
- Ultra premium puede elevar el nivel de detalle visual, pero no puede eliminar la validación visual obligatoria.
- Portfolio puede usar un hero más expresivo, pero no puede saltarse reglas de localización si soporta varios idiomas.

## Regla de cambios

Un cambio contractual sólo puede clasificarse como contractual si afecta a:
- más de una app
- una familia completa
- un contrato universal
- o una excepción local persistente que deba quedar institucionalizada

Si el cambio es pequeño, puntual y sólo afecta a una pantalla concreta:
- debe quedarse como ajuste de aplicación
- no debe escalarse a contrato salvo decisión explícita

## Flujo de gobierno

1. Detectar el cambio.
2. Clasificarlo como `APP_ONLY` o `CONTRACTUAL`.
3. Si es contractual, registrarlo en `docs/cambios/CONTRACT_CHANGE_QUEUE.md`.
4. Si afecta a condiciones, actualizar también `contracts/governance/CONTRACT_CONDITION_CATALOG.md`.
5. Actualizar primero la bóveda:
   - `docs/standards/`
   - `docs/governance/`
6. Propagar a los repos afectados.
7. Actualizar `contracts/governance/CONTRACT_COMPLIANCE_MATRIX.md`.
8. Mover el cambio a estado `CLOSED` o a histórico.

