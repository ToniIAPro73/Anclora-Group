# Anclora Private Estates — Guía Técnica Interna

**Clasificación:** Interno | **Versión:** 1.0 | **Fecha:** Abril 2026

---

## 1. Propósito y Rol en el Ecosistema

Anclora Private Estates es la **plataforma principal** del segmento Ultra Premium. Es la experiencia digital central para compradores e inversores de alto patrimonio. Actúa como destino desde Private Estates Landing y como origen hacia Synergi (partners) y Data Lab (analítica).

---

## 2. Stack Tecnológico

| Capa | Tecnología |
|------|----------|
| Framework | React 19 (Vite SPA) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS |
| Animaciones | GSAP + ScrollTrigger |
| Internacionalización | i18next (es, en, de, fr) |
| Deploy | Vercel |

**Diferencia clave**: Usa **Vite + React SPA** (no Next.js), lo que implica renderizado 100% en cliente. No tiene rutas API ni SSR.

---

## 3. Arquitectura

```
src/
  components/      # Componentes de UI y secciones
  lib/             # Utilidades, hooks y lógica compartida
  locales/         # Traducciones (es, en, de, fr)
public/
  docs/
    ANALISIS.md    # Análisis del producto
    PLAN_MEJORA.md # Plan de mejora
sdd/
  core/            # Specs core del producto
  features/        # Specs por feature (ej: ANCLORA-MENU-002)
.agent/
  rules/           # Reglas de gobernanza de agentes
  skills/features/ # Skills por feature
docs/
  standards/       # Contratos UX/UI
```

### Internacionalización

i18next con 4 idiomas: `es`, `en`, `de`, `fr`. Único en el ecosistema en tener de/fr.

### Animaciones

GSAP + ScrollTrigger para animaciones de entrada y scroll. Deben seguir `UI_MOTION_CONTRACT.md`.

### Feature Activa Reciente

- `ANCLORA-MENU-002`: menú overlay rediseñado — enfoque limpio y jerárquico (sin cards)

---

## 4. Gobernanza de Features (SDD)

```
1. Crear spec en sdd/features/<nombre>/
2. Seguir reglas de .agent/rules/
3. Implementar respetando contratos UX/UI
4. Validar: npm run lint && npm run test
```

---

## 5. Comandos de Desarrollo

```bash
npm install
npm run dev
npm run build
npm run lint
npm run test
npm run preview
```

---

## 6. Branding Canónico

| Token | Valor |
|-------|-------|
| Familia | Ultra Premium |
| Accent | Oro `#D4AF37` |
| Fondo base | `#07252F` |
| Secundario | Teal `#3AA090` |
| Tipografía display | Cardo |
| Tipografía UI | Inter |
| Tipografía acentos | Fraunces |
| Prefijo favicon | `pe_` |

---

## 7. Contratos UX/UI Aplicables

1. `ANCLORA_ECOSYSTEM_CONTRACT_GROUPS.md`
2. `ANCLORA_ULTRA_PREMIUM_APP_CONTRACT.md`
3. `UI_MOTION_CONTRACT.md`
4. `MODAL_CONTRACT.md`
5. `LOCALIZATION_CONTRACT.md`

---

## 8. Integraciones

| App | Tipo de integración |
|-----|---------------------|
| Synergi | Enlace al portal de partners |
| Data Lab | Enlace al workspace de analítica |
| Private Estates Landing | Recibe tráfico desde la landing |

---

## 9. Notas de Seguridad

- SPA pura: NO hay SSR. Todo procesamiento sensible debe ir a APIs externas.
- Los idiomas de/fr amplían el alcance de mercado; revisar textos nativamente.
- Los activos de marca finales (prefijo `pe_`) están pendientes.

---

*Generado por Claude Code — Abril 2026*
