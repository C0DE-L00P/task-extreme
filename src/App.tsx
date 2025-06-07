import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import PaginatedUsers from './pages/PaginatedUsers'
import InfiniteUsers from './pages/InfiniteUsers'
import FavoriteUsers from './pages/FavoriteUsers'
import { ToastContainer } from 'react-toastify';
import ErrorBoundary from './components/ErrorBoundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm mb-6">
              <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center space-x-6">
                  <img src="/github.svg" alt="GitHub Logo" className="w-8 h-8" />
                  <Link to="/" className="text-gray-700 hover:text-gray-900">Paginated</Link>
                  <Link to="/infinite" className="text-gray-700 hover:text-gray-900">Infinite</Link>
                  <Link to="/favorites" className="text-gray-700 hover:text-gray-900">Favorites</Link>
                </div>
              </div>
            </nav>
            <ToastContainer />

            <Routes>
              <Route path="/" element={<PaginatedUsers />} />
              <Route path="/infinite" element={<InfiniteUsers />} />
              <Route path="/favorites" element={<FavoriteUsers />} />
            </Routes>
          </div>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
