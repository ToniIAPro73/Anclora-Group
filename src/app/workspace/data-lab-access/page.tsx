import { GroupInternalAccessPage } from '@/components/group/GroupInternalAccessPage'
import { requireGroupSession } from '@/lib/group-auth'
import { getDataLabLoginUrl } from '@/lib/group-access'

export default async function DataLabAccessPage() {
  const session = await requireGroupSession()

  return (
    <GroupInternalAccessPage
      session={session}
      title="Anclora Data Lab"
      eyebrow="Plataforma de inteligencia"
      description="Acceso corporativo al entorno privado de Data Lab para perfiles autorizados con visibilidad sobre inteligencia territorial, documentación curada y activos analíticos."
      logoSrc="/brand/logo-anclora-datalab.webp"
      loginHref={getDataLabLoginUrl()}
      loginLabel="Abrir acceso corporativo de Data Lab"
      accessTitle="Entrada al entorno privado de Data Lab"
      accessCopy="Desde aquí el equipo autorizado accede a la capa privada de Data Lab, separada de la pantalla pública dual expuesta desde Private Estates."
      helperTitle="Acceso corporativo diferenciado"
      helperCopy="Private Estates mantiene la entrada pública de solicitud + acceso. Anclora Group concentra el acceso corporativo y operativo a Data Lab para perfiles autorizados."
    />
  )
}
