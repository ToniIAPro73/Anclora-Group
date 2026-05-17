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
        {
          title: '1. Objeto y ámbito',
          paragraphs: [
            'Anclora Group organiza el acceso al ecosistema, a sus verticales y a sus herramientas estratégicas mediante control por rol.',
            'Estos términos rigen el uso del portal corporativo por parte de los usuarios autorizados.',
          ],
        },
        {
          title: '2. Acceso y autenticación',
          paragraphs: [
            'El acceso está limitado a perfiles autorizados por Anclora Group. El usuario debe proteger sus credenciales y no compartirlas.',
            'El acceso no autorizado o el uso indebido de credenciales ajenas constituye una infracción y puede dar lugar a la revocación del acceso y a acciones legales.',
          ],
        },
        {
          title: '3. Confidencialidad',
          paragraphs: [
            'Toda la información a la que el usuario acceda a través del portal tiene carácter confidencial y está restringida al uso interno de Anclora Group.',
            'El usuario se compromete a no divulgar, compartir ni explotar comercialmente dicha información sin autorización expresa.',
          ],
        },
        {
          title: '4. Uso aceptable',
          paragraphs: [
            'El portal debe usarse exclusivamente para los fines profesionales autorizados. Queda prohibido el uso para actividades ilícitas, el acceso a datos de otros usuarios sin autorización, y cualquier acción que comprometa la integridad del sistema.',
          ],
        },
        {
          title: '5. Propiedad intelectual',
          paragraphs: [
            'El portal, su código fuente, interfaces, flujos operativos y documentación son propiedad de Anclora Group. El usuario no adquiere ningún derecho de propiedad sobre ellos por el mero uso del servicio.',
          ],
        },
        {
          title: '6. Cookies y seguridad',
          paragraphs: [
            'El portal usa cookies necesarias para sesión y seguridad. Las preferencias de cookies opcionales pueden gestionarse desde el panel de preferencias disponible en el pie de página.',
          ],
        },
        {
          title: '7. Modificaciones y suspensión',
          paragraphs: [
            'Anclora Group se reserva el derecho de modificar, suspender o revocar el acceso al portal en cualquier momento, con o sin previo aviso, especialmente en caso de uso indebido.',
          ],
        },
        {
          title: '8. Legislación aplicable',
          paragraphs: [
            'Estos términos se rigen por la legislación española y de la Unión Europea. Cualquier controversia se someterá a los juzgados y tribunales competentes conforme a la normativa aplicable.',
            'Contacto: hola@anclora.com.',
          ],
        },
      ]}
    />
  )
}
