'use client'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '~context/LanguageContext'
import LanguageSwitcher from '~components/languageSwitcher'

// ✅ Correct way to add fonts in Next.js
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LanguageProvider>
          <LanguageSwitcher />
          <main>{children}</main> 
        </LanguageProvider>
      </body>
    </html>
  )
}
