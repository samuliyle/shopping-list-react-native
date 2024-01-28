import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {useContext, useEffect} from 'react'
import {View} from 'react-native'
import {ShoppingListItem, RootStackParamList, ShoppingList} from '../types'
import {ListItem, Text, FAB as Fab, makeStyles} from '@rneui/themed'
import {ToastContext} from '../contexts/toast-context'
import {DeleteButton} from '../components/delete-button'
import {useShoppingListStore} from '../store/shoppingListStore'
import {FlashList} from '@shopify/flash-list'
import {palette} from '../theme'
import {ProgressBar} from '../components/progress-bar'
import {Spacer} from '../components/spacer'
import {useSafeAreaInsetsStyle} from '../hooks/use-safe-area-insets-style'

type Props = NativeStackScreenProps<RootStackParamList, 'ListDetails'>

export const ListDetailsScreen = ({navigation, route}: Props) => {
  const insetsStyle = useSafeAreaInsetsStyle()
  const styles = useStyles()
  const {id} = route.params
  const lists = useShoppingListStore(state => state.shoppingLists)
  const deleteItem = useShoppingListStore(state => state.deleteItem)
  const toggleItem = useShoppingListStore(state => state.toggleItem)
  const list = lists.find(l => l.id === id) as ShoppingList
  const {items} = list
  const {showToast} = useContext(ToastContext)

  const checkedCount = items.filter(i => i.checked).length

  useEffect(() => {
    // Update title
    navigation.setOptions({title: list.name})
  }, [list.name, navigation])

  const onItemDelete = (item: ShoppingListItem) => {
    deleteItem(id, item.name)
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
    <View
      style={[
        noItems ? styles.noItemsContainer : styles.container,
        insetsStyle
      ]}>
      {noItems ? (
        <Text>Tap the plus button to start adding products</Text>
      ) : (
        <>
          <Spacer padding="md" style={styles.progressBar}>
            <ProgressBar totalCount={items.length} filledCount={checkedCount} />
          </Spacer>
          <FlashList
            estimatedItemSize={57}
            keyExtractor={item => item.name}
            data={items}
            renderItem={data => (
              <ListItem.Swipeable
                bottomDivider
                rightContent={() => renderRightContent(data.item)}>
                <ListItem.CheckBox
                  containerStyle={styles.listContainer}
                  checkedIcon="check"
                  uncheckedIcon="circle-o"
                  checked={data.item.checked}
                  onPress={() => onCheckboxPress(data.item)}
                />
                <ListItem.Content>
                  <ListItem.Title>{data.item.name}</ListItem.Title>
                </ListItem.Content>
                {data.item.quantity > 1 && <Text>{data.item.quantity}</Text>}
              </ListItem.Swipeable>
            )}
          />
        </>
      )}
      <Fab
        placement="right"
        onPress={() => onFabPress()}
        icon={{name: 'add', color: 'white'}}
        size="large"
      />
    </View>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1
  },
  noItemsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listContainer: {
    backgroundColor:
      theme.mode === 'dark'
        ? palette.listItem.darkBackground
        : palette.listItem.lightBackground
  },
  progressBar: {
    backgroundColor:
      theme.mode === 'dark'
        ? palette.listItem.darkBackground
        : palette.listItem.lightBackground
  }
}))
