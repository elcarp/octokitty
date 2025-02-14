import { useState, useEffect, useCallback } from 'react'
import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN, // Use an environment variable
})

interface Repo {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count?: number
  forks_count?: number
}

const useGitHubRepos = (username: string) => {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRepos = useCallback(async () => {
    if (!username) return

    setLoading(true)
    setError(null)

    try {
      const response = await octokit.rest.repos.listForUser({
        username,
        per_page: 10, // Fetch only the first 10 repositories
        sort: 'updated',
      })
      setRepos(response.data)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch repositories')
    } finally {
      setLoading(false)
    }
  }, [username])

  useEffect(() => {
    fetchRepos()
  }, [fetchRepos])

  return { repos, loading, error }
}

export default useGitHubRepos
