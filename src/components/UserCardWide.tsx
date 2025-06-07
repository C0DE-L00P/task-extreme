import type { GitHubUser } from "../types";

export default function UserCardWide({ user, style , key}: { user: GitHubUser; style: React.CSSProperties, key: string | number }) {
  return (
    <div className="px-4" style={style} key={key}>
      <div className="flex items-center bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
        <div className="relative w-20 h-20 mr-6">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-full h-full rounded-full object-cover border-2 border-gray-200"
          />
          <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-800">{user.login}</h3>
          <p className="text-sm text-gray-500 mb-2">ID: {user.id}</p>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span>View Profile</span>
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
        <button className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
