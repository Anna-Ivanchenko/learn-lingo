import { createContext } from 'react';

export interface FavoritesContextType {
  favoriteIds: string[];
  isFavoritesLoading: boolean;
  favoritesError: string | null;
  toggleFavorite: (teacherId: string) => Promise<boolean>;
}

export const FavoritesContext = createContext<
  FavoritesContextType | undefined
>(undefined);
