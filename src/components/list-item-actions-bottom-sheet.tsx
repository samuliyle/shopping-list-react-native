import React, {useState} from 'react'
import {
  BottomSheet,
  Button,
  Icon,
  Input,
  Text,
  makeStyles,
  useTheme
} from '@rneui/themed'
import {Spacer} from './spacer'
import {
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} from 'react-native'
import {palette} from '../theme'
import {ShoppingListItem} from '../types'
import {clamp} from '../helpers'

const minQuantityValue = 0
const maxQuantityValue = 9999

type Props = {
  onSave: (newItemName: string, newItemQuantity: number) => void
  onCancel: () => void
  selectedItem: ShoppingListItem
}

export const ListItemActionsBottomSheet = ({
  onSave,
  onCancel,
  selectedItem
}: Props) => {
  const [newItemName, setNewItemName] = useState<string>(selectedItem.name)
  const [newItemQuantity, setNewItemQuantity] = useState<number | undefined>(
    selectedItem.quantity
  )

  const styles = useStyles()
  const theme = useTheme()

  const onSavePress = () => {
    onSave(newItemName, newItemQuantity ?? 1)
  }

  const onNameChange = (value: string) => {
    setNewItemName(value)
  }

  const onQuantityChange = (value: string) => {
    let parsedNumber = parseInt(value, 10)
    if (isNaN(parsedNumber)) {
      setNewItemQuantity(undefined)
      return
    }
    setNewItemQuantity(clamp(parsedNumber, minQuantityValue, maxQuantityValue))
  }

  const onQuantityIncrease = () => {
    if (newItemQuantity == null) {
      setNewItemQuantity(1)
      return
    }
    setNewItemQuantity(
      clamp(newItemQuantity + 1, minQuantityValue, maxQuantityValue)
    )
  }

  const onQuantityDecrease = () => {
    if (newItemQuantity == null) {
      setNewItemQuantity(1)
      return
    }
    setNewItemQuantity(
      clamp(newItemQuantity - 1, minQuantityValue, maxQuantityValue)
    )
  }

  return (
    <BottomSheet
      /* Allows to press buttons when even keyboard is open */
      scrollViewProps={{
        keyboardShouldPersistTaps: 'handled'
      }}
      isVisible
      onBackdropPress={onCancel}>
      <Spacer padding="xl" style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text h4>Edit item</Text>
          <Icon
            name="cancel"
            color={theme.theme.colors.grey4}
            onPress={onCancel}
          />
        </View>
        <Spacer marginTop="md" />
        <Input label="Name" value={newItemName} onChangeText={onNameChange} />
        <View style={styles.quantityContainer}>
          <Input
            containerStyle={styles.quantityInput}
            label="Quantity"
            keyboardType="numeric"
            value={newItemQuantity?.toString()}
            onChangeText={onQuantityChange}
          />
          <View style={styles.quantityButtonsContainer}>
            <Icon
              Component={
                Platform.OS === 'android'
                  ? TouchableNativeFeedback
                  : TouchableHighlight
              }
              name="remove"
              reverse
              color={theme.theme.colors.primary}
              onPress={onQuantityDecrease}
            />
            <Icon
              Component={
                Platform.OS === 'android'
                  ? TouchableNativeFeedback
                  : TouchableHighlight
              }
              name="add"
              reverse
              color={theme.theme.colors.primary}
              onPress={onQuantityIncrease}
            />
          </View>
        </View>
        <View style={styles.actionsButtonsContainer}>
          <Button
            title="cancel"
            containerStyle={styles.cancelButtonContainer}
            type="clear"
            onPress={onCancel}
          />
          <Button
            title="save"
            containerStyle={styles.saveButtonContainer}
            disabled={!newItemName}
            onPress={onSavePress}
          />
        </View>
      </Spacer>
    </BottomSheet>
  )
}

const useStyles = makeStyles(theme => ({
  contentContainer: {
    backgroundColor:
      theme.mode === 'dark'
        ? palette.listItem.darkBackground
        : theme.colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  quantityInput: {
    flex: 3
  },
  quantityButtonsContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  actionsButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  cancelButtonContainer: {
    flex: 1
  },
  saveButtonContainer: {
    flex: 1
  }
}))
