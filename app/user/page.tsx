'use client'
import React, { Suspense } from 'react'
import useGitHubRepos from '~hooks/useGitHubRepos'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './page.module.css'
// import Image from 'next/image'

export default function User() {
  // const searchParams = useSearchParams()

  // const username = searchParams.get('username') || ''

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
    const { user } = useGitHubRepos(username || '')

    return <p>Username: {user && user.login}</p>
  }
  return (
    <>
      <span style={{ cursor: 'pointer' }} onClick={() => router.push('/')}>
        &larr; Go back
      </span>
      <div className={styles.page}>
        <div>
          <div>
            {/* {loading && <p>loading...</p>}
            {error && <p>{error}</p>} */}
            {/* {user && (
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
            )} */}
            <UserComponent />
            Repositories:
            {/* {repos && repos.length} */}
            {/* {repos &&
              repos.map((repo) => {
                return <>{repo}</>
              })} */}
          </div>
        </div>
      </div>
    </>
  )
}
