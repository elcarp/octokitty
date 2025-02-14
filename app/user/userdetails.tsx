import { useSearchParams } from 'next/navigation'
import { useLanguage } from '~context/LanguageContext'
import { useMemo } from 'react'
import useGitHubRepos from '~hooks/useGitHubRepos'
import Image from 'next/image'
import React from 'react'

const UserDetails = () => {
  const language = useLanguage()

  const searchParams = useSearchParams()
  const username = searchParams.get('username')
  const { user, repos, page, setPage } = useGitHubRepos(username || '')
  const memoizedUser = useMemo(() => user, [user])
  const memoizedRepos = useMemo(() => repos, [repos])
  console.log(page)
  return (
    <>
      <p>
        {typeof language === 'string'
          ? 'Username'
          : language.language === 'en'
          ? 'Username'
          : 'Meowsername'}
        : {memoizedUser?.login}
      </p>
      <div style={{ position: 'relative', height: '100px', width: '100px' }}>
        {memoizedUser && (
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
        )}
      </div>
      <p>
        {typeof language === 'string'
          ? 'Repositories'
          : language.language === 'en'
          ? 'Repositories'
          : 'Repawsitories'}
        : {memoizedUser?.public_repos}
      </p>
      <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
        {memoizedRepos && memoizedRepos.length > 0
          ? memoizedRepos.map((repo) => (
              <li key={repo.id}>
                {repo.name} {repo.description && `- ${repo.description}`}
              </li>
            ))
          : 'none'}
      </ul>
      {page && (memoizedUser?.public_repos ?? 0) > 10 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
          }}>
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}>
            Previous
          </button>
          <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
        </div>
      )}
    </>
  )
}

export default React.memo(UserDetails)
