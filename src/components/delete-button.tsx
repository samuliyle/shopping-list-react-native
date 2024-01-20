import React from 'react'
import {Button} from '@rneui/themed'
import {StyleSheet} from 'react-native'

type Props = {
  onDelete: () => void
}

export const DeleteButton = ({onDelete}: Props) => (
  <Button
    title="Delete"
    onPress={() => onDelete()}
    icon={{name: 'delete', color: 'white'}}
    buttonStyle={styles.deleteButton}
  />
)

const styles = StyleSheet.create({
  deleteButton: {minHeight: '100%', backgroundColor: 'red'}
})
