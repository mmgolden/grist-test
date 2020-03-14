import React from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { FormikHelpers } from 'formik';
import { MaltForm, FormValues } from '../components/MaltForm';
import { useMutation } from '../hooks/useMutation';
import { UpdateMaltInput, UpdateMaltMutation } from '../API';
import { updateMaltMutation } from '../graphql/mutations/updateMalt.mutation';
import { listMaltsQuery } from '../graphql/queries/listMalts.query';
import { UNKNOWN_ERROR_MESSAGE } from '../base/constants';

interface Props {
  navigation: NavigationStackProp;
}

export const UpdateMalt: React.FC<Props> = ({ navigation }) => {
  const malt = navigation.getParam('malt', {});

  const [runMutation, { loading }] = useMutation<
    UpdateMaltMutation,
    UpdateMaltInput
  >(updateMaltMutation, {
    onCompleted() {
      navigation.navigate('AllMalts');
    },
  });

  const initialValues: FormValues = {
    name: malt.name || '',
    topRoller: malt.topRoller ? malt.topRoller.toString() : '',
    bottomRoller: malt.bottomRoller ? malt.bottomRoller.toString() : '',
  };

  const handleFormSubmit = (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    const { resetForm, setStatus } = formikHelpers;

    const variables = {
      id: malt.id,
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
      title="Update malt"
      initialValues={initialValues}
      handleFormSubmit={handleFormSubmit}
      loading={loading}
    />
  );
};
