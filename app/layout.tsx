'use client'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '~context/LanguageContext'
import Head from 'next/head'
import LanguageSwitcher from '~components/languageSwitcher'

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
