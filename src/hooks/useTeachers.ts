import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { database } from '../services/firebase';
import type { Teacher } from '../types/teacher';

export function useTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const teachersRef = ref(database, 'teachers');

    const unsubscribe = onValue(
      teachersRef,
      snapshot => {
        const data = snapshot.val() as Record<
          string,
          Omit<Teacher, 'id'>
        > | null;

        setTeachers(
          data
            ? Object.entries(data).map(([id, teacher]) => ({ id, ...teacher }))
            : []
        );
        setError(null);
        setIsLoading(false);
      },
      err => {
        console.error('Failed to load teachers:', err);
        setError('Failed to load teachers.');
        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { teachers, isLoading, error };
}
