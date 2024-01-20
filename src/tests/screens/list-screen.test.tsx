import React from 'react'
import {ShoppingList} from '../../types'
import {ListScreen} from '../../screens/list-screen'
import * as mockedMmkv from 'react-native-mmkv'
import {render, userEvent, waitFor} from '../../../test-utils'

jest.useFakeTimers()
jest.mock('react-native-mmkv', () => {
  const actual = jest.requireActual('react-native-mmkv')
  return {
    __esModule: true,
    ...actual
  }
})
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
    const {getByText} = render(<ListScreen {...props} />)
    jest.spyOn(mockedMmkv, 'useMMKVObject').mockReturnValue([[], jest.fn()])

    expect(getByText('No lists')).toBeDefined()
  })

  test('renders lists', () => {
    const mockLists: ShoppingList[] = [
      {
        name: 'test',
        id: 1
      },
      {
        name: 'list',
        id: 2
      }
    ]
    jest
      .spyOn(mockedMmkv, 'useMMKVObject')
      .mockReturnValue([mockLists, jest.fn()])

    const {getByText, queryByText} = render(<ListScreen {...props} />)

    expect(getByText('test')).toBeDefined()
    expect(getByText('list')).toBeDefined()
    expect(queryByText('No lists')).toBeNull()
  })

  test('navigates to ListDetails on list card press', async () => {
    const mockLists: ShoppingList[] = [
      {
        name: 'test',
        id: 1
      }
    ]
    jest
      .spyOn(mockedMmkv, 'useMMKVObject')
      .mockReturnValue([mockLists, jest.fn()])

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
    const mockLists: ShoppingList[] = [
      {
        name: 'test',
        id: 1
      }
    ]
    jest
      .spyOn(mockedMmkv, 'useMMKVObject')
      .mockReturnValue([mockLists, jest.fn()])

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
