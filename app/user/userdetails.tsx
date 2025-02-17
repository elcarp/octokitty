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
            className='avatar'
          />
          <h2 className={styles.userName}>{user.name}</h2>
          <span className={styles.userInfo}>
            <FontAwesomeIcon icon={faGithub} width={20} />
            <span className={styles.userLogin}>{user.login}</span>
          </span>
          <span className={styles.userPublicRepos}>
            {getText('publicRepos')}
          </span>
        </>
      )}

      {repos?.length ? (
        <ul className={styles.repoList}>
          {repos.map((repo) => (
            <li
              key={repo.id}
              className={`${styles.repoItem} backgroundChange`}
              onClick={() =>
                window.open(repo.html_url, '_blank', 'noopener,noreferrer')
              }>
              <strong>{repo.name}</strong>
              {repo.description && (
                <span className={styles.repoDescription}>
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
        <div className={styles.paginationContainer}>
          <button
            className={`brutalButton ${
              page === 1 ? styles.disabledButton : ''
            }`}
            onClick={handlePrevPage}
            disabled={page === 1}>
            {getText('previous')}
          </button>

          <button
            className={`brutalButton ${
              page >= totalPages ? styles.disabledButton : ''
            }`}
            onClick={handleNextPage}
            disabled={isPageLoading || page >= totalPages}>
            {getText('next')}
          </button>
        </div>
      )}
    </div>
  )
}

export default UserDetails
