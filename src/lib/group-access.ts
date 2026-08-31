export type GroupRole =
  | 'group-admin'
  | 'private-estates-ops'
  | 'partner-ops'
  | 'data-ops'
  | 'content-ops'
  | 'advisory'
  | 'growth-ops'

const GROUP_ROLES: readonly GroupRole[] = [
  'group-admin',
  'private-estates-ops',
  'partner-ops',
  'data-ops',
  'content-ops',
  'advisory',
  'growth-ops',
]

export function isGroupRole(value: unknown): value is GroupRole {
  return typeof value === 'string' && (GROUP_ROLES as readonly string[]).includes(value)
}

export type GroupBusinessArea =
  | 'real-estate'
  | 'partnerships'
  | 'intelligence-data'
  | 'operations'
  | 'content-ai'
  | 'fiscal-compliance'
  | 'utilities'
  | 'personal'

export type GroupArchitectureLayer = 'entry' | 'core' | 'activation'

export type GroupAppKey =
  | 'private-estates'
  | 'private-estates-landing'
  | 'synergi'
  | 'data-lab'
  | 'nexus'
  | 'command-center'
  | 'content-generator-ai'
  | 'advisor-ai'
  | 'impulso'
  | 'fiscal'
  | 'guesthub'
  | 'energyscan'
  | 'filestudio'
  | 'visionflow'
  | 'linguo-cam'

export type GroupAppKind =
  | 'external-hub'
  | 'partner-platform'
  | 'intelligence-platform'
  | 'ops-platform'
  | 'ai-platform'
  | 'wellness-platform'
  | 'finance-platform'
  | 'compliance-platform'
  | 'utility-platform'
  | 'learning-platform'

export type GroupAppDefinition = {
  key: GroupAppKey
  title: string
  eyebrow: string
  description: string
  logoSrc?: string
  kind: GroupAppKind
  visibility: 'external-facing' | 'internal'
  roles: GroupRole[]
  businessArea: GroupBusinessArea
  architectureLayer: GroupArchitectureLayer
  url: string
}

export type GroupUserRecord = {
  username: string
  passwordHash: string | null
  /**
   * Development-only compatibility shim for the pre-hardening plaintext
   * model. Always null in production: plaintext records are rejected
   * fail-closed at parse time.
   */
  legacyPassword: string | null
  displayName: string
  role: GroupRole
}

const isProduction = () => process.env.NODE_ENV === 'production'

function parseJsonUsers(value: string | undefined): GroupUserRecord[] {
  if (!value?.trim()) return []

  let parsed: unknown
  try {
    parsed = JSON.parse(value)
  } catch {
    return []
  }
  if (!Array.isArray(parsed)) return []

  const users: GroupUserRecord[] = []
  for (const item of parsed as Array<Record<string, unknown>>) {
    if (!item || typeof item !== 'object') continue

    const username = typeof item.username === 'string' ? item.username.trim() : ''
    const displayName = typeof item.displayName === 'string' ? item.displayName.trim() : ''
    const passwordHash = typeof item.passwordHash === 'string' ? item.passwordHash.trim() : ''
    const legacyPassword = typeof item.password === 'string' ? item.password : ''

    // Invalid roles fail closed: the user simply does not exist.
    if (!username || !displayName || !isGroupRole(item.role)) continue

    if (passwordHash) {
      users.push({ username, passwordHash, legacyPassword: null, displayName, role: item.role })
    } else if (!isProduction() && legacyPassword) {
      users.push({ username, passwordHash: null, legacyPassword, displayName, role: item.role })
    }
    // No hash in production: record rejected fail-closed.
  }
  return users
}

