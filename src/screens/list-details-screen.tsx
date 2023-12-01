import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {useEffect} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {ShoppingListItem, RootStackParamList} from '../types'
import {useCurrentList} from '../hooks/use-current-list'
import {useListItems} from '../hooks/use-list-items'
import {Fab} from '../components/fab'
import {ListItem} from '../components/list-item'
import {SwipeList} from '../components/swipe-list'
import {Text} from '../components/text'
import {CheckBox} from '../components/checkbox'
import {Box} from '../components/box'

type Props = NativeStackScreenProps<RootStackParamList, 'ListDetails'>

const ListDetailsScreen = ({navigation, route}: Props) => {
  const {id} = route.params
  const [list] = useCurrentList(id)
  const [items, setItems] = useListItems(id)

  useEffect(() => {
    // Update title
    navigation.setOptions({title: list.name})
  }, [list.name, navigation])

  const onItemDelete = (item: ShoppingListItem) => {
    const filtered = items.filter(i => i.name !== item.name)
    setItems(filtered)
  }

  const onFabPress = () => {
    navigation.push('NewItem', {listId: id})
  }

  const onCheckboxPress = (item: ShoppingListItem) => {
    const updatedItems = items.map(i =>
      i.name === item.name ? {...i, checked: !i.checked} : i
    )
    setItems(updatedItems)
  }

  const noItems = items.length === 0

  return (
    <View style={noItems ? styles.noItemsContainer : styles.container}>
      {noItems ? (
        <Text>Tap the plus button to stard adding products</Text>
      ) : (
        <SwipeList
          data={items}
          keyExtractor={item => item.name}
          renderItem={data => (
            <ListItem
              justifyContent="space-between"
              name={data.item.name}
              left={
                <Box style={styles.checkBoxContainer}>
                  <CheckBox
                    checked={data.item.checked}
                    onPress={() => onCheckboxPress(data.item)}
                  />
                </Box>
              }
              right={
                <View style={styles.category}>
                  <Text>C</Text>
                </View>
              }
            />
          )}
          renderRightActions={item => (
            <TouchableOpacity
              onPress={() => onItemDelete(item)}
              style={styles.rightAction}>
              <Text style={styles.actionText}>Delete</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <Fab variant="primary" onPress={() => onFabPress()} />
    </View>
  )
}

const styles = StyleSheet.create({
  noItemsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  rightAction: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%'
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    padding: 20
  },
  checkBoxContainer: {
    width: '12%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  category: {
    width: '12%',
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default ListDetailsScreen
