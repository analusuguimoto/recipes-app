import { useState, useEffect } from 'react';

type FetchFunction = () => Promise<Response>;

function useFetch(fetchFunction: FetchFunction) {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchFunction();
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      }
    }

    fetchData();
  }, [fetchFunction]);

  return { data, error };
}

export default useFetch;
