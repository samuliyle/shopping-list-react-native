import {makeStyles} from '@rneui/themed'
import React from 'react'
import {View} from 'react-native'

type Props = {
  totalCount: number
  filledCount: number
}

export const ProgressBar = ({totalCount, filledCount}: Props) => {
  const styles = useStyles()

  const percentage =
    totalCount === 0 || filledCount === 0
      ? 0
      : Math.round((filledCount / totalCount) * 100)

  return (
    <View style={styles.progressBarContainer}>
      <View style={{...styles.bar, width: `${percentage}%`}} />
    </View>
  )
}

const useStyles = makeStyles(theme => ({
  progressBarContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10
  },
  bar: {
    width: '0%',
    height: 10,
    borderRadius: 10,
    backgroundColor: theme.colors.success
  }
}))
