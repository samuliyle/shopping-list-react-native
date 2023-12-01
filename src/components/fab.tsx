import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {
  VariantProps,
  createRestyleComponent,
  createVariant
} from '@shopify/restyle'
import {Theme} from '../theme'
import {Box} from './box'
import {Text} from './text'

const FabContainer = createRestyleComponent<
  VariantProps<Theme, 'buttonVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({themeKey: 'buttonVariants'})], Box)

type Props = {
  variant: 'primary' | 'secondary'
  onPress: () => void
}

export const Fab = ({onPress, variant}: Props) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <FabContainer style={styles.fabContainer} variant={variant}>
      <Text>+</Text>
    </FabContainer>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  fabContainer: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 100
  }
})
