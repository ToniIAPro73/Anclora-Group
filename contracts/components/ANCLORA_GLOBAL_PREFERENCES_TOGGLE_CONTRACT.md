# ANCLORA_GLOBAL_PREFERENCES_TOGGLE_CONTRACT

## Propósito
Contrato superior de Anclora Group para gobernar preferencias globales visibles:

- idioma
- moneda
- unidades de medida
- tema claro/oscuro/sistema

Este contrato prevalece sobre contratos anteriores cuando haya conflicto. `ANCLORA_LANGUAGE_TOGGLE_CONTRACT.md` conserva la lista de idiomas y `contracts/logic/LOCALIZATION_CONTRACT.md` gobierna la calidad editorial de cada locale activo.

## Familias de controles
Las apps deben separar dos familias:

1. `Global Preferences Toggle`: idioma, moneda y unidades de medida según aplique.
2. `Theme Toggle`: tema claro, oscuro y opcionalmente sistema.

No se debe mezclar tema con idioma, moneda o unidades en el mismo toggle, trigger, modal o dropdown.

## Reglas por grupo

### Ultra Premium
- No muestra `Theme Toggle`.
- Mantiene tema visual cerrado de marca/app.
- Muestra `Global Preferences Toggle`.
- Incluye moneda solo si hay precios, presupuestos, importes, tarifas, costes o valores monetarios.
- Incluye unidades solo si hay superficies, parcelas, hectáreas o medidas relacionadas.

### Premium
- Muestra `Theme Toggle`.
- Muestra `Global Preferences Toggle`.
- Incluye moneda solo si hay importes.
- Incluye unidades solo si hay medidas.
- Tema y preferencias regionales deben estar separados visual y funcionalmente.

### Internal
- Muestra `Theme Toggle`.
- Muestra `Global Preferences Toggle`.
- Incluye moneda/unidades solo si la app las usa.
- Prioriza claridad, accesibilidad y densidad operativa.

### Portfolio
- Muestra `Theme Toggle` salvo decisión explícita contraria.
- Muestra `Global Preferences Toggle` si tiene i18n.
- Moneda y unidades solo si la app las usa.

## Idiomas
La lista autorizada por grupo vive en `ANCLORA_LANGUAGE_TOGGLE_CONTRACT.md`.

Resumen:
- Ultra Premium: ES, CA, DE, EN, SV, FR, IT, DA, NL, NO, PT.
- Premium: ES, CA, EN, DE, FR, IT, PT.
- Internal: ES, CA, EN, DE.
- Portfolio: ES, CA, EN, DE por defecto.

Nexus/Internal no debe mostrar Ruso.

## Moneda
Tipo recomendado:

```ts
export type AncloraCurrency = 'EUR' | 'USD' | 'GBP' | 'CHF' | 'SEK' | 'DKK' | 'NOK'
```

`EUR` es la moneda por defecto salvo decisión explícita de app.

Opciones recomendadas:
- EUR — Euro — €
- USD — US Dollar — $
- GBP — Pound sterling — £
- CHF — Swiss franc — CHF
- SEK — Swedish krona — SEK kr
- DKK — Danish krone — DKK kr
- NOK — Norwegian krone — NOK kr

## Unidades
Tipo recomendado:

```ts
export type AncloraMeasureSystem = 'metric' | 'imperial'
```

Opciones:
- `metric`: Square Meter — m² / Hectare — Ha.
- `imperial`: Square Foot — sqft / Acre — ac.

El trigger compacto debe mostrar la unidad adaptada al idioma activo: `m²`, `Sqm` o `Sqft`.

## Trigger visible
El `Global Preferences Toggle` visible:
- usa icono de mundo a la izquierda;
- muestra solo valores activos que aplican a la app;
- no muestra listas largas ni segmented controls;
- abre modal, popover o panel compacto.

Ejemplos:
- `Español`
- `Español · EUR`
- `Español · EUR · m²`
- `English · USD · Sqft`

## Modal
El modal/popup/panel debe mostrar solo secciones aplicables:
- `Language`
- `Currency`
- `Measure Units`

Debe incluir una acción principal `Guardar y cerrar` / `Save and close` según idioma activo.

## Theme Toggle
- Ultra Premium: no renderizar.
- Premium/Internal/Portfolio: renderizar separado.
- Mínimo: `light` y `dark`.
- Opcional: `system` si la app ya lo soporta.
- Hereda colores, tipografía y radios de la app.

## Persistencia y detección
Prioridad:
1. Preferencia manual persistida.
2. Locale en URL si existe y la app lo usa.
3. Cookie/localStorage existente.
4. `navigator.languages` / `Accept-Language`.
5. Default del grupo: `es`.

No usar Geolocation API precisa. GeoIP solo puede ser señal débil documentada.

## Accesibilidad
- Cierre con Escape.
- Cierre exterior razonable.
- Labels accesibles.
- Navegación por teclado.
- Foco visible.
- Modal/popup sin overflow roto en mobile.

## NO-GO
- Mezclar tema con preferencias regionales.
- Mostrar `Theme Toggle` en Ultra Premium.
- Activar moneda en apps sin importes.
- Activar unidades en apps sin superficies/medidas.
- Forzar todos los idiomas sin localización suficiente.
- Romper header, layout mobile o accesibilidad básica.