export function getGroupUsers(): GroupUserRecord[] {
  const parsed = parseJsonUsers(process.env.ANCLORA_GROUP_INTERNAL_USERS_JSON)
  if (parsed.length) return parsed

  const username = process.env.ANCLORA_GROUP_BOOTSTRAP_USERNAME?.trim()
  const passwordHash = process.env.ANCLORA_GROUP_BOOTSTRAP_PASSWORD_HASH?.trim()
  const legacyPassword = process.env.ANCLORA_GROUP_BOOTSTRAP_PASSWORD?.trim()
  const displayName = process.env.ANCLORA_GROUP_BOOTSTRAP_DISPLAY_NAME?.trim() || 'Administrador de Anclora Group'
  const roleValue = process.env.ANCLORA_GROUP_BOOTSTRAP_ROLE?.trim() || 'group-admin'

  if (!username || !isGroupRole(roleValue)) return []

  if (passwordHash) {
    return [{ username, passwordHash, legacyPassword: null, displayName, role: roleValue }]
  }
  if (!isProduction() && legacyPassword) {
    return [{ username, passwordHash: null, legacyPassword, displayName, role: roleValue }]
  }
  return []
}

function getEnvUrl(name: string, fallback: string) {
  return process.env[name]?.trim() || fallback
}

/**
 * Business area and architecture layer per app. Declared as a Record keyed by
 * GroupAppKey so the compiler rejects any app missing its classification.
 * Layer meaning is conserved from the original architecture map:
 * entry (relationship/access), core (intelligence/coordination),
 * activation (content/compliance/growth).
 */
const APP_TAXONOMY: Record<GroupAppKey, Pick<GroupAppDefinition, 'businessArea' | 'architectureLayer'>> = {
  'private-estates': { businessArea: 'real-estate', architectureLayer: 'entry' },
  'private-estates-landing': { businessArea: 'real-estate', architectureLayer: 'entry' },
  synergi: { businessArea: 'partnerships', architectureLayer: 'entry' },
  'linguo-cam': { businessArea: 'utilities', architectureLayer: 'entry' },
  'data-lab': { businessArea: 'intelligence-data', architectureLayer: 'core' },
  nexus: { businessArea: 'real-estate', architectureLayer: 'core' },
  'command-center': { businessArea: 'operations', architectureLayer: 'core' },
  visionflow: { businessArea: 'operations', architectureLayer: 'core' },
  filestudio: { businessArea: 'utilities', architectureLayer: 'core' },
  'content-generator-ai': { businessArea: 'content-ai', architectureLayer: 'activation' },
  'advisor-ai': { businessArea: 'fiscal-compliance', architectureLayer: 'activation' },
  fiscal: { businessArea: 'fiscal-compliance', architectureLayer: 'activation' },
  guesthub: { businessArea: 'real-estate', architectureLayer: 'activation' },
  energyscan: { businessArea: 'real-estate', architectureLayer: 'activation' },
  impulso: { businessArea: 'personal', architectureLayer: 'activation' },
}

type GroupAppDefinitionBase = Omit<GroupAppDefinition, 'businessArea' | 'architectureLayer'>

