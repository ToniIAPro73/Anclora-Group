# Anclora Data Lab — Guía Técnica Interna

**Clasificación:** Interno | **Versión:** 1.1 | **Fecha:** Abril 2026

---

## 1. Propósito y Rol en el Ecosistema

Anclora Data Lab es la **plataforma independiente de inteligencia y activos analíticos** para el ecosistema Anclora Private Estates. Proporciona acceso controlado a inteligencia de mercado para las Islas Baleares (Mallorca, Ibiza, Menorca): tendencias de precios, señales territoriales, indicadores de inversión, documentos curados y packs analíticos privados.

Acceso mediante solicitud y aprobación. No es de acceso libre.

---

## 2. Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|--------|
| Framework | Next.js (App Router) | 16.2.1 |
| Lenguaje | TypeScript | — |
| UI | React | 19.2.4 |
| Base de datos | Neon PostgreSQL (`@neondatabase/serverless`) | — |
| Estilos | Tailwind CSS v4 (PostCSS) | — |
| UI Components | lucide-react, `marked` (markdown rendering) | — |
| Auth | Cookie-based custom (sin librerías terceras) | — |
| i18n | Cookie-based locale (es, en, de) | — |
| Deploy | Vercel | — |

---

## 3. Rutas Principales

| Ruta | Tipo | Descripción |
|------|------|-------------|
| `/` | Pública | Landing dual: solicitar acceso + login |
| `/login` | Pública | Login para usuarios aprobados |
| `/workspace` | Privada (usuario) | Workspace de datos e inteligencia |
| `/access-requests/login` | Interna (admin) | Login al backoffice |
| `/access-requests` | Interna (admin) | Consola de admisiones |

---

## 4. Roles del Sistema

5 roles distintos:

| Rol | Descripción |
|-----|-------------|
| `datalab-admin` | Administrador del backoffice |
| `market-analyst` | Analista de mercado inmobiliario |
| `investment-advisory` | Asesor de inversión |
| `partner-intelligence` | Partner con acceso a inteligencia |
| `investor-viewer` | Inversor con acceso de lectura |

---

## 5. Contenido del Workspace (Secciones)

| Sección | Descripción |
|---------|-------------|
| **Radar institucional** | Señales de mercado y tendencias institucionales |
| **Señales territoriales** | Datos por zona y micro-zona |
| **Biblioteca curada** | Documentos PDF y recursos de referencia |
| **Packs analíticos privados** | Paquetes de inteligencia exclusivos |
| **Alertas** | Alertas operativas y de mercado |

**Cobertura geográfica**: Mallorca (Palma Prime, Suroeste), Ibiza (Ibiza Signature Belt), Menorca.

**Nota**: el contenido está actualmente definido como constantes TypeScript en `src/lib/datalab-content.ts`. Una versión respaldada en base de datos es trabajo futuro.

---

## 6. Internacionalización

3 idiomas vía cookie: `es`, `en`, `de`. Componente `DataLabUiToggles` gestiona la preferencia.

---

## 7. Schema de Base de Datos (Neon PostgreSQL)

Archivo: `db/datalab_access.sql`

| Tabla | Descripción |
|-------|-------------|
| `datalab_access_requests` | Solicitudes de acceso pendientes |
| `datalab_accounts` | Cuentas de usuarios aprobados |

---

## 8. Variables de Entorno Mínimas

```env
DATABASE_URL=
DATALAB_USER_SESSION_SECRET=
DATALAB_ADMIN_USERNAME=
DATALAB_ADMIN_PASSWORD=
DATALAB_ADMIN_SESSION_SECRET=
```

Ver `.env.example` para variables adicionales.

---

## 9. Comandos de Desarrollo

```bash
npm run dev
npm run lint
npm run test
npm run build
```

---

## 10. Branding Canónico

| Token | Valor |
|-------|-------|
| Familia | Premium |
| Accent | Teal/Verde `#2DA078` |
| Borde icono | Cobre `#C07860` |
| Logo prefix | `logo-anclora-datalab` |

---

## 11. Contratos UX/UI

1. `ANCLORA_ECOSYSTEM_CONTRACT_GROUPS.md`
2. `ANCLORA_PREMIUM_APP_CONTRACT.md`
3. `UI_MOTION_CONTRACT.md`
4. `MODAL_CONTRACT.md`
5. `LOCALIZATION_CONTRACT.md`

---

## 12. Relación con el Ecosistema

| App | Relación |
|-----|----------|
| Private Estates | Origen del tráfico de usuarios que solicitan acceso |
| Nexus | Referenciado en la documentación de Nexus (Data Lab selective access service) |
| Anclora Group | Enlazado desde el launcher corporativo (rol `data-ops`) |

---

*Generado por Claude Code — Abril 2026 (v1.1)*
