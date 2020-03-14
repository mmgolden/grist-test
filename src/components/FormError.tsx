import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { theme } from '../base/theme';
import { UNKNOWN_ERROR_MESSAGE } from '../base/constants';

interface Props {
  close: () => void;
  message: string;
}

export const FormError: React.FC<Props> = ({
  close,
  message = UNKNOWN_ERROR_MESSAGE,
}) => {
  const IconComponent = AntDesign;

  return (
    <TouchableOpacity style={styles.container} onPress={close}>
      <Text style={styles.text}>{message}</Text>
      <IconComponent name="close" size={16} color={theme.colors.error} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(229, 0, 0, 0.05)',
    padding: 12,
    marginBottom: 16,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between' as const,
    alignItems: 'center',
  },
  text: {
    fontFamily: theme.fonts.regular,
    color: theme.colors.error,
  },
});
