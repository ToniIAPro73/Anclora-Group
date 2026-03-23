# SDD Handbook

## Qué es esto

Este directorio concentra la documentación viva del producto `Anclora Group` bajo un marco SDD.

## Estructura

- `sdd/core/` contiene la base estable del producto.
- `sdd/features/` contiene especificaciones por iniciativa o versión.
- Cada feature debe tener spec y plan de pruebas.

## Flujo de trabajo

1. Partir del documento de arquitectura fuente.
1. Consolidar visión en `product-spec-v0.md`.
1. Fijar reglas comunes en `spec-core-v1.md`.
1. Definir cada feature con alcance, requisitos y criterios de aceptación.
1. Derivar un `test-plan.md` específico por feature.

## Reglas

- La arquitectura manda sobre los detalles operativos.
- El core spec manda sobre las features.
- Las features no deben contradecir la visión del producto.
- Todo requisito nuevo debe tener trazabilidad con pruebas.

## Naming

- Producto: `Anclora Group`
- Feature example: `anclora-group-internal-portal-v1`
- Spec file: `<feature-id>-spec-v1.md`
- Test file: `test-plan.md`

## Referencias vivas

- Arquitectura base: `public/docs/anclora-group-access-architecture-v1.md`

