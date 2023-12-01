import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {
  createRestyleComponent,
  VariantProps,
  createVariant
} from '@shopify/restyle'
import {Text} from './text'
import {Theme} from '../theme'
import {Box} from './box'
import {ProgressBar} from './progress-bar'
import {useListItems} from '../hooks/use-list-items'

const CardContainer = createRestyleComponent<
  VariantProps<Theme, 'cardVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({themeKey: 'cardVariants'})], Box)

type Props = {
  listId: number
  name: string
  onPress: () => void
  onDelete?: () => void
}

export const ShoppingListCard = ({listId, name, onPress}: Props) => {
  const [items] = useListItems(listId)

  const totalItems = items.length
  const checkedCount = items.filter(i => i.checked).length
  const checkedPercentage =
    totalItems === 0 || checkedCount === 0
      ? 0
      : Math.round((checkedCount / totalItems) * 100)

  return (
    <TouchableOpacity onPress={() => onPress()}>
      <CardContainer variant="primary">
        <Text variant="body">{name}</Text>
        <Box style={styles.container}>
          <Box style={styles.progressBar}>
            <ProgressBar percentage={checkedPercentage} />
          </Box>
          <Box style={styles.listSizeContainer}>
            <Text variant="body">{`${checkedCount}/${totalItems}`}</Text>
          </Box>
        </Box>
      </CardContainer>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 12
  },
  progressBar: {
    width: '80%'
  },
  listSizeContainer: {
    width: '20%',
    alignItems: 'center'
  }
})
