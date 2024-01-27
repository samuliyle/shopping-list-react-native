import React, {useState} from 'react'
import {StyleSheet, TouchableHighlight, View} from 'react-native'
import {CheckBox, ListItem, Overlay, Switch, Text} from '@rneui/themed'
import {useShoppingListStore} from '../store/shoppingListStore'
import {AppTheme, appThemes} from '../types'
import {useSafeAreaInsetsStyle} from '../hooks/use-safe-area-insets-style'

const ThemeSettings = ({onClose}: {onClose: () => void}) => {
  const {theme, changeTheme} = useShoppingListStore()

  const onPress = (newTheme: AppTheme) => {
    if (newTheme !== theme) {
      changeTheme(newTheme)
    }

    onClose()
  }

  return (
    <>
      <Text>Select theme</Text>
      {appThemes.map(t => (
        <CheckBox
          key={t}
          checked={theme === t}
          title={t}
          onPress={() => onPress(t)}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
        />
      ))}
    </>
  )
}

export const SettingsScreen = () => {
  const insetsStyle = useSafeAreaInsetsStyle()
  const theme = useShoppingListStore(state => state.theme)

  const keepScreenOn = useShoppingListStore(state => state.keepScreenOn)
  const toggleKeepScreenOn = useShoppingListStore(
    state => state.toggleKeepScreenOn
  )

  const [selectedOverlay, setSelectedOverlay] = useState<'theme' | undefined>()

  const closeOverlay = () => {
    setSelectedOverlay(undefined)
  }

  return (
    <View style={[styles.container, insetsStyle]}>
      <ListItem
        bottomDivider
        onPress={() => setSelectedOverlay('theme')}
        Component={TouchableHighlight}>
        <ListItem.Content>
          <ListItem.Title>Theme</ListItem.Title>
          <ListItem.Subtitle>{theme}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Keep the screen on</ListItem.Title>
        </ListItem.Content>
        <Switch value={keepScreenOn} onValueChange={toggleKeepScreenOn} />
      </ListItem>
      <Overlay
        isVisible={selectedOverlay !== undefined}
        onBackdropPress={closeOverlay}>
        {selectedOverlay === 'theme' && (
          <ThemeSettings onClose={closeOverlay} />
        )}
      </Overlay>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
