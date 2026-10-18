import { useCallback, useEffect, useRef, useState } from 'react';
import {
  get,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAfter,
  type QueryConstraint,
} from 'firebase/database';
import { database } from '../services/firebase';
import type { Teacher } from '../types/teacher';

export const TEACHERS_PER_PAGE = 4;

interface TeachersState {
  teachers: Teacher[];
  hasMore: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
}

const INITIAL_STATE: TeachersState = {
  teachers: [],
  hasMore: false,
  isLoading: true,
  isLoadingMore: false,
  error: null,
};

async function fetchTeachersPage(afterKey: string | null, limit: number | null) {
  const constraints: QueryConstraint[] = [orderByKey()];

  if (afterKey !== null) {
    constraints.push(startAfter(afterKey));
  }

  if (limit !== null) {
    constraints.push(limitToFirst(limit + 1));
  }

  const snapshot = await get(
    query(ref(database, 'teachers'), ...constraints)
  );

  const items: Teacher[] = [];

  snapshot.forEach(child => {
    if (child.key) {
      items.push({ id: child.key, ...child.val() });
    }
  });

  if (limit === null) {
    return { items, hasMore: false };
  }

  return { items: items.slice(0, limit), hasMore: items.length > limit };
}

export function useTeachers() {
  const [state, setState] = useState<TeachersState>(INITIAL_STATE);
  const isFetching = useRef(false);

  useEffect(() => {
    let isCancelled = false;

    fetchTeachersPage(null, TEACHERS_PER_PAGE)
      .then(({ items, hasMore }) => {
        if (isCancelled) return;
        setState({ ...INITIAL_STATE, teachers: items, hasMore, isLoading: false });
      })
      .catch(err => {
        console.error('Failed to load teachers:', err);
        if (isCancelled) return;
        setState({
          ...INITIAL_STATE,
          isLoading: false,
          error: 'Failed to load teachers.',
        });
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  const loadNext = useCallback(
    async (limit: number | null) => {
      if (isFetching.current || !state.hasMore) return;

      isFetching.current = true;
      setState(prev => ({ ...prev, isLoadingMore: true }));

      try {
        const lastKey = state.teachers[state.teachers.length - 1]?.id ?? null;
        const { items, hasMore } = await fetchTeachersPage(lastKey, limit);

        setState(prev => ({
          ...prev,
          teachers: [...prev.teachers, ...items],
          hasMore,
          isLoadingMore: false,
        }));
      } catch (err) {
        console.error('Failed to load more teachers:', err);
        setState(prev => ({
          ...prev,
          isLoadingMore: false,
          error: 'Failed to load more teachers.',
        }));
      } finally {
        isFetching.current = false;
      }
    },
    [state.hasMore, state.teachers]
  );

  const loadMore = useCallback(
    () => loadNext(TEACHERS_PER_PAGE),
    [loadNext]
  );
  const loadAll = useCallback(() => loadNext(null), [loadNext]);

  return { ...state, loadMore, loadAll };
}
