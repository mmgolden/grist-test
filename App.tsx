import React, { useEffect, useState } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import AWSAppSyncClient from 'aws-appsync';
import { ApolloProvider, ApolloProviderProps } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import { Rehydrated } from 'aws-appsync-react';
import * as Font from 'expo-font';
import { AppContainer } from './src/base/routes';
import awsmobile from './src/aws-exports';

Amplify.configure(awsmobile);

const client = new AWSAppSyncClient({
  url: awsmobile.aws_appsync_graphqlEndpoint,
  region: awsmobile.aws_appsync_region,
  auth: {
    type: awsmobile.aws_appsync_authenticationType,
    jwtToken: async () =>
      (await Auth.currentSession()).getIdToken().getJwtToken(),
  },
});

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'roboto-italic': require('./assets/fonts/Roboto-Italic.ttf'),
    });
    setFontLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontLoaded) return null;

  return (
    <ApolloProvider client={client as ApolloProviderProps<any>['client']}>
      <ApolloHooksProvider
        client={client as ApolloProviderProps<any>['client']}
      >
        <Rehydrated>
          <AppContainer />
        </Rehydrated>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

// Remove warnings in device simulator
console.disableYellowBox = true;
