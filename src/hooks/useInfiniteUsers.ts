import { useMemo, useState } from "react"
import { usersService } from '../services/users'
import { useInfiniteQuery } from '@tanstack/react-query'
import type { GitHubUser } from '../types'

export const useInfiniteUsers = (perPage: number = 10) => {
  const [searchTerm, setSearchTerm] = useState("")

  const { 
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  } = useInfiniteQuery({
    queryKey: ['users', 'infinite'],
    queryFn: ({ pageParam = 1 }) => usersService.getUsers({ perPage, since: pageParam }),
    getNextPageParam: (lastPage: GitHubUser[]) => {
      if (lastPage.length === 0) return undefined
      return lastPage[lastPage.length - 1]?.id
    },
    initialPageParam: 1
  })

  const users = useMemo(() => data?.pages.flat() || [], [data])
  const filteredUsers = useMemo(() => 
    searchTerm === "" ? users : users.filter((user: GitHubUser) => 
      user.login.toLowerCase().includes(searchTerm.toLowerCase())
    ), [users, searchTerm])

  return { 
    users: filteredUsers, 
    loading: status === 'pending',
    hasMore: hasNextPage,
    searchTerm,
    setSearchTerm,
    fetchNextPage: () => {
      if (!isFetchingNextPage && hasNextPage) {
        fetchNextPage()
      }
    }
  }
} 