import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { theme } from '../base/theme';

interface Props {
  handlePress: () => void;
  title: string;
  label: string;
  disabled?: boolean;
  loading?: boolean;
}

export const PrimaryButton: React.FC<Props> = ({
  handlePress,
  title,
  label,
  disabled,
  loading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      accessibilityLabel={label}
      accessibilityRole="button"
      disabled={disabled}
      style={disabled ? [styles.button, styles.disabledButton] : styles.button}
    >
      {loading && <ActivityIndicator size="small" color="#ffffff" />}
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingTop: 16,
    paddingBottom: 16,
    width: '100%',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    textAlign: 'center',
    marginLeft: 12,
  },
});
