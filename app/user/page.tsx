'use client'
import React, { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import { useLanguage } from '~context/LanguageContext'
import UserDetails from './userdetails'

export default function User() {
  const router = useRouter()
  const language = useLanguage()

  const UserComponent = () => {
    return (
      <Suspense fallback={<p>Loading user details...</p>}>
        <UserDetails />
      </Suspense>
    )
  }

  return (
    <>
      <div className={styles.page}>
        <div>
          <span style={{ cursor: 'pointer' }} onClick={() => router.push('/')}>
            &larr; {language.language == 'en' ? 'Go back' : 'Go back, meow'}
          </span>
          <UserComponent />
        </div>
      </div>
    </>
  )
}
