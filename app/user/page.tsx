'use client'
import React, { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './page.module.css'
import { useLanguage } from '~context/LanguageContext'
import UserDetails from './userdetails'
import { Mansalva } from 'next/font/google'

const mansalva = Mansalva({ subsets: ['latin'], weight: '400' })

export default function User() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const username = searchParams.get('username')
  const { language } = useLanguage()
  const typedLanguage: 'en' | 'cat' = language as 'en' | 'cat'

  const getText = (key: 'goBack' | 'noUser') => {
    const translations: {
      [key in 'goBack' | 'noUser']: { en: string; cat: string }
    } = {
      goBack: { en: 'Go back', cat: 'Go back, meow' },
      noUser: {
        en: 'Oops! No user selected. Please return home and search for a GitHub user.',
        cat: "Oopsie! No hooman selected. Pwease go home n' search fur a GitHub fren.",
      },
    }
    return translations[key][typedLanguage] || ''
  }

  const containerStyle: React.CSSProperties = {
    margin: 'auto',
    marginTop: '2rem',
    display: 'flex',
    alignItems: 'top',
    minHeight: '80vh',
    textAlign: 'center',
  }

  return (
    <div className={styles.page}>
      <div style={containerStyle}>
        <div>
          <span
            style={{ cursor: 'pointer', fontSize: '3rem' }}
            className={mansalva.className}
            onClick={() => router.push('/')}>
            &larr; {getText('goBack')}
          </span>

          {/* Show message if no username is provided */}
          {!username ? (
            <p
              className={mansalva.className}
              style={{
                fontSize: '1.5rem',
                marginTop: '2rem',
                color: '#666',
              }}>
              {getText('noUser')}
            </p>
          ) : (
            <Suspense fallback={<p>Loading user details...</p>}>
              <UserDetails />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  )
}
