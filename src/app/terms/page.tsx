import type { Metadata } from 'next'
import { GroupLegalDocument } from '@/components/group/GroupLegalDocument'

export const metadata: Metadata = {
  title: 'Términos del servicio | Anclora Group',
}

export default function TermsPage() {
  return (
    <GroupLegalDocument
      title="Términos del servicio"
      description="Condiciones de acceso y uso del portal corporativo Anclora Group."
      blocks={[
        { title: 'Objeto', paragraphs: ['Anclora Group organiza el acceso al ecosistema, a sus verticales y a sus herramientas estratégicas mediante control por rol.'] },
        { title: 'Uso autorizado', paragraphs: ['El acceso está limitado a perfiles autorizados. El usuario debe proteger sus credenciales y respetar la confidencialidad de información interna.'] },
        { title: 'Cookies y seguridad', paragraphs: ['El portal usa cookies necesarias para sesión y seguridad. Las preferencias opcionales pueden gestionarse desde el botón flotante de cookies.'] },
      ]}
    />
  )
}
