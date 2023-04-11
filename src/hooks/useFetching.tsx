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
        console.log(`Error in fetching ${e.name}`, e.message);
      }
      setError("Oops! There is an error. Don't worry just reload the page 😃");
    } finally {
      setIsLoading(false);
    }
  };

  return { fetching, isLoading, error };
};
