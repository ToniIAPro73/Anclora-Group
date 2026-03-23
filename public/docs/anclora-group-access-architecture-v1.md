# Anclora Group Access Architecture v1

Fecha: 2026-03-23  
Estado: propuesta de arquitectura de accesos y transición

## 1. Problema actual

Hoy conviven en `Anclora Private Estates` accesos de naturaleza distinta:
- accesos externos o semiexternos del ecosistema
- accesos internos corporativos
- backoffices operativos

Esto genera tres problemas:
- mezcla de perímetros de seguridad
- narrativa de producto confusa
- ausencia de una puerta profesional para herramientas internas

Además, `Synergi` ya tiene un backoffice de admisiones, pero no existe una vía visible, coherente y corporativa para que el equipo interno llegue a él.

## 2. Principio rector

Separar claramente:
- **hub externo del ecosistema**
- **apps de producto**
- **portal interno corporativo**

La regla base propuesta es:
- `Private Estates` no debe funcionar como intranet
- los backoffices no deben colgar de la experiencia pública
- las apps internas deben vivir bajo un portal corporativo único

## 3. Recomendación principal

### 3.1. Capa pública / ecosistema

`Anclora Private Estates` debe quedarse como puerta premium externa del ecosistema.

Accesos recomendados:
- `Portal de Partners` -> `Anclora Synergi`
- `Anclora Data Lab` -> `Anclora Data Lab`

Accesos no recomendados en esta capa:
- `Portal de Agente`
- backoffice de `Synergi`
- `Content Generator AI`
- `Advisor AI`
- `Impulso`

Motivo:
- todos esos accesos pertenecen a operación interna o semiprivada corporativa, no a la experiencia pública de `Private Estates`

### 3.2. Capa de producto

Cada app de producto debe tener su propia identidad y sus propios accesos:
- `Anclora Synergi`
  - home pública mixta
  - login partner
  - workspace partner
  - backoffice interno de admisiones
- `Anclora Data Lab`
  - home pública o semiprivada
  - login / acceso controlado
  - módulos de inteligencia y documentos
- `Anclora Nexus`
  - operación interna comercial
  - CRM / pipeline / ejecución interna

### 3.3. Capa interna corporativa

Crear un portal nuevo:
- `Anclora Group`

Este portal será la entrada única para empleados y equipo interno.

Funciones:
- autenticación corporativa
- launcher de aplicaciones internas
- control por rol
- superficie de acceso unificada
- separación entre herramientas internas y experiencia pública

### 3.4. Estructura corporativa completa

Para evitar ambigüedad entre marca corporativa, unidades de negocio y herramientas internas, la estructura recomendada queda definida así:

- `Anclora Group`
  - holding y marca corporativa madre
  - concentra gobierno, identidad institucional, acceso interno y coherencia transversal del ecosistema
  - actúa como paraguas de relación entre unidades de negocio, producto y operaciones
- `Anclora Private Estates`
  - marca pública premium orientada a la experiencia externa del ecosistema inmobiliario y relacional
  - canaliza el acceso de clientes, partners y audiencias externas
  - no debe absorber funciones de intranet ni de operación interna
- `Anclora Synergi`
  - plataforma de relación y activación para partners
  - concentra flujos de admisión, seguimiento y colaboración con perfiles externos autorizados
  - su backoffice operativo pertenece a la capa interna de `Anclora Group`
- `Anclora Data Lab`
  - unidad de inteligencia, análisis y documentación
  - agrupa exploración de datos, lectura estratégica y superficies de conocimiento
  - puede ofrecer vistas públicas controladas o acceso restringido según el caso de uso
- `Anclora Nexus`
  - núcleo operativo interno
  - conecta ejecución comercial, coordinación y seguimiento de actividad
  - es una herramienta corporativa y debe vivir bajo `Anclora Group`
- `Anclora Content Generator AI`
  - herramienta interna de generación asistida de contenidos
  - soporta copy, variaciones editoriales y producción de materiales para equipos autorizados
  - su acceso debe ser estrictamente corporativo
- `Anclora Advisor AI`
  - capa interna de asistencia estratégica y recomendación
  - ayuda a sintetizar información, orientar decisiones y preparar respuestas de alto nivel
  - no se presenta como producto público independiente
- `Anclora Impulso`
  - iniciativa interna de crecimiento, activación y empuje comercial
  - reúne acciones de aceleración, campañas, soporte a conversión y dinamización operativa
  - debe quedar visible solo para perfiles con necesidad real de uso

## 4. Aplicaciones que deberían colgar de Anclora Group

Primera versión recomendada:
- `Anclora Nexus`
- `Synergi Backoffice`
- `Anclora Content Generator AI`
- `Anclora Advisor AI`
- `Anclora Impulso`
- `Data Lab Backoffice` si existe o aparece

