import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React from 'react'
import {RootStackParamList} from '../types'
import {ShoppingListCard} from '../components/shopping-list-card'
import {FAB as Fab, Text, makeStyles} from '@rneui/themed'
import {View} from 'react-native'
import {useShoppingListStore} from '../store/shoppingListStore'
import {FlashList} from '@shopify/flash-list'
import {useSafeAreaInsetsStyle} from '../hooks/use-safe-area-insets-style'

type Props = NativeStackScreenProps<RootStackParamList, 'Lists'>

export const ListScreen = ({navigation}: Props) => {
  const insetsStyle = useSafeAreaInsetsStyle()
  const styles = useStyles()
  const lists = useShoppingListStore(state => state.shoppingLists)
  const removeShoppingList = useShoppingListStore(
    state => state.removeShoppingList
  )

  const onPress = (id: number) => {
    console.log('onpress', id)
    navigation.push('ListDetails', {id})
  }

  const onDelete = (id: number) => {
    console.log('delete', id)
    removeShoppingList(id)
  }

  const renderItemSeparator = () => {
    return <View style={styles.itemSeparator} />
  }

  const noLists = lists.length === 0

  return (
    <View
      style={[
        noLists ? styles.noItemsContainer : styles.container,
        insetsStyle
      ]}>
      {noLists ? (
        <Text>Tap the plus button to start adding shopping lists</Text>
      ) : (
        <FlashList
          ItemSeparatorComponent={renderItemSeparator}
          contentContainerStyle={styles.shoppingListCardContainer}
          estimatedItemSize={92}
          keyExtractor={list => list.id.toString()}
          data={lists}
          renderItem={data => (
            <ShoppingListCard
              items={data.item.items}
              name={data.item.name}
              onPress={() => onPress(data.item.id)}
              onDelete={() => onDelete(data.item.id)}
            />
          )}
        />
      )}
      <Fab
        testID="add-list-fab"
        placement="right"
        onPress={() => navigation.push('NewList')}
        icon={{name: 'add', color: 'white'}}
        size="large"
      />
    </View>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  noItemsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  shoppingListCardContainer: {
    padding: 16
  },
  itemSeparator: {
    height: 15
  }
}))
