import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { GroupCookieConsent } from '@/components/group/GroupCookieConsent'
import './globals.css'

const fraunces = localFont({
  src: [
    { path: './fonts/Fraunces_72pt-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/Fraunces_72pt-SemiBold.ttf', weight: '600', style: 'normal' },
  ],
  variable: '--font-display',
  display: 'swap',
})

const inter = localFont({
  src: [
    { path: './fonts/Inter_18pt-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/Inter_18pt-Medium.ttf', weight: '500', style: 'normal' },
    { path: './fonts/Inter_18pt-SemiBold.ttf', weight: '600', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Anclora Group — Portal',
  description: 'Entorno operativo privado de Anclora Group',
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
    <html lang="es" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        {children}
        <GroupCookieConsent />
      </body>
    </html>
  )
}
