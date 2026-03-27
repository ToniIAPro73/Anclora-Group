export type GroupRole =
  | 'group-admin'
  | 'private-estates-ops'
  | 'partner-ops'
  | 'data-ops'
  | 'content-ops'
  | 'advisory'
  | 'growth-ops'

export type GroupAppKey =
  | 'private-estates'
  | 'synergi'
  | 'data-lab'
  | 'nexus'
  | 'command-center'
  | 'content-generator-ai'
  | 'advisor-ai'
  | 'impulso'

export type GroupAppDefinition = {
  key: GroupAppKey
  title: string
  eyebrow: string
  description: string
  logoSrc?: string
  kind: 'external-hub' | 'partner-platform' | 'intelligence-platform' | 'ops-platform' | 'ai-platform' | 'wellness-platform'
  visibility: 'external-facing' | 'internal'
  roles: GroupRole[]
  url: string
}

export type GroupUserRecord = {
  username: string
  password: string
  displayName: string
  role: GroupRole
}

function parseJsonUsers(value: string | undefined): GroupUserRecord[] {
  if (!value?.trim()) return []

  try {
    const parsed = JSON.parse(value) as Array<Partial<GroupUserRecord>>
    return parsed
      .filter((item) => item.username && item.password && item.displayName && item.role)
      .map((item) => ({
        username: String(item.username),
        password: String(item.password),
        displayName: String(item.displayName),
        role: item.role as GroupRole,
      }))
  } catch {
    return []
  }
}

export function getGroupUsers(): GroupUserRecord[] {
  const parsed = parseJsonUsers(process.env.ANCLORA_GROUP_INTERNAL_USERS_JSON)
  if (parsed.length) return parsed

  const username = process.env.ANCLORA_GROUP_BOOTSTRAP_USERNAME?.trim()
  const password = process.env.ANCLORA_GROUP_BOOTSTRAP_PASSWORD?.trim()
  const displayName = process.env.ANCLORA_GROUP_BOOTSTRAP_DISPLAY_NAME?.trim() || 'Administrador de Anclora Group'
  const role = (process.env.ANCLORA_GROUP_BOOTSTRAP_ROLE?.trim() as GroupRole | undefined) || 'group-admin'

  if (!username || !password) return []

  return [{ username, password, displayName, role }]
}

function getEnvUrl(name: string, fallback: string) {
  return process.env[name]?.trim() || fallback
}

export function getGroupAppDefinitions(): GroupAppDefinition[] {
  const privateEstatesUrl = getEnvUrl('NEXT_PUBLIC_PRIVATE_ESTATES_URL', 'https://anclora-private-estates.vercel.app/')

  return [
    {
      key: 'private-estates',
      title: 'Anclora Private Estates',
      eyebrow: 'Real estate de lujo',
      description:
        'Plataforma matriz y puerta de entrada del vertical inmobiliario premium de Anclora.',
      logoSrc: '/brand/logo-anclora-private-estates.webp',
      kind: 'external-hub',
      visibility: 'external-facing',
      roles: ['group-admin', 'private-estates-ops', 'partner-ops', 'data-ops', 'content-ops'],
      url: privateEstatesUrl,
    },
    {
      key: 'synergi',
      title: 'Anclora Synergi',
      eyebrow: 'Plataforma de partnership',
      description:
        'Gestión de admisión, activación y colaboración privada con partners aprobados.',
      logoSrc: '/brand/logo-anclora-synergi.webp',
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
      logoSrc: '/brand/logo-anclora-datalab.webp',
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
      logoSrc: '/brand/logo-anclora-nexus.webp',
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
      logoSrc: '/brand/logo-anclora-command-center.webp',
      kind: 'ops-platform',
      visibility: 'internal',
      roles: ['group-admin', 'private-estates-ops', 'partner-ops', 'data-ops', 'content-ops', 'advisory', 'growth-ops'],
      url: getEnvUrl('NEXT_PUBLIC_COMMAND_CENTER_URL', 'https://boveda-anclora.vercel.app/'),
    },
    {
      key: 'content-generator-ai',
      title: 'Anclora Content Generator AI',
      eyebrow: 'Motor editorial con IA',
      description:
        'Motor editorial y de inteligencia de contenido para Anclora Private Estates.',
      logoSrc: '/brand/logo-content-generator-ai.webp',
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
      logoSrc: '/brand/logo-anclora-advisor-ai.webp',
      kind: 'ai-platform',
      visibility: 'internal',
      roles: ['group-admin', 'advisory'],
      url: getEnvUrl('NEXT_PUBLIC_ADVISOR_AI_URL', 'https://anclora-advisor-ai.vercel.app/'),
    },
    {
      key: 'impulso',
      title: 'Anclora Impulso',
      eyebrow: 'Fitness y nutrición',
      description:
        'Aplicación web de fitness y nutrición con generación de rutinas por IA, progreso y planes nutricionales.',
      logoSrc: '/brand/logo-anclora-impulso.webp',
      kind: 'wellness-platform',
      visibility: 'internal',
      roles: ['group-admin', 'growth-ops'],
      url: getEnvUrl('NEXT_PUBLIC_IMPULSO_URL', 'https://anclora-impulso.vercel.app/'),
    },
  ]
}

export function getAppsForRole(role: GroupRole) {
  return getGroupAppDefinitions().filter((app) => app.roles.includes(role))
}

export function getSynergiLoginUrl() {
  return getEnvUrl('NEXT_PUBLIC_SYNERGI_INTERNAL_URL', 'https://anclora-synergi.vercel.app/partner-admissions/login')
}

export function getDataLabLoginUrl() {
  return getEnvUrl('NEXT_PUBLIC_DATA_LAB_INTERNAL_URL', 'https://anclora-data-lab.vercel.app/access-requests/login')
}
