import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
  createBottomTabNavigator,
  NavigationTabProp,
} from 'react-navigation-tabs';
import { AntDesign } from '@expo/vector-icons';
import { theme } from './theme';
import { SignUp as SignUpScreen } from '../screens/SignUp';
import { SignIn as SignInScreen } from '../screens/SignIn';
import { AllMalts as AllMaltsScreen } from '../screens/AllMalts';
import { AddMalt as AddMaltScreen } from '../screens/AddMalt';
import { UpdateMalt as UpdateMaltScreen } from '../screens/UpdateMalt';
import { GristTest as GristTestScreen } from '../screens/GristTest';
import { AuthLoading as AuthLoadingScreen } from '../screens/AuthLoading';
import { Profile as ProfileScreen } from '../screens/Profile';
import { ResetPassword as ResetPasswordScreen } from '../screens/ResetPassword';

const getIcon = (
  navigation: NavigationTabProp,
  tintColor: string | undefined
) => {
  const { routeName } = navigation.state;
  const IconComponent = AntDesign;
  let iconName: string;

  if (routeName === 'AllMalts') iconName = 'home';
  if (routeName === 'AddMalt') iconName = 'plus';
  if (routeName === 'Profile') iconName = 'user';

  return <IconComponent name={iconName} size={28} color={tintColor} />;
};

const defaultStackNavigationStyle = {
  headerTintColor: theme.colors.primaryFont,
  headerStyle: {
    shadowOpacity: 0,
    elevation: 0,
  },
  headerTitleStyle: {
    display: 'none' as const,
  },
  cardStyle: {
    backgroundColor: theme.colors.white,
  },
  headerBackTitle: 'Back',
};

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavigationStyle,
  }
);

const MaltStack = createStackNavigator(
  {
    AllMalts: AllMaltsScreen,
    AddMalt: AddMaltScreen,
    UpdateMalt: UpdateMaltScreen,
    GristTest: GristTestScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavigationStyle,
  }
);

const SignedOut = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    ResetPassword: ResetPasswordScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavigationStyle,
  }
);

const SignedIn = createBottomTabNavigator(
  {
    AllMalts: {
      screen: MaltStack,
      navigationOptions: () => ({
        title: 'Malts',
      }),
    },
    Profile: ProfileStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => getIcon(navigation, tintColor),
    }),
    tabBarOptions: {
      activeTintColor: theme.colors.primary,
      inactiveTintColor: 'gray',
      style: {
        height: 60,
        padding: 2,
      },
      labelStyle: {
        fontFamily: theme.fonts.regular,
        fontSize: 12,
      },
    },
  }
);

const rootNavigation = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    SignedOut,
    SignedIn,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export const AppContainer = createAppContainer(rootNavigation);
