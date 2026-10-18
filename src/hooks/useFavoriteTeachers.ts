import { useCallback, useEffect, useRef, useState } from 'react';
import { get, ref } from 'firebase/database';
import { database } from '../services/firebase';
import { useFavorites } from './useFavorites';
import { TEACHERS_PER_PAGE } from './useTeachers';
import type { Teacher } from '../types/teacher';

async function fetchTeachersByIds(ids: string[]) {
  const snapshots = await Promise.all(
    ids.map(id => get(ref(database, `teachers/${id}`)))
  );

  const teachers: Teacher[] = [];

  snapshots.forEach(snapshot => {
    if (snapshot.exists() && snapshot.key) {
      teachers.push({ id: snapshot.key, ...snapshot.val() });
    }
  });

  return teachers;
}

export function useFavoriteTeachers() {
  const { favoriteIds, isFavoritesLoading, favoritesError } = useFavorites();
  const [loaded, setLoaded] = useState<Teacher[]>([]);
  const [requestedIds, setRequestedIds] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isFetching = useRef(false);

  const pendingIds = favoriteIds.filter(id => !requestedIds.includes(id));

  const loadBatch = useCallback(
    async (ids: string[]) => {
      if (isFetching.current || ids.length === 0) return;

      isFetching.current = true;
      setIsLoadingMore(true);

      try {
        const teachers = await fetchTeachersByIds(ids);

        setLoaded(prev => [...prev, ...teachers]);
        setRequestedIds(prev => [...prev, ...ids]);
      } catch (err) {
        console.error('Failed to load favorite teachers:', err);
        setError('Failed to load your favorite teachers.');
      } finally {
        isFetching.current = false;
        setIsLoadingMore(false);
      }
    },
    []
  );

  useEffect(() => {
    if (isFavoritesLoading || isInitialized) return;

    let isCancelled = false;

    fetchTeachersByIds(favoriteIds.slice(0, TEACHERS_PER_PAGE))
      .then(teachers => {
        if (isCancelled) return;
        setLoaded(teachers);
        setRequestedIds(favoriteIds.slice(0, TEACHERS_PER_PAGE));
        setIsInitialized(true);
      })
      .catch(err => {
        console.error('Failed to load favorite teachers:', err);
        if (isCancelled) return;
        setError('Failed to load your favorite teachers.');
        setIsInitialized(true);
      });

    return () => {
      isCancelled = true;
    };
  }, [favoriteIds, isFavoritesLoading, isInitialized]);

  const teachers = loaded.filter(teacher => favoriteIds.includes(teacher.id));

  return {
    teachers,
    hasMore: pendingIds.length > 0,
    isLoading: isFavoritesLoading || !isInitialized,
    isLoadingMore,
    error: error || favoritesError,
    loadMore: () => loadBatch(pendingIds.slice(0, TEACHERS_PER_PAGE)),
    loadAll: () => loadBatch(pendingIds),
  };
}
