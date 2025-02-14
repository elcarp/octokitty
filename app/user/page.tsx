'use client'
import React from 'react'
import useGitHubRepos from '~hooks/useGitHubRepos'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './page.module.css'
import Image from 'next/image'
import { Suspense } from 'react'

export default function User() {
  const searchParams = useSearchParams()

  const username = searchParams.get('username') || ''

  const { loading, error, user, repos } = useGitHubRepos(username)
  const router = useRouter()
  console.log(repos)
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <span style={{ cursor: 'pointer' }} onClick={() => router.push('/')}>
          &larr; Go back
        </span>
        <div className={styles.page}>
          <div>
            <div>
              {loading && <p>loading...</p>}
              {error && <p>{error}</p>}
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
              Repositories: {repos && repos.length}
              {/* {repos &&
              repos.map((repo) => {
                return <>{repo}</>
              })} */}
            </div>
          </div>
        </div>
      </Suspense>
    </>
  )
}
