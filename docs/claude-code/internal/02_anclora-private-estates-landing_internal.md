# Anclora Private Estates Landing — Guía Técnica Interna

**Clasificación:** Interno | **Versión:** 1.0 | **Fecha:** Abril 2026

---

## 1. Propósito y Rol en el Ecosistema

Anclora Private Estates Landing es la **landing page de captación** del segmento Ultra Premium. Su función primaria es presentar la marca Anclora Private Estates al mercado de lujo, captar leads de compradores e inversores de alto patrimonio, y redirigir tráfico cualificado a la aplicación principal Anclora Private Estates. Es la primera puerta de entrada para el cliente Ultra Premium.

| Parámetro | Valor |
|-----------|-------|
| Grupo de branding | Ultra Premium |
| Relación | Landing → Anclora Private Estates (app principal) |
| Repo | ToniIAPro73/anclora-private-estates-landing |
| Idiomas esperados | es, en, de, fr |

---

## 2. Stack Esperado

| Capa | Tecnología |
|------|----------|
| Framework | Next.js / React |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS |
| Animaciones | GSAP / ScrollTrigger |
| Internacionalización | i18next (es, en, de, fr) |
| Deploy | Vercel |

---

## 3. Branding Canónico

| Token | Valor |
|-------|-------|
| Familia | Ultra Premium |
| Accent | Oro `#D4AF37` |
| Fondo base | `#07252F` |
| Secundario | Teal `#3AA090` |
| Tipografía display | Cardo (serif) |
| Tipografía UI | Inter |
| Tipografía acentos | Fraunces |
| Prefijo favicon | `pe_` |
| Estado activos | Pendientes de entrega final |

---

## 4. Contratos UX/UI Aplicables

1. `ANCLORA_ECOSYSTEM_CONTRACT_GROUPS.md`
2. `ANCLORA_ULTRA_PREMIUM_APP_CONTRACT.md`
3. `ANCLORA_BRANDING_MASTER_CONTRACT.md`
4. `UI_MOTION_CONTRACT.md`
5. `MODAL_CONTRACT.md`
6. `LOCALIZATION_CONTRACT.md`

---

## 5. Integración con el Ecosistema

- **CTA principal** → enlaza a Anclora Private Estates (app principal)
- **Formulario de captación** → potencialmente conectado a HubSpot u otro CRM (ver patrón de Azure Bay Landing)
- **Branding** → comparte sistema visual con Anclora Private Estates

---

## 6. Notas para Desarrolladores

- Esta landing y la app principal comparten identidad visual; cualquier cambio de branding debe aplicarse coordinadamente a ambas
- La jerarquía de contratos dicta que los cambios de marca van primero a Command Center, luego se propagan
- Los activos finales (icono, favicon prefijo `pe_`) están pendientes de entrega

---

*Generado por Claude Code — Abril 2026*
