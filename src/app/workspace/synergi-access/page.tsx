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
      description="Acceso interno corporativo al login de Synergi para operaciones de partnership, admisión, soporte y colaboración privada."
      logoSrc="/brand/logo-anclora-synergi.png"
      loginHref={getSynergiLoginUrl()}
      loginLabel="Abrir login de Synergi"
      accessTitle="Entrada al portal interno de partnership"
      accessCopy="Desde esta pantalla el equipo interno de Anclora accede al login privado de Synergi, separado del acceso público mostrado en Private Estates."
      helperTitle="Separación entre acceso público e interno"
      helperCopy="Private Estates mantiene la pantalla mixta de solicitud + acceso. Anclora Group concentra el acceso interno y corporativo al login real."
    />
  )
}
