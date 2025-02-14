import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from 'react'
import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN, // Use token for authentication
  log: { debug: () => {}, info: () => {}, warn: console.warn, error: () => {} }, // Suppress Octokit request logs for 404 errors
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
  const [language, setLanguage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'en'
    }
    return 'en'
  })

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
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const fetchRepos = useCallback(async () => {
    if (!username || username.trim() === '') return

    setLoading(true)
    setError(null)

    try {
      const response = await octokit.rest.repos.listForUser({
        username,
        per_page: 10, // Fetch 10 repositories per page
        page,
        sort: 'updated',
      })

      setRepos(response.data)
    } catch (err: any) {
      if (err.status === 404) {
        setError('User not found. Please check the username.')
        console.warn(`GitHub user "${username}" not found. (404)`)
      } else {
        setError(err.message || 'Failed to fetch repositories.')
      }
    } finally {
      setLoading(false)
    }
  }, [username, page])

  const fetchUserInfo = useCallback(async () => {
    if (!username || username.trim() === '') return

    setLoading(true)
    setError(null)

    setTimeout(async () => {
      try {
        const response = await octokit.rest.users.getByUsername({ username })
        setUser(response.data)
      } catch (err: any) {
        if (err.status === 404) {
          setError('User not found. Please check the username.')
          console.warn(`GitHub user "${username}" not found. (404)`)
        } else {
          setError(err.message || 'Failed to fetch user information.')
        }
      } finally {
        setLoading(false)
      }
    }, 500) // Adding a 500ms delay before API call
  }, [username])

  useEffect(() => {
    fetchRepos()
    fetchUserInfo()
  }, [fetchRepos, fetchUserInfo])

  return { repos, user, loading, error, page, setPage }
}

export default useGitHubData
