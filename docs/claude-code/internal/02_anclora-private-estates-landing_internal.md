# Anclora Private Estates Landing — Guía Técnica Interna

**Clasificación:** Interno | **Versión:** 1.1 | **Fecha:** Abril 2026

---

## 1. Propósito y Rol en el Ecosistema

Anclora Private Estates Landing es la **landing page de captación** del segmento Ultra Premium. Su función primaria es presentar la marca Anclora Private Estates al mercado de lujo, captar leads de compradores, vendedores e inversores de alto patrimonio, y redirigir tráfico cualificado a la aplicación principal Anclora Private Estates. Es la primera puerta de entrada para el cliente Ultra Premium.

| Parámetro | Valor |
|-----------|-------|
| Grupo de branding | Ultra Premium |
| Relación | Landing → Anclora Private Estates (app principal) |
| Repo | ToniIAPro73/anclora-private-estates-landing |
| Idiomas soportados | es, en, de, fr |

---

## 2. Stack Técnico Real

| Capa | Tecnología |
|------|-----------|
| Framework | React 19 (SPA) |
| Bundler | Vite 7.x |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS |
| Testing | Vitest + @testing-library/react |
| Internacionalización | Custom (`src/content/site-copy.ts`) + localStorage (`ape:language`) |
| Deploy | Vercel |

> **Nota:** No usa Next.js, GSAP ni i18next. La internacionalización es propia: el contenido de todos los idiomas vive en `src/content/site-copy.ts` (~72 KB) y el idioma activo se persiste en `localStorage` con la clave `ape:language`.

---

## 3. Estructura del Proyecto

```
src/
├── app/
│   ├── App.tsx           ← Componente raíz, orquesta secciones e i18n
│   ├── App.test.tsx
│   └── main.tsx
├── sections/             ← Secciones de la landing (orden de render)
│   ├── HeroSection.tsx
│   ├── CredibilitySection.tsx
│   ├── MallorcaFocusSection.tsx
│   ├── InvestorSection.tsx
│   ├── SellerIntakeSection.tsx
│   ├── PartnersSynergiSection.tsx
│   ├── DataLabSignalsSection.tsx
│   ├── ContactSection.tsx
│   ├── FinalCTASection.tsx
│   └── ValuationRequestSection.tsx   ← En desarrollo
├── components/
│   └── layout/
│       ├── PENavbar.tsx
│       ├── PEFooter.tsx
│       ├── SocialSidebar.tsx
│       ├── FloatingControls.tsx
│       └── CookieBanner.tsx
├── content/
│   └── site-copy.ts      ← Fuente de verdad del contenido (es/en/de/fr)
├── i18n/                 ← Reservado (vacío, no usa i18next)
├── lib/                  ← Utilidades
├── styles/               ← Tokens y estilos
└── test/
docs/
├── architecture/         ← Mapeo técnico y orden de secciones
├── qa/                   ← Checklist de lanzamiento
└── strategy/             ← Posicionamiento, SEO, conversión
```

---

## 4. Variables de Entorno

| Variable | Descripción |
|----------|-------------|
| `VITE_ANCLORA_NEXUS_BASE_URL` | Base URL de la API de Anclora Nexus (ej. `https://nexus.anclora.group`) |
| `VITE_RECAPTCHA_SITE_KEY` | Site key de Google reCAPTCHA (para ValuationRequestForm) |

---

## 5. Secciones de la Landing (Orden de Render)

| Sección | Descripción |
|---------|-------------|
| `HeroSection` | Cabecera principal con propuesta de valor y CTA primario |
| `CredibilitySection` | Indicadores de autoridad y trayectoria |
| `MallorcaFocusSection` | Autoridad territorial en Mallorca (Palma y suroeste) |
| `InvestorSection` | Captación de inversores de alto patrimonio |
| `SellerIntakeSection` | Captación de propietarios exclusivos |
| `PartnersSynergiSection` | Acceso selectivo a Synergi (portal de partners) |
| `DataLabSignalsSection` | Señales de inteligencia de mercado → acceso a Data Lab |
| `ContactSection` | Formulario de contacto y solicitud de información privada |
| `FinalCTASection` | CTA final hacia la app principal Private Estates |
| `ValuationRequestSection` | *(En desarrollo)* Solicitud de valoración de propiedad → Nexus API |

---

## 6. Branding Canónico

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
| Theme | `dark` (forzado en `<html data-theme="dark">`) |

---

## 7. Contratos UX/UI Aplicables

1. `ANCLORA_ECOSYSTEM_CONTRACT_GROUPS.md`
2. `ANCLORA_ULTRA_PREMIUM_APP_CONTRACT.md`
3. `ANCLORA_BRANDING_MASTER_CONTRACT.md`
4. `UI_MOTION_CONTRACT.md`
5. `MODAL_CONTRACT.md`
6. `LOCALIZATION_CONTRACT.md`

---

## 8. Integración con el Ecosistema

- **CTA principal** → enlaza a Anclora Private Estates (app principal)
- **PartnersSynergiSection** → acceso a Anclora Synergi (portal de partners)
- **DataLabSignalsSection** → señales hacia Anclora Data Lab
- **Formularios de captación** → envían leads a **Anclora Nexus** vía `VITE_ANCLORA_NEXUS_BASE_URL`
- **ValuationRequestSection** *(en desarrollo)* → `POST` a Nexus API con reCAPTCHA v2

---

## 9. Notas para Desarrolladores

- Esta landing y la app principal comparten identidad visual; cualquier cambio de branding debe aplicarse coordinadamente a ambas
- La jerarquía de contratos dicta que los cambios de marca van primero a Command Center, luego se propagan
- El contenido de todos los idiomas se gestiona íntegramente en `site-copy.ts`; no añadir dependencias de i18n sin consenso del equipo
- El theme oscuro se fuerza mediante `document.documentElement.dataset.theme = "dark"` en el `useEffect` de `App.tsx`

---

*Generado por Claude Code — Abril 2026 | Actualizado v1.1 con stack real verificado*
