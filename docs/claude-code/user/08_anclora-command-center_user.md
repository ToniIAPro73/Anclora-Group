# Anclora Command Center — Guía de Usuario

**Audiencia:** Equipo directivo, arquitectos de sistemas y responsables de producto | **Fecha:** Abril 2026

---

## ¿Qué es Anclora Command Center?

Anclora Command Center es la **bóveda de conocimiento y gobernanza operativa** del ecosistema Anclora. Es el repositorio central donde vive toda la documentación estratégica, operativa y técnica del grupo.

Si necesitas entender cómo funciona Anclora, cómo debe verse o comportarse cualquier aplicación del ecosistema, o cómo se toman las decisiones estratégicas, la respuesta está en Command Center.

---

## ¿Para quién es?

- **Equipo directivo** que necesita acceso a la documentación estratégica
- **Responsables de producto y diseño** que deben seguir los contratos de marca y UX
- **Desarrolladores** antes de tocar la interfaz de cualquier app del ecosistema
- **Agentes AI y asistentes** que trabajan en el desarrollo del ecosistema

---

## Qué contiene

### Contratos UX/UI (en `docs/standards/`)

Los contratos son documentos vinculantes que definen cómo debe verse y comportarse cada aplicación. Antes de modificar cualquier interfaz, debes leer los contratos aplicables:

| Contrato | Para qué sirve |
|----------|----------------|
| Contrato de Grupos del Ecosistema | Define la jerarquía de grupos |
| Contrato de Branding Master | Reglas de identidad visual global |
| Tokens de Color | Paletas oficiales por app |
| Sistema Tipográfico | Tipografías y usos |
| Sistema de Iconos | Reglas de iconografía |
| Especificaciones de Favicon | Favicons por app |
| Contrato de Movimiento | Reglas de animación |
| Contrato de Modales | Patrones de modales |
| Contrato de Localización | Internacionalización |
| Contrato Ultra Premium | Reglas específicas para Private Estates |
| Contrato Premium | Reglas para Synergi, Data Lab |
| Contrato Interno | Reglas para apps internas |

### Documentación Estratégica

- **Mapas de Negocio** (MOCs): visión del negocio, estrategia comercial, stack operativo
- **Playbooks**: guías operativas para procesos clave
- **Research**: investigación y análisis del mercado y de la competencia
- **Sistemas**: documentación de arquitectura de sistemas

### Gobernanza de Cambios

Todo cambio en los contratos o documentos estratégicos sigue un proceso:
1. Registro en la cola de cambios
2. Análisis y planificación
3. Aprobación o rechazo
4. Propagación a los repos afectados

---

## Cómo usar Command Center

### Para consultar documentación

1. Accede al vault (Obsidian o dashboard web)
2. Usa los MOCs como mapa de navegación
3. Los contratos están en `docs/standards/`

### Para proponer cambios

1. Registra el cambio en `docs/cambios/CONTRACT_CHANGE_QUEUE.md`
2. Espera revisión y aprobación
3. Una vez aprobado, el cambio se propaga al ecosistema

### Regla Fundamental

> Los cambios de contratos van PRIMERO a Command Center, LUEGO a los repos de cada app.

Nunca al revés.

---

*Anclora Command Center — Abril 2026*
