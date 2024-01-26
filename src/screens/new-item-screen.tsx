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
  Button,
  useTheme,
  makeStyles,
  SearchBar
} from '@rneui/themed'
import {ToastContext} from '../contexts/toast-context'
import {useShoppingListStore} from '../store/shoppingListStore'
import {Spacer} from '../components/spacer'
import {palette} from '../theme'
import {useSafeAreaInsetsStyle} from '../hooks/use-safe-area-insets-style'

type Props = NativeStackScreenProps<RootStackParamList, 'NewItem'>

export const NewItemScreen = ({route}: Props) => {
  const insetsStyle = useSafeAreaInsetsStyle()
  const styles = useStyles()
  const {listId} = route.params
  const lists = useShoppingListStore(state => state.shoppingLists)
  const addItem = useShoppingListStore(state => state.addItem)
  const deleteItem = useShoppingListStore(state => state.deleteItem)
  const list = lists.find(l => l.id === listId) as ShoppingList
  const {items} = list
  const [newItemName, setNewItemName] = useState('')
  const filteredProducts = useSearchProducts(items, newItemName)
  const {showToast} = useContext(ToastContext)
  const {
    theme: {colors}
  } = useTheme()

  const onCreate = () => {
    const trimmedNewItem = newItemName.trim()
    if (!trimmedNewItem) {
      return
    }
    const itemAlreadyInList = items.some(
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
      deleteItem(listId, item.name)
      showToast(`delete ${item.name}`)
    } else {
      addItem(listId, item.name)
      showToast(`add ${item.name}`)
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
            <Button
              onPress={() => onSearchResultButtonPress(item)}
              type="clear">
              <Icon
                type="font-awesome"
                name={item.inCurrentList ? 'trash' : 'plus'}
                color={item.inCurrentList ? colors.error : colors.success}
              />
            </Button>
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
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
        ? palette.listItemDarkBackground
        : theme.colors.white
  }
}))
