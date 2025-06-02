import { useState, useEffect } from 'react'


function App() {
  const [users, setUsers] = useState<GitHubUser[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const usersPerPage = 10

  useEffect(() => {
    fetch(`https://api.github.com/users?per_page=${usersPerPage}&page=${currentPage}`)
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [currentPage])

  const filteredUsers = users.filter(user =>
    user.login.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function toggleFavorite(user: GitHubUser) {
    console.log(user)
  }

  return (
    <main className="max-w-7xl mx-auto p-5 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">
        <img src="/github.svg" alt="GitHub Logo" className="w-10 h-10 inline-block mb-2 mr-4" />
        GitHub Users
        </h1>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-5 border border-gray-300 rounded"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredUsers.map(user => (
          <div key={user.id} className="border rounded-lg p-4 text-center">
            <img src={user.avatar_url} alt={user.login} className="w-20 h-20 rounded-full mx-auto mb-2" />
            <h3 className="text-lg font-semibold">{user.login}</h3>
            <div className="mt-2 flex justify-center space-x-2">
              <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Profile</a>
              <button
                onClick={() => toggleFavorite(user)}
                className={`text-2x text-gray-300`}
              >
                ★
              </button>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-6 flex justify-center items-center space-x-4">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={() => setCurrentPage(p => p + 1)} className="px-4 py-2 bg-blue-500 text-white rounded">
          Next
        </button>
      </footer>
    </main>
  )
}

export default App
