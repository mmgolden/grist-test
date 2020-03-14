import { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-client';

export function useWatchQuery<TData>(query: any) {
  const client = useApolloClient();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApolloError | undefined>(undefined);
  const [data, setData] = useState<TData | undefined>(undefined);

  useEffect(() => {
    const subscription = client
      .watchQuery({
        query,
        fetchPolicy: 'cache-and-network',
      })
      .subscribe({
        next: res => {
          setLoading(false);
          setData(res.data as TData);
        },
        error: (err: ApolloError) => {
          setLoading(false);
          setError(err);
        },
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []); // eslint-disable-line

  return {
    loading,
    error,
    data,
  };
}
