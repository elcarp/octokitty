import { useSearchParams } from 'next/navigation'
import { useLanguage } from '~context/LanguageContext'
import useGitHubData from '~hooks/useGitHubData'
import Image from 'next/image'
import React from 'react'
import styles from './page.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { Mansalva } from 'next/font/google'
import Link from 'next/link'

const mansalva = Mansalva({ subsets: ['latin'], weight: '400' })

const UserDetails = () => {
  const { language } = useLanguage() as { language: 'en' | 'cat' }
  const searchParams = useSearchParams()
  const username = searchParams.get('username')
  const { user, repos, page, setPage } = useGitHubData(username || '')

  const getText = (key: 'publicRepos' | 'previous' | 'next') => {
    const translations: {
      [key in 'publicRepos' | 'previous' | 'next']: { en: string; cat: string }
    } = {
      publicRepos: {
        en: `${user?.public_repos} public repositories`,
        cat: `${user?.public_repos} public repawsitories`,
      },
      previous: { en: 'Previous', cat: 'Go backz' },
      next: { en: 'Next', cat: 'Onwardz' },
    }
    return translations[key]?.[language] || ''
  }

  const avatarStyle: React.CSSProperties = {
    borderRadius: '4rem',
    border: 'solid 2px black',
    margin: 'auto',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  }

  const repoCardStyle: React.CSSProperties = {
    cursor: 'pointer',
    padding: '1rem',
    backgroundColor: '#fff',
    marginBottom: '1rem',
    borderRadius: '.4rem',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  }

  return (
    <div className={`card ${styles.user}`}>
      {user && (
        <div style={{ height: '16rem' }}>
          <Image
            src={user.avatar_url}
            alt={user.login}
            width={100}
            height={100}
            objectFit='cover'
            placeholder='blur'
            blurDataURL={user.avatar_url}
            style={avatarStyle}
          />
          <h2 className={mansalva.className} style={{ paddingBottom: '.5rem' }}>
            {user.name}
          </h2>
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
        </div>
      )}

      {repos?.length ? (
        <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
          {repos.map((repo) => (
            <li key={repo.id} className='custom-bounce' style={repoCardStyle}>
              <Link href={repo.html_url} passHref legacyBehavior>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{ textDecoration: 'none', color: 'inherit' }}>
                  <strong>{repo.name}</strong>
                  {repo.description && (
                    <span
                      style={{
                        color: '#555',
                        display: 'block',
                        fontSize: '.85rem',
                        marginTop: '.2rem',
                      }}>
                      {repo.description}
                    </span>
                  )}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      {page && (user?.public_repos ?? 0) > 10 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '2rem',
          }}>
          <button
            className={`customBrutalButton ${
              page === 1 ? '' : 'custom-bounce'
            }`}
            style={{ opacity: page === 1 ? 0.2 : 1 }}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}>
            {getText('previous')}
          </button>
          <button
            className='customBrutalButton custom-bounce'
            onClick={() => setPage((prev) => prev + 1)}>
            {getText('next')}
          </button>
        </div>
      )}
    </div>
  )
}

export default UserDetails
