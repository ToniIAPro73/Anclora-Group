import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Anclora Group',
  description: 'Portal corporativo interno de Anclora',
  icons: {
    icon: '/brand/favicon-anclora-group.svg',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
