import {makeStyles} from '@rneui/themed'
import React, {useEffect} from 'react'
import {View} from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
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

  const width = useSharedValue(percentage)
  const widthAnimation = useAnimatedStyle(() => ({
    width: `${width.value}%`
  }))

  useEffect(() => {
    width.value = withTiming(percentage, {
      duration: 500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1)
    })
  }, [percentage, width])

  return (
    <View style={styles.progressBarContainer}>
      <Animated.View style={[styles.bar, widthAnimation]} />
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
