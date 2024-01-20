import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {useContext, useEffect} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {ShoppingListItem, RootStackParamList} from '../types'
import {useCurrentList} from '../hooks/use-current-list'
import {useListItems} from '../hooks/use-list-items'
import {ListItem, Text, FAB} from '@rneui/themed'
import {ToastContext} from '../contexts/toast-context'
import {DeleteButton} from '../components/delete-button'

type Props = NativeStackScreenProps<RootStackParamList, 'ListDetails'>

export const ListDetailsScreen = ({navigation, route}: Props) => {
  const {id} = route.params
  const [list] = useCurrentList(id)
  const [items, setItems] = useListItems(id)
  const {showToast} = useContext(ToastContext)

  useEffect(() => {
    // Update title
    navigation.setOptions({title: list.name})
  }, [list.name, navigation])

  const onItemDelete = (item: ShoppingListItem) => {
    const filtered = items.filter(i => i.name !== item.name)
    setItems(filtered)
    showToast(`Deleted ${item.name}`)
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

  const renderRightContent = (item: ShoppingListItem) => (
    <DeleteButton onDelete={() => onItemDelete(item)} />
  )

  const noItems = items.length === 0

  return (
    <View style={noItems ? styles.noItemsContainer : styles.container}>
      {noItems ? (
        <Text>Tap the plus button to stard adding products</Text>
      ) : (
        <FlatList
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
