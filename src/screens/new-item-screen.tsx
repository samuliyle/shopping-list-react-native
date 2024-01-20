import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {useState} from 'react'
import {
  ShoppingListItem,
  Product,
  RootStackParamList,
  SearchResult
} from '../types'
import {StyleSheet, View} from 'react-native'
import {useListItems} from '../hooks/use-list-items'
import {FlashList} from '@shopify/flash-list'
import {useSearchProducts} from '../hooks/use-search-products'
import {useProducts} from '../hooks/use-products'
import {ListItem, FAB, Icon, Button, Input} from '@rneui/themed'

type Props = NativeStackScreenProps<RootStackParamList, 'NewItem'>

export const NewItemScreen = ({route}: Props) => {
  const {listId} = route.params
  const [items, setItems] = useListItems(listId)
  const [newItemName, setNewItemName] = useState('')
  const [products, setProducts] = useProducts()
  const filteredProducts = useSearchProducts(items, products, newItemName)

  const onCreate = () => {
    if (!newItemName) {
      return
    }
    if (items.some(i => i.name === newItemName)) {
      return
    }
    const item: ShoppingListItem = {
      name: newItemName,
      checked: false
    }
    setItems([...items, item])
    if (!products.some(p => p.name === newItemName)) {
      const newProduct: Product = {
        name: newItemName,
        seeded: false,
        category: 'Other'
      }
      setProducts([...products, newProduct])
    }
  }

  const onSearchResultButtonPress = (item: SearchResult) => {
    if (item.checkedInCurrentList === undefined) {
      const newItem: ShoppingListItem = {
        name: item.name,
        checked: false
      }
      setItems([...items, newItem])
    } else {
      const updatedItems = items.map(i =>
        i.name === item.name ? {...i, checked: !i.checked} : i
      )
      setItems(updatedItems)
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
        estimatedItemSize={30}
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
