import { useState, useEffect } from 'react'
import { Octokit } from '@octokit/rest'
import useDebounce from '~hooks/useDebounce'

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
  log: { debug: () => {}, info: () => {}, warn: console.warn, error: () => {} },
})

interface Repo {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count?: number
  forks_count?: number
}

interface User {
  login: string
  avatar_url: string
  html_url: string
  name?: string | null
  bio?: string | null
  public_repos: number
  followers: number
  following: number
}

const useGitHubData = (username: string) => {
  const [repos, setRepos] = useState<Repo[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [loadingUser, setLoadingUser] = useState<boolean>(false)
  const [loadingRepos, setLoadingRepos] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const debouncedUsername = useDebounce(username, 500)

  useEffect(() => {
    if (!debouncedUsername || debouncedUsername.trim() === '') return

    const fetchGitHubData = async () => {
      setLoadingUser(true)
      setLoadingRepos(true)
      setError(null)

      try {
        const [userResponse, reposResponse] = await Promise.all([
          octokit.rest.users.getByUsername({ username: debouncedUsername }),
          octokit.rest.repos.listForUser({
            username: debouncedUsername,
            per_page: 5,
            page,
            sort: 'updated',
          }),
        ])

        setUser(userResponse.data)
        setRepos(reposResponse.data)
      } catch (err: any) {
        console.error('GitHub API Error:', err)

        if (err?.response?.status === 404) {
          setError('User not found. Please check the username.')
        } else if (err?.response?.data?.message) {
          setError(err.response.data.message)
        } else if (err?.message) {
          setError(err.message)
        } else {
          setError('Failed to fetch data from GitHub.')
        }
      } finally {
        setLoadingUser(false)
        setLoadingRepos(false)
      }
    }

    fetchGitHubData()
  }, [debouncedUsername, page])

  return { repos, user, loadingUser, loadingRepos, error, page, setPage }
}

export default useGitHubData
