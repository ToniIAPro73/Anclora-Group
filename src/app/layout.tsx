import type { Metadata } from 'next'
import { GROUP_BRAND_ASSET_VERSION, getGroupDefaultTheme } from '@/lib/group-ui'
import './globals.css'

export const metadata: Metadata = {
  title: 'Anclora Group',
  description: 'Portal corporativo interno de Anclora',
  icons: {
    icon: `/brand/logo-anclora-group.png?v=${GROUP_BRAND_ASSET_VERSION}`,
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
