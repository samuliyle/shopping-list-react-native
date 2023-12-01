import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {useState} from 'react'
import {
  ShoppingListItem,
  Product,
  RootStackParamList,
  SearchResult
} from '../types'
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native'
import {useListItems} from '../hooks/use-list-items'
import {FlashList} from '@shopify/flash-list'
import {useSearchProducts} from '../hooks/use-search-products'
import {Fab} from '../components/fab'
import {ListItem} from '../components/list-item'
import Icon from 'react-native-vector-icons/FontAwesome'
import {useProducts} from '../hooks/use-products'

type Props = NativeStackScreenProps<RootStackParamList, 'NewItem'>

export const NewItemScreen = ({route}: Props) => {
  const {listId} = route.params
  const [items, setItems] = useListItems(listId)
  const [newItemName, setNewItemName] = useState('')
  const [products, setProducts] = useProducts()
  const filteredProducts = useSearchProducts(items, products, newItemName)

  const onCreate = () => {
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
      <TextInput
        style={styles.input}
        placeholder="Add new item"
        value={newItemName}
        onChangeText={newValue => setNewItemName(newValue)}
      />
      <FlashList
        data={filteredProducts}
        renderItem={({item}) => (
          <ListItem
            justifyContent="flex-start"
            name={item.name}
            left={
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => onSearchResultButtonPress(item)}>
                <Icon
                  name={getSearchResultIcon(item.checkedInCurrentList)}
                  size={18}
                  color="white"
                />
              </TouchableOpacity>
            }
          />
        )}
        estimatedItemSize={20}
      />
      <Fab variant="secondary" onPress={() => onCreate()} />
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
  },
  addButton: {
    width: '12%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
