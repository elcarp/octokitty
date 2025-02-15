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

// ✅ Next.js App Router handles <html> and <body>, so do NOT include them here
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider>
      <div className={`${geistSans.variable} ${geistMono.variable}`}>
        <LanguageSwitcher />
        {children}
      </div>
    </LanguageProvider>
  )
}
