import React, {useCallback} from 'react'
import {Spacer} from './spacer'
import {Icon, ListItem, Text, useTheme} from '@rneui/themed'
import {SearchResult} from '../types'
import {useShoppingListStore} from '../store/shoppingListStore'

type Props = {
  listId: number
  item: SearchResult
}

// Only item values can change, so only compare them to check if we need to rerender item
const areItemValuesEqual = (
  prevProps: Readonly<Props>,
  nextProps: Readonly<Props>
) => {
  return (
    Object.entries(prevProps.item).sort().toString() ===
    Object.entries(nextProps.item).sort().toString()
  )
}

export const SearchListItem = React.memo(({listId, item}: Props) => {
  const {
    theme: {colors}
  } = useTheme()

  const increaseItemQuantity = useShoppingListStore(
    state => state.increaseItemQuantity
  )

  const addItem = useShoppingListStore(state => state.addItem)
  const deleteItem = useShoppingListStore(state => state.deleteItem)
  const decreaseItemQuantity = useShoppingListStore(
    state => state.decreaseItemQuantity
  )

  const onSearchResultButtonPress = useCallback(() => {
    if (item.inCurrentList) {
      increaseItemQuantity(listId, item.name)
    } else {
      addItem(listId, item.name)
    }
  }, [addItem, increaseItemQuantity, item.inCurrentList, item.name, listId])

  const onDeleteItemButtonPress = useCallback(() => {
    if (item.quantity && item.quantity > 1) {
      decreaseItemQuantity(listId, item.name)
    } else {
      deleteItem(listId, item.name)
    }
  }, [decreaseItemQuantity, deleteItem, item.name, item.quantity, listId])

  return (
    <ListItem>
      <Icon
        onPress={onSearchResultButtonPress}
        type="material"
        name="add-circle"
        color={item.inCurrentList ? colors.primary : colors.grey4}
        size={30}
      />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
      </ListItem.Content>
      {item.inCurrentList && (
        <>
          {item.quantity != null && item.quantity > 1 && (
            <Spacer marginRight="sm">
              <Text>{item.quantity}</Text>
            </Spacer>
          )}
          <Icon
            onPress={onDeleteItemButtonPress}
            type="material"
            name={item.quantity && item.quantity > 1 ? 'remove' : 'close'}
            color={colors.error}
            size={30}
          />
        </>
      )}
    </ListItem>
  )
}, areItemValuesEqual)
