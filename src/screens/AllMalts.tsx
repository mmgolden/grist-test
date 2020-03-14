import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ListRenderItemInfo,
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { AntDesign as Icon } from '@expo/vector-icons';
import { theme } from '../base/theme';
import { MaltCard, Malt } from '../components/MaltCard';
import { listMaltsQuery } from '../graphql/queries/listMalts.query';
import { useWatchQuery } from '../hooks/useWatchQuery';
import { ListMaltsQuery } from '../API';
import { Loading } from '../components/Loading';
import { ScreenError as Error } from '../components/ScreenError';
import { FormError as ErrorMessage } from '../components/FormError';

interface Props {
  navigation: NavigationStackProp;
}

export const AllMalts: React.FC<Props> = ({ navigation }) => {
  const [mutationError, setMutationError] = useState<string | undefined>(
    undefined
  );
  const { loading, error, data } = useWatchQuery<ListMaltsQuery>(
    listMaltsQuery
  );

  const handleMutationError = (message: string) => setMutationError(message);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Malts</Text>
        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => navigation.navigate('AddMalt')}
        >
          <Icon name="plus" size={16} color={theme.colors.primary} />
          <Text style={styles.link}>Add malt</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subTitle}>
        Tap to open test. Swipe left to edit or delete.
      </Text>
      {mutationError && (
        <ErrorMessage
          message={mutationError}
          close={() => setMutationError(undefined)}
        />
      )}
      {data && data.listMalts && data.listMalts.items.length > 0 ? (
        <FlatList
          data={data.listMalts.items}
          renderItem={(info: ListRenderItemInfo<Malt>) => {
            const { item } = info;

            return (
              <MaltCard
                navigation={navigation}
                malt={item}
                handleMutationError={handleMutationError}
              />
            );
          }}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.text}>Add a malt to test...</Text>
      )}
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
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    color: theme.colors.headerFont,
    fontFamily: theme.fonts.bold,
  },
  subTitle: {
    fontSize: 14,
    color: theme.colors.primaryFont,
    fontFamily: theme.fonts.regular,
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    color: theme.colors.primaryFont,
    fontFamily: theme.fonts.regular,
  },
  linkContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  link: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.bold,
    fontSize: 16,
    paddingLeft: 8,
  },
});
