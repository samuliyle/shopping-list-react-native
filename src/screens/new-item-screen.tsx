import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {useContext, useState} from 'react'
import {RootStackParamList, SearchResult, ShoppingList} from '../types'
import {StyleSheet, View} from 'react-native'
import {FlashList} from '@shopify/flash-list'
import {useSearchProducts} from '../hooks/use-search-products'
import {ListItem, FAB, Icon, Button, Input} from '@rneui/themed'
import {ToastContext} from '../contexts/toast-context'
import {useShoppingListStore} from '../store/shoppingListStore'

type Props = NativeStackScreenProps<RootStackParamList, 'NewItem'>

export const NewItemScreen = ({route}: Props) => {
  const {listId} = route.params
  const lists = useShoppingListStore(state => state.shoppingLists)
  const addItem = useShoppingListStore(state => state.addItem)
  const toggleItem = useShoppingListStore(state => state.toggleItem)
  const list = lists.find(l => l.id === listId) as ShoppingList
  const {items} = list
  const [newItemName, setNewItemName] = useState('')
  const filteredProducts = useSearchProducts(items, newItemName)
  const {showToast} = useContext(ToastContext)

  const onCreate = () => {
    if (!newItemName) {
      return
    }
    if (items.some(i => i.name === newItemName)) {
      return
    }
    addItem(listId, newItemName)
    // if (!products.some(p => p.name === newItemName)) {
    //   const newProduct: Product = {
    //     name: newItemName,
    //     seeded: false,
    //     category: 'Other'
    //   }
    //   setProducts([...products, newProduct])
    // }
    showToast(`add ${newItemName}`)
  }

  const onSearchResultButtonPress = (item: SearchResult) => {
    if (item.checkedInCurrentList === undefined) {
      showToast(`add ${item.name}`)
      addItem(listId, item.name)
    } else {
      showToast(`toggle ${item.name}`)
      toggleItem(listId, item.name)
    }
  }

  const getSearchResultIcon = (checkedInCurrentList: boolean | undefined) => {
    if (checkedInCurrentList === undefined) {
      return 'plus'
    }
    if (checkedInCurrentList) {
      return 'check'
    }
    return 'trash'
  }

  return (
    <View style={styles.container}>
      <Input
        autoFocus
        style={styles.input}
        placeholder="Add new item"
        value={newItemName}
        onChangeText={newValue => setNewItemName(newValue)}
        focusable
      />
      <FlashList
        data={filteredProducts}
        renderItem={({item}) => (
          <ListItem bottomDivider>
            <Button
              onPress={() => onSearchResultButtonPress(item)}
              type="clear">
              <Icon
                type="font-awesome"
                name={getSearchResultIcon(item.checkedInCurrentList)}
                color="black"
              />
            </Button>
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        )}
        estimatedItemSize={72}
      />
      <FAB
        placement="right"
        onPress={() => onCreate()}
        icon={{name: 'add', color: 'white'}}
        size="large"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  }
})
