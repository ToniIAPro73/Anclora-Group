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
      description="Acceso interno corporativo al login de Data Lab para perfiles autorizados con visibilidad sobre inteligencia territorial, documentación curada y activos analíticos."
      logoSrc="/brand/logo-anclora-datalab.png"
      loginHref={getDataLabLoginUrl()}
      loginLabel="Abrir login de Data Lab"
      accessTitle="Entrada al entorno analítico privado"
      accessCopy="Desde aquí el equipo interno entra al login de Data Lab sin pasar por la pantalla pública de solicitud y acceso disponible en Private Estates."
      helperTitle="Control corporativo de acceso"
      helperCopy="Anclora Group actúa como puerta interna para accesos corporativos. La capa pública de Data Lab permanece reservada para la entrada externa desde Private Estates."
    />
  )
}
