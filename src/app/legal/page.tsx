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
        {
          title: '1. Titularidad',
          paragraphs: [
            'Titular y operador del portal: Anclora Group.',
            'Anclora Group es la entidad propietaria y operadora del ecosistema Anclora y de sus verticales tecnológicos. No se afirma registro concedido de marca.',
            'Contacto: hola@anclora.com.',
          ],
        },
        {
          title: '2. Naturaleza del portal',
          paragraphs: [
            'Este portal es un acceso corporativo interno, restringido a usuarios autorizados por Anclora Group. No es un servicio de acceso público ni una plataforma de comercio electrónico.',
          ],
        },
        {
          title: '3. Propiedad intelectual e industrial',
          paragraphs: [
            'La identidad visual, interfaces, documentación propia, flujos operativos y activos intangibles del ecosistema se gobiernan bajo Anclora Group, sin perjuicio de derechos de terceros o datos aportados por usuarios.',
            'Queda prohibida la reproducción, distribución o modificación de los contenidos del portal sin autorización expresa de Anclora Group.',
          ],
        },
        {
          title: '4. Condiciones de acceso',
          paragraphs: [
            'El acceso al portal está restringido a perfiles autorizados. El acceso no autorizado está prohibido y puede dar lugar a acciones legales.',
            'Anclora Group se reserva el derecho de revocar el acceso en cualquier momento por incumplimiento de las condiciones de uso.',
          ],
        },
        {
          title: '5. Responsabilidad',
          paragraphs: [
            'Anclora Group realiza los esfuerzos razonables para mantener el portal disponible y seguro, pero no garantiza la disponibilidad continua e ininterrumpida del servicio.',
            'Anclora Group no asume responsabilidad por daños derivados de accesos no autorizados causados por negligencia del usuario en la custodia de sus credenciales.',
          ],
        },
        {
          title: '6. Marca Anclora Group',
          paragraphs: [
            'La marca Anclora Group y las marcas de sus verticales están en proceso de registro o pendientes de validación legal final. No se afirma registro concedido.',
            'Las marcas, nombres comerciales y logotipos de Anclora no pueden usarse sin autorización expresa.',
          ],
        },
        {
          title: '7. Legislación aplicable',
          paragraphs: [
            'Este aviso legal se rige por la legislación española y de la Unión Europea. Las partes se someten a los juzgados y tribunales competentes conforme a la normativa aplicable.',
          ],
        },
        {
          title: '8. Contacto',
          paragraphs: [
            'Para cuestiones legales: hola@anclora.com.',
          ],
        },
      ]}
    />
  )
}