export function getGroupAppDefinitions(): GroupAppDefinition[] {
  const privateEstatesUrl = getEnvUrl('NEXT_PUBLIC_PRIVATE_ESTATES_URL', 'https://anclora-private-estates.vercel.app/')

  const apps: GroupAppDefinitionBase[] = [
    {
      key: 'private-estates',
      title: 'Anclora Private Estates',
      eyebrow: 'Real estate de lujo',
      description:
        'Plataforma matriz y puerta de entrada del vertical inmobiliario premium de Anclora.',
      logoSrc: '/brand/anclora-private-estates.webp',
      kind: 'external-hub',
      visibility: 'external-facing',
      roles: ['group-admin', 'private-estates-ops', 'partner-ops', 'data-ops', 'content-ops'],
      url: privateEstatesUrl,
    },
    {
      key: 'private-estates-landing',
      title: 'Anclora Private Estates Landing Page',
      eyebrow: 'Landing ultra premium',
      description:
        'Superficie pública de captación y posicionamiento para el vertical Private Estates.',
      logoSrc: '/brand/anclora-private-estates.webp',
      kind: 'external-hub',
      visibility: 'external-facing',
      roles: ['group-admin', 'private-estates-ops', 'partner-ops', 'data-ops', 'content-ops'],
      url: getEnvUrl(
        'NEXT_PUBLIC_PRIVATE_ESTATES_LANDING_URL',
        'https://anclora-private-estates-landing.vercel.app/',
      ),
    },
    {
      key: 'synergi',
      title: 'Anclora Synergi',
      eyebrow: 'Plataforma de partnership',
      description:
        'Gestión de admisión, activación y colaboración privada con partners aprobados.',
      logoSrc: '/brand/anclora-synergi.webp',
      kind: 'partner-platform',
      visibility: 'internal',
      roles: ['group-admin', 'private-estates-ops', 'partner-ops'],
      url: '/workspace/synergi-access',
    },
    {
      key: 'data-lab',
      title: 'Anclora Data Lab',
      eyebrow: 'Plataforma de inteligencia',
      description:
        'Documentación curada, señales territoriales, informes y conocimiento premium para perfiles autorizados.',
      logoSrc: '/brand/anclora-data-lab.webp',
      kind: 'intelligence-platform',
      visibility: 'internal',
      roles: ['group-admin', 'private-estates-ops', 'data-ops', 'partner-ops'],
      url: '/workspace/data-lab-access',
    },
    {
      key: 'nexus',
      title: 'Anclora Nexus',
      eyebrow: 'Operación Private Estates',
      description:
        'Plataforma operativa interna de Anclora Private Estates para pipeline, relaciones y coordinación comercial.',
      logoSrc: '/brand/anclora-nexus.webp',
      kind: 'ops-platform',
      visibility: 'internal',
      roles: ['group-admin', 'private-estates-ops'],
      url: getEnvUrl('NEXT_PUBLIC_NEXUS_URL', 'https://anclora-nexus-frontend.vercel.app/'),
    },
    {
      key: 'command-center',
      title: 'Anclora Command Center',
      eyebrow: 'Centro de mando',
      description:
        'Dashboard premium conectado a la bóveda para leer pulso ejecutivo, captación, partners y decisiones clave del ecosistema.',
      logoSrc: '/brand/anclora-command-center.webp',
      kind: 'ops-platform',
      visibility: 'internal',
      roles: ['group-admin', 'private-estates-ops', 'partner-ops', 'data-ops', 'content-ops', 'advisory', 'growth-ops'],
      url: getEnvUrl('NEXT_PUBLIC_COMMAND_CENTER_URL', 'https://anclora-command-center.vercel.app/'),
    },
    {
      key: 'content-generator-ai',
      title: 'Anclora Content Generator AI',
      eyebrow: 'Motor editorial con IA',
      description:
        'Motor editorial y de inteligencia de contenido para Anclora Private Estates.',
      logoSrc: '/brand/anclora-content-generator-ai.webp',
      kind: 'ai-platform',
      visibility: 'internal',
      roles: ['group-admin', 'content-ops', 'private-estates-ops'],
      url: getEnvUrl('NEXT_PUBLIC_CONTENT_GENERATOR_AI_URL', 'https://anclora-content-generator-ai.vercel.app/'),
    },
    {
      key: 'advisor-ai',
      title: 'Anclora Advisor AI',
      eyebrow: 'Asesoría con IA',
      description:
        'Aplicación de asesoría fiscal, laboral y de mercado inmobiliario para autónomos con pluriactividad.',
      logoSrc: '/brand/anclora-advisor-ai.webp',
      kind: 'ai-platform',
      visibility: 'internal',
      roles: ['group-admin', 'advisory'],
      url: getEnvUrl('NEXT_PUBLIC_ADVISOR_AI_URL', 'https://ancloraadvisorai-ten.vercel.app/'),
    },
    {
      key: 'fiscal',
      title: 'Anclora Fiscal',
      eyebrow: 'Operación fiscal',
      description:
        'Sistema operativo fiscal trazable para ventas digitales, cierres mensuales y espacios de asesoría.',
      logoSrc: '/brand/anclora-fiscal.webp',
      kind: 'finance-platform',
      visibility: 'internal',
      roles: ['group-admin', 'advisory'],
      url: getEnvUrl('NEXT_PUBLIC_FISCAL_URL', 'https://anclora-fiscal.vercel.app/'),
    },
    {
      key: 'guesthub',
      title: 'Anclora GuestHub',
      eyebrow: 'Alquiler vacacional y cumplimiento SES.HOSPEDAJES',
      description:
        'Gestión de huéspedes, check-in y operación de alquiler vacacional.',
      logoSrc: '/brand/anclora-guesthub.webp',
      kind: 'compliance-platform',
      visibility: 'internal',
      roles: ['group-admin', 'private-estates-ops', 'advisory'],
      // NEXT_PUBLIC_SYNCXML_URL is kept as a legacy fallback during the rename
      // transition. The hardcoded fallback domain stays as-is (legacy Vercel
      // deployment) pending the owner's domain decision.
      url: getEnvUrl(
        'NEXT_PUBLIC_GUESTHUB_URL',
        getEnvUrl('NEXT_PUBLIC_SYNCXML_URL', 'https://anclora-syncxml.vercel.app/'),
      ),
    },
    {
      key: 'energyscan',
      title: 'Anclora EnergyScan',
      eyebrow: 'Energía inmobiliaria',
      description:
        'Aplicación de análisis energético para activos inmobiliarios y señales de mejora operativa.',
      logoSrc: '/brand/anclora-energyscan.webp',
      kind: 'intelligence-platform',
      visibility: 'internal',
      roles: ['group-admin', 'private-estates-ops', 'data-ops'],
      url: getEnvUrl('NEXT_PUBLIC_ENERGYSCAN_URL', 'https://anclora-energyscan.vercel.app/'),
    },
    {
      key: 'filestudio',
      title: 'Anclora FileStudio',
      eyebrow: 'Procesamiento documental',
      description:
        'Servicio transversal de conversión, tratamiento y preparación privada de archivos.',
      logoSrc: '/brand/anclora-filestudio.webp',
      kind: 'utility-platform',
      visibility: 'internal',
      roles: ['group-admin', 'private-estates-ops', 'advisory', 'content-ops'],
      url: getEnvUrl('NEXT_PUBLIC_FILESTUDIO_URL', 'https://anclora-filestudio.vercel.app/'),
    },
    {
      key: 'visionflow',
      title: 'Anclora VisionFlow',
      eyebrow: 'Mapa visual',
      description:
        'Workspace visual para mapear aplicaciones, evidencias y handoffs del ecosistema Anclora.',
      logoSrc: '/brand/anclora-visionflow.webp',
      kind: 'ops-platform',
      visibility: 'internal',
      roles: ['group-admin', 'private-estates-ops', 'data-ops', 'content-ops'],
      url: getEnvUrl('NEXT_PUBLIC_VISIONFLOW_URL', 'https://anclora-visionflow.vercel.app/'),
    },
    {
      key: 'linguo-cam',
      title: 'Anclora Linguo Cam',
      eyebrow: 'Comunicación translingüe',
      description:
        'Aplicación de comunicación en tiempo real con subtítulos, ASR y traducción asistida.',
      logoSrc: '/brand/anclora-linguo-cam.webp',
      kind: 'utility-platform',
      visibility: 'internal',
      roles: ['group-admin'],
      url: getEnvUrl('NEXT_PUBLIC_LINGUO_CAM_URL', 'https://anclora-linguo-cam.vercel.app/'),
    },
    {
      key: 'impulso',
      title: 'Anclora Impulso',
      eyebrow: 'Fitness y nutrición',
      description:
        'Aplicación web de fitness y nutrición con generación de rutinas por IA, progreso y planes nutricionales.',
      logoSrc: '/brand/anclora-impulso.webp',
      kind: 'wellness-platform',
      visibility: 'internal',
      roles: ['group-admin', 'growth-ops'],
      url: getEnvUrl('NEXT_PUBLIC_IMPULSO_URL', 'https://anclora-impulso.vercel.app/'),
    },
  ]

  return apps.map((app) => ({ ...app, ...APP_TAXONOMY[app.key] }))
}

