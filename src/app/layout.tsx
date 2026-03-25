import type { Metadata } from 'next'
import { getGroupDefaultTheme } from '@/lib/group-ui'
import './globals.css'

export const metadata: Metadata = {
  title: 'Anclora Group',
  description: 'Portal corporativo interno de Anclora',
  icons: {
    icon: '/brand/logo-anclora-group.png',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const defaultTheme = getGroupDefaultTheme()

  return (
    <html lang="es">
      <body data-theme={defaultTheme}>{children}</body>
    </html>
  )
}
