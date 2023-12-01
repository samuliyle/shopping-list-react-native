import React, {ReactNode} from 'react'
import {
  createRestyleComponent,
  VariantProps,
  createVariant
} from '@shopify/restyle'
import {Text} from './text'
import {Theme} from '../theme'
import {Box} from './box'
import {StyleSheet} from 'react-native'

const ListItemContainer = createRestyleComponent<
  VariantProps<Theme, 'listVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({themeKey: 'listVariants'})], Box)

type Props = {
  justifyContent: 'space-between' | 'center' | 'flex-start'
  name: string
  left?: ReactNode
  right?: ReactNode
}

export const ListItem = ({name, justifyContent, left, right}: Props) => (
  <ListItemContainer style={{...styles.container, justifyContent}}>
    {left ? left : null}
    <Box style={styles.listText}>
      <Text variant="body">{name}</Text>
    </Box>
    {right ? right : null}
  </ListItemContainer>
)

const styles = StyleSheet.create({
  container: {
    height: 50,
    alignItems: 'stretch',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  listText: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
