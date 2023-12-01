import React from 'react'
import {Pressable, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

type Props = {
  checked: boolean
  onPress: () => void
}

export const CheckBox = ({checked, onPress}: Props) => {
  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={() => onPress()}>
      {checked && <Icon name="check" size={24} color="white" />}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'coral',
    backgroundColor: 'transparent'
  },
  checkboxChecked: {
    backgroundColor: 'coral'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkboxLabel: {
    marginLeft: 8,
    fontWeight: 500,
    fontSize: 18
  }
})
