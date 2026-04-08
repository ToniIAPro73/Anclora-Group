# Anclora Data Lab — Guía Técnica Interna

**Clasificación:** Interno | **Versión:** 1.0 | **Fecha:** Abril 2026

---

## 1. Propósito y Rol en el Ecosistema

Anclora Data Lab es la **aplicación de inteligencia y activos analíticos** de Anclora Private Estates. Proporciona acceso controlado a datos de mercado, métricas y analítica inmobiliaria para perfiles autorizados (analistas, inversores, equipo interno).

**Modelo de acceso:**
- Interfaz pública dual para solicitar acceso o hacer login
- Solo cuentas reales creadas en BD al aprobar una solicitud
- Backoffice interno para gestión de admisiones

---

## 2. Stack Tecnológico

| Capa | Tecnología |
|------|----------|
| Framework | Next.js (App Router) |
| Lenguaje | TypeScript |
| Base de datos | Neon PostgreSQL |
| Auth | Cookies firmadas (server-side) |
| Deploy | Vercel |

---

## 3. Rutas Principales

| Ruta | Tipo | Descripción |
|------|------|-------------|
| `/` | Pública | Acceso público dual: solicitar acceso + login |
| `/login` | Pública | Login para usuarios aprobados |
| `/access-requests/login` | Interna (admin) | Login al backoffice de revisiones |
| `/access-requests` | Interna (admin) | Consola interna de admisiones |
| `/workspace/*` | Privada (usuario aprobado) | Workspace de datos y analítica |

---

## 4. Variables de Entorno Mínimas

```env
DATABASE_URL=                    # Neon PostgreSQL connection string
DATALAB_USER_SESSION_SECRET=     # Secreto para sesiones de usuario
DATALAB_ADMIN_USERNAME=          # Usuario del backoffice interno
DATALAB_ADMIN_PASSWORD=          # Contraseña del backoffice
DATALAB_ADMIN_SESSION_SECRET=    # Secreto para sesiones del admin
```

Para más variables, ver `.env.example` en el repo.

---

## 5. Base de Datos

- Esquema base SQL: `db/datalab_access.sql`
- Entidades principales:
  - `access_requests`: solicitudes pendientes de acceso
  - `datalab_users`: usuarios aprobados con credenciales

---

## 6. Comandos de Desarrollo

```bash
npm run dev
npm run lint
npm run test
npm run build
```

---

## 7. Estructura de Directorios Relevante

```
src/
  app/
    api/                # Endpoints de admisión y acceso
    access-requests/    # Panel backoffice
    login/              # Página de login de usuarios
    workspace/          # Workspace de datos
db/
  datalab_access.sql    # Esquema SQL base
docs/
  standards/            # Contratos UX/UI
```

---

## 8. Branding Canónico

| Token | Valor |
|-------|-------|
| Familia | Premium |
| Contratos aplicables | `ANCLORA_PREMIUM_APP_CONTRACT.md` |

---

## 9. Contratos UX/UI

1. `ANCLORA_ECOSYSTEM_CONTRACT_GROUPS.md`
2. `ANCLORA_PREMIUM_APP_CONTRACT.md`
3. `UI_MOTION_CONTRACT.md`
4. `MODAL_CONTRACT.md`
5. `LOCALIZATION_CONTRACT.md`

---

## 10. Relación con el Ecosistema

| App | Tipo de relación |
|-----|------------------|
| Private Estates | Origen de tráfico (usuarios de PE que solicitan acceso) |
| Anclora Group | Enlazado desde el launcher corporativo |
| Command Center | Gobernanza de contratos |

---

*Generado por Claude Code — Abril 2026*
