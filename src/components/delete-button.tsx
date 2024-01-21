import React from 'react'
import {Button} from '@rneui/themed'
import {StyleSheet, View} from 'react-native'

type Props = {
  onDelete: () => void
}

export const DeleteButton = ({onDelete}: Props) => (
  <View style={styles.container}>
    <Button
      title="Delete"
      onPress={() => onDelete()}
      icon={{name: 'delete', color: 'white'}}
      buttonStyle={styles.deleteButton}
    />
  </View>
)

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
    overflow: 'hidden'
  },
  deleteButton: {
    minHeight: '100%',
    backgroundColor: 'red',
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9
  }
})
