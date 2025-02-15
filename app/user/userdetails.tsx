import { useSearchParams } from 'next/navigation'
import { useLanguage } from '~context/LanguageContext'
import { useMemo } from 'react'
import useGitHubRepos from '~hooks/useGitHubRepos'
import Image from 'next/image'
import React from 'react'
import styles from './page.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { Mansalva } from 'next/font/google'
import Link from 'next/link'

const mansalva = Mansalva({
  subsets: ['latin'],
  weight: '400',
})

const UserDetails = () => {
  const language = useLanguage()

  const searchParams = useSearchParams()
  const username = searchParams.get('username')
  const { user, repos, page, setPage } = useGitHubRepos(username || '')
  const memoizedUser = useMemo(() => user, [user])
  const memoizedRepos = useMemo(() => repos, [repos])
  console.log(memoizedRepos)
  return (
    <div className={`card ${styles.user}`}>
      <div style={{ height: '16rem' }}>
        {memoizedUser && (
          <>
            <Image
              src={memoizedUser.avatar_url}
              alt={memoizedUser.login}
              width={100}
              height={100}
              objectFit='cover'
              placeholder='blur'
              blurDataURL={memoizedUser.avatar_url}
              style={{
                borderRadius: '4rem',
                border: 'solid 2px black',
                margin: 'auto',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              }}
            />
            <h2
              className={mansalva.className}
              style={{ paddingBottom: '.5rem' }}>
              {memoizedUser?.name}
            </h2>
            <span style={{ display: 'flex' }}>
              <FontAwesomeIcon icon={faGithub} width={20} />
              <span style={{ display: 'block', marginLeft: '.3rem' }}>
                {memoizedUser?.login}
              </span>
            </span>
            <span
              style={{
                display: 'block',
                color: '#555',
                fontSize: '.85rem',
                marginLeft: '.3rem',
                paddingTop: '.2rem',
              }}>
              {typeof language === 'string'
                ? `${memoizedUser?.public_repos} public repositories`
                : language.language === 'en'
                ? `${memoizedUser?.public_repos} public repositories`
                : `${memoizedUser?.public_repos} public repawsitories`}
            </span>
          </>
        )}
      </div>
      <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
        {memoizedRepos && memoizedRepos.length > 0
          ? memoizedRepos.map((repo) => (
              <Link href={repo.html_url} key={repo.id} passHref legacyBehavior>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}>
                  <li
                    className='custom-bounce'
                    style={{
                      cursor: 'pointer',
                      padding: '1rem',
                      backgroundColor: '#fff',
                      marginBottom: '1rem',
                      borderRadius: '.4rem',
                      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    }}>
                    <strong>{repo.name}</strong>{' '}
                    <span
                      style={{
                        color: '#555',
                        display: 'block',
                        fontSize: '.85rem',
                        marginTop: '.2rem',
                      }}>
                      {repo.description && `${repo.description}`}
                    </span>
                  </li>
                </a>
              </Link>
            ))
          : ''}
      </ul>
      {page && (memoizedUser?.public_repos ?? 0) > 10 && (
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
            {language.language === 'en' ? 'Previous' : 'Go backz'}
          </button>
          <button
            className={`customBrutalButton custom-bounce`}
            onClick={() => setPage((prev) => prev + 1)}>
            {language.language === 'en' ? 'Next' : 'Onwardz'}
          </button>
        </div>
      )}
    </div>
  )
}

export default React.memo(UserDetails)
