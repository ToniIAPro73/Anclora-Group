<!-- markdownlint-disable MD001 MD013 MD033 MD041 MD060 -->

<div align="center">

<img src="./public/brand/anclora-group.png" alt="Anclora Group" width="132" />

# Anclora Group

### Portal corporativo central del ecosistema Anclora

Portal interno que integra arquitectura, gobernanza y documentación de toda la familia de productos Anclora. Diseñado como repositorio de referencia para navegación, control de calidad y trazabilidad operativa.

**Español** · [English](./README.en.md) · [Deutsch](./README.de.md) · [Français](./README.fr.md)

<br />

![Anclora](https://img.shields.io/badge/Anclora-ecosystem-111827)
![Categoría](https://img.shields.io/badge/categor%C3%ADa-Entidad%20Matriz-A8AEB8)
![Idiomas](https://img.shields.io/badge/idioma%20producto-espa%C3%B1ol-047857)

</div>

---

> [!IMPORTANT]
> Repositorio interno corporativo. Describe arquitectura y gobernanza del ecosistema Anclora; no expone datos operativos, credenciales ni lógica sensible fuera de canales autorizados.

## Qué es

Anclora Group es el portal central de la empresa Anclora, que funciona como punto de convergencia para documentación de productos, estándares de marca, y gobernanza técnica. Sirve como referencia única de verdad (SSOT) para arquitectura, trazabilidad y control de calidad en el ecosistema.

## Categoría en el ecosistema

| Campo | Valor |
|---|---|
| Categoría | Entidad Matriz |
| Acento de marca | `#A8AEB8` |
| Tipografía | Georgia / Serif |
| Repositorio canónico | `anclora-group` |

## Funcionalidades principales

- Portal integrado de documentación y gobernanza corporativa
- Navegación centralizada de la familia de productos Anclora
- Secciones del portal: workspace (`/workspace`), catálogo de apps (`/apps`), mapa de arquitectura (`/architecture`) y documentación autenticada (`/docs`)
- Generación automática de documentación en PDF (arquitectura, políticas)
- Gestión de estándares de marca y contratos visuales
- Trazabilidad y auditoría de cambios operativos

## Stack tecnológico

| Área | Tecnología |
|---|---|
| Framework | Next.js 16 |
| Frontend | React 19, TypeScript |
| Utilidades | lucide-react, pdf-lib, sharp |
| Testing | TSX |
| Linting | ESLint 9 |

## Arranque local

```bash
npm install
npm run dev
```

Servidor de desarrollo: `http://127.0.0.1:3005` (puerto autoritativo asignado a este repo en el VPS; sobreescribible con `PORT`/`HOST`, p. ej. `PORT=3100 npm run dev`). `npm run dev` es multiplataforma (Linux/macOS/Windows) a través de `scripts/dev-safe.mjs`, que detiene cualquier `next dev` previo de este repo y limpia el lock de Turbopack antes de arrancar; en Windows delega en `scripts/dev-safe.ps1`.

Flujo canónico en el VPS: `aos up group` (AOS posee el ciclo de vida del proceso; usar `aos restart group`, `aos status group`, `aos logs group`) y abrir `https://dev.anclora.com/proxy/3005/` en el navegador. En desarrollo, `next.config.ts` deriva el base path `/proxy/<puerto>` del puerto del dev server para que CSS, JS, fuentes, imágenes y redirecciones resuelvan a través del proxy de code-server (que elimina el prefijo antes de reenviar); la build de producción sigue sirviendo en `/`. El túnel SSH (`ssh -L`) queda solo como mecanismo alternativo de depuración, no como flujo principal.

Validación local en modo producción (requiere build previo):

```bash
npm run build
npm start
```

`npm start` sirve el build de producción (puerto 3000 por defecto de Next, o `PORT` si se define). No es el comando de desarrollo.

## Idiomas soportados

La interfaz del producto está actualmente disponible solo en español. La infraestructura de localización existe (`es`, `en`, `de`, `fr` en `src/lib/group-ui.ts`), pero los mensajes `en/de/fr` son alias del español y el i18n real es una fase futura. Esta documentación se mantiene en español, inglés, alemán y francés.

## Documentación y gobernanza

- Contratos de marca y gobernanza: [`contracts/`](./contracts/) y [`docs/standards/`](./docs/standards/)
- Guías internas y de usuario: [`docs/claude-code/`](./docs/claude-code/)

---

<div align="center">

### Anclora Group

Uso interno. Portal de gobernanza corporativa del ecosistema Anclora.

</div>
