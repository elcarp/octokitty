'use client'
import React, { Suspense, useMemo } from 'react'
import useGitHubRepos from '~hooks/useGitHubRepos'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './page.module.css'
import Image from 'next/image'
import { useLanguage } from '~context/LanguageContext'
import UserDetails from './userdetails'

export default function User() {
  const router = useRouter()
  const language = useLanguage()
  console.log(language, 'language')
  const UserComponent = () => {
    return (
      <Suspense fallback={<p>Loading user details...</p>}>
        <UserDetails />
      </Suspense>
    )
  }



  return (
    <>
      <span style={{ cursor: 'pointer' }} onClick={() => router.push('/')}>
        &larr; {language.language == 'en' ? 'Go back' : 'Go back, meow'}
      </span>
      <div className={styles.page}>
        <div>
          <div>
            <UserComponent />
          </div>
        </div>
      </div>
    </>
  )
}
