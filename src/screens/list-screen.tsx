import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {useCallback, useState} from 'react'
import {RootStackParamList, ShoppingList} from '../types'
import {ShoppingListCard} from '../components/shopping-list-card'
import {FAB as Fab, Text, makeStyles} from '@rneui/themed'
import {View} from 'react-native'
import {useShoppingListStore} from '../store/shoppingListStore'
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list'
import {useSafeAreaInsetsStyle} from '../hooks/use-safe-area-insets-style'
import {ShoppingCartIcon} from '../components/icons/shopping-cart-icon'
import {Spacer} from '../components/spacer'
import {ListEditBottomSheet} from '../components/list-edit-bottom-sheet'

type Props = NativeStackScreenProps<RootStackParamList, 'Lists'>

export const ListScreen = ({navigation}: Props) => {
  const insetsStyle = useSafeAreaInsetsStyle()
  const styles = useStyles()

  const [editListId, setEditListId] = useState<number | undefined>()

  const lists = useShoppingListStore(state => state.shoppingLists)
  const removeShoppingList = useShoppingListStore(
    state => state.removeShoppingList
  )
  const renameShoppingList = useShoppingListStore(
    state => state.renameShoppingList
  )

  const onPress = useCallback(
    (id: number) => {
      console.log('onpress', id)
      navigation.push('ListDetails', {id})
    },
    [navigation]
  )

  const onDelete = useCallback(
    (id: number) => {
      console.log('delete', id)
      removeShoppingList(id)
    },
    [removeShoppingList]
  )

  const onEdit = (id: number) => {
    setEditListId(id)
  }

  const onRenameSave = (newListName: string) => {
    if (editListId) {
      renameShoppingList(editListId, newListName)
    }
    setEditListId(undefined)
  }

  const onRenameCancel = () => {
    setEditListId(undefined)
  }

  const renderItemSeparator = useCallback(() => {
    return <View style={styles.itemSeparator} />
  }, [styles.itemSeparator])

  const renderListItem = useCallback(
    ({item}: ListRenderItemInfo<ShoppingList>) => (
      <ShoppingListCard
        items={item.items}
        name={item.name}
        onPress={() => onPress(item.id)}
        onDelete={() => onDelete(item.id)}
        onEdit={() => onEdit(item.id)}
      />
    ),
    [onDelete, onPress]
  )

  const noLists = lists.length === 0
  const editedList = lists.find(l => l.id === editListId)

  return (
    <View
      style={[
        noLists ? styles.noItemsContainer : styles.container,
        insetsStyle
      ]}>
      {noLists ? (
        <>
          <ShoppingCartIcon />
          <Text h1>No lists</Text>
          <Spacer marginTop="sm" />
          <Text>Tap the plus button to start adding shopping lists</Text>
        </>
      ) : (
        <FlashList
          keyboardShouldPersistTaps="handled"
          ItemSeparatorComponent={renderItemSeparator}
          contentContainerStyle={styles.shoppingListCardContainer}
          estimatedItemSize={92}
          keyExtractor={list => list.id.toString()}
          data={lists}
          renderItem={renderListItem}
        />
      )}
      <Fab
        testID="add-list-fab"
        placement="right"
        onPress={() => navigation.push('NewList')}
        icon={{name: 'add', color: 'white'}}
        size="large"
        title="New list"
      />
      {editListId && editedList && (
        <ListEditBottomSheet
          onCancel={onRenameCancel}
          onSave={onRenameSave}
          listName={editedList.name}
        />
      )}
    </View>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  noItemsContainer: {
    flex: 1,
    alignItems: 'center'
  },
  shoppingListCardContainer: {
    padding: 16
  },
  itemSeparator: {
    height: 15
  }
}))
