import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React from 'react'
import {RootStackParamList} from '../types'
import {ShoppingListCard} from '../components/shopping-list-card'
import {FAB, Text, makeStyles} from '@rneui/themed'
import {View} from 'react-native'
import {useShoppingListStore} from '../store/shoppingListStore'
import {FlashList} from '@shopify/flash-list'

type Props = NativeStackScreenProps<RootStackParamList, 'Lists'>

export const ListScreen = ({navigation}: Props) => {
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

  return (
    <View style={styles.container}>
      {lists.length === 0 ? (
        <Text>No lists</Text>
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
      <FAB
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
  shoppingListCardContainer: {
    padding: 16
  },
  itemSeparator: {
    height: 15
  }
}))
