import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React from 'react'
import {RootStackParamList} from '../types'
import {ShoppingListCard} from '../components/shopping-list-card'
import {useAllLists} from '../hooks/use-all-lists'
import {FAB, Text} from '@rneui/themed'
import {StyleSheet, View} from 'react-native'

type Props = NativeStackScreenProps<RootStackParamList, 'Lists'>

export const ListScreen = ({navigation}: Props) => {
  const [lists, setLists] = useAllLists()

  const onPress = (id: number) => {
    console.log('onpress', id)
    navigation.push('ListDetails', {id})
  }

  const onDelete = (id: number) => {
    console.log('delete', id)
    // TODO: Delete items too
    setLists(lists.filter(l => l.id !== id) ?? [])
  }

  if (lists.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No lists</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.shoppingListCardContainer}>
        <Text h1>Lists</Text>
        {lists.map(l => (
          <ShoppingListCard
            key={l.id}
            listId={l.id}
            name={l.name}
            onPress={() => onPress(l.id)}
            onDelete={() => onDelete(l.id)}
          />
        ))}
      </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  shoppingListCardContainer: {
    paddingHorizontal: 16,
    gap: 8
  }
})
