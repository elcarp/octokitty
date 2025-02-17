'use client'
import React, { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './page.module.css'
import { useLanguage } from '~context/language-context'
import UserDetails from './userdetails'
import { Mansalva } from 'next/font/google'

const mansalva = Mansalva({ subsets: ['latin'], weight: '400' })

export default function User() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const username = searchParams.get('username')
  const { language } = useLanguage()
  const typedLanguage = language as 'en' | 'cat'

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

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div>
          <span
            style={{ cursor: 'pointer', fontSize: '3rem' }}
            className={`${mansalva.className} bounce`}
            onClick={() => router.push('/')}>
            &larr; {getText('goBack')}
          </span>

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
