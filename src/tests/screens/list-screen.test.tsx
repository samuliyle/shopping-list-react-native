import React from 'react'
import {ShoppingList} from '../../types'
import {ListScreen} from '../../screens/list-screen'
import {render, userEvent, waitFor} from '@testing-library/react-native'
import * as a from '../../store/shoppingListStore'

jest.useFakeTimers()

const useShoppingListStoreSpy = jest.spyOn(a, 'useShoppingListStore')

const onNavigation = jest.fn()
const props = {
  navigation: {
    push: onNavigation
  } as unknown
} as React.ComponentProps<typeof ListScreen>

describe('ListScreen', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders no lists text without lists', () => {
    useShoppingListStoreSpy.mockImplementation((passedFunction: any) => {
      const data = {
        shoppingLists: []
      }

      return passedFunction(data)
    })

    const {getByText} = render(<ListScreen {...props} />)

    expect(getByText('No lists')).toBeDefined()
  })

  test('renders lists', async () => {
    const mockLists: ShoppingList[] = [
      {
        name: 'test',
        id: 1,
        items: []
      },
      {
        name: 'list',
        id: 2,
        items: []
      }
    ]

    useShoppingListStoreSpy.mockImplementation((passedFunction: any) => {
      const data = {
        shoppingLists: mockLists
      }

      return passedFunction(data)
    })

    const {getByText, queryByText} = render(<ListScreen {...props} />)

    await waitFor(() => {
      expect(getByText('test')).toBeDefined()
      expect(getByText('list')).toBeDefined()
      expect(queryByText('No lists')).toBeNull()
    })
  })

  test('navigates to ListDetails on list card press', async () => {
    const mockLists: ShoppingList[] = [
      {
        name: 'test',
        id: 1,
        items: []
      }
    ]

    useShoppingListStoreSpy.mockImplementation((passedFunction: any) => {
      const data = {
        shoppingLists: mockLists
      }

      return passedFunction(data)
    })

    const {findByText} = render(<ListScreen {...props} />)

    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime})
    const card = await findByText('test')
    await user.press(card)

    await waitFor(() => {
      expect(onNavigation).toHaveBeenCalledTimes(1)
      expect(onNavigation).toHaveBeenCalledWith('ListDetails', {id: 1})
    })
  })

  test('navigates to NewList on FAB press', async () => {
    useShoppingListStoreSpy.mockImplementation((passedFunction: any) => {
      const data = {
        shoppingLists: []
      }

      return passedFunction(data)
    })

    const {findByTestId} = render(<ListScreen {...props} />)

    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime})
    const card = await findByTestId('add-list-fab')
    await user.press(card)

    await waitFor(() => {
      expect(onNavigation).toHaveBeenCalledTimes(1)
      expect(onNavigation).toHaveBeenCalledWith('NewList')
    })
  })
})
