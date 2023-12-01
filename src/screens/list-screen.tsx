import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React from 'react'
import {RootStackParamList} from '../types'
import {Box} from '../components/box'
import {Text} from '../components/text'
import {ShoppingListCard} from '../components/shopping-list-card'
import {Fab} from '../components/fab'
import {useAllLists} from '../hooks/use-all-lists'

type Props = NativeStackScreenProps<RootStackParamList, 'Lists'>

export const ListScreen = ({navigation}: Props) => {
  const [lists, setLists] = useAllLists()

  const onPress = (id: number) => {
    console.log('onpress', id)
    navigation.push('ListDetails', {id})
  }

  const onDelete = (id: number) => {
    console.log('delete', id)
    setLists(lists.filter(l => l.id !== id) ?? [])
  }

  return (
    <Box flex={1}>
      {lists.length === 0 ? (
        <Text variant="body">No lists</Text>
      ) : (
        <Box paddingHorizontal="m" gap="s">
          <Text variant="header">Lists</Text>
          {lists.map(l => (
            <ShoppingListCard
              key={l.id}
              listId={l.id}
              name={l.name}
              onPress={() => onPress(l.id)}
              onDelete={() => onDelete(l.id)}
            />
          ))}
        </Box>
      )}
      <Fab variant="primary" onPress={() => navigation.push('NewList')} />
    </Box>
  )
}
