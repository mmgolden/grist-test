import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { theme } from '../base/theme';
import { FormInput } from '../components/FormInput';
import { FormError as Error } from '../components/FormError';
import { PrimaryButton } from '../components/PrimaryButton';
import { useMutation } from '../hooks/useMutation';
import { CreateGristTestInput, CreateGristTestMutation } from '../API';
import { createGristTestMutation } from '../graphql/mutations/createGristTest.mutation';
import { UNKNOWN_ERROR_MESSAGE } from '../base/constants';
import { Parameters } from '../components/Parameters';

interface Props {
  navigation: NavigationStackProp;
}

interface FormValues {
  beer: string;
  topRoller: string;
  bottomRoller: string;
  totalWeight: string;
  topSeiveWeight: string;
  thirtyWeight: string;
  sixtyWeight: string;
  panWeight: string;
}

const validationSchema = Yup.object().shape({
  beer: Yup.string().required(),
  topRoller: Yup.number()
    .required('roller is a required field')
    .typeError('roller must be a number'),
  bottomRoller: Yup.number()
    .required('roller is a required field')
    .typeError('roller must be a number'),
  totalWeight: Yup.number()
    .required('total weight is a required field')
    .typeError('total weight must be a number'),
  topSeiveWeight: Yup.number()
    .required('top seive weight is a required field')
    .typeError('top seive weight must be a number'),
  thirtyWeight: Yup.number()
    .required('thirty weight is a required field')
    .typeError('thirty weight must be a number'),
  sixtyWeight: Yup.number()
    .required('sixty weight is a required field')
    .typeError('sixty weight must be a number'),
  panWeight: Yup.number()
    .required('pan weight is a required field')
    .typeError('pan weight must be a number'),
});

export const GristTest: React.FC<Props> = ({ navigation }) => {
  const malt = navigation.getParam('malt', {});
  const [runMutation, { data, loading }] = useMutation<
    CreateGristTestMutation,
    CreateGristTestInput
  >(createGristTestMutation);

  const initialValues: FormValues = {
    beer: '',
    topRoller: malt.topRoller ? malt.topRoller.toString() : '',
    bottomRoller: malt.bottomRoller ? malt.bottomRoller.toString() : '',
    totalWeight: '',
    topSeiveWeight: '',
    thirtyWeight: '',
    sixtyWeight: '',
    panWeight: '',
  };

  const handleFormSubmit = (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    const { resetForm, setStatus } = formikHelpers;

    const variables = {
      maltId: malt.id,
      beer: values.beer,
      topRoller: parseFloat(values.topRoller),
      bottomRoller: parseFloat(values.bottomRoller),
      totalWeight: parseInt(values.totalWeight, 10),
      topSeiveWeight: parseInt(values.topSeiveWeight, 10),
      thirtyWeight: parseInt(values.thirtyWeight, 10),
      sixtyWeight: parseInt(values.sixtyWeight, 10),
      panWeight: parseInt(values.panWeight, 10),
    };

    try {
      runMutation({
        variables,
      });
    } catch (err) {
      setStatus(UNKNOWN_ERROR_MESSAGE);
    }

    resetForm();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{malt.name}</Text>
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
              {data && <Parameters data={data} />}
              <FormInput
                label="Beer"
                handleChange={handleChange('beer')}
                handleBlur={handleBlur('beer')}
                value={values.beer}
                error={submitCount > 0 ? errors.beer : undefined}
              />
              <View style={styles.flexContainer}>
                <View style={styles.firstChild}>
                  <FormInput
                    label="Top roller"
                    handleChange={handleChange('topRoller')}
                    handleBlur={handleBlur('topRoller')}
                    value={values.topRoller}
                    error={submitCount > 0 ? errors.topRoller : undefined}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.secondChild}>
                  <FormInput
                    label="Bottom roller"
                    handleChange={handleChange('bottomRoller')}
                    handleBlur={handleBlur('bottomRoller')}
                    value={values.bottomRoller}
                    error={submitCount > 0 ? errors.bottomRoller : undefined}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <FormInput
                label="Total weight"
                handleChange={handleChange('totalWeight')}
                handleBlur={handleBlur('totalWeight')}
                value={values.totalWeight}
                error={submitCount > 0 ? errors.totalWeight : undefined}
                keyboardType="numeric"
              />
              <View style={styles.flexContainer}>
                <View style={styles.firstChild}>
                  <FormInput
                    label="Top seive weight"
                    handleChange={handleChange('topSeiveWeight')}
                    handleBlur={handleBlur('topSeiveWeight')}
                    value={values.topSeiveWeight}
                    error={submitCount > 0 ? errors.topSeiveWeight : undefined}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.secondChild}>
                  <FormInput
                    label="Thirty weight"
                    handleChange={handleChange('thirtyWeight')}
                    handleBlur={handleBlur('thirtyWeight')}
                    value={values.thirtyWeight}
                    error={submitCount > 0 ? errors.thirtyWeight : undefined}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View style={styles.flexContainer}>
                <View style={styles.firstChild}>
                  <FormInput
                    label="Sixty weight"
                    handleChange={handleChange('sixtyWeight')}
                    handleBlur={handleBlur('sixtyWeight')}
                    value={values.sixtyWeight}
                    error={submitCount > 0 ? errors.sixtyWeight : undefined}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.secondChild}>
                  <FormInput
                    label="Pan weight"
                    handleChange={handleChange('panWeight')}
                    handleBlur={handleBlur('panWeight')}
                    value={values.panWeight}
                    error={submitCount > 0 ? errors.panWeight : undefined}
                    keyboardType="numeric"
                  />
                </View>
              </View>
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
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  firstChild: {
    marginRight: 10,
    flex: 1,
  },
  secondChild: {
    flex: 1,
  },
});