export function getAppsForRole(role: GroupRole) {
  return getGroupAppDefinitions().filter((app) => app.roles.includes(role))
}

/**
 * Derives access from the app registry: a role may access an app only if the
 * app definition lists it. Unknown roles and unknown app keys fail closed.
 */
export function isAppAccessAllowed(role: GroupRole, appKey: GroupAppKey): boolean {
  if (!isGroupRole(role)) return false
  const app = getGroupAppDefinitions().find((item) => item.key === appKey)
  if (!app) return false
  return app.roles.includes(role)
}

export function getSynergiLoginUrl() {
  return getEnvUrl('NEXT_PUBLIC_SYNERGI_INTERNAL_URL', 'https://anclora-synergi.vercel.app/partner-admissions/login')
}

export function getDataLabLoginUrl() {
  return getEnvUrl('NEXT_PUBLIC_DATA_LAB_INTERNAL_URL', 'https://anclora-data-lab.vercel.app/access-requests/login')
}

export type GroupBusinessAreaInfo = {
  key: GroupBusinessArea
  label: string
}

/** Display metadata per business area. Single declaration; UI derives from it. */
export function getGroupBusinessAreas(): GroupBusinessAreaInfo[] {
  return [
    { key: 'real-estate', label: 'Real Estate' },
    { key: 'partnerships', label: 'Partnerships' },
    { key: 'intelligence-data', label: 'Inteligencia y Datos' },
    { key: 'operations', label: 'Operaciones' },
    { key: 'content-ai', label: 'Contenido e IA' },
    { key: 'fiscal-compliance', label: 'Fiscal y Cumplimiento' },
    { key: 'utilities', label: 'Utilidades' },
    { key: 'personal', label: 'Personal' },
  ]
}

