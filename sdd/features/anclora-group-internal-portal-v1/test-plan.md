# Test Plan - Anclora Group Internal Portal v1

## Objetivo

Validar que el portal interno cumple con acceso seguro, visibilidad por rol y separación de perímetros.

## Cobertura

### Happy path

- login correcto de usuario autorizado
- visualización de home corporativa
- aparición de apps permitidas
- entrada a `Nexus`
- entrada a `Synergi Backoffice`

### Permisos

- usuario con rol limitado solo ve sus apps
- usuario sin permiso no ve accesos no autorizados
- apps ocultas no aparecen en el launcher

### Negativos

- credenciales inválidas
- sesión no autorizada
- intento de acceso a app restringida
- ausencia de catálogo o permisos incompletos

### Regresión

- el portal no debe exponer accesos públicos
- el portal no debe reciclar narrativa de `Private Estates`
- el launcher debe seguir siendo coherente al añadir una nueva app

## Casos de prueba mínimos

- TP-01 Autenticación exitosa de usuario corporativo.
- TP-02 Autenticación fallida por credenciales inválidas.
- TP-03 Render de launcher según rol `group-admin`.
- TP-04 Render de launcher según rol restringido.
- TP-05 Acceso a `Nexus` desde el portal.
- TP-06 Acceso a `Synergi Backoffice` desde el portal.
- TP-07 Ocultación de apps no autorizadas.
- TP-08 Verificación de separación respecto a accesos públicos.

## Criterios de aprobación

- Todos los casos críticos pasan.
- Ningún caso de permisos falla.
- No aparecen accesos fuera de rol.
- El producto mantiene separación clara entre interno y público.

