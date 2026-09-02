import type { GroupAppKind, GroupRole } from '@/lib/group-access'

export type GroupLocale = 'es' | 'en' | 'de' | 'fr'

const SUPPORTED_LOCALES: GroupLocale[] = ['es', 'en', 'de', 'fr']

type GroupUiMessages = {
  roleLabels: Record<GroupRole, string>
  kindLabels: Record<GroupAppKind, string>
  heroEyebrow: string
  heroTitle: string
  heroBody: string
  appsEyebrow: string
  appsTitle: string
  visibilityInternal: string
  visibilityExternal: string
  statusPaused: string
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
  navWorkspace: string
  navApps: string
  navArchitecture: string
  navDocs: string
  logoutLabel: string
  workspaceKicker: string
  workspaceGreeting: string
  appsAvailableLabel: string
  searchLabel: string
  searchPlaceholder: string
  searchNoResults: string
  openAppLabel: string
  openAppPausedLabel: string
  catalogEyebrow: string
  catalogTitle: string
  filterAreaAll: string
  filterVisibilityAll: string
  architectureFilteredNote: string
  docsEyebrow: string
  docsTitle: string
  docsBody: string
  docArchitecturePdfTitle: string
  docArchitecturePdfDescription: string
  docArchitectureDocTitle: string
  docArchitectureDocDescription: string
  docOpenLabel: string
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
    kindLabels: {
      'external-hub': 'Hub externo',
      'partner-platform': 'Plataforma de partners',
      'intelligence-platform': 'Plataforma de inteligencia',
      'ops-platform': 'Plataforma operativa',
      'ai-platform': 'Plataforma de IA',
      'wellness-platform': 'Plataforma de bienestar',
      'finance-platform': 'Plataforma financiera',
      'compliance-platform': 'Plataforma de cumplimiento',
      'editorial-platform': 'Plataforma editorial',
      'utility-platform': 'Plataforma de utilidades',
      'learning-platform': 'Plataforma de aprendizaje',
    },
    heroEyebrow: 'Entidad matriz y capa corporativa',
    heroTitle: 'Una única puerta corporativa para el ecosistema Anclora.',
    heroBody:
      'Anclora Group organiza el acceso al ecosistema, a sus verticales y a sus herramientas estratégicas mediante una arquitectura unificada y gobernada por roles.',
    appsEyebrow: 'Aplicaciones habilitadas',
    appsTitle: 'Aplicaciones visibles para tu rol',
    visibilityInternal: 'Privada',
    visibilityExternal: 'Pública',
    statusPaused: 'En pausa',
    architectureEyebrow: 'Arquitectura',
    architectureTitle: 'Mapa corporativo actual',
    architectureLink: 'Ver arquitectura de acceso',
    loginEyebrow: 'Entidad matriz',
    loginTitle:
      'Entorno corporativo desde el que Anclora organiza el acceso a sus aplicaciones, equipos, operaciones y herramientas estratégicas con control por rol y una arquitectura unificada.',
    loginCardEyebrow: 'Acceso seguro',
    loginCardTitle: 'Acceso al portal corporativo',
    usernameLabel: 'Usuario corporativo',
    passwordLabel: 'Contraseña',
    loginSubmitIdle: 'Entrar en la entidad matriz',
    loginSubmitBusy: 'Abriendo acceso corporativo...',
    loginErrorFallback: 'No se ha podido iniciar la sesión corporativa.',
    navWorkspace: 'Workspace',
    navApps: 'Aplicaciones',
    navArchitecture: 'Arquitectura',
    navDocs: 'Documentación',
    logoutLabel: 'Cerrar sesión',
    workspaceKicker: 'Panel operativo',
    workspaceGreeting: 'Hola,',
    appsAvailableLabel: 'apps disponibles para tu rol',
    searchLabel: 'Buscar aplicaciones',
    searchPlaceholder: 'Buscar por nombre, función o área…',
    searchNoResults: 'Sin resultados para esta búsqueda.',
    openAppLabel: 'Abrir aplicación',
    openAppPausedLabel: 'En pausa',
    catalogEyebrow: 'Catálogo',
    catalogTitle: 'Todas tus aplicaciones autorizadas',
    filterAreaAll: 'Todas las áreas',
    filterVisibilityAll: 'Todas',
    architectureFilteredNote: 'Vista filtrada a las aplicaciones autorizadas para tu rol.',
    docsEyebrow: 'Documentación privada',
    docsTitle: 'Documentación corporativa',
    docsBody: 'Documentos internos del ecosistema, disponibles solo con sesión corporativa activa.',
    docArchitecturePdfTitle: 'Arquitectura de acceso (PDF)',
    docArchitecturePdfDescription: 'Mapa visual del ecosistema, sus capas y la posición de cada aplicación. Generado desde el registry.',
    docArchitectureDocTitle: 'Arquitectura de acceso (documento)',
    docArchitectureDocDescription: 'Documento fuente en Markdown con la propuesta de arquitectura de acceso corporativo.',
    docOpenLabel: 'Abrir documento',
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

export function getGroupDefaultLocale() {
  return pickLocale(process.env.NEXT_PUBLIC_GROUP_DEFAULT_LOCALE)
}

export function getGroupMessages(locale = getGroupDefaultLocale()) {
  return messages[locale]
}

export function getRoleLabels(locale = getGroupDefaultLocale()) {
  return getGroupMessages(locale).roleLabels
}

export function getKindLabels(locale = getGroupDefaultLocale()) {
  return getGroupMessages(locale).kindLabels
}
