import React from 'react'
import {
  BottomSheet,
  Icon,
  ListItem,
  Text,
  makeStyles,
  useTheme
} from '@rneui/themed'
import {Spacer} from './spacer'
import {View} from 'react-native'
import {palette} from '../theme'

type Props = {
  isVisible: boolean
  closeBottomSheet: () => void
  onUncheckAllItemsPress: () => void
  onDeleteCheckedItemsPress: () => void
}

export const ListActionsBottomSheet = ({
  isVisible,
  closeBottomSheet,
  onUncheckAllItemsPress,
  onDeleteCheckedItemsPress
}: Props) => {
  const styles = useStyles()
  const theme = useTheme()

  return (
    <BottomSheet isVisible={isVisible} onBackdropPress={closeBottomSheet}>
      <Spacer padding="xl" style={styles.bottomSheetContentContainer}>
        <View style={styles.bottomSheetHeaderContainer}>
          <Text h4>Manage list</Text>
          <Icon
            name="cancel"
            color={theme.theme.colors.grey4}
            onPress={closeBottomSheet}
          />
        </View>
        <Spacer marginTop="md" />
        <ListItem
          containerStyle={styles.bottomSheetListItemContainer}
          onPress={onUncheckAllItemsPress}>
          <Icon name="remove-done" color={theme.theme.colors.grey3} />
          <ListItem.Content>
            <ListItem.Title>Uncheck all items</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem
          containerStyle={styles.bottomSheetListItemContainer}
          onPress={onDeleteCheckedItemsPress}>
          <Icon name="delete-forever" color={theme.theme.colors.error} />
          <ListItem.Content>
            <ListItem.Title style={styles.bottomSheetDeleteText}>
              Delete checked items
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
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
  bottomSheetHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomSheetListItemContainer: {
    backgroundColor:
      theme.mode === 'dark'
        ? palette.listItem.darkBackground
        : theme.colors.background,
    paddingLeft: 0,
    paddingRight: 0
  },
  bottomSheetDeleteText: {
    color: theme.colors.error
  }
}))
