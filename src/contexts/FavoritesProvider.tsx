import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { onValue, ref, set } from 'firebase/database';
import { database } from '../services/firebase';
import { useAuth } from './useAuth';
import { FavoritesContext } from './FavoritesContext';

interface FavoritesState {
  uid: string;
  ids: string[];
  error: string | null;
}

// стала референція, щоб порожній список не створювався заново на кожному рендері
const NO_FAVORITES: string[] = [];

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<FavoritesState | null>(null);

  const uid = user?.uid ?? null;

  useEffect(() => {
    if (!uid) {
      return;
    }

    const favoritesRef = ref(database, `users/${uid}/favorites`);

    const unsubscribe = onValue(
      favoritesRef,
      snapshot => {
        const data = snapshot.val() as Record<string, boolean> | null;
        const ids = data
          ? Object.keys(data).filter(id => data[id] === true)
          : [];

        setFavorites({ uid, ids, error: null });
      },
      error => {
        console.error('Failed to load favorites:', error);
        setFavorites({
          uid,
          ids: [],
          error: 'Failed to load your favorite teachers.',
        });
      }
    );

    return unsubscribe;
  }, [uid]);

  const isCurrentUserData = uid !== null && favorites?.uid === uid;
  const favoriteIds =
    isCurrentUserData && favorites ? favorites.ids : NO_FAVORITES;
  const favoritesError = isCurrentUserData && favorites ? favorites.error : null;
  const isFavoritesLoading = uid !== null && !isCurrentUserData;

  const toggleFavorite = useCallback(
    async (teacherId: string) => {
      if (!uid) {
        return false;
      }

      const isFavorite = favoriteIds.includes(teacherId);
      const favoriteRef = ref(
        database,
        `users/${uid}/favorites/${teacherId}`
      );

      try {
        await set(favoriteRef, isFavorite ? null : true);
        return true;
      } catch (error) {
        console.error('Failed to update favorites:', error);
        return false;
      }
    },
    [uid, favoriteIds]
  );

  const value = useMemo(
    () => ({ favoriteIds, isFavoritesLoading, favoritesError, toggleFavorite }),
    [favoriteIds, isFavoritesLoading, favoritesError, toggleFavorite]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
