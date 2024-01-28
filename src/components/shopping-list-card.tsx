import React from 'react'
import {View} from 'react-native'
import {ProgressBar} from './progress-bar'
import {Button, ListItem, Text, makeStyles} from '@rneui/themed'
import {ShoppingListItem} from '../types'

type Props = {
  items: ShoppingListItem[]
  name: string
  onPress: () => void
  onDelete: () => void
  onEdit: () => void
}

export const ShoppingListCard = ({
  items,
  name,
  onPress,
  onDelete,
  onEdit
}: Props) => {
  const styles = useStyles()
  const totalItems = items.length
  const checkedCount = items.filter(i => i.checked).length

  const renderRightContent = (reset: () => void) => (
    <View style={styles.rightContentContainer}>
      <Button
        icon={{name: 'edit', color: 'white'}}
        containerStyle={styles.editButtonContainer}
        buttonStyle={styles.editButton}
        onPress={() => {
          onEdit()
          reset()
        }}
      />
      <Button
        onPress={onDelete}
        icon={{name: 'delete', color: 'white'}}
        containerStyle={styles.deleteButtonContainer}
        buttonStyle={styles.deleleButton}
      />
    </View>
  )

  return (
    <ListItem.Swipeable
      containerStyle={styles.card}
      onPress={() => onPress()}
      rightContent={reset => renderRightContent(reset)}>
      <ListItem.Content>
        <ListItem.Title style={styles.cardTitle}>
          <Text h4>{name}</Text>
        </ListItem.Title>
        <View style={styles.progressContainer}>
          <View style={styles.progressBarContainer}>
            <ProgressBar totalCount={items.length} filledCount={checkedCount} />
          </View>
          <View style={styles.listSizeContainer}>
            <Text>{`${checkedCount}/${totalItems}`}</Text>
          </View>
        </View>
      </ListItem.Content>
    </ListItem.Swipeable>
  )
}

const useStyles = makeStyles(theme => ({
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
  },
  rightContentContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  editButtonContainer: {
    flex: 1,
    borderRadius: 0
  },
  editButton: {
    minHeight: '100%',
    backgroundColor: theme.colors.success
  },
  deleteButtonContainer: {
    flex: 1,
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    overflow: 'hidden'
  },
  deleleButton: {
    minHeight: '100%',
    backgroundColor: theme.colors.error
  }
}))
