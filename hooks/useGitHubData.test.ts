import { renderHook, act, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import useGitHubData from './useGitHubData'

const server = setupServer(
  http.get('https://api.github.com/users/:username', ({ params }) => {
    if (params.username === 'unknownUser') {
      return HttpResponse.json({ message: 'Not Found' }, { status: 404 })
    }
    if (params.username === 'errorUser') {
      return HttpResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      )
    }
    return HttpResponse.json({
      login: params.username,
      id: 1,
      avatar_url: `https://github.com/${params.username}.png`,
      html_url: `https://github.com/${params.username}`,
      public_repos: 5,
      followers: 10,
      following: 2,
    })
  }),

  http.get('https://api.github.com/users/:username/repos', ({ params }) => {
    if (params.username === 'unknownUser') {
      return HttpResponse.json([], { status: 404 })
    }
    if (params.username === 'errorUser') {
      return HttpResponse.json(
        { message: 'Failed to fetch data from GitHub.' },
        { status: 500 }
      )
    }
    return HttpResponse.json([
      {
        id: 1,
        name: 'repo1',
        html_url: `https://github.com/${params.username}/repo1`,
      },
      {
        id: 2,
        name: 'repo2',
        html_url: `https://github.com/${params.username}/repo2`,
      },
    ])
  })
)

beforeAll(() => server.listen())

afterEach(() => server.restoreHandlers())

afterAll(() => server.close())

describe('useGitHubData hook', () => {
  it('fetches user data successfully', async () => {
    const { result } = renderHook(() => useGitHubData('testUser'))

    expect(result.current.loadingUser).toBe(true)
    expect(result.current.user).toBe(null)

    await waitFor(() => expect(result.current.loadingUser).toBe(false))

    expect(result.current.user?.login).toBe('testUser')
    expect(result.current.error).toBe(null)
  })

  it('fetches repository data successfully', async () => {
    const { result } = renderHook(() => useGitHubData('testUser'))

    expect(result.current.loadingRepos).toBe(true)
    expect(result.current.repos).toEqual([])

    await waitFor(() => expect(result.current.loadingRepos).toBe(false))

    expect(result.current.repos).toHaveLength(2)
    expect(result.current.repos[0].name).toBe('repo1')
    expect(result.current.repos[1].name).toBe('repo2')
    expect(result.current.error).toBe(null)
  })

  it('handles 404 error when user is not found', async () => {
    const { result } = renderHook(() => useGitHubData('unknownUser'))

    await waitFor(() => expect(result.current.loadingUser).toBe(false))

    expect(result.current.error).toBe(
      'User not found. Please check the username.'
    )
    expect(result.current.user).toBe(null)
  })

  it('handles API errors gracefully', async () => {
    const { result } = renderHook(() => useGitHubData('errorUser'))

    await waitFor(() => expect(result.current.loadingUser).toBe(false))
    await waitFor(() => expect(result.current.loadingRepos).toBe(false))

    expect(result.current.error).toBe('Failed to fetch data from GitHub.')
    expect(result.current.user).toBe(null)
    expect(result.current.repos).toEqual([])
  })

  it('updates page state correctly', () => {
    const { result } = renderHook(() => useGitHubData('testUser'))

    act(() => {
      result.current.setPage(2)
    })

    expect(result.current.page).toBe(2)
  })
})
