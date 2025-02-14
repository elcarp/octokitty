'use client'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { LanguageProvider, useLanguage } from '~context/LanguageContext'
import Head from 'next/head'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <LanguageProvider>
      <html>
        <Head>
          <title>{"Octokitty's Lair"}</title>
          <meta name='description' content={'Find a GitHub user'} />
        </Head>
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
