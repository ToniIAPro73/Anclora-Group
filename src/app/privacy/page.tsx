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
        {
          title: '1. Responsable del tratamiento',
          paragraphs: [
            'Responsable del tratamiento: Anclora Group.',
            'Contacto para privacidad y ejercicio de derechos: hola@anclora.com.',
          ],
        },
        {
          title: '2. Datos tratados',
          paragraphs: [
            'El portal puede tratar datos de cuenta (nombre, correo electrónico, rol), datos de autenticación y sesión, registros de actividad operativa y datos técnicos necesarios para la seguridad y auditoría del sistema.',
            'No se tratan datos de categorías especiales salvo que sea estrictamente necesario para el servicio y con el consentimiento explícito del interesado.',
          ],
        },
        {
          title: '3. Finalidad y base legal',
          paragraphs: [
            'Los datos se tratan para la gestión de acceso, autenticación, seguridad del sistema, auditoría interna y comunicación operativa.',
            'La base legal es la ejecución de la relación contractual o profesional con Anclora Group, el cumplimiento de obligaciones legales y el interés legítimo en la seguridad del sistema.',
          ],
        },
        {
          title: '4. Conservación',
          paragraphs: [
            'Los datos se conservan mientras dure la relación de acceso autorizado y, posteriormente, durante los plazos legalmente exigibles para auditoría y defensa de reclamaciones.',
          ],
        },
        {
          title: '5. Destinatarios',
          paragraphs: [
            'Los datos no se ceden a terceros salvo obligación legal o necesidad técnica para la prestación del servicio (proveedores de infraestructura cloud bajo acuerdo de encargo de tratamiento).',
          ],
        },
        {
          title: '6. Derechos de los interesados',
          paragraphs: [
            'El interesado puede ejercer sus derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición dirigiéndose a hola@anclora.com.',
            'También tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).',
          ],
        },
        {
          title: '7. Cookies',
          paragraphs: [
            'Usamos cookies necesarias para sesión, seguridad y preferencias de usuario. Las cookies opcionales de análisis o marketing permanecen desactivadas salvo consentimiento expreso.',
            'Las preferencias pueden modificarse en cualquier momento desde el panel de cookies disponible en el pie de página.',
          ],
        },
        {
          title: '8. Modificaciones',
          paragraphs: [
            'Anclora Group puede actualizar esta política para reflejar cambios normativos o en el servicio. La versión vigente siempre estará disponible en esta página.',
            'Contacto: hola@anclora.com.',
          ],
        },
      ]}
    />
  )
}
