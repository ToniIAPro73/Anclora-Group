import { GroupInternalAccessPage } from '@/components/group/GroupInternalAccessPage'
import { requireGroupSession } from '@/lib/group-auth'
import { getSynergiLoginUrl } from '@/lib/group-access'

export default async function SynergiAccessPage() {
  const session = await requireGroupSession()

  return (
    <GroupInternalAccessPage
      session={session}
      title="Anclora Synergi"
      eyebrow="Plataforma de partnership"
      description="Acceso corporativo al backoffice de Synergi para admisiones, revisión de solicitudes, activación partner y operación privada."
      logoSrc="/brand/logo-anclora-synergi.webp"
      loginHref={getSynergiLoginUrl()}
      loginLabel="Abrir backoffice de Synergi"
      accessTitle="Entrada al backoffice de Synergi"
      accessCopy="Desde esta pantalla el equipo autorizado accede a la ruta privada donde se revisan solicitudes, se aceptan o rechazan admisiones y se opera el workspace partner."
      helperTitle="Separación entre acceso público y corporativo"
      helperCopy="Private Estates mantiene la pantalla dual de solicitud + acceso partner. Anclora Group concentra la entrada corporativa al backoffice de Synergi."
    />
  )
}
