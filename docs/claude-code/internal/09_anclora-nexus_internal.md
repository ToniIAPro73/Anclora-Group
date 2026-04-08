# Anclora Nexus — Guía Técnica Interna

**Clasificación:** Interno | **Versión:** 1.0 | **Fecha:** Abril 2026

---

## 1. Propósito y Rol en el Ecosistema

Anclora Nexus es el **workspace operativo interno** del ecosistema Anclora. Es la aplicación de trabajo diario para el equipo interno: gestión de operaciones, seguimiento de proyectos, y coordinación de actividades del grupo en el contexto Real Estate.

No es de cara al cliente externo. Es el espacio de trabajo del equipo Anclora.

---

## 2. Stack Tecnológico

| Capa | Tecnología |
|------|----------|
| Framework | Next.js (App Router) |
| Lenguaje | TypeScript |
| Tema operativo | Dark |
| Idiomas activos | es, en, de, ru |
| Frontend | `/frontend/` (subdirectorio) |
| Deploy | Vercel (anclora-nexus-frontend.vercel.app) |

**Estructura de repo**: El frontend vive en `/frontend/`. El root del repo contiene gobernanza SDD y configuración de agentes.

---

## 3. Estructura del Repositorio

```
frontend/          # Aplicación Next.js principal
  src/
    app/           # App Router — páginas
    components/    # Componentes de UI
    lib/           # Utilidades
sdd/
  contracts/       # Contratos SDD específicos de Nexus
.agent/
  rules/           # Reglas de gobernanza de agentes
docs/
  standards/       # Contratos UX/UI
```

---

## 4. Comandos de Desarrollo

```bash
npm run dev              # Arranca el frontend en desarrollo
npm run build            # Build del frontend
npm run frontend:lint    # Linting del frontend
```

---

## 5. Internacionalización

Nexus opera en 4 idiomas: `es`, `en`, `de`, `ru`. El idioma ruso (`ru`) lo diferencia del resto del ecosistema y refleja un mercado objetivo específico (compradores/inversores rusos en el segmento de lujo).

---

## 6. Branding Canónico

| Token | Valor |
|-------|-------|
| Familia | Interna |
| Tipografía principal | Inter |
| Accent | Oro `#D4AF37` |
| Fondo dark base | `#0F1629`, `#141C3A`, `#192350` |
| Tema | Dark (obligatorio; light es posible futuro) |
| Estado activos finales | Pendientes de integración |

---

## 7. Contratos UX/UI

1. `ANCLORA_ECOSYSTEM_CONTRACT_GROUPS.md`
2. `ANCLORA_INTERNAL_APP_CONTRACT.md`
3. `UI_MOTION_CONTRACT.md`
4. `MODAL_CONTRACT.md`
5. `LOCALIZATION_CONTRACT.md`

Además, Nexus mantiene contratos específicos en `sdd/contracts/`.

---

## 8. Contratos SDD de Nexus

Nexus tiene su propio conjunto de contratos SDD en `sdd/contracts/` que concretan la implementación interna del grupo `Internal`. Estos documentos están vigentes y complementan los contratos globales.

---

## 9. URL de Producción

https://anclora-nexus-frontend.vercel.app

---

*Generado por Claude Code — Abril 2026*
