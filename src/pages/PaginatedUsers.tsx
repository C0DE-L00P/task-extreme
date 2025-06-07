import { useMemo } from 'react'
import UserCard from '../components/UserCard'
import { usePaginatedUsers } from '../hooks/usePaginatedUsers'
import type { GitHubUser } from '../types'

const PER_PAGE = 6

export default function PaginatedUsers() {
  const { users, isLoading, searchTerm, lastUserId, setSearchParams } = usePaginatedUsers()

  const handleSearch = useMemo(() => {
    const debounced = (e: React.ChangeEvent<HTMLInputElement>) => {
      const timeoutId = setTimeout(() => {
        setSearchParams({ since: lastUserId.toString(), q: e.target.value })
      }, 400)
      return () => clearTimeout(timeoutId)
    }
    return debounced
  }, [lastUserId, setSearchParams])
  

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Paginated Users</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            defaultValue={searchTerm}
            onChange={(e) => handleSearch(e)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl shadow-inner p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            Array(6).fill(null).map((_, i) => (
              <UserCard key={i} isLoading={true} />
            ))
          ) : (
            users.map((user: GitHubUser) => (
              <UserCard key={user.id} user={user} isLoading={false} />
            ))
          )}
        </div>
      </div>
      <footer className="mt-6 flex justify-center items-center space-x-3">
        <button
          onClick={() => setSearchParams({ since: '1', q: searchTerm })}
          disabled={lastUserId === 1}
          className="cursor-pointer px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
          First
        </button>
        <button
          onClick={() => setSearchParams({ since: Math.max(1, lastUserId - PER_PAGE).toString(), q: searchTerm })}
          disabled={lastUserId === 1}
          className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        <button 
          onClick={() => setSearchParams({ since: (lastUserId + PER_PAGE).toString(), q: searchTerm })} 
          className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md flex items-center"
        >
          Next
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <button
          onClick={() => setSearchParams({ since: (lastUserId + 100).toString(), q: searchTerm })}
          className="cursor-pointer px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors shadow-sm hover:shadow-md flex items-center"
        >
          Last
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </footer>
    </div>
  )
} 