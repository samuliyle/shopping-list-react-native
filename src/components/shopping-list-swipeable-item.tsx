import React, {useCallback} from 'react'
import {useShoppingListStore} from '../store/shoppingListStore'
import {ShoppingListItem} from '../types'
import {View} from 'react-native'
import {Button, ListItem, Text, makeStyles} from '@rneui/themed'
import {palette} from '../theme'

export const ShoppingListSwipeableItem = React.memo(
  ({
    listId,
    item,
    onCheckboxPress,
    onListItemPress
  }: {
    listId: number
    item: ShoppingListItem
    onCheckboxPress: (item: ShoppingListItem) => void
    onListItemPress: (item: ShoppingListItem) => void
  }) => {
    const styles = useStyles()
    const deleteItem = useShoppingListStore(state => state.deleteItem)

    const onItemDelete = useCallback(() => {
      deleteItem(listId, item.name)
    }, [deleteItem, item.name, listId])

    const renderRightContent = useCallback(
      (reset: () => void) => (
        <View style={styles.rightContentContainer}>
          <Button
            icon={{name: 'edit', color: 'white'}}
            containerStyle={styles.editButtonContainer}
            buttonStyle={styles.editButton}
            onPress={() => {
              reset()
              onListItemPress(item)
            }}
          />
          <Button
            onPress={onItemDelete}
            icon={{name: 'delete', color: 'white'}}
            buttonStyle={styles.deleteButton}
            containerStyle={styles.deleteButtonContainer}
          />
        </View>
      ),
      [item, onItemDelete, onListItemPress, styles]
    )

    return (
      <ListItem.Swipeable
        onPress={() => onListItemPress(item)}
        bottomDivider
        rightContent={renderRightContent}>
        <ListItem.CheckBox
          containerStyle={styles.listContainer}
          checkedIcon="check"
          uncheckedIcon="circle-o"
          checked={item.checked}
          onPress={() => onCheckboxPress(item)}
        />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
        </ListItem.Content>
        {item.quantity > 1 && <Text>{item.quantity}</Text>}
      </ListItem.Swipeable>
    )
  }
)

const useStyles = makeStyles(theme => ({
  listContainer: {
    backgroundColor:
      theme.mode === 'dark'
        ? palette.listItem.darkBackground
        : palette.listItem.lightBackground
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
  deleteButton: {
    minHeight: '100%',
    backgroundColor: theme.colors.error
  }
}))
