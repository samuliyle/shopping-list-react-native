import React from 'react'
import {ShoppingList} from '../../types'
import ListScreen from '../../screens/list-screen'
import * as mockedMmkv from 'react-native-mmkv'
import {render} from '../../../test-utils'

jest.mock('react-native-mmkv', () => {
  const actual = jest.requireActual('react-native-mmkv')
  return {
    __esModule: true,
    ...actual
  }
})
const props = {} as React.ComponentProps<typeof ListScreen>

describe('ListScreen', () => {
  test('renders no lists text without lists', () => {
    const {getByText} = render(<ListScreen {...props} />)
    jest.spyOn(mockedMmkv, 'useMMKVObject').mockReturnValue([[], jest.fn()])

    expect(getByText('No lists')).toBeDefined()
  })

  test('renders lists', () => {
    const mockLists: ShoppingList[] = [
      {
        name: 'test',
        id: '1'
      },
      {
        name: 'list',
        id: '2'
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
})
