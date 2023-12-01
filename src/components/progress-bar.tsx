import React from 'react'
import {
  createRestyleComponent,
  VariantProps,
  createVariant
} from '@shopify/restyle'
import {Theme} from '../theme'
import {Box} from './box'
import {StyleSheet} from 'react-native'

const ProgressBarContainer = createRestyleComponent<
  VariantProps<Theme, 'progressBarContainerVariants'> &
    React.ComponentProps<typeof Box>,
  Theme
>([createVariant({themeKey: 'progressBarContainerVariants'})], Box)

const ProgressBarBox = createRestyleComponent<
  VariantProps<Theme, 'progressBarVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({themeKey: 'progressBarVariants'})], Box)

type Props = {
  percentage: number
}

export const ProgressBar = ({percentage}: Props) => {
  return (
    <ProgressBarContainer style={styles.progressBarContainer}>
      <ProgressBarBox style={{...styles.bar, width: `${percentage}%`}} />
    </ProgressBarContainer>
  )
}

const styles = StyleSheet.create({
  progressBarContainer: {
    borderRadius: 13,
    padding: 3
  },
  bar: {
    width: '0%',
    height: 20,
    borderRadius: 10
  }
})
