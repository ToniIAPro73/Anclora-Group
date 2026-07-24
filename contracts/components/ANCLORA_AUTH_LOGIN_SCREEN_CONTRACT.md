# ANCLORA_AUTH_LOGIN_SCREEN_CONTRACT

**Versión:** 1.3.0
**Fecha:** 2026-05-29
**Scope:** Todas las apps Anclora Group con pantalla de login
**Cambios v1.3.0:** Dimensiones definitivas verificadas con regla px: card 460×560px, logo 50px sin contenedor.

---

## Propósito

Definir la estructura visual, funcional y de i18n obligatoria para las pantallas de login de todas las apps del ecosistema Anclora Group. Garantizar coherencia premium entre apps manteniendo la identidad visual de cada una.

---

## Apps afectadas

| App                          | Grupo     | Idiomas                    | OAuth social           |
| ---------------------------- | --------- | -------------------------- | ---------------------- |
| anclora-impulso              | Portfolio | ES, EN                     | No — botones disabled  |
| anclora-energyscan           | Premium   | ES, CA, EN, DE, FR, IT, PT | Sí (Google, GitHub)    |
| anclora-advisor-ai           | Portfolio | ES, EN                     | No — botones disabled  |
| anclora-content-generator-ai | Internal  | ES, CA, EN, DE             | No — botones disabled  |
| anclora-nexus                | Internal  | ES, EN, DE                 | Sí (Google, GitHub)    |

---

## Estructura obligatoria del card

El card de login debe contener, en este orden exacto:

```text
1.  Logo de la aplicación — centrado, 50px, SIN contenedor circular
2.  Divisor — h-px w-[50px] gradiente del acento, mb: 6px
3.  Nombre de la aplicación — text-sm (14px) font-bold, SIN subtítulo
4.  Campo de correo electrónico — label 12px + input 40px
5.  Campo de contraseña — label 12px + input 40px
6.  Icono show/hide password — dentro del campo, right-3
7.  Botón principal de login — h-10 (40px), gradiente del acento
8.  Forgot password — centrado, debajo del botón
9.  No account / Register — box con borde acento/10
10. Separador "Acceso social" + 2 botones Google/GitHub
11. Texto legal — al final del card con links /terms y /privacy
```

**REGLA:** El punto 3 es solo el nombre. Sin "Bienvenido de vuelta" ni subtítulos.

---

## Dimensiones definitivas del card (v1.3.0)

Verificadas con regla de píxeles en producción (Impulso vs Advisor):

```text
CARD
  Width:      460px  (max-w-[460px])
  Height:     560px  (minHeight: 560)
  Border:     rounded-3xl / borderRadius 24px
  Shadow:     0 32px 80px -40px rgba(ACENTO, 0.35–0.45)
  Backdrop:   backdrop-blur-xl

LOGO
  Diámetro:   50px
  Sin contenedor circular — imagen directa con drop-shadow
  mb:         8px bajo el logo
  Divisor:    h-px w-[50px] acento/70, mb: 6px

HEADER (sección logo)
  paddingTop:    32px
  paddingBottom: 20px
  App name:      font-size 14px, font-weight 700

FORM
  paddingTop:    4px
  paddingHoriz:  24px
  paddingBottom: 20px
  gap:           12px
  Labels:        font-size 12px
  Inputs:        height 40px, padding 0 14px
  Button:        height 40px

LINKS (forgot / no-account)
  paddingTop forgot:     10px
  paddingTop noAccount:  10px
  noAccount box:         py-2, rounded-2xl, border acento/10

SOCIAL
  paddingTop: 12px
  Buttons h-9 (36px), grid 2 cols, gap 10px

LEGAL
  padding: 12px 24px 24px
  font-size: 11px
```

---

## Logo — regla definitiva

