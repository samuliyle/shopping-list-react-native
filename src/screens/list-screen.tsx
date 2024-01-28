import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {useState} from 'react'
import {RootStackParamList} from '../types'
import {ShoppingListCard} from '../components/shopping-list-card'
import {
  BottomSheet,
  Button,
  FAB as Fab,
  Input,
  Text,
  makeStyles
} from '@rneui/themed'
import {View} from 'react-native'
import {useShoppingListStore} from '../store/shoppingListStore'
import {FlashList} from '@shopify/flash-list'
import {useSafeAreaInsetsStyle} from '../hooks/use-safe-area-insets-style'
import {ShoppingCartIcon} from '../components/icons/shopping-cart-icon'
import {Spacer} from '../components/spacer'
import {palette} from '../theme'

type Props = NativeStackScreenProps<RootStackParamList, 'Lists'>

export const ListScreen = ({navigation}: Props) => {
  const insetsStyle = useSafeAreaInsetsStyle()
  const styles = useStyles()

  const [editListId, setEditListId] = useState<number | undefined>()
  const [editListName, setEditListName] = useState<string | undefined>()

  const lists = useShoppingListStore(state => state.shoppingLists)
  const removeShoppingList = useShoppingListStore(
    state => state.removeShoppingList
  )
  const renameShoppingList = useShoppingListStore(
    state => state.renameShoppingList
  )

  const onPress = (id: number) => {
    console.log('onpress', id)
    navigation.push('ListDetails', {id})
  }

  const onDelete = (id: number) => {
    console.log('delete', id)
    removeShoppingList(id)
  }

  const onEdit = (id: number) => {
    const editedList = lists.find(l => l.id === id)
    setEditListId(id)
    setEditListName(editedList?.name)
  }

  const onRenameSave = () => {
    if (editListId && editListName) {
      renameShoppingList(editListId, editListName)
    }
    setEditListId(undefined)
    setEditListName(undefined)
  }

  const renderItemSeparator = () => {
    return <View style={styles.itemSeparator} />
  }

  const noLists = lists.length === 0

  return (
    <View
      style={[
        noLists ? styles.noItemsContainer : styles.container,
        insetsStyle
      ]}>
      {noLists ? (
        <>
          <ShoppingCartIcon />
          <Text h1>No lists</Text>
          <Spacer marginTop="sm" />
          <Text>Tap the plus button to start adding shopping lists</Text>
        </>
      ) : (
        <FlashList
          keyboardShouldPersistTaps="handled"
          ItemSeparatorComponent={renderItemSeparator}
          contentContainerStyle={styles.shoppingListCardContainer}
          estimatedItemSize={92}
          keyExtractor={list => list.id.toString()}
          data={lists}
          renderItem={data => (
            <ShoppingListCard
              items={data.item.items}
              name={data.item.name}
              onPress={() => onPress(data.item.id)}
              onDelete={() => onDelete(data.item.id)}
              onEdit={() => onEdit(data.item.id)}
            />
          )}
        />
      )}
      <Fab
        testID="add-list-fab"
        placement="right"
        onPress={() => navigation.push('NewList')}
        icon={{name: 'add', color: 'white'}}
        size="large"
        title="New list"
      />
      <BottomSheet
        scrollViewProps={{
          keyboardShouldPersistTaps: 'handled'
        }}
        isVisible={editListId !== undefined}
        onBackdropPress={() => setEditListId(undefined)}>
        <Spacer padding="xl" style={styles.bottomSheetContentContainer}>
          <Text h4>Rename list</Text>
          <Spacer marginTop="md" />
          <Input
            autoFocus
            selectTextOnFocus
            value={editListName}
            onChangeText={newValue => setEditListName(newValue)}
            containerStyle={styles.bottomSheetInputContainer}
          />
          <View style={styles.bottomSheetButtonsContainer}>
            <Button
              title="cancel"
              containerStyle={styles.bottomSheetCancelButtonContainer}
              type="clear"
              onPress={() => setEditListId(undefined)}
            />
            <Button
              title="save"
              containerStyle={styles.bottomSheetSaveButtonContainer}
              disabled={!editListName}
              onPress={onRenameSave}
            />
          </View>
        </Spacer>
      </BottomSheet>
    </View>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  noItemsContainer: {
    flex: 1,
    alignItems: 'center'
  },
  shoppingListCardContainer: {
    padding: 16
  },
  itemSeparator: {
    height: 15
  },
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
