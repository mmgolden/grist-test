import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Formik, FormikConfig } from 'formik';
import * as Yup from 'yup';
import { Auth } from 'aws-amplify';
import { NavigationStackProp } from 'react-navigation-stack';
import { theme } from '../base/theme';
import { FormInput } from '../components/FormInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { FormError as Error } from '../components/FormError';
import { UNKNOWN_ERROR_MESSAGE } from '../base/constants';

interface Props {
  navigation: NavigationStackProp;
}

interface FormValues {
  email: string;
  password: string;
  passwordConfirmation: string;
  confirmationCode: string;
}

export const SignUp: React.FC<Props> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  const initialValues: FormValues = {
    email: '',
    password: '',
    passwordConfirmation: '',
    confirmationCode: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(8)
      .required(),
    passwordConfirmation: Yup.string()
      .min(8)
      .required('password confirmation is a required field')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    confirmationCode: isSignedUp ? Yup.string().required() : Yup.string(),
  });

  const handleSignUp: FormikConfig<FormValues>['onSubmit'] = async (
    values,
    { setStatus }
  ) => {
    setIsLoading(true);
    try {
      await Auth.signUp({
        username: values.email.toLowerCase(),
        password: values.password,
      });
      setIsLoading(false);
      setIsSignedUp(true);
    } catch (err) {
      setIsLoading(false);

      if (err.code) {
        setStatus(err.message);
        return;
      }

      setStatus(UNKNOWN_ERROR_MESSAGE);
    }
  };

  const handleConfirmSignUp: FormikConfig<FormValues>['onSubmit'] = async (
    values,
    { setStatus }
  ) => {
    setIsLoading(true);
    try {
      await Auth.confirmSignUp(
        values.email.toLowerCase(),
        values.confirmationCode
      );
      await Auth.signIn(values.email.toLowerCase(), values.password);
      setIsLoading(false);
      navigation.navigate('AllMalts');
    } catch (err) {
      setIsLoading(false);
      setStatus(UNKNOWN_ERROR_MESSAGE);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isSignedUp ? 'Confirm your account' : 'Create an account'}
      </Text>
      {isSignedUp && (
        <Text style={[styles.text, styles.message]}>
          Check your email for the confirmation code.
        </Text>
      )}
      <ScrollView keyboardShouldPersistTaps="handled">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={isSignedUp ? handleConfirmSignUp : handleSignUp}
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
              {isSignedUp ? (
                <FormInput
                  label="Confirmation code"
                  handleChange={handleChange('confirmationCode')}
                  handleBlur={handleBlur('confirmationCode')}
                  value={values.confirmationCode}
                  error={submitCount > 0 ? errors.confirmationCode : undefined}
                />
              ) : (
                <>
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
                    textContentType="newPassword"
                    isPassword
                  />
                  <FormInput
                    label="Confirm password"
                    handleChange={handleChange('passwordConfirmation')}
                    handleBlur={handleBlur('passwordConfirmation')}
                    value={values.passwordConfirmation}
                    error={
                      submitCount > 0 ? errors.passwordConfirmation : undefined
                    }
                    autoCompleteType="password"
                    textContentType="newPassword"
                    isPassword
                  />
                </>
              )}
              <PrimaryButton
                title={isSignedUp ? 'Confirm' : 'Sign up'}
                label={isSignedUp ? 'Confirm' : 'Sign up'}
                handlePress={handleSubmit}
                disabled={isLoading || isSubmitting}
                loading={isLoading}
              />
            </View>
          )}
        </Formik>
        {!isSignedUp && (
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Already have an account?
              <Text
                style={styles.link}
                onPress={() => navigation.navigate('SignIn')}
              >
                {' '}
                Sign in
              </Text>
            </Text>
          </View>
        )}
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
  textContainer: {
    paddingTop: 30,
  },
  text: {
    fontFamily: theme.fonts.regular,
    color: theme.colors.primaryFont,
    fontSize: 16,
  },
  link: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.bold,
  },
  message: {
    marginBottom: 24,
  },
});
