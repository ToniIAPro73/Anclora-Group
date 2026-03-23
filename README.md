# Anclora Group

Portal corporativo interno de Anclora para organizar el acceso a aplicaciones, equipos, operaciones y herramientas estratégicas mediante una arquitectura unificada y control por rol.

## MVP incluido

- login interno ligero por cookie firmada
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
NEXT_PUBLIC_SYNERGI_URL=https://anclora-synergi.vercel.app/
NEXT_PUBLIC_DATA_LAB_URL=https://anclora-data-lab.vercel.app/
NEXT_PUBLIC_NEXUS_URL=https://anclora-nexus-frontend.vercel.app/
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
