import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { theme } from '../base/theme';
import { FormInput } from './FormInput';
import { FormError as Error } from './FormError';
import { PrimaryButton } from './PrimaryButton';

export interface FormValues {
  name: string;
  topRoller: string;
  bottomRoller: string;
}

interface Props {
  title: string;
  initialValues: FormValues;
  handleFormSubmit: (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => void;
  loading: boolean;
}

export const MaltForm: React.FC<Props> = ({
  title,
  initialValues,
  handleFormSubmit,
  loading,
}) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    topRoller: Yup.number().typeError('top roller must be a number'),
    bottomRoller: Yup.number().typeError('bottom roller must be a number'),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
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
                label="Name"
                handleChange={handleChange('name')}
                handleBlur={handleBlur('name')}
                value={values.name}
                error={submitCount > 0 ? errors.name : undefined}
              />
              <FormInput
                label="Suggested top roller"
                handleChange={handleChange('topRoller')}
                handleBlur={handleBlur('topRoller')}
                value={values.topRoller}
                error={submitCount > 0 ? errors.topRoller : undefined}
                keyboardType="numeric"
                isOptional
              />
              <FormInput
                label="Suggested bottom roller"
                handleChange={handleChange('bottomRoller')}
                handleBlur={handleBlur('bottomRoller')}
                value={values.bottomRoller}
                error={submitCount > 0 ? errors.bottomRoller : undefined}
                keyboardType="numeric"
                isOptional
              />
              <PrimaryButton
                title="Submit"
                label="Submit the form"
                handlePress={handleSubmit}
                disabled={loading || isSubmitting}
                loading={loading}
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
});
