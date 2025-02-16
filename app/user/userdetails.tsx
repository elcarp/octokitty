import { useSearchParams } from 'next/navigation'
import { useLanguage } from '~context/language-context'
import useGitHubData from '~hooks/useGitHubData'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import styles from './page.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const UserDetails = () => {
  const { language } = useLanguage() as { language: 'en' | 'cat' }
  const searchParams = useSearchParams()
  const username = searchParams.get('username')
  const { user, repos, page, setPage, loadingRepos } = useGitHubData(
    username || ''
  )

  const [isPageLoading, setIsPageLoading] = useState(false)

  const totalPages = user ? Math.ceil(user.public_repos / 5) : 1

  const handleNextPage = () => {
    if (page < totalPages) {
      setIsPageLoading(true)
      setPage((prev) => prev + 1)
    }
  }

  const handlePrevPage = () => {
    if (page > 1) {
      setIsPageLoading(true)
      setPage((prev) => Math.max(prev - 1, 1))
    }
  }

  useEffect(() => {
    if (!loadingRepos) {
      setIsPageLoading(false)
    }
  }, [loadingRepos])

  const getText = (key: 'publicRepos' | 'previous' | 'next' | 'loading') => {
    const translations: {
      [key in 'publicRepos' | 'previous' | 'next' | 'loading']: {
        en: string
        cat: string
      }
    } = {
      publicRepos: {
        en: `${user?.public_repos} public repositories`,
        cat: `${user?.public_repos} public repawsitories`,
      },
      previous: { en: 'Previous', cat: 'Go backz' },
      next: { en: 'Next', cat: 'Onwardz' },
      loading: { en: 'Loading...', cat: 'Fetching da re-paws-itories...' },
    }
    return translations[key]?.[language] || ''
  }

  return (
    <div className={`card ${styles.user}`}>
      {user && (
        <>
          <Image
            src={user.avatar_url}
            alt={user.login}
            width={100}
            height={100}
            objectFit='cover'
            placeholder='blur'
            blurDataURL={user.avatar_url}
            style={{
              borderRadius: '4rem',
              border: 'solid 2px black',
              margin: 'auto',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            }}
          />
          <h2 style={{ paddingBottom: '.5rem' }}>{user.name}</h2>
          <span style={{ display: 'flex', justifyContent: 'center' }}>
            <FontAwesomeIcon icon={faGithub} width={20} />
            <span style={{ marginLeft: '.3rem' }}>{user.login}</span>
          </span>
          <span
            style={{
              display: 'block',
              color: '#555',
              fontSize: '.85rem',
              marginLeft: '.3rem',
              paddingTop: '.2rem',
            }}>
            {getText('publicRepos')}
          </span>
        </>
      )}

      {repos?.length ? (
        <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
          {repos.map((repo) => (
            <li
              key={repo.id}
              className='backgroundChange'
              onClick={() =>
                window.open(repo.html_url, '_blank', 'noopener,noreferrer')
              }
              style={{
                marginBottom: '1rem',
                borderRadius: '.4rem',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                padding: '1rem',
              }}>
              <strong>{repo.name}</strong>
              {repo.description && (
                <span
                  style={{
                    display: 'block',
                    fontSize: '.85rem',
                    marginTop: '.2rem',
                  }}>
                  {repo.description}
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : null}

      {isPageLoading && (
        <div className={`loaderContainer`}>
          <span className={`loader`}></span>
        </div>
      )}

      {page && totalPages > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '2rem',
          }}>
          <button
            className={`brutalButton`}
            style={{ opacity: page === 1 ? 0.2 : 1 }}
            onClick={handlePrevPage}
            disabled={page === 1}>
            {getText('previous')}
          </button>

          <button
            className='brutalButton'
            onClick={handleNextPage}
            style={{ opacity: page >= totalPages ? 0.2 : 1 }}
            disabled={isPageLoading || page >= totalPages}>
            {getText('next')}
          </button>
        </div>
      )}
    </div>
  )
}

export default UserDetails
