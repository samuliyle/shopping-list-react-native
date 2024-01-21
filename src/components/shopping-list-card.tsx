import React from 'react'
import {StyleSheet, View} from 'react-native'
import {ProgressBar} from './progress-bar'
import {ListItem, Text} from '@rneui/themed'
import {DeleteButton} from './delete-button'
import {ShoppingListItem} from '../types'

type Props = {
  items: ShoppingListItem[]
  name: string
  onPress: () => void
  onDelete: () => void
}

export const ShoppingListCard = ({items, name, onPress, onDelete}: Props) => {
  const totalItems = items.length
  const checkedCount = items.filter(i => i.checked).length
  const checkedPercentage =
    totalItems === 0 || checkedCount === 0
      ? 0
      : Math.round((checkedCount / totalItems) * 100)

  const renderRightContent = () => <DeleteButton onDelete={onDelete} />

  return (
    <ListItem.Swipeable
      containerStyle={styles.card}
      onPress={() => onPress()}
      rightContent={renderRightContent}>
      <ListItem.Content>
        <ListItem.Title style={styles.cardTitle}>
          <Text h4>{name}</Text>
        </ListItem.Title>
        <View style={styles.progressContainer}>
          <View style={styles.progressBarContainer}>
            <ProgressBar percentage={checkedPercentage} />
          </View>
          <View style={styles.listSizeContainer}>
            <Text>{`${checkedCount}/${totalItems}`}</Text>
          </View>
        </View>
      </ListItem.Content>
    </ListItem.Swipeable>
  )
}

const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  progressBarContainer: {
    width: '80%'
  },
  listSizeContainer: {
    width: '20%',
    alignItems: 'center'
  },
  card: {
    width: '100%',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#171717'
  },
  cardTitle: {
    marginBottom: 8
  }
})
