import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {useCallback, useContext, useEffect, useState} from 'react'
import {View} from 'react-native'
import {ShoppingListItem, RootStackParamList, ShoppingList} from '../types'
import {
  ListItem,
  Text,
  FAB as Fab,
  makeStyles,
  Button,
  Icon
} from '@rneui/themed'
import {ToastContext} from '../contexts/toast-context'
import {useShoppingListStore} from '../store/shoppingListStore'
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list'
import {palette} from '../theme'
import {ProgressBar} from '../components/progress-bar'
import {Spacer} from '../components/spacer'
import {useSafeAreaInsetsStyle} from '../hooks/use-safe-area-insets-style'
import {ListActionsBottomSheet} from '../components/list-actions-bottom-sheet'
import {ListItemActionsBottomSheet} from '../components/list-item-actions-bottom-sheet'

type Props = NativeStackScreenProps<RootStackParamList, 'ListDetails'>

const headerRight = (openBottomSheet: () => void) => (
  <Icon name="more-vert" onPress={() => openBottomSheet()} size={30} />
)

export const ListDetailsScreen = ({navigation, route}: Props) => {
  const {id} = route.params

  const [listActionsBottomSheetOpen, setListActionsBottomSheetOpen] =
    useState(false)
  const [selectedListItem, setSelectedListItem] = useState<
    ShoppingListItem | undefined
  >()
  const {showToast} = useContext(ToastContext)
  const insetsStyle = useSafeAreaInsetsStyle()
  const styles = useStyles()

  const lists = useShoppingListStore(state => state.shoppingLists)
  const deleteItem = useShoppingListStore(state => state.deleteItem)
  const toggleItem = useShoppingListStore(state => state.toggleItem)
  const updateItem = useShoppingListStore(state => state.updateItem)
  const uncheckAllItems = useShoppingListStore(state => state.uncheckAllItems)
  const deleteCheckedItems = useShoppingListStore(
    state => state.deleteCheckedItems
  )

  const list = lists.find(l => l.id === id) as ShoppingList

  const closeListActionsBottomSheet = () => {
    setListActionsBottomSheetOpen(false)
  }

  const onListItemActionsBottomSheetSave = (
    newItemName: string,
    newItemQuantity: number
  ) => {
    if (selectedListItem) {
      const itemNameWasUpdated = selectedListItem.name !== newItemName
      const listContainsNewItemName =
        itemNameWasUpdated &&
        (!newItemName || list.items.some(i => i.name === newItemName))

      const newName = listContainsNewItemName
        ? selectedListItem.name
        : newItemName

      updateItem(list.id, selectedListItem.name, newName, newItemQuantity)
      setSelectedListItem(undefined)
    }
  }

  const onListItemActionsBottomSheetCancel = () => {
    setSelectedListItem(undefined)
  }

  const onListItemPress = (item: ShoppingListItem) => {
    setSelectedListItem(item)
  }

  useEffect(() => {
    navigation.setOptions({
      title: list.name, // Update screen title
      headerRight: () => headerRight(() => setListActionsBottomSheetOpen(true))
    })
  }, [list.name, navigation])

  const onItemDelete = useCallback(
    (item: ShoppingListItem) => {
      deleteItem(id, item.name)
      showToast(`Deleted ${item.name}`)
    },
    [deleteItem, id, showToast]
  )

  const onFabPress = () => {
    navigation.push('NewItem', {listId: id})
  }

  const onCheckboxPress = useCallback(
    (item: ShoppingListItem) => {
      toggleItem(id, item.name)
      showToast(`toggle ${item.name}`)
    },
    [id, showToast, toggleItem]
  )

  const onUncheckAllItemsPress = () => {
    setListActionsBottomSheetOpen(false)
    uncheckAllItems(list.id)
  }

  const onDeleteCheckedItemsPress = () => {
    setListActionsBottomSheetOpen(false)
    deleteCheckedItems(list.id)
  }

  const renderRightContent = useCallback(
    (item: ShoppingListItem) => (
      <View style={styles.rightContentContainer}>
        <Button
          icon={{name: 'edit', color: 'white'}}
          containerStyle={styles.editButtonContainer}
          buttonStyle={styles.editButton}
          onPress={() => {
            onListItemPress(item)
          }}
        />
        <Button
          onPress={() => onItemDelete(item)}
          icon={{name: 'delete', color: 'white'}}
          buttonStyle={styles.deleteButton}
          containerStyle={styles.deleteButtonContainer}
        />
      </View>
    ),
    [onItemDelete, styles]
  )

  const renderListItem = useCallback(
    ({item}: ListRenderItemInfo<ShoppingListItem>) => (
      <ListItem.Swipeable
        onPress={() => onListItemPress(item)}
        bottomDivider
        rightContent={() => renderRightContent(item)}>
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
    ),
    [onCheckboxPress, renderRightContent, styles.listContainer]
  )

  const checkedCount = list.items.filter(i => i.checked).length
  const noItems = list.items.length === 0

  return (
    <View
      style={[
        noItems ? styles.noItemsContainer : styles.container,
        insetsStyle
      ]}>
      {noItems ? (
        <Text>Tap the plus button to start adding products</Text>
      ) : (
        <>
          <Spacer padding="md" style={styles.progressBar}>
            <ProgressBar
              totalCount={list.items.length}
              filledCount={checkedCount}
            />
          </Spacer>
          <FlashList
            estimatedItemSize={57}
            keyExtractor={item => item.name}
            data={list.items}
            renderItem={renderListItem}
          />
        </>
      )}
      <Fab
        placement="right"
        onPress={() => onFabPress()}
        icon={{name: 'add', color: 'white'}}
        size="large"
        title="Add"
      />
      {listActionsBottomSheetOpen && (
        <ListActionsBottomSheet
          closeBottomSheet={closeListActionsBottomSheet}
          onDeleteCheckedItemsPress={onDeleteCheckedItemsPress}
          onUncheckAllItemsPress={onUncheckAllItemsPress}
        />
      )}
      {selectedListItem && (
        <ListItemActionsBottomSheet
          onCancel={onListItemActionsBottomSheetCancel}
          onSave={onListItemActionsBottomSheetSave}
          selectedItem={selectedListItem}
        />
      )}
    </View>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1
  },
  noItemsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listContainer: {
    backgroundColor:
      theme.mode === 'dark'
        ? palette.listItem.darkBackground
        : palette.listItem.lightBackground
  },
  progressBar: {
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
