import { useState } from 'react';

export const useFetching = (callback: (s?: string) => Promise<void>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetching = async (...args: string[] | []) => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};
