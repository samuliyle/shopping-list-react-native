import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {useContext, useEffect, useState} from 'react'
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
import {FlashList} from '@shopify/flash-list'
import {palette} from '../theme'
import {ProgressBar} from '../components/progress-bar'
import {Spacer} from '../components/spacer'
import {useSafeAreaInsetsStyle} from '../hooks/use-safe-area-insets-style'
import {ListActionsBottomSheet} from '../components/list-actions-bottom-sheet'

type Props = NativeStackScreenProps<RootStackParamList, 'ListDetails'>

const headerRight = (openBottomSheet: () => void) => (
  <Icon name="more-vert" onPress={() => openBottomSheet()} size={30} />
)

export const ListDetailsScreen = ({navigation, route}: Props) => {
  const {id} = route.params

  const [bottomSheetOpen, setBottomSheetOpen] = useState(false)
  const {showToast} = useContext(ToastContext)
  const insetsStyle = useSafeAreaInsetsStyle()
  const styles = useStyles()

  const lists = useShoppingListStore(state => state.shoppingLists)
  const deleteItem = useShoppingListStore(state => state.deleteItem)
  const toggleItem = useShoppingListStore(state => state.toggleItem)
  const uncheckAllItems = useShoppingListStore(state => state.uncheckAllItems)
  const deleteCheckedItems = useShoppingListStore(
    state => state.deleteCheckedItems
  )

  const list = lists.find(l => l.id === id) as ShoppingList

  const closeListActionsBottomSheet = () => {
    setBottomSheetOpen(false)
  }

  useEffect(() => {
    navigation.setOptions({
      title: list.name, // Update screen title
      headerRight: () => headerRight(() => setBottomSheetOpen(true))
    })
  }, [list.name, navigation])

  const onItemDelete = (item: ShoppingListItem) => {
    deleteItem(id, item.name)
    showToast(`Deleted ${item.name}`)
  }

  const onFabPress = () => {
    navigation.push('NewItem', {listId: id})
  }

  const onCheckboxPress = (item: ShoppingListItem) => {
    toggleItem(id, item.name)
    showToast(`toggle ${item.name}`)
  }

  const onUncheckAllItemsPress = () => {
    setBottomSheetOpen(false)
    uncheckAllItems(list.id)
  }

  const onDeleteCheckedItemsPress = () => {
    setBottomSheetOpen(false)
    deleteCheckedItems(list.id)
  }

  const renderRightContent = (item: ShoppingListItem) => (
    <Button
      onPress={() => onItemDelete(item)}
      icon={{name: 'delete', color: 'white'}}
      buttonStyle={styles.deleteButton}
      containerStyle={styles.deleteButtonContainer}
    />
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
            renderItem={data => (
              <ListItem.Swipeable
                bottomDivider
                rightContent={() => renderRightContent(data.item)}>
                <ListItem.CheckBox
                  containerStyle={styles.listContainer}
                  checkedIcon="check"
                  uncheckedIcon="circle-o"
                  checked={data.item.checked}
                  onPress={() => onCheckboxPress(data.item)}
                />
                <ListItem.Content>
                  <ListItem.Title>{data.item.name}</ListItem.Title>
                </ListItem.Content>
                {data.item.quantity > 1 && <Text>{data.item.quantity}</Text>}
              </ListItem.Swipeable>
            )}
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
      <ListActionsBottomSheet
        closeBottomSheet={closeListActionsBottomSheet}
        isVisible={bottomSheetOpen}
        onDeleteCheckedItemsPress={onDeleteCheckedItemsPress}
        onUncheckAllItemsPress={onUncheckAllItemsPress}
      />
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
  deleteButtonContainer: {
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
