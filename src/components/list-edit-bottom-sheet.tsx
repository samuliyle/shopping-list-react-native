import React, {useEffect, useRef, useState} from 'react'
import {BottomSheet, Button, Input, Text, makeStyles} from '@rneui/themed'
import {Spacer} from './spacer'
import {TextInput, View} from 'react-native'
import {palette} from '../theme'

type Props = {
  onCancel: () => void
  onSave: (newName: string) => void
  listName: string
}

export const ListEditBottomSheet = ({onCancel, onSave, listName}: Props) => {
  const styles = useStyles()
  const [newListName, setNewListName] = useState<string>(listName)
  const inputRef = useRef<TextInput>()

  const onSavePress = () => {
    onSave(newListName)
  }

  // Inputs autoFocus inside bottom sheets / modals sometimes works and sometimes doesnt
  // so focus using input ref if autofocus didnt work
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inputRef.current && !inputRef.current.isFocused()) {
        inputRef.current.blur()
        inputRef.current.focus()
      }
    }, 200)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <BottomSheet
      /* Allows to press buttons when even keyboard is open */
      scrollViewProps={{
        keyboardShouldPersistTaps: 'handled'
      }}
      isVisible
      onBackdropPress={onCancel}>
      <Spacer padding="xl" style={styles.bottomSheetContentContainer}>
        <Text h4>Rename list</Text>
        <Spacer marginTop="md" />
        <Input
          ref={inputRef as any}
          autoFocus
          selectTextOnFocus
          value={newListName}
          onChangeText={newValue => setNewListName(newValue)}
          containerStyle={styles.bottomSheetInputContainer}
        />
        <View style={styles.bottomSheetButtonsContainer}>
          <Button
            title="cancel"
            containerStyle={styles.bottomSheetCancelButtonContainer}
            type="clear"
            onPress={onCancel}
          />
          <Button
            title="save"
            containerStyle={styles.bottomSheetSaveButtonContainer}
            disabled={!newListName}
            onPress={onSavePress}
          />
        </View>
      </Spacer>
    </BottomSheet>
  )
}

const useStyles = makeStyles(theme => ({
  bottomSheetContentContainer: {
    backgroundColor:
      theme.mode === 'dark'
        ? palette.listItem.darkBackground
        : theme.colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  bottomSheetInputContainer: {
    paddingLeft: 0
  },
  bottomSheetInput: {
    borderWidth: 3
  },
  bottomSheetButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  bottomSheetCancelButtonContainer: {
    flex: 1
  },
  bottomSheetSaveButtonContainer: {
    flex: 1
  }
}))
