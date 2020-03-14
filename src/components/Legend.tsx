import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../base/theme';
import { CreateGristTestMutation } from '../API';
import { getPercentage } from '../base/utils/getPercentage';

interface Props {
  data: CreateGristTestMutation;
}

export const Legend: React.FC<Props> = ({ data }) => {
  if (!data) {
    return null;
  }

  const { createGristTest } = data;
  const {
    totalWeight,
    topSeiveWeight,
    thirtyWeight,
    sixtyWeight,
    panWeight,
  } = createGristTest;

  return (
    <View>
      <View style={styles.flexContainer}>
        <View style={styles.legendTextContainer}>
          <View style={[styles.legendColor, styles.topSeive]} />
          <Text style={styles.legendText}>
            {`Top seive: ${getPercentage(topSeiveWeight, totalWeight)}%`}
          </Text>
        </View>
        <View style={styles.legendTextContainer}>
          <View style={[styles.legendColor, styles.thirty]} />
          <Text style={styles.legendText}>
            {`Thirty: ${getPercentage(thirtyWeight, totalWeight)}%`}
          </Text>
        </View>
      </View>
      <View style={styles.flexContainer}>
        <View style={styles.legendTextContainer}>
          <View style={[styles.legendColor, styles.sixty]} />
          <Text style={styles.legendText}>
            {`Sixty: ${getPercentage(sixtyWeight, totalWeight)}%`}
          </Text>
        </View>
        <View style={styles.legendTextContainer}>
          <View style={[styles.legendColor, styles.pan]} />
          <Text style={styles.legendText}>
            {`Pan: ${getPercentage(panWeight, totalWeight)}%`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  legendTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 12,
    flex: 1,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 16 / 2,
    marginRight: 8,
  },
  topSeive: {
    backgroundColor: theme.colors.primary,
  },
  thirty: {
    backgroundColor: theme.colors.secondary,
  },
  sixty: {
    backgroundColor: theme.colors.tertiary,
  },
  pan: {
    backgroundColor: theme.colors.quaternary,
  },
  legendText: {
    fontSize: 14,
    color: theme.colors.headerFont,
    fontWeight: 'bold',
  },
});
