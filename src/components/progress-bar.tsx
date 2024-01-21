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
    backgroundColor: '#F8F8F8'
  },
  bar: {
    width: '0%',
    height: 10,
    borderRadius: 10,
    backgroundColor: '#33B623'
  }
})
