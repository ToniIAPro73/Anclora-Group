import type { Metadata } from 'next'
import { GroupLegalDocument } from '@/components/group/GroupLegalDocument'

export const metadata: Metadata = {
  title: 'Aviso legal | Anclora Group',
}

export default function LegalPage() {
  return (
    <GroupLegalDocument
      title="Aviso legal"
      description="Información corporativa y de titularidad de Anclora Group."
      blocks={[
        { title: 'Entidad', paragraphs: ['Anclora Group es la entidad propietaria y operadora del ecosistema Anclora.'] },
        { title: 'Contacto', paragraphs: ['Email común de contacto: hola@anclora.com.'] },
        { title: 'Propiedad intelectual', paragraphs: ['La identidad visual, interfaces, documentación propia, flujos y activos intangibles del ecosistema se gobiernan bajo Anclora Group, sin perjuicio de derechos de terceros o datos aportados por usuarios.', 'La marca matriz está en proceso de registro o pendiente de validación legal final; no se afirma registro concedido.'] },
      ]}
    />
  )
}
