'use client'
/* eslint-disable react/no-unescaped-entities */

import Image from 'next/image'
import styles from './page.module.css'
import octocat from '~public/images/octocat-nobg.png'
import React from 'react'
import useGitHubRepos from '~hooks/useGitHubRepos'
import { useRouter } from 'next/navigation'
import { useLanguage } from '~context/LanguageContext'

export default function Home() {
  const [username, setUsername] = React.useState('')
  const { loading, error, user } = useGitHubRepos(username)
  const { language } = useLanguage()

  const router = useRouter()

  const handleClick = () => {
    if (username.length > 0) {
      router.push(`/user?username=${username}`)
    }
  }
  return (
    <>
      <div className={styles.page}>
        <div style={{ textAlign: 'center' }}>
          <h1 className={styles.slideUp}>
            {language == 'en' ? 'Hello.' : 'Henlo frien.'}
            <br />{' '}
            {language == 'en'
              ? 'Can I fetch a profile for you?'
              : 'Shall I retrievz a purrfile fur u?'}
          </h1>

          <Image
            className={styles.slideUp}
            priority
            style={{ display: 'block', margin: 'auto' }}
            src={octocat}
            width={400}
            height={400}
            alt='octokitty'
          />
          <input
            className={styles.slideUp}
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={
              language == 'en'
                ? 'Please enter a Github username'
                : 'Pawlease typez a GitHub name, frien'
            }
          />
          {loading && (
            <p>
              {language == 'en'
                ? 'Loading...'
                : 'Spinning… spinning… send treatz to speed up!'}
            </p>
          )}
          {error && <p>{error}</p>}
          <div style={{ textAlign: 'center' }}>
            {user && (
              <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                <p>{user && user.login}</p>
                <Image
                  src={user.avatar_url}
                  alt={user.login}
                  width={100}
                  height={100}
                  style={{
                    borderRadius: '4rem',
                    border: 'solid 2px black',
                    margin: 'auto',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <button
                  style={{
                    display: 'block',
                    margin: 'auto',
                    marginTop: '1rem',
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
    </>
  )
}
