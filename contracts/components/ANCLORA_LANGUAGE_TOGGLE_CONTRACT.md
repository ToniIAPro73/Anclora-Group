# ANCLORA_LANGUAGE_TOGGLE_CONTRACT

## Propósito
Define el contrato global para selectores de idioma, disponibilidad de locales, orden de idiomas y comportamiento de detección inicial en las aplicaciones del ecosistema Anclora Group.

Este contrato queda subordinado a `ANCLORA_GLOBAL_PREFERENCES_TOGGLE_CONTRACT.md` para la estructura visual global: idioma forma parte de `Global Preferences Toggle`, mientras que tema vive siempre en `Theme Toggle` separado.

## Principios
- El idioma por defecto global es Español (`es`), salvo decisión explícita por app.
- La preferencia manual del usuario prevalece siempre.
- No se debe usar geolocalización precisa del navegador como primera opción.
- El selector debe ser consistente en estructura y comportamiento, pero adaptado visualmente a cada app.
- Cada grupo de app tiene una lista autorizada de idiomas.
- Todo idioma mostrado debe tener contenido localizado de calidad suficiente.
- Anclora Locale Copy Guardian debe validar los textos de todos los idiomas activos.

## Grupos e idiomas

### Ultra Premium
Orden:
1. ES — Español
2. CA — Català
3. DE — Deutsch
4. EN — English
5. SV — Svenska
6. FR — Français
7. IT — Italiano
8. DA — Dansk
9. NL — Nederlands
10. NO — Norsk
11. PT — Português

### Premium
Orden:
1. ES — Español
2. CA — Català
3. EN — English
4. DE — Deutsch
5. FR — Français
6. IT — Italiano
7. PT — Português

### Internal
Orden:
1. ES — Español
2. CA — Català
3. EN — English
4. DE — Deutsch

### Portfolio
Propuesta inicial no impuesta si no existe contrato previo:
1. ES — Español
2. CA — Català
3. EN — English
4. DE — Deutsch

## UX objetivo
El patrón recomendado es un trigger compacto de idioma actual que abre un modal o popover de selección.

El antiguo segmented toggle ES/EN/DE solo se permite si la app tiene tres idiomas o menos y no pertenece al grupo Ultra Premium.

Estructura base:
- `LanguageTrigger`
- `LanguageModal` / `LanguagePopover`
- `LanguageOptionList`
- `SaveAndClose`

Extensiones compatibles bajo el contrato superior:
- Language
- Currency
- Measurement units

El tema no es extensión de este selector. Debe permanecer separado.

## Detección inicial
Orden recomendado:
1. Locale en URL.
2. Preferencia persistida en cookie/localStorage.
3. Preferencias del navegador (`navigator.languages` / `Accept-Language`).
4. Fallback al default del grupo: `es`.

## Geolocalización
No usar Geolocation API para decidir idioma inicial salvo consentimiento explícito.
GeoIP server-side puede usarse como señal débil opcional, nunca como imposición.

## Accesibilidad
- El selector debe ser navegable por teclado.
- Debe tener labels accesibles.
- Debe cerrar con Escape.
- Debe permitir foco visible.
- Debe respetar contraste suficiente.

## Relación con Anclora Locale Copy Guardian
Cuando se añade un idioma a un grupo, Locale Copy Guardian debe cubrir ese idioma o marcarlo como pendiente de localización.

La lista de idiomas activos por app viene determinada por este contrato. Locale Copy Guardian debe usar esa lista para saber qué textos revisar, localizar o marcar como pendientes.

## Criterios NO-GO
- Mostrar un idioma sin traducciones suficientes.
- Usar traducciones literales de baja calidad.
- Forzar idioma por país sin opción manual.
- Romper accesibilidad del selector.
- Mezclar idioma, moneda, unidades y tema en un mismo control.
