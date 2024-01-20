import React from 'react'
import {StyleSheet, View} from 'react-native'
import {ProgressBar} from './progress-bar'
import {useListItems} from '../hooks/use-list-items'
import {ListItem, Text} from '@rneui/themed'
import {DeleteButton} from './delete-button'

type Props = {
  listId: number
  name: string
  onPress: () => void
  onDelete: () => void
}

export const ShoppingListCard = ({listId, name, onPress, onDelete}: Props) => {
  const [items] = useListItems(listId)

  const totalItems = items.length
  const checkedCount = items.filter(i => i.checked).length
  const checkedPercentage =
    totalItems === 0 || checkedCount === 0
      ? 0
      : Math.round((checkedCount / totalItems) * 100)

  const renderRightContent = () => <DeleteButton onDelete={onDelete} />

  return (
    <ListItem.Swipeable
      bottomDivider
      onPress={() => onPress()}
      rightContent={renderRightContent}>
      <ListItem.Content>
        <ListItem.Title>{name}</ListItem.Title>
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
    marginTop: 12
  },
  progressBarContainer: {
    width: '80%'
  },
  listSizeContainer: {
    width: '20%',
    alignItems: 'center'
  }
})