```text
- Diámetro: 50px exacto
- SIN ningún contenedor circular, anillo ni borde adicional
- La imagen debe mostrarse directamente (como Impulso BrandLogo)
- Si el PNG tiene áreas transparentes: aceptable, el drop-shadow da peso visual
- drop-shadow: drop-shadow(0 12px 24px rgba(0,0,0,0.28–0.32))
- objectFit: contain
```

Referencia: `anclora-impulso/components/brand-logo.tsx` → `<div style={{width:50,height:50}}><Image fill .../></div>`

---

## Efecto hover (elevación hacia el frente)

```text
transform:   scale(1.018)  — hacia el frente, NO translateY
box-shadow:  0 48px 100px -35px rgba(ACENTO, 0.55–0.65)
transition:  0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)
will-change: transform, box-shadow
```

Implementación Tailwind:

```text
hover:scale-[1.018]
hover:shadow-[0_48px_100px_-35px_rgba(ACENTO,0.65)]
transition-[transform,box-shadow] duration-300 ease-out
```

---

## Layout general

```text
- Sin scroll vertical en 1366×768 al 100% zoom
- Footer global EXCLUIDO de rutas /auth/*  →  moverlo a dashboard/layout.tsx
- Outer padding: p-4 (16px)
- Fondo: radial-gradient(acento) + linear-gradient oscuro
- Blobs decorativos: 2–3 divs blur-3xl con color del acento
```

---

## Login social

```text
- SIEMPRE visible (separador + 2 botones)
- Si OAuth activo:     botones funcionales
- Si OAuth inactivo:   disabled, opacity-50, cursor-not-allowed, title="Próximamente"
```

---

## Texto del botón principal — REGLA OBLIGATORIA

El botón de login **siempre** debe mostrar:

| Idioma | Texto          |
| ------ | -------------- |
| ES     | Iniciar sesión |
| CA     | Inicia sessió  |
| EN     | Sign in        |
| DE     | Anmelden       |
| FR     | Se connecter   |
| IT     | Accedi         |
| PT     | Iniciar sessão |

**NO usar** textos como "Entrar al dashboard", "Enter dashboard", "Acceder" ni similares que hagan referencia al destino. El botón de login es siempre "Iniciar sesión" (o equivalente por idioma).

La clave i18n es `auth.signIn` (o equivalente en el sistema de cada repo).

---

## i18n requerido

```text
auth.email, auth.password, auth.showPassword, auth.hidePassword
auth.signIn ("Iniciar sesión" / "Sign in" — ver tabla arriba)
auth.signingIn (estado de carga)
auth.forgotPassword
auth.noAccount, auth.signUp / auth.register
auth.socialAccess, auth.google, auth.github, auth.socialComingSoon
auth.legalPrefix, auth.terms, auth.legalMiddle, auth.privacy, auth.legalSuffix
```

**Eliminadas en v1.1.0:** `auth.welcomeBack`, `auth.signInMessage` — no aparecen en el card.

---

## Accesibilidad

```text
- Labels asociados a inputs (htmlFor)
- aria-label en show/hide password (traducido)
- aria-required="true" en campos obligatorios
- role="alert" en mensajes de error
- Contraste ≥ 4.5:1
```

---

## Excepciones documentadas

| App | Excepción |
|-----|-----------|
| anclora-impulso | OAuth no configurado → botones disabled |
| anclora-advisor-ai | OAuth no configurado → botones disabled |
| anclora-content-generator-ai | OAuth no configurado → botones disabled |

---

## Referencias de implementación

- Referencia visual: `anclora-impulso/components/login-page-content.tsx`
- Referencia logo: `anclora-impulso/components/brand-logo.tsx`
- Hover CSS: `anclora-advisor-ai/src/app/globals.css` → `.login-card-elevation`
- Footer fix: `anclora-impulso/app/dashboard/layout.tsx`
- Tokens shadow: `shadow-[0_32px_80px_-40px_rgba(ACENTO,0.45)]`
- Tokens backdrop: `backdrop-blur-xl`
