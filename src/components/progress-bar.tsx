import React from 'react'
import {StyleSheet, View} from 'react-native'

type Props = {
  percentage: number
}

export const ProgressBar = ({percentage}: Props) => {
  return (
    <View style={styles.progressBarContainer}>
      <View style={{...styles.bar, width: `${percentage}%`}} />
    </View>
  )
}

const styles = StyleSheet.create({
  progressBarContainer: {
    borderRadius: 13,
    padding: 3,
    backgroundColor: 'black'
  },
  bar: {
    width: '0%',
    height: 20,
    borderRadius: 10,
    backgroundColor: 'green'
  }
})
