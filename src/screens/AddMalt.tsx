import React from 'react';
import { FormikHelpers } from 'formik';
import { NavigationStackProp } from 'react-navigation-stack';
import { useMutation } from '../hooks/useMutation';
import { createMaltMutation } from '../graphql/mutations/createMalt.mutation';
import { CreateMaltInput, CreateMaltMutation } from '../API';
import { listMaltsQuery } from '../graphql/queries/listMalts.query';
import { UNKNOWN_ERROR_MESSAGE } from '../base/constants';
import { MaltForm, FormValues } from '../components/MaltForm';

interface Props {
  navigation: NavigationStackProp;
}

export const AddMalt: React.FC<Props> = ({ navigation }) => {
  const [runMutation, { loading }] = useMutation<
    CreateMaltMutation,
    CreateMaltInput
  >(createMaltMutation, {
    onCompleted() {
      navigation.navigate('AllMalts');
    },
  });

  const initialValues: FormValues = {
    name: '',
    topRoller: '',
    bottomRoller: '',
  };

  const handleFormSubmit = (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    const { resetForm, setStatus } = formikHelpers;

    const variables = {
      name: values.name,
      topRoller: values.topRoller ? parseFloat(values.topRoller) : null,
      bottomRoller: values.bottomRoller
        ? parseFloat(values.bottomRoller)
        : null,
    };

    if (variables.topRoller === null) {
      delete variables.topRoller;
    }

    if (variables.bottomRoller === null) {
      delete variables.bottomRoller;
    }

    try {
      runMutation({
        variables,
        refetchQueries: [
          {
            query: listMaltsQuery,
          },
        ],
      });
    } catch (err) {
      setStatus(UNKNOWN_ERROR_MESSAGE);
    }

    resetForm();
  };

  return (
    <MaltForm
      title="Add a malt"
      initialValues={initialValues}
      handleFormSubmit={handleFormSubmit}
      loading={loading}
    />
  );
};
