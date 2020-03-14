import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Formik, FormikConfig } from 'formik';
import * as Yup from 'yup';
import { Auth } from 'aws-amplify';
import { NavigationStackProp } from 'react-navigation-stack';
import { theme } from '../base/theme';
import { FormError as Error } from '../components/FormError';
import { FormInput } from '../components/FormInput';
import { PrimaryButton } from '../components/PrimaryButton';
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

export const ResetPassword: React.FC<Props> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [resetRequested, setResetRequested] = useState(false);

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
    password: resetRequested
      ? Yup.string()
          .min(8)
          .required()
      : Yup.string(),
    passwordConfirmation: resetRequested
      ? Yup.string()
          .min(8)
          .required('password confirmation is a required field')
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
      : Yup.string(),
    confirmationCode: resetRequested ? Yup.string().required() : Yup.string(),
  });

  const handleResetPassword: FormikConfig<FormValues>['onSubmit'] = async (
    values,
    { setStatus }
  ) => {
    setIsLoading(true);
    try {
      await Auth.forgotPassword(values.email.toLowerCase());
      setIsLoading(false);
      setResetRequested(true);
    } catch (err) {
      setIsLoading(false);

      if (err.code === 'UserNotFoundException') {
        setResetRequested(true);
        return;
      }

      setStatus(UNKNOWN_ERROR_MESSAGE);
    }
  };

  const handleConfirmResetPassword: FormikConfig<
    FormValues
  >['onSubmit'] = async (values, { setStatus }) => {
    setIsLoading(true);
    try {
      await Auth.forgotPasswordSubmit(
        values.email.toLowerCase(),
        values.confirmationCode,
        values.password
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
      <Text style={styles.title}>Reset password</Text>
      {resetRequested && (
        <Text style={[styles.text, styles.message]}>
          If an account with the provided email exists, a confirmation code will
          be sent to that email.
        </Text>
      )}
      <ScrollView keyboardShouldPersistTaps="handled">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={
            resetRequested ? handleConfirmResetPassword : handleResetPassword
          }
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
              {resetRequested ? (
                <>
                  <FormInput
                    label="Confirmation code"
                    handleChange={handleChange('confirmationCode')}
                    handleBlur={handleBlur('confirmationCode')}
                    value={values.confirmationCode}
                    error={
                      submitCount > 0 ? errors.confirmationCode : undefined
                    }
                  />
                  <FormInput
                    label="New password"
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
              ) : (
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
              )}
              <PrimaryButton
                title={resetRequested ? 'Confirm' : 'Reset'}
                label={resetRequested ? 'Confirm' : 'Reset'}
                handlePress={handleSubmit}
                disabled={isLoading || isSubmitting}
                loading={isLoading}
              />
            </View>
          )}
        </Formik>
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
    lineHeight: 26,
  },
  message: {
    marginBottom: 24,
  },
});