export function getBusinessAreaLabel(area: GroupBusinessArea): string {
  return getGroupBusinessAreas().find((item) => item.key === area)?.label ?? area
}

export type GroupAppsByArea = {
  area: GroupBusinessAreaInfo
  apps: GroupAppDefinition[]
}

/** Groups apps by business area following the declared area order. */
export function groupAppsByBusinessArea(apps: GroupAppDefinition[]): GroupAppsByArea[] {
  return getGroupBusinessAreas()
    .map((area) => ({ area, apps: apps.filter((app) => app.businessArea === area.key) }))
    .filter((group) => group.apps.length > 0)
}

export type GroupArchitectureLayerInfo = {
  key: GroupArchitectureLayer
  eyebrow: string
  title: string
  body: string
}

const ARCHITECTURE_LAYERS: GroupArchitectureLayerInfo[] = [
  {
    key: 'entry',
    eyebrow: 'Capa de entrada',
    title: 'Relación y puerta de acceso',
    body: 'Las superficies que definen la entrada premium al ecosistema, la activación de partners y el marco corporativo de visibilidad.',
  },
  {
    key: 'core',
    eyebrow: 'Capa operativa',
    title: 'Inteligencia y coordinación',
    body: 'El núcleo que combina señales de mercado, coordinación interna y lectura ejecutiva del ecosistema en tiempo real.',
  },
  {
    key: 'activation',
    eyebrow: 'Capa de activación',
    title: 'Contenido, cumplimiento y crecimiento',
    body: 'Las aplicaciones que convierten inteligencia en ejecución editorial, orientación experta, control operativo y tracción comercial sostenida.',
  },
]

export type GroupArchitectureLane = GroupArchitectureLayerInfo & {
  apps: GroupAppDefinition[]
}

/**
 * Architecture map derived from the registry. No parallel hardcoded arrays:
 * layers declare metadata once and every app lands in exactly one lane via
 * its architectureLayer field.
 */
export function getArchitectureLanes(apps: GroupAppDefinition[] = getGroupAppDefinitions()): GroupArchitectureLane[] {
  return ARCHITECTURE_LAYERS.map((layer) => ({
    ...layer,
    apps: apps.filter((app) => app.architectureLayer === layer.key),
  }))
}

function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
}

/**
 * Lightweight client-safe search over an already role-filtered app list.
 * Matches title, eyebrow, description, kind and business-area label.
 */
export function searchGroupApps(apps: GroupAppDefinition[], query: string): GroupAppDefinition[] {
  const needle = normalizeSearchText(query.trim())
  if (!needle) return apps

  return apps.filter((app) => {
    const haystack = normalizeSearchText(
      [app.title, app.eyebrow, app.description, app.kind, getBusinessAreaLabel(app.businessArea)].join(' '),
    )
    return haystack.includes(needle)
  })
}
