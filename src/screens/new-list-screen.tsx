import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {useState} from 'react'
import {RootStackParamList} from '../types'
import {Button, StyleSheet, TextInput, View} from 'react-native'
import {addNewList} from '../storage'

type Props = NativeStackScreenProps<RootStackParamList, 'NewList'>

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  }
})

const NewListScreen = ({navigation}: Props) => {
  const [text, setText] = useState('')

  const onCreate = () => {
    addNewList(text)
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

export default NewListScreen
