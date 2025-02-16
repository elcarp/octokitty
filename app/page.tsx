'use client'

import Image from 'next/image'
import styles from './page.module.css'
import octocat from '~public/images/octocat-nobg.png'
import React, { useRef } from 'react'
import useGitHubRepos from '~hooks/useGitHubData'
import { useRouter } from 'next/navigation'
import { useLanguage } from '~context/language-context'
import { Mansalva } from 'next/font/google'
import useDebounce from '~hooks/useDebounce'

const mansalva = Mansalva({
  subsets: ['latin'],
  weight: '400',
})

export default function Home() {
  const [username, setUsername] = React.useState('')
  const debouncedUsername = useDebounce(username, 500)
  const { loadingUser, loadingRepos, error, user } =
    useGitHubRepos(debouncedUsername)

  const { language } = useLanguage()
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = React.useCallback(() => {
    if (debouncedUsername.trim().length > 0) {
      router.push(`/user?username=${debouncedUsername}`)
    }
  }, [debouncedUsername, router])

  const handleInputFocus = React.useCallback(() => {
    inputRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <>
      <div className={styles.page}>
        <div style={{ textAlign: 'center' }}>
          <h1 className={styles.slideUp}>
            {language == 'en' ? 'Hello.' : 'Henlo frien.'}
            <span className={mansalva.className} style={{ display: 'block' }}>
              {language == 'en'
                ? 'Can I fetch a profile for you?'
                : 'Shall I retrievz a purrfile fur u?'}
            </span>
          </h1>
          <Image
            className={styles.slideUp}
            priority
            style={{ display: 'block', margin: 'auto' }}
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
              placeholder={
                language == 'en'
                  ? 'Please enter a Github username'
                  : 'Pawlease typez a GitHub name, frien'
              }
            />
          </div>
          <div style={{ height: '14rem' }}>
            {(loadingUser || loadingRepos) && (
              <>
                <p
                  className={mansalva.className}
                  style={{ paddingTop: '1rem' }}>
                  {language == 'en'
                    ? 'Loading...'
                    : 'Spinning… spinning… send treatz to speed up!'}
                </p>
                <div className={`loaderContainer`}>
                  <span className={`loader`}></span>
                </div>
              </>
            )}
            {error && <p>{error}</p>}
            <div style={{ textAlign: 'center' }}>
              {user && (
                <div
                  onClick={handleClick}
                  style={{ width: '18rem', cursor: 'pointer' }}
                  className={`card bounce`}>
                  <Image
                    src={user?.avatar_url}
                    alt={user?.login}
                    width={100}
                    height={100}
                    priority
                    style={{
                      borderRadius: '50%',
                      border: '2px solid black',
                      margin: 'auto',
                      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                      objectFit: 'cover',
                    }}
                  />
                  <p>{user && user.login}</p>
                  <button
                    className={`brutalButton`}
                    style={{
                      display: 'block',
                      margin: 'auto',
                      marginTop: '1rem',
                      cursor: 'pointer',
                    }}
                    onClick={handleClick}>
                    {language == 'en'
                      ? 'View Repositories'
                      : 'See da re-paws-itories?'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
