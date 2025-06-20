import { List, AutoSizer } from "react-virtualized";
import type { ListRowProps } from "react-virtualized";
import UserCardWide from "../components/UserCardWide";
import { useInfiniteUsers } from "../hooks/useInfiniteUsers";

export default function InfiniteUsers() {
  const { users, loading, hasMore, searchTerm, setSearchTerm, fetchNextPage } = useInfiniteUsers();

  const rowRenderer = ({ key, index, style }: ListRowProps) => {
    return users[index] && <UserCardWide user={users[index]} key={key} style={style}/>;
  };

  const handleScroll = ({ clientHeight, scrollHeight, scrollTop }: { clientHeight: number; scrollHeight: number; scrollTop: number }) => {
    if (!loading && hasMore && scrollHeight - scrollTop - clientHeight < 300) {
      fetchNextPage();
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
              rowCount={users.length}
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
