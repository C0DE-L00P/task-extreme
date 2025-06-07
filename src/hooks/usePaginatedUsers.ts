import { useSearchParams } from 'react-router-dom'
import { usersService } from '../services/users'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import type { GitHubUser } from '../types'

export const usePaginatedUsers = (perPage: number = 6) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const lastUserId = Number(searchParams.get('since') || '1')
  const searchTerm = searchParams.get('q') || ''

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users', lastUserId, perPage],
    queryFn: () => usersService.getUsers({ perPage, since: lastUserId }),
  })

  const filteredUsers = useMemo(() => 
    searchTerm === '' ? users : users.filter((user: GitHubUser) => 
      user.login.toLowerCase().includes(searchTerm.toLowerCase())
    ), [users, searchTerm])

  return { 
    users: filteredUsers, 
    isLoading, 
    searchTerm, 
    lastUserId, 
    setSearchParams 
  }
} 