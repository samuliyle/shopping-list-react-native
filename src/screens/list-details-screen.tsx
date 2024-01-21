import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {useContext, useEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import {ShoppingListItem, RootStackParamList, ShoppingList} from '../types'
import {ListItem, Text, FAB} from '@rneui/themed'
import {ToastContext} from '../contexts/toast-context'
import {DeleteButton} from '../components/delete-button'
import {useShoppingListStore} from '../store/shoppingListStore'
import {FlashList} from '@shopify/flash-list'

type Props = NativeStackScreenProps<RootStackParamList, 'ListDetails'>

export const ListDetailsScreen = ({navigation, route}: Props) => {
  const {id} = route.params
  const lists = useShoppingListStore(state => state.shoppingLists)
  const deleteItem = useShoppingListStore(state => state.deleteItem)
  const toggleItem = useShoppingListStore(state => state.toggleItem)
  const list = lists.find(l => l.id === id) as ShoppingList
  const {items} = list
  const {showToast} = useContext(ToastContext)

  useEffect(() => {
    // Update title
    navigation.setOptions({title: list.name})
  }, [list.name, navigation])

  const onItemDelete = (item: ShoppingListItem) => {
    deleteItem(id, item)
    showToast(`Deleted ${item.name}`)
  }

  const onFabPress = () => {
    navigation.push('NewItem', {listId: id})
  }

  const onCheckboxPress = (item: ShoppingListItem) => {
    toggleItem(id, item.name)
    showToast(`toggle ${item.name}`)
  }

  const renderRightContent = (item: ShoppingListItem) => (
    <DeleteButton onDelete={() => onItemDelete(item)} />
  )

  const noItems = items.length === 0

  return (
    <View style={noItems ? styles.noItemsContainer : styles.container}>
      {noItems ? (
        <Text>Tap the plus button to stard adding products</Text>
      ) : (
        <FlashList
          estimatedItemSize={57}
          keyExtractor={item => item.name}
          data={items}
          renderItem={data => (
            <ListItem.Swipeable
              bottomDivider
              rightContent={() => renderRightContent(data.item)}>
              <ListItem.CheckBox
                // Use ThemeProvider to change the defaults of the checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checked={data.item.checked}
                onPress={() => onCheckboxPress(data.item)}
              />
              <ListItem.Content>
                <ListItem.Title>{data.item.name}</ListItem.Title>
              </ListItem.Content>
            </ListItem.Swipeable>
          )}
        />
      )}
      <FAB
        placement="right"
        onPress={() => onFabPress()}
        icon={{name: 'add', color: 'white'}}
        size="large"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  noItemsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
