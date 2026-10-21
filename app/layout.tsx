import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Travezy Global | Your journey is our passion',
  description: 'A women-led Mumbai travel company creating hand-picked holidays, business travel and group journeys around you.',
  generator: 'v0.app',
  icons: {
    icon: '/travezy-logo.png',
    shortcut: '/travezy-logo.png',
    apple: '/travezy-logo.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#263343',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
