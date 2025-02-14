'use client'
import React, { Suspense } from 'react'
import useGitHubRepos from '~hooks/useGitHubRepos'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './page.module.css'
import Image from 'next/image'

export default function User() {
  const router = useRouter()

  const UserComponent = () => {
    return (
      <Suspense fallback={<p>Loading user details...</p>}>
        <UserDetails />
      </Suspense>
    )
  }

  const UserDetails = () => {
    const searchParams = useSearchParams()
    const username = searchParams.get('username')
    const { user, repos, page, setPage } = useGitHubRepos(username || '')

    return (
      <>
        <p>Username: {user && user.login}</p>
        {user && (
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
        )}
        <p>Repositories (Page {page}):</p>
        <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
          {repos &&
            repos.map((repo) => (
              <li key={repo.id}>
                {repo.name} {repo.description && `- ${repo.description}`}
              </li>
            ))}
        </ul>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}>
            Previous
          </button>
          <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
        </div>
      </>
    )
  }

  return (
    <>
      <span style={{ cursor: 'pointer' }} onClick={() => router.push('/')}>
        &larr; Go back
      </span>
      <div className={styles.page}>
        <div>
          <div>
            <UserComponent />
          </div>
        </div>
      </div>
    </>
  )
}
