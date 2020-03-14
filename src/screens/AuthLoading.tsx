import React, { useEffect } from 'react';
import { NavigationSwitchProp } from 'react-navigation';
import { Auth } from 'aws-amplify';
import { Loading } from '../components/Loading';

interface Props {
  navigation: NavigationSwitchProp;
}

export const AuthLoading: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    checkAuth();
  }, []); // eslint-disable-line

  const checkAuth = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      navigation.navigate('SignedIn');
    } catch (err) {
      navigation.navigate('SignedOut');
    }
  };

  return <Loading />;
};
