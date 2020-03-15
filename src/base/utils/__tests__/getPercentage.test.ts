import { getPercentage } from '../getPercentage';

test('getPercentage can accept decimal places', () => {
  const oneDecimalPlace = getPercentage(75, 547);

  expect(oneDecimalPlace).toEqual(13.7);

  const twoDecimalPlaces = getPercentage(34, 213, 2);

  expect(twoDecimalPlaces).toEqual(15.96);

  const threeDecimalPlaces = getPercentage(97, 245, 3);

  expect(threeDecimalPlaces).toEqual(39.592);
});
