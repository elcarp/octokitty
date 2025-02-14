'use client'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { LanguageProvider, useLanguage } from '~context/LanguageContext'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// export const metadata: Metadata = {
//   title: "Octokitty's lair",
//   description: 'Find a github user',
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <LanguageProvider>
      <html>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <LanguageSwitcher />
          {children}
        </body>
      </html>
    </LanguageProvider>
  )
}

const LanguageSwitcher = () => {
  const { setLanguage } = useLanguage()

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'end',
        marginRight: '3rem',
        marginTop: '1rem',
        fontSize: '1.5rem',
      }}>
      <span
        style={{ cursor: 'pointer', marginRight: '1rem' }}
        onClick={() => setLanguage('en')}>
        🇬🇧
      </span>
      |
      <span
        style={{ cursor: 'pointer', marginLeft: '1rem' }}
        onClick={() => setLanguage('🐈')}>
        🐈
      </span>
    </nav>
  )
}
