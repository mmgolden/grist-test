import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Formik, FormikConfig } from 'formik';
import * as Yup from 'yup';
import { Auth } from 'aws-amplify';
import { NavigationStackProp } from 'react-navigation-stack';
import { theme } from '../base/theme';
import { PrimaryButton } from '../components/PrimaryButton';
import { FormInput } from '../components/FormInput';
import { FormError as Error } from '../components/FormError';
import { UNKNOWN_ERROR_MESSAGE } from '../base/constants';

interface Props {
  navigation: NavigationStackProp;
}

interface FormValues {
  email: string;
  password: string;
}

export const SignIn: React.FC<Props> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string().required(),
  });

  const handleFormSubmit: FormikConfig<FormValues>['onSubmit'] = async (
    values,
    { setStatus }
  ) => {
    setIsLoading(true);
    try {
      await Auth.signIn(values.email.toLowerCase(), values.password);
      setIsLoading(false);
      navigation.navigate('AllMalts');
    } catch (err) {
      setIsLoading(false);

      if (err.code) {
        setStatus(err.message);
        return;
      }

      setStatus(UNKNOWN_ERROR_MESSAGE);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in to continue</Text>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isSubmitting,
            errors,
            status,
            setStatus,
            submitCount,
          }) => (
            <View>
              {status && (
                <Error message={status} close={() => setStatus(undefined)} />
              )}
              <FormInput
                label="Email"
                handleChange={handleChange('email')}
                handleBlur={handleBlur('email')}
                value={values.email}
                error={submitCount > 0 ? errors.email : undefined}
                autoCompleteType="email"
                keyboardType="email-address"
                textContentType="emailAddress"
              />
              <FormInput
                label="Password"
                handleChange={handleChange('password')}
                handleBlur={handleBlur('password')}
                value={values.password}
                error={submitCount > 0 ? errors.password : undefined}
                autoCompleteType="password"
                textContentType="password"
                isPassword
              />
              <PrimaryButton
                title="Login"
                label="Login"
                handlePress={handleSubmit}
                disabled={isLoading || isSubmitting}
                loading={isLoading}
              />
            </View>
          )}
        </Formik>
        <View style={styles.linksContainer}>
          <Text style={styles.text}>
            Don't have an account?
            <Text
              style={styles.link}
              onPress={() => navigation.navigate('SignUp')}
            >
              {' '}
              Sign up
            </Text>
          </Text>
          <Text style={styles.text}>
            Forgot password?
            <Text
              style={styles.link}
              onPress={() => navigation.navigate('ResetPassword')}
            >
              {' '}
              Reset password
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 12,
    flex: 1,
  },
  title: {
    fontSize: 24,
    color: theme.colors.headerFont,
    fontFamily: theme.fonts.bold,
    marginBottom: 16,
  },
  linksContainer: {
    paddingTop: 24,
  },
  text: {
    fontFamily: theme.fonts.regular,
    color: theme.colors.primaryFont,
    fontSize: 16,
    marginTop: 12,
    marginBottom: 16,
  },
  link: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.bold,
    padding: 8,
  },
});
