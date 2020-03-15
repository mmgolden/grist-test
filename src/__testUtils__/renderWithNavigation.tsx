import React from 'react';
import { render } from '@testing-library/react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ApolloMockedProvider } from './providers';
import { AllMalts } from '../screens/AllMalts';
import { GristTest } from '../screens/GristTest';

export function renderWithNavigation({
  screens = {},
  navigatorConfig = {},
  resolvers = {},
} = {}) {
  const AppNavigator = createStackNavigator(
    {
      AllMalts,
      GristTest,
      ...screens,
    },
    { initialRouteName: 'AllMalts', ...navigatorConfig }
  );

  const App = createAppContainer(AppNavigator);

  return {
    ...render(
      <ApolloMockedProvider customResolvers={resolvers}>
        <App />
      </ApolloMockedProvider>
    ),
    navigationContainer: App,
  };
}
