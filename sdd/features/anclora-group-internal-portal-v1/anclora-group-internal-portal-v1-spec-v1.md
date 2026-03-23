# Anclora Group Internal Portal v1 Spec

## ID

`anclora-group-internal-portal-v1`

## Objetivo

Definir la primera versión del portal interno `Anclora Group` como entrada única para usuarios corporativos y launcher de aplicaciones internas.

## Alcance

### Incluido

- login interno
- home corporativa
- grid o launcher de apps internas
- visibilidad por rol
- acceso inicial a `Nexus` y `Synergi Backoffice`
- superficie para crecimiento posterior

### Excluido

- diseño de UI detallado
- implementación de SSO completo
- migración completa de todas las herramientas internas
- administración avanzada de identidades

## Personas

- `group-admin`
- `commercial-ops`
- `partner-ops`
- `content-ops`
- `advisory`
- `growth-ops`
- `data-ops`

## Requisitos funcionales

### RF-01 Autenticación interna

El portal debe permitir autenticación para usuarios corporativos autorizados.

### RF-02 Landing corporativa

Tras el login, el usuario debe ver una home interna sobria con acceso a sus aplicaciones.

### RF-03 Launcher por rol

El launcher debe mostrar únicamente las apps permitidas para el rol del usuario.

### RF-04 Catálogo de apps

El portal debe representar un catálogo interno extensible de aplicaciones.

### RF-05 Acceso inicial

La primera versión debe contemplar acceso a `Nexus` y `Synergi Backoffice`.

### RF-06 Separación de perímetros

El portal no debe incorporar elementos de la experiencia pública de `Anclora Private Estates`.

## Criterios de aceptación

- Un usuario autorizado puede entrar al portal interno.
- Un usuario sin permiso no ve apps restringidas.
- `Nexus` y `Synergi Backoffice` aparecen como accesos internos cuando corresponda.
- La home comunica claramente que se trata de un portal corporativo.
- No existe mezcla conceptual con backoffice público o semipúblico.

## Reglas de negocio

- La visibilidad se calcula por rol.
- Las apps no autorizadas no se muestran.
- Las nuevas apps internas deben registrarse antes de exponerse.

## Dependencias

- `sdd/core/product-spec-v0.md`
- `sdd/core/spec-core-v1.md`
- `public/docs/anclora-group-access-architecture-v1.md`

