'use client'
import React, { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import { useLanguage } from '~context/LanguageContext'
import UserDetails from './userdetails'
import { Mansalva } from 'next/font/google'

const mansalva = Mansalva({
  subsets: ['latin'],
  weight: '400',
})

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
      <div className={`${styles.page}`}>
        <div
          style={{
            margin: 'auto',
            display: 'flex',
            alignItems: 'top',
            minHeight: '80vh',
          }}>
          <div>
            <span
              style={{ cursor: 'pointer', fontSize: '3rem' }}
              className={mansalva.className}
              onClick={() => router.push('/')}>
              &larr; {language.language == 'en' ? 'Go back' : 'Go back, meow'}
            </span>
            <UserComponent />
          </div>
        </div>
      </div>
    </>
  )
}
