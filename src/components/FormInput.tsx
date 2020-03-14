import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { theme } from '../base/theme';

interface Props {
  handleChange: (e: string | React.ChangeEvent<any>) => void;
  handleBlur: (e: any) => void;
  value: string;
  label: string;
  autoFocus?: boolean;
  isOptional?: boolean;
  error?: string;
  isPassword?: boolean;
  autoCompleteType?: TextInputProps['autoCompleteType'];
  keyboardType?: TextInputProps['keyboardType'];
  textContentType?: TextInputProps['textContentType'];
}

export const FormInput: React.FC<Props> = ({
  handleChange,
  handleBlur,
  value,
  autoFocus,
  label,
  isOptional,
  error,
  isPassword,
  autoCompleteType,
  keyboardType,
  textContentType,
}) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.label}>
          <Text style={styles.labelText}>{label}</Text>
          {isOptional && <Text style={styles.optionalText}>optional</Text>}
        </View>
        <TextInput
          onChangeText={handleChange}
          onBlur={handleBlur}
          value={value}
          autoFocus={autoFocus}
          style={styles.input}
          secureTextEntry={isPassword}
          autoCompleteType={autoCompleteType}
          keyboardType={keyboardType}
          textContentType={textContentType}
          autoCapitalize="none"
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.subtleBackground,
    borderRadius: 4,
    marginBottom: 12,
    paddingTop: 8,
    paddingLeft: 12,
    paddingRight: 12,
  },
  label: {
    display: 'flex',
    flexDirection: 'row',
  },
  labelText: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.primaryFont,
  },
  optionalText: {
    fontFamily: theme.fonts.italic,
    color: theme.colors.subtleFont,
    marginLeft: 8,
  },
  input: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    paddingTop: 8,
    paddingBottom: 8,
  },
  error: {
    color: theme.colors.error,
    marginBottom: 12,
  },
});
