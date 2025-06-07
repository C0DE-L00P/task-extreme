import { useState, useEffect, useRef, useMemo } from "react";
import { List, AutoSizer } from "react-virtualized";
import type { ListRowProps } from "react-virtualized";
import type { GitHubUser } from "../types";
import { toast } from "react-toastify";

export default function InfiniteUsers() {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchedIds = useRef(new Set<number>());

  useEffect(() => {
    setLoading(true);
    const lastUserId =
      users && users.length > 0 ? users[users.length - 1]?.id : 0;
    fetch(`https://api.github.com/users?per_page=10&since=${lastUserId}`)
      .then((res) => res.json())
      .then((data: any) => {
        if (data.message && data.message.includes("API rate limit exceeded"))
          throw new Error(data.message);
        const uniqueNewUsers = data.filter(
          (user: GitHubUser) => !fetchedIds.current.has(user.id)
        );
        uniqueNewUsers.forEach((user: GitHubUser) =>
          fetchedIds.current.add(user.id)
        );

        if (uniqueNewUsers.length === 0 && data.length > 0) {
          setPage((prev) => prev + 1);
          setLoading(false);
          return;
        }

        setUsers((prev) => [...prev, ...uniqueNewUsers]);
        setHasMore(data.length > 0);
        setLoading(false);
      })
      .catch((err: any) => {
        toast.error(err.message);
      });
  }, [page]);

  const filteredUsers = useMemo(() => {
    if (searchTerm === "") return users;
    return (
      users.filter((user) =>
        user.login.toLowerCase().includes(searchTerm.toLowerCase())
      ) || []
    );
  }, [users, searchTerm]);

  const rowRenderer = ({ key, index, style }: ListRowProps) => {
    const user = filteredUsers[index];
    if (!user) return null;

    return (
      <div key={key} style={style} className="px-4">
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
            <h3 className="text-lg font-semibold text-gray-800">
              {user.login}
            </h3>
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
  };

  const handleScroll = ({
    clientHeight,
    scrollHeight,
    scrollTop,
  }: {
    clientHeight: number;
    scrollHeight: number;
    scrollTop: number;
  }) => {
    if (!loading && hasMore && scrollHeight - scrollTop - clientHeight < 300) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">GitHub Users</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      <div className="h-[calc(100vh-240px)] bg-gray-50 rounded-xl shadow-inner">
        <AutoSizer>
          {({ height, width }) => (
            <List
              width={width}
              height={height}
              rowCount={filteredUsers.length}
              rowHeight={120}
              rowRenderer={rowRenderer}
              onScroll={handleScroll}
              className="px-2 py-4"
            />
          )}
        </AutoSizer>
      </div>
      {loading && (
        <div className="text-center mt-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-500"></div>
        </div>
      )}
    </div>
  );
}
