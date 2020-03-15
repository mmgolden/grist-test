import { fireEvent, waitForElement } from '@testing-library/react-native';
import { renderWithNavigation } from '../../__testUtils__/renderWithNavigation';

const resolvers = {
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
};

test('User can open grist test', async () => {
  const { getByText } = renderWithNavigation({ resolvers });

  const malt = await waitForElement(() => getByText('Lager'));

  fireEvent.press(malt);

  expect(getByText('Beer')).toBeTruthy();
});
