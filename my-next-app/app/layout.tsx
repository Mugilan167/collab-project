import './globals.css'
import type { ReactNode } from 'react'
import SessionProviderWrapper from '@/components/SessionProviderWrapper'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  )
}
