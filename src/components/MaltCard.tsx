import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { theme } from '../base/theme';
import { useMutation } from '../hooks/useMutation';
import { DeleteMaltInput, DeleteMaltMutation } from '../API';
import { deleteMaltMutation } from '../graphql/mutations/deleteMalt.mutation';
import { listMaltsQuery } from '../graphql/queries/listMalts.query';
import { UNKNOWN_ERROR_MESSAGE } from '../base/constants';

export interface Malt {
  id: string;
  name: string;
  topRoller?: number;
  bottomRoller?: number;
}

interface Props {
  navigation: NavigationStackProp;
  malt: Malt;
  handleMutationError: (message: string) => void;
}

export const MaltCard: React.FC<Props> = ({
  navigation,
  malt,
  handleMutationError,
}) => {
  const { name, topRoller, bottomRoller } = malt;
  const [isDeleted, setIsDeleted] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined);
  const [runMutation] = useMutation<DeleteMaltMutation, DeleteMaltInput>(
    deleteMaltMutation
  );

  const deleteMutation = () => {
    try {
      runMutation({
        variables: { id: malt.id },
        refetchQueries: [
          {
            query: listMaltsQuery,
          },
        ],
        optimisticResponse: {
          deleteMalt: {
            __typename: 'Malt',
            id: malt.id,
            name: malt.name,
            topRoller: malt.topRoller,
            bottomRoller: malt.bottomRoller,
            gristTests: null,
          },
        },
      });
    } catch (err) {
      handleMutationError(UNKNOWN_ERROR_MESSAGE);
    }
  };

  const handleDelete = () => {
    setIsDeleted(true);
    const id = setTimeout(deleteMutation, 1000);
    setTimeoutId(id);
  };

  const handleUndo = () => {
    setIsDeleted(false);
    clearTimeout(timeoutId);
  };

  if (isDeleted) {
    return (
      <TouchableOpacity
        style={[styles.card, styles.deleted]}
        onPress={handleUndo}
      >
        <View style={styles.deletedIcon}>
          <Icon name="trash-can" size={20} color={theme.colors.white} />
        </View>
        <Text style={styles.deletedText}>Malt has been deleted.</Text>
        <Text style={[styles.deletedText, styles.undoText]}>Undo</Text>
      </TouchableOpacity>
    );
  }

  return (
    <Swipeable
      renderRightActions={() => (
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.action, styles.edit]}
            onPress={() => navigation.navigate('UpdateMalt', { malt })}
          >
            <Icon name="pencil" size={20} color={theme.colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.action, styles.delete]}
            onPress={handleDelete}
          >
            <Icon name="trash-can" size={20} color={theme.colors.white} />
          </TouchableOpacity>
        </View>
      )}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('GristTest', { malt })}
      >
        <Text style={styles.title} numberOfLines={1}>
          {name}
        </Text>
        {(topRoller || bottomRoller) && (
          <View style={styles.rollers}>
            {topRoller && (
              <Text style={styles.rollerText}>Top: {topRoller}</Text>
            )}
            {bottomRoller && (
              <Text style={styles.rollerText}>Bottom: {bottomRoller}</Text>
            )}
          </View>
        )}
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.subtleBackground,
    padding: 12,
    borderRadius: 4,
    height: 67,
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    marginBottom: 16,
  },
  deleted: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    flexDirection: 'row',
  },
  deletedText: {
    color: theme.colors.white,
    fontFamily: theme.fonts.regular,
    fontSize: 16,
  },
  deletedIcon: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  undoText: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: 4,
    marginLeft: 16,
  },
  title: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.headerFont,
    fontSize: 18,
    maxWidth: 300,
  },
  rollers: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 4,
  },
  rollerText: {
    color: theme.colors.primaryFont,
    fontSize: 16,
    marginRight: 8,
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    height: 67,
  },
  action: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  edit: {
    backgroundColor: theme.colors.primary,
    marginRight: 12,
  },
  delete: {
    backgroundColor: theme.colors.error,
  },
});
