export const getPercentage = (
  value: number,
  total: number,
  decimalPlaces: number = 1
) => parseFloat(((value / total) * 100).toFixed(decimalPlaces));
