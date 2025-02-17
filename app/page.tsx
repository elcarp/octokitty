'use client'

import Image from 'next/image'
import styles from './page.module.css'
import octocat from '~public/images/octocat-nobg.png'
import React, { useRef } from 'react'
import useGitHubRepos from '~hooks/useGitHubData'
import { useRouter } from 'next/navigation'
import { useLanguage } from '~context/language-context'
import { Mansalva } from 'next/font/google'

const mansalva = Mansalva({
  subsets: ['latin'],
  weight: '400',
})

export default function Home() {
  const [username, setUsername] = React.useState('')

  const { loadingUser, loadingRepos, error, user } = useGitHubRepos(username)
  const { language } = useLanguage() as { language: 'en' | 'cat' }
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = React.useCallback(() => {
    if (username.trim().length > 0) {
      router.push(`/user?username=${username}`)
    }
  }, [username, router])

  const handleInputFocus = React.useCallback(() => {
    inputRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const getText = (
    key: 'greeting' | 'subtext' | 'placeholder' | 'loading' | 'button'
  ) => {
    const translations: Record<string, { en: string; cat: string }> = {
      greeting: { en: 'Hello.', cat: 'Henlo frien.' },
      subtext: {
        en: 'Can I fetch a profile for you?',
        cat: 'Shall I retrievz a purrfile fur u?',
      },
      placeholder: {
        en: 'Please enter a Github username',
        cat: 'Pawlease typez a GitHub name, frien',
      },
      loading: {
        en: 'Loading...',
        cat: 'Spinning… spinning… send treatz to speed up!',
      },
      button: { en: 'View Repositories', cat: 'See da re-paws-itories?' },
    }
    return translations[key][language]
  }

  return (
    <>
      <div className={styles.page}>
        <div className={styles.textCenter}>
          <h1 className={styles.slideUp}>
            {getText('greeting')}
            <span className={mansalva.className} style={{ display: 'block' }}>
              {getText('subtext')}
            </span>
          </h1>
          <Image
            className={`${styles.slideUp} ${styles.centerImage}`}
            priority
            src={octocat}
            width={350}
            height={350}
            alt='GitHub Octocat Logo'
          />
          <div>
            <input
              ref={inputRef}
              className={`${styles.slideUp} ${styles.customInput}`}
              type='text'
              value={username}
              onFocus={handleInputFocus}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={getText('placeholder')}
            />
          </div>
          <div className={styles.loadingContainer}>
            {(loadingUser || loadingRepos) && (
              <>
                <p className={mansalva.className}>{getText('loading')}</p>
                <div className={`loaderContainer`}>
                  <span className={`loader`}></span>
                </div>
              </>
            )}
            {error && <p>{error}</p>}
            {user && (
              <div
                onClick={handleClick}
                className={`card bounce ${styles.userCard}`}>
                <Image
                  src={user?.avatar_url}
                  className='avatar'
                  alt={user?.login}
                  width={100}
                  height={100}
                  priority
                />
                <p>{user.login}</p>
                <button className={`brutalButton`} onClick={handleClick}>
                  {getText('button')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
