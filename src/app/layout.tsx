import type { Metadata } from 'next'
import { GroupCookieConsent } from '@/components/group/GroupCookieConsent'
import { getGroupDefaultTheme } from '@/lib/group-ui'
import './globals.css'

export const metadata: Metadata = {
  title: 'Anclora Group',
  description: 'Entidad matriz y portal corporativo de Anclora',
  icons: {
    icon: '/brand/favicon-anclora-group.svg',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const defaultTheme = getGroupDefaultTheme()

  return (
    <html lang="es">
      <body data-theme={defaultTheme}>
        {children}
        <GroupCookieConsent />
      </body>
    </html>
  )
}
