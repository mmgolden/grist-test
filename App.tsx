import React, { useEffect, useState } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import AWSAppSyncClient from 'aws-appsync';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import { Rehydrated } from 'aws-appsync-react';
import * as Font from 'expo-font';
import { StyleSheet, Text, View } from 'react-native';
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
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <Rehydrated>
          <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
          </View>
        </Rehydrated>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Remove warnings in device simulator
console.disableYellowBox = true;
