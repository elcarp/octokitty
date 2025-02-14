'use client'
import Image from 'next/image'
import styles from './page.module.css'
import octocat from '~public/images/octocat-nobg.png'
import React from 'react'
import useGitHubRepos from '~hooks/useGitHubRepos'

export default function Home() {
  const [language, setLanguage] = React.useState('🇬🇧')
  const [username, setUsername] = React.useState('')
  const { repos, loading, error } = useGitHubRepos(username)

  return (
    <>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'end',
          marginRight: '3rem',
          marginTop: '1rem',
          fontSize: '1.5rem',
        }}>
        <span
          style={{ cursor: 'pointer', marginRight: '1rem' }}
          onClick={() => setLanguage('🇬🇧')}>
          🇬🇧
        </span>
        |
        <span
          style={{ cursor: 'pointer', marginLeft: '1rem' }}
          onClick={() => setLanguage('🐈')}>
          🐈
        </span>
      </nav>
      <div className={styles.page}>
        <div style={{ textAlign: 'center' }}>
          <h1 className={styles.slideUp} style={{ lineHeight: '3.8rem' }}>
            {language == '🇬🇧' ? 'Hello.' : 'Henlo frien.'} <br />
            {language == '🇬🇧'
              ? 'Can I fetch a profile for you?'
              : 'Shall I retrievz a purrfile fur u?'}
          </h1>
          <Image
            className={styles.slideUp}
            style={{ display: 'block', margin: 'auto' }}
            src={octocat}
            width={400}
            height={400}
            alt='octokitty'
          />
          <input
            className={styles.slideUp}
            style={{
              padding: '1rem',
              width: '40vw',
              borderRadius: '1rem',
              fontSize: '1rem',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            }}
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={
              language == '🇬🇧'
                ? 'Please enter a Github username'
                : 'Pawlease typez a GitHub name, frien'
            }
          />

          {loading && <p>Loading...</p>}
          {error && <p className='text-red-500'>{error}</p>}
          <ul className='mt-4'>
            {repos.map((repo) => (
              <li key={repo.id} className='mb-2'>
                <a
                  href={repo.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-500'>
                  {repo.name} ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
                </a>
                <p className='text-gray-600 text-sm'>{repo.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
