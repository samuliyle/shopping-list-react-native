import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {useContext, useState} from 'react'
import {RootStackParamList, SearchResult, ShoppingList} from '../types'
import {View} from 'react-native'
import {FlashList} from '@shopify/flash-list'
import {useSearchProducts} from '../hooks/use-search-products'
import {
  ListItem,
  FAB as Fab,
  Icon,
  useTheme,
  makeStyles,
  SearchBar,
  Text
} from '@rneui/themed'
import {ToastContext} from '../contexts/toast-context'
import {useShoppingListStore} from '../store/shoppingListStore'
import {Spacer} from '../components/spacer'
import {palette} from '../theme'
import {useSafeAreaInsetsStyle} from '../hooks/use-safe-area-insets-style'

type Props = NativeStackScreenProps<RootStackParamList, 'NewItem'>

export const NewItemScreen = ({route}: Props) => {
  const {listId} = route.params

  const [newItemName, setNewItemName] = useState('')
  const {showToast} = useContext(ToastContext)
  const insetsStyle = useSafeAreaInsetsStyle()
  const styles = useStyles()
  const {
    theme: {colors}
  } = useTheme()

  const lists = useShoppingListStore(state => state.shoppingLists)
  const addItem = useShoppingListStore(state => state.addItem)
  const deleteItem = useShoppingListStore(state => state.deleteItem)
  const increaseItemQuantity = useShoppingListStore(
    state => state.increaseItemQuantity
  )
  const decreaseItemQuantity = useShoppingListStore(
    state => state.decreaseItemQuantity
  )

  const list = lists.find(l => l.id === listId) as ShoppingList
  const filteredProducts = useSearchProducts(list.items, newItemName)

  const onCreate = () => {
    const trimmedNewItem = newItemName.trim()
    if (!trimmedNewItem) {
      return
    }
    const itemAlreadyInList = list.items.some(
      i => i.name.toLocaleLowerCase() === trimmedNewItem.toLocaleLowerCase()
    )
    if (itemAlreadyInList) {
      return
    }
    addItem(listId, trimmedNewItem)
    showToast(`add ${trimmedNewItem}`)
    setNewItemName('')
  }

  const onSearchResultButtonPress = (item: SearchResult) => {
    if (item.inCurrentList) {
      increaseItemQuantity(listId, item.name)
      showToast(`increase ${item.name} quantity`)
    } else {
      addItem(listId, item.name)
      showToast(`add ${item.name}`)
    }
  }

  const onDeleteItemButtonPress = (item: SearchResult) => {
    if (item.quantity && item.quantity > 1) {
      decreaseItemQuantity(listId, item.name)
      showToast(`decrease ${item.name} quantity`)
    } else {
      deleteItem(listId, item.name)
      showToast(`delete ${item.name}`)
    }
  }

  return (
    <View style={[styles.container, insetsStyle]}>
      <Spacer marginTop="md" />
      <SearchBar
        autoFocus
        autoCapitalize="none"
        placeholder="Add new item"
        value={newItemName}
        onChangeText={newValue => setNewItemName(newValue)}
        focusable
        onSubmitEditing={onCreate}
        blurOnSubmit={false}
      />
      <FlashList
        keyboardShouldPersistTaps="always"
        data={filteredProducts}
        renderItem={({item}) => (
          <ListItem>
            <Icon
              onPress={() => onSearchResultButtonPress(item)}
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
                {item.quantity && item.quantity > 1 && (
                  <Spacer marginRight="sm">
                    <Text>{item.quantity}</Text>
                  </Spacer>
                )}
                <Icon
                  onPress={() => onDeleteItemButtonPress(item)}
                  type="material"
                  name={item.quantity && item.quantity > 1 ? 'remove' : 'close'}
                  color={colors.error}
                  size={30}
                />
              </>
            )}
          </ListItem>
        )}
        estimatedItemSize={72}
      />
      <Fab
        placement="right"
        onPress={onCreate}
        icon={{name: 'add', color: colors.white}}
        size="large"
      />
    </View>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    flexGrow: 1,
    backgroundColor:
      theme.mode === 'dark'
        ? palette.listItem.darkBackground
        : theme.colors.white
  }
}))
