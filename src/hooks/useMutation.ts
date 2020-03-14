import { useState } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { DataProxy } from 'apollo-cache';
import { FetchResult } from 'apollo-link';
import { ApolloError } from 'apollo-client';

type MutationFn<TData, TVariables> = (
  mutationOptions: MutationOptions<TData, TVariables>
) => void;

interface MutationResult<TData> {
  data: TData;
  loading: boolean;
  error?: ApolloError;
}

interface Options {
  onCompleted?: () => void;
}

interface MutationOptions<TData, TVariables> {
  variables: TVariables;
  update?: (cache: DataProxy, mutationResult: FetchResult) => void;
  refetchQueries?: Array<{
    query: any;
    variables?: TVariables;
  }>;
  optimisticResponse?: TData | ((vars: TVariables) => TData);
}

export function useMutation<TData, TVariables>(
  mutation: any,
  options: Options = {}
): [MutationFn<TData, TVariables>, MutationResult<TData>] {
  const client = useApolloClient();

  const initialState: MutationResult<TData> = {
    data: undefined,
    loading: false,
    error: undefined,
  };

  const [result, setResult] = useState<MutationResult<TData>>(initialState);

  const runMutation: MutationFn<TData, TVariables> = (
    mutationOptions: MutationOptions<TData, TVariables>
  ) => {
    setResult(state => ({
      ...state,
      loading: true,
    }));

    client
      .mutate({
        mutation,
        ...mutationOptions,
        variables: { input: mutationOptions.variables },
      })
      .then(res => {
        setResult(state => ({
          ...state,
          data: res.data,
          loading: false,
        }));
        options.onCompleted();
      })
      .catch(err => {
        setResult(state => ({
          ...state,
          loading: false,
          error: err,
        }));
      });
  };

  return [runMutation, result];
}
