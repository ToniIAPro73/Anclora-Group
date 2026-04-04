# Anclora Group

Entidad matriz y portal corporativo de Anclora para organizar el acceso a aplicaciones, equipos, operaciones y herramientas estratégicas mediante una arquitectura unificada y control por rol.

## MVP incluido

- login corporativo ligero por cookie firmada
- launcher corporativo por rol
- branding base de Anclora Group
- documentación inicial de arquitectura en `public/docs`
- base SDD y sistema de agentes

## Variables de entorno mínimas

```env
ANCLORA_GROUP_SESSION_SECRET=
ANCLORA_GROUP_BOOTSTRAP_USERNAME=
ANCLORA_GROUP_BOOTSTRAP_PASSWORD=
ANCLORA_GROUP_BOOTSTRAP_DISPLAY_NAME=
ANCLORA_GROUP_BOOTSTRAP_ROLE=group-admin
NEXT_PUBLIC_GROUP_DEFAULT_LOCALE=es
NEXT_PUBLIC_GROUP_DEFAULT_THEME=dark
NEXT_PUBLIC_PRIVATE_ESTATES_URL=https://anclora-private-estates.vercel.app/
NEXT_PUBLIC_SYNERGI_INTERNAL_URL=https://anclora-synergi.vercel.app/partner-admissions/login
NEXT_PUBLIC_DATA_LAB_INTERNAL_URL=https://anclora-data-lab.vercel.app/access-requests/login
NEXT_PUBLIC_NEXUS_URL=https://anclora-nexus-frontend.vercel.app/
NEXT_PUBLIC_COMMAND_CENTER_URL=https://anclora-command-center.vercel.app/
NEXT_PUBLIC_CONTENT_GENERATOR_AI_URL=
NEXT_PUBLIC_ADVISOR_AI_URL=
NEXT_PUBLIC_IMPULSO_URL=
```

Opcionalmente puedes usar:

```env
ANCLORA_GROUP_INTERNAL_USERS_JSON=[{"username":"...","password":"...","displayName":"...","role":"group-admin"}]
```

## Preparado para evolución futura

- idioma por defecto centralizado en `NEXT_PUBLIC_GROUP_DEFAULT_LOCALE`
- tema por defecto centralizado en `NEXT_PUBLIC_GROUP_DEFAULT_THEME`
- copy agrupado en `src/lib/group-ui.ts` para facilitar la futura incorporación de toggles de idioma y tema
- `Private Estates` enlaza a las raíces públicas de `Synergi` y `Data Lab`, mientras que `Anclora Group` funciona como entidad matriz y portal corporativo

## Branding

- identidad canónica: `Entidad Matriz`
- tipografía base: `Georgia`
- icono canónico: `/brand/favicon-anclora-group.svg`
- logo canónico actual: `/brand/logo-anclora-group.webp`
- preparado para sustituir los activos finales del usuario sin rehacer el wiring de la app
- contratos de referencia: `ANCLORA_BRANDING_MASTER_CONTRACT.md`, `ANCLORA_BRANDING_ICON_SYSTEM.md`, `ANCLORA_BRANDING_COLOR_TOKENS.md`, `ANCLORA_BRANDING_TYPOGRAPHY.md`, `ANCLORA_BRANDING_FAVICON_SPEC.md`

## Contratos UX/UI

Lectura mínima antes de tocar interfaz:

1. `docs/standards/ANCLORA_ECOSYSTEM_CONTRACT_GROUPS.md`
2. `docs/standards/UI_MOTION_CONTRACT.md`
3. `docs/standards/MODAL_CONTRACT.md`
4. `docs/standards/LOCALIZATION_CONTRACT.md`
5. `docs/standards/ANCLORA_BRANDING_MASTER_CONTRACT.md`
6. `docs/standards/ANCLORA_BRANDING_ICON_SYSTEM.md`
7. `docs/standards/ANCLORA_BRANDING_COLOR_TOKENS.md`
8. `docs/standards/ANCLORA_BRANDING_TYPOGRAPHY.md`
9. `docs/standards/ANCLORA_BRANDING_FAVICON_SPEC.md`
