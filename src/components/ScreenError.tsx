import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../base/theme';
import { UNKNOWN_ERROR_MESSAGE } from '../base/constants';

export const ScreenError: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{UNKNOWN_ERROR_MESSAGE}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  errorText: {
    fontFamily: theme.fonts.regular,
    fontSize: 20,
    color: theme.colors.primaryFont,
  },
});
