import type { Metadata } from 'next'
import { GroupLegalDocument } from '@/components/group/GroupLegalDocument'

export const metadata: Metadata = {
  title: 'Política de privacidad | Anclora Group',
}

export default function PrivacyPage() {
  return (
    <GroupLegalDocument
      title="Política de privacidad"
      description="Tratamiento de datos personales en el portal corporativo Anclora Group."
      blocks={[
        { title: 'Responsable', paragraphs: ['Responsable del tratamiento: Anclora Group.', 'Contacto para privacidad: hola@anclora.com.'] },
        { title: 'Datos tratados', paragraphs: ['El portal puede tratar datos de cuenta, autenticación, roles, sesión, actividad operativa y datos técnicos necesarios para seguridad y auditoría.'] },
        { title: 'Cookies', paragraphs: ['Usamos cookies necesarias para sesión, seguridad y preferencias. Las cookies opcionales de análisis o marketing permanecen desactivadas salvo consentimiento.'] },
      ]}
    />
  )
}
