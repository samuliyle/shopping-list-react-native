import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {useCallback, useEffect, useState} from 'react'
import {Dimensions, FlatList, View} from 'react-native'
import {ShoppingListItem, RootStackParamList, ShoppingList} from '../types'
import {Text, FAB as Fab, makeStyles, Icon} from '@rneui/themed'
import {useShoppingListStore} from '../store/shoppingListStore'
import {palette} from '../theme'
import {ProgressBar} from '../components/progress-bar'
import {Spacer} from '../components/spacer'
import {useSafeAreaInsetsStyle} from '../hooks/use-safe-area-insets-style'
import {ListActionsBottomSheet} from '../components/list-actions-bottom-sheet'
import {ListItemActionsBottomSheet} from '../components/list-item-actions-bottom-sheet'
import {ShoppingListSwipeableItem} from '../components/shopping-list-swipeable-item'

const deviceHeight = Dimensions.get('window').height
const itemHeight = 57

type Props = NativeStackScreenProps<RootStackParamList, 'ListDetails'>

const headerRight = (openBottomSheet: () => void) => (
  <Icon name="more-vert" onPress={() => openBottomSheet()} size={30} />
)

export const ListDetailsScreen = ({navigation, route}: Props) => {
  const {id} = route.params
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const t0 = new Date()
  const [listActionsBottomSheetOpen, setListActionsBottomSheetOpen] =
    useState(false)
  const [selectedListItem, setSelectedListItem] = useState<
    ShoppingListItem | undefined
  >()
  const insetsStyle = useSafeAreaInsetsStyle()
  const styles = useStyles()

  const lists = useShoppingListStore(state => state.shoppingLists)
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

  const onListItemPress = useCallback((item: ShoppingListItem) => {
    setSelectedListItem(item)
  }, [])

  useEffect(() => {
    navigation.setOptions({
      title: list.name, // Update screen title
      headerRight: () => headerRight(() => setListActionsBottomSheetOpen(true))
    })
  }, [list.name, navigation])

  const onFabPress = () => {
    navigation.push('NewItem', {listId: id})
  }

  const onCheckboxPress = useCallback(
    (item: ShoppingListItem) => {
      toggleItem(id, item.name)
    },
    [id, toggleItem]
  )

  const onUncheckAllItemsPress = () => {
    setListActionsBottomSheetOpen(false)
    uncheckAllItems(list.id)
  }

  const onDeleteCheckedItemsPress = () => {
    setListActionsBottomSheetOpen(false)
    deleteCheckedItems(list.id)
  }

  const renderListItem = useCallback(
    ({item}: {item: ShoppingListItem}) => (
      <ShoppingListSwipeableItem
        listId={id}
        item={item}
        onCheckboxPress={onCheckboxPress}
        onListItemPress={onListItemPress}
      />
    ),
    [id, onCheckboxPress, onListItemPress]
  )
  useEffect(() => {
    const t1 = new Date()
    console.log(
      `ListDetailsScreen load took ${t1.getTime() - t0.getTime()} milliseconds.`
    )
  }, [t0])

  const keyExtractor = (item: ShoppingListItem) => {
    return item.name
  }

  const checkedCount = list.items.filter(i => i.checked).length
  const noItems = list.items.length === 0

  console.log('rerender ListDetailsScreen')

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
          <FlatList
            keyExtractor={keyExtractor}
            data={list.items}
            renderItem={renderListItem}
            initialNumToRender={Math.ceil(deviceHeight / itemHeight)}
            getItemLayout={(_, index) => ({
              length: itemHeight,
              offset: itemHeight * index,
              index
            })}
          />
        </>
      )}
      <Fab
        placement="right"
        onPress={onFabPress}
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
  progressBar: {
    backgroundColor:
      theme.mode === 'dark'
        ? palette.listItem.darkBackground
        : palette.listItem.lightBackground
  }
}))
