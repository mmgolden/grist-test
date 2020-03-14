import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { theme } from '../base/theme';
import { CreateGristTestMutation } from '../API';
import { getPercentage } from '../base/utils/getPercentage';

interface Props {
  data: CreateGristTestMutation;
}

const getFillColor = (key: string) => {
  switch (key) {
    case 'topSeiveWeight':
      return theme.colors.primary;
    case 'thirtyWeight':
      return theme.colors.secondary;
    case 'sixtyWeight':
      return theme.colors.tertiary;
    case 'panWeight':
      return theme.colors.quaternary;
    default:
      return theme.colors.primaryFont;
  }
};

export const DonutChart: React.FC<Props> = ({ data }) => {
  if (!data) {
    return null;
  }

  const { createGristTest } = data;
  const keys = Object.keys(createGristTest);

  const formattedData = keys
    .filter(
      key =>
        key === 'topSeiveWeight' ||
        key === 'thirtyWeight' ||
        key === 'sixtyWeight' ||
        key === 'panWeight'
    )
    .map(key => ({
      key,
      value: getPercentage(createGristTest[key], createGristTest.totalWeight),
      svg: {
        fill: getFillColor(key),
      },
    }));

  return (
    <View style={styles.pieContainer}>
      <PieChart
        style={styles.pie}
        data={formattedData}
        innerRadius={60}
        padAngle={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pieContainer: {
    marginBottom: 18,
  },
  pie: {
    height: 150,
  },
});
