import {makeStyles} from '@rneui/themed'
import React from 'react'
import {View} from 'react-native'
import {palette} from '../theme'

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
    backgroundColor:
      theme.mode === 'dark'
        ? palette.progressBar.darkBackground
        : palette.progressBar.lightBackground,
    borderRadius: 10
  },
  bar: {
    width: '0%',
    height: 10,
    borderRadius: 10,
    backgroundColor: theme.colors.success
  }
}))
