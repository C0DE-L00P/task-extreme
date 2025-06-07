import type { GitHubUser } from '../types'
import { useFavoriteStore } from '../store/useFavoriteStore'
import UserCardWide from '../components/UserCardWide'

export default function FavoriteUsers() {
  const { favorites } = useFavoriteStore()

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Favorite Users</h1>
      </div>

      <div className="bg-gray-50 rounded-xl shadow-inner p-6">
        {favorites.length === 0 ? (
          <div className="text-center py-10">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <p className="text-gray-500 text-lg">No favorite users yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((user: GitHubUser) => (
              <UserCardWide key={user.id} user={user} optionRemoveOnly={true} style={{marginBottom: '10px'}} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 