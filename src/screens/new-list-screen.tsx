import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {useState} from 'react'
import {RootStackParamList} from '../types'
import {View} from 'react-native'
import {Button, Input, makeStyles} from '@rneui/themed'
import {useShoppingListStore} from '../store/shoppingListStore'
import {useSafeAreaInsetsStyle} from '../hooks/use-safe-area-insets-style'
import LinearGradient from 'react-native-linear-gradient'
import {Spacer} from '../components/spacer'
import {palette} from '../theme'

type Props = NativeStackScreenProps<RootStackParamList, 'NewList'>

export const NewListScreen = ({navigation}: Props) => {
  const styles = useStyles()
  const insetsStyle = useSafeAreaInsetsStyle()

  const [text, setText] = useState('')
  const addShoppingList = useShoppingListStore(state => state.addShoppingList)

  const onCreate = () => {
    const trimmed = text.trim()
    addShoppingList(trimmed || 'New list')
    navigation.navigate('Lists')
  }

  return (
    <View style={[styles.container, insetsStyle]}>
      <Spacer marginLeft="xl" marginRight="xl">
        <Input
          autoFocus
          placeholder="List name"
          value={text}
          onChangeText={newValue => setText(newValue)}
        />
        <Button
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['#fd746c', palette.primary],
            start: {x: 0, y: 0.5},
            end: {x: 1, y: 0.5}
          }}
          title="Create"
          onPress={onCreate}
        />
      </Spacer>
    </View>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    flexGrow: 1,
    backgroundColor:
      theme.mode === 'dark'
        ? palette.listItem.darkBackground
        : theme.colors.background
  }
}))
