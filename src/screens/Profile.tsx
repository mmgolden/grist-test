import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { NavigationStackProp } from 'react-navigation-stack';
import { PrimaryButton } from '../components/PrimaryButton';
import { FormError as Error } from '../components/FormError';
import { UNKNOWN_ERROR_MESSAGE } from '../base/constants';
import { theme } from '../base/theme';

interface Props {
  navigation: NavigationStackProp;
}

export const Profile: React.FC<Props> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleLogOut = async () => {
    setIsLoading(true);
    try {
      await Auth.signOut();
      setIsLoading(false);
      navigation.navigate('AuthLoading');
    } catch (err) {
      setIsLoading(false);
      setError(UNKNOWN_ERROR_MESSAGE);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {error && <Error message={error} close={() => setError(undefined)} />}
      <PrimaryButton
        title="Log out"
        label="Log out"
        handlePress={handleLogOut}
        loading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 12,
    paddingBottom: 46,
  },
  title: {
    fontSize: 24,
    color: theme.colors.headerFont,
    fontFamily: theme.fonts.bold,
    marginBottom: 16,
  },
});
