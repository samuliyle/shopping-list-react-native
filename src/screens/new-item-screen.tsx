import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {useCallback, useEffect, useState} from 'react'
import {RootStackParamList, SearchResult, ShoppingList} from '../types'
import {Dimensions, FlatList, View} from 'react-native'
import {useSearchProducts} from '../hooks/use-search-products'
import {FAB as Fab, useTheme, makeStyles, SearchBar} from '@rneui/themed'
import {useShoppingListStore} from '../store/shoppingListStore'
import {Spacer} from '../components/spacer'
import {palette} from '../theme'
import {useSafeAreaInsetsStyle} from '../hooks/use-safe-area-insets-style'
import {SearchListItem} from '../components/search-list-item'

const deviceHeight = Dimensions.get('window').height
const itemHeight = 72

type Props = NativeStackScreenProps<RootStackParamList, 'NewItem'>

export const NewItemScreen = ({route}: Props) => {
  const {listId} = route.params
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const t0 = new Date()

  const [newItemName, setNewItemName] = useState('')
  const insetsStyle = useSafeAreaInsetsStyle()
  const styles = useStyles()
  const {
    theme: {colors}
  } = useTheme()

  const lists = useShoppingListStore(state => state.shoppingLists)
  const addItem = useShoppingListStore(state => state.addItem)

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
    setNewItemName('')
  }

  const renderListItem = useCallback(
    ({item}: {item: SearchResult}) => (
      <SearchListItem item={item} listId={listId} />
    ),
    [listId]
  )

  useEffect(() => {
    const t1 = new Date()
    console.log(
      `NewItemScreen load took ${t1.getTime() - t0.getTime()} milliseconds.`
    )
  }, [t0])

  return (
    <View style={[styles.container, insetsStyle]}>
      <View style={styles.searchContainer}>
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
        <FlatList
          keyboardShouldPersistTaps="always"
          data={filteredProducts}
          renderItem={renderListItem}
          initialNumToRender={Math.ceil(deviceHeight / itemHeight)}
          getItemLayout={(_, index) => ({
            length: itemHeight,
            offset: itemHeight * index,
            index
          })}
        />
      </View>
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
    flex: 1,
    backgroundColor:
      theme.mode === 'dark'
        ? palette.listItem.darkBackground
        : theme.colors.white
  },
  searchContainer: {
    flexGrow: 1
  }
}))
