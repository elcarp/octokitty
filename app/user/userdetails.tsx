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
  console.log(memoizedUser)
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
              <li key={repo.id}>
                {repo.name} {repo.description && `- ${repo.description}`}
              </li>
            ))
          : ''}
      </ul>
      {page && (memoizedUser?.public_repos ?? 0) > 10 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
          }}>
          <button
            className={`customBrutalButton ${
              page === 1 ? '' : 'custom-bounce'
            }`}
            style={{ opacity: page === 1 ? 0.2 : 1 }}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}>
            Previous
          </button>
          <button
            className={`customBrutalButton custom-bounce`}
            onClick={() => setPage((prev) => prev + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default React.memo(UserDetails)
