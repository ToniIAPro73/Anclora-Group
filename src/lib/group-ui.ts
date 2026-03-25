import type { GroupRole } from '@/lib/group-access'

export type GroupLocale = 'es' | 'en' | 'de' | 'fr'
export type GroupTheme = 'dark' | 'light'

const SUPPORTED_LOCALES: GroupLocale[] = ['es', 'en', 'de', 'fr']
const SUPPORTED_THEMES: GroupTheme[] = ['dark', 'light']

type GroupUiMessages = {
  roleLabels: Record<GroupRole, string>
  heroEyebrow: string
  heroTitle: string
  heroBody: string
  appsEyebrow: string
  appsTitle: string
  visibilityInternal: string
  visibilityExternal: string
  architectureEyebrow: string
  architectureTitle: string
  architectureLink: string
  loginEyebrow: string
  loginTitle: string
  loginCardEyebrow: string
  loginCardTitle: string
  usernameLabel: string
  passwordLabel: string
  loginSubmitIdle: string
  loginSubmitBusy: string
  loginErrorFallback: string
}

const messages: Record<GroupLocale, GroupUiMessages> = {
  es: {
    roleLabels: {
      'group-admin': 'Administración corporativa',
      'private-estates-ops': 'Operaciones Private Estates',
      'partner-ops': 'Operaciones de partnership',
      'data-ops': 'Operaciones de Data Lab',
      'content-ops': 'Operaciones de contenido',
      advisory: 'Asesoría AI',
      'growth-ops': 'Operaciones de impulso',
    },
    heroEyebrow: 'Capa corporativa de acceso',
    heroTitle: 'Una única puerta para las aplicaciones internas de Anclora.',
    heroBody:
      'Anclora Group organiza el acceso interno a aplicaciones, equipos, operaciones y herramientas estratégicas mediante una arquitectura unificada y gobernada por roles.',
    appsEyebrow: 'Aplicaciones habilitadas',
    appsTitle: 'Aplicaciones visibles para tu rol',
    visibilityInternal: 'Interna',
    visibilityExternal: 'Externa',
    architectureEyebrow: 'Arquitectura',
    architectureTitle: 'Mapa corporativo actual',
    architectureLink: 'Ver arquitectura de acceso',
    loginEyebrow: 'Portal corporativo interno',
    loginTitle:
      'Entorno corporativo desde el que Anclora organiza el acceso interno a sus aplicaciones, equipos, operaciones y herramientas estratégicas con control por rol y una arquitectura unificada.',
    loginCardEyebrow: 'Acceso seguro',
    loginCardTitle: 'Acceso interno al launcher corporativo',
    usernameLabel: 'Usuario corporativo',
    passwordLabel: 'Contraseña',
    loginSubmitIdle: 'Entrar en Anclora Group',
    loginSubmitBusy: 'Abriendo acceso...',
    loginErrorFallback: 'No se ha podido iniciar la sesión interna.',
  },
  en: {} as GroupUiMessages,
  de: {} as GroupUiMessages,
  fr: {} as GroupUiMessages,
}

messages.en = messages.es
messages.de = messages.es
messages.fr = messages.es

function pickLocale(value: string | undefined): GroupLocale {
  if (!value) return 'es'
  const normalized = value.trim().toLowerCase() as GroupLocale
  return SUPPORTED_LOCALES.includes(normalized) ? normalized : 'es'
}

function pickTheme(value: string | undefined): GroupTheme {
  if (!value) return 'dark'
  const normalized = value.trim().toLowerCase() as GroupTheme
  return SUPPORTED_THEMES.includes(normalized) ? normalized : 'dark'
}

export function getGroupDefaultLocale() {
  return pickLocale(process.env.NEXT_PUBLIC_GROUP_DEFAULT_LOCALE)
}

export function getGroupDefaultTheme() {
  return pickTheme(process.env.NEXT_PUBLIC_GROUP_DEFAULT_THEME)
}

export function getGroupMessages(locale = getGroupDefaultLocale()) {
  return messages[locale]
}

export function getRoleLabels(locale = getGroupDefaultLocale()) {
  return getGroupMessages(locale).roleLabels
}
