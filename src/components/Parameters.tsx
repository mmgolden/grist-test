import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CreateGristTestMutation } from '../API';
import { DonutChart } from './DonutChart';
import { Legend } from './Legend';
import { theme } from '../base/theme';

interface Props {
  data: CreateGristTestMutation;
}

export const Parameters: React.FC<Props> = ({ data }) => {
  return (
    <View style={styles.parameters}>
      <DonutChart data={data} />
      <Legend data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  parameters: {
    backgroundColor: theme.colors.subtleBackground,
    marginBottom: 32,
    borderRadius: 4,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 18,
    paddingBottom: 6,
  },
});
