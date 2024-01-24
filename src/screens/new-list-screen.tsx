import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {useState} from 'react'
import {RootStackParamList} from '../types'
import {StyleSheet, View} from 'react-native'
import {Button, Input} from '@rneui/themed'
import {useShoppingListStore} from '../store/shoppingListStore'
import {useSafeAreaInsetsStyle} from '../hooks/use-safe-area-insets-style'

type Props = NativeStackScreenProps<RootStackParamList, 'NewList'>

export const NewListScreen = ({navigation}: Props) => {
  const insetsStyle = useSafeAreaInsetsStyle()
  const [text, setText] = useState('')
  const addShoppingList = useShoppingListStore(state => state.addShoppingList)

  const onCreate = () => {
    addShoppingList(text)
    navigation.navigate('Lists')
  }

  return (
    <View style={[styles.container, insetsStyle]}>
      <Input
        autoFocus
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
