import type { Metadata } from 'next'
import { GroupCookieConsent } from '@/components/group/GroupCookieConsent'
import './globals.css'

export const metadata: Metadata = {
  title: 'Anclora Group',
  description: 'Entidad matriz y portal corporativo de Anclora',
  robots: { index: false, follow: false },
  icons: {
    icon: [
      { url: '/brand/favicon.ico', sizes: 'any' },
      { url: '/brand/favicon-32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/brand/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        {children}
        <GroupCookieConsent />
      </body>
    </html>
  )
}
