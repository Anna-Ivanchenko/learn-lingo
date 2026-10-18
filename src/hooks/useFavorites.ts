import { useEffect, useState } from 'react';
import { onValue, ref, set } from 'firebase/database';
import { useAuth } from '../contexts/useAuth';
import { database } from '../services/firebase';

interface FavoritesState {
  uid: string;
  ids: string[];
}

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<FavoritesState | null>(null);
  const [favoritesError, setFavoritesError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    const uid = user.uid;
    const favoritesRef = ref(database, `users/${uid}/favorites`);

    const unsubscribe = onValue(
      favoritesRef,
      snapshot => {
        const data = snapshot.val() as Record<string, boolean> | null;

        const ids = data
          ? Object.keys(data).filter(id => data[id] === true)
          : [];

        setFavoritesError(null);
        setFavorites({ uid, ids });
      },
      error => {
        console.error('Failed to load favorites:', error);
        setFavoritesError('Не вдалося завантажити обраних викладачів.');
        setFavorites({ uid, ids: [] });
      },
    );

    return unsubscribe;
  }, [user]);

  const isCurrentUserData = Boolean(user) && favorites?.uid === user?.uid;
  const favoriteIds = isCurrentUserData && favorites ? favorites.ids : [];
  const isFavoritesLoading = Boolean(user) && !isCurrentUserData;

  const toggleFavorite = async (teacherId: string) => {
    if (!user) {
      return false;
    }

    const isFavorite = favoriteIds.includes(teacherId);
    const favoriteRef = ref(
      database,
      `users/${user.uid}/favorites/${teacherId}`
    );

    try {
      if (isFavorite) {
        await set(favoriteRef, null);
      } else {
        await set(favoriteRef, true);
      }

      return true;
    } catch (error) {
      console.error('Failed to update favorites:', error);
      return false;
    }
  };

  return {
  favoriteIds,
  isFavoritesLoading,
  favoritesError,
  toggleFavorite,
};
}