Más adelante:
- observability interna
- analytics corporativo
- herramientas de soporte y operaciones

## 5. Roles recomendados

### 5.1. Roles corporativos base

- `group-admin`
  - acceso completo al launcher y a la administración del portal interno
- `commercial-ops`
  - acceso a `Nexus`, `Synergi Backoffice`, reporting comercial
- `partner-ops`
  - acceso a admisiones, activaciones y soporte de `Synergi`
- `content-ops`
  - acceso a `Content Generator AI`
- `advisory`
  - acceso a `Advisor AI`
- `growth-ops`
  - acceso a `Impulso`
- `data-ops`
  - acceso a superficies internas de `Data Lab`

### 5.2. Regla de visibilidad

Cada usuario debe ver solo:
- aplicaciones a las que tiene permiso
- módulos habilitados por rol
- accesos internos necesarios para su función

No se recomienda mostrar iconos o enlaces de aplicaciones no autorizadas.

## 6. UX recomendada

### 6.1. Private Estates

`Área Privada` debería convertirse en una capa de acceso **externo** y no **interno**.

Quedaría así:
- `Portal de Partners`
- `Anclora Data Lab`

Opcional:
- `Portal de Agente` solo si se redefine como acceso realmente externo y no intranet comercial

### 6.2. Anclora Group

Home interna recomendada:
- cabecera sobria y corporativa
- grid premium de aplicaciones internas
- visibilidad dinámica por rol
- estado de sesión
- quizá un pequeño bloque de alertas o accesos recientes

Ejemplo de tarjetas:
- `Nexus`
- `Synergi Backoffice`
- `Content Generator AI`
- `Advisor AI`
- `Impulso`
- `Data Lab Ops`

### 6.3. Synergi

El backoffice de admisiones no debería promocionarse en la parte pública.

Acceso recomendado:
- desde `Anclora Group` -> tarjeta `Synergi Backoffice`

Acceso provisional mientras `Anclora Group` no exista:
- mantener `/partner-admissions/login`
- no enlazarlo públicamente
- usar bookmark interno o acceso documentado solo para el equipo

## 7. Alternativas evaluadas

### Opción A. Mantener todo dentro de Private Estates

Ventajas:
- implementación rápida

Problemas:
- mezcla de públicos
- peor seguridad conceptual
- mala escalabilidad
- sensación de “portal híbrido” poco claro

Veredicto:
- no recomendado

### Opción B. Crear un portal pequeño de operaciones

Ejemplos:
- `Anclora Ops`
- `Anclora Staff Portal`

Ventajas:
- más rápido que construir una visión de grupo completa

Problemas:
- probablemente terminaría evolucionando igualmente hacia `Anclora Group`
- introduce un nombre intermedio que puede caducar pronto

Veredicto:
- aceptable como transición, pero no ideal si ya está claro que habrá varias apps internas

### Opción C. Crear directamente Anclora Group

Ventajas:
- arquitectura limpia
- narrativa corporativa sólida
- escalabilidad real
- mejor gobierno de accesos

Veredicto:
- opción recomendada

## 8. Propuesta de transición

### Fase 1. Ordenar Private Estates

Objetivo:
- dejar `Private Estates` como hub externo

Acciones:
- mantener `Portal de Partners`
- mantener `Anclora Data Lab`
- evaluar salida de `Portal de Agente` hacia `Anclora Group`

### Fase 2. Diseñar Anclora Group

Objetivo:
- crear el portal interno corporativo mínimo viable

MVP:
- login interno
- launcher por rol
- tarjetas de apps
- acceso a `Nexus` y `Synergi Backoffice`

### Fase 3. Mover accesos internos

Objetivo:
- sacar de `Private Estates` todo lo interno

Mover:
- `Nexus`
- `Synergi Backoffice`
- resto de herramientas corporativas

### Fase 4. Consolidar roles y SSO

Objetivo:
- centralizar autenticación y permisos

Acciones:
- definir catálogo de roles
- mapear permisos por app
- preparar un SSO corporativo si se decide

## 9. Recomendación ejecutiva

La solución más profesional y escalable es:

- `Anclora Private Estates`
  - hub externo premium del ecosistema
- `Anclora Synergi`
  - app de partners
- `Anclora Data Lab`
  - app analítica
- `Anclora Nexus`
  - app operativa interna
- `Anclora Group`
  - portal interno corporativo para empleados y herramientas internas

## 10. Siguiente paso recomendado

Crear como próxima pieza formal:
- `anclora-group-internal-portal-v1`

Su alcance inicial debería cubrir:
- arquitectura funcional
- identidad visual
- roles
- launcher de apps internas
- acceso inicial a `Nexus` y `Synergi Backoffice`
