import React, {useCallback, useRef, ReactNode} from 'react'
import {FlatList, FlatListProps, StyleSheet} from 'react-native'
import {
  GestureHandlerRootView,
  Swipeable,
  SwipeableProps
} from 'react-native-gesture-handler'

export interface SwipeableFlatListProps<T> extends FlatListProps<T> {
  renderLeftActions?: (item: T) => ReactNode
  renderRightActions?: (item: T) => ReactNode
  swipeableProps?: SwipeableProps
  enableOpenMultipleRows?: boolean
}

export const SwipeList = <T,>({
  data,
  keyExtractor,
  renderItem,
  renderLeftActions,
  renderRightActions,
  swipeableProps,
  enableOpenMultipleRows = true,
  ...rest
}: SwipeableFlatListProps<T>) => {
  const openedRowIndex = useRef<number | null>(null)
  const swipeableRefs = useRef<(Swipeable | null)[]>([])

  const onSwipeableOpen = useCallback(
    (directions: 'left' | 'right', swipeable: Swipeable, index: number) => {
      if (!enableOpenMultipleRows) {
        if (typeof openedRowIndex.current === 'number') {
          const previousSwipeable =
            swipeableRefs.current[openedRowIndex.current]
          if (previousSwipeable && previousSwipeable !== swipeable) {
            previousSwipeable.close()
          }
        }
        openedRowIndex.current = index
      }
      swipeableProps?.onSwipeableOpen?.(directions, swipeable)
    },
    [enableOpenMultipleRows, swipeableProps]
  )

  const renderSwipeableItem = useCallback(
    ({item, index}: {item: T; index: number}) => {
      const leftAction = renderLeftActions
        ? () => renderLeftActions(item)
        : undefined
      const rightAction = renderRightActions
        ? () => renderRightActions(item)
        : undefined

      const separators = {
        highlight: () => {},
        unhighlight: () => {},
        updateProps: () => {}
      }

      if (!renderItem) {
        return null
      }

      return (
        <Swipeable
          {...swipeableProps}
          ref={ref => {
            swipeableRefs.current[index] = ref
          }}
          renderRightActions={rightAction}
          renderLeftActions={leftAction}
          onSwipeableOpen={(directions, swipeable) =>
            onSwipeableOpen(directions, swipeable, index)
          }>
          {renderItem({item, index, separators})}
        </Swipeable>
      )
    },
    [
      onSwipeableOpen,
      renderItem,
      renderLeftActions,
      renderRightActions,
      swipeableProps
    ]
  )

  return (
    <GestureHandlerRootView style={styles.container}>
      <FlatList
        {...rest}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderSwipeableItem}
      />
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
