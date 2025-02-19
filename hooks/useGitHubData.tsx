import { useState, useEffect } from 'react'
import { Octokit } from '@octokit/rest'
import useDebounce from '~hooks/useDebounce'

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
  log: { debug: () => {}, info: () => {}, warn: console.warn, error: () => {} },
})

type GitHubUser = {
  login: string
  avatar_url: string
  html_url: string
  name: string | null
  public_repos: number
}

const useGitHubData = (username: string) => {
  const [repos, setRepos] = useState<any[]>([])
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [loadingUser, setLoadingUser] = useState(false)
  const [loadingRepos, setLoadingRepos] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(5) 

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
            per_page: perPage,
            page,
            sort: 'updated',
          }),
        ])

        setUser(userResponse.data)
        setRepos(reposResponse.data)
      } catch (err) {
        console.error('GitHub API Error:', err)

        if ((err as any)?.response?.status === 404) {
          setError('User not found. Please check the username.')
          setUser(null)
        } else {
          setError('Failed to fetch data from GitHub.')
        }
      } finally {
        setLoadingUser(false)
        setLoadingRepos(false)
      }
    }

    fetchGitHubData()
  }, [debouncedUsername, page, perPage]) 

  return {
    repos,
    user,
    loadingUser,
    loadingRepos,
    error,
    page,
    perPage, 
    setPage,
    setPerPage, 
  }
}

export default useGitHubData
