import { useState, useEffect, createContext, useContext } from 'react'
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

const LanguageContext = createContext<
  { language: string; setLanguage: (lang: string) => void } | undefined
>(undefined)

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [language, setLanguage] = useState<string>(
    () =>
      (typeof window !== 'undefined' && localStorage.getItem('language')) ||
      'en'
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language)
    }
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
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
    if (!debouncedUsername) return

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
        if (err.status === 404) {
          setError('User not found. Please check the username.')
          console.warn(`GitHub user "${debouncedUsername}" not found. (404)`)
        } else {
          setError(err.message || 'Failed to fetch data from GitHub.')
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
