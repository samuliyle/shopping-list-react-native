import React, {useState} from 'react'
import {Settings, appThemes} from '../types'
import {StyleSheet, View} from 'react-native'
import {CheckBox, ListItem, Overlay, Text} from '@rneui/themed'
import {useSettings} from '../hooks/use-settings'

const ThemeSettings = ({onClose}: {onClose: () => void}) => {
  const [settings, setSettings] = useSettings()
  const selectedTheme = settings.theme

  const onPress = (newTheme: Settings['theme']) => {
    if (newTheme !== selectedTheme) {
      const newSettings = {
        ...settings,
        theme: newTheme
      }
      setSettings(newSettings)
    }

    onClose()
  }

  return (
    <>
      <Text>Select theme</Text>
      {appThemes.map(t => (
        <CheckBox
          key={t}
          checked={selectedTheme === t}
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
  const [settings] = useSettings()

  const [selectedOverlay, setSelectedOverlay] = useState<'theme' | undefined>()

  const closeOverlay = () => {
    setSelectedOverlay(undefined)
  }

  return (
    <View style={styles.container}>
      <ListItem bottomDivider onPress={() => setSelectedOverlay('theme')}>
        <ListItem.Content>
          <ListItem.Title>Theme</ListItem.Title>
          <ListItem.Subtitle>{settings.theme}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
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
