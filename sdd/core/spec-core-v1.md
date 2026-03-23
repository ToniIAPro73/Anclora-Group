# Anclora Group Core Spec v1

## Propósito

Establecer la base funcional, estructural y de gobernanza para todo trabajo documental y de producto de `Anclora Group`.

## Principios

- Separación estricta entre público e interno.
- Portal corporativo único para apps internas.
- Acceso por rol y visibilidad mínima necesaria.
- Documentación trazable antes de ejecución.

## Arquitectura funcional

- `auth`: autenticación interna corporativa.
- `launcher`: superficie principal de aplicaciones.
- `access-control`: permisos por rol y por app.
- `app-registry`: catálogo de aplicaciones internas.
- `activity`: estado de sesión y acceso reciente, si aplica.

## Reglas de producto

- El portal no debe exponer herramientas no autorizadas.
- Ningún acceso interno debe depender de una narrativa pública.
- Toda nueva app debe declarar dueño funcional y rol requerido.
- Las decisiones de permisos deben ser explícitas.

## Modelo de roles base

- `group-admin`
- `commercial-ops`
- `partner-ops`
- `content-ops`
- `advisory`
- `growth-ops`
- `data-ops`

## Reglas de visibilidad

- El usuario solo ve apps autorizadas.
- El usuario solo ve módulos habilitados por rol.
- Los enlaces ocultos no deben formar parte del diseño conceptual.

## Criterios de calidad

- coherencia terminológica
- escalabilidad documental
- trazabilidad entre spec y test plan
- separación de responsabilidades

## Dependencias

- Arquitectura base del ecosistema: `public/docs/anclora-group-access-architecture-v1.md`
- Specs de feature bajo `sdd/features/`

