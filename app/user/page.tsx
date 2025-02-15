'use client'
import React, { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import { useLanguage } from '~context/LanguageContext'
import UserDetails from './userdetails'
import { Mansalva } from 'next/font/google'

const mansalva = Mansalva({ subsets: ['latin'], weight: '400' })

export default function User() {
  const router = useRouter()
  const { language } = useLanguage()

  const getText = () => (language === 'en' ? 'Go back' : 'Go back, meow')

  const containerStyle: React.CSSProperties = {
    margin: 'auto',
    marginTop: '2rem',
    display: 'flex',
    alignItems: 'top',
    minHeight: '80vh',
  }

  return (
    <div className={styles.page}>
      <div style={containerStyle}>
        <div>
          <span
            style={{ cursor: 'pointer', fontSize: '3rem' }}
            className={mansalva.className}
            onClick={() => router.push('/')}>
            &larr; {getText()}
          </span>
          <Suspense fallback={<p>Loading user details...</p>}>
            <UserDetails />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
