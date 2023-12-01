import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {useState} from 'react'
import {RootStackParamList, ShoppingList} from '../types'
import {Button, StyleSheet, TextInput, View} from 'react-native'
import {useAllLists} from '../hooks/use-all-lists'

type Props = NativeStackScreenProps<RootStackParamList, 'NewList'>

export const NewListScreen = ({navigation}: Props) => {
  const [text, setText] = useState('')
  const [lists, setLists] = useAllLists()

  const onCreate = () => {
    const newId =
      lists.reduce(
        (prev, current) => (prev > current.id ? prev : current.id),
        0
      ) + 1
    const newList: ShoppingList = {
      name: text,
      id: newId
    }
    setLists([...lists, newList])
    navigation.navigate('Lists')
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="List name"
        value={text}
        onChangeText={newValue => setText(newValue)}
      />

      <Button title="Create" disabled={!text} onPress={() => onCreate()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  }
})
