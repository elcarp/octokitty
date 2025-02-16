'use client'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '~context/language-context'
import LanguageSwitcher from '~components/language-switcher/language-switcher'
import Head from 'next/head'
import Footer from '~components/footer/footer'

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
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <Head>
        <title>GitHub Profile Finder | Octokitty</title>
        <meta
          name='description'
          content='Find GitHub users and explore their repositories'
        />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LanguageProvider>
          <LanguageSwitcher />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
