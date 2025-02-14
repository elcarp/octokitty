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
  const { language, setLanguage } = useLanguage()
  const isEnglish = language == 'en'
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'end',
        marginRight: '3rem',
        marginTop: '1rem',
        fontSize: '1.5rem',
      }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span>🐈</span>
        <label
          style={{
            position: 'relative',
            display: 'inline-block',
            width: '50px',
            height: '25px',
          }}>
          <input
            type='checkbox'
            checked={isEnglish}
            onChange={() => setLanguage(isEnglish ? 'cat' : 'en')}
            style={{ opacity: 0, width: 0, height: 0 }}
          />
          <span
            style={{
              position: 'absolute',
              cursor: 'pointer',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: isEnglish ? '#2196F3' : '#ccc',
              borderRadius: '25px',
              transition: '0.4s',
            }}>
            <span
              style={{
                position: 'absolute',
                height: '18px',
                width: '18px',
                borderRadius: '50%',
                backgroundColor: 'white',
                left: isEnglish ? '28px' : '4px',
                top: '3.5px',
                transition: '0.4s',
              }}></span>
          </span>
        </label>
        <span>🇬🇧</span>
      </div>{' '}
    </nav>
  )
}
