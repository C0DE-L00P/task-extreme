import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GitHubUser } from '../types';


interface FavoriteStore {
  favorites: GitHubUser[];
  addFavorite: (user: GitHubUser) => void;
  removeFavorite: (userId: number) => void;
  isFavorite: (userId: number) => boolean;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (user) => set((state) => ({
        favorites: [...state.favorites, user]
      })),
      removeFavorite: (userId) => set((state) => ({
        favorites: state.favorites.filter((user) => user.id !== userId)
      })),
      isFavorite: (userId) => get().favorites.some((user) => user.id === userId),
    }),
    {
      name: 'favorite-storage',
    }
  )
) 