import {
  createApolloErrorProvider,
  createApolloMockedProvider,
  createApolloLoadingProvider,
} from 'apollo-mocked-provider';
import { ApolloProvider } from '@apollo/react-hooks';
import { typeDefs } from '../graphql/type-defs';

export const ApolloMockedProvider = createApolloMockedProvider(typeDefs, {
  provider: ApolloProvider,
});
export const ApolloErrorProvider = createApolloErrorProvider({
  provider: ApolloProvider,
});
export const ApolloLoadingProvider = createApolloLoadingProvider({
  provider: ApolloProvider,
});
