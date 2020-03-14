import React from 'react';
import { render, wait } from '@testing-library/react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { AllMalts } from '../AllMalts';
import { ApolloMockedProvider } from '../../__testUtils__/providers';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

function renderWithNavigation({ screens = {}, navigatorConfig = {} } = {}) {
  const AppNavigator = createStackNavigator(
    {
      AllMalts,
      ...screens,
    },
    { initialRouteName: 'AllMalts', ...navigatorConfig }
  );

  const App = createAppContainer(AppNavigator);

  return {
    ...render(
      <ApolloMockedProvider
        customResolvers={{
          Query: () => ({
            listMalts: () => ({
              items: [
                {
                  id: '1',
                  name: 'Lager',
                  topRoller: null,
                  bottomRoller: null,
                },
              ],
            }),
          }),
        }}
      >
        <App />
      </ApolloMockedProvider>
    ),
    navigationContainer: App,
  };
}

test('Malts are rendered', async () => {
  const { getByText } = renderWithNavigation();

  await wait(() => getByText('Lager'));
});
